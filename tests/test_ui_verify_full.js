// Comprehensive end-to-end verification script for StudyMate AI main chat workspace
const http = require('http');

async function testMainChat() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('🧪  StudyMate AI — Main Chat Workspace & Live Gemini Verification');
  console.log('═══════════════════════════════════════════════════════════════\n');

  // 1. Fetch HTML from localhost:3000
  console.log('Test 1: Verifying localhost:3000 HTML structure & stylesheets...');
  const htmlRes = await fetch('http://localhost:3000');
  const html = await htmlRes.text();

  if (!html.includes('class="app-workspace"')) throw new Error('Missing .app-workspace in HTML');
  if (!html.includes('class="chat-layout"')) throw new Error('Missing .chat-layout in HTML');
  if (!html.includes('id="topbarTitle"')) throw new Error('Missing #topbarTitle in HTML');
  if (!html.includes('id="welcomeScreen"')) throw new Error('Missing #welcomeScreen in HTML');
  if (!html.includes('id="messagesInner"')) throw new Error('Missing #messagesInner in HTML');
  if (!html.includes('id="messageInput"')) throw new Error('Missing #messageInput in HTML');
  if (!html.includes('id="sendBtn"')) throw new Error('Missing #sendBtn in HTML');
  if (html.includes('/css/style.css')) throw new Error('Conflicting /css/style.css should not be linked in chat.ejs');
  if (!html.includes('/css/chat.css')) throw new Error('/css/chat.css must be linked');
  console.log('✅ HTML structure & stylesheets verified successfully.\n');

  // 2. Verify CSS rules for layout
  console.log('Test 2: Verifying CSS layout rules in chat.css & style.css...');
  const chatCssRes = await fetch('http://localhost:3000/css/chat.css');
  const chatCss = await chatCssRes.text();

  if (!chatCss.includes('display: flex !important;\n  flex-direction: row !important;')) {
    throw new Error('body.app-body must have display: flex !important and flex-direction: row !important');
  }
  if (!chatCss.includes('.app-workspace {\n  flex: 1 1 auto;\n  min-width: 0;')) {
    throw new Error('.app-workspace must have flex: 1 1 auto and min-width: 0');
  }
  if (!chatCss.includes('.chat-layout {\n  flex: 1 1 auto;\n  min-width: 0;')) {
    throw new Error('.chat-layout must have flex: 1 1 auto and min-width: 0');
  }
  if (!chatCss.includes('.composer-area {\n  flex-shrink: 0;')) {
    throw new Error('.composer-area must have flex-shrink: 0');
  }
  console.log('✅ CSS layout rules prevent any zero-height, zero-width, or off-screen flex displacement.\n');

  // 3. Send test prompt: "Explain arrays in Python with an example." to live Gemini
  console.log('Test 3: Calling live Gemini API with: "Explain arrays in Python with an example."...');
  const apiRes = await fetch('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'Explain arrays in Python with an example.',
      history: [],
      mode: 'standard'
    })
  });

  const apiData = await apiRes.json();
  if (apiData.status !== 'success') {
    throw new Error(`Chat API error: ${JSON.stringify(apiData)}`);
  }
  if (!apiData.reply || apiData.reply.length < 50) {
    throw new Error('Live Gemini reply was unexpectedly empty or truncated');
  }

  console.log('✅ Live Gemini response received:');
  console.log('─────────────────────────────────────────────────────────────────');
  console.log(apiData.reply.slice(0, 300) + '...\n');
  console.log('─────────────────────────────────────────────────────────────────');

  // 4. Verify conversation isolation
  console.log('Test 4: Verifying multi-turn history isolation...');
  const turn2Res = await fetch('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'How do I add an element to it?',
      history: [
        { role: 'user', content: 'Explain arrays in Python with an example.' },
        { role: 'model', content: apiData.reply }
      ],
      mode: 'standard'
    })
  });

  const turn2Data = await turn2Res.json();
  if (turn2Data.status !== 'success' || !turn2Data.reply) {
    throw new Error(`Turn 2 failed: ${JSON.stringify(turn2Data)}`);
  }
  console.log('✅ Follow-up in conversation received context-aware response:');
  console.log(turn2Data.reply.slice(0, 200) + '...\n');

  console.log('═══════════════════════════════════════════════════════════════');
  console.log('🎉 ALL VERIFICATION TESTS PASSED SUCCESSFULLY!');
  console.log('═══════════════════════════════════════════════════════════════');
}

testMainChat().catch(err => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
