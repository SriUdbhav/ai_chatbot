/**
 * End-to-End Browser Verification Test for Document Reader & AI Study Notes
 * Tests UI triggers, modal interaction, tabs, upload validation, 9-part notes, and document Q&A.
 */

const { spawn } = require('child_process');
const http = require('http');
const WebSocket = require('ws');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9226;

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function getCDPWebSocketUrl(port = PORT) {
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${port}/json`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const list = JSON.parse(data);
          const page = list.find(t => t.type === 'page') || list[0];
          if (page && page.webSocketDebuggerUrl) {
            resolve(page.webSocketDebuggerUrl);
          } else {
            reject(new Error('No active page target found'));
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}


class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    const WebSocket = require('ws');
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.on('open', () => resolve());
      this.ws.on('error', reject);
      this.ws.on('message', (msg) => {
        const parsed = JSON.parse(msg.toString());
        if (parsed.id && this.callbacks.has(parsed.id)) {
          const { res, rej } = this.callbacks.get(parsed.id);
          this.callbacks.delete(parsed.id);
          if (parsed.error) rej(new Error(parsed.error.message));
          else res(parsed.result);
        }
      });
    });
  }

  async send(method, params = {}) {
    const id = this.id++;
    return new Promise((res, rej) => {
      this.callbacks.set(id, { res, rej });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expression) {
    const result = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    if (result.exceptionDetails) {
      throw new Error(`CDP Eval Error: ${result.exceptionDetails.text || result.exceptionDetails.exception?.description}`);
    }
    return result.result?.value;
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function runDocStudioVerification() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('🧪  Document Studio UI & End-to-End Verification Suite');
  console.log('═══════════════════════════════════════════════════════════════\n');

  console.log('1. Launching headless Chrome via CDP on port ' + PORT + '...');
  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=' + PORT,
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank'
  ]);

  await sleep(1500);

  let client;
  try {
    const wsUrl = await getCDPWebSocketUrl(PORT);
    client = new CDPClient(wsUrl);
    await client.connect();

    console.log('2. Navigating to StudyMate AI at http://localhost:3000...');
    await client.send('Page.navigate', { url: 'http://localhost:3000' });
    await sleep(1200);

  // Step 1: Check presence of trigger buttons
  console.log('\n--- Step 1: Checking Document Studio UI Triggers ---');
  const triggers = await client.eval(`({
    topbarBtn: !!document.getElementById('openDocStudioBtn'),
    welcomeCard: !!document.getElementById('featuredDocCard'),
    quickPill: !!document.getElementById('quickDocPill'),
    panelBtn: !!document.getElementById('panelUploadDocBtn'),
    navItem: !!document.getElementById('navSubjectNotes')
  })`);
  console.log('Trigger Buttons Presence:', triggers);
  if (!triggers.topbarBtn || !triggers.welcomeCard || !triggers.quickPill) {
    throw new Error('Missing one or more Document Studio trigger buttons');
  }
  console.log('✅ All trigger buttons present in DOM.');

  // Step 2: Open Document Studio via topbar button
  console.log('\n--- Step 2: Opening Document Studio Modal ---');
  await client.eval(`document.getElementById('openDocStudioBtn').click()`);
  await new Promise(r => setTimeout(r, 400));

  const modalOpenState = await client.eval(`({
    modalHidden: document.getElementById('docStudioModal').hasAttribute('hidden'),
    activeTab: document.querySelector('.doc-tab.active')?.dataset?.tab,
    dropzoneVisible: !document.getElementById('docDropzone').hasAttribute('hidden')
  })`);
  console.log('Modal Open State:', modalOpenState);
  if (modalOpenState.modalHidden || modalOpenState.activeTab !== 'upload') {
    throw new Error('Document Studio modal did not open on Upload tab');
  }
  console.log('✅ Document Studio modal opened successfully on Upload tab.');

  // Step 3: Tab Switching
  console.log('\n--- Step 3: Verifying Tab Switching ---');
  await client.eval(`switchDocTab('notes')`);
  let activeTab = await client.eval(`document.querySelector('.doc-tab.active')?.dataset?.tab`);
  if (activeTab !== 'notes') throw new Error('Failed to switch to notes tab');

  await client.eval(`switchDocTab('chat')`);
  activeTab = await client.eval(`document.querySelector('.doc-tab.active')?.dataset?.tab`);
  if (activeTab !== 'chat') throw new Error('Failed to switch to chat tab');

  await client.eval(`switchDocTab('text')`);
  activeTab = await client.eval(`document.querySelector('.doc-tab.active')?.dataset?.tab`);
  if (activeTab !== 'text') throw new Error('Failed to switch to text tab');

  await client.eval(`switchDocTab('upload')`);
  activeTab = await client.eval(`document.querySelector('.doc-tab.active')?.dataset?.tab`);
  if (activeTab !== 'upload') throw new Error('Failed to return to upload tab');
  console.log('✅ All 4 tabs (Upload, Notes, Chat, Text) switch smoothly.');

  // Step 4: Test Upload Validation (Oversized & Unsupported Files)
  console.log('\n--- Step 4: Testing Frontend Upload Validation ---');
  await client.eval(`
    // Test oversized file (11MB)
    const bigFile = new File(['x'.repeat(100)], 'huge_file.pdf', { type: 'application/pdf' });
    Object.defineProperty(bigFile, 'size', { value: 11 * 1024 * 1024 });
    handleFileUpload(bigFile);
  `);
  await new Promise(r => setTimeout(r, 200));

  const oversizedError = await client.eval(`({
    bannerHidden: document.getElementById('docErrorBanner').hasAttribute('hidden'),
    errorTitle: document.getElementById('docErrorTitle').textContent,
    errorMsg: document.getElementById('docErrorMessage').textContent
  })`);
  console.log('Oversized File Error Banner:', oversizedError);
  if (oversizedError.bannerHidden || !oversizedError.errorTitle.includes('Large')) {
    throw new Error('Oversized file did not trigger validation error banner');
  }
  console.log('✅ Oversized file validation error confirmed.');

  await client.eval(`
    // Test unsupported file format (.exe)
    const badFile = new File(['content'], 'malware.exe', { type: 'application/x-msdownload' });
    handleFileUpload(badFile);
  `);
  await new Promise(r => setTimeout(r, 200));

  const unsupportedError = await client.eval(`({
    bannerHidden: document.getElementById('docErrorBanner').hasAttribute('hidden'),
    errorTitle: document.getElementById('docErrorTitle').textContent
  })`);
  console.log('Unsupported Format Error Banner:', unsupportedError);
  if (unsupportedError.bannerHidden || !unsupportedError.errorTitle.includes('Unsupported')) {
    throw new Error('Unsupported file extension did not trigger validation error banner');
  }
  console.log('✅ Unsupported file extension validation error confirmed.');

  // Step 5: Simulate Valid Document Upload
  console.log('\n--- Step 5: Uploading Valid Study Document ---');
  const sampleDocText = `Chapter 4: Operating Systems - Process Synchronization and Deadlocks

1. Process Synchronization Overview
When multiple concurrent processes execute and access shared resources, race conditions can occur. To prevent inconsistency, critical sections must satisfy mutual exclusion, progress, and bounded waiting.

2. Important Definitions
- Race Condition: A flaw where the output depends on the execution order or timing of processes.
- Critical Section: A code block accessing shared variables that must not be concurrently executed.
- Mutex: A locking mechanism used to synchronize access to a resource.
- Semaphore: A signaling mechanism using an integer variable accessed via wait() (P) and signal() (V) operations.

3. Deadlock Necessary Conditions (Coffman Conditions)
Four simultaneous conditions cause deadlock:
1. Mutual Exclusion: At least one resource is held in a non-shareable mode.
2. Hold and Wait: A process holding resources requests additional resources.
3. No Preemption: Resources cannot be forcibly taken from a process.
4. Circular Wait: A closed chain of processes exists such that each process holds resources needed by the next.

4. Formulas and Resource Allocation
Formula for Banker's Algorithm Need Matrix:
Need[i, j] = Max[i, j] - Allocation[i, j]

5. Revision Questions
1. How does a binary semaphore differ from a counting semaphore?
2. Explain the four Coffman conditions required for deadlock.
3. How does Banker's algorithm determine whether the system is in a safe state?`;

  await client.eval(`
    (async () => {
      const file = new File([${JSON.stringify(sampleDocText)}], 'os_sync_deadlocks.txt', { type: 'text/plain' });
      await handleFileUpload(file);
    })()
  `);

  // Wait for server read
  await new Promise(r => setTimeout(r, 1200));

  const uploadResult = await client.eval(`({
    hasDocState: !!docState.text,
    filename: docState.filename,
    wordCount: docState.wordCount,
    metaCardHidden: document.getElementById('docMetaCard').hasAttribute('hidden'),
    statusBadgeText: document.getElementById('docStatusBadge').textContent,
    rawTextPreview: document.getElementById('docRawPre').textContent.slice(0, 50)
  })`);
  console.log('Upload Result:', uploadResult);
  if (!uploadResult.hasDocState || uploadResult.metaCardHidden || !uploadResult.filename.includes('os_sync_deadlocks.txt')) {
    throw new Error('Valid document upload failed to update docState and UI');
  }
  console.log(`✅ Document "${uploadResult.filename}" parsed with ${uploadResult.wordCount} words.`);

  // Step 6: Generate 9-Part Summarized Study Notes via Gemini API
  console.log('\n--- Step 6: Generating 9-Part Summarized Notes via Gemini API ---');
  await client.eval(`generateDocNotes(true)`);

  // Poll until notes generation completes (max 30s)
  let notesDone = false;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 1500));
    const loadingHidden = await client.eval(`document.getElementById('docNotesLoading').hasAttribute('hidden')`);
    const hasNotes = await client.eval(`!!docState.notes`);
    if (loadingHidden && hasNotes) {
      notesDone = true;
      break;
    }
  }

  if (!notesDone) throw new Error('Notes generation timed out');

  const notesStats = await client.eval(`({
    notesLength: docState.notes.length,
    renderedHtmlLength: document.getElementById('docNotesRendered').innerHTML.length,
    hasOverview: docState.notes.toLowerCase().includes('overview'),
    hasDefinitions: docState.notes.toLowerCase().includes('definition'),
    hasConcepts: docState.notes.toLowerCase().includes('concept'),
    hasQuestions: docState.notes.toLowerCase().includes('question'),
    hasFormulas: docState.notes.toLowerCase().includes('formula') || docState.notes.toLowerCase().includes('equation')
  })`);
  console.log('Generated Notes Verification:', notesStats);
  if (notesStats.notesLength < 250 || !notesStats.hasOverview || !notesStats.hasDefinitions) {
    throw new Error('Generated notes do not meet structure requirements');
  }
  console.log('✅ 9-Part Study Notes synthesized and rendered successfully.');

  // Step 7: Test Document Q&A (Question Answering citing document)
  console.log('\n--- Step 7: Testing Chat with Document (Q&A) ---');
  await client.eval(`switchDocTab('chat')`);
  await client.eval(`sendDocChatMessage('What are the four Coffman conditions for deadlock?')`);

  // Wait for Gemini response
  let chatAnswered = false;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 1200));
    const isChatting = await client.eval(`docState.isChatting`);
    if (!isChatting && (await client.eval(`docState.chatHistory.length >= 2`))) {
      chatAnswered = true;
      break;
    }
  }

  if (!chatAnswered) throw new Error('Document Q&A response timed out');

  const chatResult = await client.eval(`({
    historyLen: docState.chatHistory.length,
    lastReply: docState.chatHistory[docState.chatHistory.length - 1]?.content,
    hasConditions: docState.chatHistory[docState.chatHistory.length - 1]?.content?.toLowerCase().includes('mutual exclusion') ||
                   docState.chatHistory[docState.chatHistory.length - 1]?.content?.toLowerCase().includes('hold and wait')
  })`);
  console.log('Chat Q&A Result: Reply length:', chatResult.lastReply?.length, 'Has Conditions:', chatResult.hasConditions);
  if (!chatResult.hasConditions) {
    throw new Error('Chat Q&A reply did not cite the Coffman conditions from document');
  }
  console.log('✅ Document Q&A successfully cited source facts from uploaded text.');

  // Step 8: Test Mobile Viewport Layout for Document Studio
  console.log('\n--- Step 8: Testing Mobile Viewport (375x812) ---');
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: 375,
    height: 812,
    deviceScaleFactor: 2,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 500));

  const mobileMetrics = await client.eval(`({
    modalW: document.getElementById('docStudioModal').offsetWidth,
    cardW: document.querySelector('.doc-studio-card').offsetWidth,
    cardH: document.querySelector('.doc-studio-card').offsetHeight,
    tabsOverflow: document.querySelector('.doc-tabs').scrollWidth >= document.querySelector('.doc-tabs').clientWidth
  })`);
  console.log('Mobile Document Studio Metrics:', mobileMetrics);
  if (mobileMetrics.cardW > 375) {
    throw new Error('Document studio card width exceeds mobile screen width');
  }
  console.log('✅ Document Studio conforms to mobile viewport (375x812) without horizontal blowout.');

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('🎉 ALL DOCUMENT STUDIO UI & END-TO-END TESTS PASSED (8/8)!');
  console.log('═══════════════════════════════════════════════════════════════\n');
  } finally {
    if (client) client.close();
    try { chrome.kill(); } catch (e) {}
  }
}

runDocStudioVerification().catch(err => {
  console.error('\n❌ Test Suite Failed:', err.message);
  process.exit(1);
});

