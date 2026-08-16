"""Application settings and resolved paths."""

from __future__ import annotations

import os
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
MODEL_DIR = Path(os.environ.get("POSTCARE_MODEL_DIR", REPO_ROOT / "models" / "medsiglip"))
RAG_DOCUMENTS_DIR = REPO_ROOT / "rag" / "documents"

HF_TOKEN = os.environ.get("HF_TOKEN")
DEVICE = os.environ.get("POSTCARE_DEVICE", "cpu")
