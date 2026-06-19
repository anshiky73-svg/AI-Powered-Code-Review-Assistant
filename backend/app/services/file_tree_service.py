def build_file_tree(files):
    tree = {}

    for file in files:
        path_parts = file.path.split("/")

        current = tree

        for part in path_parts[:-1]:
            current = current.setdefault(part, {})

        current[path_parts[-1]] = {
            "id": str(file.id),
            "type": "file"
        }

    return tree