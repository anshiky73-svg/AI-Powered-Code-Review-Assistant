from datetime import datetime
from uuid import UUID, uuid4

from sqlalchemy import (
    String,
    Boolean,
    DateTime,
    ForeignKey,
    Uuid
)
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

from app.core.database import Base


class AIProvider(Base):
    __tablename__ = "ai_providers"

    id: Mapped[UUID] = mapped_column(
        Uuid,
        primary_key=True,
        default=uuid4
    )

    user_id: Mapped[UUID] = mapped_column(
        Uuid,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    name: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    base_url: Mapped[str] = mapped_column(
        String(500),
        nullable=False
    )

    api_key_encrypted: Mapped[str] = mapped_column(
        String(1000),
        nullable=True
    )

    model_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    is_default: Mapped[bool] = mapped_column(
        Boolean,
        default=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )