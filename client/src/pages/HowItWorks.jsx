const HowItWorks = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          How It Works
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Our multi-layered security analysis combines industry-leading threat intelligence
          with advanced pattern recognition to keep you safe online.
        </p>
      </div>

      <div className="space-y-12">
        <div className="card p-8">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-4 mr-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Step 1: URL Submission</h2>
              <p className="text-gray-600 mb-4">
                Simply paste any URL into our checker. Our system accepts all standard URL formats
                including HTTP, HTTPS, and supports international domains.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Instant validation and normalization
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Cache check for faster results
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card p-8 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-600 rounded-full p-4 mr-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Step 2: Google Safe Browsing Check</h2>
              <p className="text-gray-600 mb-4">
                We query Google Safe Browsing API, which maintains a constantly updated database
                of unsafe web resources across the internet.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Threat Types Detected:</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>Malware distribution</li>
                    <li>Social engineering</li>
                    <li>Unwanted software</li>
                    <li>Potentially harmful apps</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Coverage:</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>Billions of URLs scanned</li>
                    <li>Updated every 30 minutes</li>
                    <li>Cross-platform protection</li>
                    <li>Global threat intelligence</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-8">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-purple-100 rounded-full p-4 mr-6">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Step 3: Heuristic Analysis</h2>
              <p className="text-gray-600 mb-6">
                Our proprietary algorithms analyze multiple URL characteristics to detect suspicious patterns
                that may indicate phishing or malicious intent.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-3xl font-bold text-blue-600 mb-2">+20</div>
                  <h4 className="font-semibold text-gray-900 mb-1">Long URLs</h4>
                  <p className="text-sm text-gray-600">URLs over 75 characters often hide malicious intent</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-3xl font-bold text-red-600 mb-2">+30</div>
                  <h4 className="font-semibold text-gray-900 mb-1">@ Symbol</h4>
                  <p className="text-sm text-gray-600">Used to mask the real destination domain</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-3xl font-bold text-red-600 mb-2">+40</div>
                  <h4 className="font-semibold text-gray-900 mb-1">IP Addresses</h4>
                  <p className="text-sm text-gray-600">Legitimate sites use domain names, not IPs</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">+10</div>
                  <h4 className="font-semibold text-gray-900 mb-1">Deep Paths</h4>
                  <p className="text-sm text-gray-600">Excessive subdirectories indicate complexity</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">+10</div>
                  <h4 className="font-semibold text-gray-900 mb-1">Hyphens</h4>
                  <p className="text-sm text-gray-600">Common in typosquatting attacks</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-3xl font-bold text-red-600 mb-2">+40</div>
                  <h4 className="font-semibold text-gray-900 mb-1">Brand Spoofing</h4>
                  <p className="text-sm text-gray-600">Detects impersonation of major brands</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-8 bg-gradient-to-r from-green-50 to-teal-50">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-green-600 rounded-full p-4 mr-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Step 4: Risk Scoring & Verdict</h2>
              <p className="text-gray-600 mb-4">
                All findings are combined into a comprehensive risk score from 0-100, with a clear verdict
                and detailed breakdown of all detected issues.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                  <div className="text-2xl font-bold text-green-600 mb-2">0-29</div>
                  <h4 className="font-semibold text-gray-900 mb-1">Safe</h4>
                  <p className="text-sm text-gray-600">No significant threats detected</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-yellow-500">
                  <div className="text-2xl font-bold text-yellow-600 mb-2">30-69</div>
                  <h4 className="font-semibold text-gray-900 mb-1">Suspicious</h4>
                  <p className="text-sm text-gray-600">Concerning patterns found</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-red-500">
                  <div className="text-2xl font-bold text-red-600 mb-2">70-100</div>
                  <h4 className="font-semibold text-gray-900 mb-1">Phishing</h4>
                  <p className="text-sm text-gray-600">High risk, avoid visiting</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-8">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-indigo-100 rounded-full p-4 mr-6">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Step 5: Report Generation</h2>
              <p className="text-gray-600 mb-4">
                Get detailed reports with visualizations, explanations, and recommendations.
                Export your analysis for records or sharing.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  PDF reports with detailed analysis
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  CSV exports for bulk analysis
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Interactive charts and visualizations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
