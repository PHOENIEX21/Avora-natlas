# AVORA × N-ATLAS — Competition Documentation Index

This is the canonical path through the NAIC/N-ATLAS submission evidence. Use these documents in order and keep measured claims tied to the VALIDATION dataset.

## 1. Competition contract and requirement mapping
- `NAIC-REQUIREMENT-TRACEABILITY.md` — problem, end-to-end acceptance flow, requirement mapping, submission components, validation gates and no-fake-evidence rules.

## 2. Voice architecture and N-ATLAS runtime
- `NATLAS-VOICE-FIRST.md` — voice-first product architecture and N-ATLAS boundary.
- `NATLAS-RUNTIME-DEPLOYMENT.md` — runtime deployment/configuration.
- `.env.natlas.example` — environment contract without secrets.
- `app/api/natlas/asr/route.ts` — authenticated server-side ASR adapter.
- `services/natlas_modal.py` — N-ATLAS ASR runtime.

## 3. Tutor intelligence and answer provenance
- `app/api/tutor/chat/route.ts` — routing from deterministic maths and AVORA curriculum/context to external AI.
- `lib/aiGateway.ts` — Gemini-first AI gateway with OpenAI fallback.
- `database/migrations/035_natlas_ai_provider_evidence.sql` — provider/model/fallback evidence fields.
- `scripts/audit-natlas-tutor-reliability.mjs` — tutor routing regression/preflight checks.

## 4. Validation protocol
- `NAIC-VALIDATION-PROTOCOL.md` — official genuine-interaction protocol and minimum-50 completion gate.
- `NAIC-PILOT-RUNBOOK.md` — pre-validation pilot process and lessons learned.
- `REAL-DEVICE-VALIDATION-PROTOCOL.md` — representative device/network testing.
- Server environment: `NATLAS_EVIDENCE_MODE=VALIDATION` only during genuine validation.

## 5. Evidence implementation
- `NAIC-EVIDENCE-SYSTEM.md` — evidence classes, privacy rules and integrity model.
- `database/migrations/033_natlas_naic_evidence.sql` — interaction evidence schema.
- `database/migrations/034_natlas_evidence_snapshots.sql` — immutable aggregate snapshots.
- `database/migrations/035_natlas_ai_provider_evidence.sql` — Gemini/OpenAI provider evidence.
- `app/api/natlas/evidence/route.ts` — server-controlled evidence ingestion.
- `app/admin/natlas-evidence/page.tsx` — protected validation dashboard.
- `app/api/admin/natlas-evidence/export/route.ts` — VALIDATION-only CSV/JSON export.
- `app/api/admin/natlas-evidence/snapshot/route.ts` — evidence freeze/snapshot.

## 6. Automated technical gates
- `.github/workflows/naic-reliability.yml`
- `scripts/audit-naic-evidence.mjs`
- `scripts/audit-naic-full-flow.mjs`
- `scripts/audit-natlas-boundary.mjs`
- `scripts/audit-natlas-tutor-reliability.mjs`

Automated tests are preflight evidence only. They never count toward the 50 genuine learner voice interactions.

## 7. Final competition evidence pack
After at least 50 genuine VALIDATION interactions:
1. Review failures, transcript corrections, provider/fallback usage, latency, mastery and feedback.
2. Create the immutable validation snapshot from the protected admin dashboard.
3. Export VALIDATION-only CSV and JSON.
4. Produce the validation report using measured results only.
5. Record the demo from the frozen build using `NAIC-DEMO-RUNBOOK.md`.
6. Include team profile and required registration/endorsement evidence separately.

## 8. Demo path
- `NAIC-DEMO-RUNBOOK.md` — 3–5 minute end-to-end competition demo.

The demo should visibly connect: learner → Nigerian-accented voice → N-ATLAS transcript → AVORA curriculum-aware teaching/reasoning → follow-up/mastery → privacy-safe validation evidence.

## Integrity rule
Do not manufacture, duplicate, backfill or relabel interactions. DEVELOPMENT and PILOT remain engineering evidence; only genuine server-recorded VALIDATION interactions count toward the competition threshold.
