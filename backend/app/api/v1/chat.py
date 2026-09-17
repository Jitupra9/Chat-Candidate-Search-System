import uuid
from datetime import datetime, timezone
from typing import Dict, Any, List
from fastapi import APIRouter, Depends, Request, Query, status
from fastapi.responses import StreamingResponse
from app.core.config import settings
from app.core.limiter import limiter
from app.core.dependencies import get_current_active_user
from app.schemas.chat import (
    ChatMessageRequest,
    ChatMessageResponse,
    ChatMessageItem,
    ChatHistoryResponse,
    ChatResetResponse,
    ToolExecutionStep,
    CandidateSummary,
)

router = APIRouter(prefix="/chat", tags=["Chat Service"])

# In-memory session message store (placeholder for developer's manual service/model integration)
SESSION_HISTORY: Dict[str, List[ChatMessageItem]] = {}


@router.post(
    "/message",
    response_model=ChatMessageResponse,
    status_code=status.HTTP_200_OK,
    summary="Send a message to the AI Recruiter Agent (API Endpoint Route)",
)
@limiter.limit(settings.DEFAULT_RATE_LIMIT)
async def send_chat_message(
    request: Request,
    body: ChatMessageRequest,
    current_user: Dict[str, Any] = Depends(get_current_active_user),
):
    """
    Primary chat interaction route endpoint.

    NOTE: Model and service logic will be implemented manually by the developer.
    This route defines the clean API contract and returns structured responses.
    """
    session_id = body.session_id or "default-session"
    now = datetime.now(timezone.utc)

    # 1. Record incoming user message
    user_msg = ChatMessageItem(
        id=f"msg-{uuid.uuid4().hex[:8]}",
        role="user",
        content=body.message,
        timestamp=now,
    )

    if session_id not in SESSION_HISTORY:
        SESSION_HISTORY[session_id] = []
    SESSION_HISTORY[session_id].append(user_msg)

    # 2. Placeholder assistant response structure (developer plugs their model/service here)
    sample_tools = [
        ToolExecutionStep(
            tool_name="search_candidates_hybrid",
            status="completed",
            input={"query": body.message, "search_mode": body.search_mode},
            output_summary="Identified top matching candidate records in database.",
            execution_time_ms=45,
        )
    ]

    sample_candidates = [
        CandidateSummary(
            id="cand-001",
            name="Alex Rivera",
            title="Senior AI Engineer",
            match_score=96,
            experience_years=6.5,
            skills=["Python", "FastAPI", "LangGraph", "ChromaDB"],
        ),
        CandidateSummary(
            id="cand-002",
            name="Priya Sharma",
            title="Staff ML Engineer",
            match_score=94,
            experience_years=7.2,
            skills=["Python", "PyTorch", "Kubernetes", "Vector Indexing"],
        ),
    ]

    assistant_msg = ChatMessageItem(
        id=f"msg-{uuid.uuid4().hex[:8]}",
        role="assistant",
        content=(
            f"Hello {current_user['name']}! I received your query: \"{body.message}\".\n\n"
            f"• **Search Mode**: `{body.search_mode}`\n"
            f"• **Selected Model**: `{body.model}`\n"
            f"• **Operator**: {current_user['name']} ({current_user['role']})\n\n"
            f"I have scanned the talent pipeline and verified grounded qualifications for your review."
        ),
        timestamp=datetime.now(timezone.utc),
        tool_steps=sample_tools,
        embedded_candidates=sample_candidates,
    )

    SESSION_HISTORY[session_id].append(assistant_msg)

    return ChatMessageResponse(
        success=True, session_id=session_id, message=assistant_msg
    )


@router.get(
    "/history",
    response_model=ChatHistoryResponse,
    summary="Retrieve chat conversation trajectory for a session",
)
async def get_chat_history(
    session_id: str = Query(
        default="default-session", description="Unique conversation session ID"
    ),
    current_user: Dict[str, Any] = Depends(get_current_active_user),
):
    """Retrieve full conversation history for the specified session ID."""
    history = SESSION_HISTORY.get(session_id, [])
    return ChatHistoryResponse(success=True, session_id=session_id, messages=history)


@router.post(
    "/reset",
    response_model=ChatResetResponse,
    summary="Reset conversation session state",
)
async def reset_chat_session(
    session_id: str = Query(
        default="default-session", description="Session ID to clear"
    ),
    current_user: Dict[str, Any] = Depends(get_current_active_user),
):
    """Clear memory and start a fresh conversation session."""
    if session_id in SESSION_HISTORY:
        SESSION_HISTORY[session_id] = []
    return ChatResetResponse(
        success=True,
        session_id=session_id,
        message=f"Session '{session_id}' cleared successfully.",
    )


@router.post(
    "/stream",
    summary="Streaming endpoint for real-time token delivery (Server-Sent Events)",
)
async def stream_chat_message(
    body: ChatMessageRequest,
    current_user: Dict[str, Any] = Depends(get_current_active_user),
):
    """
    SSE stream endpoint for real-time LLM token generation.
    Developer can connect their LangGraph / LLM streaming generator here.
    """

    async def event_generator():
        yield f'data: {{"event": "start", "session_id": "{body.session_id}"}}\n\n'
        tokens = ["Processing ", "candidate ", "records ", "with ", body.model, "..."]
        for t in tokens:
            yield f'data: {{"token": "{t}"}}\n\n'
        yield 'data: {"event": "end"}\n\n'

    return StreamingResponse(event_generator(), media_type="text/event-stream")
