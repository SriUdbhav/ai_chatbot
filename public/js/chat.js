/**
 * AI Study Assistant — Chat Application Script
 * Phase 5: Advanced AI Study Tools and Learning Modes
 *
 * Responsibilities:
 *  - Persistent multi-conversation management backed by browser localStorage
 *  - Auto-generated conversation titles from student's first prompt
 *  - Inline conversation rename with Save/Cancel controls & customTitle protection
 *  - Safe conversation deletion with confirmation dialog
 *  - Context-aware multi-turn conversation history forwarded to Gemini API
 *  - Learning Modes & Study Preferences selector (Standard, Simple, Step-by-Step, Exam Prep, Practice, Code Focus)
 *  - Specialized Study Tools:
 *      1. Concept Explainer (tailored levels & styles)
 *      2. Programming Assistant (explain, debug, generate, Big-O complexity)
 *      3. Notes Summarizer (quick revision, detailed, exam prep with char counter)
 *      4. AI Quiz Generator (interactive MCQ scoring, short-answer AI evaluation, explanations)
 *  - Tool results export into active chat conversations for follow-up questioning
 *  - Message rendering with lightweight Markdown, code copy & response copy
 *  - Responsive sidebar with active conversation indicator and relative timestamps
 */

'use strict';

/* ─────────────────────────────────────────────────────────────────
   CONSTANTS & CONFIGURATION
───────────────────────────────────────────────────────────────── */
const STORAGE_KEY           = 'studyai_conversations_v1';
const ACTIVE_CONV_KEY       = 'studyai_active_id_v1';
const LEARNING_MODE_KEY     = 'studyai_learning_mode_v1';
const MAX_CONVERSATIONS     = 50;
const MAX_MESSAGES_PER_CONV = 100;
const MAX_MESSAGE_LENGTH    = 4000;
const API_URL               = window.APP_CONFIG?.chatApiUrl ?? '/api/chat';
const TOOLS_API_URL         = window.APP_CONFIG?.toolsApiUrl ?? '/api/tools';
const API_KEY_CONFIGURED    = window.APP_CONFIG?.apiKeyConfigured ?? false;

/* ─────────────────────────────────────────────────────────────────
   APPLICATION STATE
───────────────────────────────────────────────────────────────── */
const state = {
  conversations:    {},   // { [id]: Conversation }
  activeId:         null, // string | null (null = new unsaved chat state)
  isWaiting:        false,// true while waiting for server response
  isStreaming:      false,// true while typewriter streaming is active
  stopStreamingRequested: false, // true when user clicks stop button
  editingId:        null, // conversation ID currently undergoing inline rename
  pendingDeleteId:  null, // conversation ID pending deletion modal confirmation
  storageAvailable: true, // set to false if localStorage is blocked or throws
  learningMode:     'standard', // active study preference
  activeQuiz:       null, // stores active quiz data and student answers
  isListening:      false,// speech dictation active
  speechRecognition: null,// Web Speech API instance
  currentSpeakingBtn: null, // current active TTS button
  searchQuery:      '',   // topbar search query filter
  pendingDeleteMode: null // 'single' | 'all'
};

/* ─────────────────────────────────────────────────────────────────
   DOM REFERENCES
───────────────────────────────────────────────────────────────── */
const sidebar            = document.getElementById('sidebar');
const sidebarOverlay     = document.getElementById('sidebarOverlay');
const sidebarCloseBtn    = document.getElementById('sidebarCloseBtn');
const sidebarOpenBtn     = document.getElementById('sidebarOpenBtn');
const newChatBtn         = document.getElementById('newChatBtn');
const convoList          = document.getElementById('convoList');
const convoEmpty         = document.getElementById('convoEmpty');
const welcomeScreen      = document.getElementById('welcomeScreen');
const messagesArea       = document.getElementById('messagesArea');
const clearChatBtn       = document.getElementById('clearChatBtn');
const chatForm           = document.getElementById('chatForm');
const messageInput       = document.getElementById('messageInput');
const sendBtn            = document.getElementById('sendBtn');
const stopBtn            = document.getElementById('stopBtn');
const micBtn             = document.getElementById('micBtn');
const quickToolsBar      = document.getElementById('quickToolsBar');
const topbarTitle        = document.getElementById('topbarTitle');
const composerHint       = document.getElementById('composerHint');
const studyModeSelect    = document.getElementById('studyModeSelect');
const openToolsBtn       = document.getElementById('openToolsBtn');
const deleteModal        = document.getElementById('deleteModal');
const deleteModalTitle   = document.getElementById('deleteModalTitle');
const deleteModalDesc    = document.getElementById('deleteModalDesc');
const deleteModalCancel  = document.getElementById('deleteModalCancel');
const deleteModalConfirm = document.getElementById('deleteModalConfirm');
const toastContainer     = document.getElementById('toastContainer');
const sidebarClearAllBtn = document.getElementById('sidebarClearAllBtn');

// Topbar Search, Theme & Notification References
const chatSearchInput     = document.getElementById('chatSearchInput');
const themeToggleBtn      = document.getElementById('themeToggleBtn');
const notifBtn            = document.getElementById('notifBtn');
const notifBadge          = document.getElementById('notifBadge');
const notifDropdown       = document.getElementById('notifDropdown');
const notifClearBtn       = document.getElementById('notifClearBtn');
const profileChip         = document.getElementById('profileChip');
const THEME_STORAGE_KEY   = 'studymate_theme_v1';

// Tools Modal References
const toolsModal         = document.getElementById('toolsModal');
const closeToolsModalBtn = document.getElementById('closeToolsModalBtn');
const toolTabs           = document.querySelectorAll('.tool-tab');
const toolPanes          = document.querySelectorAll('.tool-pane');

// Tool Form References
const explainForm        = document.getElementById('explainForm');
const programmingForm    = document.getElementById('programmingForm');
const summarizeForm      = document.getElementById('summarizeForm');
const summarizeNotes     = document.getElementById('summarizeNotes');
const notesCharCounter   = document.getElementById('notesCharCounter');
const quizForm           = document.getElementById('quizForm');

// Study Panel References
const studyPanel            = document.getElementById('studyPanel');
const studyPanelToggleBtn   = document.getElementById('studyPanelToggleBtn');
const studyPanelCloseBtn    = document.getElementById('studyPanelCloseBtn');
const studyPanelOverlay     = document.getElementById('studyPanelOverlay');
const panelSessionTitle     = document.getElementById('panelSessionTitle');
const panelMsgCount         = document.getElementById('panelMsgCount');
const panelActiveModeBadge  = document.getElementById('panelActiveModeBadge');
const quickNotepad          = document.getElementById('quickNotepad');
const notepadStatus         = document.getElementById('notepadStatus');

// Additional Feature Modals & Nav References
const navHome               = document.getElementById('navHome');
const navSubjectNotes       = document.getElementById('navSubjectNotes');
const navPracticeQuiz       = document.getElementById('navPracticeQuiz');
const navStudyPlanner       = document.getElementById('navStudyPlanner');
const navSavedItems         = document.getElementById('navSavedItems');
const navSettings           = document.getElementById('navSettings');
const sidebarAllToolsLink   = document.getElementById('sidebarAllToolsLink');

const plannerModal          = document.getElementById('plannerModal');
const plannerCloseBtn       = document.getElementById('plannerCloseBtn');
const plannerCancelBtn      = document.getElementById('plannerCancelBtn');
const plannerGenerateBtn    = document.getElementById('plannerGenerateBtn');
const plannerSubject        = document.getElementById('plannerSubject');
const plannerDays           = document.getElementById('plannerDays');
const plannerHours          = document.getElementById('plannerHours');

const savedItemsModal       = document.getElementById('savedItemsModal');
const savedCloseBtn         = document.getElementById('savedCloseBtn');
const savedDismissBtn       = document.getElementById('savedDismissBtn');
const savedItemsList        = document.getElementById('savedItemsList');

const settingsModal         = document.getElementById('settingsModal');
const settingsCloseBtn      = document.getElementById('settingsCloseBtn');
const settingsDoneBtn       = document.getElementById('settingsDoneBtn');
const clearAllHistoryBtn    = document.getElementById('clearAllHistoryBtn');

const SAVED_ITEMS_KEY       = 'studyai_saved_items_v1';
const QUICK_NOTES_KEY       = 'studyai_quick_notes_v1';

/* ─────────────────────────────────────────────────────────────────
   UTILITIES & FORMATTERS
───────────────────────────────────────────────────────────────── */
function generateId(prefix = 'id') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

function formatTime(timestamp = Date.now()) {
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatRelativeTime(timestamp) {
  if (!timestamp) return '';
  const now = Date.now();
  const diffSec = Math.floor((now - timestamp) / 1000);

  if (diffSec < 60) return 'Just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDays = Math.floor(diffHr / 24);
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;

  return new Date(timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' });
}

/**
 * Categorizes a timestamp into 'Today', 'Yesterday', or 'Earlier' based on local midnight boundaries.
 */
function getConversationGroup(timestamp) {
  if (!timestamp || typeof timestamp !== 'number') return 'Earlier';

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const startOfYesterday = startOfToday - 24 * 60 * 60 * 1000;

  if (timestamp >= startOfToday) {
    return 'Today';
  } else if (timestamp >= startOfYesterday) {
    return 'Yesterday';
  } else {
    return 'Earlier';
  }
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ─────────────────────────────────────────────────────────────────
   TOAST NOTIFICATION SYSTEM
───────────────────────────────────────────────────────────────── */
function showToast(message, type = 'info') {
  if (!toastContainer) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-hiding');
    setTimeout(() => toast.remove(), 260);
  }, 3200);
}

/* ─────────────────────────────────────────────────────────────────
   AUTOMATIC TITLE GENERATION
───────────────────────────────────────────────────────────────── */
function generateTitleFromPrompt(rawText) {
  if (!rawText || typeof rawText !== 'string') return 'New Conversation';

  let clean = rawText.trim().replace(/\s+/g, ' ');

  // If there are multiple sentences or questions, focus on the primary first sentence
  const firstSentenceMatch = clean.match(/^.+?(?:[?!]+|\.(?=\s+[A-Z]|\s*$))/);
  if (firstSentenceMatch && firstSentenceMatch[0].trim().length >= 8) {
    clean = firstSentenceMatch[0].trim();
  }

  const prefixes = [
    /^(?:can you\s+)?(?:please\s+)?explain(?:\s+to\s+me)?\s+(?:what\s+is\s+|what\s+are\s+)?/i,
    /^(?:what\s+is\s+the\s+difference\s+between|difference\s+between)\s+/i,
    /^(?:what\s+is|what\s+are|what\s+was|what\s+were|what\s+does|what\s+do|what\'s)\s+/i,
    /^(?:how\s+does|how\s+do|how\s+can\s+i|how\s+to|how\s+would)\s+/i,
    /^(?:tell\s+me\s+about|tell\s+me|give\s+me\s+an\s+example\s+of|give\s+me\s+examples\s+of|give\s+me)\s+/i,
    /^(?:define|summarize|help\s+me\s+understand|in\s+simple\s+terms)\s+/i,
    /^(?:write\s+a\s+program\s+to|write\s+code\s+for|how\s+to\s+implement)\s+/i,
  ];

  for (const regex of prefixes) {
    if (regex.test(clean)) {
      clean = clean.replace(regex, '').trim();
      break;
    }
  }

  clean = clean.replace(/[?.!;:,\s]+$/, '').trim();

  if (clean.length < 3) {
    clean = rawText.trim().replace(/[?.!;:,\s]+$/, '').trim();
  }

  if (!clean) return 'New Conversation';

  clean = clean.charAt(0).toUpperCase() + clean.slice(1);

  const MAX_TITLE_LEN = 36;
  if (clean.length > MAX_TITLE_LEN) {
    clean = clean.slice(0, MAX_TITLE_LEN).trim() + '…';
  }

  return clean;
}

/* ─────────────────────────────────────────────────────────────────
   STORAGE LAYER (LOCALSTORAGE PERSISTENCE)
───────────────────────────────────────────────────────────────── */
function checkStorageAvailable() {
  try {
    const testKey = '__studyai_storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    console.warn('[Storage] localStorage is not available or blocked in this browser.', e);
    return false;
  }
}

function loadStoredConversations() {
  if (!state.storageAvailable) return {};

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return {};

    const validConversations = {};

    Object.values(parsed).forEach(item => {
      if (!item || typeof item !== 'object' || typeof item.id !== 'string') return;

      const title = typeof item.title === 'string' && item.title.trim()
        ? item.title.trim().slice(0, 60)
        : 'Conversation';

      const createdAt = typeof item.createdAt === 'number' ? item.createdAt : Date.now();
      const updatedAt = typeof item.updatedAt === 'number' ? item.updatedAt : createdAt;
      const customTitle = Boolean(item.customTitle);

      const messages = [];
      if (Array.isArray(item.messages)) {
        item.messages.forEach(msg => {
          if (!msg || typeof msg !== 'object') return;
          const role = msg.role === 'user' ? 'user' : 'model';
          const content = typeof msg.content === 'string' ? msg.content : '';
          if (!content) return;

          messages.push({
            id:        typeof msg.id === 'string' ? msg.id : generateId('msg'),
            role:      role,
            content:   content.slice(0, MAX_MESSAGE_LENGTH * 3),
            timestamp: typeof msg.timestamp === 'number' ? msg.timestamp : Date.now(),
            time:      typeof msg.time === 'string' ? msg.time : formatTime(),
            isError:   Boolean(msg.isError),
            quizData:  (msg.quizData && typeof msg.quizData === 'object') ? msg.quizData : null
          });
        });
      }

      const cappedMessages = messages.slice(-MAX_MESSAGES_PER_CONV);

      validConversations[item.id] = {
        id:          item.id,
        title:       title,
        customTitle: customTitle,
        createdAt:   createdAt,
        updatedAt:   updatedAt,
        messages:    cappedMessages
      };
    });

    return validConversations;

  } catch (err) {
    console.warn('[Storage] Corrupted conversation storage detected. Recovering gracefully.', err);
    return {};
  }
}

function saveStoredConversations() {
  if (!state.storageAvailable) return;

  try {
    const all = Object.values(state.conversations);
    if (all.length > MAX_CONVERSATIONS) {
      all.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
      const keep = all.slice(0, MAX_CONVERSATIONS);
      state.conversations = {};
      keep.forEach(c => { state.conversations[c.id] = c; });
    }

    const payload = JSON.stringify(state.conversations);
    window.localStorage.setItem(STORAGE_KEY, payload);

    if (state.activeId && state.conversations[state.activeId]) {
      window.localStorage.setItem(ACTIVE_CONV_KEY, state.activeId);
    } else {
      window.localStorage.removeItem(ACTIVE_CONV_KEY);
    }

  } catch (err) {
    if (err.name === 'QuotaExceededError' || err.code === 22 || err.code === 1014) {
      console.warn('[Storage] Quota exceeded. Pruning older conversations.');
      pruneOldestConversations(5);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.conversations));
        showToast('Storage space low. Older conversations were trimmed.', 'warn');
      } catch (retryErr) {
        showToast('Local storage full. Current messages could not be saved to disk.', 'error');
      }
    } else {
      console.error('[Storage] Error saving conversations:', err);
    }
  }
}

function pruneOldestConversations(count = 3) {
  const sorted = Object.values(state.conversations).sort((a, b) => (a.updatedAt || 0) - (b.updatedAt || 0));
  for (let i = 0; i < Math.min(count, sorted.length); i++) {
    const toRemove = sorted[i];
    if (toRemove.id !== state.activeId) {
      delete state.conversations[toRemove.id];
    }
  }
}

