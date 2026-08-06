"""Small synchronous filesystem primitives used by WebSocket mutations."""

from __future__ import annotations

import os


def remove_file_if_exists(file_path: str) -> None:
    """Remove one file without a check/delete race."""
    try:
        os.remove(file_path)
    except FileNotFoundError:
        pass


def file_has_content(file_path: str) -> bool:
    """Return whether a file exists and is nonempty."""
    try:
        return os.path.getsize(file_path) != 0
    except FileNotFoundError:
        return False
