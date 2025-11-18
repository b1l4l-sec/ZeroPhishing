import { useState } from 'react';
import axios from 'axios';
import URLChecker from '../components/URLChecker';
import ResultDisplay from '../components/ResultDisplay';

const Home = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheck = async (url) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post('http://localhost:5000/api/check', { url });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to check URL. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Verify URL Safety Before You Click
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Advanced security analysis combining Google Safe Browsing API with intelligent heuristic detection
          to protect you from phishing, malware, and malicious websites.
        </p>
      </div>

      {!result && (
        <URLChecker onCheck={handleCheck} loading={loading} error={error} />
      )}

      {result && (
        <ResultDisplay result={result} onReset={handleReset} />
      )}

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card p-6 text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Analysis</h3>
          <p className="text-gray-600">
            Get real-time security results in seconds with our advanced detection algorithms.
          </p>
        </div>

        <div className="card p-6 text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Comprehensive Checks</h3>
          <p className="text-gray-600">
            Multiple security layers including phishing detection and brand impersonation analysis.
          </p>
        </div>

        <div className="card p-6 text-center">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Detailed Reports</h3>
          <p className="text-gray-600">
            Export comprehensive analysis reports in PDF or CSV format for your records.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