/* ─────────────────────────────────────────────────────────────────
   MARKDOWN & CODE RENDERING
───────────────────────────────────────────────────────────────── */
function renderMarkdown(raw) {
  if (!raw) return '';

  const codeBlocks = [];
  let text = raw.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) => {
    const idx = codeBlocks.length;
    codeBlocks.push({ lang: lang || 'text', code: code.trimEnd() });
    return `\x00CODEBLOCK_${idx}\x00`;
  });

  // Escape HTML in the text body to prevent vanishing <tags> (e.g. <iostream>, <vector>, List<T>)
  text = text.replace(/&(?!amp;|lt;|gt;|quot;|#\d+;)/g, '&amp;')
             .replace(/</g, '&lt;')
             .replace(/>/g, '&gt;');

  // Headings
  text = text.replace(/^#{1,6}\s+(.+)$/gm, (_, content) => {
    const level = _.match(/^#+/)[0].length;
    return `<h${level}>${content.trim()}</h${level}>`;
  });

  // Bold and italic
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
  text = text.replace(/__(.+?)__/g, '<strong>$1</strong>');
  text = text.replace(/_(.+?)_/g, '<em>$1</em>');

  // Inline code
  text = text.replace(/`([^`]+)`/g, (_, code) => `<code>${code}</code>`);

  // Horizontal rule
  text = text.replace(/^(-{3,}|\*{3,}|_{3,})\s*$/gm, '<hr>');

  // Blockquote
  text = text.replace(/^&gt;(.*)$/gm, '<blockquote>$1</blockquote>');

  // Unordered lists
  text = text.replace(/((?:^[*\-+] .+\n?)+)/gm, (block) => {
    const items = block.trim().split('\n').map(l =>
      `<li>${l.replace(/^[*\-+]\s+/, '')}</li>`).join('');
    return `<ul>${items}</ul>`;
  });

  // Ordered lists
  text = text.replace(/((?:^\d+\. .+\n?)+)/gm, (block) => {
    const items = block.trim().split('\n').map(l =>
      `<li>${l.replace(/^\d+\.\s+/, '')}</li>`).join('');
    return `<ol>${items}</ol>`;
  });

  // Tables
  text = text.replace(/((?:^\|.+\|\n?)+)/gm, (block) => {
    const rows = block.trim().split('\n').filter(r => r.trim());
    if (rows.length < 2) return block;
    const isSep = r => /^\|[-| :]+\|$/.test(r.trim());
    const headerRow = rows[0];
    const sepIdx    = rows.findIndex(isSep);
    if (sepIdx < 0) return block;
    const bodyRows = rows.slice(sepIdx + 1);
    const cells = row => row.replace(/^\||\|$/g, '').split('|').map(c => c.trim());
    const thead = `<thead><tr>${cells(headerRow).map(c => `<th>${c}</th>`).join('')}</tr></thead>`;
    const tbody = bodyRows.map(r => `<tr>${cells(r).map(c => `<td>${c}</td>`).join('')}</tr>`).join('');
    return `<table>${thead}<tbody>${tbody}</tbody></table>`;
  });

  // Paragraphs
  text = text.split(/\n{2,}/).map(block => {
    block = block.trim();
    if (!block) return '';
    if (/^<(h[1-6]|ul|ol|li|blockquote|table|hr|pre)/.test(block) || block.startsWith('\x00CODEBLOCK')) return block;
    return `<p>${block.replace(/\n/g, ' ')}</p>`;
  }).join('\n');

  // Restore code blocks with styled wrappers and copy button
  text = text.replace(/\x00CODEBLOCK_(\d+)\x00/g, (_, idx) => {
    const { lang, code } = codeBlocks[parseInt(idx, 10)];
    const escaped = escapeHtml(code);
    const safeId  = generateId('code');
    return `<div class="code-block">
      <div class="code-block-header">
        <span class="code-lang">${escapeHtml(lang)}</span>
        <button class="code-copy-btn" data-code-id="${safeId}" aria-label="Copy code">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          Copy
        </button>
      </div>
      <pre><code id="${safeId}">${escaped}</code></pre>
    </div>`;
  });

  return text;
}

/* ─────────────────────────────────────────────────────────────────
   SIDEBAR & STUDY PANEL MOBILE DRAWER BEHAVIOUR
───────────────────────────────────────────────────────────────── */
function openSidebar() {
  closeStudyPanel();
  if (sidebar) {
    sidebar.classList.add('open', 'active');
  }
  if (sidebarOverlay) {
    sidebarOverlay.classList.add('visible', 'active');
  }
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  if (sidebar) {
    sidebar.classList.remove('open', 'active');
  }
  if (sidebarOverlay) {
    sidebarOverlay.classList.remove('visible', 'active');
  }
  document.body.style.overflow = '';
}

function openStudyPanel() {
  closeSidebar();
  if (studyPanel) {
    studyPanel.classList.add('open', 'active');
  }
  if (studyPanelOverlay) {
    studyPanelOverlay.classList.add('visible', 'active');
  }
}

function closeStudyPanel() {
  if (studyPanel) {
    studyPanel.classList.remove('open', 'active');
  }
  if (studyPanelOverlay) {
    studyPanelOverlay.classList.remove('visible', 'active');
  }
}

if (sidebarOpenBtn)  sidebarOpenBtn.addEventListener('click', openSidebar);
if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeSidebar);
if (sidebarOverlay)  sidebarOverlay.addEventListener('click', closeSidebar);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeSidebar();
    closeStudyPanel();
  }
});

/* ─────────────────────────────────────────────────────────────────
   CONVERSATION LIFECYCLE
───────────────────────────────────────────────────────────────── */
function createNewConversation(initialPrompt = '') {
  const id    = generateId('conv');
  const now   = Date.now();
  const title = initialPrompt ? generateTitleFromPrompt(initialPrompt) : 'New Conversation';

  const conv = {
    id:          id,
    title:       title,
    customTitle: false,
    createdAt:   now,
    updatedAt:   now,
    messages:    []
  };

  state.conversations[id] = conv;
  return conv;
}

function setTopbarTitle(title) {
  if (!topbarTitle) return;
  const safeTitle = (title && typeof title === 'string') ? title.trim() : 'StudyMate AI';
  topbarTitle.textContent = safeTitle;
  topbarTitle.title = safeTitle;
}

function activateConversation(id) {
  if (!id || !state.conversations[id]) {
    startNewChat();
    return;
  }

  state.activeId = id;
  state.editingId = null;

  saveStoredConversations();
  renderConvoList();
  renderMessages();

  setTopbarTitle(state.conversations[id].title);
  updateStudyPanel();
  closeSidebar();
  messageInput.focus();
}

function startNewChat() {
  // If active conversation has no messages and no custom title, reuse or discard it
  if (state.activeId && state.conversations[state.activeId]) {
    const curr = state.conversations[state.activeId];
    if ((!curr.messages || curr.messages.length === 0) && !curr.customTitle) {
      delete state.conversations[state.activeId];
    }
  }

  // Create a fresh conversation with a unique ID
  const conv = createNewConversation();
  state.activeId = conv.id;
  state.editingId = null;

  saveStoredConversations();
  showWelcomeScreen();
  renderConvoList();

  setTopbarTitle('StudyMate AI');
  updateStudyPanel();
  closeSidebar();
  messageInput.value = '';
  messageInput.style.height = 'auto';
  sendBtn.disabled = true;
  messageInput.focus();

  return conv;
}

function updateStudyPanel() {
  if (panelSessionTitle) {
    panelSessionTitle.textContent = state.activeId && state.conversations[state.activeId]
      ? state.conversations[state.activeId].title
      : 'New Study Session';
  }
  if (panelMsgCount) {
    const count = state.activeId && state.conversations[state.activeId]
      ? (state.conversations[state.activeId].messages || []).length
      : 0;
    panelMsgCount.textContent = count;
  }
  if (panelActiveModeBadge) {
    const modeNames = {
      standard: 'Academic',
      simple: 'Simple',
      step_by_step: 'Step-by-Step',
      exam_prep: 'Exam Prep',
      practice: 'Practice',
      code_focus: 'Code'
    };
    panelActiveModeBadge.textContent = modeNames[state.learningMode] || 'Academic';
  }
}

function renameConversation(id, newTitle) {
  const conv = state.conversations[id];
  if (!conv) return;

  const trimmed = (newTitle || '').trim();
  if (!trimmed) {
    showToast('Conversation title cannot be empty.', 'warn');
    state.editingId = null;
    renderConvoList();
    return;
  }

  conv.title = trimmed.slice(0, 50);
  conv.customTitle = true;
  conv.updatedAt = Date.now();
  state.editingId = null;

  saveStoredConversations();
  renderConvoList();

  if (state.activeId === id) {
    setTopbarTitle(conv.title);
  }

  showToast('Conversation renamed.', 'success');
}

function promptDeleteConversation(id) {
  const conv = state.conversations[id];
  if (!conv) return;

  state.pendingDeleteMode = 'single';
  state.pendingDeleteId = id;

  if (deleteModal && deleteModalDesc && deleteModalTitle) {
    deleteModalTitle.textContent = 'Delete Conversation?';
    deleteModalDesc.textContent = `Delete "${conv.title}"? This conversation and its messages will be permanently removed.`;
    if (deleteModalConfirm) deleteModalConfirm.textContent = 'Delete';
    deleteModal.removeAttribute('hidden');
  } else {
    if (confirm(`Delete "${conv.title}"? This cannot be undone.`)) {
      executeDeleteConversation(id);
    }
  }
}

function promptDeleteAllConversations() {
  const count = Object.keys(state.conversations).length;
  if (count === 0) {
    showToast('No conversations to delete.', 'info');
    return;
  }

  state.pendingDeleteMode = 'all';
  state.pendingDeleteId = null;

  if (deleteModal && deleteModalDesc && deleteModalTitle) {
    deleteModalTitle.textContent = 'Delete All Conversations?';
    deleteModalDesc.textContent = `Are you sure you want to permanently delete all ${count} conversation(s) and their message history from this browser? This action cannot be undone.`;
    if (deleteModalConfirm) deleteModalConfirm.textContent = 'Delete All';
    deleteModal.removeAttribute('hidden');
  } else {
    if (confirm(`Are you sure you want to permanently delete all ${count} conversation(s)? This action cannot be undone.`)) {
      executeDeleteAllConversations();
    }
  }
}

function executeDeleteConversation(id) {
  if (!id || !state.conversations[id]) return;

  const wasActive = state.activeId === id;
  delete state.conversations[id];

  if (wasActive) {
    // Keep active conversation consistent: switch to next most recent, or start fresh if none remain
    const remaining = Object.values(state.conversations).sort(
      (a, b) => (b.updatedAt || b.createdAt || 0) - (a.updatedAt || a.createdAt || 0)
    );
    if (remaining.length > 0) {
      activateConversation(remaining[0].id);
    } else {
      startNewChat();
    }
  } else {
    saveStoredConversations();
    renderConvoList();
  }

  showToast('Conversation deleted.', 'info');
}

function executeDeleteAllConversations() {
  state.conversations = {};
  state.activeId = null;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem(ACTIVE_CONV_KEY);
  } catch (e) {}

  startNewChat();
  showToast('All conversations deleted.', 'info');
}

/* ─────────────────────────────────────────────────────────────────
   SIDEBAR RENDERING
───────────────────────────────────────────────────────────────── */
/* ─────────────────────────────────────────────────────────────────
   SIDEBAR RENDERING WITH TODAY / YESTERDAY / EARLIER GROUPING
───────────────────────────────────────────────────────────────── */
function buildConvoItem(conv) {
  const item = document.createElement('div');
  const isActive = conv.id === state.activeId;
  const isEditing = conv.id === state.editingId;

  item.className = `convo-item ${isActive ? 'active' : ''}`;
  item.dataset.id = conv.id;

  if (isEditing) {
    item.innerHTML = `
      <span class="convo-item-icon" aria-hidden="true">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <path d="M12 20h9"></path>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
        </svg>
      </span>
      <form class="convo-rename-form" id="renameForm_${conv.id}">
        <input
          type="text"
          class="convo-rename-input"
          id="renameInput_${conv.id}"
          value="${escapeHtml(conv.title)}"
          maxlength="50"
          aria-label="Rename conversation"
        >
        <button type="submit" class="convo-rename-save" title="Save">✓</button>
        <button type="button" class="convo-rename-cancel" title="Cancel">✕</button>
      </form>
    `;

    const form = item.querySelector('.convo-rename-form');
    const input = item.querySelector('.convo-rename-input');
    const cancelBtn = item.querySelector('.convo-rename-cancel');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      renameConversation(conv.id, input.value);
    });

    cancelBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      state.editingId = null;
      renderConvoList();
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        state.editingId = null;
        renderConvoList();
      }
    });

    setTimeout(() => {
      input.focus();
      input.select();
    }, 30);

  } else {
    const relTime = formatRelativeTime(conv.updatedAt || conv.createdAt);

    item.innerHTML = `
      <span class="convo-item-icon" aria-hidden="true">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </span>
      <div class="convo-item-text">
        <span class="convo-item-title" title="${escapeHtml(conv.title)}">${escapeHtml(conv.title)}</span>
        <span class="convo-item-time">${escapeHtml(relTime)}</span>
      </div>
      <div class="convo-item-actions">
        <button class="convo-item-btn rename" data-action="rename" title="Rename conversation" aria-label="Rename conversation">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
        <button class="convo-item-btn delete" data-action="delete" title="Delete conversation" aria-label="Delete conversation">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>
    `;

    item.addEventListener('click', (e) => {
      const renameBtn = e.target.closest('[data-action="rename"]');
      if (renameBtn) {
        e.stopPropagation();
        state.editingId = conv.id;
        renderConvoList();
        return;
      }

      const deleteBtn = e.target.closest('[data-action="delete"]');
      if (deleteBtn) {
        e.stopPropagation();
        promptDeleteConversation(conv.id);
        return;
      }

      activateConversation(conv.id);
    });
  }

  return item;
}

function renderConvoList() {
  let list = Object.values(state.conversations);
  list.sort((a, b) => (b.updatedAt || b.createdAt || 0) - (a.updatedAt || a.createdAt || 0));

  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(conv => {
      const titleMatch = (conv.title || '').toLowerCase().includes(q);
      const msgMatch = (conv.messages || []).some(m => (m.content || '').toLowerCase().includes(q));
      return titleMatch || msgMatch;
    });
  }

  // Remove existing rendered conversation items and group headers
  Array.from(convoList.querySelectorAll('.convo-item, .convo-group-header')).forEach(el => el.remove());

  if (list.length === 0) {
    convoEmpty.textContent = state.searchQuery ? 'No matching conversations found.' : 'No conversations yet.\nStart your first session above!';
    convoEmpty.style.display = 'block';
    return;
  }

  convoEmpty.style.display = 'none';

  // Group conversations into Today, Yesterday, and Earlier
  const groups = [
    { name: 'Today', items: [] },
    { name: 'Yesterday', items: [] },
    { name: 'Earlier', items: [] }
  ];

  list.forEach(conv => {
    const groupName = getConversationGroup(conv.updatedAt || conv.createdAt);
    const grp = groups.find(g => g.name === groupName) || groups[2];
    grp.items.push(conv);
  });

  groups.forEach(group => {
    if (group.items.length === 0) return;

    const header = document.createElement('div');
    header.className = 'convo-group-header';
    header.textContent = group.name;
    convoList.insertBefore(header, convoEmpty);

    group.items.forEach(conv => {
      const item = buildConvoItem(conv);
      convoList.insertBefore(item, convoEmpty);
    });
  });
}

/* ─────────────────────────────────────────────────────────────────
   MESSAGE RENDERING
───────────────────────────────────────────────────────────────── */
function showWelcomeScreen() {
  if (welcomeScreen) {
    if (!messagesArea.contains(welcomeScreen)) {
      messagesArea.insertBefore(welcomeScreen, messagesArea.firstChild);
    }
    welcomeScreen.style.display = 'flex';
  }
  const inner = messagesArea.querySelector('.messages-inner');
  if (inner) {
    inner.style.display = 'none';
    inner.innerHTML = '';
  }
  const conv = state.activeId ? state.conversations[state.activeId] : null;
  setTopbarTitle(conv && conv.title ? conv.title : 'StudyMate AI');
}

function hideWelcomeScreen() {
  if (welcomeScreen) {
    welcomeScreen.style.display = 'none';
  }
  const inner = messagesArea.querySelector('.messages-inner');
  if (inner) {
    inner.style.display = 'flex';
  }
}

function renderMessages() {
  const conv = state.conversations[state.activeId];
  if (!conv || !conv.messages || !conv.messages.length) {
    showWelcomeScreen();
    return;
  }

  hideWelcomeScreen();

  let inner = messagesArea.querySelector('.messages-inner');
  if (!inner) {
    inner = document.createElement('div');
    inner.className = 'messages-inner';
    inner.id = 'messagesInner';
    messagesArea.appendChild(inner);
  }
  inner.style.display = 'flex';
  inner.innerHTML = '';

  conv.messages.forEach(msg => {
    inner.appendChild(buildMessageEl(msg));
  });

  scrollToBottom();
}

function generateFollowupChipsHtml(msg) {
  if (msg.role !== 'model' || msg.isError || msg.quizData) return '';

  const content = (msg.content || '').toLowerCase();
  let chips = [];

  if (content.includes('def ') || content.includes('function') || content.includes('class ') || content.includes('```')) {
    chips = [
      '💻 Show another code example',
      '⚡ What is the Big-O time and space complexity?',
      '🐛 What are common edge cases and bugs?',
      '🎯 Quiz me on this code'
    ];
  } else if (content.includes('formula') || content.includes('equation') || content.includes('theorem')) {
    chips = [
      '🪜 Show a step-by-step worked example',
      '💡 Explain the intuition in simple terms',
      '📋 Common exam questions on this',
      '❓ Practice problem'
    ];
  } else {
    chips = [
      '💡 Explain in simpler terms',
      '🔬 Give a real-world example',
      '🪜 Break down step-by-step',
      '🎯 Quick 2-question quiz on this'
    ];
  }

  const chipsHtml = chips.map(c => `
    <button type="button" class="followup-chip" data-chip-prompt="${escapeHtml(c)}">
      ${escapeHtml(c)}
    </button>
  `).join('');

  return `<div class="followup-chips" aria-label="Suggested follow-up questions">${chipsHtml}</div>`;
}

