from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import (hash_password, verify_password, create_access_token)
from app.schemas.auth import (
    UserRegister,
    UserLogin,
    UserOut,
    TokenResponse
)

from app.models.user import User
from app.schemas.auth import UserRegister, UserOut

from app.core.dependencies import get_current_user

router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    response_model=UserOut,
    status_code=201
)
def register(
    user: UserRegister,
    db: Session = Depends(get_db)
):
    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=409,
            detail="Email already registered"
        )

    new_user = User(
        email=user.email,
        password_hash=hash_password(user.password),
        name=user.name
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@router.post(
    "/login",
    response_model=TokenResponse
)
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):
    user_record = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if not user_record:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(
        user.password,
        user_record.password_hash
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_access_token(
        {
            "sub": str(user_record.id),
            "email": user_record.email
        }
    )

    return TokenResponse(
        access_token=token
    )
    
@router.get("/me")
def me(
    current_user=Depends(get_current_user)
):
    return current_user   