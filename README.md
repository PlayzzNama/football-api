# ⚽ Fast Football API

Production-ready Football REST API with live matches, competitions, standings, caching, API key authentication, Swagger documentation, and rate limiting.

## 🚀 Live Demo

### API Base URL

```bash
https://football-api-4knh.onrender.com
```

### Swagger Documentation

```bash
https://football-api-4knh.onrender.com/docs
```

---

# ✨ Features

* ⚽ Football matches endpoint
* 🔴 Live matches
* 🏆 Competitions data
* 📊 Standings support
* 🔐 API key authentication
* 🚦 Rate limiting
* ⚡ Fast caching
* 📄 Swagger/OpenAPI docs
* ☁️ Production deployment
* 🛡 Security middleware
* 📦 Docker support

---

# 🛠 Tech Stack

* Node.js
* Express.js
* Axios
* Swagger/OpenAPI
* Redis
* PostgreSQL
* Docker
* Render Deployment

---

# 📦 Installation

## 1. Clone repository

```bash
git clone https://github.com/PlayzzNama/football-api.git
cd football-api
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Create `.env`

```env
PORT=3000
NODE_ENV=development

API_KEYS=your_api_key_here

FOOTBALL_DATA_API_KEY=your_football_data_api_key

FOOTBALL_DATA_BASE_URL=https://api.football-data.org/v4
FOOTBALL_DATA_TIMEOUT_MS=10000

CACHE_TTL_SECONDS=60
```

---

## 4. Run development server

```bash
npm run dev
```

---

# 📚 API Documentation

Swagger docs:

```bash
http://localhost:3000/docs
```

Production docs:

```bash
https://football-api-4knh.onrender.com/docs
```

---

# 🔑 Authentication

All endpoints require API key.

Example:

```bash
curl -H "x-api-key: YOUR_API_KEY" \
https://football-api-4knh.onrender.com/matches
```

---

# 📌 Endpoints

## Health Check

```http
GET /health
```

---

## Competitions

```http
GET /competitions
```

---

## Matches

```http
GET /matches
```

---

## Live Matches

```http
GET /live
```

---

# ⚡ Rate Limits

Default limits:

* 60 requests/minute

---

# 🐳 Docker

Build image:

```bash
docker build -t football-api .
```

Run container:

```bash
docker run -p 3000:3000 football-api
```

---

# ☁️ Deployment

Currently deployed on Render.

---

# 🔐 Security

* Helmet
* CORS
* API Key Authentication
* Rate Limiting
* Environment Variables

---

# 🧪 Testing

```bash
npm test
```

---

# 📈 Roadmap

* Team endpoint
* Player statistics
* Match predictions
* Betting odds
* WebSocket live updates
* Premium plans
* Analytics dashboard

---

# 📄 License

MIT License

---

# 🤝 Contributing

Pull requests are welcome.

---

# ⭐ Support

If you like the project, give it a star on GitHub.
