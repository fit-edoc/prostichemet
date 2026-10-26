const defaultAllowed = [
  'https://prospail.vercel.app',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

function isOriginAllowed(origin, customOrigins = []) {
  if (!origin) return true;
  const clean = origin.replace(/\/$/, '');
  const allAllowed = [...defaultAllowed, ...customOrigins];
  return (
    allAllowed.includes(clean) ||
    clean.endsWith('.vercel.app') ||
    clean.includes('localhost')
  );
}

module.exports = { defaultAllowed, isOriginAllowed };
