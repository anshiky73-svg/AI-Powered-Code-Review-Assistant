from uuid import UUID, uuid4

from sqlalchemy import (
    String,
    Text,
    Integer,
    ForeignKey,
    Uuid
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column
)

from app.core.database import Base


class ReviewFinding(Base):
    __tablename__ = "review_findings"

    id: Mapped[UUID] = mapped_column(
        Uuid,
        primary_key=True,
        default=uuid4
    )

    review_id: Mapped[UUID] = mapped_column(
        Uuid,
        ForeignKey("reviews.id", ondelete="CASCADE"),
        nullable=False
    )

    severity: Mapped[str] = mapped_column(
        String(20),
        nullable=False
    )

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    description: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    recommendation: Mapped[str] = mapped_column(
        Text,
        nullable=True
    )

    file_path: Mapped[str] = mapped_column(
        String(1000),
        nullable=True
    )

    line_number: Mapped[int] = mapped_column(
        Integer,
        nullable=True
    )