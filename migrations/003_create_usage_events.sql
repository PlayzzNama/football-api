CREATE TABLE IF NOT EXISTS usage_events (
  id BIGSERIAL PRIMARY KEY,
  api_key_id BIGINT REFERENCES api_keys(id),
  api_key_source TEXT NOT NULL,
  route TEXT NOT NULL,
  method TEXT NOT NULL,
  status_code INTEGER NOT NULL,
  response_time_ms INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_usage_events_api_key_id_created_at
  ON usage_events(api_key_id, created_at);

CREATE INDEX IF NOT EXISTS idx_usage_events_created_at
  ON usage_events(created_at);
