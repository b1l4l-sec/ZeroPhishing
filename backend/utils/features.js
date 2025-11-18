/**
 * Advanced Heuristic URL Analysis Module
 * Assigns risk scores (0-100) with detailed reasons
 */

function containsIPAddress(url) {
  const ipv4Pattern = /(\d{1,3}\.){3}\d{1,3}/;
  return ipv4Pattern.test(url);
}

function countSubdirectories(url) {
  try {
    return new URL(url).pathname.split('/').filter(s => s.length > 0).length;
  } catch {
    return 0;
  }
}

function getHostname(url) {
  try {
    return new URL(url).hostname || '';
  } catch {
    return '';
  }
}

function removeDigits(domain) {
  return domain.replace(/[0-9]/g, '');
}

function punycodeCheck(domain) {
  return /xn--/.test(domain); // detects IDN homograph attacks
}

function countPhishingKeywords(url) {
  const phishingWords = [
    'login','secure','account','verify','update','signin','password','auth','bank',
    'confirm','security','id','credential','reset','validate','update-info'
  ];
  let count = 0;
  for (const word of phishingWords) {
    if (new RegExp(word, 'i').test(url)) count++;
  }
  return count;
}

function fuzzyBrandMatch(hostname, brandList) {
  const cleaned = removeDigits(hostname).toLowerCase();
  for (const brand of brandList) {
    if (cleaned.includes(brand.slice(0, brand.length - 1))) return brand;
  }
  return null;
}

function subdomainSuspicion(url) {
  try {
    const parts = new URL(url).hostname.split('.');
    if (parts.length > 2) {
      const sub = parts.slice(0, parts.length - 2).join('.');
      if (/login|secure|verify|update/i.test(sub)) return true;
    }
  } catch {}
  return false;
}

function analyzeURL(url) {
  let score = 0;
  const reasons = [];
  const hostname = getHostname(url);
  const subdirCount = countSubdirectories(url);

  // 1. URL length
  if (url.length > 75) { score += 15; reasons.push('Long URL length (> 75 chars)'); }

  // 2. "@" symbol
  if (url.includes('@')) { score += 25; reasons.push('Contains "@" symbol (obfuscation)'); }

  // 3. IP address instead of domain
  if (containsIPAddress(url)) { score += 35; reasons.push('Uses IP address instead of domain name'); }

  // 4. Subdirectories
  if (subdirCount > 5) { score += 10; reasons.push(`Excessive subdirectories (${subdirCount})`); }

  // 5. Hyphens
  const hyphenCount = (hostname.match(/-/g) || []).length;
  if (hyphenCount > 0) { score += 10; reasons.push('Contains hyphen in domain'); }
  if (hyphenCount > 1) { score += 10; reasons.push('Multiple hyphens in domain'); }

  // 6. Fuzzy brand impersonation
  const brandList = ['paypal','google','facebook','apple','amazon','bankofamerica','microsoft','instagram','dropbox','linkedin','netflix'];
  const brandDetected = fuzzyBrandMatch(hostname, brandList);
  if (brandDetected && countPhishingKeywords(url) > 0) {
    score += 40;
    reasons.push(`Possible brand impersonation (e.g., ${brandDetected})`);
  }

  // 7. Suspicious numbers
  if (/[a-zA-Z]+[0-9]+[a-zA-Z]*/.test(hostname)) { score += 15; reasons.push('Suspicious use of numbers in domain'); }

  // 8. Unusual TLDs (weighted)
  const highRiskTLDs = /\.(tk|ml|ga|cf|gq|xyz|top|club|link|click|info|ru)$/i;
  if (highRiskTLDs.test(hostname)) { score += 15; reasons.push('High-risk or free domain extension'); }

  // 9. Punycode homograph
  if (punycodeCheck(hostname)) { score += 20; reasons.push('Punycode/IDN detected (possible homograph attack)'); }

  // 10. Multiple phishing keywords
  const keywordCount = countPhishingKeywords(url);
  if (keywordCount > 1) { score += 10; reasons.push(`Multiple phishing keywords in URL path (${keywordCount})`); }

  // 11. Suspicious subdomain patterns
  if (subdomainSuspicion(url)) { score += 15; reasons.push('Suspicious subdomain pattern detected'); }

  // Cap score at 100
  score = Math.min(score, 100);
  if (reasons.length === 0) reasons.push('No suspicious patterns detected');

  return { score, reasons };
}

module.exports = {
  analyzeURL,
  containsIPAddress,
  countSubdirectories
};
