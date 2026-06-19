# AI Usage Documentation

## Purpose

The application uses Large Language Models (LLMs) to perform automated source code reviews.

The goal is to provide actionable feedback on:

* Security
* Performance
* Code Quality
* Architecture
* Documentation

---

## Supported Providers

### LM Studio

Local inference using OpenAI-compatible endpoints.

Example:

```text
http://localhost:1234/v1
```

### OpenAI-Compatible APIs

Any provider exposing:

```text
POST /chat/completions
```

can be integrated.

---

## Review Process

### Step 1

User uploads a ZIP archive.

### Step 2

ZIP is extracted and files are stored.

### Step 3

Project files are combined into a review context.

### Step 4

A review prompt is generated based on review type.

### Step 5

The configured AI provider receives the prompt.

### Step 6

The AI returns structured JSON.

### Step 7

The response is stored as:

* Review Summary
* Raw Output
* Review Findings

---

## Prompt Engineering

The application generates specialized prompts for:

### Security Review

Detect:

* Hardcoded secrets
* Authentication flaws
* Input validation issues
* Injection vulnerabilities

### Performance Review

Detect:

* Inefficient algorithms
* Slow operations
* Bottlenecks

### Code Quality Review

Analyze:

* Naming
* Readability
* Maintainability

### Architecture Review

Analyze:

* Folder structure
* Separation of concerns
* Scalability

### Documentation Review

Analyze:

* README quality
* Setup instructions
* API documentation

---

## Limitations

* AI-generated results may contain inaccuracies.
* Human review is recommended before applying suggestions.
* Large projects may require context reduction strategies.

---

## Future Enhancements

* AI Chat With Codebase
* Retrieval-Augmented Generation (RAG)
* Semantic Search
* Multi-Agent Reviews
* Pull Request Analysis
