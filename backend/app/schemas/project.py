from uuid import UUID

from pydantic import BaseModel


class ProjectCreate(BaseModel):
    name: str
    description: str | None = None


class ProjectOut(BaseModel):
    id: UUID
    name: str
    description: str | None
    owner_id: UUID

    model_config = {
        "from_attributes": True
    }