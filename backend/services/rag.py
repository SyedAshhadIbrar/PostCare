"""RAG retrieval over post-operative care documents (Phase 3)."""

from __future__ import annotations

from backend.core.settings import RAG_DOCUMENTS_DIR


def retrieve_guidance(
    procedure: str,
    post_op_day: int,
    findings: dict[str, bool],
    symptoms: list[str] | None = None,
) -> list[dict]:
    """
    Placeholder: returns empty evidence until vector store is wired.
    Phase 3 will chunk rag/documents/ and query embeddings.
    """
    _ = (procedure, post_op_day, findings, symptoms, RAG_DOCUMENTS_DIR)
    return []
