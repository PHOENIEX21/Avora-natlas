"""Local CPU runtime for AVORA N-ATLAS Nigerian English ASR.

Run from the repository root:
    python -m uvicorn services.natlas_local:app --host 127.0.0.1 --port 8000

Required environment variables:
    HF_TOKEN              Hugging Face token with access to the gated model.
    NATLAS_ENDPOINT_TOKEN A private bearer token used by AVORA.

Public attribution required by the model terms:
NigerianAccentedEnglish is powered by Awarri Technologies and an initiative
of the Federal Ministry of Communications, Innovation and Digital Economy.
"""

import os
import secrets
import subprocess
import time

import numpy as np
import torch
from fastapi import FastAPI, HTTPException, Request
from transformers import pipeline

MODEL_ID = "NCAIR1/NigerianAccentedEnglish"
SAMPLE_RATE = 16_000
MAX_AUDIO_BYTES = 8 * 1024 * 1024

app = FastAPI(title="AVORA N-ATLAS Local ASR", version="1.0.0")
_asr = None


def decode_audio(audio_bytes: bytes) -> np.ndarray:
    completed = subprocess.run(
        [
            "ffmpeg", "-hide_banner", "-loglevel", "error",
            "-i", "pipe:0",
            "-f", "f32le", "-acodec", "pcm_f32le",
            "-ac", "1", "-ar", str(SAMPLE_RATE), "pipe:1",
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


def get_asr():
    global _asr
    if _asr is not None:
        return _asr

    hf_token = os.environ.get("HF_TOKEN", "").strip()
    if not hf_token:
        raise RuntimeError("HF_TOKEN is not configured.")

    print(f"Loading {MODEL_ID} on CPU. First startup may take several minutes...")
    _asr = pipeline(
        "automatic-speech-recognition",
        model=MODEL_ID,
        device=-1,
        dtype=torch.float32,
        token=hf_token,
    )
    print("N-ATLAS model ready.")
    return _asr


@app.get("/health")
def health():
    return {
        "ok": True,
        "model": MODEL_ID,
        "runtime": "local-cpu",
        "modelLoaded": _asr is not None,
    }


@app.post("/transcribe")
async def transcribe(request: Request):
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
        waveform = decode_audio(audio_bytes)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=f"Invalid audio: {exc}") from exc

    try:
        asr = get_asr()
    except Exception as exc:
        raise HTTPException(status_code=503, detail=f"N-ATLAS model could not load: {exc}") from exc

    started = time.perf_counter()
    try:
        result = asr(
            {"array": waveform, "sampling_rate": SAMPLE_RATE},
            generate_kwargs={"language": "en", "task": "transcribe"},
        )
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"N-ATLAS transcription failed: {exc}") from exc

    transcript = str(result.get("text", "")).strip()
    if not transcript:
        raise HTTPException(status_code=502, detail="N-ATLAS returned an empty transcript.")

    return {
        "text": transcript,
        "model": MODEL_ID,
        "language": "en-NG",
        "runtime": "local-cpu",
        "inferenceMs": round((time.perf_counter() - started) * 1000),
    }
