import uuid
from datetime import datetime, timezone
from typing import Dict, Any
from fastapi import APIRouter, Depends, Request, status
from app.core.config import settings
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token,
    decode_token,
)
from app.core.exceptions import AuthenticationError, ConflictError, ValidationError
from app.core.limiter import limiter
from app.core.dependencies import get_current_active_user, MOCK_USERS_DB
from app.schemas.auth import (
    UserSignupRequest,
    UserLoginRequest,
    TokenResponse,
    UserResponse,
    TokenRefreshRequest,
    TokenRefreshResponse,
    MessageResponse,
)

router = APIRouter(prefix="/auth", tags=["Authentication"])

# Pre-populate default demo recruiter user
if "sarah.jenkins@talentpulse.ai" not in MOCK_USERS_DB:
    MOCK_USERS_DB["sarah.jenkins@talentpulse.ai"] = {
        "id": "usr-001",
        "name": "Sarah Jenkins",
        "email": "sarah.jenkins@talentpulse.ai",
        "password_hash": hash_password("SecureP@ssw0rd!"),
        "role": "Lead Technical Recruiter",
        "company_name": "TalentPulse AI",
        "department": "Talent Acquisition",
        "avatar_initials": "SJ",
        "status": "active",
        "created_at": datetime.now(timezone.utc),
    }


def generate_initials(name: str) -> str:
    parts = name.strip().split()
    if len(parts) >= 2:
        return (parts[0][0] + parts[1][0]).upper()
    return name[:2].upper() if name else "HR"


@router.post(
    "/signup",
    response_model=TokenResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new recruiter / user account",
)
@limiter.limit(settings.AUTH_RATE_LIMIT)
async def signup(request: Request, body: UserSignupRequest):
    """Register a new user account, hash the password, and return initial JWT tokens."""
    email_key = body.email.lower()
    if email_key in MOCK_USERS_DB:
        raise ConflictError(f"User with email '{body.email}' already exists.")

    user_id = f"usr-{uuid.uuid4().hex[:8]}"
    initials = generate_initials(body.name)
    now = datetime.now(timezone.utc)

    user_record = {
        "id": user_id,
        "name": body.name,
        "email": email_key,
        "password_hash": hash_password(body.password),
        "role": body.role or "Recruiter",
        "company_name": body.company_name or "TalentPulse AI",
        "department": body.department or "HR",
        "avatar_initials": initials,
        "status": "active",
        "created_at": now,
    }
    MOCK_USERS_DB[email_key] = user_record

    user_response = UserResponse(
        id=user_id,
        name=body.name,
        email=body.email,
        role=user_record["role"],
        company_name=user_record["company_name"],
        department=user_record["department"],
        avatar_initials=initials,
        status="active",
        created_at=now,
    )

    access_token = create_access_token(
        subject=email_key,
        extra_claims={
            "id": user_id,
            "name": body.name,
            "role": user_record["role"],
            "company_name": user_record["company_name"],
            "department": user_record["department"],
            "avatar_initials": initials,
        },
    )
    refresh_token = create_refresh_token(subject=email_key)

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer",
        expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        user=user_response,
    )


@router.post(
    "/login",
    response_model=TokenResponse,
    summary="Authenticate user and obtain JWT access & refresh tokens",
)
@limiter.limit(settings.AUTH_RATE_LIMIT)
async def login(request: Request, body: UserLoginRequest):
    """Verify credentials with rate limiting and return signed JWT tokens."""
    email_key = body.email.lower()
    user = MOCK_USERS_DB.get(email_key)

    if not user or not verify_password(body.password, user["password_hash"]):
        raise AuthenticationError("Invalid corporate email or password.")

    if user["status"] != "active":
        raise AuthenticationError("User account is inactive.")

    user_response = UserResponse(
        id=user["id"],
        name=user["name"],
        email=user["email"],
        role=user["role"],
        company_name=user["company_name"],
        department=user["department"],
        avatar_initials=user["avatar_initials"],
        status=user["status"],
        created_at=user.get("created_at", datetime.now(timezone.utc)),
    )

    access_token = create_access_token(
        subject=email_key,
        extra_claims={
            "id": user["id"],
            "name": user["name"],
            "role": user["role"],
            "company_name": user["company_name"],
            "department": user["department"],
            "avatar_initials": user["avatar_initials"],
        },
    )
    refresh_token = create_refresh_token(subject=email_key)

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer",
        expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        user=user_response,
    )


@router.get(
    "/me",
    response_model=UserResponse,
    summary="Get currently authenticated user profile",
)
async def get_me(current_user: Dict[str, Any] = Depends(get_current_active_user)):
    """Retrieve profile information for the authenticated user."""
    return UserResponse(
        id=current_user["id"],
        name=current_user["name"],
        email=current_user["email"],
        role=current_user["role"],
        company_name=current_user["company_name"],
        department=current_user["department"],
        avatar_initials=current_user["avatar_initials"],
        status=current_user["status"],
        created_at=current_user.get("created_at", datetime.now(timezone.utc)),
    )


@router.post(
    "/refresh",
    response_model=TokenRefreshResponse,
    summary="Refresh an expired access token using a valid refresh token",
)
@limiter.limit(settings.AUTH_RATE_LIMIT)
async def refresh_token(request: Request, body: TokenRefreshRequest):
    """Validate refresh token and issue a fresh JWT access token."""
    try:
        payload = decode_token(body.refresh_token)
    except Exception as e:
        raise AuthenticationError(f"Invalid or expired refresh token: {str(e)}")

    if payload.get("type") != "refresh":
        raise AuthenticationError("Invalid token type. Refresh token required.")

    user_email = payload.get("sub")
    user = MOCK_USERS_DB.get(user_email)
    if not user:
        raise AuthenticationError(
            "User associated with refresh token no longer exists."
        )

    new_access_token = create_access_token(
        subject=user_email,
        extra_claims={
            "id": user["id"],
            "name": user["name"],
            "role": user["role"],
            "company_name": user["company_name"],
            "department": user["department"],
            "avatar_initials": user["avatar_initials"],
        },
    )

    return TokenRefreshResponse(
        access_token=new_access_token,
        token_type="bearer",
        expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )


@router.post(
    "/logout",
    response_model=MessageResponse,
    summary="Sign out the current user session",
)
async def logout(current_user: Dict[str, Any] = Depends(get_current_active_user)):
    """Acknowledge session logout."""
    return MessageResponse(
        success=True, message=f"User {current_user['email']} successfully signed out."
    )
