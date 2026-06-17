from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.core.security import verify_token

security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    payload = verify_token(credentials.credentials)

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    return payload