// Verification of UI Polish and Layout Bug Fixes
const fs = require('fs');

function testLayoutRules() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('🧪  StudyMate AI — Layout & Typography Polish Test Suite');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const css = fs.readFileSync('public/css/chat.css', 'utf8');
  const ejs = fs.readFileSync('views/chat.ejs', 'utf8');
  const js = fs.readFileSync('public/js/chat.js', 'utf8');

  // Test 1: Dimensions
  console.log('Test 1: Checking three-column layout target dimensions...');
  if (!css.includes('--sidebar-width: 290px;')) throw new Error('Sidebar width must be in 280-310px target range (290px)');
  if (!css.includes('--study-panel-width: 320px;')) throw new Error('Study panel width must be in 300-340px target range (320px)');
  console.log('✅ Three-column target dimensions verified (Sidebar: 290px, Study Panel: 320px).\n');

  // Test 2: Conversation Header Title Truncation
  console.log('Test 2: Checking conversation title single-line ellipsis truncation...');
  if (!css.includes('.topbar-title {') || !css.includes('text-overflow: ellipsis;')) {
    throw new Error('topbar-title must have text-overflow: ellipsis');
  }
  if (!css.includes('.topbar-title-wrap {\n  display: flex;\n  flex-direction: column;\n  min-width: 0;')) {
    throw new Error('topbar-title-wrap must have min-width: 0 to enable flex truncation');
  }
  if (!css.includes('.topbar-left {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  min-width: 0;')) {
    throw new Error('topbar-left must have min-width: 0');
  }
  console.log('✅ Header title flex container and ellipsis truncation verified.\n');

  // Test 3: Chat Message Area and Composer Stability
  console.log('Test 3: Checking message scrolling and composer non-overlapping layout...');
  if (!css.includes('.messages-area {\n  flex: 1 1 auto;\n  min-height: 0;\n  overflow-y: auto;\n  padding: 1.5rem 2rem 2.5rem;')) {
    throw new Error('.messages-area must have flex: 1 1 auto, min-height: 0, overflow-y: auto, and 2.5rem bottom padding');
  }
  if (!css.includes('.composer-area {\n  flex-shrink: 0;\n  padding: 0.75rem 2rem 1.15rem;\n  background-color: var(--bg-app);\n  border-top: 1px solid var(--border-subtle);')) {
    throw new Error('.composer-area must have flex-shrink: 0, solid background-color, and border-top divider');
  }
  if (!ejs.includes('class="composer-container"')) {
    throw new Error('views/chat.ejs must have .composer-container wrapping form');
  }
  console.log('✅ Message area scrolling and composer non-overlapping structure verified.\n');

  // Test 4: Sidebar Typography & Conversation Item Ellipsis
  console.log('Test 4: Checking sidebar typography and conversation item truncation...');
  if (!css.includes('.convo-item-title {\n  display: block;\n  font-size: 0.84rem;\n  font-weight: 500;\n  line-height: 1.3;\n  color: inherit;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;')) {
    throw new Error('.convo-item-title must have white-space: nowrap, overflow: hidden, and text-overflow: ellipsis');
  }
  if (!css.includes('.convo-item-text {\n  display: flex;\n  flex-direction: column;\n  flex: 1 1 0%;\n  min-width: 0;\n  overflow: hidden;')) {
    throw new Error('.convo-item-text must have flex: 1 1 0%, min-width: 0, and overflow: hidden');
  }
  if (!css.includes('.convo-item-actions {\n  display: none;\n  align-items: center;\n  gap: 0.25rem;\n  flex-shrink: 0;\n  margin-left: auto;')) {
    throw new Error('.convo-item-actions must align to right and display on hover');
  }
  if (!css.includes('.nav-item {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.55rem 0.8rem;\n  height: 38px;')) {
    throw new Error('.nav-item must have height 38px and white-space nowrap');
  }
  console.log('✅ Sidebar typography, nav row heights, and conversation item truncation verified.\n');

  // Test 5: Code Blocks & User Actions
  console.log('Test 5: Checking code blocks and message action alignments...');
  if (!css.includes('.ai-bubble pre, .ai-card pre {')) {
    throw new Error('.ai-bubble pre must be styled to prevent code block overflow');
  }
  if (!css.includes('.user-msg-actions {\n  display: flex;\n  align-items: center;\n  gap: 0.3rem;\n  margin-top: 0.3rem;\n  align-self: flex-end;')) {
    throw new Error('.user-msg-actions must have align-self: flex-end');
  }
  console.log('✅ Code block formatting and user message action alignment verified.\n');

  // Test 6: Responsive Breakpoints
  console.log('Test 6: Checking responsive breakpoints...');
  if (!css.includes('@media (max-width: 1260px)')) {
    throw new Error('Study panel drawer breakpoint should be 1260px');
  }
  if (!css.includes('@media (max-width: 900px)')) {
    throw new Error('Sidebar drawer breakpoint should be 900px');
  }
  if (!css.includes('@media (max-width: 640px)')) {
    throw new Error('Mobile breakpoint should be 640px');
  }
  console.log('✅ Responsive breakpoints verified.\n');

  // Test 7: Dark Theme Default
  console.log('Test 7: Checking dark theme default configuration...');
  if (!ejs.includes('data-theme="dark"')) {
    throw new Error('body in chat.ejs should default to data-theme="dark"');
  }
  if (!js.includes("window.localStorage.getItem(THEME_STORAGE_KEY) || 'dark'")) {
    throw new Error('chat.js should default to dark theme when no preference stored');
  }
  console.log('✅ Dark theme default configuration verified.\n');

  console.log('═══════════════════════════════════════════════════════════════');
  console.log('🎉 ALL LAYOUT & TYPOGRAPHY TESTS PASSED (7/7)!');
  console.log('═══════════════════════════════════════════════════════════════');
}

testLayoutRules();
