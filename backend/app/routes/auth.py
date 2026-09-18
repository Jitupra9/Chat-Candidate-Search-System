from fastapi import APIRouter, Depends, Request, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.limiter import limiter
from app.core.database import get_db
from app.core.dependencies import get_current_active_user
from app.models.user import User
from app.services.auth_service import auth_service
from app.schemas.user import (
    UserRegisterRequest,
    UserLoginRequest,
    UserResponse,
    TokenResponse,
    TokenRefreshRequest,
    TokenRefreshResponse,
    MessageResponse,
)

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post(
    "/register",
    response_model=TokenResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user / HR recruiter",
)
@limiter.limit(settings.AUTH_RATE_LIMIT)
async def register(
    request: Request,
    body: UserRegisterRequest,
    db: AsyncSession = Depends(get_db),
):
    """
    Register endpoint:
    Delegates user creation and token generation to AuthService.
    """
    user = await auth_service.register_user(db, body)
    return auth_service.generate_tokens(user)


@router.post(
    "/login",
    response_model=TokenResponse,
    summary="Authenticate user and obtain JWT tokens",
)
@limiter.limit(settings.AUTH_RATE_LIMIT)
async def login(
    request: Request,
    body: UserLoginRequest,
    db: AsyncSession = Depends(get_db),
):
    """
    Login endpoint:
    Delegates credential validation and token generation to AuthService.
    """
    user = await auth_service.authenticate_user(db, body)
    return auth_service.generate_tokens(user)


@router.get(
    "/me",
    response_model=UserResponse,
    summary="Get currently authenticated user profile (Protected with JWT)",
)
async def get_me(
    current_user: User = Depends(get_current_active_user),
):
    """
    Protected route:
    Returns the profile of the JWT-authenticated user.
    """
    return UserResponse.model_validate(current_user)


@router.post(
    "/refresh",
    response_model=TokenRefreshResponse,
    summary="Refresh access token using refresh token",
)
@limiter.limit(settings.AUTH_RATE_LIMIT)
async def refresh_token(
    request: Request,
    body: TokenRefreshRequest,
    db: AsyncSession = Depends(get_db),
):
    """
    Refresh token endpoint:
    Validates the refresh token and issues a new access token via AuthService.
    """
    return await auth_service.refresh_access_token(db, body.refresh_token)


@router.post(
    "/logout",
    response_model=MessageResponse,
    summary="Logout user session (Protected with JWT)",
)
async def logout(
    current_user: User = Depends(get_current_active_user),
):
    """
    Protected logout endpoint.
    """
    return MessageResponse(
        success=True,
        message=f"User {current_user.email} successfully logged out.",
    )
