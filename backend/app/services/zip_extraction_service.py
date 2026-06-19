import zipfile
from pathlib import Path


SKIP_DIRS = {
    "node_modules",
    ".git",
    ".venv",
    "venv",
    "dist",
    "build",
    ".next",
    "__pycache__"
}


LANGUAGE_MAP = {
    ".py": "python",
    ".js": "javascript",
    ".ts": "typescript",
    ".jsx": "javascript",
    ".tsx": "typescript",
    ".java": "java",
    ".cpp": "cpp",
    ".c": "c",
    ".cs": "csharp",
    ".go": "go",
    ".rs": "rust",
    ".php": "php",
    ".rb": "ruby",
    ".html": "html",
    ".css": "css",
    ".sql": "sql",
}
def get_language(filename: str) -> str:
    extension = Path(filename).suffix.lower()
    return LANGUAGE_MAP.get(extension, "text")

def should_skip(path: str) -> bool:
    parts = Path(path).parts

    for part in parts:
        if part in SKIP_DIRS:
            return True

    return False

def extract_zip_contents(zip_path: str):
    extracted_files = []

    with zipfile.ZipFile(zip_path, "r") as zip_ref:

        for file_info in zip_ref.infolist():

            if file_info.is_dir():
                continue

            file_path = file_info.filename

            if should_skip(file_path):
                continue

            normalized = Path(file_path)

            if ".." in normalized.parts:
                continue

            try:
                with zip_ref.open(file_info) as file:

                    content = file.read().decode(
                        "utf-8",
                        errors="ignore"
                    )

                    extracted_files.append(
                        {
                            "path": file_path,
                            "filename": Path(file_path).name,
                            "language": get_language(file_path),
                            "content": content,
                            "size_bytes": file_info.file_size,
                        }
                    )

            except Exception:
                continue

    return extracted_files