# 🛡️ URL Trust Checker - Professional Security Platform

A full-featured, production-ready React web application that analyzes URLs for security threats using Google Safe Browsing API and advanced heuristic analysis. Features a modern, responsive interface with real-time threat detection, detailed analytics, and comprehensive reporting.

![URL Trust Checker](https://img.shields.io/badge/status-production--ready-brightgreen)
![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)
![React](https://img.shields.io/badge/react-18-blue)
![MongoDB](https://img.shields.io/badge/mongodb-%3E%3D4.4-green)

## ✨ Features

### Frontend (React + Tailwind CSS)
- **Modern React Architecture** - Component-based design with React Router
- **Fully Responsive** - Mobile-first design that works on all devices
- **Professional UI** - Clean, minimal design with smooth transitions and animations
- **Interactive Visualizations** - Charts and graphs powered by Recharts
- **Multiple Pages**:
  - Home / Check URL - Input and analyze URLs in real-time
  - How It Works - Detailed explanation of the analysis process
  - Benefits - Why use URL Trust Checker
  - History - View all previously checked URLs with statistics
- **Real-time Results** - Instant feedback with color-coded verdicts
- **Risk Score Visualization** - 0-100 scale with detailed breakdowns
- **Report Downloads** - Export analysis to PDF or CSV

### Backend (Node.js + Express + MongoDB)
- **Google Safe Browsing Integration** - Real-time threat detection using Google's database
- **Advanced Heuristic Analysis** - 9 detection rules with 0-100 scoring
- **Smart Caching** - MongoDB-based caching for faster repeated checks
- **RESTful API** - Clean, documented endpoints
- **PDF Generation** - Detailed security reports with PDFKit
- **CSV Export** - Bulk data export for analysis
- **Comprehensive Error Handling** - Robust error management

### Security Analysis
- **Risk Score 0-100** - Clear numerical assessment
- **Multiple Detection Rules**:
  - Long URLs (+20 points)
  - @ Symbol detection (+30 points)
  - IP address usage (+40 points)
  - Excessive subdirectories (+10 points)
  - Domain hyphens (+10-20 points)
  - Brand impersonation (+40 points)
  - Suspicious numbers (+20 points)
  - Unusual TLDs (+20 points)
  - Phishing keywords (+10 points)
- **Verdict Categories**:
  - Safe (0-29) - No significant threats
  - Suspicious (30-69) - Concerning patterns
  - Phishing (70-100) - High risk

## 🚀 Quick Start

### Prerequisites

1. **Node.js** (v14+) - [Download](https://nodejs.org/)
2. **MongoDB** (v4.4+) - [Install Guide](https://docs.mongodb.com/manual/installation/)
3. **Google Safe Browsing API Key** - [Get Key](https://developers.google.com/safe-browsing/v4/get-started)

### Installation

1. **Navigate to the project:**
   ```bash
   cd url-trust-checker
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   npm install pdfkit
   npm install json2csv
   npm install fs-extra
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../client
   npm install
   ```

4. **Configure environment variables:**

   In the `backend` directory, create `.env` file:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/urlchecker
   GOOGLE_API_KEY=your_actual_api_key_here
   ```

5. **Start MongoDB:**
   ```bash
   # macOS (Homebrew)
   brew services start mongodb-community

   # Ubuntu/Debian
   sudo systemctl start mongodb

   # Windows - Run MongoDB as a service
   ```

6. **Start the backend server:**
   ```bash
   cd backend
   npm start
   ```

   You should see:
   ```
   ✓ MongoDB connected successfully
   🚀 Server running on http://localhost:5000
   ```

7. **Start the React frontend** (in a new terminal):
   ```bash
   cd client
   npm run dev
   ```

   The app will open at `http://localhost:3000`

## 📖 How to Use

1. **Open the application** at `http://localhost:3000`
2. **Navigate** using the top menu to explore different sections
3. **Check a URL:**
   - Enter a complete URL (e.g., `https://example.com`)
   - Click "Check URL Security"
   - View detailed analysis with risk score, verdict, and reasons
4. **View Results:**
   - See risk score (0-100) with color-coded visualization
   - Review detailed analysis with pie charts and bar graphs
   - Download PDF report for documentation
5. **Check History:**
   - Navigate to History page to see all checked URLs
   - View statistics (total checks, safe URLs, threats detected)
   - Export all data to CSV

## 📁 Project Structure

```
url-trust-checker/
├── backend/
│   ├── index.js              # Express server with API endpoints
│   ├── models/
│   │   └── Check.js         # MongoDB schema
│   ├── utils/
│   │   └── features.js      # Heuristic analysis (0-100 scale)
│   ├── package.json
│   └── .env                 # Environment configuration
├── client/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── URLChecker.jsx
│   │   │   └── ResultDisplay.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   ├── Benefits.jsx
│   │   │   └── History.jsx
│   │   ├── App.jsx         # Main app with routing
│   │   ├── index.css       # Tailwind styles
│   │   └── main.jsx        # Entry point
│   ├── package.json
│   ├── vite.config.js      # Vite configuration
│   └── tailwind.config.js  # Tailwind configuration
├── package.json            # Root package with scripts
└── README.md              # This file
```

## 🔧 API Endpoints

### POST /api/check
Check a URL for security threats.

**Request:**
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
  "score": 0,
  "reasons": ["No suspicious patterns detected"],
  "checkedAt": "2025-10-31T12:00:00.000Z",
  "cached": false,
  "_id": "..."
}
```

### GET /api/history
Get check history (default: 50 most recent).

**Query Parameters:**
- `limit` - Number of records to return (default: 50)

**Response:**
```json
{
  "total": 50,
  "checks": [...]
}
```

### GET /api/download-report/pdf/:id
Download PDF report for a specific check.

### GET /api/download-report/csv
Download CSV export of all checks.

**Query Parameters:**
- `limit` - Number of records to export (default: 100)

### GET /api/health
Health check endpoint.

## 🎨 Design Philosophy

The interface follows a **clean, professional design**:

- **Colors:** Neutral grays, blue accents, semantic colors for verdicts
- **Typography:** Clear sans-serif fonts with proper hierarchy
- **Effects:** Smooth transitions, subtle shadows, rounded corners
- **Layout:** Card-based design with responsive grid system
- **Responsiveness:** Mobile-first approach, works on all screen sizes

## 🧠 Heuristic Analysis

The system uses intelligent rules to detect suspicious URLs:

| Pattern | Weight | Example |
|---------|--------|---------|
| Long URL (>75 chars) | +20 | `https://example.com/very/long/path...` |
| Contains "@" symbol | +30 | `https://user@attacker.com` |
| IP address in URL | +40 | `http://192.168.1.1/login` |
| Deep subdirectories (>5) | +10 | `https://site.com/a/b/c/d/e/f/g` |
| Hyphen in domain | +10 | `https://paypa1-login.com` |
| Multiple hyphens | +10 | `https://pay-pal-secure.com` |
| Brand impersonation | +40 | `https://g00gle.com` |
| Suspicious numbers | +20 | `https://paypa1.com` |
| Unusual TLDs | +20 | `https://example.tk` |
| Multiple phishing keywords | +10 | `/login/verify/account` |

**Verdict Logic:**
- Google Safe Browsing match → **Phishing (100)**
- Heuristic score > 70 → **Suspicious**
- Heuristic score 30-69 → **Suspicious**
- Otherwise → **Safe**

## 🚀 Production Deployment

For production deployment:

1. **Environment Variables:**
   - Use secure environment variables
   - Never commit `.env` files

2. **MongoDB:**
   - Enable authentication
   - Use connection pooling
   - Set up backups

3. **Backend:**
   - Use process manager (PM2)
   - Enable HTTPS
   - Implement rate limiting
   - Set up monitoring

4. **Frontend:**
   - Build for production: `npm run build`
   - Serve with nginx or similar
   - Enable gzip compression
   - Set up CDN for assets

5. **Security:**
   - Use environment-specific API keys
   - Enable CORS properly
   - Implement CSP headers
   - Regular security audits

## 🐛 Troubleshooting

### Backend won't start
```
Error: Cannot find module 'express'
```
**Solution:** Run `npm install` in the `backend/` directory

### MongoDB connection failed
```
MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Ensure MongoDB is running:
```bash
brew services start mongodb-community  # macOS
sudo systemctl start mongodb           # Linux
```

### Frontend can't connect to backend
**Solution:**
1. Verify backend is running on `http://localhost:5000`
2. Check browser console for CORS errors
3. Ensure `PORT=5000` in backend `.env`

### Build fails
```
Error: Cannot apply unknown utility class
```
**Solution:** Ensure Tailwind CSS v3 is installed:
```bash
cd client
npm install -D tailwindcss@3 postcss autoprefixer
```

## 📊 Technologies Used

### Frontend
- React 18 - UI framework
- React Router - Routing
- Tailwind CSS 3 - Styling
- Recharts - Data visualization
- Axios - HTTP client
- Vite - Build tool

### Backend
- Node.js - Runtime
- Express - Web framework
- MongoDB - Database
- Mongoose - ODM
- PDFKit - PDF generation
- json2csv - CSV export
- Google Safe Browsing API v4 - Threat detection

## 📝 Getting Google Safe Browsing API Key

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Safe Browsing API**
4. Navigate to **Credentials** → **Create Credentials** → **API Key**
5. Copy the key and add to `backend/.env`

## 🔒 Security Notes

- API keys are server-side only
- Input validation on all endpoints
- CORS properly configured
- MongoDB indexes for performance
- Rate limiting recommended for production
- Regular dependency updates

## 📄 License

ISC

## 🙏 Acknowledgments

- Google Safe Browsing API for threat intelligence
- MongoDB for reliable data storage
- React and Vite for modern development experience
- Tailwind CSS for rapid UI development

---

**Built for web security | Version 2.0.0**
