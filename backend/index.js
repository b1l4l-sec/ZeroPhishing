/**
 * URL Trust Checker - Backend API Server
 * Provides endpoint to check URLs for security threats
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const PDFDocument = require('pdfkit');
const { Parser } = require('json2csv');
const Check = require('./models/Check');
const { analyzeURL } = require('./utils/features');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/urlchecker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✓ MongoDB connected successfully'))
  .catch(err => console.error('✗ MongoDB connection error:', err));

/**
 * Checks URL against Google Safe Browsing API
 * @param {string} url - The URL to check
 * @returns {Promise<boolean>} True if threat found, false otherwise
 */
async function checkGoogleSafeBrowsing(url) {
  const apiKey = process.env.GOOGLE_API_KEY;

  // If no API key provided, skip this check
  if (!apiKey || apiKey === 'YOUR_SAFE_BROWSING_KEY') {
    console.log('⚠ Google Safe Browsing API key not configured, skipping external check');
    return false;
  }

  try {
    const response = await axios.post(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`,
      {
        client: {
          clientId: 'url-trust-checker',
          clientVersion: '1.0.0'
        },
        threatInfo: {
          threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE', 'POTENTIALLY_HARMFUL_APPLICATION'],
          platformTypes: ['ANY_PLATFORM'],
          threatEntryTypes: ['URL'],
          threatEntries: [{ url: url }]
        }
      },
      {
        timeout: 5000 // 5 second timeout
      }
    );

    // If matches found, it's a threat
    return response.data.matches && response.data.matches.length > 0;
  } catch (error) {
    // If API call fails, log error but continue with heuristic analysis
    console.error('Google Safe Browsing API error:', error.message);
    return false;
  }
}

/**
 * Determines final verdict based on Safe Browsing results and heuristic score
 * @param {boolean} isThreat - Whether Safe Browsing detected a threat
 * @param {number} heuristicScore - Score from heuristic analysis (0-100)
 * @returns {string} Verdict: "safe", "suspicious", or "phishing"
 */
function determineVerdict(isThreat, heuristicScore) {
  if (isThreat) {
    return 'phishing';
  } else if (heuristicScore > 70) {
    return 'suspicious';
  } else {
    return 'safe';
  }
}

/**
 * POST /api/check
 * Main endpoint to check URL security
 */
app.post('/api/check', async (req, res) => {
  try {
    const { url } = req.body;

    // Validate input
    if (!url || typeof url !== 'string') {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Please provide a valid URL string'
      });
    }

    // Normalize URL (trim whitespace)
    const normalizedUrl = url.trim();

    // Basic URL validation
    try {
      new URL(normalizedUrl);
    } catch (error) {
      return res.status(400).json({
        error: 'Invalid URL',
        message: 'The provided URL is not valid'
      });
    }

    // Check if URL already exists in database (cache lookup)
    const existingCheck = await Check.findOne({ url: normalizedUrl });

    if (existingCheck) {
      console.log(`✓ Cache hit for: ${normalizedUrl}`);
      return res.json({
        url: existingCheck.url,
        verdict: existingCheck.verdict,
        score: existingCheck.score,
        reasons: existingCheck.reasons,
        checkedAt: existingCheck.checkedAt,
        cached: true
      });
    }

    console.log(`⟳ Analyzing new URL: ${normalizedUrl}`);

    // Perform heuristic analysis
    const { score, reasons } = analyzeURL(normalizedUrl);

    // Check Google Safe Browsing API
    const isThreat = await checkGoogleSafeBrowsing(normalizedUrl);

    // Add Safe Browsing result to reasons if threat detected
    if (isThreat) {
      reasons.unshift('Flagged by Google Safe Browsing');
    }

    // Calculate final score (scale 0-100)
    const finalScore = isThreat ? 100 : score;

    // Determine final verdict
    const verdict = determineVerdict(isThreat, finalScore);

    // Save to database
    const checkRecord = new Check({
      url: normalizedUrl,
      verdict,
      score: finalScore,
      reasons,
      checkedAt: new Date()
    });

    await checkRecord.save();
    console.log(`✓ Saved result for: ${normalizedUrl} (${verdict})`);

    // Return result
    res.json({
      url: checkRecord.url,
      verdict: checkRecord.verdict,
      score: checkRecord.score,
      reasons: checkRecord.reasons,
      checkedAt: checkRecord.checkedAt,
      cached: false
    });

  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'An error occurred while checking the URL'
    });
  }
});

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

/**
 * GET /api/history
 * Get check history
 */
app.get('/api/history', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const checks = await Check.find()
      .sort({ checkedAt: -1 })
      .limit(limit);

    res.json({
      total: checks.length,
      checks
    });
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'An error occurred while fetching history'
    });
  }
});

/**
 * GET /api/download-report/pdf/:id
 * Download PDF report for a specific check
 */
app.get('/api/download-report/pdf/:id', async (req, res) => {
  try {
    const check = await Check.findById(req.params.id);

    if (!check) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Check record not found'
      });
    }

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=url-check-${check._id}.pdf`);

    doc.pipe(res);

    doc.fontSize(20).text('URL Security Analysis Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Generated: ${new Date().toLocaleString()}`, { align: 'center' });
    doc.moveDown(2);

    doc.fontSize(14).text('URL:', { continued: true }).fontSize(12).text(` ${check.url}`);
    doc.moveDown();

    const verdictColor = check.verdict === 'safe' ? 'green' : check.verdict === 'suspicious' ? 'orange' : 'red';
    doc.fontSize(14).text('Verdict:', { continued: true }).fillColor(verdictColor).fontSize(12).text(` ${check.verdict.toUpperCase()}`);
    doc.fillColor('black');
    doc.moveDown();

    doc.fontSize(14).text('Risk Score:', { continued: true }).fontSize(12).text(` ${check.score}/100`);
    doc.moveDown();

    doc.fontSize(14).text('Analysis Details:');
    doc.moveDown(0.5);
    check.reasons.forEach((reason, index) => {
      doc.fontSize(11).text(`${index + 1}. ${reason}`);
    });
    doc.moveDown();

    doc.fontSize(14).text('Checked At:', { continued: true }).fontSize(12).text(` ${new Date(check.checkedAt).toLocaleString()}`);
    doc.moveDown(2);

    doc.fontSize(10).fillColor('gray').text('This report was generated by URL Trust Checker', { align: 'center' });

    doc.end();
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'An error occurred while generating the PDF report'
    });
  }
});

/**
 * GET /api/download-report/csv
 * Download CSV report for all checks
 */
app.get('/api/download-report/csv', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const checks = await Check.find()
      .sort({ checkedAt: -1 })
      .limit(limit);

    const data = checks.map(check => ({
      url: check.url,
      verdict: check.verdict,
      score: check.score,
      reasons: check.reasons.join('; '),
      checkedAt: new Date(check.checkedAt).toISOString()
    }));

    const parser = new Parser({
      fields: ['url', 'verdict', 'score', 'reasons', 'checkedAt']
    });

    const csv = parser.parse(data);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=url-checks-${Date.now()}.csv`);
    res.send(csv);
  } catch (error) {
    console.error('Error generating CSV:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'An error occurred while generating the CSV report'
    });
  }
});

/**
 * GET /
 * Root endpoint
 */
app.get('/', (req, res) => {
  res.json({
    message: 'URL Trust Checker API',
    version: '2.0.0',
    endpoints: {
      check: 'POST /api/check',
      history: 'GET /api/history',
      pdfReport: 'GET /api/download-report/pdf/:id',
      csvReport: 'GET /api/download-report/csv',
      health: 'GET /api/health'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health\n`);
});
