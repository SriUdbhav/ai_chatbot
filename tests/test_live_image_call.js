'use strict';
require('dotenv').config();
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
    }
  };
  return res;
}

async function runLiveTest() {
  console.log('Testing live postGenerateImage with Gemini API...');
  const req = { body: { prompt: 'A simple diagram of an animal cell' } };
  const res = createMockRes();

  await chatController.postGenerateImage(req, res);

  console.log('Status code:', res.statusCode);
  console.log('Response body:', JSON.stringify(res.body, null, 2));

  if (res.statusCode === 200) {
    assert.strictEqual(res.body.status, 'success');
    assert.ok(res.body.imageBase64, 'Has imageBase64');
    assert.ok(res.body.engine.includes('Image'), 'Has image engine');
    console.log('✔ Live image generation succeeded!');
  } else if (res.statusCode === 429) {
    assert.ok(res.body.code === 'QUOTA_EXCEEDED_FREE_TIER' || res.body.code === 'RATE_LIMIT_COOLDOWN');
    console.log('✔ Rate limit or Free Tier cooldown gracefully handled and diagnosis returned!');
  } else {
    console.log('Received status:', res.statusCode, res.body);
  }
}

runLiveTest().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});

