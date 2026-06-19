from app.services.review_prompt_service import (
    build_review_prompt
)

from app.services.ai_provider_service import (
    generate_completion
)

from app.core.encryption import (
    decrypt_value
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

    api_key = None

    if provider.api_key_encrypted:
        api_key = decrypt_value(
            provider.api_key_encrypted
        )

    response = generate_completion(
        base_url=provider.base_url,
        model_name=provider.model_name,
        api_key=api_key,
        messages=messages
    )

    return response