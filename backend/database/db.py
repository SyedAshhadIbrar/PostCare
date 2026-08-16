"""SQLite persistence for patient cases. ponytail: one table, JSON blob, stdlib only."""

from __future__ import annotations

import json
import sqlite3
import uuid
from datetime import datetime, timezone
from pathlib import Path

from backend.schemas.case import PostCareCase

DB_PATH = Path(__file__).resolve().parents[2] / "postcare.db"


def _connect() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    with _connect() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS cases (
                case_id TEXT PRIMARY KEY,
                data TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
            """
        )


def save_case(case: PostCareCase) -> PostCareCase:
    init_db()
    payload = case.model_dump(mode="json")
    with _connect() as conn:
        conn.execute(
            "INSERT INTO cases (case_id, data, created_at) VALUES (?, ?, ?)",
            (case.case_id, json.dumps(payload), datetime.now(timezone.utc).isoformat()),
        )
    return case


def get_case(case_id: str) -> PostCareCase | None:
    init_db()
    with _connect() as conn:
        row = conn.execute("SELECT data FROM cases WHERE case_id = ?", (case_id,)).fetchone()
    if not row:
        return None
    return PostCareCase.model_validate(json.loads(row["data"]))


def update_case(case: PostCareCase) -> PostCareCase:
    init_db()
    with _connect() as conn:
        conn.execute(
            "UPDATE cases SET data = ? WHERE case_id = ?",
            (json.dumps(case.model_dump(mode="json")), case.case_id),
        )
    return case


_PRIORITY_ORDER = {"high": 0, "needs_review": 1, "routine": 2}


def list_cases() -> list[PostCareCase]:
    init_db()
    with _connect() as conn:
        rows = conn.execute("SELECT data FROM cases").fetchall()
    cases = [PostCareCase.model_validate(json.loads(row["data"])) for row in rows]
    cases.sort(key=lambda c: _PRIORITY_ORDER.get(c.clinician_priority or "routine", 9))
    return cases


def new_case_id() -> str:
    return f"PC-{uuid.uuid4().hex[:6].upper()}"


if __name__ == "__main__":
    import sys

    sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
    from backend.schemas.case import PostCareCase as _PostCareCase

    init_db()
    sample = _PostCareCase(
        case_id=new_case_id(),
        patient={
            "pain_score": 3,
            "procedure": "appendectomy",
            "post_op_day": 5,
        },
        wound={
            "healing_status": {"positive": False, "score": 0.2, "threshold": 0.5},
            "erythema": {"positive": False, "score": 0.1, "threshold": 0.5},
            "edema": {"positive": False, "score": 0.1, "threshold": 0.5},
            "infection_risk": {"positive": False, "score": 0.1, "threshold": 0.5},
            "urgency": {"positive": False, "score": 0.1, "threshold": 0.5},
            "exudate": {"positive": False, "score": 0.1, "threshold": 0.5},
        },
    )
    save_case(sample)
    loaded = get_case(sample.case_id)
    assert loaded and loaded.case_id == sample.case_id
    print(f"ok: {sample.case_id}")
