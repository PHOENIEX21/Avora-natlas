-- Competition validation provenance: distinguish preferred Gemini from OpenAI fallback without storing learner content.
ALTER TABLE natlas_validation_interactions
 ADD COLUMN IF NOT EXISTS answer_provider text CHECK (answer_provider IS NULL OR answer_provider IN ('gemini','openai')),
 ADD COLUMN IF NOT EXISTS answer_model text,
 ADD COLUMN IF NOT EXISTS ai_fallback_used boolean;

CREATE INDEX IF NOT EXISTS idx_natlas_validation_provider_created
 ON natlas_validation_interactions(answer_provider, created_at DESC);

COMMENT ON COLUMN natlas_validation_interactions.answer_provider IS 'AI provider used for the answer when answer_source is EXTERNAL_AI.';
COMMENT ON COLUMN natlas_validation_interactions.ai_fallback_used IS 'True when OpenAI answered after preferred Gemini was unavailable or failed.';
