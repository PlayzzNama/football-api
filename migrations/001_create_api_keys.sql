CREATE TABLE IF NOT EXISTS plans (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  monthly_request_limit INTEGER NOT NULL,
  rate_limit_window_ms INTEGER NOT NULL,
  rate_limit_max_requests INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS api_keys (
  id BIGSERIAL PRIMARY KEY,
  key_hash TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  plan_id BIGINT NOT NULL REFERENCES plans(id),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_api_keys_plan_id ON api_keys(plan_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_is_active ON api_keys(is_active);

INSERT INTO plans (
  name,
  monthly_request_limit,
  rate_limit_window_ms,
  rate_limit_max_requests
)
VALUES
  ('free', 10000, 60000, 60),
  ('pro', 250000, 60000, 600),
  ('business', 1000000, 60000, 3000)
ON CONFLICT (name) DO NOTHING;
