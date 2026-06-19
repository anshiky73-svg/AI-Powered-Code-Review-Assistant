from datetime import datetime
from uuid import UUID, uuid4

from sqlalchemy import (
    String,
    Text,
    DateTime,
    ForeignKey,
    Uuid
)
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

from app.core.database import Base


class Review(Base):
    __tablename__ = "reviews"

    id: Mapped[UUID] = mapped_column(
        Uuid,
        primary_key=True,
        default=uuid4
    )

    project_id: Mapped[UUID] = mapped_column(
        Uuid,
        ForeignKey("projects.id", ondelete="CASCADE"),
        nullable=False
    )

    provider_id: Mapped[UUID] = mapped_column(
        Uuid,
        ForeignKey("ai_providers.id", ondelete="SET NULL"),
        nullable=True
    )

    review_type: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    status: Mapped[str] = mapped_column(
        String(50),
        default="completed"
    )

    summary: Mapped[str] = mapped_column(
        Text,
        nullable=True
    )

    raw_output: Mapped[str] = mapped_column(
        Text,
        nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )