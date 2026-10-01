"""N-ATLAS Nigerian-accented English ASR runtime for AVORA.

Deploy with:
    py -m modal deploy services/natlas_modal.py

The endpoint accepts raw audio bytes in the HTTP request body and returns:
    {"text": "...", "model": "NCAIR1/NigerianAccentedEnglish", "language": "en-NG"}

Public attribution required by the model terms:
NigerianAccentedEnglish is powered by Awarri Technologies and an initiative
of the Federal Ministry of Communications, Innovation and Digital Economy.
"""

import io
import os
import secrets
import subprocess
import time

import modal
from fastapi import Request

MODEL_ID = "NCAIR1/NigerianAccentedEnglish"
SAMPLE_RATE = 16_000
MAX_AUDIO_BYTES = 8 * 1024 * 1024

app = modal.App("avora-natlas-asr")

hf_secret = modal.Secret.from_name(
    "huggingface-secret",
    required_keys=["HF_TOKEN"],
)
endpoint_secret = modal.Secret.from_name(
    "natlas-endpoint-secret",
    required_keys=["NATLAS_ENDPOINT_TOKEN"],
)

image = (
    modal.Image.debian_slim(python_version="3.11")
    .apt_install("ffmpeg")
    .uv_pip_install(
        "fastapi",
        "numpy",
        "torch",
        "transformers",
        "accelerate",
        "safetensors",
    )
    .run_commands(
        "python -c \"from huggingface_hub import snapshot_download; "
        "snapshot_download('NCAIR1/NigerianAccentedEnglish', token=True)\"",
        secrets=[hf_secret],
    )
)

_asr = None


def _decode_audio(audio_bytes: bytes):
    """Decode browser/mobile audio to mono 16 kHz float32 PCM using ffmpeg."""
    import numpy as np

    completed = subprocess.run(
        [
            "ffmpeg",
            "-hide_banner",
            "-loglevel",
            "error",
            "-i",
            "pipe:0",
            "-f",
            "f32le",
            "-acodec",
            "pcm_f32le",
            "-ac",
            "1",
            "-ar",
            str(SAMPLE_RATE),
            "pipe:1",
        ],
        input=audio_bytes,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        check=False,
    )

    if completed.returncode != 0 or not completed.stdout:
        detail = completed.stderr.decode("utf-8", errors="replace").strip()
        raise ValueError(detail or "Audio could not be decoded.")

    waveform = np.frombuffer(completed.stdout, dtype=np.float32)
    if waveform.size == 0:
        raise ValueError("Decoded audio is empty.")

    return waveform


@app.function(
    image=image,
    timeout=120,
    scaledown_window=300,
    min_containers=1,
    secrets=[endpoint_secret, hf_secret],
)
@modal.fastapi_endpoint(method="POST")
async def transcribe(request: Request):
    """Transcribe raw audio with the official N-ATLAS Nigerian English ASR model."""
    from fastapi import HTTPException
    import torch
    from transformers import pipeline

    global _asr

    expected = os.environ.get("NATLAS_ENDPOINT_TOKEN", "").strip()
    authorization = request.headers.get("authorization", "")
    supplied = authorization[7:].strip() if authorization.lower().startswith("bearer ") else ""
    if not expected or not supplied or not secrets.compare_digest(supplied, expected):
        raise HTTPException(status_code=401, detail="Unauthorized.")

    audio_bytes = await request.body()

    if not audio_bytes:
        raise HTTPException(status_code=400, detail="Audio body is empty.")

    if len(audio_bytes) > MAX_AUDIO_BYTES:
        raise HTTPException(status_code=413, detail="Audio exceeds the 8 MB limit.")

    try:
        waveform = _decode_audio(audio_bytes)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=f"Invalid audio: {exc}") from exc

    if _asr is None:
        device = 0 if torch.cuda.is_available() else -1
        dtype = torch.float16 if torch.cuda.is_available() else torch.float32
        hf_token = os.environ.get("HF_TOKEN", "").strip()
        if not hf_token:
            raise HTTPException(status_code=503, detail="N-ATLAS model authentication is not configured.")

        _asr = pipeline(
            "automatic-speech-recognition",
            model=MODEL_ID,
            device=device,
            dtype=dtype,
            token=hf_token,
        )

    started = time.perf_counter()

    try:
        result = _asr(
            {"array": waveform, "sampling_rate": SAMPLE_RATE},
            generate_kwargs={"language": "en", "task": "transcribe"},
        )
    except Exception as exc:
        raise HTTPException(status_code=502, detail="N-ATLAS transcription failed.") from exc

    text = str(result.get("text", "")).strip()
    if not text:
        raise HTTPException(status_code=502, detail="N-ATLAS returned an empty transcript.")

    return {
        "text": text,
        "model": MODEL_ID,
        "language": "en-NG",
        "inferenceMs": round((time.perf_counter() - started) * 1000),
    }
