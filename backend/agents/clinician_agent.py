"""Clinician handoff agent (Phase 4)."""

from __future__ import annotations

from typing import Any

from backend.schemas.case import PostCareCase


def create_clinician_summary(case: PostCareCase, triage_result: dict[str, Any]) -> dict[str, Any]:
    """Structured summary for the clinician dashboard."""
    return {
        "case_id": case.case_id,
        "priority": triage_result.get("priority", "routine"),
        "summary": (
            f"Post-op day {case.patient.post_op_day}, {case.patient.procedure}. "
            f"Reported pain {case.patient.pain_score}/10."
        ),
        "reported_pain": case.patient.pain_score,
        "visual_findings": {
            "healing_status": case.wound.healing_status.score,
            "erythema": case.wound.erythema.score,
            "edema": case.wound.edema.score,
            "infection_risk": case.wound.infection_risk.score,
            "urgency": case.wound.urgency.score,
            "exudate": case.wound.exudate.score,
        },
        "reason_codes": triage_result.get("reason_codes", []),
        "recommended_route": triage_result.get("recommended_route"),
    }
