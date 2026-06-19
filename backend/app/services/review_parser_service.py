import json


def parse_review_response(response: str):
    try:
        data = json.loads(response)

        return {
            "summary": data.get("summary", ""),
            "findings": data.get("findings", [])
        }

    except Exception:
        return {
            "summary": response[:500],
            "findings": []
        }