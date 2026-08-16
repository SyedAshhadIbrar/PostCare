"""Clinician handoff agent — PostCare-Gemini with structured fallback."""

from __future__ import annotations

import json
from typing import Any

from backend.schemas.case import PostCareCase
from backend.services import postcare_gemini as gemini


def create_clinician_summary(case: PostCareCase, triage_result: dict[str, Any]) -> dict[str, Any]:
    base = {
        "case_id": case.case_id,
        "priority": triage_result.get("priority", "routine"),
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

    if gemini.is_configured():
        prompt = f"""You are PostCare-Gemini clinician handoff agent.
Return JSON: {{"summary": "2-3 sentence clinical handoff for nurse/doctor review"}}
Include post-op day, procedure, pain, key MedSigLIP visual signals. No definitive diagnosis.

Case: {case.model_dump(mode="json")}
Triage: {json.dumps(triage_result)}"""
        result = gemini.generate_json(prompt)
        if result and result.get("summary"):
            base["summary"] = result["summary"]
            base["agent"] = gemini.AGENT_NAME
            return base

    base["summary"] = (
        f"Post-op day {case.patient.post_op_day}, {case.patient.procedure}. "
        f"Reported pain {case.patient.pain_score}/10."
    )
    base["agent"] = triage_result.get("agent", "PostCare-rules")
    return base
