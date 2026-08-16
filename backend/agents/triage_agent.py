"""Central triage agent — combines vision, patient context, RAG, and safety (Phase 4)."""

from __future__ import annotations

from typing import Any

from backend.schemas.case import PostCareCase


def triage_case(
    case: PostCareCase,
    evidence: list[dict],
    safety_flags: list[str],
    location_context: dict | None = None,
) -> dict[str, Any]:
    """
    Phase 4: invoke LLM with structured output.
    MVP returns deterministic routing from safety + vision signals.
    """
    _ = (evidence, location_context)

    priority = "routine"
    if safety_flags:
        priority = "needs_review" if len(safety_flags) < 3 else "high"

    return {
        "priority": priority,
        "reason_codes": safety_flags,
        "recommended_route": "clinician_review" if safety_flags else "patient_self_care",
        "evidence_ids": [doc.get("id") for doc in evidence if doc.get("id")],
        "case_id": case.case_id,
    }
