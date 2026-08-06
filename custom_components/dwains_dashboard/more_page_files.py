"""Filesystem operations for Dwains Dashboard more-page navigation."""

from __future__ import annotations

import os
from collections import OrderedDict
from typing import Any

from .yaml_files import dump_yaml_file, load_yaml_file


def _more_pages_path(configs_path: str) -> str:
    return os.path.join(configs_path, "more_pages")


def _valid_foldername(foldername: str) -> bool:
    return bool(foldername) and os.path.basename(foldername) == foldername and foldername not in {".", ".."}


def validate_more_page_foldername(foldername: str) -> str:
    """Return a safe more-page folder name or reject the request."""
    if not _valid_foldername(foldername):
        raise ValueError("Invalid more-page folder name")
    return foldername


def load_more_pages_metadata(configs_path: str) -> dict[str, dict[str, Any]]:
    """Load only the metadata needed by the more-pages overview."""
    pages: dict[str, dict[str, Any]] = {}
    more_pages_path = _more_pages_path(configs_path)
    if not os.path.isdir(more_pages_path):
        return pages

    for foldername in sorted(os.listdir(more_pages_path)):
        folder_path = os.path.join(more_pages_path, foldername)
        page_path = os.path.join(folder_path, "page.yaml")
        config_path = os.path.join(folder_path, "config.yaml")
        if not os.path.isfile(page_path) or not os.path.isfile(config_path):
            continue
        config = load_yaml_file(config_path)
        if not isinstance(config, dict):
            raise TypeError(f"More-page configuration {config_path} must contain a mapping")
        pages[foldername] = {
            "name": config.get("name") or foldername,
            "icon": config.get("icon") or "mdi:puzzle",
            "show_in_navbar": bool(config.get("show_in_navbar", False)),
            "sort_order": _sort_order(config),
        }
    return pages


def load_more_page_content(configs_path: str, foldername: str) -> dict[str, Any] | None:
    """Load one complete more page without rebuilding the Lovelace dashboard."""
    validate_more_page_foldername(foldername)
    folder_path = os.path.join(_more_pages_path(configs_path), foldername)
    page_path = os.path.join(folder_path, "page.yaml")
    config_path = os.path.join(folder_path, "config.yaml")
    if not os.path.isfile(page_path) or not os.path.isfile(config_path):
        return None

    config = load_yaml_file(config_path)
    card = load_yaml_file(page_path)
    if not isinstance(config, dict):
        raise TypeError(f"More-page configuration {config_path} must contain a mapping")
    if not isinstance(card, (dict, list)):
        raise TypeError(f"More-page content {page_path} must contain a card or card list")
    return {
        "foldername": foldername,
        "name": config.get("name") or foldername,
        "icon": config.get("icon") or "mdi:puzzle",
        "show_in_navbar": bool(config.get("show_in_navbar", False)),
        "sort_order": _sort_order(config),
        "card": card,
    }


def _navigation_entry(
    subdirectory: str,
    name: str,
    icon: str,
    show_in_navbar: bool = False,
    sort_order: int = 99,
) -> dict[str, Any]:
    return {
        "name": name,
        "icon": icon,
        "path": f"dwains-dashboard/configs/more_pages/{subdirectory}/page.yaml",
        "show_in_navbar": show_in_navbar,
        "sort_order": sort_order,
    }


def _sort_order(config: dict[str, Any]) -> int:
    value = config.get("sort_order", 99)
    try:
        return int(value)
    except (TypeError, ValueError):
        return 99


def load_more_page_navigation(
    configs_path: str,
    strict: bool,
) -> tuple[
    bool,
    dict[str, dict[str, Any]],
    list[str],
    list[tuple[str, Exception]],
]:
    """Load navigation metadata and create missing legacy config files."""
    configs_exist = os.path.exists(configs_path)
    pages: dict[str, dict[str, Any]] = {}
    warnings: list[str] = []
    failures: list[tuple[str, Exception]] = []
    more_pages_path = _more_pages_path(configs_path)
    if not configs_exist or not os.path.isdir(more_pages_path):
        return configs_exist, pages, warnings, failures

    for subdirectory in os.listdir(more_pages_path):
        subdirectory_path = os.path.join(more_pages_path, subdirectory)
        page_path = os.path.join(subdirectory_path, "page.yaml")
        if not os.path.exists(page_path):
            continue

        config_path = os.path.join(subdirectory_path, "config.yaml")
        if not os.path.exists(config_path):
            default_config = OrderedDict(
                {
                    "name": subdirectory,
                    "icon": "mdi:puzzle",
                }
            )
            dump_yaml_file(config_path, default_config)
            pages[subdirectory] = _navigation_entry(
                subdirectory,
                subdirectory,
                "mdi:puzzle",
            )
            continue

        if strict:
            config: Any = load_yaml_file(config_path)
            pages[subdirectory] = _navigation_entry(
                subdirectory,
                config["name"],
                config["icon"],
                bool(config.get("show_in_navbar", False)),
                _sort_order(config),
            )
            continue

        try:
            config = load_yaml_file(config_path)
            if "name" in config and "icon" in config:
                pages[subdirectory] = _navigation_entry(
                    subdirectory,
                    config["name"],
                    config["icon"],
                    bool(config.get("show_in_navbar", False)),
                    _sort_order(config),
                )
            else:
                warnings.append(subdirectory)
        except Exception as error:
            failures.append((subdirectory, error))

    return configs_exist, pages, warnings, failures