function buildMessageEl(msg) {
  const row = document.createElement('div');
  row.className = 'msg-row';
  row.dataset.msgId = msg.id;

  const isUser      = msg.role === 'user';
  const bubbleClass = isUser ? 'user-bubble' : (msg.isError ? 'ai-bubble error-bubble' : 'ai-bubble');
  const senderLabel = isUser ? 'You' : 'StudyMate AI';

  let contentHtml = '';
  if (isUser) {
    contentHtml = renderMarkdown(msg.content);
  } else if (msg.quizData) {
    contentHtml = renderQuizMessageHtml(msg);
  } else {
    contentHtml = renderMarkdown(msg.content);
  }

  const userActionsHtml = isUser ? `
    <div class="user-msg-actions">
      <button class="msg-action-btn edit-msg-btn" data-msg-id="${msg.id}" aria-label="Edit question" title="Edit question">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
        Edit
      </button>
      <button class="msg-action-btn copy-msg-btn" data-msg-id="${msg.id}" aria-label="Copy question" title="Copy text">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        Copy
      </button>
    </div>` : '';

  const aiActionsHtml = !isUser && !msg.quizData ? `
    <div class="msg-actions">
      <button class="msg-action-btn copy-msg-btn" data-msg-id="${msg.id}" aria-label="Copy response" title="Copy response">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        Copy
      </button>
      <button class="msg-action-btn bookmark-msg-btn" data-msg-id="${msg.id}" aria-label="Bookmark response" title="Save to bookmarks">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
        Save
      </button>
      <button class="msg-action-btn regen-msg-btn" data-msg-id="${msg.id}" aria-label="Regenerate response" title="Regenerate this answer">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
        </svg>
        Regenerate
      </button>
      <button class="msg-action-btn tts-msg-btn" data-msg-id="${msg.id}" aria-label="Read aloud" title="Read aloud (Voice)">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
        Read aloud
      </button>
    </div>` : '';

  row.innerHTML = `
    <div class="msg-meta">
      <div class="msg-avatar ${isUser ? 'user-avatar' : 'ai-avatar'}" aria-hidden="true">
        ${isUser ? 'You' : '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'}
      </div>
      <span class="msg-sender">${escapeHtml(senderLabel)}</span>
      <span class="msg-time">${msg.time || formatTime(msg.timestamp)}</span>
    </div>
    <div class="msg-bubble ${bubbleClass}">${contentHtml}</div>
    ${userActionsHtml}
    ${aiActionsHtml}
    ${generateFollowupChipsHtml(msg)}
  `;

  return row;
}

function renderQuizMessageHtml(msg) {
  const quiz = msg.quizData;
  if (!quiz || !Array.isArray(quiz.questions)) {
    return renderMarkdown(msg.content);
  }

  const {
    topic = 'Quiz',
    difficulty = 'medium',
    questions = [],
    userAnswers = {},
    evaluations = {},
    submitted = false,
    score = null
  } = quiz;

  const isSubmitted = Boolean(submitted);

  let scorePillHtml = '';
  if (isSubmitted && score && score.mcqCount > 0) {
    const pct = Math.round((score.correctCount / score.mcqCount) * 100);
    scorePillHtml = `<div class="quiz-score-pill">Score: <strong>${score.correctCount}/${score.mcqCount} (${pct}%)</strong></div>`;
  }

  let questionsHtml = '';
  questions.forEach((q, idx) => {
    const isMcq = q.type === 'mcq';
    let bodyHtml = '';

    if (isMcq) {
      const chosenIdx = userAnswers[q.id];
      const optionsHtml = (q.options || []).map((opt, optIdx) => {
        let classes = 'quiz-opt-btn';
        if (chosenIdx === optIdx) classes += ' selected';
        if (isSubmitted) {
          if (optIdx === q.correctIndex) {
            classes += ' correct-reveal';
          } else if (chosenIdx === optIdx && optIdx !== q.correctIndex) {
            classes += ' wrong-reveal';
          }
        }
        const disabled = isSubmitted ? 'disabled' : '';
        return `
          <button type="button" class="${classes}" data-msg-id="${msg.id}" data-qid="${q.id}" data-idx="${optIdx}" ${disabled}>
            <span class="opt-indicator">●</span>
            <span>${escapeHtml(opt)}</span>
          </button>
        `;
      }).join('');

      const explHtml = isSubmitted && q.explanation
        ? `<div class="quiz-explanation-box"><strong>Explanation:</strong> ${escapeHtml(q.explanation)}</div>`
        : '';

      bodyHtml = `
        <div class="quiz-options-list">${optionsHtml}</div>
        ${explHtml}
      `;
    } else {
      const studentAns = userAnswers[q.id] || '';
      const ev = evaluations[q.id];
      let evHtml = '';
      if (ev) {
        evHtml = `
          <div class="quiz-eval-result ${ev.status}">
            <strong>Score: ${ev.scorePercent}% (${ev.status.replace('_', ' ')})</strong><br>
            ${escapeHtml(ev.feedback)}
            ${q.sampleAnswer ? `<br><small style="margin-top:4px;display:block;opacity:0.85;"><strong>Model Answer:</strong> ${escapeHtml(q.sampleAnswer)}</small>` : ''}
          </div>
        `;
      }

      bodyHtml = `
        <div class="quiz-short-wrap">
          <textarea class="quiz-short-input" data-msg-id="${msg.id}" data-qid="${q.id}" rows="2" placeholder="Write your brief answer here...">${escapeHtml(studentAns)}</textarea>
          <button type="button" class="quiz-eval-btn" data-msg-id="${msg.id}" data-qid="${q.id}">
            Check Answer with AI
          </button>
          ${evHtml}
        </div>
      `;
    }

    questionsHtml += `
      <div class="quiz-q-card" data-qid="${q.id}">
        <div class="q-card-header">
          <span class="q-number">Question ${idx + 1}</span>
          <span class="q-type-pill">${isMcq ? 'Multiple Choice' : 'Short Answer'}</span>
        </div>
        <div class="q-text">${escapeHtml(q.question)}</div>
        ${bodyHtml}
      </div>
    `;
  });

  const mcqQuestions = questions.filter(q => q.type === 'mcq');
  const hasMcqs = mcqQuestions.length > 0;

  let footerHtml = '';
  if (hasMcqs && !isSubmitted) {
    footerHtml = `
      <div class="quiz-footer-actions">
        <button type="button" class="quiz-action-btn submit-quiz" data-msg-id="${msg.id}">
          Submit Quiz for Scoring
        </button>
      </div>
    `;
  } else if (hasMcqs && isSubmitted) {
    const pct = Math.round((score.correctCount / score.mcqCount) * 100);
    footerHtml = `
      <div class="quiz-footer-actions" style="margin-top:10px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.08);font-size:0.92rem;color:var(--accent-green);font-weight:600;">
        🎉 Quiz scored: ${score.correctCount} / ${score.mcqCount} (${pct}%) — Great practice!
      </div>
    `;
  }

  return `
    <div class="quiz-player-container in-chat-quiz" data-msg-id="${msg.id}">
      <div class="quiz-player-header">
        <div class="quiz-info">
          <span class="quiz-badge">${escapeHtml(topic)}</span>
          <span class="quiz-badge badge-sub">${escapeHtml(difficulty)}</span>
        </div>
        ${scorePillHtml}
      </div>
      <div class="quiz-questions-list">
        ${questionsHtml}
      </div>
      ${footerHtml}
    </div>
  `;
}

function ensureActiveConversation(suggestedTitle = 'Study Session') {
  let conv = state.conversations[state.activeId];
  if (!conv) {
    conv = createNewConversation(suggestedTitle);
    state.activeId = conv.id;
    topbarTitle.textContent = conv.title;
    hideWelcomeScreen();
    saveStoredConversations();
    renderConvoList();
  } else if (!conv.customTitle && conv.messages.length === 0) {
    conv.title = suggestedTitle.slice(0, 50);
    topbarTitle.textContent = conv.title;
    hideWelcomeScreen();
    saveStoredConversations();
    renderConvoList();
  }
  return conv.id;
}

function updateComposerButtons() {
  if (state.isStreaming || state.isWaiting) {
    if (stopBtn) stopBtn.removeAttribute('hidden');
    if (sendBtn) sendBtn.style.display = 'none';
  } else {
    if (stopBtn) stopBtn.setAttribute('hidden', '');
    if (sendBtn) {
      sendBtn.style.display = 'flex';
      sendBtn.disabled = messageInput.value.trim() === '';
    }
  }
}

function streamMessageToActive(msg, onComplete) {
  if (state.isStreaming) {
    appendMessageToActive(msg);
    if (onComplete) onComplete();
    return;
  }

  const conv = state.conversations[state.activeId];
  if (!conv) {
    if (onComplete) onComplete();
    return;
  }

  state.isStreaming = true;
  state.stopStreamingRequested = false;
  updateComposerButtons();

  conv.messages.push(msg);
  conv.updatedAt = Date.now();
  saveStoredConversations();
  renderConvoList();

  hideWelcomeScreen();

  let inner = messagesArea.querySelector('.messages-inner');
  if (!inner) {
    inner = document.createElement('div');
    inner.className = 'messages-inner';
    inner.id = 'messagesInner';
    messagesArea.appendChild(inner);
  }
  inner.style.display = 'flex';

  const row = buildMessageEl(msg);
  const bubble = row.querySelector('.msg-bubble');
  const fullContent = msg.content;

  // Temporarily replace content with typing cursor
  bubble.innerHTML = '<span class="streaming-cursor"></span>';
  inner.appendChild(row);
  scrollToBottom();

  const words = fullContent.split(/(\s+)/);
  let currentIndex = 0;
  let currentText = '';

  const interval = setInterval(() => {
    if (state.stopStreamingRequested || currentIndex >= words.length) {
      clearInterval(interval);
      state.isStreaming = false;
      state.stopStreamingRequested = false;
      updateComposerButtons();
      bubble.innerHTML = renderMarkdown(fullContent);
      scrollToBottom();
      if (onComplete) onComplete();
      return;
    }

    const chunk = words.slice(currentIndex, currentIndex + 3).join('');
    currentIndex += 3;
    currentText += chunk;

    bubble.innerHTML = renderMarkdown(currentText) + '<span class="streaming-cursor"></span>';
    scrollToBottom();
  }, 22);
}

function appendMessageToActive(msg) {
  appendMessageToConv(state.activeId, msg);
}

function appendMessageToConv(convId, msg) {
  const conv = state.conversations[convId];
  if (!conv) return;

  conv.messages.push(msg);
  conv.updatedAt = Date.now();

  if (state.activeId === convId) {
    hideWelcomeScreen();

    let inner = messagesArea.querySelector('.messages-inner');
    if (!inner) {
      inner = document.createElement('div');
      inner.className = 'messages-inner';
      inner.id = 'messagesInner';
      messagesArea.appendChild(inner);
    }
    inner.style.display = 'flex';

    inner.appendChild(buildMessageEl(msg));
    scrollToBottom();
  }

  saveStoredConversations();
  renderConvoList();
}

function scrollToBottom() {
  requestAnimationFrame(() => {
    messagesArea.scrollTop = messagesArea.scrollHeight;
  });
}

/* ─────────────────────────────────────────────────────────────────
   LOADING INDICATOR
───────────────────────────────────────────────────────────────── */
let loadingRow = null;

function showLoading() {
  removeLoading();
  loadingRow = document.createElement('div');
  loadingRow.className = 'loading-row';
  loadingRow.innerHTML = `
    <div class="loading-inner">
      <div class="msg-avatar ai-avatar" aria-hidden="true">AI</div>
      <div class="loading-dots" role="status" aria-label="AI is thinking">
        <span></span><span></span><span></span>
      </div>
    </div>`;

  let inner = messagesArea.querySelector('.messages-inner');
  if (!inner) {
    inner = document.createElement('div');
    inner.className = 'messages-inner';
    inner.id = 'messagesInner';
    messagesArea.appendChild(inner);
  }
  inner.style.display = 'flex';
  inner.appendChild(loadingRow);
  scrollToBottom();
}

function removeLoading() {
  if (loadingRow) {
    loadingRow.remove();
    loadingRow = null;
  }
}

/* ─────────────────────────────────────────────────────────────────
   COPY HELPERS
───────────────────────────────────────────────────────────────── */
async function copyToClipboard(text, btn, label) {
  try {
    await navigator.clipboard.writeText(text);
    const orig = btn.innerHTML;
    btn.classList.add('copied');
    btn.innerHTML = label;
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = orig;
    }, 2000);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    showToast('Copied to clipboard.', 'success');
  }
}

