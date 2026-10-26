function sanitizeString(input, maxLength = 255) {
  if (!input || typeof input !== 'string') return '';
  return input.trim().slice(0, maxLength);
}

function sanitizeUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  let url = rawUrl.trim();
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }
  return url;
}

module.exports = {
  sanitizeString,
  sanitizeUrl,
};
