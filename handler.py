"""Runpod repository entry point for AVORA N-ATLAS ASR."""
from services.natlas_runpod import handler
import runpod

runpod.serverless.start({"handler": handler})
