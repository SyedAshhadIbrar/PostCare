"""Database session setup (Phase 2 — PostgreSQL or SQLite)."""

from __future__ import annotations

import os

DATABASE_URL = os.environ.get("POSTCARE_DATABASE_URL", "sqlite:///./postcare.db")


def get_db():
    raise NotImplementedError("Phase 2: wire SQLAlchemy session and models.")
