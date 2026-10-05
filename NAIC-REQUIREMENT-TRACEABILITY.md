# AVORA × N-ATLAS — NAIC Requirement Traceability

This is the build contract for the competition version. A feature is not considered complete merely because it renders; it must solve the Voice-First Access problem end to end and leave verifiable evidence.

## Problem being solved
A learner should be able to enter a real AVORA lesson, ask a learning question by voice in Nigerian-accented English, have N-ATLAS transcribe that question, receive a useful curriculum-aware answer, continue with a follow-up or mastery check, and have the interaction measured without exposing unnecessary personal data.

## End-to-end acceptance flow
1. Authenticated learner opens AVORA.
2. Learner selects class, subject and topic and sees the verified authored lesson.
3. Learner taps Ask AVORA / microphone and records a question.
4. AVORA sends only that recording to the authenticated server-side N-ATLAS ASR adapter.
5. N-ATLAS returns the transcript, provider/model identity and measured latency.
6. The transcript remains visible to the learner; AVORA does not silently rewrite an ASR mistake.
7. AVORA routes the question through deterministic maths, contextual teaching, verified curriculum, general learning and only then an optional external AI.
8. The answer exposes truthful provenance internally and unavailable answers are not disguised as successful teaching.
9. The learner can continue the conversation or complete a mastery/follow-up check.
10. Privacy-minimized evidence records the N-ATLAS result, answer result, source, latency and learning outcome.
11. DEVELOPMENT, PILOT and VALIDATION remain distinct. Only genuine real-user VALIDATION interactions count toward the competition figure.
12. Admin evidence view reports validation totals, sessions/users, ASR reliability, latency, answer provenance, failures and learning evidence.

## Competition requirement mapping

### Working Artefact & Technical Rigour
Evidence: deployed AVORA learner flow, authenticated ASR boundary, authored curriculum, tutor routing, failure handling, automated regression audits, evidence dashboard and immutable aggregate snapshots.

Acceptance: a reviewer can operate the learner journey without a mock screen or manual database manipulation.

### Genuine N-ATLAS Integration
Evidence: `/api/natlas/asr` calls the configured N-ATLAS runtime server-side; expected model is `NCAIR1/NigerianAccentedEnglish`; provider/model and latency are returned and recorded. There is no silent alternate-ASR fallback.

Acceptance: disabling the N-ATLAS runtime causes a truthful N-ATLAS failure rather than another ASR provider taking over.

### Real-World Validation
Evidence: dedicated evidence records with mode `VALIDATION`, distinct anonymous sessions/users, success/failure, latency, answer provenance, mastery result and optional feedback.

Acceptance: at least 50 genuine documented real-user voice interactions are completed before submission. Development and pilot interactions are excluded.

### Impact Potential
Evidence to collect during validation: whether learners can successfully ask curriculum questions by voice, obtain useful responses, continue after ASR errors, and complete a learning/mastery step. The final impact claim must use measured validation results, not projections presented as facts.

### Scalability & Sustainability
Current technical evidence: low-bandwidth text-first AVORA UI, short compressed browser audio, separate replaceable ASR runtime, bounded payloads, no paid AI requirement in the grounded core answer path, and privacy-minimized telemetry.

Remaining acceptance: measure representative network/device behaviour during pilot/validation and document actual observed latency/retry behaviour.

### Team Capability
Submission evidence still required outside the runtime: names, affiliations and roles. Do not invent them.

## Seven submission components
1. Working Artefact — competition repository plus deployed application.
2. N-ATLAS Integration Evidence — this traceability document, architecture documentation, runtime configuration and measured dashboard evidence.
3. Real-World Validation — VALIDATION-only export/report with minimum 50 genuine voice interactions.
4. Technical Documentation — architecture, setup, security/privacy, routing, evidence schema and usage.
5. Video Demonstration — 3–5 minute end-to-end real run: lesson → voice → N-ATLAS → answer → follow-up/mastery → evidence.
6. Team Profile — names, affiliations and roles supplied truthfully by the team.
7. Endorsement / Registration — required Track A institutional letter or Track B CAC certificate/ID, as applicable.

## Test gates before real validation
Gate A — static/regression: typecheck, lint, NAIC evidence audit, tutor reliability audit, N-ATLAS boundary audit and relevant AVORA launch audits pass.
Gate B — development end-to-end: real browser microphone → real N-ATLAS runtime → transcript → correct AVORA routing → evidence row; exercise error and timeout paths too.
Gate C — pilot: small genuine-user pilot on representative mobile/network conditions. Fix material problems before official counting.
Gate D — validation: explicitly enable VALIDATION mode only for genuine documented sessions; complete at least 50 interactions across varied questions/topics rather than repeating one canned prompt.
Gate E — submission freeze: capture immutable evidence snapshot, export evidence, record demo video from the frozen build, finish technical/validation PDFs and verify every form claim against collected evidence.

## No-fake-evidence rules
Never invent users, interactions, success rates, latency, feedback or benchmarks. Never count development tests as real-user validation. Never hide failed N-ATLAS requests. Never describe an undeployed or untested path as proven. Preserve enough failure evidence to show what was found and improved.
