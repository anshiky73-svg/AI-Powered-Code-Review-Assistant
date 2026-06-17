
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.project import Project
from app.schemas.project import ProjectCreate, ProjectOut
from sqlalchemy import select

router = APIRouter(
    prefix="/api/projects",
    tags=["Projects"]
)

@router.post(
    "/",
    response_model=ProjectOut,
    status_code=201
)
def create_project(
    project: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    new_project = Project(
        name=project.name,
        description=project.description,
        owner_id=current_user["sub"]
    )

    db.add(new_project)
    db.commit()
    db.refresh(new_project)

    return new_project

@router.get("/", response_model=list[ProjectOut])
def get_projects(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    projects = (
        db.query(Project)
        .filter(Project.owner_id == current_user["sub"])
        .all()
    )

    return projects

@router.get("/{project_id}", response_model=ProjectOut)
def get_project(
    project_id: str,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
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

    return project

@router.delete("/{project_id}")
def delete_project(
    project_id: str,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
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

    db.delete(project)
    db.commit()

    return {
        "message": "Project deleted successfully"
    }