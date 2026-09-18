from datetime import datetime
from typing import Optional, Dict, Any
from pydantic import BaseModel, EmailStr, Field


class HRDetails(BaseModel):
    department: Optional[str] = Field(default=None, example="Talent Acquisition")
    company: Optional[str] = Field(default=None, example="TalentPulse AI")
    employee_id: Optional[str] = Field(default=None, example="EMP-1042")
    designation: Optional[str] = Field(
        default=None, example="Senior Technical Recruiter"
    )
    notes: Optional[str] = None

    class Config:
        extra = "allow"


class UserRegisterRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, example="Sarah Jenkins")
    email: EmailStr = Field(..., example="sarah.jenkins@talentpulse.ai")
    password: str = Field(..., min_length=6, max_length=128, example="SecureP@ssw0rd!")
    role: Optional[str] = Field(
        default="Recruiter", max_length=50, example="Lead Technical Recruiter"
    )
    hr_details: Optional[Dict[str, Any]] = Field(
        default_factory=dict,
        example={
            "department": "Talent Acquisition",
            "company": "TalentPulse AI",
            "employee_id": "HR-001",
        },
    )
    # Optional flat fields for convenience
    company_name: Optional[str] = None
    department: Optional[str] = None


class UserLoginRequest(BaseModel):
    email: EmailStr = Field(..., example="sarah.jenkins@talentpulse.ai")
    password: str = Field(..., example="SecureP@ssw0rd!")


class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    role: str
    hr_details: Optional[Dict[str, Any]] = None
    status: str
    created_at: datetime
    updated_at: Optional[datetime] = None

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
