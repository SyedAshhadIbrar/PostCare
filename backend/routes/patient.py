"""Patient workflow API (Phase 2 — case submission)."""

from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/patient", tags=["patient"])

_CASES: dict[str, dict] = {}


@router.post("/case")
async def create_case():
    raise HTTPException(
        status_code=501,
        detail="Phase 2: combine wound upload, patient context, and persistence.",
    )


@router.get("/case/{case_id}")
async def get_case(case_id: str):
    if case_id not in _CASES:
        raise HTTPException(status_code=404, detail="Case not found.")
    return _CASES[case_id]
