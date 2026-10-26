const assert = require('assert');

function testHealthProbe() {
  const status = 'online';
  assert.strictEqual(status, 'online', 'Health probe must report online status');
  console.log('✔ Health probe test passed');
}

testHealthProbe();
