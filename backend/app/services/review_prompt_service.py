def build_review_prompt(
    review_type: str,
    code_content: str
):
    prompts = {
    "security": """
Review this code for:
- Hardcoded credentials
- Authentication issues
- Input validation problems
- Injection risks
""",

    "performance": """
Review this code for:
- Slow operations
- Inefficient algorithms
- Unnecessary database queries
- Performance bottlenecks
""",

    "quality": """
Review this code for:
- Naming conventions
- Readability
- Maintainability
- Code structure
""",

    "architecture": """
Analyze the architecture of this project.

Focus on:
- Folder structure
- Separation of concerns
- Scalability
- Modularity
- Dependency organization
- Maintainability

Identify architectural strengths and weaknesses.
""",

    "documentation": """
Generate documentation feedback.

Focus on:
- Missing README information
- Setup instructions
- Environment variables
- API documentation
- Developer onboarding

Provide recommendations for improving project documentation.
"""
}

    instructions = prompts.get(
        review_type,
        prompts["quality"]
    )

    return f"""
{instructions}

Analyze the following code:

{code_content}

Return ONLY valid JSON.

Format:

{{
  "summary": "Short summary of review",
  "findings": [
    {{
      "severity": "high",
      "title": "Issue title",
      "description": "Issue description",
      "recommendation": "How to fix",
      "file_path": "path/to/file.py",
      "line_number": 10
    }}
  ]
}}

Rules:
- Return ONLY JSON
- No markdown
- No explanations
- No code fences
- findings must be an array
"""