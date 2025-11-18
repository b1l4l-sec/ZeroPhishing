import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const ResultDisplay = ({ result, onReset }) => {
  const getVerdictColor = (verdict) => {
    switch (verdict) {
      case 'safe':
        return 'text-green-600';
      case 'suspicious':
        return 'text-yellow-600';
      case 'phishing':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getVerdictBadge = (verdict) => {
    switch (verdict) {
      case 'safe':
        return 'badge-safe';
      case 'suspicious':
        return 'badge-suspicious';
      case 'phishing':
        return 'badge-phishing';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (score) => {
    if (score < 30) return 'bg-green-500';
    if (score < 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getVerdictIcon = (verdict) => {
    switch (verdict) {
      case 'safe':
        return (
          <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'suspicious':
        return (
          <svg className="w-16 h-16 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'phishing':
        return (
          <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const pieData = [
    { name: 'Risk Score', value: result.score },
    { name: 'Safety', value: Math.max(0, 100 - result.score) }
  ];

  const COLORS = {
    safe: ['#22c55e', '#e5e7eb'],
    suspicious: ['#eab308', '#e5e7eb'],
    phishing: ['#ef4444', '#e5e7eb']
  };

  const barData = result.reasons.map((reason, index) => ({
    name: `Rule ${index + 1}`,
    value: Math.floor((result.score / result.reasons.length) * 1.5),
    reason: reason
  }));

  const handleDownloadPDF = async () => {
    try {
      window.open(`http://localhost:5000/api/download-report/pdf/${result._id}`, '_blank');
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="card p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            {getVerdictIcon(result.verdict)}
          </div>
          <span className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold ${getVerdictBadge(result.verdict)}`}>
            {result.verdict.toUpperCase()}
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-2">Security Analysis Complete</h2>
          <p className="text-gray-600 break-all max-w-2xl mx-auto">{result.url}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600 mb-2">Risk Score</p>
              <div className="flex items-baseline justify-center">
                <span className={`text-5xl font-bold ${getVerdictColor(result.verdict)}`}>
                  {result.score}
                </span>
                <span className="text-2xl text-gray-400 ml-2">/100</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className={`h-4 rounded-full transition-all duration-1000 ${getProgressColor(result.score)}`}
                style={{ width: `${result.score}%` }}
              ></div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[result.verdict][index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="border-t pt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Analysis Details</h3>
          <ul className="space-y-3">
            {result.reasons.map((reason, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mr-3 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-gray-700">{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {barData.length > 0 && (
          <div className="border-t pt-8 mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Risk Factor Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
                        <p className="text-sm font-semibold">{payload[0].payload.reason}</p>
                        <p className="text-sm text-gray-600">Impact: {payload[0].value}</p>
                      </div>
                    );
                  }
                  return null;
                }} />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="border-t pt-8 mt-8">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Checked: {new Date(result.checkedAt).toLocaleString()}
            </div>
            {result.cached && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                Cached Result
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onReset}
              className="flex-1 btn-primary"
            >
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Check Another URL
            </button>

            {result._id && (
              <button
                onClick={handleDownloadPDF}
                className="flex-1 btn-secondary"
              >
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF Report
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
