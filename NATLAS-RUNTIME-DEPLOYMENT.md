# N-ATLAS ASR Runtime Deployment

The AVORA browser never receives N-ATLAS runtime credentials. Audio is sent to AVORA's authenticated `/api/natlas/asr` route, which calls the N-ATLAS runtime server-to-server.

## Required secrets
Modal must contain:
- `huggingface-secret` with `HF_TOKEN`
- `natlas-endpoint-secret` with `NATLAS_ENDPOINT_TOKEN`

The AVORA server environment must contain:
- `NATLAS_ASR_ENDPOINT` — deployed Modal endpoint
- `NATLAS_ASR_TOKEN` — exactly the same secret value as Modal's `NATLAS_ENDPOINT_TOKEN`
- `NATLAS_ASR_MODEL=NCAIR1/NigerianAccentedEnglish`
- `NATLAS_EVIDENCE_MODE=DEVELOPMENT` until genuine pilot/validation begins

Generate a long random endpoint token. Do not commit it to GitHub and do not expose it as a NEXT_PUBLIC variable.

## Deployment
After the two Modal secrets exist, deploy `services/natlas_modal.py` with the Modal CLI. Then set the returned endpoint and matching token in the AVORA server environment.

## Security contract
The Modal endpoint rejects missing or incorrect bearer credentials. AVORA validates authentication, audio size and MIME type before forwarding. The upstream call has a bounded timeout and disables caching. Raw learner audio is used for transcription but is not written into the NAIC evidence table.

## Verification
A valid signed-in learner voice request should return provider N-ATLAS, the configured model identifier, en-NG, transcript, and latency. An unsigned AVORA request must fail. A direct Modal request without the bearer token must fail with 401. Timeout/upstream/empty-transcript failures must remain visible rather than silently switching to another ASR provider.
