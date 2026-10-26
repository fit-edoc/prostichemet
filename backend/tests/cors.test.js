const assert = require('assert');
const { isOriginAllowed } = require('../src/config/corsOptions');

assert.strictEqual(isOriginAllowed('https://prospail.vercel.app'), true);
assert.strictEqual(isOriginAllowed('http://localhost:3000'), true);
assert.strictEqual(isOriginAllowed('https://random-site.com'), false);
console.log('✔ CORS policy test passed');
