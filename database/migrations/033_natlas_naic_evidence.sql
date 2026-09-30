-- NAIC / N-ATLAS voice-first evidence foundation.
-- Development, pilot and official validation records are deliberately separated.
-- Raw audio, names, email addresses, IP addresses and user-agent strings are NOT stored.

CREATE TABLE IF NOT EXISTS natlas_validation_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  validation_mode text NOT NULL DEFAULT 'DEVELOPMENT'
    CHECK (validation_mode IN ('DEVELOPMENT','PILOT','VALIDATION')),
  session_key text NOT NULL,
  interaction_key text NOT NULL UNIQUE,
  language text NOT NULL DEFAULT 'en-NG',
  class_level text,
  subject text,
  topic text,
  asr_provider text NOT NULL DEFAULT 'N-ATLAS',
  asr_model text,
  asr_success boolean NOT NULL DEFAULT false,
  asr_latency_ms integer CHECK (asr_latency_ms IS NULL OR asr_latency_ms >= 0),
  transcript_corrected boolean,
  answer_source text CHECK (answer_source IS NULL OR answer_source IN ('AVORA_CURRICULUM','AVORA_CONTEXT','GENERAL_LEARNING','DETERMINISTIC_MATH','EXTERNAL_AI','NONE')),
  answer_success boolean,
  answer_latency_ms integer CHECK (answer_latency_ms IS NULL OR answer_latency_ms >= 0),
  mastery_checked boolean NOT NULL DEFAULT false,
  mastery_success boolean,
  feedback_rating smallint CHECK (feedback_rating BETWEEN 1 AND 5),
  failure_code text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_natlas_validation_mode_created
  ON natlas_validation_interactions(validation_mode, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_natlas_validation_session
  ON natlas_validation_interactions(session_key, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_natlas_validation_asr
  ON natlas_validation_interactions(asr_success, created_at DESC);

COMMENT ON TABLE natlas_validation_interactions IS
'Privacy-minimized evidence for N-ATLAS voice validation. VALIDATION is reserved for genuine real-user interactions. Never store raw audio, names, email, IP, user-agent, or full transcript/answer text here.';
