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
- Naming
- Readability
- Structure
- Maintainability
"""
    }

    instructions = prompts.get(
        review_type,
        prompts["quality"]
    )

    return f"""
{instructions}

Code:

{code_content}

Provide:
1. Summary
2. Issues Found
3. Recommendations
4. Severity for each issue
"""