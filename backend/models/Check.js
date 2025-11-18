/**
 * MongoDB Schema for URL Check Records
 * Stores cached results of URL security checks
 */

const mongoose = require('mongoose');

const checkSchema = new mongoose.Schema({
  // The URL that was checked
  url: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  // Verdict: "safe", "suspicious", or "phishing"
  verdict: {
    type: String,
    required: true,
    enum: ['safe', 'suspicious', 'phishing']
  },

  // Numerical risk score (0 to 100, where higher = more risky)
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },

  // Array of reasons explaining the verdict
  reasons: {
    type: [String],
    default: []
  },

  // Timestamp of when the check was performed
  checkedAt: {
    type: Date,
    default: Date.now
  }
});

// Create index on URL for faster lookups
checkSchema.index({ url: 1 });

// Create index on checkedAt for potential cleanup operations
checkSchema.index({ checkedAt: -1 });

module.exports = mongoose.model('Check', checkSchema);
