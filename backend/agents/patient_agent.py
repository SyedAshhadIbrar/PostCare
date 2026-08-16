"""Patient-facing communication agent (Phase 4)."""

from __future__ import annotations

from typing import Any


def create_patient_message(triage_result: dict[str, Any], evidence: list[dict]) -> dict[str, str]:
    """Turn triage output into empathetic, safety-netted patient language."""
    priority = triage_result.get("priority", "routine")
    if priority in ("high", "needs_review"):
        message = (
            "We noticed signals that may need clinical attention. "
            "A care team member will review your case. "
            "If pain worsens or you feel unwell, seek urgent care."
        )
    else:
        message = (
            "Your submission looks stable based on current signals. "
            "Continue your post-operative care plan and monitor for changes."
        )

    return {
        "message": message,
        "priority": priority,
        "evidence_count": str(len(evidence)),
    }
