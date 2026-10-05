-- Evidence snapshots make submission metrics reproducible instead of mutable.
CREATE TABLE IF NOT EXISTS natlas_evidence_snapshots (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_by uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
 label text NOT NULL,
 validation_interactions integer NOT NULL,
 validation_sessions integer NOT NULL,
 validation_users integer NOT NULL,
 asr_successes integer NOT NULL,
 asr_failures integer NOT NULL,
 avg_asr_latency_ms integer,
 answer_successes integer NOT NULL,
 answer_failures integer NOT NULL,
 avg_answer_latency_ms integer,
 payload jsonb NOT NULL DEFAULT '{}'::jsonb,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_natlas_evidence_snapshots_created ON natlas_evidence_snapshots(created_at DESC);
COMMENT ON TABLE natlas_evidence_snapshots IS 'Immutable aggregate snapshots for reproducible NAIC evidence reporting; contains no raw learner content.';
