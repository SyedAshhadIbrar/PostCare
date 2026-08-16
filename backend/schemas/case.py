"""Complete patient case combining vision assessment and context."""

from pydantic import BaseModel, Field

from backend.schemas.assessment import WoundAssessment


class PatientContext(BaseModel):
    pain_score: int = Field(ge=0, le=10)
    procedure: str
    post_op_day: int = Field(ge=0)
    location: str | None = None
    symptoms: list[str] = Field(default_factory=list)


class PostCareCase(BaseModel):
    case_id: str
    patient: PatientContext
    wound: WoundAssessment
    status: str = "submitted"
    clinician_priority: str | None = None
