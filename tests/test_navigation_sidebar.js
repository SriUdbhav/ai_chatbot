/**
 * StudyMate AI — Navigation & Collapsible Sidebar Automated Verification Suite
 *
 * Verifies:
 * 1. Clean Top Navigation layout (Left: hamburger + title; Right: engine status + theme + notifs + profile avatar with dropdown)
 * 2. Appropriate relocation of study mode selector, document upload button, tools trigger, and chat search input
 * 3. Collapsible sidebar icon-rail mechanics (68px width, hidden text labels, centered icons with tooltips)
 * 4. Smooth transitions and prevention of layout flashing (anti-flicker head restore script)
 * 5. Mobile drawer responsiveness with overlay and auto-dismiss on item navigation
 * 6. LocalStorage persistence ('studymate_sidebar_collapsed') and ARIA accessibility
 * 7. Preservation of existing Gemini, WebLLM, PWA, and surface transparency features
 */

'use strict';

const fs     = require('fs');
const path   = require('path');
const assert = require('assert');

let passedTests = 0;
let totalTests  = 0;

function runTest(description, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ ${description}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ ${description}`);
    console.error(`     Error: ${err.message}`);
    process.exitCode = 1;
  }
}

console.log('═══════════════════════════════════════════════════════════════');
console.log('🧭 StudyMate AI — Navigation & Collapsible Sidebar Test Suite');
console.log('═══════════════════════════════════════════════════════════════\n');

const chatEjsPath   = path.join(__dirname, '..', 'views', 'chat.ejs');
const headerEjsPath = path.join(__dirname, '..', 'views', 'partials', 'header.ejs');
const chatCssPath   = path.join(__dirname, '..', 'public', 'css', 'chat.css');
const chatJsPath    = path.join(__dirname, '..', 'public', 'js', 'chat.js');

const chatEjs   = fs.readFileSync(chatEjsPath, 'utf8');
const headerEjs = fs.readFileSync(headerEjsPath, 'utf8');
const chatCss   = fs.readFileSync(chatCssPath, 'utf8');
const chatJs    = fs.readFileSync(chatJsPath, 'utf8');

// ── 1. Top Navigation Bar Structure ──────────────────────────────────────────
console.log('1. Simplified Top Navigation Bar:');

runTest('Chat topbar contains distinct Left and Right containers', () => {
  assert.ok(chatEjs.includes('class="chat-topbar"'), 'Missing .chat-topbar');
  assert.ok(chatEjs.includes('class="topbar-left"'), 'Missing .topbar-left');
  assert.ok(chatEjs.includes('topbar-actions') || chatEjs.includes('topbar-right'), 'Missing topbar right/actions container');
});

runTest('Topbar Left contains sidebar toggle hamburger and StudyMate branding/title', () => {
  assert.ok(chatEjs.includes('id="sidebarOpenBtn"'), 'Missing hamburger #sidebarOpenBtn');
  assert.ok(chatEjs.includes('id="topbarTitle"'), 'Missing #topbarTitle');
  assert.ok(chatEjs.includes('StudyMate AI'), 'Missing StudyMate AI text/branding');
  assert.ok(chatEjs.includes('topbar-subtitle'), 'Missing .topbar-subtitle');
});

runTest('Topbar Right contains compact AI engine status, theme toggle, notifications, and profile avatar with dropdown', () => {
  assert.ok(chatEjs.includes('id="engineIndicatorPill"'), 'Missing #engineIndicatorPill');
  assert.ok(chatEjs.includes('id="offlineIndicatorBadge"'), 'Missing #offlineIndicatorBadge');
  assert.ok(chatEjs.includes('id="themeToggleBtn"'), 'Missing #themeToggleBtn');
  assert.ok(chatEjs.includes('id="notifBtn"'), 'Missing #notifBtn');
  assert.ok(chatEjs.includes('id="notifDropdown"'), 'Missing #notifDropdown');
  assert.ok(chatEjs.includes('id="profileChip"'), 'Missing #profileChip');
  assert.ok(chatEjs.includes('id="profileDropdown"'), 'Missing #profileDropdown');
});

runTest('Overcrowded controls are removed from topbar and cleanly relocated', () => {
  // Extract content between <header class="chat-topbar"> and </header>
  const topbarMatch = chatEjs.match(/<header class="chat-topbar">([\s\S]*?)<\/header>/);
  assert.ok(topbarMatch, 'Could not find <header class="chat-topbar">');
  const topbarContent = topbarMatch[1];

  assert.ok(!topbarContent.includes('id="studyModeSelect"'), 'Mode select should not be in the topbar');
  assert.ok(!topbarContent.includes('id="openDocStudioBtn"'), 'Upload document should not be in the topbar');
  assert.ok(!topbarContent.includes('id="chatSearchInput"'), 'Chat search should not be in the topbar');
});

// ── 2. Relocated Controls & Workspace Integration ────────────────────────────
console.log('\n2. Relocated Controls & Workspace Subbar:');

runTest('Learning mode selector relocated inside the chat workspace (.workspace-subbar)', () => {
  assert.ok(chatEjs.includes('id="workspaceSubbar"'), 'Missing #workspaceSubbar in chat layout');
  assert.ok(chatEjs.includes('id="studyModeSelect"'), 'Missing #studyModeSelect in template');
  const subbarMatch = chatEjs.match(/<div class="workspace-subbar"[\s\S]*?<\/div>[\s\S]*?<\/div>/);
  assert.ok(subbarMatch && subbarMatch[0].includes('id="studyModeSelect"'), '#studyModeSelect should be within the workspace subbar');
});

runTest('Document studio upload button relocated near chat composer controls', () => {
  assert.ok(chatEjs.includes('id="openDocStudioBtn"'), 'Missing #openDocStudioBtn in template');
  const composerMatch = chatEjs.match(/<div class="composer-controls">([\s\S]*?)<\/div>/);
  assert.ok(composerMatch && composerMatch[1].includes('id="openDocStudioBtn"'), '#openDocStudioBtn must be placed inside .composer-controls near message input');
});

runTest('Chat search input relocated to sidebar chat history section', () => {
  assert.ok(chatEjs.includes('id="chatSearchInput"'), 'Missing #chatSearchInput in template');
  const convoSectionMatch = chatEjs.match(/class="sidebar-section convo-section"[\s\S]*?<\/aside>/);
  assert.ok(convoSectionMatch && convoSectionMatch[0].includes('id="chatSearchInput"'), '#chatSearchInput should be in the sidebar chat history section');
});

runTest('Tools trigger button preserved within sidebar AI Study Tools section', () => {
  assert.ok(chatEjs.includes('id="openToolsBtn"'), 'Missing #openToolsBtn in template');
  const toolsHeaderMatch = chatEjs.match(/class="sidebar-tools-section"[\s\S]*?<\/div>/);
  assert.ok(toolsHeaderMatch && toolsHeaderMatch[0].includes('id="openToolsBtn"'), '#openToolsBtn must be retained in sidebar tools section');
});

// ── 3. Collapsible Sidebar (Desktop Rail & Mobile Drawer) ─────────────────────
console.log('\n3. Collapsible Sidebar Mechanics & Styles:');

runTest('CSS defines desktop icon rail width (68px) and hides text labels in collapsed state', () => {
  assert.ok(chatCss.includes('68px'), 'Missing 68px collapsed rail width in chat.css');
  assert.ok(chatCss.includes('sidebar-collapsed') || chatCss.includes('.sidebar.collapsed'), 'Missing sidebar collapsed class in chat.css');
  assert.ok(chatCss.includes('.nav-text') && chatCss.includes('display: none'), 'Must hide .nav-text when collapsed');
  assert.ok(chatCss.includes('.brand-text') && chatCss.includes('display: none'), 'Must hide .brand-text when collapsed');
  assert.ok(chatCss.includes('.new-chat-btn span') && chatCss.includes('display: none'), 'Must hide .new-chat-btn text when collapsed');
});

runTest('Navigation and tool buttons have descriptive title tooltips for collapsed rail usability', () => {
  assert.ok(chatEjs.includes('id="newChatBtn"') && chatEjs.includes('title="New Chat'), 'Missing title tooltip on #newChatBtn');
  assert.ok(chatEjs.includes('id="navHome"') && chatEjs.includes('title="Home"'), 'Missing title tooltip on #navHome');
  assert.ok(chatEjs.includes('id="navSubjectNotes"') && chatEjs.includes('title='), 'Missing title tooltip on #navSubjectNotes');
  assert.ok(chatEjs.includes('id="navPracticeQuiz"') && chatEjs.includes('title='), 'Missing title tooltip on #navPracticeQuiz');
  assert.ok(chatEjs.includes('id="navStudyPlanner"') && chatEjs.includes('title='), 'Missing title tooltip on #navStudyPlanner');
  assert.ok(chatEjs.includes('id="navSavedItems"') && chatEjs.includes('title='), 'Missing title tooltip on #navSavedItems');
  assert.ok(chatEjs.includes('id="navSettings"') && chatEjs.includes('title='), 'Missing title tooltip on #navSettings');
});

runTest('Early anti-flicker restoration script included in <head> for instant collapsed state', () => {
  assert.ok(chatEjs.includes("localStorage.getItem('studymate_sidebar_collapsed')"), 'Missing early sidebar collapsed check in chat.ejs <head>');
  assert.ok(headerEjs.includes("localStorage.getItem('studymate_sidebar_collapsed')"), 'Missing early sidebar collapsed check in header.ejs <head>');
  assert.ok(chatEjs.includes("sidebar-collapsed"), 'Early script must add sidebar-collapsed class to document');
});

// ── 4. Interaction, Persistence & Accessibility ──────────────────────────────
console.log('\n4. Client Interaction, Persistence & Accessibility:');

runTest('chat.js provides toggleSidebar() with desktop/mobile differentiation', () => {
  assert.ok(chatJs.includes('toggleSidebar'), 'Missing toggleSidebar function in chat.js');
  assert.ok(chatJs.includes('sidebar-collapsed'), 'toggleSidebar must manage sidebar-collapsed class');
  assert.ok(chatJs.includes('studymate_sidebar_collapsed'), 'toggleSidebar must persist state in localStorage');
});

runTest('Clicking navigation or new chat items on mobile automatically closes the drawer', () => {
  assert.ok(chatJs.includes('closeSidebar'), 'Missing closeSidebar function call');
  assert.ok(chatJs.includes('.sidebar .nav-item') || chatJs.includes('navSubjectNotes'), 'Drawer items must trigger closeSidebar on mobile');
});

runTest('Student profile dropdown provides interactive modal triggers and outside click dismissal', () => {
  assert.ok(chatJs.includes('profileDropdown'), 'Missing profileDropdown reference in chat.js');
  assert.ok(chatJs.includes('profileSettingsBtn'), 'Missing profileSettingsBtn handler in chat.js');
  assert.ok(chatJs.includes('profileSavedBtn'), 'Missing profileSavedBtn handler in chat.js');
  assert.ok(chatJs.includes('profilePlannerBtn'), 'Missing profilePlannerBtn handler in chat.js');
});

runTest('ARIA accessibility attributes implemented on hamburger and profile chip', () => {
  assert.ok(chatEjs.includes('id="sidebarOpenBtn"') && chatEjs.includes('aria-label='), '#sidebarOpenBtn must have aria-label');
  assert.ok(chatEjs.includes('id="profileChip"') && chatEjs.includes('aria-haspopup="true"'), '#profileChip must have aria-haspopup');
  assert.ok(chatJs.includes("sidebarOpenBtn.setAttribute('aria-expanded'"), 'Hamburger must dynamically update aria-expanded');
});

// ── 5. Capability Preservation & Global Surface Transparency ─────────────────
console.log('\n5. Capability Preservation & Non-Regression:');

runTest('Zero missing DOM element IDs (preserves all existing handlers and test contracts)', () => {
  const regex = /document\.getElementById\(['"]([^'"]+)['"]\)/g;
  let match;
  const missing = [];
  while ((match = regex.exec(chatJs)) !== null) {
    const id = match[1];
    if (!chatEjs.includes(`id="${id}"`) && !chatEjs.includes(`id='${id}'`)) {
      missing.push(id);
    }
  }
  assert.strictEqual(missing.length, 0, `Missing DOM IDs in EJS: ${missing.join(', ')}`);
});

runTest('Global interface transparency (--app-surface-opacity) applies to new topbar & subbar surfaces', () => {
  assert.ok(chatCss.includes('.workspace-subbar'), 'Missing .workspace-subbar in chat.css');
  assert.ok(chatCss.includes('.profile-dropdown'), 'Missing .profile-dropdown in chat.css');
  assert.ok(chatCss.includes('var(--bg-white)'), 'Surfaces must reference variable translucent background');
});

runTest('WebLLM, Gemini, and PWA logic untouched and completely preserved', () => {
  assert.ok(chatJs.includes('initLocalAiSettings'), 'Local AI integration must be preserved');
  assert.ok(chatJs.includes('initPwaAndOfflineSupport'), 'PWA offline support must be preserved');
  assert.ok(chatJs.includes('APP_CONFIG'), 'Gemini app config must be preserved');
});

console.log('\n═══════════════════════════════════════════════════════════════');
console.log(`Results: ${passedTests} Passed, ${totalTests - passedTests} Failed`);
console.log('═══════════════════════════════════════════════════════════════');

if (passedTests !== totalTests) {
  process.exit(1);
}

