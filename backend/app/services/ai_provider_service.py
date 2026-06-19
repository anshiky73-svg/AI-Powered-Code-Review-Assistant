import httpx


def generate_completion(
    base_url: str,
    model_name: str,
    messages: list,
    api_key: str | None = None
):

    headers = {
        "Content-Type": "application/json"
    }

    if api_key:
        headers["Authorization"] = (
            f"Bearer {api_key}"
        )

    payload = {
        "model": model_name,
        "messages": messages,
        "temperature": 0.2
    }

    response = httpx.post(
        f"{base_url}/chat/completions",
        json=payload,
        headers=headers,
        timeout=120
    )

    response.raise_for_status()

    data = response.json()

    return data["choices"][0]["message"]["content"]