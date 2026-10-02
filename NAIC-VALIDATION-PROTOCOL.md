# AVORA × N-ATLAS — Real-World Validation Protocol

## Integrity rule
Official challenge evidence is counted only while `NATLAS_EVIDENCE_MODE=VALIDATION`. DEVELOPMENT and PILOT rows remain visible for engineering evidence but never count toward the minimum 50 documented real-user voice interactions. Never manufacture, duplicate, backfill, or relabel engineering traffic as validation.

## Before validation
1. Complete development and pilot testing.
2. Deploy the authenticated N-ATLAS ASR runtime and set the matching server-only `NATLAS_ASR_TOKEN`.
3. Apply evidence migrations 033, 034 and 035 before validation. Migration 035 records AI provider/model/fallback provenance; verify all three migrations on the production database before collecting official evidence.
4. Confirm the learner is signed in with a STUDENT account and the correct class/exam profile.
5. Confirm the admin evidence dashboard is accessible only to administrators.
6. Change the deployment environment to `NATLAS_EVIDENCE_MODE=VALIDATION` only for the genuine validation period.

## Interaction protocol
Use real learners and varied curriculum tasks. Each interaction should follow the natural learner flow: open AVORA, choose learning context when relevant, ask a genuine question by voice, inspect the visible N-ATLAS transcript, accept or correct it, receive AVORA's answer, continue with a follow-up or mastery check where appropriate, and optionally rate usefulness.

Do not coach learners to repeat one canned sentence. Preserve ASR failures, timeouts, corrections, unavailable answers, and poor ratings.

## Evidence captured
Anonymous session key, interaction key, en-NG language marker, learner class, subject/topic, N-ATLAS model, ASR success/failure and latency, transcript-corrected flag, answer provenance/success/latency, mastery check/outcome, usefulness rating, failure code, and timestamp. Raw audio, transcript text, full answers, names, email addresses, IP addresses, and browser user-agent strings are intentionally excluded from the competition evidence table.

## Completion gate
Do not claim the Voice-First validation threshold until the dashboard shows at least 50 genuine VALIDATION interactions. Before freezing evidence, review failure evidence, source provenance, latency distribution, transcript corrections, mastery outcomes, and feedback. Capture an immutable validation snapshot and export the validation-only CSV/JSON for the submission evidence pack.

## Reporting
Report the actual number of learners/sessions/interactions and observed outcomes. Separate measured results from interpretation. Document failures and changes made after pilot testing.
