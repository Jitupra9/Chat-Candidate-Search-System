from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi.middleware import SlowAPIMiddleware

from app.core.config import settings
from app.core.limiter import limiter
from app.core.exceptions import register_exception_handlers
from app.api.router import api_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup actions
    print(f"🚀 {settings.PROJECT_NAME} starting up in {settings.ENVIRONMENT} mode...")
    yield
    # Shutdown actions
    print(f"🛑 {settings.PROJECT_NAME} shutting down...")


app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    description="Autonomous Enterprise AI HR Recruiter & Candidate Management Backend API",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# 1. State & Limiter Registration
app.state.limiter = limiter
app.add_middleware(SlowAPIMiddleware)

# 2. CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Global Standardized Exception Handlers
register_exception_handlers(app)

# 4. Mount API v1 Router
app.include_router(api_router, prefix=settings.API_V1_STR)


# 5. Base System Health & Discovery Endpoints
@app.get("/", tags=["System"])
async def root():
    return {
        "project": settings.PROJECT_NAME,
        "version": "1.0.0",
        "status": "online",
        "docs_url": "/docs",
        "api_v1": settings.API_V1_STR,
    }


@app.get("/health", tags=["System"])
async def health_check():
    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT,
        "rate_limiter": "active",
        "security": "jwt_enabled",
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
