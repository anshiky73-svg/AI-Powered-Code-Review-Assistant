from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.project import Project
from app.models.code_file import CodeFile
from app.models.user import User

from app.schemas.code_file import (
    CodeFileCreate,
    CodeFileResponse
)

from app.routers.auth import get_current_user


router = APIRouter(
    prefix="/api/projects",
    tags=["Code Files"]
)


@router.post(
    "/{project_id}/files",
    response_model=CodeFileResponse,
    status_code=201
)
def create_code_file(
    project_id: str,
    payload: CodeFileCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
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

    code_file = CodeFile(
        filename=payload.filename,
        language=payload.language,
        content=payload.content,
        project_id=project.id
    )

    db.add(code_file)
    db.commit()
    db.refresh(code_file)

    return code_file

@router.get(
    "/{project_id}/files",
    response_model=list[CodeFileResponse]
)
def get_project_files(
    project_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
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
    files = (
    db.query(CodeFile)
    .filter(CodeFile.project_id == project.id)
    .all()
)
    return files    

@router.get(
    "/{project_id}/files/{file_id}",
    response_model=CodeFileResponse
)
def get_code_file(
    project_id: str,
    file_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
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

    code_file = (
        db.query(CodeFile)
        .filter(
            CodeFile.id == file_id,
            CodeFile.project_id == project.id
        )
        .first()
    )

    if not code_file:
        raise HTTPException(
            status_code=404,
            detail="File not found"
        )

    return code_file