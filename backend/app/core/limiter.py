from slowapi import Limiter
from slowapi.util import get_remote_address
from app.core.config import settings

# Global Limiter instance using client IP
limiter = Limiter(
    key_func=get_remote_address,
    default_limits=[settings.DEFAULT_RATE_LIMIT],
    storage_uri="memory://",  # In-memory storage by default, can be switched to redis
)
