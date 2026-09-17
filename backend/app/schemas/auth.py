from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class UserSignupRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, example="Sarah Jenkins")
    email: EmailStr = Field(..., example="sarah.jenkins@talentpulse.ai")
    password: str = Field(..., min_length=6, max_length=128, example="SecureP@ssw0rd!")
    role: Optional[str] = Field(default="Lead Technical Recruiter", max_length=100)
    company_name: Optional[str] = Field(default="TalentPulse AI", max_length=150)
    department: Optional[str] = Field(default="Talent Acquisition", max_length=100)


class UserLoginRequest(BaseModel):
    email: EmailStr = Field(..., example="sarah.jenkins@talentpulse.ai")
    password: str = Field(..., example="SecureP@ssw0rd!")


class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    role: str
    company_name: str
    department: str
    avatar_initials: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int
    user: UserResponse


class TokenRefreshRequest(BaseModel):
    refresh_token: str


class TokenRefreshResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int


class MessageResponse(BaseModel):
    success: bool
    message: str
