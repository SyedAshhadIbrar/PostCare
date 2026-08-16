"""Clinician dashboard API."""

from __future__ import annotations

from fastapi import APIRouter, HTTPException

from backend.database import db

router = APIRouter(prefix="/clinician", tags=["clinician"])


@router.get("/cases")
async def list_cases():
    return [
        {
            "case_id": c.case_id,
            "priority": c.clinician_priority or "routine",
            "status": c.status,
            "procedure": c.patient.procedure,
            "post_op_day": c.patient.post_op_day,
            "pain_score": c.patient.pain_score,
        }
        for c in db.list_cases()
    ]


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
