from fastapi import FastAPI

from app.core.database import Base, engine
from app.routers.auth import router as auth_router

import app.models

app = FastAPI()


@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)


app.include_router(auth_router)


@app.get("/api/health")
def health():
    return {"status": "healthy"}