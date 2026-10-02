-- Marks the start of a genuine validation run without deleting earlier setup traffic.
CREATE TABLE IF NOT EXISTS natlas_validation_runs (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 run_key text NOT NULL UNIQUE,
 started_at timestamptz NOT NULL,
 ended_at timestamptz,
 status text NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE','CLOSED')),
 note text,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_natlas_validation_runs_started ON natlas_validation_runs(started_at DESC);
COMMENT ON TABLE natlas_validation_runs IS 'Auditable boundaries for genuine N-ATLAS validation runs. Earlier VALIDATION-labelled setup traffic is preserved but excluded from official evidence.';
