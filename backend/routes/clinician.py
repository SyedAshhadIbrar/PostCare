"""Clinician dashboard API."""

from __future__ import annotations

from fastapi import APIRouter, HTTPException

from backend.database import db

router = APIRouter(prefix="/clinician", tags=["clinician"])


def _row(c) -> dict:
    return {
        "case_id": c.case_id,
        "created_at": c.created_at,
        "patient_name": c.patient.patient_name,
        "procedure": c.patient.procedure,
        "consultant_surgeon": c.patient.consultant_surgeon or "—",
        "discharge_date": c.patient.discharge_date or "—",
        "priority": c.clinician_priority or "routine",
        "status": c.status,
        "post_op_day": c.patient.post_op_day,
        "pain_score": c.patient.pain_score,
    }


@router.get("/cases")
async def list_cases():
    return [_row(c) for c in db.list_cases()]


@router.get("/stats")
async def dashboard_stats():
    cases = db.list_cases()
    return {
        "discharge_patients": sum(1 for c in cases if c.status == "awaiting_review"),
        "on_track": sum(
            1 for c in cases if c.status in ("guidance_sent", "submitted") and (c.clinician_priority or "routine") == "routine"
        ),
        "completed": sum(1 for c in cases if c.status == "reviewed"),
    }


@router.get("/cases/{case_id}")
async def get_case(case_id: str):
    case = db.get_case(case_id)
    if case is None:
        raise HTTPException(status_code=404, detail="Case not found.")
    return case.model_dump()


@router.post("/cases/{case_id}/review")
async def review_case(case_id: str):
    case = db.get_case(case_id)
    if case is None:
        raise HTTPException(status_code=404, detail="Case not found.")
    case.status = "reviewed"
    db.update_case(case)
    return {"case_id": case_id, "status": case.status}