/* ─────────────────────────────────────────────────────────────────
   TEXT-TO-SPEECH (READ ALOUD)
───────────────────────────────────────────────────────────────── */
function speakText(text, btn) {
  if (!('speechSynthesis' in window)) {
    showToast('Text-to-speech is not supported in this browser.', 'warn');
    return;
  }

  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    document.querySelectorAll('.tts-msg-btn').forEach(b => {
      b.classList.remove('speaking');
      b.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg> Read aloud`;
    });
    if (state.currentSpeakingBtn === btn) {
      state.currentSpeakingBtn = null;
      return;
    }
  }

  const cleanText = text
    .replace(/```[\s\S]*?```/g, 'Code block omitted.')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/[#*_~>]/g, ' ')
    .trim();

  if (!cleanText) return;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = 1.0;
  utterance.pitch = 1.0;

  btn.classList.add('speaking');
  btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="6" y="6" width="12" height="12"></rect></svg> Stop`;
  state.currentSpeakingBtn = btn;

  utterance.onend = () => {
    btn.classList.remove('speaking');
    btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg> Read aloud`;
    state.currentSpeakingBtn = null;
  };

  utterance.onerror = () => {
    btn.classList.remove('speaking');
    btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg> Read aloud`;
    state.currentSpeakingBtn = null;
  };

  window.speechSynthesis.speak(utterance);
}

/* ─────────────────────────────────────────────────────────────────
   INLINE USER MESSAGE EDITING
───────────────────────────────────────────────────────────────── */
function startEditUserMessage(msgId) {
  const conv = state.conversations[state.activeId];
  const msg = conv?.messages.find(m => m.id === msgId);
  if (!msg) return;

  const row = document.querySelector(`.msg-row[data-msg-id="${msgId}"]`);
  if (!row) return;

  const bubble = row.querySelector('.msg-bubble');
  const origHtml = bubble.innerHTML;

  bubble.innerHTML = `
    <div class="user-edit-wrap">
      <textarea class="user-edit-textarea" id="editArea_${msgId}">${escapeHtml(msg.content)}</textarea>
      <div class="user-edit-controls">
        <button type="button" class="user-edit-btn cancel" id="cancelEdit_${msgId}">Cancel</button>
        <button type="button" class="user-edit-btn save" id="saveEdit_${msgId}">Save &amp; Submit</button>
      </div>
    </div>
  `;

  const ta = document.getElementById(`editArea_${msgId}`);
  const cancelBtn = document.getElementById(`cancelEdit_${msgId}`);
  const saveBtn = document.getElementById(`saveEdit_${msgId}`);

  ta.focus();
  ta.setSelectionRange(ta.value.length, ta.value.length);

  cancelBtn.addEventListener('click', () => {
    bubble.innerHTML = origHtml;
  });

  saveBtn.addEventListener('click', () => {
    const updated = ta.value.trim();
    if (!updated) return;
    submitMessage(updated);
  });
}

messagesArea.addEventListener('click', async (e) => {
  const copyMsgBtn = e.target.closest('.copy-msg-btn');
  if (copyMsgBtn) {
    const msgId = copyMsgBtn.dataset.msgId;
    const conv = state.conversations[state.activeId];
    const msg = conv?.messages.find(m => m.id === msgId);
    if (msg) {
      copyToClipboard(
        msg.content, copyMsgBtn,
        `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="20 6 9 17 4 12"/></svg> Copied!`
      );
    }
    return;
  }

  const bookmarkBtn = e.target.closest('.bookmark-msg-btn');
  if (bookmarkBtn) {
    const msgId = bookmarkBtn.dataset.msgId;
    bookmarkMessage(msgId);
    return;
  }

  const codeCopyBtn = e.target.closest('.code-copy-btn');
  if (codeCopyBtn) {
    const codeId = codeCopyBtn.dataset.codeId;
    const codeEl = document.getElementById(codeId);
    if (codeEl) {
      copyToClipboard(
        codeEl.textContent, codeCopyBtn,
        `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="20 6 9 17 4 12"/></svg> Copied!`
      );
    }
    return;
  }

  // Regenerate Response
  const regenBtn = e.target.closest('.regen-msg-btn');
  if (regenBtn) {
    const msgId = regenBtn.dataset.msgId;
    const conv = state.conversations[state.activeId];
    if (!conv || !conv.messages) return;
    const idx = conv.messages.findIndex(m => m.id === msgId);
    if (idx === -1) return;

    let userPrompt = '';
    for (let i = idx - 1; i >= 0; i--) {
      if (conv.messages[i].role === 'user') {
        userPrompt = conv.messages[i].content;
        break;
      }
    }

    if (userPrompt) {
      showToast('🔄 Regenerating response...', 'info');
      submitMessage(userPrompt);
    } else {
      showToast('No preceding question found to regenerate.', 'warn');
    }
    return;
  }

  // Read aloud (TTS)
  const ttsBtn = e.target.closest('.tts-msg-btn');
  if (ttsBtn) {
    const msgId = ttsBtn.dataset.msgId;
    const conv = state.conversations[state.activeId];
    const msg = conv?.messages.find(m => m.id === msgId);
    if (msg && msg.content) {
      speakText(msg.content, ttsBtn);
    }
    return;
  }

  // Edit user message
  const editBtn = e.target.closest('.edit-msg-btn');
  if (editBtn) {
    const msgId = editBtn.dataset.msgId;
    startEditUserMessage(msgId);
    return;
  }

  // Follow-up chip click
  const followChip = e.target.closest('.followup-chip');
  if (followChip) {
    const prompt = followChip.dataset.chipPrompt;
    if (prompt) submitMessage(prompt);
    return;
  }

  // Quiz MCQ option selection
  const optBtn = e.target.closest('.quiz-opt-btn');
  if (optBtn) {
    const msgId = optBtn.dataset.msgId;
    const qid = optBtn.dataset.qid;
    const optIdx = parseInt(optBtn.dataset.idx, 10);
    const conv = state.conversations[state.activeId];
    const msg = conv?.messages.find(m => m.id === msgId);
    if (msg && msg.quizData && !msg.quizData.submitted) {
      msg.quizData.userAnswers = msg.quizData.userAnswers || {};
      msg.quizData.userAnswers[qid] = optIdx;
      saveStoredConversations();
      const parentList = optBtn.closest('.quiz-options-list');
      if (parentList) {
        parentList.querySelectorAll('.quiz-opt-btn').forEach(b => b.classList.remove('selected'));
        optBtn.classList.add('selected');
      }
    }
    return;
  }

  // Quiz Submit for scoring
  const submitQuizBtn = e.target.closest('.submit-quiz');
  if (submitQuizBtn) {
    const msgId = submitQuizBtn.dataset.msgId;
    const conv = state.conversations[state.activeId];
    const msg = conv?.messages.find(m => m.id === msgId);
    if (msg && msg.quizData && !msg.quizData.submitted) {
      let correctCount = 0;
      let mcqCount = 0;
      const userAnswers = msg.quizData.userAnswers || {};

      msg.quizData.questions.forEach(q => {
        if (q.type === 'mcq') {
          mcqCount++;
          if (userAnswers[q.id] === q.correctIndex) {
            correctCount++;
          }
        }
      });

      msg.quizData.submitted = true;
      msg.quizData.score = { correctCount, mcqCount };
      saveStoredConversations();

      const msgRow = document.querySelector(`.msg-row[data-msg-id="${msgId}"]`);
      if (msgRow) {
        const bubble = msgRow.querySelector('.msg-bubble');
        if (bubble) bubble.innerHTML = renderQuizMessageHtml(msg);
      }
      showToast(`Quiz submitted! Score: ${correctCount}/${mcqCount}`, 'success');
    }
    return;
  }

  // Quiz Short-Answer Check with AI
  const evalBtn = e.target.closest('.quiz-eval-btn');
  if (evalBtn) {
    const msgId = evalBtn.dataset.msgId;
    const qid = evalBtn.dataset.qid;
    const conv = state.conversations[state.activeId];
    const msg = conv?.messages.find(m => m.id === msgId);
    if (msg && msg.quizData) {
      const q = msg.quizData.questions.find(item => item.id === qid);
      const wrap = evalBtn.closest('.quiz-short-wrap');
      const inputEl = wrap?.querySelector('.quiz-short-input');
      const studentAnswer = inputEl ? inputEl.value.trim() : '';

      if (!studentAnswer) {
        showToast('Please type an answer first.', 'warn');
        return;
      }

      evalBtn.disabled = true;
      evalBtn.textContent = 'Grading with AI…';

      try {
        const res = await fetch(`${TOOLS_API_URL}/quiz/evaluate`, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({
            question:      q.question,
            sampleAnswer:  q.sampleAnswer,
            keyPoints:     q.keyPoints,
            studentAnswer: studentAnswer
          })
        });

        const data = await res.json();
        if (res.ok && data.status === 'success' && data.evaluation) {
          msg.quizData.evaluations = msg.quizData.evaluations || {};
          msg.quizData.evaluations[qid] = data.evaluation;
          msg.quizData.userAnswers = msg.quizData.userAnswers || {};
          msg.quizData.userAnswers[qid] = studentAnswer;
          saveStoredConversations();

          const msgRow = document.querySelector(`.msg-row[data-msg-id="${msgId}"]`);
          if (msgRow) {
            const bubble = msgRow.querySelector('.msg-bubble');
            if (bubble) bubble.innerHTML = renderQuizMessageHtml(msg);
          }
          showToast('Answer evaluated by AI!', 'success');
        } else {
          showToast(data.message || 'Evaluation failed.', 'error');
        }
      } catch (err) {
        showToast(`Evaluation error: ${err.message}`, 'error');
      } finally {
        evalBtn.disabled = false;
        evalBtn.textContent = 'Check Answer with AI';
      }
    }
    return;
  }

  const chip = e.target.closest('.suggestion-chip');
  if (chip) {
    const prompt = chip.dataset.prompt;
    if (prompt) submitMessage(prompt);
  }
});

messagesArea.addEventListener('input', (e) => {
  const shortInput = e.target.closest('.quiz-short-input');
  if (shortInput) {
    const msgId = shortInput.dataset.msgId;
    const qid = shortInput.dataset.qid;
    const conv = state.conversations[state.activeId];
    const msg = conv?.messages.find(m => m.id === msgId);
    if (msg && msg.quizData) {
      msg.quizData.userAnswers = msg.quizData.userAnswers || {};
      msg.quizData.userAnswers[qid] = shortInput.value;
      saveStoredConversations();
    }
  }
});

/* ─────────────────────────────────────────────────────────────────
   TEXTAREA AUTO-RESIZE & KEY SHORTCUTS
───────────────────────────────────────────────────────────────── */
function autoResize() {
  messageInput.style.height = 'auto';
  const maxH = 180;
  messageInput.style.height = Math.min(messageInput.scrollHeight, maxH) + 'px';
}

messageInput.addEventListener('input', () => {
  autoResize();
  sendBtn.disabled = messageInput.value.trim() === '' || state.isWaiting;
});

messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    if (!sendBtn.disabled) chatForm.dispatchEvent(new Event('submit'));
  }
});

/* ─────────────────────────────────────────────────────────────────
   FORM SUBMIT & GEMINI API DISPATCH
───────────────────────────────────────────────────────────────── */
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = messageInput.value.trim();
  if (!text || state.isWaiting) return;
  submitMessage(text);
});

async function submitMessage(text) {
  if (state.isWaiting || state.isStreaming) return;
  if (!text || typeof text !== 'string' || !text.trim()) return;

  let promptText = text.trim();
  let requestedMode = state.learningMode;

  // Slash commands for ChatGPT-style quick study tools in main chat
  if (/^\/explain\s+/i.test(promptText)) {
    promptText = promptText.replace(/^\/explain\s+/i, '');
    requestedMode = 'simple';
  } else if (/^\/code\s+/i.test(promptText)) {
    promptText = promptText.replace(/^\/code\s+/i, '');
    requestedMode = 'code_focus';
  } else if (/^\/quiz\s+/i.test(promptText)) {
    promptText = promptText.replace(/^\/quiz\s+/i, '');
    requestedMode = 'practice';
  } else if (/^\/step\s+/i.test(promptText)) {
    promptText = promptText.replace(/^\/step\s+/i, '');
    requestedMode = 'step_by_step';
  }

  let conv = state.conversations[state.activeId];
  if (!conv) {
    conv = createNewConversation(promptText);
    state.activeId = conv.id;
    setTopbarTitle(conv.title);
  } else if (!conv.customTitle && conv.messages.length === 0) {
    conv.title = generateTitleFromPrompt(promptText);
    setTopbarTitle(conv.title);
  }

  messageInput.value = '';
  messageInput.style.height = 'auto';
  state.isWaiting = true;
  updateComposerButtons();

  const now = Date.now();
  const userMsg = {
    id:        generateId('msg'),
    role:      'user',
    content:   promptText,
    timestamp: now,
    time:      formatTime(now),
    isError:   false
  };
  appendMessageToActive(userMsg);

  // Send relevant prior messages from active conversation (capped to last 12 messages = 6 turns)
  const history = (conv.messages || [])
    .slice(0, -1)
    .filter(m => !m.isError && typeof m.content === 'string' && m.content.trim())
    .slice(-12)
    .map(m => ({ role: m.role === 'assistant' ? 'model' : m.role, content: m.content }));

  showLoading();

  try {
    const res = await fetch(API_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        message: promptText,
        history,
        mode: requestedMode
      })
    });

    const data = await res.json();
    removeLoading();
    state.isWaiting = false;

    if (res.ok && data.status === 'success' && data.reply) {
      streamMessageToActive({
        id:        generateId('msg'),
        role:      'model',
        content:   data.reply,
        timestamp: Date.now(),
        time:      formatTime(),
        isError:   false
      });
    } else {
      const errText = buildErrorMessage(res.status, data);
      appendMessageToActive({
        id:        generateId('msg'),
        role:      'model',
        content:   errText,
        timestamp: Date.now(),
        time:      formatTime(),
        isError:   true
      });
    }

  } catch (err) {
    removeLoading();
    state.isWaiting = false;
    appendMessageToActive({
      id:        generateId('msg'),
      role:      'model',
      content:   `**Network error:** Could not reach the server. Please verify that the Node.js server is running.\n\n\`${err.message}\``,
      timestamp: Date.now(),
      time:      formatTime(),
      isError:   true
    });
  } finally {
    state.isWaiting = false;
    updateComposerButtons();
    messageInput.focus();
  }
}

function buildErrorMessage(status, data) {
  const codeMessages = {
    API_KEY_NOT_CONFIGURED:
      '**Configuration required.** The server does not have a Gemini API key. ' +
      'Add `GEMINI_API_KEY` to your `.env` file and restart the server.',
    INVALID_API_KEY:
      '**Invalid API key.** The Gemini API key on the server is invalid or has expired. ' +
      'Update `GEMINI_API_KEY` in `.env` and restart the server.',
    RATE_LIMIT:
      '**Rate limit reached.** The AI service is temporarily throttled. Please wait a moment and try again.',
    RATE_LIMIT_EXCEEDED:
      '**Too many requests.** Please wait a moment before sending another message.',
    MODEL_UNAVAILABLE:
      '**AI model unavailable.** The Gemini model could not be reached. Please try again shortly.',
    SAFETY_BLOCK:
      '**Message blocked.** Your question was flagged by the AI safety filter. Please rephrase it.',
    EMPTY_RESPONSE:
      '**No response received.** The AI returned an empty answer. Please try rephrasing your question.',
    NETWORK_ERROR:
      '**Network error.** The server could not reach the Gemini API. Check the server\'s internet connection.',
    INVALID_MESSAGE:
      '**Invalid message.** Please enter a non-empty question.',
    MESSAGE_TOO_LONG:
      '**Message too long.** Please shorten your message and try again.',
  };

  if (data?.code && codeMessages[data.code]) {
    return codeMessages[data.code];
  }

  const safeMsg = data?.message && typeof data.message === 'string'
    ? data.message
    : 'An unexpected error occurred.';
  return `**Error ${status}:** ${safeMsg}`;
}

