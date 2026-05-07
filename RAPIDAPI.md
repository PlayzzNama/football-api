# RapidAPI Publishing Guide

## Base URL

Use your Railway public URL:

```text
https://your-service.up.railway.app
```

## Authentication

RapidAPI will send its own headers. Map RapidAPI customers to your own API keys, or require users to pass:

```http
x-api-key: customer-key
```

## Public Endpoints

- `GET /competitions`
- `GET /matches`
- `GET /live`
- `GET /standings`

## Recommended Pricing

- Basic: low quota, useful for testing.
- Pro: higher quota for apps.
- Ultra: high quota for commercial products.

## Endpoint Examples

```text
GET /matches?competitions=PL,CL&status=SCHEDULED
GET /live?competitions=PL
GET /standings?competition=PL
```

## Before Publishing

- Deploy to Railway.
- Confirm `/health` returns 200.
- Confirm `/docs` opens Swagger UI.
- Confirm rate limiting works.
- Confirm API key auth works.
- Add support email and terms of use.
