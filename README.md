# Football API

Production-oriented football REST API for monetization. Data provider: football-data.org v4.

## Endpoints

- `GET /health`
- `GET /competitions`
- `GET /matches`
- `GET /live`
- `GET /standings`
- `GET /docs`
- `GET /openapi.json`

Protected endpoints require:

```http
x-api-key: your-api-key
```

## Local Setup

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

Set real values in `.env`:

```env
API_KEYS=dev-api-key
FOOTBALL_DATA_API_KEY=your_football_data_key
DATABASE_URL=postgresql://football:football@localhost:5432/football_api
REDIS_URL=redis://localhost:6379
```

## Database

Run PostgreSQL, then apply migrations:

```powershell
npm run db:migrate
```

Generate a hash for a customer API key:

```powershell
npm run api-key:hash -- customer-secret-key
```

Insert the hash into `api_keys.key_hash`.

## Docker

```powershell
docker compose up --build
```

Then open:

```text
http://localhost:3000/health
http://localhost:3000/docs
```

## Railway

1. Create a Railway project.
2. Add PostgreSQL and Redis services.
3. Add app environment variables from `.env.example`.
4. Set `FOOTBALL_DATA_API_KEY`.
5. Deploy from GitHub or Railway CLI.
6. Run migrations once:

```powershell
npm run db:migrate
```

## Monetization

Suggested plans:

- Free: 10,000 monthly requests, 60 requests/minute.
- Pro: 250,000 monthly requests, 600 requests/minute.
- Business: 1,000,000 monthly requests, 3,000 requests/minute.

Store customer keys in PostgreSQL using hashed keys only.

## Verification

```powershell
npm test
```