/* ─────────────────────────────────────────────────────────────────
   STUDY MODES AND LEARNING PREFERENCES
───────────────────────────────────────────────────────────────── */
const MODE_DESCRIPTIONS = {
  standard:     'Standard Academic (Balanced collegiate assistant)',
  simple:       'Simple Explanation (Intuitive analogies & plain language)',
  step_by_step: 'Step-by-Step Learning (Sequential stage-by-stage progression)',
  exam_prep:    'Exam Preparation (Definitions, formulas & high-yield traps)',
  practice:     'Practice Questions (Includes follow-up check questions)',
  code_focus:   'Programming Focus (Emphasizes syntax, code examples & best practices)'
};

function initStudyModes() {
  const savedMode = window.localStorage.getItem(LEARNING_MODE_KEY);
  if (savedMode && MODE_DESCRIPTIONS[savedMode]) {
    state.learningMode = savedMode;
  }

  if (studyModeSelect) {
    studyModeSelect.value = state.learningMode;
    updateComposerHint();

    studyModeSelect.addEventListener('change', () => {
      state.learningMode = studyModeSelect.value;
      if (state.storageAvailable) {
        window.localStorage.setItem(LEARNING_MODE_KEY, state.learningMode);
      }
      updateComposerHint();
      showToast(`Mode switched to: ${MODE_DESCRIPTIONS[state.learningMode]}`, 'info');
    });
  }
}

function updateComposerHint() {
  if (!composerHint) return;
  const modeLabel = studyModeSelect?.options[studyModeSelect.selectedIndex]?.text || 'Standard';
  composerHint.innerHTML = `Active mode: <strong>${escapeHtml(modeLabel)}</strong>. AI Study Assistant can make mistakes.`;
}

/* ─────────────────────────────────────────────────────────────────
   STUDY TOOLS MODAL & NAVIGATION
───────────────────────────────────────────────────────────────── */
function openToolsModal(tabId = 'explain') {
  if (!toolsModal) return;
  closeSidebar();
  closeStudyPanel();
  toolsModal.removeAttribute('hidden');
  switchToolTab(tabId);
}

function closeToolsModal() {
  if (!toolsModal) return;
  toolsModal.setAttribute('hidden', '');
}

function switchToolTab(tabId) {
  toolTabs.forEach(tab => {
    const isActive = tab.dataset.tab === tabId;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  toolPanes.forEach(pane => {
    const isActive = pane.id === `pane${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`;
    pane.classList.toggle('active', isActive);
    if (isActive) pane.removeAttribute('hidden');
    else pane.setAttribute('hidden', '');
  });
}

// Global modal triggers
if (openToolsBtn) {
  openToolsBtn.addEventListener('click', () => openToolsModal('explain'));
}
if (closeToolsModalBtn) {
  closeToolsModalBtn.addEventListener('click', closeToolsModal);
}
if (toolsModal) {
  toolsModal.addEventListener('click', (e) => {
    if (e.target === toolsModal) closeToolsModal();
  });
}

// Delegated tool buttons (sidebar & welcome screen cards)
document.addEventListener('click', (e) => {
  const toolBtn = e.target.closest('[data-tool]');
  if (toolBtn) {
    const tool = toolBtn.dataset.tool;
    if (tool === 'document') {
      openDocStudio('upload');
      return;
    }
    if (tool) {
      openToolsModal(tool);
    }
  }
});

toolTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const tabId = tab.dataset.tab;
    if (tabId) switchToolTab(tabId);
  });
});

/* ─────────────────────────────────────────────────────────────────
   EXPORT STUDY TOOL OUTPUT TO CURRENT CONVERSATION
───────────────────────────────────────────────────────────────── */
/* ─────────────────────────────────────────────────────────────────
   STUDY TOOL SUBMIT HANDLERS — RESULTS IN MAIN CHAT
───────────────────────────────────────────────────────────────── */

// ── TOOL 1: CONCEPT EXPLAINER HANDLER ────────────────────────────
if (explainForm) {
  const topicInput    = document.getElementById('explainTopic');
  const levelSelect   = document.getElementById('explainLevel');
  const styleSelect   = document.getElementById('explainStyle');
  const examplesCheck = document.getElementById('explainExamples');

  explainForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const topic = topicInput.value.trim();
    if (!topic || topic.length < 2) {
      showToast('Please enter a concept or topic name (at least 2 characters).', 'warn');
      return;
    }

    const level = levelSelect.value;
    const style = styleSelect.value;
    const includeExamples = examplesCheck.checked;
    const levelLabel = levelSelect.options[levelSelect.selectedIndex].text;
    const styleLabel = styleSelect.options[styleSelect.selectedIndex].text;

    const convId = ensureActiveConversation(`Explain: ${topic}`);
    closeToolsModal();

    const userPromptText = `💡 **Concept Explainer Request**: **${topic}**\n- **Student Level**: ${levelLabel}\n- **Explanation Style**: ${styleLabel}\n- **Include Examples**: ${includeExamples ? 'Yes' : 'No'}`;

    const now = Date.now();
    appendMessageToConv(convId, {
      id:        generateId('msg'),
      role:      'user',
      content:   userPromptText,
      timestamp: now,
      time:      formatTime(now),
      isError:   false
    });

    if (state.activeId === convId) {
      state.isWaiting = true;
      showLoading();
    }

    try {
      const res = await fetch(`${TOOLS_API_URL}/explain`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          topic,
          level,
          style,
          includeExamples
        })
      });

      const data = await res.json();
      if (state.activeId === convId) {
        removeLoading();
        state.isWaiting = false;
      }

      if (res.ok && data.status === 'success' && data.explanation) {
        const arrival = Date.now();
        const aiMsg = {
          id:        generateId('msg'),
          role:      'model',
          content:   data.explanation,
          timestamp: arrival,
          time:      formatTime(arrival),
          isError:   false
        };
        if (state.activeId === convId) {
          streamMessageToActive(aiMsg);
        } else {
          appendMessageToConv(convId, aiMsg);
        }
        showToast('💡 Concept explanation delivered in chat!', 'success');
      } else {
        const arrival = Date.now();
        appendMessageToConv(convId, {
          id:        generateId('msg'),
          role:      'model',
          content:   `**Concept Explainer Error:** ${escapeHtml(data.message || 'Failed to explain concept. Please try again.')}`,
          timestamp: arrival,
          time:      formatTime(arrival),
          isError:   true
        });
        showToast(data.message || 'Failed to generate explanation.', 'error');
      }
    } catch (err) {
      if (state.activeId === convId) {
        removeLoading();
        state.isWaiting = false;
        updateComposerButtons();
      }
      const arrival = Date.now();
      appendMessageToConv(convId, {
        id:        generateId('msg'),
        role:      'model',
        content:   `**Network Error:** Could not reach the server for Concept Explainer.\n\n\`${err.message}\``,
        timestamp: arrival,
        time:      formatTime(arrival),
        isError:   true
      });
      showToast(`Network error: ${err.message}`, 'error');
    }
  });
}

// ── TOOL 2: PROGRAMMING ASSISTANT HANDLER ────────────────────────
if (programmingForm) {
  const langSelect  = document.getElementById('progLanguage');
  const modeSelect  = document.getElementById('progMode');
  const descInput   = document.getElementById('progDescription');
  const codeInput   = document.getElementById('progCode');

  programmingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const description = descInput.value.trim();
    if (!description || description.length < 3) {
      showToast('Please describe your programming question, task, or bug (at least 3 characters).', 'warn');
      return;
    }

    const language = langSelect.value;
    const mode = modeSelect.value;
    const modeLabel = modeSelect.options[modeSelect.selectedIndex].text;
    const codeSnippet = codeInput.value.trim();

    const convId = ensureActiveConversation(`Code: ${language} - ${modeLabel}`);
    closeToolsModal();

    let userPromptText = `💻 **Programming Help Request** (${language} — ${modeLabel})\n\n${description}`;
    if (codeSnippet) {
      userPromptText += `\n\n\`\`\`${language.toLowerCase()}\n${codeSnippet}\n\`\`\``;
    }

    const now = Date.now();
    appendMessageToConv(convId, {
      id:        generateId('msg'),
      role:      'user',
      content:   userPromptText,
      timestamp: now,
      time:      formatTime(now),
      isError:   false
    });

    if (state.activeId === convId) {
      state.isWaiting = true;
      updateComposerButtons();
      showLoading();
    }

    try {
      const res = await fetch(`${TOOLS_API_URL}/programming`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          language,
          mode,
          description,
          codeSnippet
        })
      });

      const data = await res.json();
      if (state.activeId === convId) {
        removeLoading();
        state.isWaiting = false;
        updateComposerButtons();
      }

      if (res.ok && data.status === 'success' && data.result) {
        const arrival = Date.now();
        const aiMsg = {
          id:        generateId('msg'),
          role:      'model',
          content:   data.result,
          timestamp: arrival,
          time:      formatTime(arrival),
          isError:   false
        };
        if (state.activeId === convId) {
          streamMessageToActive(aiMsg);
        } else {
          appendMessageToConv(convId, aiMsg);
        }
        showToast('💻 Code solution delivered in chat!', 'success');
      } else {
        const arrival = Date.now();
        appendMessageToConv(convId, {
          id:        generateId('msg'),
          role:      'model',
          content:   `**Programming Assistant Error:** ${escapeHtml(data.message || 'Programming analysis failed. Please try again.')}`,
          timestamp: arrival,
          time:      formatTime(arrival),
          isError:   true
        });
        showToast(data.message || 'Programming analysis failed.', 'error');
      }
    } catch (err) {
      if (state.activeId === convId) {
        removeLoading();
        state.isWaiting = false;
      }
      const arrival = Date.now();
      appendMessageToConv(convId, {
        id:        generateId('msg'),
        role:      'model',
        content:   `**Network Error:** Could not reach the server for Programming Assistant.\n\n\`${err.message}\``,
        timestamp: arrival,
        time:      formatTime(arrival),
        isError:   true
      });
      showToast(`Network error: ${err.message}`, 'error');
    }
  });
}

// ── TOOL 3: NOTES SUMMARIZER HANDLER ────────────────────────────
if (summarizeForm) {
  const styleSelect  = document.getElementById('summarizeStyle');
  const lengthSelect = document.getElementById('summarizeLength');

  if (summarizeNotes && notesCharCounter) {
    summarizeNotes.addEventListener('input', () => {
      const len = summarizeNotes.value.length;
      notesCharCounter.textContent = `${len.toLocaleString()} / 15,000`;
      if (len > 15000) {
        notesCharCounter.style.color = 'var(--accent-red)';
      } else {
        notesCharCounter.style.color = 'var(--text-dim)';
      }
    });
  }

  summarizeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const notes = summarizeNotes.value.trim();
    if (!notes || notes.length < 10) {
      showToast('Please paste notes containing at least 10 characters.', 'warn');
      return;
    }
    if (notes.length > 15000) {
      showToast('Supplied notes exceed 15,000 characters. Please split into smaller sections.', 'error');
      return;
    }

    const style = styleSelect.value;
    const length = lengthSelect.value;
    const styleLabel = styleSelect.options[styleSelect.selectedIndex].text;
    const lengthLabel = lengthSelect.options[lengthSelect.selectedIndex].text;

    const convId = ensureActiveConversation('Notes Summary');
    closeToolsModal();

    const snippet = notes.slice(0, 160).trim().replace(/\s+/g, ' ');
    const userPromptText = `📝 **Notes Summarizer Request** (${notes.length.toLocaleString()} characters)\n- **Style**: ${styleLabel}\n- **Length**: ${lengthLabel}\n\n> *Notes Excerpt:* "${escapeHtml(snippet)}${notes.length > 160 ? '…' : ''}"`;

    const now = Date.now();
    appendMessageToConv(convId, {
      id:        generateId('msg'),
      role:      'user',
      content:   userPromptText,
      timestamp: now,
      time:      formatTime(now),
      isError:   false
    });

    if (state.activeId === convId) {
      state.isWaiting = true;
      showLoading();
    }

    try {
      const res = await fetch(`${TOOLS_API_URL}/summarize`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          notes,
          style,
          length
        })
      });

      const data = await res.json();
      if (state.activeId === convId) {
        removeLoading();
        state.isWaiting = false;
        updateComposerButtons();
      }

      if (res.ok && data.status === 'success' && data.summary) {
        const arrival = Date.now();
        const aiMsg = {
          id:        generateId('msg'),
          role:      'model',
          content:   data.summary,
          timestamp: arrival,
          time:      formatTime(arrival),
          isError:   false
        };
        if (state.activeId === convId) {
          streamMessageToActive(aiMsg);
        } else {
          appendMessageToConv(convId, aiMsg);
        }
        showToast('📝 Revision summary delivered in chat!', 'success');
      } else {
        const arrival = Date.now();
        appendMessageToConv(convId, {
          id:        generateId('msg'),
          role:      'model',
          content:   `**Notes Summarizer Error:** ${escapeHtml(data.message || 'Summarization failed. Please try again.')}`,
          timestamp: arrival,
          time:      formatTime(arrival),
          isError:   true
        });
        showToast(data.message || 'Summarization failed.', 'error');
      }
    } catch (err) {
      if (state.activeId === convId) {
        removeLoading();
        state.isWaiting = false;
        updateComposerButtons();
      }
      const arrival = Date.now();
      appendMessageToConv(convId, {
        id:        generateId('msg'),
        role:      'model',
        content:   `**Network Error:** Could not reach the server for Notes Summarizer.\n\n\`${err.message}\``,
        timestamp: arrival,
        time:      formatTime(arrival),
        isError:   true
      });
      showToast(`Network error: ${err.message}`, 'error');
    }
  });
}

