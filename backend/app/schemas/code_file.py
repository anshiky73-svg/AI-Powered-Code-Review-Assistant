from uuid import UUID
from pydantic import BaseModel


class CodeFileCreate(BaseModel):
    filename: str
    language: str
    content: str


class CodeFileUpdate(BaseModel):
    filename: str
    language: str
    content: str


class CodeFileResponse(BaseModel):
    id: UUID
    filename: str
    path: str | None = None
    language: str
    content: str
    size_bytes: int | None = None
    project_id: UUID

    model_config = {
        "from_attributes": True
    }