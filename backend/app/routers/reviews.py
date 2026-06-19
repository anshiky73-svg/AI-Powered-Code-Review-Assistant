from fastapi import APIRouter
from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.models.project import Project
from app.models.code_file import CodeFile
from app.models.review import Review
from app.models.ai_provider import AIProvider

from app.schemas.review import (
    ReviewCreate,
    ReviewResponse
)

from app.routers.auth import get_current_user
from app.models.review_finding import ReviewFinding

from app.services.review_parser_service import (
    parse_review_response
)

from app.services.review_execution_service import (
    run_review
)

router = APIRouter(
    prefix="/api/projects",
    tags=["Reviews"]
)

@router.post(
    "/{project_id}/reviews",
    response_model=ReviewResponse
)
def create_review(
    project_id: str,
    payload: ReviewCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    project = (
        db.query(Project)
        .filter(
            Project.id == project_id,
            Project.owner_id == current_user["sub"]
        )
        .first()
    )

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    provider = (
        db.query(AIProvider)
        .filter(
            AIProvider.id == payload.provider_id,
            AIProvider.user_id == current_user["sub"]
        )
        .first()
    )

    if not provider:
        raise HTTPException(
            status_code=404,
            detail="Provider not found"
        )

    files = (
        db.query(CodeFile)
        .filter(
            CodeFile.project_id == project.id
        )
        .all()
    )

    if not files:
        raise HTTPException(
            status_code=400,
            detail="No files found in project"
        )

    code_content = "\n\n".join(
        file.content
        for file in files
    )

    review_output = run_review(
        provider=provider,
        code_content=code_content,
        review_type=payload.review_type
    )
    
    parsed = parse_review_response(
    review_output
    )

    review = Review(
    project_id=project.id,
    provider_id=provider.id,
    review_type=payload.review_type,
    status="completed",
    summary=parsed["summary"],
    raw_output=review_output
    )

    db.add(review)
    db.commit()
    db.refresh(review)
    
    for finding_data in parsed["findings"]:

        finding = ReviewFinding(
            review_id=review.id,
            severity=finding_data.get(
                "severity",
                "info"
            ),
            title=finding_data.get(
                "title",
                "Unknown"
            ),
            description=finding_data.get(
                "description",
                ""
            ),
            recommendation=finding_data.get(
                "recommendation"
            ),
            file_path=finding_data.get(
                "file_path"
            ),
            line_number=finding_data.get(
                "line_number"
            )
        )

        db.add(finding)

    db.commit()

    return review

@router.get(
    "/{project_id}/reviews",
    response_model=list[ReviewResponse]
)
def get_reviews(
    project_id: str,
    query: str | None = None,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    project = (
        db.query(Project)
        .filter(
            Project.id == project_id,
            Project.owner_id == current_user["sub"]
        )
        .first()
    )

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    reviews_query = (
        db.query(Review)
        .filter(
            Review.project_id == project.id
        )
    )

    if query:
        reviews_query = reviews_query.filter(
            Review.summary.ilike(
                f"%{query}%"
            )
        )

    return (
        reviews_query
        .order_by(
            Review.created_at.desc()
        )
        .all()
    )
    
@router.get(
    "/{project_id}/reviews/{review_id}",
    response_model=ReviewResponse
)
def get_review(
    project_id: str,
    review_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    project = (
        db.query(Project)
        .filter(
            Project.id == project_id,
            Project.owner_id == current_user["sub"]
        )
        .first()
    )

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    review = (
        db.query(Review)
        .filter(
            Review.id == review_id,
            Review.project_id == project.id
        )
        .first()
    )

    if not review:
        raise HTTPException(
            status_code=404,
            detail="Review not found"
        )

    return review    

from app.schemas.review import (
    ReviewFindingResponse
)

@router.get(
    "/{project_id}/reviews/{review_id}/findings",
    response_model=list[ReviewFindingResponse]
)
def get_review_findings(
    project_id: str,
    review_id: str,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    project = (
        db.query(Project)
        .filter(
            Project.id == project_id,
            Project.owner_id == current_user["sub"]
        )
        .first()
    )

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    review = (
        db.query(Review)
        .filter(
            Review.id == review_id,
            Review.project_id == project.id
        )
        .first()
    )

    if not review:
        raise HTTPException(
            status_code=404,
            detail="Review not found"
        )

    return (
        db.query(ReviewFinding)
        .filter(
            ReviewFinding.review_id == review.id
        )
        .all()
    )