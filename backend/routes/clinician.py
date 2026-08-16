"""Clinician dashboard API (Phase 4)."""

from fastapi import APIRouter

router = APIRouter(prefix="/clinician", tags=["clinician"])


@router.get("/cases")
async def list_cases():
    return []


@router.get("/cases/{case_id}")
async def get_case(case_id: str):
    return {"case_id": case_id, "status": "awaiting_review"}


@router.post("/cases/{case_id}/review")
async def review_case(case_id: str):
    return {"case_id": case_id, "status": "reviewed"}