// ── TOOL 4: AI QUIZ GENERATOR HANDLER ────────────────────────────
if (quizForm) {
  const topicInput  = document.getElementById('quizTopic');
  const diffSelect  = document.getElementById('quizDifficulty');
  const countSelect = document.getElementById('quizCount');
  const typeSelect  = document.getElementById('quizType');

  quizForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const topic = topicInput.value.trim();
    if (!topic || topic.length < 2) {
      showToast('Please enter a valid topic for quiz generation (at least 2 characters).', 'warn');
      return;
    }

    const difficulty = diffSelect.value;
    const questionCount = countSelect.value;
    const questionType = typeSelect.value;
    const diffLabel = diffSelect.options[diffSelect.selectedIndex].text;
    const countLabel = countSelect.options[countSelect.selectedIndex].text;
    const typeLabel = typeSelect.options[typeSelect.selectedIndex].text;

    const convId = ensureActiveConversation(`Quiz: ${topic}`);
    closeToolsModal();

    const userPromptText = `🎯 **AI Quiz Request**: **${topic}**\n- **Difficulty**: ${diffLabel}\n- **Questions**: ${countLabel}\n- **Format**: ${typeLabel}`;

    const now = Date.now();
    appendMessageToConv(convId, {
      id:        generateId('msg'),
      role:      'user',
      content:   userPromptText,
      timestamp: now,
      time:      formatTime(now),
      isError:   false
    });

    if (state.activeId === convId) {
      state.isWaiting = true;
      showLoading();
    }

    try {
      const res = await fetch(`${TOOLS_API_URL}/quiz`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          topic,
          difficulty,
          questionCount,
          questionType
        })
      });

      const data = await res.json();
      if (state.activeId === convId) {
        removeLoading();
        state.isWaiting = false;
      }

      if (res.ok && data.status === 'success' && Array.isArray(data.questions)) {
        const arrival = Date.now();
        appendMessageToConv(convId, {
          id:        generateId('msg'),
          role:      'model',
          content:   `Generated AI Quiz on **${data.topic}** (${data.difficulty.toUpperCase()} difficulty). Test your knowledge below:`,
          quizData: {
            topic:       data.topic,
            difficulty:  data.difficulty,
            questions:   data.questions,
            userAnswers: {},
            evaluations: {},
            submitted:   false,
            score:       null
          },
          timestamp: arrival,
          time:      formatTime(arrival),
          isError:   false
        });
      } else {
        const arrival = Date.now();
        appendMessageToConv(convId, {
          id:        generateId('msg'),
          role:      'model',
          content:   `**AI Quiz Generator Error:** ${escapeHtml(data.message || 'Failed to generate quiz. Please try again.')}`,
          timestamp: arrival,
          time:      formatTime(arrival),
          isError:   true
        });
        showToast(data.message || 'Failed to generate quiz.', 'error');
      }
    } catch (err) {
      if (state.activeId === convId) {
        removeLoading();
        state.isWaiting = false;
      }
      const arrival = Date.now();
      appendMessageToConv(convId, {
        id:        generateId('msg'),
        role:      'model',
        content:   `**Network Error:** Could not reach the server for AI Quiz Generator.\n\n\`${err.message}\``,
        timestamp: arrival,
        time:      formatTime(arrival),
        isError:   true
      });
      showToast(`Network error: ${err.message}`, 'error');
    }
  });
}

/* ─────────────────────────────────────────────────────────────────
   ACTIONS (CLEAR CHAT, NEW CHAT, DELETE MODAL)
───────────────────────────────────────────────────────────────── */
if (clearChatBtn) {
  clearChatBtn.addEventListener('click', () => {
    const conv = state.conversations[state.activeId];
    if (!conv || !conv.messages.length) return;

    if (!confirm('Clear all messages in this conversation? This cannot be undone.')) return;

    conv.messages = [];
    conv.updatedAt = Date.now();
    saveStoredConversations();
    showWelcomeScreen();
    renderConvoList();
    showToast('Conversation cleared.', 'info');
  });
}

if (newChatBtn) {
  newChatBtn.addEventListener('click', startNewChat);
}

if (deleteModalCancel) {
  deleteModalCancel.addEventListener('click', () => {
    if (deleteModal) deleteModal.setAttribute('hidden', '');
    state.pendingDeleteId = null;
    state.pendingDeleteMode = null;
    if (deleteModalTitle) deleteModalTitle.textContent = 'Delete Conversation?';
    if (deleteModalConfirm) deleteModalConfirm.textContent = 'Delete';
  });
}

if (deleteModalConfirm) {
  deleteModalConfirm.addEventListener('click', () => {
    if (state.pendingDeleteMode === 'all') {
      executeDeleteAllConversations();
    } else if (state.pendingDeleteId) {
      executeDeleteConversation(state.pendingDeleteId);
    }
    state.pendingDeleteId = null;
    state.pendingDeleteMode = null;
    if (deleteModal) deleteModal.setAttribute('hidden', '');
    if (deleteModalTitle) deleteModalTitle.textContent = 'Delete Conversation?';
    if (deleteModalConfirm) deleteModalConfirm.textContent = 'Delete';
  });
}

if (sidebarClearAllBtn) {
  sidebarClearAllBtn.addEventListener('click', () => {
    promptDeleteAllConversations();
  });
}

if (stopBtn) {
  stopBtn.addEventListener('click', () => {
    state.stopStreamingRequested = true;
    state.isWaiting = false;
    removeLoading();
    updateComposerButtons();
    showToast('Generation stopped.', 'info');
  });
}

/* ─────────────────────────────────────────────────────────────────
   CHATGPT-STYLE INTERACTIVE QUICK TOOLS & VOICE INPUT
───────────────────────────────────────────────────────────────── */
function initQuickToolsBar() {
  if (!quickToolsBar) return;

  quickToolsBar.addEventListener('click', (e) => {
    const pill = e.target.closest('.quick-pill');
    if (!pill) return;

    const action = pill.dataset.quick;
    if (action === 'document') {
      openDocStudio('upload');
    } else if (action === 'explain') {
      messageInput.value = 'Explain the concept of ';
      messageInput.focus();
      autoResize();
      sendBtn.disabled = false;
      showToast('Type the concept you want explained and hit Enter!', 'info');
    } else if (action === 'code') {
      if (studyModeSelect) {
        studyModeSelect.value = 'code_focus';
        studyModeSelect.dispatchEvent(new Event('change'));
      }
      messageInput.value = 'Write a working solution with code for: ';
      messageInput.focus();
      autoResize();
      sendBtn.disabled = false;
      showToast('Programming Mode active! Ask for code or bug fixes.', 'info');
    } else if (action === 'summarize') {
      openToolsModal('summarize');
    } else if (action === 'quiz') {
      openToolsModal('quiz');
    } else if (action === 'step') {
      if (studyModeSelect) {
        studyModeSelect.value = 'step_by_step';
        studyModeSelect.dispatchEvent(new Event('change'));
      }
      messageInput.focus();
      showToast('Step-by-Step Learning Mode active!', 'info');
    }
  });
}

function initVoiceInput() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    if (micBtn) {
      micBtn.addEventListener('click', () => {
        showToast('Speech dictation is supported in Chrome, Edge, and Safari.', 'info');
      });
    }
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onstart = () => {
    state.isListening = true;
    micBtn.classList.add('listening');
    micBtn.setAttribute('title', 'Listening… Speak your question now');
    showToast('🎙️ Listening... speak your question now', 'info');
  };

  recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      transcript += event.results[i][0].transcript;
    }
    messageInput.value = transcript;
    autoResize();
    sendBtn.disabled = messageInput.value.trim() === '';
  };

  recognition.onerror = (event) => {
    console.warn('[Speech]', event.error);
    state.isListening = false;
    micBtn.classList.remove('listening');
    micBtn.setAttribute('title', 'Voice dictation (Speak your question)');
  };

  recognition.onend = () => {
    state.isListening = false;
    micBtn.classList.remove('listening');
    micBtn.setAttribute('title', 'Voice dictation (Speak your question)');
  };

  micBtn.addEventListener('click', () => {
    if (state.isListening) {
      recognition.stop();
    } else {
      try {
        recognition.start();
      } catch (e) {
        recognition.stop();
      }
    }
  });
}

