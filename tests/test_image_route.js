'use strict';
const assert = require('assert');
const chatController = require('../controllers/chatController');

function createMockRes() {
  const res = {
    statusCode: 200,
    headers: {},
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.body = data;
      return this;
    },
    setHeader(k, v) {
      this.headers[k] = v;
      return this;
    }
  };
  return res;
}

async function runTests() {
  console.log('Testing postGenerateImage controller directly...');

  // Test 1: Empty prompt -> 400
  const req1 = { body: {} };
  const res1 = createMockRes();
  await chatController.postGenerateImage(req1, res1);
  assert.strictEqual(res1.statusCode, 400);
  assert.strictEqual(res1.body.code, 'INVALID_PROMPT');
  console.log('✔ Test 1 passed: Empty prompt rejected with 400 INVALID_PROMPT');

  // Test 2: Whitespace prompt -> 400
  const req2 = { body: { prompt: '    ' } };
  const res2 = createMockRes();
  await chatController.postGenerateImage(req2, res2);
  assert.strictEqual(res2.statusCode, 400);
  assert.strictEqual(res2.body.code, 'INVALID_PROMPT');
  console.log('✔ Test 2 passed: Whitespace prompt rejected with 400 INVALID_PROMPT');

  // Test 3: Overly long prompt -> 413
  const req3 = { body: { prompt: 'a'.repeat(1005) } };
  const res3 = createMockRes();
  await chatController.postGenerateImage(req3, res3);
  assert.strictEqual(res3.statusCode, 413);
  assert.strictEqual(res3.body.code, 'PROMPT_TOO_LONG');
  console.log('✔ Test 3 passed: Long prompt rejected with 413 PROMPT_TOO_LONG');

  console.log('All controller unit tests passed successfully!');
}

runTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
