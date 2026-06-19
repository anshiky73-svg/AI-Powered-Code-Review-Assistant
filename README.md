# AI Powered Code Review Assistant

An AI-powered platform that allows developers to upload source code projects, analyze them using configurable AI providers, and receive automated code reviews with actionable recommendations.

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected API Routes

### Project Management

* Create Projects
* View Projects
* Delete Projects

### Code Management

* Upload ZIP Archives
* Automatic ZIP Extraction
* File Explorer Tree
* Code File CRUD Operations

### AI Provider Management

* Multiple AI Provider Support
* Configurable Base URLs
* Configurable Models
* Encrypted API Key Storage
* OpenAI-Compatible API Support
* LM Studio Support

### AI Code Reviews

* Security Review
* Performance Review
* Code Quality Review
* Architecture Review
* Documentation Review

### Review History

* Review Storage
* Review Search
* Review Details
* Review Findings

## Technology Stack

### Backend

* FastAPI
* SQLAlchemy
* PostgreSQL (Neon)
* JWT Authentication
* Cryptography (Fernet)

### Frontend

* Next.js
* TypeScript
* Tailwind CSS

### AI Integration

* LM Studio
* OpenAI Compatible APIs

## Setup

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=
SECRET_KEY=
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
ENCRYPTION_KEY=
```

## API Documentation

FastAPI Swagger UI:

```text
http://127.0.0.1:8000/docs
```

## Future Improvements

* AI Chat With Codebase
* Team Collaboration
* Pull Request Reviews
* Advanced Semantic Search
* GitHub Integration
