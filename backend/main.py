from fastapi import FastAPI

from backend.database import db
from backend.routes.clinician import router as clinician_router
from backend.routes.patient import router as patient_router
from backend.routes.wound import router as wound_router

app = FastAPI(
    title="PostCare API",
    description="Post-operative wound assessment and multi-agent care guidance.",
    version="0.3.0",
)

app.include_router(wound_router)
app.include_router(patient_router)
app.include_router(clinician_router)


@app.on_event("startup")
def startup() -> None:
    db.init_db()


@app.get("/health")
def health():
    from backend.services.wound_model import wound_model as wm

    return {
        "status": "ok",
        "model_loaded": wm is not None,
        "model_version": wm.model_version if wm else None,
    }
