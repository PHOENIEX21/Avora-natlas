# NAIC Evidence System

This repository records competition evidence while AVORA operates rather than reconstructing results later.

## Evidence classes
- DEVELOPMENT — developer/internal testing. Never counted as official real-user validation.
- PILOT — controlled pre-validation sessions. Kept separate from official figures.
- VALIDATION — genuine real-user interactions only. This is the dataset used for the Voice-First Access validation count.

## Privacy rule
The evidence table intentionally does not store raw audio, learner names, email addresses, IP addresses, user-agent strings, full transcripts or full tutor answers. It records operational evidence and outcomes.

## Per-interaction evidence
Anonymous session/interaction keys, language, class/subject/topic, N-ATLAS ASR provider/model, ASR success and latency, whether the transcript required correction, answer source and success/latency, mastery-check result, optional 1–5 feedback and a bounded failure code.

## Submission mapping
1. Working Artefact & Technical Rigour — reproducible interaction records and reliability metrics.
2. N-ATLAS Integration — provider/model, ASR success/failure and latency evidence.
3. Real-World Validation — VALIDATION-only records; DEVELOPMENT and PILOT cannot inflate the official count.
4. Technical Documentation — schema, endpoint and privacy design documented here.
5. Video Demonstration — evidence dashboard can show the same pipeline used by the live artefact.

## Integrity
Never convert DEVELOPMENT/PILOT rows into VALIDATION merely to increase totals. Official figures must be computed only from genuine VALIDATION interactions.
