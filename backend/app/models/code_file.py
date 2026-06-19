from sqlalchemy import String, Text, ForeignKey, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Uuid
from uuid import uuid4
from datetime import datetime, UTC

from app.core.database import Base
from sqlalchemy import Integer


class CodeFile(Base):
    __tablename__ = "code_files"

    id: Mapped[str] = mapped_column(
        Uuid,
        primary_key=True,
        default=uuid4
    )

    filename: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    path: Mapped[str] = mapped_column(
        String(1000),
        nullable=True
    )

    language: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    content: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    size_bytes: Mapped[int] = mapped_column(
        Integer,
        default=0
    )

    project_id: Mapped[str] = mapped_column(
        Uuid,
        ForeignKey("projects.id", ondelete="CASCADE"),
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=lambda: datetime.now(UTC)
    )