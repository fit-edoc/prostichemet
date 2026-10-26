const path = require('path');
const fs = require('fs');

function loadSeedData() {
  const filePath = path.join(__dirname, 'sample_leads.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

module.exports = { loadSeedData };
