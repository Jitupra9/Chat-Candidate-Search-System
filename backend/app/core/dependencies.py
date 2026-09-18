from typing import Optional
from fastapi import Depends, Header
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.security import decode_token
from app.core.exceptions import AuthenticationError, PermissionDeniedError
from app.core.database import get_db
from app.services.auth_service import auth_service
from app.models.user import User

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_STR}/auth/login", auto_error=False
)


async def get_current_user(
    token: Optional[str] = Depends(oauth2_scheme),
    authorization: Optional[str] = Header(None),
    db: AsyncSession = Depends(get_db),
) -> User:
    """
    JWT Authentication Dependency:
    Extracts Bearer token, validates signature/expiration, and fetches the User from the database.
    """
    raw_token = token
    if not raw_token and authorization and authorization.startswith("Bearer "):
        raw_token = authorization.split(" ")[1]

    if not raw_token:
        raise AuthenticationError(
            "Missing or invalid Authorization header. Expected 'Bearer <token>'"
        )

    try:
        payload = decode_token(raw_token)
    except Exception as e:
        raise AuthenticationError(f"Token validation failed: {str(e)}")

    if payload.get("type") != "access":
        raise AuthenticationError("Invalid token type. Access token required.")

    user_email = payload.get("sub")
    if not user_email:
        raise AuthenticationError("Token payload missing user identifier ('sub').")

    # Fetch user from database
    user = await auth_service.get_user_by_email(db, user_email)
    if not user:
        raise AuthenticationError("User associated with this token no longer exists.")

    return user


async def get_current_active_user(
    current_user: User = Depends(get_current_user),
) -> User:
    """Dependency verifying that the authenticated user account is active."""
    if current_user.status != "active":
        raise PermissionDeniedError("User account is inactive or disabled.")
    return current_user
