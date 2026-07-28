"""Home-Assistant-independent YAML parsing and file operations."""

from __future__ import annotations

import json
import os
import stat
import tempfile
from collections import OrderedDict
from typing import Any, Callable, TextIO

import yaml
from yaml.representer import Representer


class _DashboardDumper(yaml.Dumper):
    """Private dumper that supports legacy OrderedDict values."""


_DashboardDumper.add_representer(OrderedDict, Representer.represent_dict)


def load_yaml_file(file_path: str) -> Any:
    """Load one YAML file while owning its descriptor."""
    with open(file_path, "r", encoding="utf-8") as yaml_file:
        return yaml.safe_load(yaml_file)


def load_yaml_file_or_default(
    file_path: str,
    fallback: Any,
    require_nonempty: bool = False,
) -> Any:
    """Load YAML with the caller's missing/empty fallback semantics."""
    try:
        if require_nonempty and os.path.getsize(file_path) == 0:
            return fallback
        return load_yaml_file(file_path)
    except FileNotFoundError:
        return fallback


def parse_yaml_text(value: str) -> Any:
    """Parse YAML text."""
    return yaml.safe_load(value)


def _atomic_yaml_write(file_path: str, writer: Callable[[TextIO], None]) -> None:
    """Write beside the target and replace it only after a complete flush."""
    parent_directory = os.path.dirname(file_path)
    os.makedirs(parent_directory, exist_ok=True)
    existing_mode = None
    try:
        existing_mode = stat.S_IMODE(os.stat(file_path).st_mode)
    except FileNotFoundError:
        pass

    temporary_path = None
    try:
        with tempfile.NamedTemporaryFile(
            mode="w",
            encoding="utf-8",
            dir=parent_directory,
            prefix=f".{os.path.basename(file_path)}.",
            suffix=".tmp",
            delete=False,
        ) as temporary_file:
            temporary_path = temporary_file.name
            writer(temporary_file)
            temporary_file.flush()
            os.fsync(temporary_file.fileno())

        os.chmod(temporary_path, existing_mode if existing_mode is not None else 0o644)
        os.replace(temporary_path, file_path)
        temporary_path = None
    finally:
        if temporary_path is not None:
            try:
                os.remove(temporary_path)
            except FileNotFoundError:
                pass


def dump_yaml_file(file_path: str, value: Any) -> None:
    """Atomically dump one YAML file."""
    def write(yaml_file: TextIO) -> None:
        yaml.dump(
            value,
            yaml_file,
            Dumper=_DashboardDumper,
            default_flow_style=False,
            sort_keys=False,
        )

    _atomic_yaml_write(file_path, write)


def dump_json_normalized_yaml_file(file_path: str, value: Any) -> None:
    """Atomically dump JSON-compatible card data with legacy YAML defaults."""
    def write(yaml_file: TextIO) -> None:
        yaml.dump(
            yaml.safe_load(json.dumps(value)),
            yaml_file,
            Dumper=_DashboardDumper,
            default_flow_style=False,
        )

    _atomic_yaml_write(file_path, write)
