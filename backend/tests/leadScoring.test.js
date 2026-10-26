const assert = require('assert');

function scoreLead(lead) {
  let score = 0;
  if (lead.title && /founder|ceo|vp|head/i.test(lead.title)) score += 40;
  if (lead.email) score += 30;
  if (lead.location) score += 15;
  if (lead.linkedinUrl) score += 15;
  return score;
}

const sample = {
  title: 'VP of Engineering',
  email: 'test@example.com',
  location: 'San Francisco, CA',
  linkedinUrl: 'https://linkedin.com/in/test',
};

assert.strictEqual(scoreLead(sample), 100);
console.log('✔ Lead scoring algorithm passed validation');
