from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine
from app.routers.auth import router as auth_router
from app.models import *
from app.routers.projects import router as projects_router
from app.routers.code_files import router as code_files_router

from app.routers.providers import router as providers_router
from app.routers.reviews import router as reviews_router
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)


app.include_router(auth_router)
app.include_router(projects_router)
app.include_router(code_files_router)
app.include_router(providers_router)
app.include_router(reviews_router)


@app.get("/api/health")
def health():
    return {"status": "healthy"}