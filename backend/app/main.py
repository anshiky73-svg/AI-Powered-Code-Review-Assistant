from fastapi import FastAPI

from app.core.database import Base, engine

import app.models

app = FastAPI()


@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)


@app.get("/api/health")
def health():
    return {"status": "healthy"}