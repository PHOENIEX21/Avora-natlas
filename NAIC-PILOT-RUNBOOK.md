# AVORA × N-ATLAS — Pilot Runbook

PILOT is the quality gate before official VALIDATION. Pilot interactions are real learner tests but do not count toward the minimum 50 VALIDATION interactions. Keep `NATLAS_EVIDENCE_MODE=PILOT` throughout this stage.

## Pilot group
Use at least 5 genuine JSS1–JSS3 learners, with varied class levels, speaking pace, Nigerian-accented English, devices and ordinary network conditions. Do not script their wording or tell them expected answers.

## Seven checks
1. Access: sign in, open Learn, choose subject/topic and enter a lesson without an incorrect premium redirect.
2. Voice: microphone reaches N-ATLAS; transcript is visible and can be corrected rather than silently rewritten.
3. Routing: AVORA answers the actual question and does not jump to unrelated curriculum.
4. Reasoning: calculations/problems show correct working and incorrect learner claims are corrected.
5. Teaching: curriculum answers remain grounded; follow-ups such as “why?”, “another example” and “I don't understand” remain coherent.
6. Failure honesty: unclear ASR, unsupported questions, provider errors and low-confidence retrieval produce clarification/truthful unavailability, never invented curriculum.
7. Evidence: interaction appears as PILOT with N-ATLAS status/latency, answer provenance/status, correction/feedback and learning outcome where applicable.

## Coverage
Across the group include Mathematics and English, at least two class levels, direct calculation, word problem, equation, geometry, curriculum explanation, grammar/oral English, follow-up, deliberately wrong learner answer, ambiguous/garbled utterance, subject switch and unrelated non-learning question. Learners should phrase questions naturally.

## Stop conditions
Pause if there is repeated wrong-subject routing, wrong deterministic calculation, blocked Learn access, silent N-ATLAS bypass, lost transcript correction, unrelated curriculum on an unsupported question, missing evidence, or a serious privacy/security failure. Fix the cause, rerun automated gates, redeploy and repeat a small pilot.

## Promotion gate
Move to VALIDATION only when CI audit and typecheck pass on the deployed commit; the complete learner flow works; no known repeated wrong-routing/wrong-calculation defect remains; PILOT evidence is separated from VALIDATION; and pilot failures have a disposition (fixed, accepted limitation, or truthful fallback).

Changing to VALIDATION is an explicit deployment environment action. Never relabel DEVELOPMENT/PILOT rows.

## Official validation
After promotion, collect at least 50 genuine real-user voice interactions. Preserve failures. Use the dashboard, immutable snapshot and validation-only export as the measured evidence source. Never manufacture, duplicate or backfill interactions.
