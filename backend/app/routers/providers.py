from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.encryption import encrypt_value
from app.models.ai_provider import AIProvider
from app.models.user import User
from app.schemas.provider import (
    ProviderCreate,
    ProviderResponse
)

from app.routers.auth import get_current_user

router = APIRouter(
    prefix="/api/providers",
    tags=["Providers"]
)


@router.post(
    "",
    response_model=ProviderResponse,
    status_code=201
)
def create_provider(
    payload: ProviderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    encrypted_key = None

    if payload.api_key:
        encrypted_key = encrypt_value(
            payload.api_key
        )

    provider = AIProvider(
        user_id=current_user["sub"],
        name=payload.name,
        base_url=payload.base_url,
        api_key_encrypted=encrypted_key,
        model_name=payload.model_name,
        is_default=payload.is_default
    )

    db.add(provider)
    db.commit()
    db.refresh(provider)

    return provider

@router.get(
    "",
    response_model=list[ProviderResponse]
)
def get_providers(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    providers = (
        db.query(AIProvider)
        .filter(
            AIProvider.user_id == current_user["sub"]
        )
        .all()
    )

    return providers

@router.delete(
    "/{provider_id}"
)
def delete_provider(
    provider_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    provider = (
        db.query(AIProvider)
        .filter(
            AIProvider.id == provider_id,
            AIProvider.user_id == current_user["sub"]
        )
        .first()
    )

    if not provider:
        raise HTTPException(
            status_code=404,
            detail="Provider not found"
        )

    db.delete(provider)
    db.commit()

    return {
        "message": "Provider deleted successfully"
    }