/* ─────────────────────────────────────────────────────────────────
   BOOKMARKS & SAVED ITEMS
───────────────────────────────────────────────────────────────── */
function loadBookmarks() {
  try {
    const raw = window.localStorage.getItem(SAVED_ITEMS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveBookmarks(items) {
  try {
    window.localStorage.setItem(SAVED_ITEMS_KEY, JSON.stringify(items));
  } catch (e) {}
}

function bookmarkMessage(msgId) {
  const conv = state.conversations[state.activeId];
  const msg = conv?.messages.find(m => m.id === msgId);
  if (!msg || !msg.content) return;

  const bookmarks = loadBookmarks();
  if (bookmarks.some(b => b.id === msgId)) {
    showToast('This response is already in your Saved Items.', 'info');
    return;
  }

  bookmarks.unshift({
    id: msgId,
    content: msg.content.slice(0, 360) + (msg.content.length > 360 ? '…' : ''),
    fullContent: msg.content,
    timestamp: Date.now(),
    convTitle: conv.title || 'Study Session'
  });

  saveBookmarks(bookmarks);
  showToast('🔖 Saved to your StudyMate bookmarks!', 'success');
}

function renderSavedItems() {
  if (!savedItemsList) return;
  const items = loadBookmarks();
  if (items.length === 0) {
    savedItemsList.innerHTML = `
      <p class="convo-empty">No bookmarked messages yet.<br>Click the bookmark icon on any AI response to save key explanations here!</p>
    `;
    return;
  }

  savedItemsList.innerHTML = items.map((item, idx) => `
    <div class="saved-item-card" data-idx="${idx}" style="padding:0.75rem 1rem; border:1px solid var(--border-subtle); border-radius:var(--radius-md); margin-bottom:0.75rem; background:var(--bg-surface-subtle); box-shadow:var(--shadow-xs);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
        <span style="font-size:0.78rem; font-weight:700; color:var(--primary);">${escapeHtml(item.convTitle)}</span>
        <button type="button" class="btn-delete-saved" data-id="${item.id}" style="color:#ef4444; font-size:0.8rem; padding:0.2rem 0.4rem; border-radius:4px; cursor:pointer;" title="Remove bookmark">✕</button>
      </div>
      <p style="font-size:0.84rem; color:var(--text-secondary); line-height:1.45; margin-bottom:0.6rem;">${escapeHtml(item.content)}</p>
      <div style="display:flex; justify-content:flex-end;">
        <button type="button" class="btn-copy-saved" data-idx="${idx}" style="font-size:0.76rem; font-weight:600; color:var(--primary); padding:0.25rem 0.65rem; background:var(--bg-light-blue); border-radius:var(--radius-sm); border:1px solid var(--border-indigo); cursor:pointer;">Copy Full Response</button>
      </div>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────────────────────────────
   STUDY PANEL & ADDITIONAL FEATURE MODALS
───────────────────────────────────────────────────────────────── */
function initStudyPanelAndModals() {
  // Mobile / Tablet Drawer toggling
  if (studyPanelToggleBtn) {
    studyPanelToggleBtn.addEventListener('click', () => {
      if (studyPanel && (studyPanel.classList.contains('active') || studyPanel.classList.contains('open'))) {
        closeStudyPanel();
      } else {
        openStudyPanel();
      }
    });
  }

  if (studyPanelCloseBtn) {
    studyPanelCloseBtn.addEventListener('click', closeStudyPanel);
  }

  if (studyPanelOverlay) {
    studyPanelOverlay.addEventListener('click', closeStudyPanel);
  }

  // Recommended Action Tiles in Study Panel
  document.querySelectorAll('.action-tile').forEach(tile => {
    tile.addEventListener('click', () => {
      const action = tile.dataset.action;
      if (action === 'explain-topic' || action === 'explain-dsa') {
        openToolsModal('explain');
      } else if (action === 'upload-document') {
        openDocStudio('upload');
      } else if (action === 'generate-notes') {
        openToolsModal('summarize');
      } else if (action === 'solve-problem' || action === 'debug-code') {
        openToolsModal('programming');
      } else if (action === 'create-quiz' || action === 'quick-quiz') {
        openToolsModal('quiz');
      } else if (action === 'summarize-text' || action === 'summarize-notes') {
        openToolsModal('summarize');
      }
      closeStudyPanel();
    });
  });

  // Subject Tags in Study Panel
  document.querySelectorAll('.subject-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      const topic = tag.dataset.topic;
      if (topic) {
        messageInput.value = `Teach me about ${topic}. Explain the core intuition, high-yield principles, and provide a concrete practical example.`;
        messageInput.focus();
        autoResize();
        sendBtn.disabled = false;
        showToast(`Loaded topic "${topic}" into chat!`, 'info');
      }
      closeStudyPanel();
    });
  });

  // Quick Notepad in Study Panel
  if (quickNotepad) {
    try {
      const savedNote = window.localStorage.getItem(QUICK_NOTES_KEY);
      if (savedNote) quickNotepad.value = savedNote;
    } catch (e) {}

    quickNotepad.addEventListener('input', () => {
      try {
        window.localStorage.setItem(QUICK_NOTES_KEY, quickNotepad.value);
        if (notepadStatus) {
          notepadStatus.textContent = 'Saving...';
          setTimeout(() => { if (notepadStatus) notepadStatus.textContent = 'Saved locally'; }, 600);
        }
      } catch (e) {}
    });
  }

  // Navigation Links
  if (navSubjectNotes) {
    navSubjectNotes.addEventListener('click', () => {
      closeSidebar();
      openDocStudio('notes');
    });
  }

  if (navPracticeQuiz) {
    navPracticeQuiz.addEventListener('click', () => {
      closeSidebar();
      openToolsModal('quiz');
    });
  }

  if (sidebarAllToolsLink) {
    sidebarAllToolsLink.addEventListener('click', () => {
      closeSidebar();
      openToolsModal('explain');
    });
  }

  // Study Planner Modal
  if (navStudyPlanner && plannerModal) {
    navStudyPlanner.addEventListener('click', () => {
      closeSidebar();
      plannerModal.removeAttribute('hidden');
    });
  }

  const closePlanner = () => {
    if (plannerModal) plannerModal.setAttribute('hidden', '');
  };
  if (plannerCloseBtn) plannerCloseBtn.addEventListener('click', closePlanner);
  if (plannerCancelBtn) plannerCancelBtn.addEventListener('click', closePlanner);

  if (plannerGenerateBtn) {
    plannerGenerateBtn.addEventListener('click', () => {
      const subject = (plannerSubject?.value || '').trim() || 'My Academic Coursework';
      const days = plannerDays?.value || '7';
      const hours = plannerHours?.value || '2-4';
      closePlanner();
      submitMessage(`Please generate a structured, comprehensive day-by-day study roadmap and schedule for ${subject}. Timeframe: ${days} days, with ${hours} hours of study per day. Format with daily goals, high-yield topics, and practice checkpoints.`);
    });
  }

  // Saved Items Modal
  if (navSavedItems && savedItemsModal) {
    navSavedItems.addEventListener('click', () => {
      closeSidebar();
      renderSavedItems();
      savedItemsModal.removeAttribute('hidden');
    });
  }

  const closeSaved = () => {
    if (savedItemsModal) savedItemsModal.setAttribute('hidden', '');
  };
  if (savedCloseBtn) savedCloseBtn.addEventListener('click', closeSaved);
  if (savedDismissBtn) savedDismissBtn.addEventListener('click', closeSaved);

  if (savedItemsList) {
    savedItemsList.addEventListener('click', (e) => {
      const delBtn = e.target.closest('.btn-delete-saved');
      if (delBtn) {
        const id = delBtn.dataset.id;
        const bookmarks = loadBookmarks().filter(b => b.id !== id);
        saveBookmarks(bookmarks);
        renderSavedItems();
        showToast('Bookmark removed.', 'info');
        return;
      }

      const copyBtn = e.target.closest('.btn-copy-saved');
      if (copyBtn) {
        const idx = parseInt(copyBtn.dataset.idx, 10);
        const bookmarks = loadBookmarks();
        if (bookmarks[idx]) {
          copyToClipboard(bookmarks[idx].fullContent || bookmarks[idx].content, copyBtn, 'Copied!');
        }
      }
    });
  }

  // Settings Modal
  if (navSettings && settingsModal) {
    navSettings.addEventListener('click', () => {
      closeSidebar();
      settingsModal.removeAttribute('hidden');
    });
  }

  const closeSettings = () => {
    if (settingsModal) settingsModal.setAttribute('hidden', '');
  };
  if (settingsCloseBtn) settingsCloseBtn.addEventListener('click', closeSettings);
  if (settingsDoneBtn) settingsDoneBtn.addEventListener('click', closeSettings);

  if (clearAllHistoryBtn) {
    clearAllHistoryBtn.addEventListener('click', () => {
      closeSettings();
      promptDeleteAllConversations();
    });
  }
}

/* ─────────────────────────────────────────────────────────────────
   TOPBAR FEATURES: SEARCH, THEME, NOTIFICATIONS, PROFILE
───────────────────────────────────────────────────────────────── */
function initTopbarFeatures() {
  // 1. Search chats, topics or subjects
  if (chatSearchInput) {
    chatSearchInput.addEventListener('input', () => {
      state.searchQuery = (chatSearchInput.value || '').trim();
      renderConvoList();
    });

    chatSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        chatSearchInput.value = '';
        state.searchQuery = '';
        renderConvoList();
      }
    });
  }

  // 2. Theme Toggle (persists in localStorage)
  const applyTheme = (theme) => {
    if (theme === 'light') {
      document.body.removeAttribute('data-theme');
    } else {
      document.body.setAttribute('data-theme', 'dark');
    }
  };

  try {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY) || 'dark';
    applyTheme(savedTheme);
  } catch (e) {
    applyTheme('dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.body.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      applyTheme(newTheme);
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      } catch (e) {}
      showToast(newTheme === 'dark' ? '🌙 Dark theme enabled' : '☀️ Light theme enabled', 'info');
    });
  }

  // 3. Notification Icon & Dropdown
  if (notifBtn && notifDropdown) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = notifDropdown.hasAttribute('hidden');
      if (isHidden) {
        notifDropdown.removeAttribute('hidden');
        notifBtn.setAttribute('aria-expanded', 'true');
      } else {
        notifDropdown.setAttribute('hidden', '');
        notifBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (notifClearBtn) {
    notifClearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (notifBadge) notifBadge.classList.add('cleared');
      if (notifDropdown) notifDropdown.setAttribute('hidden', '');
      if (notifBtn) notifBtn.setAttribute('aria-expanded', 'false');
      showToast('Notifications dismissed.', 'info');
    });
  }

  // Click outside closes notification dropdown
  document.addEventListener('click', (e) => {
    if (notifDropdown && !notifDropdown.hasAttribute('hidden')) {
      if (!notifDropdown.contains(e.target) && e.target !== notifBtn && !notifBtn.contains(e.target)) {
        notifDropdown.setAttribute('hidden', '');
        if (notifBtn) notifBtn.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // 4. Simple Profile Display tooltip/toast
  if (profileChip) {
    profileChip.addEventListener('click', () => {
      showToast('👤 Student Guest Session Active (No login needed)', 'info');
    });
  }
}

/* ─────────────────────────────────────────────────────────────────
   DOCUMENT STUDIO — AI Document Reader, 9-Part Notes & Q&A
───────────────────────────────────────────────────────────────── */
const docState = {
  file: null,
  filename: '',
  fileSize: 0,
  fileType: '',
  pageCount: 1,
  wordCount: 0,
  text: '',
  notes: '',
  notesDepth: 'medium',
  chatHistory: [],
  isUploading: false,
  isGeneratingNotes: false,
  isChatting: false
};

function formatBytes(bytes, decimals = 1) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function openDocStudio(initialTab = 'upload') {
  const docStudioModal = document.getElementById('docStudioModal');
  if (!docStudioModal) return;

  docStudioModal.removeAttribute('hidden');
  switchDocTab(initialTab);

  if (docState.text) {
    updateDocUI();
  }
}

function closeDocStudio() {
  const docStudioModal = document.getElementById('docStudioModal');
  if (docStudioModal) {
    docStudioModal.setAttribute('hidden', '');
  }
}

function switchDocTab(tabName) {
  const docTabs = document.querySelectorAll('.doc-tab');
  const docPanes = document.querySelectorAll('.doc-pane');

  docTabs.forEach(tab => {
    const isActive = tab.dataset.tab === tabName;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  docPanes.forEach(pane => {
    const paneName = pane.id.replace('paneDoc', '').toLowerCase();
    if (paneName === tabName.toLowerCase()) {
      pane.removeAttribute('hidden');
      pane.classList.add('active');
    } else {
      pane.setAttribute('hidden', '');
      pane.classList.remove('active');
    }
  });

  if (tabName === 'chat') {
    const chatMsgs = document.getElementById('docChatMessages');
    if (chatMsgs) chatMsgs.scrollTop = chatMsgs.scrollHeight;
    const input = document.getElementById('docChatInput');
    if (input) setTimeout(() => input.focus(), 100);
  }

  if (tabName === 'text') {
    const pre = document.getElementById('docRawPre');
    if (pre && docState.text) {
      pre.textContent = docState.text;
    }
  }
}

function showDocError(title, message) {
  const errorBanner = document.getElementById('docErrorBanner');
  const errorTitle = document.getElementById('docErrorTitle');
  const errorMsg = document.getElementById('docErrorMessage');
  if (errorBanner && errorTitle && errorMsg) {
    errorTitle.textContent = title;
    errorMsg.innerHTML = message;
    errorBanner.removeAttribute('hidden');
  }
}

function clearDocError() {
  const errorBanner = document.getElementById('docErrorBanner');
  if (errorBanner) {
    errorBanner.setAttribute('hidden', '');
  }
}

function updateDocUI() {
  const docDropzone = document.getElementById('docDropzone');
  const docMetaCard = document.getElementById('docMetaCard');
  const docMetaFilename = document.getElementById('docMetaFilename');
  const docMetaType = document.getElementById('docMetaType');
  const docMetaSize = document.getElementById('docMetaSize');
  const docMetaPages = document.getElementById('docMetaPages');
  const docMetaWords = document.getElementById('docMetaWords');
  const docTypeIcon = document.getElementById('docTypeIcon');
  const docStatusBadge = document.getElementById('docStatusBadge');
  const docChatDocPill = document.getElementById('docChatDocPill');
  const docRawPre = document.getElementById('docRawPre');
  const docTextStats = document.getElementById('docTextStats');

  if (docState.text) {
    if (docDropzone) docDropzone.style.display = 'none';
    if (docMetaCard) docMetaCard.removeAttribute('hidden');

    if (docMetaFilename) docMetaFilename.textContent = docState.filename;
    if (docMetaType) docMetaType.textContent = docState.fileType.toUpperCase();
    if (docMetaSize) docMetaSize.textContent = formatBytes(docState.fileSize);
    if (docMetaPages) docMetaPages.textContent = `${docState.pageCount} ${docState.pageCount === 1 ? 'Page' : 'Pages'}`;
    if (docMetaWords) docMetaWords.textContent = `${docState.wordCount.toLocaleString()} Words`;

    const icons = { pdf: '📕', docx: '📘', txt: '📄' };
    if (docTypeIcon) docTypeIcon.textContent = icons[docState.fileType] || '📄';

    if (docStatusBadge) {
      docStatusBadge.textContent = `📄 ${docState.filename}`;
      docStatusBadge.classList.add('has-doc');
    }

    if (docChatDocPill) {
      docChatDocPill.textContent = `📄 ${docState.filename} (${docState.pageCount}p)`;
    }

    if (docRawPre) docRawPre.textContent = docState.text;
    if (docTextStats) {
      docTextStats.textContent = `${docState.wordCount.toLocaleString()} words • ${docState.text.length.toLocaleString()} characters`;
    }
  } else {
    if (docDropzone) docDropzone.style.display = 'flex';
    if (docMetaCard) docMetaCard.setAttribute('hidden', '');
    if (docStatusBadge) {
      docStatusBadge.textContent = 'No document';
      docStatusBadge.classList.remove('has-doc');
    }
    if (docChatDocPill) {
      docChatDocPill.textContent = '📄 No document active';
    }
    if (docRawPre) {
      docRawPre.textContent = 'No document text available. Please upload a PDF, DOCX, or TXT document first.';
    }
    if (docTextStats) {
      docTextStats.textContent = '0 words • 0 chars';
    }
  }
}

async function handleFileUpload(file) {
  if (!file) return;

  clearDocError();

  const MAX_BYTES = 10 * 1024 * 1024;
  if (file.size > MAX_BYTES) {
    showDocError(
      'File Too Large',
      `The selected file is <strong>${formatBytes(file.size)}</strong>, which exceeds the 10 MB maximum limit. Please select a smaller document.`
    );
    return;
  }

  const name = file.name.toLowerCase();
  const isValidExt = name.endsWith('.pdf') || name.endsWith('.docx') || name.endsWith('.txt');
  if (!isValidExt) {
    showDocError(
      'Unsupported File Format',
      'Please upload a <strong>PDF (.pdf)</strong>, <strong>Word (.docx)</strong>, or <strong>Plain Text (.txt)</strong> document.'
    );
    return;
  }

  const progressWrap = document.getElementById('docProgressWrap');
  const progressFill = document.getElementById('docProgressFill');
  const progressPercent = document.getElementById('docProgressPercent');
  const progressText = document.getElementById('docProgressText');

  if (progressWrap) progressWrap.removeAttribute('hidden');
  if (progressFill) progressFill.style.width = '25%';
  if (progressPercent) progressPercent.textContent = '25%';
  if (progressText) progressText.textContent = `Uploading ${file.name}...`;

  docState.isUploading = true;

  try {
    const formData = new FormData();
    formData.append('document', file);

    if (progressFill) progressFill.style.width = '65%';
    if (progressPercent) progressPercent.textContent = '65%';
    if (progressText) progressText.textContent = 'Extracting and reading document text...';

    const res = await fetch('/api/document/read', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();

    if (progressFill) progressFill.style.width = '100%';
    if (progressPercent) progressPercent.textContent = '100%';

    setTimeout(() => {
      if (progressWrap) progressWrap.setAttribute('hidden', '');
    }, 400);

    if (!res.ok || data.status !== 'success') {
      if (data.code === 'SCANNED_PDF_NO_TEXT') {
        showDocError(
          'Scanned / Image-Only PDF Detected',
          'This PDF does not contain selectable digital text. It appears to be scanned pages or images.<br><br>' +
          '<strong>OCR Required:</strong> StudyMate AI requires selectable text. Please use an OCR tool (e.g. Adobe Acrobat OCR, Google Drive, or an online OCR converter) to convert scanned pages to readable text first.'
        );
      } else {
        showDocError(
          data.code === 'EMPTY_DOCUMENT' ? 'Empty Document' : 'Reading Failed',
          data.message || 'Could not parse document. Please ensure the file is not corrupted or password-protected.'
        );
      }
      return;
    }

    docState.file = file;
    docState.filename = data.filename;
    docState.fileSize = data.fileSize;
    docState.fileType = data.fileType;
    docState.pageCount = data.pageCount;
    docState.wordCount = data.wordCount;
    docState.text = data.text;
    docState.notes = '';
    docState.chatHistory = [];

    const notesRendered = document.getElementById('docNotesRendered');
    const notesEmpty = document.getElementById('docNotesEmpty');
    const notesLoading = document.getElementById('docNotesLoading');
    const genNotesText = document.getElementById('docGenerateNotesText');
    if (notesRendered) {
      notesRendered.innerHTML = '';
      notesRendered.setAttribute('hidden', '');
    }
    if (notesLoading) notesLoading.setAttribute('hidden', '');
    if (notesEmpty) notesEmpty.removeAttribute('hidden');
    if (genNotesText) genNotesText.textContent = 'Generate Notes';

    const chatMsgs = document.getElementById('docChatMessages');
    if (chatMsgs) {
      chatMsgs.innerHTML = `
        <div class="doc-chat-msg doc-chat-msg-ai">
          <div class="doc-msg-avatar">🤖</div>
          <div class="doc-msg-bubble">
            <div class="doc-msg-source-tag">Source: Document Assistant</div>
            <p>I have read <strong>${escapeHtml(data.filename)}</strong> (${data.pageCount} ${data.pageCount === 1 ? 'page' : 'pages'}, ${data.wordCount.toLocaleString()} words). Ask me any questions, or click <strong>Study Notes</strong> to generate structured revision sheets!</p>
          </div>
        </div>
      `;
    }

    updateDocUI();
    showToast(`✅ "${data.filename}" read successfully (${data.wordCount.toLocaleString()} words)!`, 'success');

  } catch (err) {
    if (progressWrap) progressWrap.setAttribute('hidden', '');
    showDocError('Network Error', 'An unexpected error occurred while uploading. Please check your connection and try again.');
    console.error('[DocumentStudio] Upload error:', err);
  } finally {
    docState.isUploading = false;
  }
}

function removeDocument() {
  docState.file = null;
  docState.filename = '';
  docState.fileSize = 0;
  docState.fileType = '';
  docState.pageCount = 1;
  docState.wordCount = 0;
  docState.text = '';
  docState.notes = '';
  docState.chatHistory = [];

  const fileInput = document.getElementById('docFileInput');
  if (fileInput) fileInput.value = '';

  clearDocError();
  updateDocUI();

  const notesRendered = document.getElementById('docNotesRendered');
  const notesEmpty = document.getElementById('docNotesEmpty');
  const notesLoading = document.getElementById('docNotesLoading');
  const genNotesText = document.getElementById('docGenerateNotesText');
  if (notesRendered) {
    notesRendered.innerHTML = '';
    notesRendered.setAttribute('hidden', '');
  }
  if (notesLoading) notesLoading.setAttribute('hidden', '');
  if (notesEmpty) notesEmpty.removeAttribute('hidden');
  if (genNotesText) genNotesText.textContent = 'Generate Notes';

  showToast('Document removed.', 'info');
}

async function generateDocNotes(force = false) {
  if (!docState.text) {
    showToast('Please upload a PDF, Word, or Text document first.', 'warning');
    switchDocTab('upload');
    return;
  }

  if (docState.notes && !force) {
    switchDocTab('notes');
    return;
  }

  switchDocTab('notes');

  const notesEmpty = document.getElementById('docNotesEmpty');
  const notesLoading = document.getElementById('docNotesLoading');
  const notesRendered = document.getElementById('docNotesRendered');
  const notesBtn = document.getElementById('docGenerateNotesBtn');
  const notesDepth = document.getElementById('docNotesDepth');
  const loadingText = document.getElementById('docNotesLoadingText');
  const genNotesText = document.getElementById('docGenerateNotesText');

  if (notesEmpty) notesEmpty.setAttribute('hidden', '');
  if (notesRendered) notesRendered.setAttribute('hidden', '');
  if (notesLoading) notesLoading.removeAttribute('hidden');
  if (notesBtn) notesBtn.disabled = true;

  const depth = notesDepth ? notesDepth.value : 'medium';
  docState.notesDepth = depth;
  docState.isGeneratingNotes = true;

  const statusMessages = [
    'Reading and parsing document contents...',
    'Extracting core definitions and chapter structure...',
    'Synthesizing 9-part academic revision notes...',
    'Polishing revision sheet with Gemini AI...'
  ];
  let msgIdx = 0;
  const timer = setInterval(() => {
    msgIdx = (msgIdx + 1) % statusMessages.length;
    if (loadingText) loadingText.textContent = statusMessages[msgIdx];
  }, 2200);

  try {
    const res = await fetch('/api/document/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: docState.text,
        filename: docState.filename,
        depth: depth
      })
    });

    clearInterval(timer);
    const data = await res.json();

    if (!res.ok || data.status !== 'success') {
      if (notesLoading) notesLoading.setAttribute('hidden', '');
      if (notesEmpty) notesEmpty.removeAttribute('hidden');
      showToast(data.message || 'Failed to generate study notes.', 'error');
      return;
    }

    docState.notes = data.notes;

    if (notesLoading) notesLoading.setAttribute('hidden', '');
    if (notesRendered) {
      notesRendered.innerHTML = renderMarkdown(data.notes);
      notesRendered.removeAttribute('hidden');
    }
    if (genNotesText) genNotesText.textContent = 'Regenerate Notes';
    showToast('✅ 9-Part Study Notes generated successfully!', 'success');

  } catch (err) {
    clearInterval(timer);
    if (notesLoading) notesLoading.setAttribute('hidden', '');
    if (notesEmpty) notesEmpty.removeAttribute('hidden');
    showToast('Failed to connect to AI summarizer. Please try again.', 'error');
    console.error('[DocumentStudio] Summarize error:', err);
  } finally {
    if (notesBtn) notesBtn.disabled = false;
    docState.isGeneratingNotes = false;
  }
}

function copyDocNotes() {
  if (!docState.notes) {
    showToast('Generate study notes first before copying.', 'warning');
    return;
  }

  navigator.clipboard.writeText(docState.notes).then(() => {
    showToast('📋 9-Part Study Notes copied to clipboard!', 'success');
  }).catch(() => {
    showToast('Could not copy notes to clipboard.', 'error');
  });
}

function downloadDocNotes() {
  if (!docState.notes) {
    showToast('Generate study notes first before downloading.', 'warning');
    return;
  }

  const baseName = (docState.filename || 'Document').replace(/\.[^/.]+$/, '');
  const fileName = `${baseName}_Study_Notes.md`;
  const blob = new Blob([docState.notes], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`📥 Downloaded "${fileName}"!`, 'success');
}

function exportDocNotesToChat() {
  if (!docState.notes) {
    showToast('Generate study notes first before exporting to chat.', 'warning');
    return;
  }

  const convTitle = `Notes: ${docState.filename || 'Document'}`;
  const convId = ensureActiveConversation(convTitle);

  const arrival = Date.now();
  appendMessageToConv(convId, {
    id: generateId('msg'),
    role: 'model',
    content: `### 📄 AI Study Notes for **${escapeHtml(docState.filename)}**\n\n${docState.notes}`,
    timestamp: arrival,
    time: formatTime(arrival),
    isError: false
  });

  closeDocStudio();
  messageInput.focus();
  showToast('🚀 Notes exported to your active chat workspace!', 'success');
}

async function sendDocChatMessage(userQuery) {
  const query = (userQuery || '').trim();
  if (!query) return;

  if (!docState.text) {
    showToast('Please upload a document first before asking questions.', 'warning');
    switchDocTab('upload');
    return;
  }

  const chatMsgs = document.getElementById('docChatMessages');
  const chatInput = document.getElementById('docChatInput');
  const chatSendBtn = document.getElementById('docChatSendBtn');
  const inputCount = document.getElementById('docChatInputCount');

  const userMsgEl = document.createElement('div');
  userMsgEl.className = 'doc-chat-msg doc-chat-msg-user';
  userMsgEl.innerHTML = `
    <div class="doc-msg-avatar">You</div>
    <div class="doc-msg-bubble">
      <p>${escapeHtml(query)}</p>
    </div>
  `;
  if (chatMsgs) {
    chatMsgs.appendChild(userMsgEl);
    chatMsgs.scrollTop = chatMsgs.scrollHeight;
  }

  if (chatInput) chatInput.value = '';
  if (inputCount) inputCount.textContent = '0 / 2,000';
  if (chatSendBtn) chatSendBtn.disabled = true;

  const aiMsgEl = document.createElement('div');
  aiMsgEl.className = 'doc-chat-msg doc-chat-msg-ai';
  aiMsgEl.innerHTML = `
    <div class="doc-msg-avatar">🤖</div>
    <div class="doc-msg-bubble">
      <div class="doc-msg-source-tag">Searching document...</div>
      <p style="opacity:0.75;">Retrieving relevant passages and formulating answer...</p>
    </div>
  `;
  if (chatMsgs) {
    chatMsgs.appendChild(aiMsgEl);
    chatMsgs.scrollTop = chatMsgs.scrollHeight;
  }

  docState.isChatting = true;

  try {
    const historyPayload = (docState.chatHistory || []).slice(-8).map(m => ({
      role: m.role === 'model' ? 'model' : 'user',
      content: m.content
    }));

    const res = await fetch('/api/document/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: query,
        history: historyPayload,
        documentText: docState.text,
        filename: docState.filename
      })
    });

    const data = await res.json();

    if (!res.ok || data.status !== 'success') {
      aiMsgEl.innerHTML = `
        <div class="doc-msg-avatar" style="background:#ef4444;color:#fff;">⚠️</div>
        <div class="doc-msg-bubble" style="border-color:#fca5a5;background:#fef2f2;color:#991b1b;">
          <div class="doc-msg-source-tag" style="color:#991b1b;">Error</div>
          <p>${escapeHtml(data.message || 'Failed to answer question. Please try again.')}</p>
        </div>
      `;
      return;
    }

    docState.chatHistory.push({ role: 'user', content: query });
    docState.chatHistory.push({ role: 'model', content: data.reply });

    let sourceTag = `Citing ${escapeHtml(docState.filename)}`;
    if (data.reply.includes('not covered in the uploaded document') || data.reply.includes('[General Supplemental Knowledge]')) {
      sourceTag = 'General Knowledge / Document Notice';
    }

    aiMsgEl.innerHTML = `
      <div class="doc-msg-avatar">🤖</div>
      <div class="doc-msg-bubble">
        <div class="doc-msg-source-tag">${sourceTag}</div>
        <div class="markdown-content">${renderMarkdown(data.reply)}</div>
      </div>
    `;

  } catch (err) {
    aiMsgEl.innerHTML = `
      <div class="doc-msg-avatar" style="background:#ef4444;color:#fff;">⚠️</div>
      <div class="doc-msg-bubble" style="border-color:#fca5a5;background:#fef2f2;color:#991b1b;">
        <div class="doc-msg-source-tag" style="color:#991b1b;">Network Error</div>
        <p>Failed to connect to document assistant. Please try again.</p>
      </div>
    `;
    console.error('[DocumentStudio] Q&A error:', err);
  } finally {
    docState.isChatting = false;
    if (chatMsgs) chatMsgs.scrollTop = chatMsgs.scrollHeight;
    if (chatInput) {
      chatInput.focus();
      if (chatSendBtn) chatSendBtn.disabled = chatInput.value.trim() === '';
    }
  }
}

