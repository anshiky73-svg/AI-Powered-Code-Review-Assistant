from uuid import UUID
from pydantic import BaseModel


class ReviewCreate(BaseModel):
    provider_id: UUID
    review_type: str


class ReviewFindingResponse(BaseModel):
    id: UUID
    severity: str
    title: str
    description: str
    recommendation: str | None = None
    file_path: str | None = None
    line_number: int | None = None

    model_config = {
        "from_attributes": True
    }


class ReviewResponse(BaseModel):
    id: UUID
    project_id: UUID
    provider_id: UUID | None = None
    review_type: str
    status: str
    summary: str | None = None
    raw_output: str | None = None

    model_config = {
        "from_attributes": True
    }