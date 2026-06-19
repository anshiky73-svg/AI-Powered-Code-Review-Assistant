# Architecture Overview

## System Architecture

The application follows a layered architecture.

```text
Frontend (Next.js)
        │
        ▼
FastAPI REST API
        │
 ┌──────┼──────┐
 ▼      ▼      ▼
Auth  Services Database
 Layer Layer   Layer
        │
        ▼
AI Provider Layer
        │
        ▼
LM Studio / OpenAI Compatible APIs
```

---

## Backend Structure

```text
app/
├── core/
│   ├── config.py
│   ├── database.py
│   └── encryption.py
│
├── models/
│   ├── user.py
│   ├── project.py
│   ├── code_file.py
│   ├── ai_provider.py
│   ├── review.py
│   └── review_finding.py
│
├── schemas/
│
├── routers/
│
├── services/
│
└── main.py
```

---

## Database Design

### Users

Stores application users.

### Projects

Stores uploaded projects.

### Code Files

Stores extracted source files.

### AI Providers

Stores AI provider configurations.

### Reviews

Stores review executions.

### Review Findings

Stores structured findings generated from reviews.

---

## Review Flow

```text
Project
   │
   ▼
Code Files
   │
   ▼
Prompt Builder
   │
   ▼
AI Provider Service
   │
   ▼
LM Studio/OpenAI
   │
   ▼
JSON Response
   │
   ▼
Review Parser
   │
   ▼
Review Findings
   │
   ▼
Stored In Database
```

---

## Security

* JWT Authentication
* Password Hashing
* Encrypted API Keys
* Protected Routes
* Ownership Validation
* Secure ZIP Extraction

---

## Scalability Considerations

* Provider Abstraction Layer
* Service-Based Architecture
* Independent Review Engine
* Modular Database Models
* OpenAI-Compatible Design
