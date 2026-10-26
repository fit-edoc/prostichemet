const assert = require('assert');
const { sanitizeString, sanitizeUrl } = require('../src/utils/sanitizer');

assert.strictEqual(sanitizeString('  hello world  '), 'hello world');
assert.strictEqual(sanitizeUrl('example.com'), 'https://example.com');
assert.strictEqual(sanitizeUrl('https://valid.com'), 'https://valid.com');
console.log('✔ Sanitizer tests passed');
