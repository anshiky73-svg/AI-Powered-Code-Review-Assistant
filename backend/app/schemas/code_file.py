from uuid import UUID
from pydantic import BaseModel


class CodeFileCreate(BaseModel):
    filename: str
    language: str
    content: str


class CodeFileResponse(BaseModel):
    id: UUID
    filename: str
    language: str
    content: str
    project_id: UUID

    model_config = {
        "from_attributes": True
    }