function clearDocChat() {
  docState.chatHistory = [];
  const chatMsgs = document.getElementById('docChatMessages');
  if (chatMsgs) {
    chatMsgs.innerHTML = `
      <div class="doc-chat-msg doc-chat-msg-ai">
        <div class="doc-msg-avatar">🤖</div>
        <div class="doc-msg-bubble">
          <div class="doc-msg-source-tag">Source: Document Assistant</div>
          <p>Chat history cleared. What would you like to explore in <strong>${escapeHtml(docState.filename || 'your document')}</strong>?</p>
        </div>
      </div>
    `;
  }
  showToast('Document chat history cleared.', 'info');
}

function initDocumentStudio() {
  const docStudioModal     = document.getElementById('docStudioModal');
  const closeDocStudioBtn  = document.getElementById('closeDocStudioBtn');
  const openDocStudioBtn   = document.getElementById('openDocStudioBtn');
  const docTabs            = document.querySelectorAll('.doc-tab');
  const docDropzone        = document.getElementById('docDropzone');
  const docFileInput       = document.getElementById('docFileInput');
  const docBrowseBtn       = document.getElementById('docBrowseBtn');
  const docRemoveBtn       = document.getElementById('docRemoveBtn');
  const docErrorDismissBtn = document.getElementById('docErrorDismissBtn');
  const docQuickNotesBtn   = document.getElementById('docQuickNotesBtn');
  const docQuickChatBtn    = document.getElementById('docQuickChatBtn');
  const docQuickTextBtn    = document.getElementById('docQuickTextBtn');
  const docEmptyUploadBtn  = document.getElementById('docEmptyUploadBtn');
  const docGenerateNotesBtn= document.getElementById('docGenerateNotesBtn');
  const docCopyNotesBtn    = document.getElementById('docCopyNotesBtn');
  const docDownloadNotesBtn= document.getElementById('docDownloadNotesBtn');
  const docExportNotesBtn  = document.getElementById('docExportNotesBtn');
  const docChatForm        = document.getElementById('docChatForm');
  const docChatInput       = document.getElementById('docChatInput');
  const docChatInputCount  = document.getElementById('docChatInputCount');
  const docChatSendBtn     = document.getElementById('docChatSendBtn');
  const docChatClearBtn    = document.getElementById('docChatClearBtn');
  const docChatChips       = document.getElementById('docChatChips');
  const docTextSearchInput = document.getElementById('docTextSearchInput');
  const docCopyRawTextBtn  = document.getElementById('docCopyRawTextBtn');

  if (openDocStudioBtn) {
    openDocStudioBtn.addEventListener('click', () => openDocStudio('upload'));
  }

  if (closeDocStudioBtn) {
    closeDocStudioBtn.addEventListener('click', closeDocStudio);
  }

  if (docStudioModal) {
    docStudioModal.addEventListener('click', (e) => {
      if (e.target === docStudioModal) {
        closeDocStudio();
      }
    });
  }

  docTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.dataset.tab;
      if (tabName) switchDocTab(tabName);
    });
  });

  if (docBrowseBtn && docFileInput) {
    docBrowseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      docFileInput.click();
    });
  }

  if (docDropzone && docFileInput) {
    docDropzone.addEventListener('click', () => {
      docFileInput.click();
    });

    ['dragenter', 'dragover'].forEach(evt => {
      docDropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();
        docDropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(evt => {
      docDropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();
        docDropzone.classList.remove('dragover');
      });
    });

    docDropzone.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        handleFileUpload(files[0]);
      }
    });
  }

  if (docFileInput) {
    docFileInput.addEventListener('change', () => {
      if (docFileInput.files && docFileInput.files.length > 0) {
        handleFileUpload(docFileInput.files[0]);
      }
    });
  }

  if (docRemoveBtn) {
    docRemoveBtn.addEventListener('click', removeDocument);
  }

  if (docErrorDismissBtn) {
    docErrorDismissBtn.addEventListener('click', clearDocError);
  }

  if (docQuickNotesBtn) {
    docQuickNotesBtn.addEventListener('click', () => {
      switchDocTab('notes');
      if (!docState.notes) generateDocNotes();
    });
  }

  if (docQuickChatBtn) {
    docQuickChatBtn.addEventListener('click', () => {
      switchDocTab('chat');
    });
  }

  if (docQuickTextBtn) {
    docQuickTextBtn.addEventListener('click', () => {
      switchDocTab('text');
    });
  }

  if (docEmptyUploadBtn) {
    docEmptyUploadBtn.addEventListener('click', () => {
      switchDocTab('upload');
    });
  }

  if (docGenerateNotesBtn) {
    docGenerateNotesBtn.addEventListener('click', () => generateDocNotes(true));
  }

  if (docCopyNotesBtn) {
    docCopyNotesBtn.addEventListener('click', copyDocNotes);
  }

  if (docDownloadNotesBtn) {
    docDownloadNotesBtn.addEventListener('click', downloadDocNotes);
  }

  if (docExportNotesBtn) {
    docExportNotesBtn.addEventListener('click', exportDocNotesToChat);
  }

  if (docChatInput) {
    docChatInput.addEventListener('input', () => {
      const len = docChatInput.value.length;
      if (docChatInputCount) docChatInputCount.textContent = `${len.toLocaleString()} / 2,000`;
      if (docChatSendBtn) docChatSendBtn.disabled = docChatInput.value.trim() === '';
    });

    docChatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (docChatInput.value.trim() && !docState.isChatting) {
          sendDocChatMessage(docChatInput.value.trim());
        }
      }
    });
  }

  if (docChatForm) {
    docChatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (docChatInput && docChatInput.value.trim() && !docState.isChatting) {
        sendDocChatMessage(docChatInput.value.trim());
      }
    });
  }

  if (docChatClearBtn) {
    docChatClearBtn.addEventListener('click', clearDocChat);
  }

  if (docChatChips) {
    docChatChips.addEventListener('click', (e) => {
      const chip = e.target.closest('.doc-chip');
      if (chip && chip.dataset.query) {
        sendDocChatMessage(chip.dataset.query);
      }
    });
  }

  if (docTextSearchInput) {
    docTextSearchInput.addEventListener('input', () => {
      const q = docTextSearchInput.value.trim().toLowerCase();
      const pre = document.getElementById('docRawPre');
      if (!pre) return;

      if (!q || !docState.text) {
        pre.textContent = docState.text || 'No document text available.';
        return;
      }

      const lines = docState.text.split('\n');
      const matched = lines.filter(l => l.toLowerCase().includes(q));
      if (matched.length > 0) {
        pre.textContent = matched.join('\n');
      } else {
        pre.textContent = `No lines found matching "${docTextSearchInput.value}".`;
      }
    });
  }

  if (docCopyRawTextBtn) {
    docCopyRawTextBtn.addEventListener('click', () => {
      if (!docState.text) {
        showToast('No document text to copy.', 'warning');
        return;
      }
      navigator.clipboard.writeText(docState.text).then(() => {
        showToast('📋 Raw document text copied to clipboard!', 'success');
      });
    });
  }
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (state.isStreaming) {
      state.stopStreamingRequested = true;
    }
    const docStudioModal = document.getElementById('docStudioModal');
    if (docStudioModal && !docStudioModal.hasAttribute('hidden')) {
      closeDocStudio();
    }
    if (notifDropdown && !notifDropdown.hasAttribute('hidden')) {
      notifDropdown.setAttribute('hidden', '');
      if (notifBtn) notifBtn.setAttribute('aria-expanded', 'false');
    }
    if (toolsModal && !toolsModal.hasAttribute('hidden')) {
      closeToolsModal();
    }
    if (deleteModal && !deleteModal.hasAttribute('hidden')) {
      deleteModal.setAttribute('hidden', '');
      state.pendingDeleteId = null;
    }
    if (plannerModal && !plannerModal.hasAttribute('hidden')) {
      plannerModal.setAttribute('hidden', '');
    }
    if (savedItemsModal && !savedItemsModal.hasAttribute('hidden')) {
      savedItemsModal.setAttribute('hidden', '');
    }
    if (settingsModal && !settingsModal.hasAttribute('hidden')) {
      settingsModal.setAttribute('hidden', '');
    }
    if (studyPanel && studyPanel.classList.contains('active')) {
      studyPanel.classList.remove('active');
      if (studyPanelOverlay) studyPanelOverlay.classList.remove('active');
    }
  }
});

/* ─────────────────────────────────────────────────────────────────
   INITIALISATION
───────────────────────────────────────────────────────────────── */
(function init() {
  state.storageAvailable = checkStorageAvailable();
  state.conversations = loadStoredConversations();

  initStudyModes();
  initQuickToolsBar();
  initVoiceInput();
  initTopbarFeatures();
  initStudyPanelAndModals();
  initDocumentStudio();
  updateComposerButtons();
  updateStudyPanel();

  const storedActiveId = window.localStorage.getItem(ACTIVE_CONV_KEY);
  if (storedActiveId && state.conversations[storedActiveId]) {
    activateConversation(storedActiveId);
  } else {
    const list = Object.values(state.conversations).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    if (list.length > 0) {
      activateConversation(list[0].id);
    } else {
      startNewChat();
    }
  }

  renderConvoList();
  messageInput.focus();

  console.log(
    '%c🎓 StudyMate AI %cModern Academic Assistant Active',
    'color:#4f46e5;font-weight:700;font-size:14px',
    'color:#10b981;font-size:12px;font-weight:600'
  );

  if (!API_KEY_CONFIGURED) {
    console.warn(
      '⚠️ GEMINI_API_KEY is not configured on the server.\n' +
      'Add it to .env and restart the server to enable AI responses.'
    );
  }
})();
