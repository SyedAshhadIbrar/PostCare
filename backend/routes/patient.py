"""Patient workflow API."""

from __future__ import annotations

from fastapi import APIRouter, File, Form, HTTPException, UploadFile

from backend.database import db
from backend.schemas.case import PatientContext, PostCareCase
from backend.services.agents_pipeline import run_agents
from backend.services.location import get_region_context
from backend.services.rag import retrieve_guidance
from backend.services.safety import evaluate_safety
from backend.services.wound_model import wound_model

router = APIRouter(prefix="/patient", tags=["patient"])

_LABELS = (
    "healing_status",
    "erythema",
    "edema",
    "infection_risk",
    "urgency",
    "exudate",
)


def _vision_findings(case: PostCareCase) -> dict[str, bool]:
    return {name: getattr(case.wound, name).positive for name in _LABELS}


def _enrich_case(case: PostCareCase) -> PostCareCase:
    findings = _vision_findings(case)
    case.safety_flags = evaluate_safety(case)
    case.evidence = retrieve_guidance(
        case.patient.procedure,
        case.patient.post_op_day,
        findings,
        case.patient.symptoms,
    )
    case.location_context = get_region_context(case.patient.location)
    return case


@router.post("/case", response_model=PostCareCase)
async def create_case(
    image: UploadFile = File(...),
    patient_name: str = Form(...),
    pain_score: int = Form(..., ge=0, le=10),
    procedure: str = Form(...),
    post_op_day: int = Form(..., ge=0),
    consultant_surgeon: str | None = Form(None),
    discharge_date: str | None = Form(None),
    location: str | None = Form(None),
    symptoms: str = Form(""),
):
    if wound_model is None:
        raise HTTPException(status_code=503, detail="MedSigLIP model not loaded.")

    if not image.content_type or not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Upload must be an image file.")

    wound = wound_model.predict(await image.read())
    case = PostCareCase(
        case_id=db.new_case_id(),
        patient=PatientContext(
            patient_name=patient_name.strip(),
            pain_score=pain_score,
            procedure=procedure,
            post_op_day=post_op_day,
            consultant_surgeon=consultant_surgeon or None,
            discharge_date=discharge_date or None,
            location=location or None,
            symptoms=[s.strip() for s in symptoms.split(",") if s.strip()],
        ),
        wound=wound,
    )
    return db.save_case(run_agents(_enrich_case(case)))


@router.get("/case/{case_id}/guidance")
async def get_patient_guidance(case_id: str):
    case = db.get_case(case_id)
    if case is None:
        raise HTTPException(status_code=404, detail="Case not found.")
    if not case.patient_guidance:
        raise HTTPException(status_code=404, detail="No guidance for this case.")
    return case.patient_guidance


@router.get("/case/{case_id}", response_model=PostCareCase)
async def get_case(case_id: str):
    case = db.get_case(case_id)
    if case is None:
        raise HTTPException(status_code=404, detail="Case not found.")
    return case
