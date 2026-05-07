-- Example only. Replace key_hash and name for real customers.
-- Generate a hash with:
--   npm run api-key:hash -- your-secret-api-key

INSERT INTO api_keys (
  key_hash,
  name,
  plan_id
)
SELECT
  '6e1e4e1b8f8b36d08901cdb51b97841dfe20f5efd2fd00768971408c46274',
  'local-dev-key',
  plans.id
FROM plans
WHERE plans.name = 'free'
ON CONFLICT (key_hash) DO NOTHING;
