import logging
from typing import Any, Dict, Optional
from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from slowapi.errors import RateLimitExceeded

logger = logging.getLogger("talentpulse.errors")


class AppException(Exception):
    """Base application exception."""

    def __init__(
        self,
        message: str,
        code: str = "INTERNAL_ERROR",
        status_code: int = status.HTTP_500_INTERNAL_SERVER_ERROR,
        details: Optional[Any] = None,
    ):
        self.message = message
        self.code = code
        self.status_code = status_code
        self.details = details
        super().__init__(message)


class AuthenticationError(AppException):
    def __init__(
        self,
        message: str = "Invalid authentication credentials",
        details: Optional[Any] = None,
    ):
        super().__init__(
            message=message,
            code="AUTHENTICATION_ERROR",
            status_code=status.HTTP_401_UNAUTHORIZED,
            details=details,
        )


class PermissionDeniedError(AppException):
    def __init__(
        self, message: str = "Permission denied", details: Optional[Any] = None
    ):
        super().__init__(
            message=message,
            code="PERMISSION_DENIED",
            status_code=status.HTTP_403_FORBIDDEN,
            details=details,
        )


class NotFoundError(AppException):
    def __init__(
        self, message: str = "Resource not found", details: Optional[Any] = None
    ):
        super().__init__(
            message=message,
            code="NOT_FOUND",
            status_code=status.HTTP_404_NOT_FOUND,
            details=details,
        )


class ConflictError(AppException):
    def __init__(
        self, message: str = "Resource conflict", details: Optional[Any] = None
    ):
        super().__init__(
            message=message,
            code="CONFLICT_ERROR",
            status_code=status.HTTP_409_CONFLICT,
            details=details,
        )


class ValidationError(AppException):
    def __init__(
        self, message: str = "Validation failed", details: Optional[Any] = None
    ):
        super().__init__(
            message=message,
            code="VALIDATION_ERROR",
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            details=details,
        )


def register_exception_handlers(app: FastAPI) -> None:
    """Register standardized global exception handlers for the FastAPI application."""

    @app.exception_handler(AppException)
    async def app_exception_handler(request: Request, exc: AppException):
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "success": False,
                "error": {
                    "code": exc.code,
                    "message": exc.message,
                    "details": exc.details,
                },
            },
        )

    @app.exception_handler(StarletteHTTPException)
    async def http_exception_handler(request: Request, exc: StarletteHTTPException):
        code_map = {
            400: "BAD_REQUEST",
            401: "UNAUTHORIZED",
            403: "FORBIDDEN",
            404: "NOT_FOUND",
            405: "METHOD_NOT_ALLOWED",
            409: "CONFLICT",
            429: "TOO_MANY_REQUESTS",
            500: "INTERNAL_SERVER_ERROR",
        }
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "success": False,
                "error": {
                    "code": code_map.get(exc.status_code, "HTTP_ERROR"),
                    "message": (
                        exc.detail
                        if isinstance(exc.detail, str)
                        else "HTTP request error"
                    ),
                    "details": exc.detail if not isinstance(exc.detail, str) else None,
                },
            },
        )

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(
        request: Request, exc: RequestValidationError
    ):
        errors = []
        for err in exc.errors():
            loc = " -> ".join([str(l) for l in err.get("loc", [])])
            msg = err.get("msg", "Invalid field")
            errors.append({"field": loc, "issue": msg})

        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content={
                "success": False,
                "error": {
                    "code": "REQUEST_VALIDATION_ERROR",
                    "message": "The request body or parameters failed validation criteria.",
                    "details": errors,
                },
            },
        )

    @app.exception_handler(RateLimitExceeded)
    async def rate_limit_handler(request: Request, exc: RateLimitExceeded):
        return JSONResponse(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            content={
                "success": False,
                "error": {
                    "code": "RATE_LIMIT_EXCEEDED",
                    "message": "Too many requests. Please slow down and try again later.",
                    "details": {"retry_after": str(exc.detail)},
                },
            },
        )

    @app.exception_handler(Exception)
    async def unhandled_exception_handler(request: Request, exc: Exception):
        logger.exception(
            f"Unhandled Server Error on {request.method} {request.url.path}: {str(exc)}"
        )
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "success": False,
                "error": {
                    "code": "INTERNAL_SERVER_ERROR",
                    "message": "An unexpected internal server error occurred. Please contact support.",
                    "details": None,
                },
            },
        )
