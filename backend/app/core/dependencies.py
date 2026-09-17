from typing import Dict, Any, Optional
from fastapi import Depends, Header
from fastapi.security import OAuth2PasswordBearer
from app.core.config import settings
from app.core.security import decode_token
from app.core.exceptions import AuthenticationError, PermissionDeniedError

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/auth/login", auto_error=False
)

# In-memory mock user repository for standalone authentication & easy database binding
MOCK_USERS_DB: Dict[str, Dict[str, Any]] = {}


def get_current_user(
    token: Optional[str] = Depends(oauth2_scheme),
    authorization: Optional[str] = Header(None),
) -> Dict[str, Any]:
    """Dependency to extract, decode, and validate the JWT Bearer token."""
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

    # Check database / repository
    user = MOCK_USERS_DB.get(user_email)
    if not user:
        # Fallback / default recruiter profile if token is valid
        user = {
            "id": payload.get("id", "usr-default-001"),
            "name": payload.get(
                "name", user_email.split("@")[0].replace(".", " ").title()
            ),
            "email": user_email,
            "role": payload.get("role", "Lead Technical Recruiter"),
            "company_name": payload.get("company_name", "TalentPulse AI"),
            "department": payload.get("department", "Talent Acquisition"),
            "avatar_initials": payload.get("avatar_initials", "SJ"),
            "status": "active",
        }

    return user


def get_current_active_user(
    current_user: Dict[str, Any] = Depends(get_current_user),
) -> Dict[str, Any]:
    """Dependency verifying that the authenticated user account is active."""
    if current_user.get("status") != "active":
        raise PermissionDeniedError("User account is inactive or disabled.")
    return current_user
