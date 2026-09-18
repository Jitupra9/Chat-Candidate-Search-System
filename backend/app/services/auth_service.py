import uuid
from typing import Optional, Dict, Any
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User
from app.schemas.user import (
    UserRegisterRequest,
    UserLoginRequest,
    UserResponse,
    TokenResponse,
    TokenRefreshResponse,
)
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token,
    decode_token,
)
from app.core.exceptions import AuthenticationError, ConflictError
from app.core.config import settings


class AuthService:
    """Service encapsulating authentication, registration, token issuance, and user lookup."""

    async def get_user_by_email(self, db: AsyncSession, email: str) -> Optional[User]:
        """Fetch a single user by normalized email address."""
        stmt = select(User).where(User.email == email.strip().lower())
        result = await db.execute(stmt)
        return result.scalar_one_or_none()

    async def get_user_by_id(self, db: AsyncSession, user_id: str) -> Optional[User]:
        """Fetch a single user by primary key ID."""
        stmt = select(User).where(User.id == user_id)
        result = await db.execute(stmt)
        return result.scalar_one_or_none()

    async def register_user(
        self, db: AsyncSession, payload: UserRegisterRequest
    ) -> User:
        """
        Business logic to register a new user:
        - Validates unique corporate email
        - Consolidates HR metadata
        - Hashes password with Bcrypt
        - Persists to PostgreSQL database
        """
        normalized_email = payload.email.strip().lower()

        # 1. Check if user already exists
        existing_user = await self.get_user_by_email(db, normalized_email)
        if existing_user:
            raise ConflictError(f"User with email '{payload.email}' already exists.")

        # 2. Consolidate HR details
        hr_details = dict(payload.hr_details or {})
        if payload.company_name and "company" not in hr_details:
            hr_details["company"] = payload.company_name
        if payload.department and "department" not in hr_details:
            hr_details["department"] = payload.department

        # 3. Hash password
        hashed_pwd = hash_password(payload.password)

        # 4. Instantiate User model
        new_user = User(
            id=str(uuid.uuid4()),
            name=payload.name.strip(),
            email=normalized_email,
            hashed_password=hashed_pwd,
            role=payload.role or "Recruiter",
            hr_details=hr_details,
            status="active",
        )

        db.add(new_user)
        await db.commit()
        await db.refresh(new_user)

        return new_user

    async def authenticate_user(
        self, db: AsyncSession, credentials: UserLoginRequest
    ) -> User:
        """
        Business logic to verify credentials and authenticate a user:
        - Validates user existence and password hash
        - Confirms active account status
        """
        normalized_email = credentials.email.strip().lower()
        user = await self.get_user_by_email(db, normalized_email)

        if not user or not verify_password(credentials.password, user.hashed_password):
            raise AuthenticationError("Invalid corporate email or password.")

        if user.status != "active":
            raise AuthenticationError("User account is inactive or suspended.")

        return user

    def generate_tokens(self, user: User) -> TokenResponse:
        """
        Generate signed JWT access & refresh tokens for an authenticated user.
        """
        claims: Dict[str, Any] = {
            "id": user.id,
            "name": user.name,
            "role": user.role,
            "hr_details": user.hr_details or {},
            "status": user.status,
        }

        access_token = create_access_token(
            subject=user.email,
            extra_claims=claims,
        )
        refresh_token = create_refresh_token(subject=user.email)

        user_schema = UserResponse.model_validate(user)

        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="bearer",
            expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            user=user_schema,
        )

    async def refresh_access_token(
        self, db: AsyncSession, refresh_token: str
    ) -> TokenRefreshResponse:
        """
        Validate refresh token and issue a fresh access token.
        """
        try:
            payload = decode_token(refresh_token)
        except Exception as e:
            raise AuthenticationError(f"Invalid or expired refresh token: {str(e)}")

        if payload.get("type") != "refresh":
            raise AuthenticationError("Invalid token type. Refresh token required.")

        user_email = payload.get("sub")
        user = await self.get_user_by_email(db, user_email)
        if not user:
            raise AuthenticationError(
                "User associated with refresh token no longer exists."
            )

        if user.status != "active":
            raise AuthenticationError("User account is inactive or suspended.")

        new_access_token = create_access_token(
            subject=user.email,
            extra_claims={
                "id": user.id,
                "name": user.name,
                "role": user.role,
                "hr_details": user.hr_details or {},
                "status": user.status,
            },
        )

        return TokenRefreshResponse(
            access_token=new_access_token,
            token_type="bearer",
            expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        )


auth_service = AuthService()
