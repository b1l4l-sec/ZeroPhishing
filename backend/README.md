# URL Trust Checker - Backend

A robust REST API service that analyzes URLs for security threats using Google Safe Browsing API and heuristic analysis.

## Features

- ✅ **Google Safe Browsing Integration** - Checks URLs against Google's threat database
- ✅ **Heuristic URL Analysis** - Detects suspicious patterns in URLs
- ✅ **MongoDB Caching** - Stores results for faster repeated checks
- ✅ **RESTful API** - Clean, documented endpoints
- ✅ **Error Handling** - Comprehensive error management

## Prerequisites

Before running this application, ensure you have:

1. **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
2. **MongoDB** (v4.4 or higher) - [Installation guide](https://docs.mongodb.com/manual/installation/)
3. **Google Safe Browsing API Key** - [Get one here](https://developers.google.com/safe-browsing/v4/get-started)

## Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```

3. **Edit the `.env` file:**
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/urlchecker
   GOOGLE_API_KEY=your_actual_api_key_here
   ```

   **Important:** Replace `your_actual_api_key_here` with your actual Google Safe Browsing API key.

## Getting a Google Safe Browsing API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Safe Browsing API**
4. Go to **Credentials** and create an **API Key**
5. Copy the API key and paste it into your `.env` file

## Running MongoDB Locally

### macOS (using Homebrew):
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Ubuntu/Debian:
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

### Windows:
Download and install from [MongoDB Download Center](https://www.mongodb.com/try/download/community)

### Verify MongoDB is running:
```bash
mongosh
# or
mongo
```

## Starting the Server

```bash
npm start
```

The server will start on `http://localhost:5000`

### Development mode (with auto-reload):
```bash
npm run dev
```

## API Documentation

### Health Check
**GET** `/api/health`

Returns the server status and MongoDB connection state.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-10-31T12:00:00.000Z",
  "mongodb": "connected"
}
```

### Check URL
**POST** `/api/check`

Analyzes a URL for security threats.

**Request Body:**
```json
{
  "url": "https://example.com"
}
```

**Response:**
```json
{
  "url": "https://example.com",
  "verdict": "safe",
  "score": 0.0,
  "reasons": ["No suspicious patterns detected"],
  "checkedAt": "2025-10-31T12:00:00.000Z",
  "cached": false
}
```

**Verdict Types:**
- `safe` - URL appears legitimate
- `suspicious` - URL has concerning patterns (heuristic score > 0.7)
- `phishing` - URL flagged by Google Safe Browsing

**Score Range:** 0.0 to 1.0 (higher = more risky)

### Example with cURL:
```bash
curl -X POST http://localhost:5000/api/check \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

## Heuristic Analysis Rules

The system uses the following rules to detect suspicious URLs:

| Pattern | Score | Description |
|---------|-------|-------------|
| URL length > 75 characters | +0.2 | Phishers often use long URLs |
| Contains "@" symbol | +0.3 | Can hide the real domain |
| Contains IP address | +0.4 | Legitimate sites use domain names |
| > 5 subdirectories | +0.1 | Unusual path structure |
| Hyphen in domain | +0.1 | Common in typosquatting |

## Project Structure

```
backend/
├── index.js              # Main server file
├── models/
│   └── Check.js         # MongoDB schema for URL checks
├── utils/
│   └── features.js      # Heuristic analysis functions
├── package.json         # Dependencies and scripts
├── .env.example         # Environment variables template
└── README.md           # This file
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `400` - Invalid request (bad URL format)
- `500` - Server error

Error response format:
```json
{
  "error": "Error type",
  "message": "Detailed error message"
}
```

## Caching Behavior

- URLs are checked against the database before performing analysis
- If a URL has been checked before, the cached result is returned immediately
- This significantly improves performance for repeated checks
- Cache entries include the original check timestamp

## Security Notes

- Never commit your `.env` file to version control
- Keep your Google Safe Browsing API key private
- The API key is only used server-side and never exposed to clients
- MongoDB connection should use authentication in production

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Ensure MongoDB is running: `brew services start mongodb-community` (macOS)

### Google Safe Browsing API Error
```
Google Safe Browsing API error: Request failed with status code 400
```
**Solution:** Verify your API key is correct and the Safe Browsing API is enabled in your Google Cloud project.

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change the PORT in `.env` or kill the process using port 5000:
```bash
lsof -ti:5000 | xargs kill
```

## Support

For issues related to:
- **Google Safe Browsing API**: [Official Documentation](https://developers.google.com/safe-browsing/v4)
- **MongoDB**: [Official Documentation](https://docs.mongodb.com/)
- **Express.js**: [Official Documentation](https://expressjs.com/)

## License

ISC
