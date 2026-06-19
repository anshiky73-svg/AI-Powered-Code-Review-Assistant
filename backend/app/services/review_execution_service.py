from app.services.review_prompt_service import (
    build_review_prompt
)

from app.services.ai_provider_service import (
    generate_completion
)


def run_review(
    provider,
    code_content: str,
    review_type: str
):

    prompt = build_review_prompt(
        review_type,
        code_content
    )

    messages = [
        {
            "role": "user",
            "content": prompt
        }
    ]

    response = generate_completion(
        base_url=provider.base_url,
        model_name=provider.model_name,
        api_key=None,
        messages=messages
    )

    return response