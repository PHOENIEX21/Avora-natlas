"""Runpod Serverless queue worker for AVORA N-ATLAS ASR."""
import base64, os, subprocess, time
import numpy as np
import runpod
import torch
from transformers import pipeline

MODEL_ID = "NCAIR1/NigerianAccentedEnglish"
SAMPLE_RATE = 16000
MAX_AUDIO_BYTES = 8 * 1024 * 1024
_asr = None

def decode_audio(audio_bytes: bytes):
    p = subprocess.run(
        ["ffmpeg","-hide_banner","-loglevel","error","-i","pipe:0",
         "-f","f32le","-acodec","pcm_f32le","-ac","1","-ar",str(SAMPLE_RATE),"pipe:1"],
        input=audio_bytes, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=False)
    if p.returncode != 0 or not p.stdout:
        raise ValueError(p.stderr.decode("utf-8", errors="replace").strip() or "Audio could not be decoded.")
    waveform=np.frombuffer(p.stdout,dtype=np.float32)
    if waveform.size == 0: raise ValueError("Decoded audio is empty.")
    return waveform

def get_asr():
    global _asr
    if _asr is None:
        token=os.environ.get("HF_TOKEN","").strip()
        if not token: raise RuntimeError("HF_TOKEN is not configured.")
        device=0 if torch.cuda.is_available() else -1
        dtype=torch.float16 if torch.cuda.is_available() else torch.float32
        _asr=pipeline("automatic-speech-recognition",model=MODEL_ID,device=device,dtype=dtype,token=token)
    return _asr

def handler(job):
    inp=job.get("input") or {}
    encoded=inp.get("audio")
    if not isinstance(encoded,str) or not encoded:
        return {"error":"audio is required as base64","code":"INVALID_AUDIO"}
    try: audio=base64.b64decode(encoded,validate=True)
    except Exception: return {"error":"audio must be valid base64","code":"INVALID_AUDIO"}
    if not audio: return {"error":"audio is empty","code":"INVALID_AUDIO"}
    if len(audio)>MAX_AUDIO_BYTES: return {"error":"audio exceeds the 8 MB limit","code":"AUDIO_TOO_LARGE"}
    try: waveform=decode_audio(audio)
    except ValueError as exc: return {"error":f"Invalid audio: {exc}","code":"INVALID_AUDIO"}
    started=time.perf_counter()
    try:
        result=get_asr()({"array":waveform,"sampling_rate":SAMPLE_RATE},
                         generate_kwargs={"language":"en","task":"transcribe"})
    except Exception:
        return {"error":"N-ATLAS transcription failed.","code":"TRANSCRIPTION_FAILED"}
    text=str(result.get("text","")).strip()
    if not text: return {"error":"N-ATLAS returned an empty transcript.","code":"EMPTY_TRANSCRIPT"}
    return {"text":text,"model":MODEL_ID,"language":"en-NG",
            "inferenceMs":round((time.perf_counter()-started)*1000)}

runpod.serverless.start({"handler":handler})
