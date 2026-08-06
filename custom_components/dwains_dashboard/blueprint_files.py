"""Filesystem snapshot loader for Dwains Dashboard blueprints."""

from __future__ import annotations

import os
from typing import Any

from .yaml_files import load_yaml_file


def load_blueprint_files(
    blueprints_path: str,
) -> tuple[dict[str, Any], list[tuple[str, Exception]]]:
    """Load all blueprint YAML files and retain per-file failures."""
    blueprints: dict[str, Any] = {}
    failures: list[tuple[str, Exception]] = []
    if not os.path.isdir(blueprints_path):
        return blueprints, failures

    for filename in os.listdir(blueprints_path):
        if not filename.endswith(".yaml"):
            continue
        try:
            blueprints[filename] = load_yaml_file(
                os.path.join(blueprints_path, filename)
            )
        except Exception as error:
            failures.append((filename, error))
    return blueprints, failures
