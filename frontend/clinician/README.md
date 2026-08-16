# Clinician frontend (Phase 5)

Planned stack: React or Next.js dashboard.

Features:
- Priority-sorted case queue (`GET /clinician/cases`)
- Case detail: wound image, MedSigLIP scores, AI summary, evidence
- Review actions (`POST /clinician/cases/{id}/review`)

Human-in-the-loop: clinicians validate or override AI triage before patient-facing guidance is finalized.
