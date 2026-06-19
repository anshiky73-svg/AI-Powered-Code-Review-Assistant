from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.project import Project
from app.models.code_file import CodeFile
from app.models.user import User

from app.schemas.code_file import (
    CodeFileCreate,
    CodeFileResponse,
    CodeFileUpdate
)

from app.routers.auth import get_current_user
from fastapi import UploadFile, File
from app.services.zip_extraction_service import extract_zip_contents
from app.services.file_tree_service import build_file_tree


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

@router.put(
    "/{project_id}/files/{file_id}",
    response_model=CodeFileResponse
)
def update_code_file(
    project_id: str,
    file_id: str,
    payload: CodeFileUpdate,
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

    code_file.filename = payload.filename
    code_file.language = payload.language
    code_file.content = payload.content

    db.commit()
    db.refresh(code_file)

    return code_file

@router.delete(
    "/{project_id}/files/{file_id}"
)
def delete_code_file(
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

    db.delete(code_file)
    db.commit()

    return {"message": "File deleted successfully"}

@router.post(
    "/{project_id}/upload"
)
def upload_project_zip(
    project_id: str,
    file: UploadFile = File(...),
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

    if not file.filename.endswith(".zip"):
        raise HTTPException(
            status_code=400,
            detail="Only ZIP files are allowed"
        )

    import tempfile

    with tempfile.NamedTemporaryFile(delete=False, suffix=".zip") as temp_file:
        temp_file.write(file.file.read())
        temp_zip_path = temp_file.name

    extracted_files = extract_zip_contents(temp_zip_path)

    imported_count = 0

    for extracted_file in extracted_files:

        code_file = CodeFile(
            filename=extracted_file["filename"],
            path=extracted_file["path"],
            language=extracted_file["language"],
            content=extracted_file["content"],
            size_bytes=extracted_file["size_bytes"],
            project_id=project.id
        )

        db.add(code_file)
        imported_count += 1

    db.commit()

    return {
        "message": "Repository imported successfully",
        "files_imported": imported_count
    }
    
@router.get(
    "/{project_id}/files/tree"
)
def get_file_tree(
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
        .filter(
            CodeFile.project_id == project.id
        )
        .all()
    )

    return build_file_tree(files)    