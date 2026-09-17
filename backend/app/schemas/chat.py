from datetime import datetime
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


class ToolExecutionStep(BaseModel):
    tool_name: str
    status: str = "completed"
    input: Dict[str, Any] = Field(default_factory=dict)
    output_summary: Optional[str] = None
    execution_time_ms: Optional[int] = None


class CandidateSummary(BaseModel):
    id: str
    name: str
    title: str
    match_score: int
    experience_years: float
    skills: List[str]


class ChatMessageRequest(BaseModel):
    message: str = Field(
        ...,
        min_length=1,
        example="Show me candidates with 5+ years experience in Python and FastAPI",
    )
    session_id: Optional[str] = Field(default="default-session", example="session-001")
    model: Optional[str] = Field(
        default="claude-3-7-sonnet", example="claude-3-7-sonnet"
    )
    search_mode: Optional[str] = Field(default="hybrid", example="hybrid")
    is_reasoning_active: Optional[bool] = Field(default=True)


class ChatMessageItem(BaseModel):
    id: str
    role: str  # "user" | "assistant" | "system"
    content: str
    timestamp: datetime
    action_id: Optional[str] = None
    tool_steps: Optional[List[ToolExecutionStep]] = None
    embedded_candidates: Optional[List[CandidateSummary]] = None


class ChatMessageResponse(BaseModel):
    success: bool = True
    session_id: str
    message: ChatMessageItem


class ChatHistoryResponse(BaseModel):
    success: bool = True
    session_id: str
    messages: List[ChatMessageItem]


class ChatResetResponse(BaseModel):
    success: bool = True
    session_id: str
    message: str = "Chat session reset successfully."
