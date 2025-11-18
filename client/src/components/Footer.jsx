const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">URL Trust Checker</h3>
            <p className="text-gray-400 text-sm">
              Professional URL security analysis powered by Google Safe Browsing API and advanced heuristic detection.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Real-time threat detection</li>
              <li>Advanced heuristic analysis</li>
              <li>Detailed risk reports</li>
              <li>Export to PDF and CSV</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Technology</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Google Safe Browsing API</li>
              <li>Machine learning patterns</li>
              <li>Phishing detection</li>
              <li>Brand impersonation detection</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            {new Date().getFullYear()} URL Trust Checker. Built for web security.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
