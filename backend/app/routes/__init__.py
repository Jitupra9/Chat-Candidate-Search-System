from fastapi import APIRouter
from app.routes.auth import router as auth_router
from app.routes.chat import router as chat_router

api_router = APIRouter()

# Register sub-routers directly in routes/__init__.py
api_router.include_router(auth_router)
api_router.include_router(chat_router)

__all__ = ["api_router", "auth_router", "chat_router"]
