from uuid import UUID

from pydantic import BaseModel


class ProviderCreate(BaseModel):
    name: str
    base_url: str
    api_key: str | None = None
    model_name: str
    is_default: bool = False


class ProviderResponse(BaseModel):
    id: UUID
    name: str
    base_url: str
    model_name: str
    is_default: bool

    model_config = {
        "from_attributes": True
    }