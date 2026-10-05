# AVORA × N-ATLAS Voice-First Integration

## Competition path
AVORA remains the curriculum, lesson, exercise and mastery system. N-ATLAS is the speech-access layer.

First verified pipeline:

1. Learner records a short voice question.
2. AVORA sends the audio to `POST /api/natlas/asr`.
3. The server forwards audio to the configured N-ATLAS ASR runtime.
4. The runtime uses `NCAIR1/NigerianAccentedEnglish`.
5. AVORA receives a transcript plus measured latency.
6. A later integration step feeds that transcript into AVORA's existing lesson-grounded tutor route.

## Truthful failure behaviour
There is no silent fallback to browser speech recognition, Gemini, OpenAI, or another ASR provider. If N-ATLAS is unavailable, the endpoint returns a visible N-ATLAS error. This keeps competition evidence attributable to N-ATLAS.

## Runtime configuration
```env
NATLAS_ASR_MODEL="NCAIR1/NigerianAccentedEnglish"
NATLAS_ASR_ENDPOINT=""
NATLAS_ASR_TOKEN=""
NEXT_PUBLIC_NATLAS_VOICE_ENABLED="false"
```

Do not commit a real token.

## Runtime boundary
The official model can be loaded with the Hugging Face Transformers ASR pipeline. The Next.js application should not bundle the Python/PyTorch model itself. Host the ASR model in a separate inference runtime and point `NATLAS_ASR_ENDPOINT` at it.

The HTTP adapter deliberately lives server-side so the inference host can change without changing the learner UI and so authentication credentials never reach the browser.
