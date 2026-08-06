"""Filesystem snapshot loader for Dwains Dashboard configuration."""

from __future__ import annotations

import os
from collections import OrderedDict
from typing import Any

from .yaml_files import load_yaml_file, load_yaml_file_or_default


def _load_grouped_cards(directory: str) -> dict[str, dict[str, Any]]:
    cards: dict[str, dict[str, Any]] = {}
    if not os.path.isdir(directory):
        return cards

    for subdirectory in os.listdir(directory):
        cards[subdirectory] = {}
        subdirectory_path = os.path.join(directory, subdirectory)
        for filename in sorted(os.listdir(subdirectory_path)):
            if filename.endswith(".yaml"):
                cards[subdirectory][filename] = load_yaml_file(
                    os.path.join(subdirectory_path, filename)
                )
    return cards


def _load_flat_cards(directory: str) -> dict[str, Any]:
    cards: dict[str, Any] = {}
    if not os.path.isdir(directory):
        return cards

    for filename in os.listdir(directory):
        if filename.endswith(".yaml"):
            cards[filename.replace(".yaml", "")] = load_yaml_file(
                os.path.join(directory, filename)
            )
    return cards


def _load_more_pages(directory: str) -> dict[str, Any]:
    pages: dict[str, Any] = {}
    if not os.path.isdir(directory):
        return pages

    for subdirectory in os.listdir(directory):
        subdirectory_path = os.path.join(directory, subdirectory)
        page_path = os.path.join(subdirectory_path, "page.yaml")
        config_path = os.path.join(subdirectory_path, "config.yaml")
        if os.path.exists(page_path) and os.path.exists(config_path):
            config = load_yaml_file(config_path)
            pages[subdirectory] = (
                {
                    **config,
                    "foldername": subdirectory,
                    "card": load_yaml_file(page_path),
                }
                if isinstance(config, dict)
                else config
            )
    return pages


def load_configuration_files(configs_path: str) -> dict[str, Any]:
    """Read one coherent dashboard configuration snapshot."""
    cards_path = os.path.join(configs_path, "cards")
    return {
        "areas": load_yaml_file_or_default(
            os.path.join(configs_path, "areas.yaml"), OrderedDict()
        ),
        "area_cards": _load_grouped_cards(os.path.join(cards_path, "areas")),
        "device_cards": _load_grouped_cards(os.path.join(cards_path, "devices")),
        "entity_cards": _load_flat_cards(os.path.join(cards_path, "entities")),
        "entities_popup": _load_flat_cards(
            os.path.join(cards_path, "entities_popup")
        ),
        "entities": load_yaml_file_or_default(
            os.path.join(configs_path, "entities.yaml"), OrderedDict()
        ),
        "devices": load_yaml_file_or_default(
            os.path.join(configs_path, "devices.yaml"), OrderedDict()
        ),
        "homepage_header": load_yaml_file_or_default(
            os.path.join(configs_path, "settings.yaml"), OrderedDict()
        ),
        "more_pages": _load_more_pages(os.path.join(configs_path, "more_pages")),
        "devices_card": _load_flat_cards(os.path.join(cards_path, "devices_card")),
        "devices_popup": _load_flat_cards(
            os.path.join(cards_path, "devices_popup")
        ),
    }
