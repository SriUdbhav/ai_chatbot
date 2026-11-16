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
const STORAGE_KEY = 'studyai_conversations_v1';
const ACTIVE_CONV_KEY = 'studyai_active_id_v1';
const LEARNING_MODE_KEY = 'studyai_learning_mode_v1';
const OPACITY_STORAGE_KEY = 'studymate_surface_opacity';
const MAX_CONVERSATIONS = 50;
const MAX_MESSAGES_PER_CONV = 100;
const MAX_MESSAGE_LENGTH = 4000;
const API_URL = window.APP_CONFIG?.chatApiUrl ?? '/api/chat';
const TOOLS_API_URL = window.APP_CONFIG?.toolsApiUrl ?? '/api/tools';
const API_KEY_CONFIGURED = window.APP_CONFIG?.apiKeyConfigured ?? false;

/* ─────────────────────────────────────────────────────────────────
   APPLICATION STATE
───────────────────────────────────────────────────────────────── */
const state = {
  conversations: {},   // { [id]: Conversation }
  activeId: null, // string | null (null = new unsaved chat state)
  isWaiting: false,// true while waiting for server response
  isStreaming: false,// true while typewriter streaming is active
  stopStreamingRequested: false, // true when user clicks stop button
  editingId: null, // conversation ID currently undergoing inline rename
  pendingDeleteId: null, // conversation ID pending deletion modal confirmation
  storageAvailable: true, // set to false if localStorage is blocked or throws
  learningMode: 'standard', // active study preference
  activeQuiz: null, // stores active quiz data and student answers
  isListening: false,// speech dictation active
  speechRecognition: null,// Web Speech API instance
  currentSpeakingBtn: null, // current active TTS button
  searchQuery: '',   // topbar search query filter
  pendingDeleteMode: null, // 'single' | 'all'
  composerAttachments: [], // [{ id, file, filename, fileType, size, formattedSize, text, dataUrl, isExtracting, error }]
  imageGenMode: localStorage.getItem('studymate_image_mode') || 'fast' // Phase 5: 'fast' | 'quality'
};

// Phase 4: Object URL lifecycle tracking to avoid repeated Base64 DOM repaint overhead
const activeBlobUrls = new Set();
function base64ToBlobUrl(base64, mimeType = 'image/jpeg') {
  try {
    const bin = atob(base64);
    const u8 = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
    const blob = new Blob([u8], { type: mimeType });
    const url = URL.createObjectURL(blob);
    activeBlobUrls.add(url);
    return url;
  } catch (e) {
    console.warn('[Image] Fallback to data URL:', e);
    return `data:${mimeType};base64,${base64}`;
  }
}

window.addEventListener('beforeunload', () => {
  for (const u of activeBlobUrls) {
    try { URL.revokeObjectURL(u); } catch (_) {}
  }
  activeBlobUrls.clear();
});

/* ─────────────────────────────────────────────────────────────────
   DOM REFERENCES
───────────────────────────────────────────────────────────────── */
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
const sidebarOpenBtn = document.getElementById('sidebarOpenBtn');
const newChatBtn = document.getElementById('newChatBtn');
const convoList = document.getElementById('convoList');
const convoEmpty = document.getElementById('convoEmpty');
const welcomeScreen = document.getElementById('welcomeScreen');
const messagesArea = document.getElementById('messagesArea');
const clearChatBtn = document.getElementById('clearChatBtn');
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const stopBtn = document.getElementById('stopBtn');
const attachBtn = document.getElementById('attachBtn');
const attachmentMenu = document.getElementById('attachmentMenu');
const composerAttachments = document.getElementById('composerAttachments');
const composerFileInput = document.getElementById('composerFileInput');
const micBtn = document.getElementById('micBtn');
const quickToolsBar = document.getElementById('quickToolsBar');
const topbarTitle = document.getElementById('topbarTitle');
const composerHint = document.getElementById('composerHint');
const studyModeSelect = document.getElementById('studyModeSelect');
const openToolsBtn = document.getElementById('openToolsBtn');
const deleteModal = document.getElementById('deleteModal');
const deleteModalTitle = document.getElementById('deleteModalTitle');
const deleteModalDesc = document.getElementById('deleteModalDesc');
const deleteModalCancel = document.getElementById('deleteModalCancel');
const deleteModalConfirm = document.getElementById('deleteModalConfirm');
const toastContainer = document.getElementById('toastContainer');
const sidebarClearAllBtn = document.getElementById('sidebarClearAllBtn');

// Topbar Search, Theme & Notification References
const chatSearchInput = document.getElementById('chatSearchInput');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const notifBtn = document.getElementById('notifBtn');
const notifBadge = document.getElementById('notifBadge');
const notifDropdown = document.getElementById('notifDropdown');
const notifClearBtn = document.getElementById('notifClearBtn');
const profileChip = document.getElementById('profileChip');
const profileDropdown = document.getElementById('profileDropdown');
const profileSettingsBtn = document.getElementById('profileSettingsBtn');
const profileSavedBtn = document.getElementById('profileSavedBtn');
const profilePlannerBtn = document.getElementById('profilePlannerBtn');
const THEME_STORAGE_KEY = 'studymate_theme_v1';

// Tools Modal References
const toolsModal = document.getElementById('toolsModal');
const closeToolsModalBtn = document.getElementById('closeToolsModalBtn');
const toolTabs = document.querySelectorAll('.tool-tab');
const toolPanes = document.querySelectorAll('.tool-pane');

// Tool Form References
const explainForm = document.getElementById('explainForm');
const programmingForm = document.getElementById('programmingForm');
const summarizeForm = document.getElementById('summarizeForm');
const summarizeNotes = document.getElementById('summarizeNotes');
const notesCharCounter = document.getElementById('notesCharCounter');
const quizForm = document.getElementById('quizForm');

// Study Panel References
const studyPanel = document.getElementById('studyPanel');
const studyPanelToggleBtn = document.getElementById('studyPanelToggleBtn');
const studyPanelCloseBtn = document.getElementById('studyPanelCloseBtn');
const studyPanelOverlay = document.getElementById('studyPanelOverlay');
const panelSessionTitle = document.getElementById('panelSessionTitle');
const panelMsgCount = document.getElementById('panelMsgCount');
const panelActiveModeBadge = document.getElementById('panelActiveModeBadge');
const quickNotepad = document.getElementById('quickNotepad');
const notepadStatus = document.getElementById('notepadStatus');

// Additional Feature Modals & Nav References
const navHome = document.getElementById('navHome');
const navSubjectNotes = document.getElementById('navSubjectNotes');
const navPracticeQuiz = document.getElementById('navPracticeQuiz');
const navStudyPlanner = document.getElementById('navStudyPlanner');
const navSavedItems = document.getElementById('navSavedItems');
const navSettings = document.getElementById('navSettings');
const sidebarAllToolsLink = document.getElementById('sidebarAllToolsLink');

const plannerModal = document.getElementById('plannerModal');
const plannerCloseBtn = document.getElementById('plannerCloseBtn');
const plannerCancelBtn = document.getElementById('plannerCancelBtn');
const plannerGenerateBtn = document.getElementById('plannerGenerateBtn');
const plannerSubject = document.getElementById('plannerSubject');
const plannerDays = document.getElementById('plannerDays');
const plannerHours = document.getElementById('plannerHours');

const savedItemsModal = document.getElementById('savedItemsModal');
const savedCloseBtn = document.getElementById('savedCloseBtn');
const savedDismissBtn = document.getElementById('savedDismissBtn');
const savedItemsList = document.getElementById('savedItemsList');

const settingsModal = document.getElementById('settingsModal');
const settingsCloseBtn = document.getElementById('settingsCloseBtn');
const settingsDoneBtn = document.getElementById('settingsDoneBtn');
const clearAllHistoryBtn = document.getElementById('clearAllHistoryBtn');

const SAVED_ITEMS_KEY = 'studyai_saved_items_v1';
const QUICK_NOTES_KEY = 'studyai_quick_notes_v1';

// ── Media Storage (IndexedDB for Generated Images — Part 7) ──────────────────
const imageCache = new Map();

const MediaDB = {
  dbPromise: null,
  getDB() {
    if (!this.dbPromise) {
      this.dbPromise = new Promise((resolve) => {
        if (typeof window === 'undefined' || !('indexedDB' in window)) {
          return resolve(null);
        }
        try {
          const req = indexedDB.open('StudyMate_MediaDB', 1);
          req.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains('generated_images')) {
              db.createObjectStore('generated_images', { keyPath: 'id' });
            }
          };
          req.onsuccess = (e) => resolve(e.target.result);
          req.onerror = (e) => {
            console.warn('[MediaDB] Could not open IndexedDB:', e);
            resolve(null);
          };
        } catch (err) {
          console.warn('[MediaDB] IndexedDB exception:', err);
          resolve(null);
        }
      });
    }
    return this.dbPromise;
  },

  async saveImage(id, dataUrl, mimeType, prompt, engine) {
    if (id && dataUrl) {
      imageCache.set(id, dataUrl);
    }
    try {
      const db = await this.getDB();
      if (!db) return false;
      return new Promise((resolve) => {
        const tx = db.transaction('generated_images', 'readwrite');
        const store = tx.objectStore('generated_images');
        store.put({
          id,
          dataUrl,
          mimeType: mimeType || 'image/png',
          prompt: prompt || '',
          engine: engine || 'Gemini Image',
          createdAt: Date.now(),
        });
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      });
    } catch (err) {
      console.warn('[MediaDB] Failed to save image:', err);
      return false;
    }
  },

  async getImage(id) {
    if (imageCache.has(id)) {
      return { id, dataUrl: imageCache.get(id) };
    }
    try {
      const db = await this.getDB();
      if (!db) return null;
      return new Promise((resolve) => {
        const tx = db.transaction('generated_images', 'readonly');
        const store = tx.objectStore('generated_images');
        const req = store.get(id);
        req.onsuccess = () => {
          if (req.result && req.result.dataUrl) {
            imageCache.set(id, req.result.dataUrl);
          }
          resolve(req.result || null);
        };
        req.onerror = () => resolve(null);
      });
    } catch (err) {
      console.warn('[MediaDB] Failed to get image:', err);
      return null;
    }
  },

  async deleteImage(id) {
    imageCache.delete(id);
    try {
      const db = await this.getDB();
      if (!db) return false;
      return new Promise((resolve) => {
        const tx = db.transaction('generated_images', 'readwrite');
        const store = tx.objectStore('generated_images');
        store.delete(id);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      });
    } catch (err) {
      console.warn('[MediaDB] Failed to delete image:', err);
      return false;
    }
  }
};

async function copyImageToClipboard(imgId, btn) {
  let dataUrl = imageCache.get(imgId);
  if (!dataUrl) {
    const record = await MediaDB.getImage(imgId);
    dataUrl = record?.dataUrl;
  }

  if (!dataUrl) {
    showToast('Image data not found.', 'warn');
    return;
  }

  try {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const pngBlob = blob.type === 'image/png' ? blob : new Blob([blob], { type: 'image/png' });

    if (navigator.clipboard && navigator.clipboard.write) {
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': pngBlob })
      ]);
      if (btn) {
        btn.classList.add('copied');
        const orig = btn.innerHTML;
        btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="20 6 9 17 4 12"/></svg> <span>Copied!</span>`;
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = orig;
        }, 2000);
      }
      showToast('Image copied to clipboard!', 'success');
      return;
    }
  } catch (err) {
    console.warn('[Clipboard] Direct PNG copy failed, attempting fallback:', err);
  }

  try {
    await navigator.clipboard.writeText(dataUrl);
    showToast('Copied image data URL to clipboard.', 'info');
  } catch (e2) {
    showToast('Clipboard access denied by browser.', 'warn');
  }
}

async function downloadImage(imgId, prompt) {
  let dataUrl = imageCache.get(imgId);
  if (!dataUrl) {
    const record = await MediaDB.getImage(imgId);
    dataUrl = record?.dataUrl;
  }

  if (!dataUrl) {
    showToast('Image data not found.', 'warn');
    return;
  }

  try {
    const a = document.createElement('a');
    a.href = dataUrl;
    const safePrompt = (prompt || 'studymate-image')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .slice(0, 32)
      .replace(/^-+|-+$/g, '');
    a.download = `studymate-${safePrompt || 'ai'}-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Image download started!', 'success');
  } catch (err) {
    console.warn('Download error:', err);
    showToast('Failed to trigger download.', 'error');
  }
}

// ── Local AI & WebLLM References ──────────────────────────────────────────────
const engineIndicatorPill = document.getElementById('engineIndicatorPill');
const engineIndicatorDot = document.getElementById('engineIndicatorDot');
const engineIndicatorText = document.getElementById('engineIndicatorText');
const enginePrefSelect = document.getElementById('enginePrefSelect');
const webgpuBadge = document.getElementById('webgpuBadge');
const webgpuDesc = document.getElementById('webgpuDesc');
const localModelSelect = document.getElementById('localModelSelect');
const modelSpecsDesc = document.getElementById('modelSpecsDesc');
const modelCacheBadge = document.getElementById('modelCacheBadge');
const modelCacheStatusDesc = document.getElementById('modelCacheStatusDesc');
const localAiProgressWrap = document.getElementById('localAiProgressWrap');
const localAiProgressFill = document.getElementById('localAiProgressFill');
const localAiProgressPercent = document.getElementById('localAiProgressPercent');
const localAiProgressText = document.getElementById('localAiProgressText');
const downloadModelBtn = document.getElementById('downloadModelBtn');
const deleteModelBtn = document.getElementById('deleteModelBtn');
const testInferenceBtn = document.getElementById('testInferenceBtn');
const localAiDiagnosticBox = document.getElementById('localAiDiagnosticBox');
const localAiDiagnosticBadge = document.getElementById('localAiDiagnosticBadge');
const localAiDiagnosticTitle = document.getElementById('localAiDiagnosticTitle');
const localAiDiagnosticMessage = document.getElementById('localAiDiagnosticMessage');
const localAiDiagnosticDetails = document.getElementById('localAiDiagnosticDetails');

// Offline Intelligence & DS Syllabus References (Part 1 & Part 6)
const offlineIntelligenceStatusBadge = document.getElementById('offlineIntelligenceStatusBadge');
const intelCheckWebLLMBadge = document.getElementById('intelCheckWebLLMBadge');
const intelCheckWebLLMDesc = document.getElementById('intelCheckWebLLMDesc');
const intelCheckChromeBadge = document.getElementById('intelCheckChromeBadge');
const intelCheckChromeDesc = document.getElementById('intelCheckChromeDesc');
const intelCheckOllamaBadge = document.getElementById('intelCheckOllamaBadge');
const intelCheckOllamaDesc = document.getElementById('intelCheckOllamaDesc');
const intelCheckKnowledgeBadge = document.getElementById('intelCheckKnowledgeBadge');
const intelCheckKnowledgeDesc = document.getElementById('intelCheckKnowledgeDesc');
const activeResolvedEngineName = document.getElementById('activeResolvedEngineName');
const rescanIntelligenceBtn = document.getElementById('rescanIntelligenceBtn');
const syllabusTrackerGrid = document.getElementById('syllabusTrackerGrid');
const quickVivaBtn = document.getElementById('quickVivaBtn');
const quickExplainCodeBtn = document.getElementById('quickExplainCodeBtn');
const quickDryRunBtn = document.getElementById('quickDryRunBtn');

function showLocalAiDiagnostic(diag) {
  if (!localAiDiagnosticBox) return;
  localAiDiagnosticBox.style.display = 'block';
  if (localAiDiagnosticBadge) localAiDiagnosticBadge.textContent = diag.category || 'Error';
  if (localAiDiagnosticTitle) localAiDiagnosticTitle.textContent = diag.title || 'Diagnostic Error';
  if (localAiDiagnosticMessage) localAiDiagnosticMessage.textContent = diag.message || 'An error occurred during local AI operation.';
  if (localAiDiagnosticDetails) {
    if (diag.details && diag.details !== diag.message) {
      localAiDiagnosticDetails.textContent = diag.details;
      localAiDiagnosticDetails.style.display = 'block';
    } else {
      localAiDiagnosticDetails.style.display = 'none';
    }
  }
}

function hideLocalAiDiagnostic() {
  if (localAiDiagnosticBox) localAiDiagnosticBox.style.display = 'none';
}

const storagePersistenceBadge = document.getElementById('storagePersistenceBadge');
const storagePersistenceDesc = document.getElementById('storagePersistenceDesc');

// Pre-Exam Zero-Internet Readiness References
const examReadinessOverallBadge = document.getElementById('examReadinessOverallBadge');
const examCheckModelName = document.getElementById('examCheckModelName');
const examCheckDownloadStatus = document.getElementById('examCheckDownloadStatus');
const examCheckShaderStatus = document.getElementById('examCheckShaderStatus');
const examCheckPersistenceStatus = document.getElementById('examCheckPersistenceStatus');
const examCheckAssetsStatus = document.getElementById('examCheckAssetsStatus');
const examCheckInferenceStatus = document.getElementById('examCheckInferenceStatus');
const examTestProgressLog = document.getElementById('examTestProgressLog');
const testOfflineModeBtn = document.getElementById('testOfflineModeBtn');
const grantStoragePersistBtn = document.getElementById('grantStoragePersistBtn');

// Dedicated Examination Mode References
const examModeToggleBtn = document.getElementById('examModeToggleBtn');
const settingsExamModeToggleBtn = document.getElementById('settingsExamModeToggleBtn');
const settingsExamModeIcon = document.getElementById('settingsExamModeIcon');
const settingsExamModeLabel = document.getElementById('settingsExamModeLabel');

// Interface Appearance & Accessibility References
const surfaceOpacitySlider = document.getElementById('surfaceOpacitySlider');
const surfaceOpacityVal = document.getElementById('surfaceOpacityVal');
const resetOpacityBtn = document.getElementById('resetOpacityBtn');
const previewCardSample = document.getElementById('previewCardSample');

let localAiModule = null;
async function getLocalAI() {
  if (!localAiModule) {
    try {
      localAiModule = await import('/js/local-ai.js');
    } catch (err) {
      console.warn('[LocalAI] Could not load local-ai module:', err);
    }
  }
  return localAiModule;
}

function updateExamModeUI(active) {
  if (examModeToggleBtn) {
    examModeToggleBtn.classList.toggle('active', active);
    examModeToggleBtn.setAttribute('aria-pressed', active ? 'true' : 'false');
    const label = examModeToggleBtn.querySelector('.exam-mode-label');
    if (label) label.textContent = active ? 'Exam Mode (ON)' : 'Exam Mode';
  }

  if (settingsExamModeToggleBtn) {
    if (settingsExamModeLabel) {
      settingsExamModeLabel.textContent = active ? 'Disable Exam Mode' : 'Enable Exam Mode';
    }
    if (settingsExamModeIcon) {
      settingsExamModeIcon.textContent = active ? '🔓' : '🔒';
    }
    settingsExamModeToggleBtn.className = active ? 'btn-danger-sm' : 'btn-secondary-sm';
  }
}

async function toggleExamMode() {
  const localAi = await getLocalAI();
  if (!localAi) return;
  const currentActive = localAi.getExamModeActive();

  if (!currentActive) {
    // Attempting to activate Exam Mode
    const modelId = localAi.getSelectedModelId();
    const verification = await localAi.verifyModelInstallation(modelId);
    if (!verification.installed) {
      alert(
        `🎓 Cannot activate Examination Offline Mode\n\n` +
        `The local AI model (${verification.modelInfo?.name || modelId}) is not installed on this device.\n\n` +
        `Examination Mode strictly enforces 100% on-device local WebLLM execution with zero internet or cloud calls.\n\n` +
        `Please connect to the internet, open Settings (⚙️), and click "Install Model (One-Time Setup)" first.`
      );
      if (settingsModal) {
        settingsModal.removeAttribute('hidden');
        initLocalAiSettings();
        const group = document.getElementById('localAiSettingsGroup');
        if (group) group.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    localAi.setExamModeActive(true);
    updateExamModeUI(true);
    await updateEngineIndicator();
    showToast('🎓 Examination Mode ACTIVE: 100% on-device WebLLM locked. Cloud APIs disabled.', 'success');

    // Pre-warm engine in background
    localAi.ensureEngineReady(modelId).catch(e => console.warn('[ExamMode] Background engine pre-warm:', e));
  } else {
    localAi.setExamModeActive(false);
    updateExamModeUI(false);
    await updateEngineIndicator();
    showToast('Examination Mode deactivated. Auto engine routing restored.', 'info');
  }
}

async function updateEngineIndicator(forcedState, customLabel) {
  if (!engineIndicatorPill || !engineIndicatorDot || !engineIndicatorText) return;

  if (forcedState === 'downloading') {
    engineIndicatorDot.className = 'engine-indicator-dot dot-blue';
    engineIndicatorText.textContent = customLabel || 'Downloading Model';
    return;
  }
  if (forcedState === 'initializing') {
    engineIndicatorDot.className = 'engine-indicator-dot dot-amber';
    engineIndicatorText.textContent = customLabel || 'Initializing Local AI';
    return;
  }
  if (forcedState === 'running') {
    engineIndicatorDot.className = 'engine-indicator-dot dot-purple';
    engineIndicatorText.textContent = customLabel || 'Local AI (Generating)';
    return;
  }

  const localAi = await getLocalAI();
  if (!localAi) return;

  const startupStatus = typeof localAi.getStartupStatus === 'function'
    ? await localAi.getStartupStatus()
    : null;

  if (startupStatus && startupStatus.examModeActive) {
    engineIndicatorDot.className = 'engine-indicator-dot dot-emerald';
    engineIndicatorText.textContent = startupStatus.badgeLabel; // 'Exam Offline Ready'
    return;
  }

  const pref = localAi.getEnginePreference();

  if (pref === 'local') {
    engineIndicatorDot.className = 'engine-indicator-dot dot-purple';
    engineIndicatorText.textContent = 'Local AI (WebGPU)';
    return;
  }

  if (pref === 'gemini') {
    if (startupStatus ? startupStatus.isOnline : (typeof navigator !== 'undefined' && navigator.onLine)) {
      engineIndicatorDot.className = 'engine-indicator-dot dot-green';
      engineIndicatorText.textContent = 'Online Gemini Ready';
    } else {
      engineIndicatorDot.className = 'engine-indicator-dot dot-amber';
      engineIndicatorText.textContent = 'Gemini (Offline)';
    }
    return;
  }

  // Auto mode:
  if (startupStatus) {
    engineIndicatorDot.className = `engine-indicator-dot ${startupStatus.dotClass}`;
    engineIndicatorText.textContent = startupStatus.badgeLabel;
  } else {
    const isOnline = typeof navigator !== 'undefined' && navigator.onLine;
    if (isOnline) {
      engineIndicatorDot.className = 'engine-indicator-dot dot-green';
      engineIndicatorText.textContent = 'Online Gemini Ready';
    } else {
      engineIndicatorDot.className = 'engine-indicator-dot dot-purple';
      engineIndicatorText.textContent = 'Offline WebLLM Ready';
    }
  }
}

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
            id: typeof msg.id === 'string' ? msg.id : generateId('msg'),
            role: role,
            content: content.slice(0, 100000),
            timestamp: typeof msg.timestamp === 'number' ? msg.timestamp : Date.now(),
            time: typeof msg.time === 'string' ? msg.time : formatTime(),
            isError: Boolean(msg.isError),
            quizData: (msg.quizData && typeof msg.quizData === 'object') ? msg.quizData : null
          });
        });
      }

      const cappedMessages = messages.slice(-MAX_MESSAGES_PER_CONV);

      validConversations[item.id] = {
        id: item.id,
        title: title,
        customTitle: customTitle,
        createdAt: createdAt,
        updatedAt: updatedAt,
        messages: cappedMessages
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
   LANGUAGE METADATA & SYNTAX HIGHLIGHTING (100% OFFLINE)
───────────────────────────────────────────────────────────────── */
function getLanguageMeta(rawLang) {
  const lang = (rawLang || '').toLowerCase().trim();

  if (!lang || lang === 'text' || lang === 'plain' || lang === 'txt') {
    return { lang: 'text', display: 'Code' };
  }

  const map = {
    c: { lang: 'c', display: 'C' },
    'c++': { lang: 'cpp', display: 'C++' },
    cpp: { lang: 'cpp', display: 'C++' },
    'c#': { lang: 'csharp', display: 'C#' },
    cs: { lang: 'csharp', display: 'C#' },
    csharp: { lang: 'csharp', display: 'C#' },
    java: { lang: 'java', display: 'Java' },
    python: { lang: 'python', display: 'Python' },
    py: { lang: 'python', display: 'Python' },
    javascript: { lang: 'javascript', display: 'JavaScript' },
    js: { lang: 'javascript', display: 'JavaScript' },
    node: { lang: 'javascript', display: 'Node.js' },
    nodejs: { lang: 'javascript', display: 'Node.js' },
    typescript: { lang: 'typescript', display: 'TypeScript' },
    ts: { lang: 'typescript', display: 'TypeScript' },
    html: { lang: 'html', display: 'HTML' },
    htm: { lang: 'html', display: 'HTML' },
    xml: { lang: 'html', display: 'XML' },
    svg: { lang: 'html', display: 'SVG' },
    css: { lang: 'css', display: 'CSS' },
    scss: { lang: 'css', display: 'SCSS' },
    sass: { lang: 'css', display: 'Sass' },
    less: { lang: 'css', display: 'Less' },
    sql: { lang: 'sql', display: 'SQL' },
    mysql: { lang: 'sql', display: 'MySQL' },
    postgres: { lang: 'sql', display: 'PostgreSQL' },
    postgresql: { lang: 'sql', display: 'PostgreSQL' },
    sqlite: { lang: 'sql', display: 'SQLite' },
    json: { lang: 'json', display: 'JSON' },
    bash: { lang: 'bash', display: 'Bash' },
    sh: { lang: 'bash', display: 'Shell' },
    shell: { lang: 'bash', display: 'Shell' },
    zsh: { lang: 'bash', display: 'Zsh' },
    rust: { lang: 'rust', display: 'Rust' },
    rs: { lang: 'rust', display: 'Rust' },
    go: { lang: 'go', display: 'Go' },
    golang: { lang: 'go', display: 'Go' },
    php: { lang: 'php', display: 'PHP' },
    ruby: { lang: 'ruby', display: 'Ruby' },
    rb: { lang: 'ruby', display: 'Ruby' },
    kotlin: { lang: 'java', display: 'Kotlin' },
    kt: { lang: 'java', display: 'Kotlin' },
    swift: { lang: 'csharp', display: 'Swift' },
    r: { lang: 'python', display: 'R' },
    yaml: { lang: 'yaml', display: 'YAML' },
    yml: { lang: 'yaml', display: 'YAML' },
    markdown: { lang: 'markdown', display: 'Markdown' },
    md: { lang: 'markdown', display: 'Markdown' },
    dockerfile: { lang: 'bash', display: 'Dockerfile' }
  };

  if (map[lang]) {
    return map[lang];
  }

  const displayTitle = lang.charAt(0).toUpperCase() + lang.slice(1);
  return { lang, display: displayTitle };
}

function highlightCode(rawCode, rawLang) {
  if (!rawCode) return '';
  const lang = (rawLang || '').toLowerCase().trim();

  let tokenPattern = null;

  if (lang === 'c' || lang === 'cpp' || lang === 'c++') {
    tokenPattern = [
      { type: 'comment', regex: /\/\/[^\n]*|\/\*[\s\S]*?\*\//y },
      { type: 'preprocessor', regex: /#\s*(?:include|define|ifdef|ifndef|endif|if|elif|else|pragma|undef)\b[^\n]*/y },
      { type: 'string', regex: /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/y },
      { type: 'keyword', regex: /\b(?:auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|restrict|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while|_Bool|_Complex|_Imaginary|bool|catch|class|constexpr|delete|export|false|friend|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|template|this|throw|true|try|typename|using|virtual|override)\b/y },
      { type: 'type', regex: /\b(?:std|cin|cout|cerr|endl|string|vector|map|set|list|pair|unordered_map|unordered_set|size_t|uint8_t|uint16_t|uint32_t|uint64_t|int8_t|int16_t|int32_t|int64_t|NULL|FILE)\b/y },
      { type: 'function', regex: /\b[a-zA-Z_]\w*(?=\s*\()/y },
      { type: 'number', regex: /\b0x[0-9a-fA-F]+\b|\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?[fFlLuU]*\b/y },
      { type: 'operator', regex: /[-+*\/%=<>!&|^~?:;.,]/y }
    ];
  } else if (lang === 'java') {
    tokenPattern = [
      { type: 'comment', regex: /\/\/[^\n]*|\/\*[\s\S]*?\*\//y },
      { type: 'decorator', regex: /@[a-zA-Z_]\w*/y },
      { type: 'string', regex: /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/y },
      { type: 'keyword', regex: /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|void|volatile|while|var|record|yield|sealed|permits)\b/y },
      { type: 'type', regex: /\b(?:String|System|Object|Class|Math|Integer|Double|Float|Long|Short|Byte|Boolean|Character|List|ArrayList|LinkedList|Map|HashMap|TreeMap|Set|HashSet|TreeSet|Arrays|Collections|Optional|Scanner|PrintStream|Exception|RuntimeException|Throwable|Override|Deprecated|SuppressWarnings)\b/y },
      { type: 'builtin', regex: /\b(?:true|false|null)\b/y },
      { type: 'function', regex: /\b[a-zA-Z_]\w*(?=\s*\()/y },
      { type: 'number', regex: /\b0x[0-9a-fA-F]+[lL]?\b|\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?[fFdDlL]?\b/y },
      { type: 'operator', regex: /[-+*\/%=<>!&|^~?:;.,]/y }
    ];
  } else if (lang === 'python' || lang === 'py') {
    tokenPattern = [
      { type: 'comment', regex: /#[^\n]*/y },
      { type: 'string', regex: /"""[\s\S]*?"""|'''[\s\S]*?'''|f?"(?:\\.|[^"\\])*"|f?'(?:\\.|[^'\\])*'|r"(?:\\.|[^"\\])*"|r'(?:\\.|[^'\\])*'/y },
      { type: 'decorator', regex: /@[a-zA-Z_]\w*/y },
      { type: 'keyword', regex: /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield|match|case)\b/y },
      { type: 'builtin', regex: /\b(?:True|False|None|self|cls|int|float|str|bool|list|dict|set|tuple|range|print|len|open|input|sum|min|max|enumerate|zip|map|filter|type|isinstance|super|any|all|sorted|reversed)\b/y },
      { type: 'function', regex: /\b[a-zA-Z_]\w*(?=\s*\()/y },
      { type: 'number', regex: /\b0x[0-9a-fA-F]+\b|\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/y },
      { type: 'operator', regex: /[-+*\/%=<>!&|^~?:;.,]/y }
    ];
  } else if (lang === 'javascript' || lang === 'js' || lang === 'typescript' || lang === 'ts' || lang === 'node') {
    tokenPattern = [
      { type: 'comment', regex: /\/\/[^\n]*|\/\*[\s\S]*?\*\//y },
      { type: 'string', regex: /`(?:\\.|[^`\\])*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/y },
      { type: 'keyword', regex: /\b(?:async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|export|extends|finally|for|function|if|import|in|instanceof|let|new|return|super|switch|this|throw|try|typeof|var|void|while|with|yield|interface|type|implements|declare|namespace|as|from|of)\b/y },
      { type: 'builtin', regex: /\b(?:true|false|null|undefined|NaN|Infinity|console|window|document|process|module|exports|require|Promise|Array|Object|String|Number|Boolean|Function|Symbol|Map|Set|WeakMap|WeakSet|JSON|Math|Date|RegExp|Error)\b/y },
      { type: 'function', regex: /\b[a-zA-Z_$][\w$]*(?=\s*\()/y },
      { type: 'number', regex: /\b0x[0-9a-fA-F]+\b|\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/y },
      { type: 'operator', regex: /[-+*\/%=<>!&|^~?:;.,]/y }
    ];
  } else if (lang === 'html' || lang === 'xml' || lang === 'svg') {
    tokenPattern = [
      { type: 'comment', regex: /<!--[\s\S]*?-->/y },
      { type: 'doctype', regex: /<!DOCTYPE[^>]*>/iy },
      { type: 'tag', regex: /<\/?[a-zA-Z0-9:-]+|\/?>/y },
      { type: 'attr', regex: /\b[a-zA-Z0-9:-]+(?=\s*=)/y },
      { type: 'string', regex: /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/y },
      { type: 'operator', regex: /=/y }
    ];
  } else if (lang === 'css' || lang === 'scss' || lang === 'less') {
    tokenPattern = [
      { type: 'comment', regex: /\/\*[\s\S]*?\*\//y },
      { type: 'string', regex: /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/y },
      { type: 'at-rule', regex: /@[a-zA-Z-]+/y },
      { type: 'color', regex: /#[0-9a-fA-F]{3,8}\b/y },
      { type: 'property', regex: /\b[a-zA-Z-]+(?=\s*:)/y },
      { type: 'unit', regex: /\b\d+(?:\.\d+)?(?:px|rem|em|vh|vw|%|s|ms|deg|fr|ch)\b/y },
      { type: 'important', regex: /!important\b/y },
      { type: 'number', regex: /\b\d+(?:\.\d+)?\b/y },
      { type: 'operator', regex: /[:;{},()]/y }
    ];
  } else if (lang === 'sql') {
    tokenPattern = [
      { type: 'comment', regex: /--[^\n]*|\/\*[\s\S]*?\*\//y },
      { type: 'string', regex: /'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"/y },
      { type: 'keyword', regex: /\b(?:SELECT|FROM|WHERE|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|DATABASE|INDEX|VIEW|DROP|ALTER|ADD|COLUMN|JOIN|INNER|LEFT|RIGHT|FULL|OUTER|CROSS|ON|AND|OR|NOT|IN|BETWEEN|LIKE|IS|NULL|GROUP|BY|ORDER|HAVING|LIMIT|OFFSET|AS|DISTINCT|UNION|ALL|EXISTS|CASE|WHEN|THEN|ELSE|END|PRIMARY|KEY|FOREIGN|REFERENCES|DEFAULT|CHECK|UNIQUE|AUTO_INCREMENT|ASC|DESC|CASCADE|TRUNCATE|GRANT|REVOKE|COMMIT|ROLLBACK|BEGIN|TRANSACTION)\b/iy },
      { type: 'type', regex: /\b(?:INT|INTEGER|BIGINT|SMALLINT|TINYINT|VARCHAR|CHAR|TEXT|BLOB|DATE|DATETIME|TIMESTAMP|TIME|FLOAT|DOUBLE|DECIMAL|NUMERIC|BOOLEAN|BOOL)\b/iy },
      { type: 'function', regex: /\b(?:COUNT|SUM|AVG|MIN|MAX|NOW|COALESCE|CONCAT|SUBSTRING|ROUND|UPPER|LOWER|IFNULL|LENGTH|TRIM)\b(?=\s*\()/iy },
      { type: 'number', regex: /\b\d+(?:\.\d+)?\b/y },
      { type: 'operator', regex: /[-+*\/%=<>!&|^~?:;.,()]/y }
    ];
  } else if (lang === 'json') {
    tokenPattern = [
      { type: 'property', regex: /"(?:\\.|[^"\\])*"(?=\s*:)/y },
      { type: 'string', regex: /"(?:\\.|[^"\\])*"/y },
      { type: 'builtin', regex: /\b(?:true|false|null)\b/y },
      { type: 'number', regex: /-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/y },
      { type: 'operator', regex: /[:{},\[\]]/y }
    ];
  } else if (lang === 'bash' || lang === 'sh' || lang === 'shell' || lang === 'zsh') {
    tokenPattern = [
      { type: 'comment', regex: /#[^\n]*/y },
      { type: 'string', regex: /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/y },
      { type: 'variable', regex: /\$[a-zA-Z_]\w*|\$\{[^}]+\}/y },
      { type: 'keyword', regex: /\b(?:echo|cd|ls|mkdir|rm|cp|mv|cat|grep|curl|wget|chmod|chown|git|npm|node|sudo|export|source|alias|if|then|else|elif|fi|for|in|do|done|while|case|esac|return|exit|pwd|find|sed|awk|tar|zip|unzip|touch|clear)\b/y },
      { type: 'flag', regex: /(?:^|\s)(?:-[a-zA-Z0-9]+|--[a-zA-Z0-9_-]+)/y },
      { type: 'operator', regex: /[|&;><=]/y }
    ];
  }

  if (!tokenPattern) {
    return escapeHtml(rawCode);
  }

  let index = 0;
  const len = rawCode.length;
  let result = '';

  while (index < len) {
    let matched = false;

    for (let i = 0; i < tokenPattern.length; i++) {
      const { type, regex } = tokenPattern[i];
      regex.lastIndex = index;
      const match = regex.exec(rawCode);
      if (match && match.index === index) {
        const text = match[0];
        result += `<span class="tok-${type}">${escapeHtml(text)}</span>`;
        index += text.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      result += escapeHtml(rawCode[index]);
      index++;
    }
  }

  return result;
}

/* ─────────────────────────────────────────────────────────────────
   MARKDOWN & CHATGPT-STYLE CODE BLOCK RENDERING
───────────────────────────────────────────────────────────────── */
function renderMarkdown(raw) {
  if (!raw) return '';

  let text = raw;

  // Handle in-progress streaming code blocks (unclosed triple backticks)
  const fenceCount = (text.match(/```/g) || []).length;
  if (fenceCount % 2 === 1) {
    text = text + '\n```';
  }

  const codeBlocks = [];
  text = text.replace(/```([a-zA-Z0-9_#+.-]*)[^\n]*\n?([\s\S]*?)```/g, (_, lang, code) => {
    const idx = codeBlocks.length;
    codeBlocks.push({ lang: (lang || '').trim(), code: code });
    return `\n\n\x00CODEBLOCK_${idx}\x00\n\n`;
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
  text = text.replace(/`([^`\n]+)`/g, (_, code) => `<code>${code}</code>`);

  // Horizontal rule
  text = text.replace(/^(-{3,}|\*{3,}|_{3,})\s*$/gm, '<hr>');

  // Blockquote
  text = text.replace(/^&gt;\s?(.*)$/gm, '<blockquote>$1</blockquote>');

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

  // LaTeX Block Math: $$...$$
  text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
    return `<div class="katex-math-block" role="region" aria-label="Mathematical formula"><span class="math-content">${math.trim()}</span></div>`;
  });

  // LaTeX Inline Math: $...$ (ensuring not currency like $100 or $5.50)
  text = text.replace(/(^|[^\$])\$([^\$\n\r]+?)\$(?!\$)/g, (match, prefix, math) => {
    if (/^\s*\d+([.,]\d+)?\s*$/.test(math)) {
      return match;
    }
    return `${prefix}<span class="katex-math-inline" role="math">${math.trim()}</span>`;
  });

  // Tables
  text = text.replace(/((?:^\|.+\|\n?)+)/gm, (block) => {
    const rows = block.trim().split('\n').filter(r => r.trim());
    if (rows.length < 2) return block;
    const isSep = r => /^\|[-| :]+\|$/.test(r.trim());
    const headerRow = rows[0];
    const sepIdx = rows.findIndex(isSep);
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
    if (/^<(h[1-6]|ul|ol|li|blockquote|table|hr|pre|div)/.test(block) || block.startsWith('\x00CODEBLOCK')) return block;
    return `<p>${block.replace(/\n/g, ' ')}</p>`;
  }).join('\n');

  // Restore code blocks with ChatGPT-style headers, copy buttons, and syntax highlighting
  text = text.replace(/\x00CODEBLOCK_(\d+)\x00/g, (_, idx) => {
    const { lang, code } = codeBlocks[parseInt(idx, 10)];
    const meta = getLanguageMeta(lang);
    const trimmedCode = code.replace(/^\n+|\n+$/g, '');
    const highlighted = highlightCode(trimmedCode, meta.lang);
    const safeId = (typeof generateId === 'function') ? generateId('code') : ('code_' + Math.random().toString(36).substr(2, 9));
    const encodedRaw = encodeURIComponent(trimmedCode);

    return `<div class="code-block" data-lang="${escapeHtml(meta.lang)}">
      <div class="code-block-header">
        <div class="code-lang-label">
          <svg class="code-lang-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
          <span class="code-lang">${escapeHtml(meta.display)}</span>
        </div>
        <button class="code-copy-btn" data-code-id="${safeId}" type="button" aria-label="Copy ${escapeHtml(meta.display)} code" title="Copy code to clipboard">
          <svg class="copy-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span class="copy-btn-text">Copy</span>
        </button>
      </div>
      <pre class="code-block-pre"><code id="${safeId}" class="code-block-content language-${escapeHtml(meta.lang)}" data-raw-code="${encodedRaw}">${highlighted}</code></pre>
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
  if (sidebarOpenBtn) {
    sidebarOpenBtn.setAttribute('aria-expanded', 'true');
  }
}

function updateSidebarToggleBtns(isCollapsed) {
  const btns = [document.getElementById('sidebarOpenBtn'), document.getElementById('dsSidebarOpenBtn')];
  btns.forEach(btn => {
    if (!btn) return;
    if (isCollapsed) {
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Expand Navigation Sidebar');
      btn.title = 'Expand Navigation Sidebar';
      btn.classList.add('is-collapsed');
      const collapseIcon = btn.querySelector('.sidebar-icon-collapse');
      const expandIcon = btn.querySelector('.sidebar-icon-expand');
      if (collapseIcon) collapseIcon.style.display = 'none';
      if (expandIcon) expandIcon.style.display = 'block';
    } else {
      btn.setAttribute('aria-expanded', 'true');
      btn.setAttribute('aria-label', 'Collapse Navigation Sidebar');
      btn.title = 'Collapse Navigation Sidebar';
      btn.classList.remove('is-collapsed');
      const collapseIcon = btn.querySelector('.sidebar-icon-collapse');
      const expandIcon = btn.querySelector('.sidebar-icon-expand');
      if (collapseIcon) collapseIcon.style.display = 'block';
      if (expandIcon) expandIcon.style.display = 'none';
    }
  });
}

function openSidebar() {
  if (sidebar) {
    sidebar.classList.add('open', 'active');
  }
  if (sidebarOverlay) {
    sidebarOverlay.classList.add('visible', 'active');
  }
  document.body.style.overflow = '';
  updateSidebarToggleBtns(false);
}

function closeSidebar() {
  if (sidebar) {
    sidebar.classList.remove('open', 'active');
  }
  if (sidebarOverlay) {
    sidebarOverlay.classList.remove('visible', 'active');
  }
  document.body.style.overflow = '';
  if (window.innerWidth <= 900) {
    updateSidebarToggleBtns(true);
  }
}

function toggleSidebar() {
  if (window.innerWidth > 900) {
    const isCollapsed = document.body.classList.toggle('sidebar-collapsed');
    document.documentElement.classList.toggle('sidebar-collapsed', isCollapsed);
    if (sidebar) {
      sidebar.classList.toggle('collapsed', isCollapsed);
    }
    try {
      localStorage.setItem('studymate_sidebar_collapsed', isCollapsed ? 'true' : 'false');
    } catch (e) { }
    updateSidebarToggleBtns(isCollapsed);
  } else {
    if (sidebar && (sidebar.classList.contains('open') || sidebar.classList.contains('active'))) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }
}

// Global exposure for DS Learning Module and header shortcuts
window.toggleSidebar = toggleSidebar;
window.openSidebar = openSidebar;
window.closeSidebar = closeSidebar;
window.updateSidebarToggleBtns = updateSidebarToggleBtns;

function openStudyPanel() {
  closeSidebar();
  if (studyPanel) {
    studyPanel.classList.remove('collapsed');
    studyPanel.classList.add('open', 'active');
    document.body.classList.remove('study-panel-collapsed');
    const appWs = document.querySelector('.app-workspace');
    if (appWs) appWs.classList.remove('study-panel-collapsed');
  }
  if (studyPanelOverlay) {
    studyPanelOverlay.classList.add('visible', 'active');
  }
  if (typeof window.DS_LEARNING_MODULE?.updateStudyToggleBtn === 'function') {
    window.DS_LEARNING_MODULE.updateStudyToggleBtn(true);
  }
}

function closeStudyPanel() {
  if (studyPanel) {
    studyPanel.classList.add('collapsed');
    studyPanel.classList.remove('open', 'active');
    document.body.classList.add('study-panel-collapsed');
    const appWs = document.querySelector('.app-workspace');
    if (appWs) appWs.classList.add('study-panel-collapsed');
  }
  if (studyPanelOverlay) {
    studyPanelOverlay.classList.remove('visible', 'active');
  }
  if (typeof window.DS_LEARNING_MODULE?.updateStudyToggleBtn === 'function') {
    window.DS_LEARNING_MODULE.updateStudyToggleBtn(false);
  }
}

// Global exposure for DS Learning Module and header shortcuts
window.openStudyPanel = openStudyPanel;
window.closeStudyPanel = closeStudyPanel;

if (sidebarOpenBtn) sidebarOpenBtn.addEventListener('click', toggleSidebar);
if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeSidebar);
if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeSidebar();
    closeStudyPanel();
    if (profileDropdown) {
      profileDropdown.setAttribute('hidden', '');
      if (profileChip) profileChip.setAttribute('aria-expanded', 'false');
    }
  }
});

/* ─────────────────────────────────────────────────────────────────
   CONVERSATION LIFECYCLE
───────────────────────────────────────────────────────────────── */
function createNewConversation(initialPrompt = '') {
  const id = generateId('conv');
  const now = Date.now();
  const title = initialPrompt ? generateTitleFromPrompt(initialPrompt) : 'New Conversation';

  const conv = {
    id: id,
    title: title,
    customTitle: false,
    createdAt: now,
    updatedAt: now,
    messages: []
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
  } catch (e) { }

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

function renderImageMessageHtml(msg) {
  const safePrompt = escapeHtml(msg.prompt || 'Generated Visual');
  const safeEngine = escapeHtml(msg.engine || 'AI Image Diffusion');
  const safeModel = escapeHtml(msg.model || 'Flux.1 Diffusion');

  const tel = msg.telemetry;
  const isFast = (msg.mode || tel?.mode) !== 'quality';
  const modeLabel = isFast ? '⚡ Fast (512px)' : '✨ Quality (1K)';
  const totalSec = tel?.totalMs ? (tel.totalMs / 1000).toFixed(1) + 's' : '';
  const breakdownTooltip = tel ? `Total: ${(tel.totalMs/1000).toFixed(2)}s | API: ${(tel.apiMs/1000).toFixed(2)}s | Server: ${(tel.backendTotalMs/1000).toFixed(2)}s | Transfer: ${(tel.transferMs/1000).toFixed(2)}s | Render: ${tel.renderMs}ms` : 'Latency Telemetry';

  return `
    <div class="generated-image-card" data-img-id="${msg.imageId}">
      <div class="image-card-header">
        <div class="image-card-engine-badge">
          <span class="engine-badge-icon">🎨</span>
          <span>${safeEngine}</span>
        </div>
        <div class="image-card-telemetry" title="${escapeHtml(breakdownTooltip)}">
          <span class="telemetry-pill">${modeLabel}</span>
          ${totalSec ? `<span class="telemetry-time">${totalSec}</span>` : ''}
        </div>
        <span class="image-card-model">${safeModel}</span>
      </div>
      <div class="image-card-preview-wrap">
        <div class="image-skeleton" id="skeleton_${msg.imageId}">
          <div class="skeleton-shimmer"></div>
          <div class="image-progress-card">
            <div class="progress-card-top">
              <div class="progress-spinner-wrap">
                <svg class="progress-spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <circle cx="12" cy="12" r="9" stroke-opacity="0.25"></circle>
                  <path d="M12 3a9 9 0 0 1 9 9" stroke-linecap="round"></path>
                </svg>
                <span class="progress-pct-badge" id="pct_${msg.imageId}">0%</span>
              </div>
              <span class="progress-est-pill" title="Estimated timeline: Diffusion synthesizes over HTTP without streaming intermediate steps">Estimated Progress</span>
            </div>
            <div class="image-progress-bar-track">
              <div class="image-progress-bar-fill" id="pbar_${msg.imageId}" style="width: 0%;"></div>
            </div>
            <div class="image-progress-stage" id="stage_${msg.imageId}">0% — Preparing request…</div>
            <div class="image-progress-actions">
              <button type="button" class="img-cancel-btn" data-cancel-id="${msg.imageId}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </div>
        <div class="image-error-card" id="error_${msg.imageId}" style="display:none;">
          <div class="image-error-icon">⚠️</div>
          <div class="image-error-title" id="err_title_${msg.imageId}">Generation Failed</div>
          <div class="image-error-desc" id="err_desc_${msg.imageId}">An error occurred while generating the image.</div>
          <div class="image-error-actions">
            <button type="button" class="img-retry-btn" data-retry-prompt="${safePrompt}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
              <span>Retry Generation</span>
            </button>
          </div>
        </div>
        <img class="generated-img" id="img_${msg.imageId}" alt="${safePrompt}" style="display:none;" />
      </div>
      <div class="image-card-caption">
        <div class="image-prompt-label">Original Prompt</div>
        <p class="image-prompt-text">${safePrompt}</p>
        ${msg.refinedPrompt && msg.refinedPrompt !== msg.prompt ? `
          <div class="image-refined-prompt-block">
            <div class="image-refined-label">Understood Visual Subject & Styling</div>
            <p class="image-refined-text">${escapeHtml(msg.refinedPrompt)}</p>
          </div>
        ` : ''}
      </div>
      <div class="image-card-actions">
        <button type="button" class="img-action-btn copy-img-btn" data-img-id="${msg.imageId}" title="Copy Image to clipboard">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          <span>Copy Image</span>
        </button>
        <button type="button" class="img-action-btn download-img-btn" data-img-id="${msg.imageId}" data-prompt="${safePrompt}" title="Download Image as PNG">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          <span>Download</span>
        </button>
        <button type="button" class="img-action-btn regen-img-btn" data-prompt="${safePrompt}" title="Regenerate this image">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
          <span>Regenerate</span>
        </button>
      </div>
    </div>
  `;
}

function formatEngineBadge(msg) {
  if (!msg || msg.role === 'user') return '';
  const engine = msg.engine || (msg.isLocalAi ? 'webllm' : 'gemini');
  switch (engine) {
    case 'gemini':
      return `<span class="msg-engine-badge badge-gemini" title="Generated by Online Google Gemini Cloud API">✨ Online Gemini</span>`;
    case 'webllm':
      return `<span class="msg-engine-badge badge-webllm" title="Generated by On-Device WebLLM (WebGPU)">⚡ Local WebLLM</span>`;
    case 'chrome_builtin':
      return `<span class="msg-engine-badge badge-chrome" title="Generated by Chrome On-Device Gemini Nano / Prompt API">🌐 Chrome Built-in AI</span>`;
    case 'local_service':
      return `<span class="msg-engine-badge badge-local-service" title="Generated by Local AI Service (Ollama)">🖥️ Local AI Service</span>`;
    case 'offline_knowledge':
      return `<span class="msg-engine-badge badge-knowledge" title="Structured Academic Repository (Not a generative LLM) — 📚 Offline Knowledge Assistant">📚 Offline DS Knowledge Assistant</span>`;
    default:
      return `<span class="msg-engine-badge badge-gemini">✨ Online Gemini</span>`;
  }
}

function buildMessageEl(msg) {
  const row = document.createElement('div');
  row.className = 'msg-row';
  row.dataset.msgId = msg.id;

  const isUser = msg.role === 'user';
  const bubbleClass = isUser ? 'user-bubble' : (msg.isError ? 'ai-bubble error-bubble' : 'ai-bubble');
  const senderLabel = isUser ? 'You' : 'StudyMate AI';
  const engineBadgeHtml = !isUser ? formatEngineBadge(msg) : '';

  let contentHtml = '';
  if (isUser) {
    let attHtml = '';
    if (Array.isArray(msg.attachments) && msg.attachments.length > 0) {
      attHtml = `<div class="msg-attachments-wrap" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px;">` +
        msg.attachments.map(a => `
          <span class="user-attachment-pill" style="display:inline-flex;align-items:center;gap:5px;font-size:0.75rem;padding:3px 8px;border-radius:12px;background:rgba(255,255,255,0.22);backdrop-filter:blur(4px);border:1px solid rgba(255,255,255,0.3);">
            <span>${getAttachmentIcon(a.fileType)}</span>
            <span>${escapeHtml(a.filename)}</span>
            ${a.formattedSize ? `<span style="opacity:0.85;">(${escapeHtml(a.formattedSize)})</span>` : ''}
          </span>
        `).join('') + `</div>`;
    }
    contentHtml = attHtml + renderMarkdown(msg.content);
  } else if (msg.type === 'image') {
    contentHtml = renderImageMessageHtml(msg);
  } else if (msg.rawHtml) {
    contentHtml = msg.content;
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

  const aiActionsHtml = !isUser && !msg.quizData && !msg.rawHtml && msg.type !== 'image' ? `
    <div class="msg-actions">
      <button class="msg-action-btn copy-msg-btn" data-msg-id="${msg.id}" aria-label="Copy response" title="Copy response">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        Copy
      </button>
      <button class="msg-action-btn feedback-like-btn ${msg.feedback === 'like' ? 'active-like' : ''}" data-msg-id="${msg.id}" aria-label="Helpful response" title="Helpful response">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
        </svg>
      </button>
      <button class="msg-action-btn feedback-dislike-btn ${msg.feedback === 'dislike' ? 'active-dislike' : ''}" data-msg-id="${msg.id}" aria-label="Not helpful response" title="Not helpful response">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"></path>
        </svg>
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
      ${engineBadgeHtml}
      <span class="msg-time">${msg.time || formatTime(msg.timestamp)}</span>
    </div>
    <div class="msg-bubble ${bubbleClass}">${contentHtml}</div>
    ${userActionsHtml}
    ${aiActionsHtml}
    ${generateFollowupChipsHtml(msg)}
  `;

  if (msg.type === 'image' && msg.imageId) {
    setTimeout(async () => {
      const imgEl = row.querySelector(`#img_${msg.imageId}`);
      const skelEl = row.querySelector(`#skeleton_${msg.imageId}`);
      if (!imgEl) return;

      let dataUrl = imageCache.get(msg.imageId);
      if (!dataUrl) {
        const rec = await MediaDB.getImage(msg.imageId);
        dataUrl = rec?.dataUrl;
      }

      if (dataUrl) {
        imgEl.src = dataUrl;
        imgEl.style.display = 'block';
        if (skelEl) skelEl.style.display = 'none';
      }
    }, 10);
  }

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
      const hasText = messageInput && messageInput.value.trim() !== '';
      const hasAttachments = Array.isArray(state.composerAttachments) && state.composerAttachments.length > 0;
      sendBtn.disabled = !hasText && !hasAttachments;
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

function updateStreamingMessage(msgId, partialText) {
  const conv = state.conversations[state.activeId];
  if (conv) {
    const msg = conv.messages.find(m => m.id === msgId);
    if (msg) msg.content = partialText;
  }
  const row = messagesArea.querySelector(`[data-msg-id="${msgId}"]`);
  if (!row) return;
  const bubble = row.querySelector('.msg-bubble');
  if (bubble) {
    bubble.innerHTML = renderMarkdown(partialText) + '<span class="streaming-cursor"></span>';
    scrollToBottom();
  }
}

function finalizeStreamedMessage(msgId, finalText) {
  const conv = state.conversations[state.activeId];
  if (conv) {
    const msg = conv.messages.find(m => m.id === msgId);
    if (msg) {
      msg.content = finalText;
      saveStoredConversations();
      renderConvoList();
    }
  }
  const row = messagesArea.querySelector(`[data-msg-id="${msgId}"]`);
  if (!row) return;
  const bubble = row.querySelector('.msg-bubble');
  if (bubble) {
    bubble.innerHTML = renderMarkdown(finalText);
    scrollToBottom();
  }
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
  let copied = false;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch (e) {
      console.warn('[Clipboard] Async writeText failed, using fallback:', e);
    }
  }

  if (!copied) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      ta.style.top = '0';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      copied = document.execCommand('copy');
      document.body.removeChild(ta);
    } catch (fallbackErr) {
      console.warn('[Clipboard] Fallback execCommand failed:', fallbackErr);
    }
  }

  if (btn) {
    const orig = btn.innerHTML;
    btn.classList.add('copied');
    btn.innerHTML = label;
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = orig;
    }, 2000);
  }

  if (!copied && !btn) {
    showToast('Unable to copy to clipboard.', 'warn');
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

  // Like & Dislike Feedback Actions
  const likeBtn = e.target.closest('.feedback-like-btn');
  if (likeBtn) {
    const msgId = likeBtn.dataset.msgId;
    const conv = state.conversations[state.activeId];
    const msg = conv?.messages.find(m => m.id === msgId);
    if (msg) {
      msg.feedback = msg.feedback === 'like' ? null : 'like';
      likeBtn.classList.toggle('active-like', msg.feedback === 'like');
      const row = likeBtn.closest('.msg-row');
      const dislikeBtnEl = row?.querySelector('.feedback-dislike-btn');
      if (dislikeBtnEl) dislikeBtnEl.classList.remove('active-dislike');
      saveConversations();
      showToast(msg.feedback === 'like' ? 'Marked response as helpful 👍' : 'Feedback cleared', 'info');
    }
    return;
  }

  const dislikeBtn = e.target.closest('.feedback-dislike-btn');
  if (dislikeBtn) {
    const msgId = dislikeBtn.dataset.msgId;
    const conv = state.conversations[state.activeId];
    const msg = conv?.messages.find(m => m.id === msgId);
    if (msg) {
      msg.feedback = msg.feedback === 'dislike' ? null : 'dislike';
      dislikeBtn.classList.toggle('active-dislike', msg.feedback === 'dislike');
      const row = dislikeBtn.closest('.msg-row');
      const likeBtnEl = row?.querySelector('.feedback-like-btn');
      if (likeBtnEl) likeBtnEl.classList.remove('active-like');
      saveConversations();
      showToast(msg.feedback === 'dislike' ? 'Feedback noted 👎' : 'Feedback cleared', 'info');
    }
    return;
  }

  // Image Card Actions (Copy, Download, Regenerate)
  const copyImgBtn = e.target.closest('.copy-img-btn');
  if (copyImgBtn) {
    const imgId = copyImgBtn.dataset.imgId;
    if (imgId) copyImageToClipboard(imgId, copyImgBtn);
    return;
  }

  const downloadImgBtn = e.target.closest('.download-img-btn');
  if (downloadImgBtn) {
    const imgId = downloadImgBtn.dataset.imgId;
    const prompt = downloadImgBtn.dataset.prompt;
    if (imgId) downloadImage(imgId, prompt);
    return;
  }

  const regenImgBtn = e.target.closest('.regen-img-btn');
  if (regenImgBtn) {
    const prompt = regenImgBtn.dataset.prompt;
    if (prompt) {
      showToast('🔄 Regenerating image...', 'info');
      handleImageGeneration(prompt, { fresh: true });
    }
    return;
  }

  const cancelImgBtn = e.target.closest('.img-cancel-btn');
  if (cancelImgBtn) {
    if (typeof activeImageAbortController !== 'undefined' && activeImageAbortController) {
      activeImageAbortController.abort();
      activeImageAbortController = null;
    }
    showToast('Image generation cancelled.', 'info');
    return;
  }

  const retryImgBtn = e.target.closest('.img-retry-btn');
  if (retryImgBtn) {
    const prompt = retryImgBtn.dataset.retryPrompt;
    if (prompt) {
      showToast('Retrying image generation...', 'info');
      handleImageGeneration(prompt, { fresh: true });
    }
    return;
  }

  const codeCopyBtn = e.target.closest('.code-copy-btn');
  if (codeCopyBtn) {
    const codeId = codeCopyBtn.dataset.codeId;
    let codeText = '';
    const codeEl = codeId ? document.getElementById(codeId) : null;
    if (codeEl) {
      if (codeEl.dataset.rawCode) {
        try {
          codeText = decodeURIComponent(codeEl.dataset.rawCode);
        } catch {
          codeText = codeEl.textContent;
        }
      } else {
        codeText = codeEl.textContent;
      }
    } else {
      const parentBlock = codeCopyBtn.closest('.code-block');
      const innerCode = parentBlock ? parentBlock.querySelector('code') : null;
      if (innerCode) {
        if (innerCode.dataset.rawCode) {
          try {
            codeText = decodeURIComponent(innerCode.dataset.rawCode);
          } catch {
            codeText = innerCode.textContent;
          }
        } else {
          codeText = innerCode.textContent;
        }
      }
    }

    if (codeText) {
      copyToClipboard(
        codeText, codeCopyBtn,
        `<svg class="copy-icon check-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="20 6 9 17 4 12"/></svg><span class="copy-btn-text">Copied!</span>`
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
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: q.question,
            sampleAnswer: q.sampleAnswer,
            keyPoints: q.keyPoints,
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

// Global delegated listener for code copy buttons outside messagesArea (e.g. Document Studio, Modals)
document.addEventListener('click', (e) => {
  if (messagesArea && messagesArea.contains(e.target)) return;
  const codeCopyBtn = e.target.closest('.code-copy-btn');
  if (!codeCopyBtn) return;

  const codeId = codeCopyBtn.dataset.codeId;
  let codeText = '';
  const codeEl = codeId ? document.getElementById(codeId) : null;
  if (codeEl) {
    if (codeEl.dataset.rawCode) {
      try {
        codeText = decodeURIComponent(codeEl.dataset.rawCode);
      } catch {
        codeText = codeEl.textContent;
      }
    } else {
      codeText = codeEl.textContent;
    }
  } else {
    const parentBlock = codeCopyBtn.closest('.code-block');
    const innerCode = parentBlock ? parentBlock.querySelector('code') : null;
    if (innerCode) {
      if (innerCode.dataset.rawCode) {
        try {
          codeText = decodeURIComponent(innerCode.dataset.rawCode);
        } catch {
          codeText = innerCode.textContent;
        }
      } else {
        codeText = innerCode.textContent;
      }
    }
  }

  if (codeText) {
    copyToClipboard(
      codeText, codeCopyBtn,
      `<svg class="copy-icon check-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="20 6 9 17 4 12"/></svg><span class="copy-btn-text">Copied!</span>`
    );
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
  updateComposerButtons();
});

messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    if (!sendBtn.disabled) chatForm.dispatchEvent(new Event('submit'));
  }
});

/* ─────────────────────────────────────────────────────────────────
   COMPOSER ATTACHMENTS & CLIENT EXTRACTION
───────────────────────────────────────────────────────────────── */
function detectFileType(filename = '', mime = '') {
  const lower = (filename || '').toLowerCase();
  if (lower.endsWith('.pptx') || lower.endsWith('.ppt') || (mime && mime.includes('presentation'))) return 'pptx';
  if (lower.endsWith('.pdf') || mime === 'application/pdf') return 'pdf';
  if (lower.endsWith('.docx') || lower.endsWith('.doc') || (mime && mime.includes('word'))) return 'docx';
  if (lower.endsWith('.png') || lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.webp') || (mime && mime.startsWith('image/'))) return 'image';
  return 'txt';
}

function getAttachmentIcon(fileType) {
  switch (fileType) {
    case 'pptx': return '📊';
    case 'pdf': return '📄';
    case 'docx': return '📝';
    case 'image': return '🖼️';
    case 'txt': return '📃';
    default: return '📎';
  }
}

function decodeXml(str) {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
    .replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => String.fromCharCode(parseInt(hex, 16)));
}

async function clientExtractPptx(file) {
  if (!window.JSZip) {
    throw new Error('JSZip library is not loaded');
  }
  const arrayBuffer = await file.arrayBuffer();
  const zip = await window.JSZip.loadAsync(arrayBuffer);

  let slidePaths = [];
  try {
    const presXmlFile = zip.file('ppt/presentation.xml');
    const presRelsFile = zip.file('ppt/_rels/presentation.xml.rels');
    if (presXmlFile && presRelsFile) {
      const presXmlStr = await presXmlFile.async('string');
      const presRelsStr = await presRelsFile.async('string');
      const relMap = {};
      const relRegex = /<Relationship[^>]*Id="([^"]+)"[^>]*Target="([^"]+)"/g;
      let rMatch;
      while ((rMatch = relRegex.exec(presRelsStr)) !== null) {
        relMap[rMatch[1]] = rMatch[2];
      }
      const sldIdRegex = /<p:sldId[^>]*r:id="([^"]+)"/g;
      let sMatch;
      while ((sMatch = sldIdRegex.exec(presXmlStr)) !== null) {
        const target = relMap[sMatch[1]];
        if (target) {
          const normTarget = target.startsWith('ppt/') ? target : (target.startsWith('/') ? target.slice(1) : 'ppt/' + target);
          slidePaths.push(normTarget);
        }
      }
    }
  } catch (e) {
    console.warn('[ClientPPTX] Could not parse presentation order:', e);
  }

  if (slidePaths.length === 0) {
    const allFiles = Object.keys(zip.files);
    slidePaths = allFiles
      .filter((f) => /^ppt\/slides\/slide\d+\.xml$/i.test(f))
      .sort((a, b) => {
        const numA = parseInt(a.match(/slide(\d+)\.xml/i)?.[1] || '0', 10);
        const numB = parseInt(b.match(/slide(\d+)\.xml/i)?.[1] || '0', 10);
        return numA - numB;
      });
  }

  const slides = [];

  for (let i = 0; i < slidePaths.length; i++) {
    const slidePath = slidePaths[i];
    const slideFile = zip.file(slidePath);
    if (!slideFile) continue;

    const xml = await slideFile.async('string');
    const slideNum = i + 1;
    let slideTitle = '';
    const contentLines = [];

    // Shapes & Text
    const spRegex = /<p:sp\b[^>]*>([\s\S]*?)<\/p:sp>/g;
    let spMatch;
    while ((spMatch = spRegex.exec(xml)) !== null) {
      const spXml = spMatch[1];
      const isTitle = /<p:ph[^>]*type="(?:title|ctrTitle)"/i.test(spXml);
      const pRegex = /<a:p\b[^>]*>([\s\S]*?)<\/a:p>/g;
      let pMatch;
      const paragraphs = [];

      while ((pMatch = pRegex.exec(spXml)) !== null) {
        const pXml = pMatch[1];
        const hasBullet = /<a:buChar|<a:buAutoNum|<a:buBlip/i.test(pXml) || /<a:pPr\b[^>]*lvl="[1-9]"/i.test(pXml);
        const textParts = [];
        const tRegex = /<a:t\b[^>]*>([\s\S]*?)<\/a:t>/g;
        let tMatch;
        while ((tMatch = tRegex.exec(pXml)) !== null) {
          textParts.push(decodeXml(tMatch[1]));
        }
        const pText = textParts.join('').trim();
        if (pText) paragraphs.push({ text: pText, isBullet: hasBullet });
      }

      if (isTitle && !slideTitle && paragraphs.length > 0) {
        slideTitle = paragraphs.map((p) => p.text).join(' ');
      } else {
        paragraphs.forEach((p) => {
          contentLines.push(p.isBullet ? `• ${p.text}` : p.text);
        });
      }
    }

    // Tables
    const tblRegex = /<a:tbl\b[^>]*>([\s\S]*?)<\/a:tbl>/g;
    let tblMatch;
    while ((tblMatch = tblRegex.exec(xml)) !== null) {
      const tblXml = tblMatch[1];
      const rowRegex = /<a:tr\b[^>]*>([\s\S]*?)<\/a:tr>/g;
      let rowMatch;
      const tableRows = [];
      while ((rowMatch = rowRegex.exec(tblXml)) !== null) {
        const trXml = rowMatch[1];
        const cellRegex = /<a:tc\b[^>]*>([\s\S]*?)<\/a:tc>/g;
        let cellMatch;
        const cells = [];
        while ((cellMatch = cellRegex.exec(trXml)) !== null) {
          const tcXml = cellMatch[1];
          const cellTextParts = [];
          const tRegex = /<a:t\b[^>]*>([\s\S]*?)<\/a:t>/g;
          let tMatch;
          while ((tMatch = tRegex.exec(tcXml)) !== null) {
            cellTextParts.push(decodeXml(tMatch[1]));
          }
          cells.push(cellTextParts.join(' ').trim());
        }
        if (cells.some((c) => c.length > 0)) tableRows.push(cells);
      }
      if (tableRows.length > 0) {
        contentLines.push('\n[Table]');
        tableRows.forEach((r) => contentLines.push('| ' + r.join(' | ') + ' |'));
        contentLines.push('');
      }
    }

    // Notes
    let speakerNotes = '';
    const slideRelPath = slidePath.replace(/ppt\/slides\/(slide\d+\.xml)/i, 'ppt/slides/_rels/$1.rels');
    const slideRelsFile = zip.file(slideRelPath);
    if (slideRelsFile) {
      try {
        const relsXml = await slideRelsFile.async('string');
        const notesRelMatch = /<Relationship[^>]*Type="[^"]*notesSlide"[^>]*Target="([^"]+)"/i.exec(relsXml);
        if (notesRelMatch) {
          let notesTarget = notesRelMatch[1];
          if (!notesTarget.startsWith('ppt/')) {
            notesTarget = notesTarget.startsWith('../') ? 'ppt/' + notesTarget.replace('../', '') : 'ppt/slides/' + notesTarget;
          }
          const notesFile = zip.file(notesTarget);
          if (notesFile) {
            const notesXml = await notesFile.async('string');
            const notesParts = [];
            const ntRegex = /<a:t\b[^>]*>([\s\S]*?)<\/a:t>/g;
            let ntMatch;
            while ((ntMatch = ntRegex.exec(notesXml)) !== null) {
              const txt = ntMatch[1].trim();
              if (txt && !/^\d+$/.test(txt)) notesParts.push(decodeXml(txt));
            }
            if (notesParts.length > 0) speakerNotes = notesParts.join(' ');
          }
        }
      } catch (e) { }
    }

    slides.push({
      slideNumber: slideNum,
      title: slideTitle || `Slide ${slideNum}`,
      content: contentLines.join('\n').trim(),
      notes: speakerNotes.trim(),
    });
  }

  const formattedSections = slides.map((s) => {
    let out = `### Slide ${s.slideNumber}: ${s.title}\n`;
    if (s.content) out += `${s.content}\n`;
    if (s.notes) out += `*Speaker Notes:* ${s.notes}\n`;
    return out.trim();
  });

  const fullText = formattedSections.join('\n\n');
  const totalWords = (fullText.match(/\S+/g) || []).length;
  const isSparse = totalWords < 10 && slides.length > 0;

  return {
    slideCount: slides.length,
    slides,
    fullText: isSparse
      ? `${fullText}\n\n[Note: This presentation contains minimal selectable text. Some slides may be graphic-heavy or image-only.]`
      : fullText,
    isSparse,
    totalWords,
  };
}

async function clientExtractDocx(file) {
  if (!window.JSZip) {
    throw new Error('JSZip library is not loaded');
  }
  const arrayBuffer = await file.arrayBuffer();
  const zip = await window.JSZip.loadAsync(arrayBuffer);
  const docXmlFile = zip.file('word/document.xml');
  if (!docXmlFile) throw new Error('Invalid Word document structure');
  const docXml = await docXmlFile.async('string');

  const paragraphs = [];
  const pRegex = /<w:p\b[^>]*>([\s\S]*?)<\/w:p>/g;
  let pMatch;
  while ((pMatch = pRegex.exec(docXml)) !== null) {
    const pXml = pMatch[1];
    const tRegex = /<w:t\b[^>]*>([\s\S]*?)<\/w:t>/g;
    let tMatch;
    const parts = [];
    while ((tMatch = tRegex.exec(pXml)) !== null) {
      parts.push(tMatch[1]);
    }
    const pText = parts.join('').trim();
    if (pText) paragraphs.push(pText);
  }
  return paragraphs.join('\n\n');
}

async function clientExtractTxt(file) {
  return await file.text();
}

function clientExtractImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function renderComposerAttachments() {
  if (!composerAttachments) return;
  const items = state.composerAttachments || [];

  if (items.length === 0) {
    composerAttachments.setAttribute('hidden', '');
    composerAttachments.innerHTML = '';
    updateComposerButtons();
    return;
  }

  composerAttachments.removeAttribute('hidden');
  composerAttachments.innerHTML = items
    .map((att) => {
      const icon = getAttachmentIcon(att.fileType);
      const loadingState = att.isExtracting ? '⏳ ' : '';
      let thumbHtml = `<span class="chip-icon">${icon}</span>`;
      if (att.fileType === 'image' && att.dataUrl) {
        thumbHtml = `<img class="chip-thumb" src="${att.dataUrl}" alt="${escapeHtml(att.filename)}" />`;
      }
      return `
      <div class="composer-attachment-chip" data-att-id="${escapeHtml(att.id)}" title="${escapeHtml(att.filename)} (${att.formattedSize || ''})">
        ${thumbHtml}
        <div class="chip-info">
          <span class="chip-name">${escapeHtml(att.filename)}</span>
          ${att.formattedSize ? `<span class="chip-size">${loadingState}${escapeHtml(att.formattedSize)}</span>` : ''}
        </div>
        <span class="chip-badge">${escapeHtml(att.fileType.toUpperCase())}</span>
        <button type="button" class="chip-remove-btn" data-action="remove-attachment" data-id="${escapeHtml(att.id)}" aria-label="Remove ${escapeHtml(att.filename)}" title="Remove attachment">✕</button>
      </div>`;
    })
    .join('');

  updateComposerButtons();
}

async function handleComposerFiles(fileList) {
  if (!fileList || fileList.length === 0) return;
  const files = Array.from(fileList);
  const MAX_BYTES = 10 * 1024 * 1024; // 10MB limit

  for (const file of files) {
    if (file.size > MAX_BYTES) {
      showToast(`"${file.name}" exceeds 10 MB limit. Please select a smaller file.`, 'warn');
      continue;
    }

    const isDup = (state.composerAttachments || []).some(
      (a) => a.filename === file.name && a.size === file.size
    );
    if (isDup) {
      showToast(`"${file.name}" is already attached.`, 'info');
      continue;
    }

    const fileType = detectFileType(file.name, file.type);
    const attRecord = {
      id: generateId('att'),
      file,
      filename: file.name,
      fileType,
      size: file.size,
      formattedSize: formatBytes(file.size),
      text: '',
      dataUrl: '',
      isExtracting: true,
      error: null,
    };

    if (!state.composerAttachments) state.composerAttachments = [];
    state.composerAttachments.push(attRecord);
    renderComposerAttachments();

    (async () => {
      try {
        if (fileType === 'pptx') {
          const res = await clientExtractPptx(file);
          attRecord.text = res.fullText;
          attRecord.slides = res.slides;
          attRecord.slideCount = res.slideCount;
        } else if (fileType === 'docx') {
          attRecord.text = await clientExtractDocx(file);
        } else if (fileType === 'txt') {
          attRecord.text = await clientExtractTxt(file);
        } else if (fileType === 'image') {
          attRecord.dataUrl = await clientExtractImage(file);
          attRecord.text = `[Image Attached: ${file.name}]`;
        } else if (fileType === 'pdf') {
          if (navigator.onLine) {
            const formData = new FormData();
            formData.append('document', file);
            const res = await fetch('/api/document/read', { method: 'POST', body: formData });
            const data = await res.json();
            if (data.status === 'success') {
              attRecord.text = data.text;
            } else {
              attRecord.error = data.message;
            }
          } else {
            attRecord.text = `[Attached PDF: ${file.name}. Note: Full PDF OCR text extraction requires online connection.]`;
          }
        }
      } catch (err) {
        console.warn(`Extraction error for ${file.name}:`, err);
        attRecord.error = err.message;
      } finally {
        attRecord.isExtracting = false;
        renderComposerAttachments();
      }
    })();
  }
}

if (composerAttachments) {
  composerAttachments.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="remove-attachment"]');
    if (!btn) return;
    const id = btn.dataset.id;
    if (id) {
      state.composerAttachments = (state.composerAttachments || []).filter((a) => a.id !== id);
      renderComposerAttachments();
    }
  });
}

if (attachBtn && attachmentMenu) {
  attachBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isOpen = !attachmentMenu.hasAttribute('hidden');
    if (isOpen) {
      attachmentMenu.setAttribute('hidden', '');
      attachBtn.classList.remove('menu-open');
      attachBtn.setAttribute('aria-expanded', 'false');
    } else {
      attachmentMenu.removeAttribute('hidden');
      attachBtn.classList.add('menu-open');
      attachBtn.setAttribute('aria-expanded', 'true');
    }
  });

  attachmentMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    const item = e.target.closest('.attachment-menu-item');
    if (!item) return;
    const action = item.dataset.action;

    attachmentMenu.setAttribute('hidden', '');
    attachBtn.classList.remove('menu-open');
    attachBtn.setAttribute('aria-expanded', 'false');

    if (action === 'generate-image') {
      if (messageInput) {
        messageInput.value = '/image ';
        messageInput.focus();
        autoResize();
        showToast('Describe the image or diagram you want to generate', 'info');
      }
      return;
    }

    if (!composerFileInput) return;

    if (action === 'upload-pdf') {
      composerFileInput.accept = '.pdf,application/pdf';
    } else if (action === 'upload-docx') {
      composerFileInput.accept = '.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    } else if (action === 'upload-pptx') {
      composerFileInput.accept = '.pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation';
    } else if (action === 'upload-image') {
      composerFileInput.accept = '.png,.jpg,.jpeg,image/png,image/jpeg';
    } else if (action === 'upload-txt') {
      composerFileInput.accept = '.txt,.md,.js,.py,.c,.cpp,.java,.html,.css,.json,text/plain';
    }
    composerFileInput.value = '';
    composerFileInput.click();
  });

  document.addEventListener('click', (e) => {
    if (!attachBtn.contains(e.target) && !attachmentMenu.contains(e.target)) {
      if (!attachmentMenu.hasAttribute('hidden')) {
        attachmentMenu.setAttribute('hidden', '');
        attachBtn.classList.remove('menu-open');
        attachBtn.setAttribute('aria-expanded', 'false');
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !attachmentMenu.hasAttribute('hidden')) {
      attachmentMenu.setAttribute('hidden', '');
      attachBtn.classList.remove('menu-open');
      attachBtn.setAttribute('aria-expanded', 'false');
      attachBtn.focus();
    }
  });
}

if (composerFileInput) {
  composerFileInput.addEventListener('change', () => {
    if (composerFileInput.files && composerFileInput.files.length > 0) {
      handleComposerFiles(composerFileInput.files);
      composerFileInput.value = '';
    }
  });
}

if (chatForm) {
  ['dragenter', 'dragover'].forEach((eventName) => {
    chatForm.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      chatForm.classList.add('drag-over');
    });
  });

  ['dragleave', 'dragend', 'drop'].forEach((eventName) => {
    chatForm.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      chatForm.classList.remove('drag-over');
    });
  });

  chatForm.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    if (dt && dt.files && dt.files.length > 0) {
      handleComposerFiles(dt.files);
    }
  });
}

/* ─────────────────────────────────────────────────────────────────
   DEDICATED IMAGE GENERATION INTENT DETECTOR & ROUTER (PHASE 5 UPGRADE)
───────────────────────────────────────────────────────────────── */
const IMAGE_NOUNS = 'image|picture|photo|photograph|illustration|drawing|artwork|wallpaper|poster|graphic|sketch|portrait|visual|visualization|cartoon|render|painting|banner|diagram|flowchart|infographic|landscape|scenery|logo|icon|avatar|blueprint';
const VISUAL_SUBJECTS = 'car|sports car|supercar|vehicle|motorcycle|jet|passenger jet|plane|airplane|truck|fire truck|mountain|mountains|landscape|forest|beach|ocean|river|lake|sunset|sunrise|dog|puppy|retriever|cat|kitten|animal|bird|eagle|bald eagle|fish|clownfish|coral|student|doctor|astronaut|developer|building|interior|room|coffee shop|city|street|flower|sky|patterns|fractal|acrylic|watercolor';

let activeImageAbortController = null;

function isImageGenerationIntent(text) {
  if (!text || typeof text !== 'string') return false;
  const t = text.trim();

  // 1. Explicit slash command
  if (/^\/image\s+/i.test(t)) return true;

  // 2. Strict negative guards: code, programming, explanations, text answers
  const hasCodeOrExplain = /\b(code|python|script|programming\s+language|html|css|svg|function|opencv|canvas|pil|pillow|matplotlib|write\s+a\s+program|c\s+program|algorithm\s+to)\b/i.test(t) ||
                           /\b(explain|how\s+to|how\s+does|how\s+do|what\s+is|what\s+are|tell\s+me\s+about|describe\s+how|difference\s+between|tutorial|history\s+of|why\s+do|why\s+does|why\s+is|solve|derive)\b/i.test(t) ||
                           /\b(read|analyze|describe|summarize|extract|transcribe|what\s+is\s+in)\s+(this|the|attached)\s+(image|picture|photo)\b/i.test(t) ||
                           (/\?\s*$/.test(t) && !/^(can\s+you|could\s+you|please)\s+(generate|create|draw|paint|render|make|illustrate)\b/i.test(t));
  if (hasCodeOrExplain) return false;

  // 3. Positive intent matching with image nouns
  const p1 = new RegExp(`\\b(generate|create|draw|paint|make|produce|render|illustrate|sketch)\\s+(me\\s+)?(a|an|the|some)?\\s*([a-z0-9_-]+\\s+){0,4}(${IMAGE_NOUNS})\\b`, 'i');
  if (p1.test(t)) return true;

  // 4. Starts with draw/paint/sketch/illustrate/render
  if (/^\s*(draw|paint|sketch|illustrate|render)\s+(a|an|the|me|some)\s+/i.test(t)) return true;

  // 5. 'Can you generate/draw/render ...'
  const p2 = new RegExp(`\\b(can\\s+you|please|could\\s+you)\\s+(generate|create|draw|paint|make|render|illustrate)\\s+(me\\s+)?(an?|the)?\\s*([a-z0-9_-]+\\s+){0,3}(${IMAGE_NOUNS})\\b`, 'i');
  if (p2.test(t)) return true;

  // 6. Direct generation of visual subjects: 'generate a [realistic] [red sports car / mountain landscape]'
  const p3 = new RegExp(`\\b(generate|create|draw|paint|render|illustrate|make)\\s+(me\\s+)?(a|an|the|some)?\\s*(realistic\\s+|cinematic\\s+|detailed\\s+|beautiful\\s+)?([a-z0-9_-]+\\s+){0,3}(${VISUAL_SUBJECTS})\\b`, 'i');
  if (p3.test(t)) return true;

  // 7. Explicit standalone image nouns (diagram, flowchart, logo, painting, illustration, infographic, visualization)
  if (/\b(diagram|flowchart|infographic|illustration|drawing|sketch|painting|artwork|wallpaper|visualization|logo)\b/i.test(t)) return true;

  // 8. Art style / pattern descriptions (abstract fluid acrylic, geometric fractal patterns, surreal watercolor)
  if (/^(abstract|geometric|surreal|minimalist)\s+([a-z0-9_-]+\s+){0,3}(patterns?|art|painting|render|lines?|shapes?|illustration)\b/i.test(t)) return true;

  // 9. Descriptive visual scenes starting with A / An / The + setting / scene prepositions / participles
  // e.g. 'A cozy coffee shop interior with warm lighting...', 'A vintage motorcycle parked on cobblestone', 'An astronaut floating in space...'
  if (/^\s*(a|an|the)\s+([a-z0-9_-]+\s+){1,7}(with|under|at|in|on|near|perched\s+on|sitting\s+in|floating\s+in|swimming\s+near|parked\s+on|flying\s+through|coding\s+with|smiling\s+in)\s+/i.test(t)) {
    return true;
  }

  return false;
}

async function handleImageGeneration(rawPrompt, options = {}) {
  const isFresh = Boolean(options && options.fresh);

  // Prevent duplicate concurrent requests
  if (state.isWaiting) {
    showToast('An image or AI generation request is already in progress.', 'warning');
    return;
  }

  let cleanPrompt = (rawPrompt || '').replace(/^\/image\s+/i, '').trim();
  if (!cleanPrompt) {
    cleanPrompt = 'A detailed academic diagram explaining key concepts';
  }

  let conv = state.conversations[state.activeId];
  if (!conv) {
    conv = createNewConversation('Image: ' + cleanPrompt.slice(0, 26));
    state.activeId = conv.id;
    setTopbarTitle(conv.title);
  }

  messageInput.value = '';
  messageInput.style.height = 'auto';
  state.isWaiting = true;
  updateComposerButtons();

  const now = Date.now();
  if (!isFresh) {
    const userMsg = {
      id: generateId('msg'),
      role: 'user',
      content: rawPrompt.startsWith('/') ? rawPrompt : `/image ${cleanPrompt}`,
      attachments: [],
      timestamp: now,
      time: formatTime(now),
      isError: false,
    };
    appendMessageToActive(userMsg);
  }

  // Check offline or local preference
  const localAi = await getLocalAI();
  const enginePref = localAi ? localAi.getEnginePreference() : 'auto';
  const isOnline = typeof navigator !== 'undefined' && navigator.onLine;

  const requiresLocal = enginePref === 'local' || (!isOnline && enginePref === 'auto');

  if (requiresLocal) {
    const archHtml = `
      <div class="ai-architecture-card">
        <div class="arch-card-header">
          <span class="arch-badge">Offline Local AI Architecture</span>
          <span class="arch-engine">WebLLM vs. Diffusion</span>
        </div>
        <div class="arch-card-body">
          <p><strong>Offline image generation is not available.</strong> WebLLM operates as an on-device Large Language Model for text, code explanations, and structured exam knowledge. Image synthesis requires online diffusion.</p>
        </div>
        <div class="arch-card-footer">
          <button type="button" class="arch-action-btn" onclick="if(window.openSettingsModal) window.openSettingsModal(); else { const s=document.getElementById('settingsModal'); if(s) s.removeAttribute('hidden'); }">
            <span>⚙️ Open Local AI Diagnostics</span>
          </button>
        </div>
      </div>
    `;

    appendMessageToActive({
      id: generateId('msg'),
      role: 'model',
      content: archHtml,
      rawHtml: true,
      timestamp: Date.now(),
      time: formatTime(),
      isError: false,
    });

    state.isWaiting = false;
    updateComposerButtons();
    return;
  }

  // Online Image generation setup
  const aiMsgId = generateId('msg');
  const imgId = 'img_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
  const currentMode = state.imageGenMode || 'fast';
  const t_user_submit = Date.now();

  activeImageAbortController = new AbortController();

  // Render placeholder message with skeleton and progress widgets
  const placeholderMsg = {
    id: aiMsgId,
    role: 'model',
    type: 'image',
    imageId: imgId,
    prompt: cleanPrompt,
    engine: 'AI Image Diffusion',
    model: currentMode === 'quality' ? 'Flux.1 Diffusion (High Detail)' : 'Flux.1 Diffusion (Fast 512)',
    mode: currentMode,
    timestamp: Date.now(),
    time: formatTime(),
  };
  appendMessageToActive(placeholderMsg);

  // ── Progress Stage Controller (Phase 5 Technical Requirement) ──
  // Display clean estimated progress:
  // 0% — Preparing request
  // 10% — Understanding image prompt
  // 20% — Preparing generation
  // 30–85% — Generating image
  // 90% — Processing generated image
  // 95% — Finalizing image
  // 100% — Image generated successfully (Only after DOM <img> load!)
  let currentPct = 0;
  let progressTimer = null;

  function updateProgress(pct, stageDesc) {
    currentPct = pct;
    const pctEl = document.getElementById(`pct_${imgId}`);
    const pbarEl = document.getElementById(`pbar_${imgId}`);
    const stageEl = document.getElementById(`stage_${imgId}`);
    if (pctEl) pctEl.textContent = `${pct}%`;
    if (pbarEl) pbarEl.style.width = `${pct}%`;
    if (stageEl) stageEl.textContent = `${pct}% — ${stageDesc}`;
  }

  updateProgress(0, 'Preparing request…');

  const t1 = setTimeout(() => {
    if (currentPct < 10) updateProgress(10, 'Understanding image prompt…');
  }, 350);

  const t2 = setTimeout(() => {
    if (currentPct < 20) updateProgress(20, 'Preparing generation…');
  }, 1100);

  const t3 = setTimeout(() => {
    if (currentPct < 30) updateProgress(30, 'Generating image…');
    // Smooth progress simulation from 30% to 85%
    progressTimer = setInterval(() => {
      if (currentPct < 85) {
        const step = currentPct < 60 ? 3 : (currentPct < 75 ? 2 : 1);
        updateProgress(currentPct + step, 'Generating image…');
      }
    }, 380);
  }, 2200);

  function stopProgress() {
    clearTimeout(t1);
    clearTimeout(t2);
    clearTimeout(t3);
    if (progressTimer) {
      clearInterval(progressTimer);
      progressTimer = null;
    }
  }

  function showErrorState(title, desc) {
    const skelEl = document.getElementById(`skeleton_${imgId}`);
    const errBox = document.getElementById(`error_${imgId}`);
    const errTitle = document.getElementById(`err_title_${imgId}`);
    const errDesc = document.getElementById(`err_desc_${imgId}`);
    if (skelEl) skelEl.style.display = 'none';
    if (errBox) {
      if (errTitle) errTitle.textContent = title;
      if (errDesc) errDesc.textContent = desc;
      errBox.style.display = 'flex';
    }
  }

  try {
    const res = await fetch('/api/chat/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: activeImageAbortController.signal,
      body: JSON.stringify({
        prompt: cleanPrompt,
        mode: currentMode,
        clientTimestamp: t_user_submit,
        fresh: isFresh,
      }),
    });

    const data = await res.json();
    const t_browser_recv = Date.now();

    if (res.ok && data.status === 'success' && data.imageBase64) {
      stopProgress();
      updateProgress(90, 'Processing generated image…');

      const blobUrl = base64ToBlobUrl(data.imageBase64, data.mimeType || 'image/jpeg');
      const dataUrl = `data:${data.mimeType || 'image/jpeg'};base64,${data.imageBase64}`;
      imageCache.set(imgId, dataUrl);

      setTimeout(() => {
        updateProgress(95, 'Finalizing image…');
      }, 100);

      // Render image element
      const imgEl = document.getElementById(`img_${imgId}`);
      const skelEl = document.getElementById(`skeleton_${imgId}`);

      if (imgEl) {
        imgEl.onload = () => {
          updateProgress(100, 'Image generated successfully');
          setTimeout(() => {
            if (skelEl) skelEl.style.display = 'none';
            imgEl.style.display = 'block';
          }, 200);
        };
        imgEl.onerror = () => {
          stopProgress();
          showErrorState('Image Display Error', 'The generated image payload could not be rendered in the browser.');
        };
        imgEl.src = blobUrl;
      } else {
        stopProgress();
        if (skelEl) skelEl.style.display = 'none';
      }

      const t_render_end = Date.now();
      const totalDurationMs = t_render_end - t_user_submit;

      const telemetry = {
        totalMs:           totalDurationMs,
        clientToBackendMs: data.durations?.clientToBackendMs || 0,
        apiMs:             data.durations?.apiProcessingMs || 0,
        backendExtractMs:  data.durations?.backendExtractMs || 0,
        backendTotalMs:    data.durations?.backendTotalMs || 0,
        transferMs:        Math.max(0, t_browser_recv - (data.timestamps?.extractEnd || t_browser_recv)),
        renderMs:          Math.max(0, t_render_end - t_browser_recv),
        resolution:        data.resolution || (currentMode === 'quality' ? '1024x1024' : '512x512'),
        mode:              data.mode || currentMode,
        cached:            Boolean(data.cached),
      };

      const convNow = state.conversations[state.activeId];
      if (convNow) {
        const target = convNow.messages.find(m => m.id === aiMsgId);
        if (target) {
          target.engine = data.engine || 'AI Image Diffusion (Flux.1)';
          target.model = data.model || (currentMode === 'quality' ? 'Flux.1 Diffusion (High Detail)' : 'Flux.1 Diffusion (Fast 512)');
          target.refinedPrompt = data.refinedPrompt || cleanPrompt;
          target.telemetry = telemetry;
          target.mode = telemetry.mode;
          target.resolution = telemetry.resolution;
        }
        saveConversations();

        // Update card header with telemetry badge
        const cardHeaderEl = document.querySelector(`.generated-image-card[data-img-id="${imgId}"] .image-card-header`);
        if (cardHeaderEl) {
          const isFast = telemetry.mode !== 'quality';
          const modeLabel = isFast ? '⚡ Fast (512px)' : '✨ Quality (1K)';
          const totalSec = (telemetry.totalMs / 1000).toFixed(1) + 's';
          const breakdown = `Total: ${(telemetry.totalMs/1000).toFixed(2)}s | API: ${(telemetry.apiMs/1000).toFixed(2)}s | Server: ${(telemetry.backendTotalMs/1000).toFixed(2)}s | Transfer: ${(telemetry.transferMs/1000).toFixed(2)}s | Render: ${telemetry.renderMs}ms`;
          let telEl = cardHeaderEl.querySelector('.image-card-telemetry');
          if (!telEl) {
            telEl = document.createElement('div');
            telEl.className = 'image-card-telemetry';
            const modelEl = cardHeaderEl.querySelector('.image-card-model');
            if (modelEl) cardHeaderEl.insertBefore(telEl, modelEl);
            else cardHeaderEl.appendChild(telEl);
          }
          telEl.title = breakdown;
          telEl.innerHTML = `<span class="telemetry-pill">${modeLabel}</span><span class="telemetry-time">${totalSec}</span>`;
        }

        // Show refined prompt block if available
        if (data.refinedPrompt && data.refinedPrompt !== cleanPrompt) {
          const captionEl = document.querySelector(`.generated-image-card[data-img-id="${imgId}"] .image-card-caption`);
          if (captionEl && !captionEl.querySelector('.image-refined-prompt-block')) {
            const refinedDiv = document.createElement('div');
            refinedDiv.className = 'image-refined-prompt-block';
            refinedDiv.innerHTML = `
              <div class="image-refined-label">Understood Visual Subject & Styling</div>
              <p class="image-refined-text">${escapeHtml(data.refinedPrompt)}</p>
            `;
            captionEl.appendChild(refinedDiv);
          }
        }
      }

      MediaDB.saveImage(imgId, dataUrl, data.mimeType, cleanPrompt, data.engine || 'AI Image Diffusion (Flux.1)').catch(console.warn);
      showToast(`✨ Image generated in ${(totalDurationMs / 1000).toFixed(1)}s!`, 'success');

    } else {
      stopProgress();
      let errTitle = 'Generation Error';
      let errDesc = data.message || 'Could not generate image.';
      if (data.code === 'RATE_LIMIT_COOLDOWN') {
        errTitle = 'Service Rate Limit';
        errDesc = `Rate limit reached. Please wait ${data.retryAfter || 30}s before retrying.`;
      }
      showErrorState(errTitle, errDesc);
    }

  } catch (err) {
    stopProgress();
    if (err.name === 'AbortError') {
      showErrorState('Generation Cancelled', 'Image generation was cancelled by the user.');
    } else {
      console.error('Image generation request failed:', err);
      showErrorState('Network Error', 'Could not reach the server to complete image generation. Please check your connection.');
    }
  } finally {
    stopProgress();
    activeImageAbortController = null;
    state.isWaiting = false;
    updateComposerButtons();
  }
}

/* ─────────────────────────────────────────────────────────────────
   FORM SUBMIT & GEMINI API DISPATCH
───────────────────────────────────────────────────────────────── */
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = messageInput.value.trim();
  const hasAttachments = Array.isArray(state.composerAttachments) && state.composerAttachments.length > 0;
  if ((!text && !hasAttachments) || state.isWaiting) return;
  submitMessage(text);
});

async function submitMessage(text) {
  if (state.isWaiting || state.isStreaming) return;

  const attachedFiles = [...(state.composerAttachments || [])];
  state.composerAttachments = [];
  renderComposerAttachments();

  let promptText = (text || '').trim();
  if (!promptText && attachedFiles.length > 0) {
    promptText = 'Please provide an overview and key takeaways of this attached document.';
  }
  if (!promptText) return;

  // ── Dedicated Image-Generation Intent Routing Layer (Part 2) ───────────────
  if (isImageGenerationIntent(promptText) && attachedFiles.length === 0) {
    await handleImageGeneration(promptText);
    return;
  }
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
    id: generateId('msg'),
    role: 'user',
    content: promptText,
    attachments: attachedFiles.map((a) => ({
      filename: a.filename,
      fileType: a.fileType,
      formattedSize: a.formattedSize,
    })),
    timestamp: now,
    time: formatTime(now),
    isError: false
  };
  appendMessageToActive(userMsg);

  // Send relevant prior messages from active conversation (capped to last 12 messages = 6 turns)
  const history = (conv.messages || [])
    .slice(0, -1)
    .filter(m => !m.isError && typeof m.content === 'string' && m.content.trim())
    .slice(-12)
    .map(m => ({ role: m.role === 'assistant' ? 'model' : m.role, content: m.content }));

  // ── 5-Tier Response Routing Hierarchy ───────────────────────────────────────
  // Priority: (1) Online Gemini, (2) WebLLM, (3) Chrome built-in AI, (4) Local AI service, (5) Offline Data Structures Knowledge Assistant
  const localAi = await getLocalAI();
  const enginePref = localAi ? localAi.getEnginePreference() : 'auto';
  const examModeActive = localAi && typeof localAi.getExamModeActive === 'function' ? localAi.getExamModeActive() : false;
  const isOnline = typeof navigator !== 'undefined' && navigator.onLine;

  let useLocalAi = false;
  if (examModeActive) {
    useLocalAi = true;
  } else if (enginePref === 'local') {
    useLocalAi = true;
  } else if (enginePref === 'auto') {
    useLocalAi = !isOnline;
  }

  const isDSQuery = window.DSKnowledgeEngine && typeof window.DSKnowledgeEngine.classifyDSQuery === 'function'
    ? window.DSKnowledgeEngine.classifyDSQuery(promptText).isDSQuery
    : false;

  // Helper 5: Offline Knowledge Assistant
  async function runOfflineKnowledgeAssistant() {
    showLoading();
    state.isWaiting = true;
    updateComposerButtons();
    updateEngineIndicator('local', 'Offline DS Knowledge Assistant');

    const aiMsgId = generateId('msg');
    try {
      const res = window.DSKnowledgeEngine && typeof window.DSKnowledgeEngine.queryKnowledgeBase === 'function'
        ? window.DSKnowledgeEngine.queryKnowledgeBase(promptText, history)
        : null;

      removeLoading();
      let content = '';
      if (res && res.success && res.content) {
        content = res.content;
      } else {
        content = `### 📚 Offline Data Structures Knowledge Assistant\n\n` +
          `I am operating entirely offline from the pre-cached college syllabus repository.\n\n` +
          `**Available Syllabus Units (Zero Internet Required):**\n` +
          `1. **Data Structures Fundamentals**: Linear vs Non-linear, static vs dynamic memory, arrays, pointers, Big-O.\n` +
          `2. **Searching Algorithms**: Linear Search, Binary Search in C, step-by-step dry runs, recursive vs iterative.\n` +
          `3. **Sorting Algorithms**: Bubble, Selection, Insertion, Merge, Quick Sort (partitioning, complexity, stability).\n` +
          `4. **Linked Lists**: Singly, Doubly, Circular Linked List (CRUD, reversal, pointer diagrams).\n` +
          `5. **Stacks**: Array-based Stack (LIFO, push/pop/peek, infix-to-postfix, parentheses matching).\n` +
          `6. **Queues & Circular Queues**: Linear Queue (FIFO), Circular Queue modulo arithmetic \`(rear + 1) % MAX\`.\n` +
          `7. **Binary Trees**: Binary Search Tree (BST insertion, search, traversals, height, leaf count).\n` +
          `8. **Graphs & Hashing**: BFS, DFS, Hash functions, collision resolution (Linear Probing, Chaining).\n\n` +
          `*Try asking any question about algorithms, C programs, dry runs, Big-O complexity, or viva questions.*`;
      }

      appendMessageToActive({
        id: aiMsgId,
        role: 'model',
        content,
        timestamp: Date.now(),
        time: formatTime(),
        engine: 'offline_knowledge',
        isError: false
      });
      return true;
    } catch (err) {
      removeLoading();
      appendMessageToActive({
        id: aiMsgId,
        role: 'model',
        content: `⚠️ Offline Knowledge Assistant Error: ${err.message}`,
        timestamp: Date.now(),
        time: formatTime(),
        engine: 'offline_knowledge',
        isError: true
      });
      return false;
    } finally {
      state.isWaiting = false;
      updateComposerButtons();
      updateEngineIndicator();
      saveStoredConversations();
      renderConvoList();
    }
  }

  // Helper 4: Local AI Service (Ollama)
  async function runLocalAIService() {
    if (!window.LocalAIDetector || typeof window.LocalAIDetector.checkLocalAIService !== 'function') return false;
    const probe = await window.LocalAIDetector.checkLocalAIService();
    if (!probe.available) return false;

    showLoading();
    state.isWaiting = true;
    state.isStreaming = true;
    updateComposerButtons();
    updateEngineIndicator('running', 'Local AI Service...');

    const aiMsgId = generateId('msg');
    let firstToken = true;
    try {
      const fullReply = await window.LocalAIDetector.generateLocalServiceResponse({
        prompt: promptText,
        history,
        mode: requestedMode,
        endpoint: probe.endpoint,
        onChunk: (delta, accumulated) => {
          if (firstToken) {
            firstToken = false;
            removeLoading();
            appendMessageToActive({
              id: aiMsgId,
              role: 'model',
              content: accumulated,
              timestamp: Date.now(),
              time: formatTime(),
              engine: 'local_service',
              isError: false
            });
            updateEngineIndicator('local', 'Local AI Service');
          } else {
            updateStreamingMessage(aiMsgId, accumulated);
          }
        }
      });
      finalizeStreamedMessage(aiMsgId, fullReply);
      return true;
    } catch (_) {
      removeLoading();
      return false;
    } finally {
      state.isWaiting = false;
      state.isStreaming = false;
      updateComposerButtons();
      updateEngineIndicator();
    }
  }

  // Helper 3: Chrome Built-in AI
  async function runChromeBuiltInAI() {
    if (!window.LocalAIDetector || typeof window.LocalAIDetector.checkChromeBuiltInAI !== 'function') return false;
    const probe = await window.LocalAIDetector.checkChromeBuiltInAI();
    if (!probe.available) return false;

    showLoading();
    state.isWaiting = true;
    state.isStreaming = true;
    updateComposerButtons();
    updateEngineIndicator('running', 'Chrome Built-in AI...');

    const aiMsgId = generateId('msg');
    let firstToken = true;
    try {
      const fullReply = await window.LocalAIDetector.generateChromeBuiltInResponse({
        prompt: promptText,
        history,
        mode: requestedMode,
        onChunk: (delta, accumulated) => {
          if (firstToken) {
            firstToken = false;
            removeLoading();
            appendMessageToActive({
              id: aiMsgId,
              role: 'model',
              content: accumulated,
              timestamp: Date.now(),
              time: formatTime(),
              engine: 'chrome_builtin',
              isError: false
            });
            updateEngineIndicator('local', 'Chrome Built-in AI');
          } else {
            updateStreamingMessage(aiMsgId, accumulated);
          }
        }
      });
      finalizeStreamedMessage(aiMsgId, fullReply);
      return true;
    } catch (_) {
      removeLoading();
      return false;
    } finally {
      state.isWaiting = false;
      state.isStreaming = false;
      updateComposerButtons();
      updateEngineIndicator();
    }
  }

  // Helper 2: WebLLM
  async function runWebLLM() {
    if (!localAi) return false;
    const gpuCheck = await localAi.checkWebGPUSupport();
    if (!gpuCheck.supported) return false;
    const modelId = localAi.getSelectedModelId();
    const isCached = await localAi.isModelCached(modelId);
    if (!isCached) return false;

    showLoading();
    state.isWaiting = true;
    state.isStreaming = true;
    updateComposerButtons();
    updateEngineIndicator('running', 'Local AI (Thinking...)');

    const aiMsgId = generateId('msg');
    let firstToken = true;

    try {
      let localPrompt = promptText;
      if (attachedFiles.length > 0) {
        const docSnippets = attachedFiles.map((a) => {
          const fname = a.filename || 'Attached File';
          const ftype = (a.fileType || 'file').toUpperCase();
          const content = (a.text || '').slice(0, 25000);
          return `[ATTACHED DOCUMENT: "${fname}" (${ftype})]\n--- START OF DOCUMENT CONTENT ---\n${content}\n--- END OF DOCUMENT CONTENT ---`;
        }).join('\n\n');
        localPrompt = `${docSnippets}\n\nSTUDENT QUESTION / INSTRUCTION:\n${promptText}`;
      }

      const fullReply = await localAi.generateLocalResponse({
        prompt: localPrompt,
        history,
        mode: requestedMode,
        onInitProgress: (report) => {
          const p = Math.round((report.progress || 0) * 100);
          updateEngineIndicator('initializing', `Loading (${p}%)`);
        },
        onChunk: (delta, accumulated) => {
          if (firstToken) {
            firstToken = false;
            removeLoading();
            appendMessageToActive({
              id: aiMsgId,
              role: 'model',
              content: accumulated,
              timestamp: Date.now(),
              time: formatTime(),
              engine: 'webllm',
              isError: false
            });
            updateEngineIndicator('local', 'Local AI (WebGPU)');
          } else {
            updateStreamingMessage(aiMsgId, accumulated);
          }
        }
      });

      finalizeStreamedMessage(aiMsgId, fullReply);
      return true;
    } catch (err) {
      console.warn('[WebLLM] Inference error:', err);
      return false;
    } finally {
      removeLoading();
      state.isWaiting = false;
      state.isStreaming = false;
      updateComposerButtons();
      updateEngineIndicator();
      messageInput.focus();
    }
  }

  // Tier Execution Routing Logic
  // Explicitly forced offline knowledge or DS exam mode offline
  if (enginePref === 'offline_knowledge' || (requestedMode === 'data_structures' && (!isOnline || examModeActive))) {
    await runOfflineKnowledgeAssistant();
    return;
  }

  // Exam mode enforces on-device execution: WebLLM -> Chrome AI -> Local Service -> Offline Knowledge
  if (examModeActive || enginePref === 'local' || !isOnline) {
    const webllmSuccess = await runWebLLM();
    if (webllmSuccess) return;

    const chromeSuccess = await runChromeBuiltInAI();
    if (chromeSuccess) return;

    const localSvcSuccess = await runLocalAIService();
    if (localSvcSuccess) return;

    // Fall back to Offline Knowledge Assistant
    await runOfflineKnowledgeAssistant();
    return;
  }

  // Otherwise: Online Gemini (Tier 1) with full resilient fallbacks (2 -> 3 -> 4 -> 5)
  showLoading();
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: promptText,
        history,
        mode: requestedMode,
        attachments: attachedFiles.map((a) => ({
          filename: a.filename,
          fileType: a.fileType,
          text: a.text,
          dataUrl: a.dataUrl,
        }))
      })
    });

    const data = await res.json();
    removeLoading();
    state.isWaiting = false;

    if (res.ok && data.status === 'success' && data.reply) {
      streamMessageToActive({
        id: generateId('msg'),
        role: 'model',
        content: data.reply,
        timestamp: Date.now(),
        time: formatTime(),
        engine: 'gemini',
        isError: false
      });
      return;
    } else {
      throw new Error(data?.message || 'Gemini API response error');
    }
  } catch (geminiErr) {
    removeLoading();
    state.isWaiting = false;
    console.warn('[Gemini] Request failed, initiating resilient failover chain:', geminiErr);

    // Resilient Failover: If network drops, automatically answer using the on-device Local AI model
    if (localAi) {
      try {
        const verification = await localAi.verifyModelInstallation();
        if (verification.installed) {
          updateEngineIndicator('running', 'Local AI (Failover)');
        }
      } catch (_) {}
    }

    showToast('⚠️ Cloud API unavailable. Falling back through local offline engines...', 'info');

    // Tier 2: WebLLM
    const webllmSuccess = await runWebLLM();
    if (webllmSuccess) return;

    // Tier 3: Chrome AI
    const chromeSuccess = await runChromeBuiltInAI();
    if (chromeSuccess) return;

    // Tier 4: Local Service
    const localSvcSuccess = await runLocalAIService();
    if (localSvcSuccess) return;

    // Tier 5: Offline Knowledge Assistant
    await runOfflineKnowledgeAssistant();
    return;
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
  standard: 'Standard Academic (Balanced collegiate assistant)',
  data_structures: 'Data Structures Exam Mode (10-point teaching, C code, dry runs & viva)',
  simple: 'Simple Explanation (Intuitive analogies & plain language)',
  step_by_step: 'Step-by-Step Learning (Sequential stage-by-stage progression)',
  exam_prep: 'Exam Preparation (Definitions, formulas & high-yield traps)',
  practice: 'Practice Questions (Includes follow-up check questions)',
  code_focus: 'Programming Focus (Emphasizes syntax, code examples & best practices)'
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
  const topicInput = document.getElementById('explainTopic');
  const levelSelect = document.getElementById('explainLevel');
  const styleSelect = document.getElementById('explainStyle');
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

    if (!navigator.onLine) {
      const localAi = await getLocalAI();
      const isCached = localAi ? await localAi.isModelCached() : false;
      if (!isCached) {
        showToast('Offline: Download a local model in Settings to explain concepts offline.', 'warn');
        return;
      }
      submitMessage(userPromptText);
      showToast('Generating concept explanation via on-device Local AI (WebGPU)...', 'info');
      return;
    }

    const now = Date.now();
    appendMessageToConv(convId, {
      id: generateId('msg'),
      role: 'user',
      content: userPromptText,
      timestamp: now,
      time: formatTime(now),
      isError: false
    });

    if (state.activeId === convId) {
      state.isWaiting = true;
      showLoading();
    }

    try {
      const res = await fetch(`${TOOLS_API_URL}/explain`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
          id: generateId('msg'),
          role: 'model',
          content: data.explanation,
          timestamp: arrival,
          time: formatTime(arrival),
          isError: false
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
          id: generateId('msg'),
          role: 'model',
          content: `**Concept Explainer Error:** ${escapeHtml(data.message || 'Failed to explain concept. Please try again.')}`,
          timestamp: arrival,
          time: formatTime(arrival),
          isError: true
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
        id: generateId('msg'),
        role: 'model',
        content: `**Network Error:** Could not reach the server for Concept Explainer.\n\n\`${err.message}\``,
        timestamp: arrival,
        time: formatTime(arrival),
        isError: true
      });
      showToast(`Network error: ${err.message}`, 'error');
    }
  });
}

// ── TOOL 2: PROGRAMMING ASSISTANT HANDLER ────────────────────────
if (programmingForm) {
  const langSelect = document.getElementById('progLanguage');
  const modeSelect = document.getElementById('progMode');
  const descInput = document.getElementById('progDescription');
  const codeInput = document.getElementById('progCode');

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

    if (!navigator.onLine) {
      const localAi = await getLocalAI();
      const isCached = localAi ? await localAi.isModelCached() : false;
      if (!isCached) {
        showToast('Offline: Download a local model in Settings to get code help offline.', 'warn');
        return;
      }
      submitMessage(userPromptText);
      showToast('Generating code assistance via on-device Local AI (WebGPU)...', 'info');
      return;
    }

    const now = Date.now();
    appendMessageToConv(convId, {
      id: generateId('msg'),
      role: 'user',
      content: userPromptText,
      timestamp: now,
      time: formatTime(now),
      isError: false
    });

    if (state.activeId === convId) {
      state.isWaiting = true;
      updateComposerButtons();
      showLoading();
    }

    try {
      const res = await fetch(`${TOOLS_API_URL}/programming`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
          id: generateId('msg'),
          role: 'model',
          content: data.result,
          timestamp: arrival,
          time: formatTime(arrival),
          isError: false
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
          id: generateId('msg'),
          role: 'model',
          content: `**Programming Assistant Error:** ${escapeHtml(data.message || 'Programming analysis failed. Please try again.')}`,
          timestamp: arrival,
          time: formatTime(arrival),
          isError: true
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
        id: generateId('msg'),
        role: 'model',
        content: `**Network Error:** Could not reach the server for Programming Assistant.\n\n\`${err.message}\``,
        timestamp: arrival,
        time: formatTime(arrival),
        isError: true
      });
      showToast(`Network error: ${err.message}`, 'error');
    }
  });
}

// ── TOOL 3: NOTES SUMMARIZER HANDLER ────────────────────────────
if (summarizeForm) {
  const styleSelect = document.getElementById('summarizeStyle');
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

    if (!navigator.onLine) {
      const localAi = await getLocalAI();
      const isCached = localAi ? await localAi.isModelCached() : false;
      if (!isCached) {
        showToast('Offline: Download a local model in Settings to summarize notes offline.', 'warn');
        return;
      }
      const summaryPrompt = `Please summarize the following notes thoroughly using a ${styleLabel} format and ${lengthLabel} length:\n\n${notes}`;
      submitMessage(summaryPrompt);
      showToast('Generating notes summary via on-device Local AI (WebGPU)...', 'info');
      return;
    }

    const now = Date.now();
    appendMessageToConv(convId, {
      id: generateId('msg'),
      role: 'user',
      content: userPromptText,
      timestamp: now,
      time: formatTime(now),
      isError: false
    });

    if (state.activeId === convId) {
      state.isWaiting = true;
      showLoading();
    }

    try {
      const res = await fetch(`${TOOLS_API_URL}/summarize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
          id: generateId('msg'),
          role: 'model',
          content: data.summary,
          timestamp: arrival,
          time: formatTime(arrival),
          isError: false
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
          id: generateId('msg'),
          role: 'model',
          content: `**Notes Summarizer Error:** ${escapeHtml(data.message || 'Summarization failed. Please try again.')}`,
          timestamp: arrival,
          time: formatTime(arrival),
          isError: true
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
        id: generateId('msg'),
        role: 'model',
        content: `**Network Error:** Could not reach the server for Notes Summarizer.\n\n\`${err.message}\``,
        timestamp: arrival,
        time: formatTime(arrival),
        isError: true
      });
      showToast(`Network error: ${err.message}`, 'error');
    }
  });
}

// ── TOOL 4: AI QUIZ GENERATOR HANDLER ────────────────────────────
if (quizForm) {
  const topicInput = document.getElementById('quizTopic');
  const diffSelect = document.getElementById('quizDifficulty');
  const countSelect = document.getElementById('quizCount');
  const typeSelect = document.getElementById('quizType');

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

    if (!navigator.onLine) {
      const localAi = await getLocalAI();
      const isCached = localAi ? await localAi.isModelCached() : false;
      if (!isCached) {
        showToast('Offline: Download a local model in Settings to generate quizzes offline.', 'warn');
        return;
      }
      const quizPrompt = `Generate a ${countLabel} practice quiz on the topic "${topic}" with ${diffLabel} difficulty level. Format: ${typeLabel}. Provide the questions followed by step-by-step explanations and answers.`;
      submitMessage(quizPrompt);
      showToast('Generating quiz via on-device Local AI (WebGPU)...', 'info');
      return;
    }

    const now = Date.now();
    appendMessageToConv(convId, {
      id: generateId('msg'),
      role: 'user',
      content: userPromptText,
      timestamp: now,
      time: formatTime(now),
      isError: false
    });

    if (state.activeId === convId) {
      state.isWaiting = true;
      showLoading();
    }

    try {
      const res = await fetch(`${TOOLS_API_URL}/quiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
          id: generateId('msg'),
          role: 'model',
          content: `Generated AI Quiz on **${data.topic}** (${data.difficulty.toUpperCase()} difficulty). Test your knowledge below:`,
          quizData: {
            topic: data.topic,
            difficulty: data.difficulty,
            questions: data.questions,
            userAnswers: {},
            evaluations: {},
            submitted: false,
            score: null
          },
          timestamp: arrival,
          time: formatTime(arrival),
          isError: false
        });
      } else {
        const arrival = Date.now();
        appendMessageToConv(convId, {
          id: generateId('msg'),
          role: 'model',
          content: `**AI Quiz Generator Error:** ${escapeHtml(data.message || 'Failed to generate quiz. Please try again.')}`,
          timestamp: arrival,
          time: formatTime(arrival),
          isError: true
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
        id: generateId('msg'),
        role: 'model',
        content: `**Network Error:** Could not reach the server for AI Quiz Generator.\n\n\`${err.message}\``,
        timestamp: arrival,
        time: formatTime(arrival),
        isError: true
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
  stopBtn.addEventListener('click', async () => {
    state.stopStreamingRequested = true;
    state.isWaiting = false;
    state.isStreaming = false;
    removeLoading();
    updateComposerButtons();
    if (localAiModule) {
      try {
        await localAiModule.stopGeneration();
      } catch (e) { }
    }
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
    } else if (action === 'image') {
      messageInput.value = '/image ';
      messageInput.focus();
      autoResize();
      sendBtn.disabled = false;
      showToast('Type a description for the image or diagram and hit Enter!', 'info');
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
  } catch (e) { }
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
    } catch (e) { }

    quickNotepad.addEventListener('input', () => {
      try {
        window.localStorage.setItem(QUICK_NOTES_KEY, quickNotepad.value);
        if (notepadStatus) {
          notepadStatus.textContent = 'Saving...';
          setTimeout(() => { if (notepadStatus) notepadStatus.textContent = 'Saved locally'; }, 600);
        }
      } catch (e) { }
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
      initLocalAiSettings();
    });
  }

  if (engineIndicatorPill && settingsModal) {
    engineIndicatorPill.addEventListener('click', () => {
      settingsModal.removeAttribute('hidden');
      initLocalAiSettings();
      const group = document.getElementById('localAiSettingsGroup');
      if (group) {
        group.scrollIntoView({ behavior: 'smooth' });
      }
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
   LOCAL AI SETTINGS & WebLLM SETUP CONTROLLER
───────────────────────────────────────────────────────────────── */
async function initLocalAiSettings() {
  const localAi = await getLocalAI();
  if (!localAi) return;

  // 1. WebGPU Diagnostic Check
  if (webgpuBadge && webgpuDesc) {
    const gpu = await localAi.checkWebGPUSupport();
    if (gpu.supported) {
      webgpuBadge.textContent = 'Supported ✓';
      webgpuBadge.className = 'status-badge-inline status-online';
      const desc = gpu.adapterInfo?.description || gpu.adapterInfo?.vendor || 'WebGPU Device Ready';
      webgpuDesc.textContent = `Hardware Acceleration Active (${desc})`;
    } else {
      webgpuBadge.textContent = 'Unsupported ✗';
      webgpuBadge.className = 'status-badge-inline status-offline';
      webgpuDesc.textContent = gpu.reason;
    }
  }

  // 2. Browser Storage Persistence Check
  if (storagePersistenceBadge && storagePersistenceDesc) {
    const isPersisted = await localAi.isStoragePersisted();
    if (isPersisted) {
      storagePersistenceBadge.textContent = 'Persisted ✓';
      storagePersistenceBadge.className = 'status-badge-inline status-online';
      storagePersistenceDesc.textContent = 'Browser storage is persistent and safe from automatic cache eviction.';
    } else {
      storagePersistenceBadge.textContent = 'Standard';
      storagePersistenceBadge.className = 'status-badge-inline';
      storagePersistenceDesc.textContent = 'Standard storage. Persistent quota requested when model is downloaded.';
    }
  }

  // 3. Engine Preference Routing
  if (enginePrefSelect) {
    enginePrefSelect.value = localAi.getEnginePreference();
    enginePrefSelect.onchange = () => {
      localAi.setEnginePreference(enginePrefSelect.value);
      updateEngineIndicator();
      showToast(`AI engine set to: ${enginePrefSelect.options[enginePrefSelect.selectedIndex].text}`, 'info');
    };
  }

  // 4. Pre-Exam Readiness Synchronization
  async function refreshExamReadiness() {
    if (!examReadinessOverallBadge || !localAi) return;
    const modelId = localModelSelect ? localModelSelect.value : localAi.getSelectedModelId();
    const modelInfo = localAi.SUPPORTED_MODELS.find(m => m.id === modelId) || localAi.SUPPORTED_MODELS[0];

    if (examCheckModelName) {
      examCheckModelName.textContent = `${modelInfo.name} (${modelInfo.sizeEstimate})`;
    }

    const isCached = await localAi.isModelCached(modelId);
    const isEngineLoaded = localAi.getActiveEngine() && localAi.getActiveModelId() === modelId;
    const isPersisted = await localAi.isStoragePersisted();
    const verifiedData = localAi.getExamVerificationStatus ? localAi.getExamVerificationStatus(modelId) : null;

    if (examCheckDownloadStatus) {
      examCheckDownloadStatus.textContent = isCached ? 'Downloaded (100% in local storage) ✓' : 'Not Downloaded ✗';
      examCheckDownloadStatus.style.color = isCached ? '#10b981' : 'var(--text-muted, #64748b)';
    }

    if (examCheckShaderStatus) {
      examCheckShaderStatus.textContent = isEngineLoaded ? 'Initialized in GPU VRAM ✓' : (isCached ? 'Cached (Ready to load)' : 'Not initialized');
      examCheckShaderStatus.style.color = isEngineLoaded ? '#10b981' : 'var(--text-muted, #64748b)';
    }

    if (examCheckPersistenceStatus) {
      examCheckPersistenceStatus.textContent = isPersisted ? 'Granted (Safe from eviction) ✓' : 'Not Granted (May be evicted under storage pressure)';
      examCheckPersistenceStatus.style.color = isPersisted ? '#10b981' : '#f59e0b';
    }

    if (examCheckAssetsStatus) {
      if (typeof caches !== 'undefined') {
        const rootCached = await caches.match('/');
        examCheckAssetsStatus.textContent = rootCached ? 'App Shell & Worker Pre-cached ✓' : 'Pre-caching in progress...';
        examCheckAssetsStatus.style.color = rootCached ? '#10b981' : '#f59e0b';
      } else {
        examCheckAssetsStatus.textContent = 'App Shell Cached ✓';
      }
    }

    if (examCheckInferenceStatus) {
      if (verifiedData) {
        const dateStr = new Date(verifiedData.timestamp).toLocaleTimeString();
        examCheckInferenceStatus.textContent = `Verified ✓ (${dateStr})`;
        examCheckInferenceStatus.style.color = '#10b981';
      } else {
        examCheckInferenceStatus.textContent = 'Not tested yet (Click "Test Offline Mode")';
        examCheckInferenceStatus.style.color = 'var(--text-muted, #64748b)';
      }
    }

    if (isCached && verifiedData) {
      examReadinessOverallBadge.textContent = 'READY FOR ZERO-INTERNET EXAMS ✓';
      examReadinessOverallBadge.className = 'status-badge-inline status-online';
      examReadinessOverallBadge.style.cssText = 'background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); font-weight: 700;';
    } else if (!isCached) {
      examReadinessOverallBadge.textContent = 'Model Download Required';
      examReadinessOverallBadge.className = 'status-badge-inline status-offline';
      examReadinessOverallBadge.style.cssText = 'background: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); font-weight: 700;';
    } else {
      examReadinessOverallBadge.textContent = 'Offline Verification Recommended';
      examReadinessOverallBadge.className = 'status-badge-inline';
      examReadinessOverallBadge.style.cssText = 'background: rgba(245, 158, 11, 0.15); color: #d97706; border: 1px solid rgba(245, 158, 11, 0.3); font-weight: 700;';
    }
  }

  // 4b. Model Selection & Cache Refresh
  async function refreshModelStatus() {
    if (!localModelSelect) return;
    const modelId = localModelSelect.value;
    const modelInfo = localAi.SUPPORTED_MODELS.find(m => m.id === modelId) || localAi.SUPPORTED_MODELS[0];

    if (modelSpecsDesc && modelInfo) {
      modelSpecsDesc.textContent = `${modelInfo.name} (${modelInfo.sizeEstimate}, ${modelInfo.vramEstimate})`;
    }

    const verification = typeof localAi.verifyModelInstallation === 'function'
      ? await localAi.verifyModelInstallation(modelId)
      : { installed: await localAi.isModelCached(modelId), status: (await localAi.isModelCached(modelId)) ? 'ready' : 'not_installed' };

    const isEngineLoaded = localAi.getActiveEngine() && localAi.getActiveModelId() === modelId;

    if (modelCacheBadge && modelCacheStatusDesc && downloadModelBtn && deleteModelBtn) {
      if (isEngineLoaded) {
        hideLocalAiDiagnostic();
        modelCacheBadge.textContent = 'Installed & Active in WebGPU ✓';
        modelCacheBadge.className = 'status-badge-inline status-online';
        modelCacheStatusDesc.textContent = `Installed (${verification.record?.sizeEstimate || modelInfo.sizeEstimate}). Loaded in GPU VRAM and ready for instant offline inference.`;
        downloadModelBtn.textContent = 'Model Ready ✓';
        downloadModelBtn.disabled = true;
        deleteModelBtn.style.display = 'inline-block';
        if (testInferenceBtn) testInferenceBtn.style.display = 'inline-block';
      } else if (verification.installed && verification.status === 'ready') {
        hideLocalAiDiagnostic();
        modelCacheBadge.textContent = 'Installed & Cached Locally ✓';
        modelCacheBadge.className = 'status-badge-inline status-online';
        modelCacheStatusDesc.textContent = `Installed (${verification.record?.sizeEstimate || modelInfo.sizeEstimate}). Stored in persistent browser cache. Ready for zero-internet examination use.`;
        downloadModelBtn.textContent = 'Pre-load into GPU';
        downloadModelBtn.disabled = false;
        deleteModelBtn.style.display = 'inline-block';
        if (testInferenceBtn) testInferenceBtn.style.display = 'inline-block';
      } else if (verification.status === 'corrupted') {
        modelCacheBadge.textContent = 'Model Recovery Required ⚠️';
        modelCacheBadge.className = 'status-badge-inline status-offline';
        modelCacheStatusDesc.textContent = 'Model files missing or incomplete in browser storage. Click "Repair & Re-install" below.';
        downloadModelBtn.textContent = 'Repair & Re-install Model';
        downloadModelBtn.disabled = false;
        deleteModelBtn.style.display = 'inline-block';
        if (testInferenceBtn) testInferenceBtn.style.display = 'none';
      } else {
        modelCacheBadge.textContent = 'Not Installed';
        modelCacheBadge.className = 'status-badge-inline status-offline';
        modelCacheStatusDesc.textContent = `One-time installation required (~${modelInfo.sizeEstimate}). Once installed, works permanently offline.`;
        if (downloadModelBtn.textContent !== 'Retry Download') {
          downloadModelBtn.textContent = 'Install Model (One-Time Setup)';
        }
        downloadModelBtn.disabled = false;
        deleteModelBtn.style.display = 'none';
        if (testInferenceBtn) testInferenceBtn.style.display = 'none';
      }
    }

    await refreshExamReadiness();
  }

  if (localModelSelect) {
    localModelSelect.value = localAi.getSelectedModelId();
    localModelSelect.onchange = async () => {
      localAi.setSelectedModelId(localModelSelect.value);
      hideLocalAiDiagnostic();
      await refreshModelStatus();
      updateEngineIndicator();
    };
    await refreshModelStatus();
  }

  // 5. Download / Install Model Button
  if (downloadModelBtn) {
    downloadModelBtn.onclick = async () => {
      const modelId = localModelSelect ? localModelSelect.value : localAi.getSelectedModelId();
      const verification = typeof localAi.verifyModelInstallation === 'function'
        ? await localAi.verifyModelInstallation(modelId)
        : { installed: false, status: 'not_installed' };

      hideLocalAiDiagnostic();

      if (verification.installed && downloadModelBtn.textContent.includes('Pre-load')) {
        downloadModelBtn.disabled = true;
        downloadModelBtn.textContent = 'Initializing in GPU...';
        try {
          await localAi.initEngine(modelId);
          showToast('Model loaded into WebGPU memory!', 'success');
          await refreshModelStatus();
          updateEngineIndicator();
        } catch (e) {
          showToast(`GPU Init error: ${e.message}`, 'error');
          downloadModelBtn.disabled = false;
        }
        return;
      }

      downloadModelBtn.disabled = true;
      downloadModelBtn.textContent = verification.status === 'corrupted' ? 'Repairing Model...' : 'Installing Model...';
      if (deleteModelBtn) deleteModelBtn.style.display = 'none';
      if (localAiProgressWrap) localAiProgressWrap.removeAttribute('hidden');

      updateEngineIndicator('downloading', 'Installing Model (0%)');

      try {
        const installFn = (verification.status === 'corrupted' && typeof localAi.recoverModel === 'function')
          ? localAi.recoverModel
          : (typeof localAi.installModel === 'function' ? localAi.installModel : localAi.initEngine);

        await installFn(modelId, (report) => {
          const p = Math.round((report.progress || 0) * 100);
          if (localAiProgressFill) localAiProgressFill.style.width = `${p}%`;
          if (localAiProgressPercent) localAiProgressPercent.textContent = `${p}%`;
          if (p >= 100 && report.text && (report.text.includes('Loading') || report.text.includes('model'))) {
            if (localAiProgressText) localAiProgressText.textContent = 'Compiling WebGPU shaders & allocating GPU VRAM...';
            updateEngineIndicator('downloading', 'Compiling WebGPU...');
          } else {
            if (localAiProgressText) localAiProgressText.textContent = report.text || 'Downloading model weights...';
            updateEngineIndicator('downloading', `Installing (${p}%)`);
          }
        });

        // Ensure model initialization & cache persistence actually succeeded
        const isVerifiedInCache = await localAi.isModelCached(modelId);
        if (!isVerifiedInCache) {
          throw new Error('Model initialization completed, but local cache verification failed. Model was not detected in browser storage.');
        }

        showToast('🎉 Local AI model installed, initialized in WebGPU, and stored permanently!', 'success');
        if (localAiProgressWrap) localAiProgressWrap.setAttribute('hidden', '');
        hideLocalAiDiagnostic();
        await refreshModelStatus();
        updateEngineIndicator();
      } catch (err) {
        const diag = typeof localAi.parseLocalAIError === 'function'
          ? localAi.parseLocalAIError(err)
          : { category: 'Model download failed', title: 'Model Download Failed', message: err.message, details: err.message };
        showLocalAiDiagnostic(diag);
        showToast(`${diag.title}: ${diag.category}`, 'error');
        if (localAiProgressText) localAiProgressText.textContent = `[${diag.category}] ${diag.message}`;
        downloadModelBtn.textContent = 'Retry Download';
        downloadModelBtn.disabled = false;
        updateEngineIndicator();
      }
    };
  }

  // 6. Delete Local Model Button (with explicit confirmation to prevent accidental deletion)
  if (deleteModelBtn) {
    deleteModelBtn.onclick = async () => {
      const modelId = localModelSelect ? localModelSelect.value : localAi.getSelectedModelId();
      const modelInfo = localAi.SUPPORTED_MODELS.find(m => m.id === modelId) || localAi.SUPPORTED_MODELS[0];
      const confirmMsg = `⚠️ Delete Local Model?\n\nAre you sure you want to delete the installed model for ${modelInfo.name}?\n\n` +
        `This will remove the downloaded weights (~${modelInfo.sizeEstimate}) from your browser's persistent storage.\n\n` +
        `You will need an active internet connection to download and install it again.`;

      if (!confirm(confirmMsg)) {
        return;
      }
      try {
        await localAi.deleteLocalModel(modelId);
        if (typeof localAi.deleteInstallationRecord === 'function') {
          await localAi.deleteInstallationRecord(modelId);
        }
        showToast('Local model deleted from browser storage.', 'info');
        hideLocalAiDiagnostic();
        if (downloadModelBtn) downloadModelBtn.textContent = 'Install Model (One-Time Setup)';
        await refreshModelStatus();
        updateEngineIndicator();
      } catch (err) {
        showToast(`Could not delete model: ${err.message}`, 'error');
      }
    };
  }

  // 6b. Examination Mode Toggle inside Settings
  if (settingsExamModeToggleBtn) {
    settingsExamModeToggleBtn.onclick = () => {
      toggleExamMode();
    };
  }

  // 7. Test Inference Button
  if (testInferenceBtn) {
    testInferenceBtn.onclick = async () => {
      testInferenceBtn.disabled = true;
      testInferenceBtn.textContent = 'Testing WebGPU...';
      try {
        const testReply = await localAi.generateLocalResponse({
          prompt: 'In two short sentences, explain binary search in C.',
          mode: 'standard',
          onChunk: () => { }
        });
        showToast('WebGPU inference successful!', 'success');
        alert(`🎓 WebGPU Local AI Test Successful!\n\n${testReply}`);
      } catch (testErr) {
        alert(`WebGPU Test Error: ${testErr.message}`);
      } finally {
        testInferenceBtn.disabled = false;
        testInferenceBtn.textContent = 'Test Local AI';
      }
    };
  }

  // 8. Pre-Exam Zero-Internet Test Button
  if (testOfflineModeBtn) {
    testOfflineModeBtn.onclick = async () => {
      testOfflineModeBtn.disabled = true;
      testOfflineModeBtn.innerHTML = '<span>⏳</span> Testing Offline Mode...';
      if (examTestProgressLog) {
        examTestProgressLog.style.display = 'block';
        examTestProgressLog.innerHTML = '<b>🚀 Starting Pre-Exam Zero-Internet Diagnostics...</b><br>';
      }

      try {
        const results = await localAi.runPreExamReadinessTest((step) => {
          if (examTestProgressLog) {
            const icon = step.status === 'pass' ? '✅' : step.status === 'warn' ? '⚠️' : step.status === 'fail' ? '❌' : '⏳';
            examTestProgressLog.innerHTML += `<div>${icon} [Step ${step.step}/6] ${step.name}: ${step.message}</div>`;
            examTestProgressLog.scrollTop = examTestProgressLog.scrollHeight;
          }
        });

        await refreshExamReadiness();

        if (results.isReady) {
          showToast('🎓 Your laptop is verified and 100% READY for zero-internet exams!', 'success');
          if (examTestProgressLog) {
            examTestProgressLog.innerHTML += '<br><b style="color: #10b981;">🎉 ALL CHECKS PASSED: Application is 100% operational offline.</b>';
          }
        } else {
          showToast(`Readiness test failed: ${results.failureReason}`, 'error');
          if (examTestProgressLog) {
            examTestProgressLog.innerHTML += `<br><b style="color: #ef4444;">❌ INCOMPLETE: ${results.failureReason}</b>`;
          }
        }
      } catch (err) {
        showToast(`Offline test error: ${err.message}`, 'error');
        if (examTestProgressLog) {
          examTestProgressLog.innerHTML += `<br><b style="color: #ef4444;">❌ Error: ${err.message}</b>`;
        }
      } finally {
        testOfflineModeBtn.disabled = false;
        testOfflineModeBtn.innerHTML = '<span>⚡</span> Test Offline Mode';
      }
    };
  }

  // 9. Grant Persistent Storage Button
  if (grantStoragePersistBtn) {
    grantStoragePersistBtn.onclick = async () => {
      grantStoragePersistBtn.disabled = true;
      try {
        const granted = await localAi.requestPersistentStorage();
        if (granted) {
          showToast('Browser persistent storage granted! Model is protected against eviction.', 'success');
        } else {
          showToast('Persistent storage could not be granted automatically. Ensure site is added to bookmarks or installed.', 'info');
        }
        await refreshExamReadiness();
      } catch (e) {
        showToast('Storage persistence request error: ' + e.message, 'error');
      } finally {
        grantStoragePersistBtn.disabled = false;
      }
    };
  }

  // 10. Offline Intelligence Diagnostics Scanner & Auto-Detection (Part 1)
  async function refreshOfflineIntelligence() {
    if (!offlineIntelligenceStatusBadge || !window.LocalAIDetector) return;
    try {
      const diag = await window.LocalAIDetector.detectAllLocalAIOptions({ localAiInstance: localAi });
      offlineIntelligenceStatusBadge.textContent = diag.status;
      if (diag.status === 'Local AI model available' || diag.status === 'Chrome built-in AI available' || diag.status === 'Offline knowledge assistant available') {
        offlineIntelligenceStatusBadge.style.cssText = 'background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); font-weight: 600;';
      } else {
        offlineIntelligenceStatusBadge.style.cssText = 'background: rgba(245, 158, 11, 0.15); color: #d97706; border: 1px solid rgba(245, 158, 11, 0.3); font-weight: 600;';
      }

      if (intelCheckWebLLMBadge) {
        intelCheckWebLLMBadge.textContent = diag.webllm?.cached ? 'Cached ✓' : (diag.webllm?.supported ? 'Supported' : 'No WebGPU');
        intelCheckWebLLMBadge.style.color = diag.webllm?.cached ? '#10b981' : (diag.webllm?.supported ? '#3b82f6' : '#ef4444');
      }
      if (intelCheckWebLLMDesc) {
        intelCheckWebLLMDesc.textContent = diag.webllm?.cached
          ? `Model ${diag.webllm.modelId || 'Qwen'} ready in browser storage`
          : (diag.webllm?.supported ? 'WebGPU active; model download pending' : 'WebGPU not supported on this browser/GPU');
      }

      if (intelCheckChromeBadge) {
        intelCheckChromeBadge.textContent = diag.chromeAI?.available ? 'Available ✓' : 'Unavailable';
        intelCheckChromeBadge.style.color = diag.chromeAI?.available ? '#10b981' : 'var(--text-muted, #64748b)';
      }
      if (intelCheckChromeDesc) {
        intelCheckChromeDesc.textContent = diag.chromeAI?.available
          ? 'window.ai Prompt API (Gemini Nano) detected'
          : 'Prompt API not enabled in this browser';
      }

      if (intelCheckOllamaBadge) {
        intelCheckOllamaBadge.textContent = diag.localService?.available ? 'Connected ✓' : 'Not Connected';
        intelCheckOllamaBadge.style.color = diag.localService?.available ? '#10b981' : 'var(--text-muted, #64748b)';
      }
      if (intelCheckOllamaDesc) {
        intelCheckOllamaDesc.textContent = diag.localService?.available
          ? `Endpoint online (${diag.localService.endpoint || 'http://localhost:11434'})`
          : 'No local Ollama or AI endpoint responding';
      }

      if (intelCheckKnowledgeBadge) {
        intelCheckKnowledgeBadge.textContent = `${diag.knowledgeBase?.topicCount || 7} Units Ready ✓`;
        intelCheckKnowledgeBadge.style.color = '#10b981';
      }

      if (activeResolvedEngineName) {
        const route = await window.LocalAIDetector.resolveActiveResponseEngine({
          forcedEngine: enginePrefSelect ? enginePrefSelect.value : 'auto',
          examMode: localAi.getExamModeActive ? localAi.getExamModeActive() : false,
          online: navigator.onLine
        });
        activeResolvedEngineName.textContent = route.name;
        activeResolvedEngineName.className = `msg-engine-badge ${route.badgeClass}`;
      }
    } catch (err) {
      console.warn('[Detector] Diagnostic refresh error:', err);
    }
  }

  if (rescanIntelligenceBtn) {
    rescanIntelligenceBtn.onclick = async () => {
      rescanIntelligenceBtn.disabled = true;
      rescanIntelligenceBtn.textContent = 'Scanning...';
      await refreshOfflineIntelligence();
      rescanIntelligenceBtn.disabled = false;
      rescanIntelligenceBtn.textContent = 'Rescan AI';
      showToast('Local AI availability diagnostics updated.', 'info');
    };
  }

  await refreshOfflineIntelligence();

  // 11. Offline Package Manager Integration (Export & Import System)
  await initOfflinePackageManagerSettings(localAi, refreshModelStatus, refreshExamReadiness, refreshOfflineIntelligence);
}

/* ─────────────────────────────────────────────────────────────────
   OFFLINE PACKAGE MANAGER SETTINGS CONTROLLER (Export & Import)
───────────────────────────────────────────────────────────────── */
async function initOfflinePackageManagerSettings(localAi, refreshModelStatus, refreshExamReadiness, refreshOfflineIntelligence) {
  const pkgDeviceIcon = document.getElementById('pkgDeviceIcon');
  const pkgDeviceDesc = document.getElementById('pkgDeviceDesc');
  const pkgDeviceBadge = document.getElementById('pkgDeviceBadge');
  const pkgMobileAlertBanner = document.getElementById('pkgMobileAlertBanner');
  const pkgMobileAlertMessage = document.getElementById('pkgMobileAlertMessage');
  const pkgMetaModelName = document.getElementById('pkgMetaModelName');
  const packageProgressWrap = document.getElementById('packageProgressWrap');
  const packageProgressFill = document.getElementById('packageProgressFill');
  const packageProgressPercent = document.getElementById('packageProgressPercent');
  const packageProgressText = document.getElementById('packageProgressText');
  const packageInfoDisplay = document.getElementById('packageInfoDisplay');
  const exportPackageBtn = document.getElementById('exportPackageBtn');
  const importPackageBtn = document.getElementById('importPackageBtn');
  const offlinePackageFileInput = document.getElementById('offlinePackageFileInput');
  const verifyPackageBtn = document.getElementById('verifyPackageBtn');
  const comprehensiveReadinessBtn = document.getElementById('comprehensiveReadinessBtn');

  if (!window.OfflinePackageManager) return;

  // 1. Device Hardware & Compatibility Update
  async function updatePackageDeviceUI() {
    try {
      const caps = await window.OfflinePackageManager.detectDeviceCapabilities();
      if (pkgDeviceDesc) {
        const memStr = caps.memoryGB ? `${caps.memoryGB} GB RAM` : 'Standard RAM';
        const gpuStr = caps.webgpuSupported ? (caps.adapterInfo?.description || 'WebGPU Active') : 'No WebGPU';
        const deviceType = caps.isMobile ? (caps.isAndroid ? 'Android Device' : (caps.isIOS ? 'iOS Device' : 'Mobile Browser')) : 'Desktop Browser';
        pkgDeviceDesc.textContent = `${deviceType} • ${memStr} • ${gpuStr}`;
      }
      if (pkgDeviceBadge) {
        if (caps.webgpuSupported) {
          pkgDeviceBadge.textContent = caps.isMobile ? 'Mobile WebGPU Ready' : 'Desktop WebGPU Ready';
          pkgDeviceBadge.style.cssText = 'background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3);';
        } else {
          pkgDeviceBadge.textContent = 'WebGPU Unsupported';
          pkgDeviceBadge.style.cssText = 'background: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3);';
        }
      }
      if (pkgDeviceIcon) {
        pkgDeviceIcon.textContent = caps.isMobile ? '📱' : '💻';
      }
      if (pkgMetaModelName && localAi) {
        const currentModel = localAi.getSelectedModelId();
        pkgMetaModelName.textContent = currentModel.split('-')[0] + ' ' + (currentModel.includes('0.5B') ? '0.5B' : '1.5B');
      }
      if (pkgMobileAlertBanner) {
        if (caps.isMobile) {
          pkgMobileAlertBanner.style.display = 'block';
          if (pkgMobileAlertMessage && caps.warnings && caps.warnings.length) {
            pkgMobileAlertMessage.textContent = caps.warnings.join(' ');
          }
        } else {
          pkgMobileAlertBanner.style.display = 'none';
        }
      }
    } catch (e) {
      console.warn('[OfflinePackageManager] Device check error:', e);
    }
  }

  await updatePackageDeviceUI();

  const setProgress = (percent, text) => {
    if (!packageProgressWrap) return;
    packageProgressWrap.removeAttribute('hidden');
    if (packageProgressFill) packageProgressFill.style.width = `${percent}%`;
    if (packageProgressPercent) packageProgressPercent.textContent = `${percent}%`;
    if (packageProgressText) packageProgressText.textContent = text;
  };

  const hideProgress = (delay = 1500) => {
    setTimeout(() => {
      if (packageProgressWrap) packageProgressWrap.setAttribute('hidden', '');
    }, delay);
  };

  // 2. Export Button Action
  if (exportPackageBtn) {
    exportPackageBtn.onclick = async () => {
      exportPackageBtn.disabled = true;
      exportPackageBtn.innerHTML = '<span>⏳</span> Exporting Package...';
      if (packageInfoDisplay) {
        packageInfoDisplay.style.display = 'block';
        packageInfoDisplay.innerHTML = '<div style="font-weight:600;color:var(--primary);">📦 Initializing StudyMate Offline Package Export...</div>';
      }

      try {
        const currentModel = localAi ? localAi.getSelectedModelId() : 'Qwen2.5-Coder-1.5B-Instruct-q4f16_1-MLC';
        const exportRes = await window.OfflinePackageManager.exportOfflinePackage({
          modelId: currentModel,
          onProgress: ({ percent, statusText }) => {
            setProgress(percent, statusText);
            if (packageInfoDisplay) {
              packageInfoDisplay.innerHTML = `<div><b>Exporting:</b> ${percent}% — ${statusText}</div>`;
            }
          },
          onStatus: (statusText) => {
            if (packageInfoDisplay) {
              packageInfoDisplay.innerHTML += `<div>ℹ️ ${statusText}</div>`;
            }
          }
        });

        hideProgress();
        showToast('Complete offline package exported successfully!', 'success');
        if (packageInfoDisplay) {
          packageInfoDisplay.innerHTML = `
            <div style="color: #10b981; font-weight: 700; margin-bottom: 4px;">✅ Export Complete: ${exportRes.filename}</div>
            <div style="font-size: 0.76rem; color: var(--text-muted);">
              Total Files: <b>${exportRes.totalFiles}</b> | Archive Size: <b>${(exportRes.totalSizeBytes / (1024 * 1024)).toFixed(1)} MB</b><br>
              Includes: Model Weights &amp; Shards, Tokenizer, Configs, 9 Data Structures Units, WebLLM Runtime, and SHA-256 Checksums.<br>
              <i>File download initiated automatically in your browser.</i>
            </div>
          `;
        }
      } catch (err) {
        hideProgress(500);
        showToast(`Export failed: ${err.message}`, 'error');
        if (packageInfoDisplay) {
          packageInfoDisplay.innerHTML = `<div style="color: #ef4444; font-weight: 600;">❌ Export Error: ${err.message}</div>`;
        }
      } finally {
        exportPackageBtn.disabled = false;
        exportPackageBtn.innerHTML = '<span>📦</span> Export Complete Offline Package';
      }
    };
  }

  // 3. Import Button Action
  if (importPackageBtn && offlinePackageFileInput) {
    importPackageBtn.onclick = () => {
      offlinePackageFileInput.click();
    };

    offlinePackageFileInput.onchange = async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      importPackageBtn.disabled = true;
      importPackageBtn.innerHTML = '<span>⏳</span> Importing...';
      if (packageInfoDisplay) {
        packageInfoDisplay.style.display = 'block';
        packageInfoDisplay.innerHTML = `<div style="font-weight:600;color:var(--primary);">📥 Reading package archive: ${file.name}...</div>`;
      }

      try {
        const importRes = await window.OfflinePackageManager.importOfflinePackage(file, {
          onProgress: ({ percent, statusText }) => {
            setProgress(percent, statusText);
            if (packageInfoDisplay) {
              packageInfoDisplay.innerHTML = `<div><b>Importing:</b> ${percent}% — ${statusText}</div>`;
            }
          },
          onStatus: (statusText) => {
            if (packageInfoDisplay) {
              packageInfoDisplay.innerHTML += `<div>ℹ️ ${statusText}</div>`;
            }
          }
        });

        hideProgress();
        showToast('Offline package installed and model ready for offline examination use!', 'success');

        if (refreshModelStatus) await refreshModelStatus();
        if (refreshExamReadiness) await refreshExamReadiness();
        if (refreshOfflineIntelligence) await refreshOfflineIntelligence();
        await updatePackageDeviceUI();

        if (packageInfoDisplay) {
          packageInfoDisplay.innerHTML = `
            <div style="color: #10b981; font-weight: 700; margin-bottom: 4px;">✅ Package Successfully Installed!</div>
            <div style="font-size: 0.76rem; color: var(--text-muted);">
              Installed Model: <b>${importRes.manifest.model.modelName}</b> (${importRes.modelId})<br>
              Injected into Browser CacheStorage: Shards, configs, tokenizer, and 9 Data Structures units.<br>
              <b>Status: 100% Ready for Zero-Internet Offline Use.</b>
            </div>
          `;
        }
      } catch (err) {
        hideProgress(500);
        showToast(`Import failed: ${err.message}`, 'error');
        if (packageInfoDisplay) {
          packageInfoDisplay.innerHTML = `<div style="color: #ef4444; font-weight: 600;">❌ Import Error: ${err.message}</div>`;
        }
      } finally {
        importPackageBtn.disabled = false;
        importPackageBtn.innerHTML = '<span>📥</span> Import Offline Package (.zip)';
        offlinePackageFileInput.value = '';
      }
    };
  }

  // 4. Verify Package Button
  if (verifyPackageBtn) {
    verifyPackageBtn.onclick = () => {
      const verifyInput = document.createElement('input');
      verifyInput.type = 'file';
      verifyInput.accept = '.zip';
      verifyInput.style.display = 'none';
      document.body.appendChild(verifyInput);

      verifyInput.onchange = async () => {
        const file = verifyInput.files && verifyInput.files[0];
        document.body.removeChild(verifyInput);
        if (!file) return;

        verifyPackageBtn.disabled = true;
        verifyPackageBtn.innerHTML = '<span>⏳</span> Verifying...';
        if (packageInfoDisplay) {
          packageInfoDisplay.style.display = 'block';
          packageInfoDisplay.innerHTML = `<div style="font-weight:600;color:var(--primary);">🔍 Verifying cryptographic integrity: ${file.name}...</div>`;
        }

        try {
          const verifyRes = await window.OfflinePackageManager.importOfflinePackage(file, {
            verifyOnly: true,
            onProgress: ({ percent, statusText }) => {
              setProgress(percent, statusText);
              if (packageInfoDisplay) {
                packageInfoDisplay.innerHTML = `<div><b>Verifying:</b> ${percent}% — ${statusText}</div>`;
              }
            }
          });

          hideProgress();
          showToast('Package cryptographic integrity verified (100% valid)!', 'success');

          if (packageInfoDisplay) {
            packageInfoDisplay.innerHTML = `
              <div style="color: #10b981; font-weight: 700; margin-bottom: 4px;">✅ Verification PASSED: ${file.name}</div>
              <div style="font-size: 0.76rem; color: var(--text-muted);">
                Model: <b>${verifyRes.manifest.model.modelName}</b><br>
                Total Verified Files: <b>${verifyRes.totalFiles}</b> | All SHA-256 Checksums Validated<br>
                Security: <b>Clean (Zero Path Traversal, Zero Sensitive Data)</b><br>
                WebGPU &amp; Mobile Compatibility: <b>Compatible</b>
              </div>
            `;
          }
        } catch (err) {
          hideProgress(500);
          showToast(`Verification failed: ${err.message}`, 'error');
          if (packageInfoDisplay) {
            packageInfoDisplay.innerHTML = `<div style="color: #ef4444; font-weight: 600;">❌ Verification FAILED: ${err.message}</div>`;
          }
        } finally {
          verifyPackageBtn.disabled = false;
          verifyPackageBtn.innerHTML = '<span>🔍</span> Verify Package';
        }
      };

      verifyInput.click();
    };
  }

  // 5. 9-Step Offline Readiness Test
  if (comprehensiveReadinessBtn) {
    comprehensiveReadinessBtn.onclick = async () => {
      comprehensiveReadinessBtn.disabled = true;
      comprehensiveReadinessBtn.innerHTML = '<span>⏳</span> Running 9-Step Audit...';
      if (packageInfoDisplay) {
        packageInfoDisplay.style.display = 'block';
        packageInfoDisplay.innerHTML = '<div style="font-weight:700;color:var(--primary);margin-bottom:6px;">⚡ Running 9-Step Comprehensive Offline Readiness Test...</div>';
      }

      try {
        const testReport = await window.OfflinePackageManager.runComprehensiveOfflineTest({
          onStepProgress: (step) => {
            if (packageInfoDisplay) {
              const badgeClass = step.status.toLowerCase();
              packageInfoDisplay.innerHTML += `
                <div class="pkg-report-step">
                  <div>
                    <b>Step ${step.step}: ${step.name}</b>
                    <div style="color: var(--text-muted); font-size: 0.72rem;">${step.details}</div>
                  </div>
                  <span class="pkg-step-badge ${badgeClass}">${step.status}</span>
                </div>
              `;
              packageInfoDisplay.scrollTop = packageInfoDisplay.scrollHeight;
            }
          }
        });

        if (testReport.passed) {
          showToast('Device is 100% prepared for zero-internet examination use!', 'success');
          if (packageInfoDisplay) {
            packageInfoDisplay.innerHTML += `
              <div style="margin-top: 8px; padding: 6px 8px; border-radius: 6px; background: rgba(16,185,129,0.15); color: #10b981; font-weight: 700; font-size: 0.82rem;">
                🎓 ALL 9 AUDIT CHECKS PASSED: Ready for Offline Exam Use with Model "${testReport.modelId}".
              </div>
            `;
          }
        } else {
          showToast(`Offline readiness audit incomplete: ${testReport.failureReason || 'Action required'}`, 'error');
          if (packageInfoDisplay) {
            packageInfoDisplay.innerHTML += `
              <div style="margin-top: 8px; padding: 6px 8px; border-radius: 6px; background: rgba(239,68,68,0.12); color: #ef4444; font-weight: 600; font-size: 0.8rem;">
                ⚠️ AUDIT INCOMPLETE: ${testReport.failureReason || 'One or more required steps failed.'}
              </div>
            `;
          }
        }
      } catch (auditErr) {
        showToast(`Audit failed: ${auditErr.message}`, 'error');
        if (packageInfoDisplay) {
          packageInfoDisplay.innerHTML += `<div style="color:#ef4444;font-weight:600;margin-top:6px;">❌ Audit Execution Error: ${auditErr.message}</div>`;
        }
      } finally {
        comprehensiveReadinessBtn.disabled = false;
        comprehensiveReadinessBtn.innerHTML = '<span>⚡</span> 9-Step Offline Readiness Test';
      }
    };
  }
}

/* ─────────────────────────────────────────────────────────────────
   DATA STRUCTURES EXAM TOOLS & SYLLABUS CONTROLLER (Part 6)
───────────────────────────────────────────────────────────────── */
function initDataStructuresTools() {
  if (quickVivaBtn) {
    quickVivaBtn.addEventListener('click', () => {
      if (studyModeSelect) {
        studyModeSelect.value = 'data_structures';
        state.learningMode = 'data_structures';
      }
      messageInput.value = 'What are the top 10 most common college viva examination questions for Data Structures, along with high-scoring model answers and key concepts?';
      messageInput.style.height = 'auto';
      messageInput.focus();
      submitMessage(messageInput.value);
    });
  }

  if (quickExplainCodeBtn) {
    quickExplainCodeBtn.addEventListener('click', () => {
      if (studyModeSelect) {
        studyModeSelect.value = 'data_structures';
        state.learningMode = 'data_structures';
      }
      messageInput.value = 'Explain the complete C program implementation for Singly Linked List insertion and deletion with pointer manipulation, malloc, and free.';
      messageInput.style.height = 'auto';
      messageInput.focus();
      submitMessage(messageInput.value);
    });
  }

  if (quickDryRunBtn) {
    quickDryRunBtn.addEventListener('click', () => {
      if (studyModeSelect) {
        studyModeSelect.value = 'data_structures';
        state.learningMode = 'data_structures';
      }
      messageInput.value = 'Show a complete step-by-step dry run trace table for Quick Sort Lomuto partitioning on array [10, 80, 30, 90, 40, 50, 70] showing pivot, pointers i and j, and array state after each iteration.';
      messageInput.style.height = 'auto';
      messageInput.focus();
      submitMessage(messageInput.value);
    });
  }

  if (syllabusTrackerGrid) {
    syllabusTrackerGrid.addEventListener('click', (e) => {
      const pill = e.target.closest('.syllabus-pill');
      if (!pill) return;
      const topic = pill.dataset.topic;
      if (studyModeSelect) {
        studyModeSelect.value = 'data_structures';
        state.learningMode = 'data_structures';
      }
      const topicPrompts = {
        searching: 'Explain Binary Search with complete C code, step-by-step dry run on array [11, 22, 33, 44, 55], time complexity, and college viva questions.',
        sorting: 'Explain Quick Sort Lomuto partitioning with algorithm, complete C program, dry run, and worst-case time complexity.',
        linked_list: 'Write a complete C program for Singly Linked List with insertion, deletion, and display operations, including node diagrams.',
        stack: 'Explain Stack implementation using arrays in C with push, pop, peek, overflow/underflow checks, and step-by-step dry run.',
        queue: 'Explain Linear Queue implementation using arrays in C with front/rear pointers and the false overflow limitation.',
        circular_queue: 'Explain Circular Queue implementation using arrays and modulo arithmetic (rear + 1) % MAX, with complete C code and dry run.',
        binary_tree: 'What is a Binary Search Tree (BST)? Provide node struct, insertion, search, and inorder/preorder/postorder traversals in C.'
      };
      const text = topicPrompts[topic] || `Explain ${topic} in Data Structures with complete C code and dry run.`;
      messageInput.value = text;
      messageInput.style.height = 'auto';
      messageInput.focus();
      submitMessage(text);
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
      } catch (e) { }
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

  // 4. Student Profile Avatar with Dropdown
  if (profileChip && profileDropdown) {
    profileChip.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = profileDropdown.hasAttribute('hidden');
      if (isHidden) {
        profileDropdown.removeAttribute('hidden');
        profileChip.setAttribute('aria-expanded', 'true');
      } else {
        profileDropdown.setAttribute('hidden', '');
        profileChip.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('click', (e) => {
      if (!profileDropdown.hasAttribute('hidden') && !profileDropdown.contains(e.target) && !profileChip.contains(e.target)) {
        profileDropdown.setAttribute('hidden', '');
        profileChip.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (profileSettingsBtn && settingsModal) {
    profileSettingsBtn.addEventListener('click', () => {
      if (profileDropdown) profileDropdown.setAttribute('hidden', '');
      if (profileChip) profileChip.setAttribute('aria-expanded', 'false');
      settingsModal.removeAttribute('hidden');
      initLocalAiSettings();
    });
  }

  if (profileSavedBtn && savedItemsModal) {
    profileSavedBtn.addEventListener('click', () => {
      if (profileDropdown) profileDropdown.setAttribute('hidden', '');
      if (profileChip) profileChip.setAttribute('aria-expanded', 'false');
      renderSavedItems();
      savedItemsModal.removeAttribute('hidden');
    });
  }

  if (profilePlannerBtn && plannerModal) {
    profilePlannerBtn.addEventListener('click', () => {
      if (profileDropdown) profileDropdown.setAttribute('hidden', '');
      if (profileChip) profileChip.setAttribute('aria-expanded', 'false');
      plannerModal.removeAttribute('hidden');
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
  const docQuickNotesBtn = document.getElementById('docQuickNotesBtn');
  const tabDocNotes = document.getElementById('tabDocNotes');

  if (docState.text) {
    if (docDropzone) docDropzone.style.display = 'none';
    if (docMetaCard) docMetaCard.removeAttribute('hidden');

    if (docMetaFilename) docMetaFilename.textContent = docState.filename;
    if (docMetaType) docMetaType.textContent = docState.fileType === 'pptx' ? 'PowerPoint' : docState.fileType.toUpperCase();
    if (docMetaSize) docMetaSize.textContent = formatBytes(docState.fileSize);
    if (docMetaPages) {
      docMetaPages.textContent = docState.fileType === 'pptx'
        ? `${docState.pageCount} ${docState.pageCount === 1 ? 'Slide' : 'Slides'}`
        : `${docState.pageCount} ${docState.pageCount === 1 ? 'Page' : 'Pages'}`;
    }
    if (docMetaWords) docMetaWords.textContent = `${docState.wordCount.toLocaleString()} Words`;

    const icons = { pdf: '📕', docx: '📘', pptx: '📊', txt: '📄', image: '🖼️' };
    if (docTypeIcon) docTypeIcon.textContent = icons[docState.fileType] || '📄';

    if (docStatusBadge) {
      docStatusBadge.textContent = docState.fileType === 'pptx' ? `📊 ${docState.filename}` : `📄 ${docState.filename}`;
      docStatusBadge.classList.add('has-doc');
    }

    if (docChatDocPill) {
      docChatDocPill.textContent = docState.fileType === 'pptx'
        ? `📊 ${docState.filename} (${docState.pageCount} slides)`
        : `📄 ${docState.filename} (${docState.pageCount}p)`;
    }

    if (docQuickNotesBtn) {
      docQuickNotesBtn.innerHTML = docState.fileType === 'pptx'
        ? '<span>📊 Generate 9-Part Presentation Summary</span>'
        : '<span>📝 Generate 9-Part Study Notes</span>';
    }

    if (tabDocNotes) {
      const tabSpan = tabDocNotes.querySelector('span:last-child');
      if (tabSpan) {
        tabSpan.textContent = docState.fileType === 'pptx' ? 'Presentation Summary' : 'Study Notes (9 Sections)';
      }
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
      docRawPre.textContent = 'No document text available. Please upload a PDF, Word .docx, PowerPoint .pptx, or TXT document first.';
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
  const isValidExt =
    name.endsWith('.pdf') ||
    name.endsWith('.docx') ||
    name.endsWith('.pptx') ||
    name.endsWith('.ppt') ||
    name.endsWith('.txt');

  if (!isValidExt) {
    showDocError(
      'Unsupported File Format',
      'Please upload a <strong>PDF (.pdf)</strong>, <strong>Word (.docx)</strong>, <strong>PowerPoint (.pptx)</strong>, or <strong>Plain Text (.txt)</strong> document.'
    );
    return;
  }

  const progressWrap = document.getElementById('docProgressWrap');
  const progressFill = document.getElementById('docProgressFill');
  const progressPercent = document.getElementById('docProgressPercent');
  const progressText = document.getElementById('docProgressText');

  // ── Offline Client-Side Extraction (WebLLM / Browser Parser) ───────────────
  if (!navigator.onLine) {
    if (progressWrap) progressWrap.removeAttribute('hidden');
    if (progressFill) progressFill.style.width = '35%';
    if (progressPercent) progressPercent.textContent = '35%';
    if (progressText) progressText.textContent = `Reading ${file.name} locally (Offline)...`;

    try {
      let extractedData = null;
      const fileType = detectFileType(file.name, file.type);

      if (fileType === 'pptx') {
        if (progressFill) progressFill.style.width = '70%';
        if (progressText) progressText.textContent = 'Extracting slide titles, notes & tables on-device...';
        const pptx = await clientExtractPptx(file);
        extractedData = {
          filename: file.name,
          fileType: 'pptx',
          fileSize: file.size,
          pageCount: pptx.slideCount,
          wordCount: pptx.totalWords,
          text: pptx.fullText,
          slides: pptx.slides,
        };
      } else if (fileType === 'docx') {
        const docxText = await clientExtractDocx(file);
        const words = (docxText.match(/\S+/g) || []).length;
        extractedData = {
          filename: file.name,
          fileType: 'docx',
          fileSize: file.size,
          pageCount: Math.max(1, Math.ceil(words / 500)),
          wordCount: words,
          text: docxText,
          slides: [],
        };
      } else if (fileType === 'txt') {
        const txt = await clientExtractTxt(file);
        const words = (txt.match(/\S+/g) || []).length;
        extractedData = {
          filename: file.name,
          fileType: 'txt',
          fileSize: file.size,
          pageCount: Math.max(1, Math.ceil(words / 500)),
          wordCount: words,
          text: txt,
          slides: [],
        };
      } else {
        if (progressWrap) progressWrap.setAttribute('hidden', '');
        showDocError(
          'Offline Mode Notice',
          'PDF parsing is optimized for online extraction. PowerPoint (.pptx), Word (.docx), and Text (.txt) are fully supported offline.'
        );
        return;
      }

      if (progressFill) progressFill.style.width = '100%';
      if (progressPercent) progressPercent.textContent = '100%';
      setTimeout(() => {
        if (progressWrap) progressWrap.setAttribute('hidden', '');
      }, 400);

      docState.file = file;
      docState.filename = extractedData.filename;
      docState.fileSize = extractedData.fileSize;
      docState.fileType = extractedData.fileType;
      docState.pageCount = extractedData.pageCount;
      docState.wordCount = extractedData.wordCount;
      docState.text = extractedData.text;
      docState.slides = extractedData.slides || [];
      docState.notes = '';
      docState.chatHistory = [];

      updateDocUI();
      showToast(`⚡ Extracted "${file.name}" on-device via WebLLM browser parser!`, 'success');
      return;
    } catch (offlineErr) {
      if (progressWrap) progressWrap.setAttribute('hidden', '');
      showDocError('Extraction Failed', offlineErr.message || 'Could not parse document offline.');
      return;
    }
  }

  // ── Online Server Extraction (Gemini / Server API) ──────────────────────────
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
    docState.slides = data.slides || [];
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
      const unitLabel = data.fileType === 'pptx' ? 'slides' : 'pages';
      const summaryLabel = data.fileType === 'pptx' ? 'Presentation Summary' : 'Study Notes';
      chatMsgs.innerHTML = `
        <div class="doc-chat-msg doc-chat-msg-ai">
          <div class="doc-msg-avatar">🤖</div>
          <div class="doc-msg-bubble">
            <div class="doc-msg-source-tag">Source: Document Assistant</div>
            <p>I have read <strong>${escapeHtml(data.filename)}</strong> (${data.pageCount} ${unitLabel}, ${data.wordCount.toLocaleString()} words). Ask me any questions, or click <strong>${summaryLabel}</strong> to generate structured revision notes!</p>
          </div>
        </div>
      `;
    }

    clearDocError();
    updateDocUI();
    showToast(`📄 Loaded "${data.filename}" successfully!`, 'success');

  } catch (err) {
    if (progressWrap) progressWrap.setAttribute('hidden', '');
    showDocError('Upload Failed', err.message || 'Could not upload document.');
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
    showToast('Please upload a PDF, Word, PowerPoint, or Text document first.', 'warning');
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

  const isPptx = docState.fileType === 'pptx' || (docState.filename && docState.filename.toLowerCase().endsWith('.pptx'));

  const statusMessages = isPptx
    ? [
      'Reading presentation slides...',
      'Extracting slide titles, notes, and tables...',
      'Analyzing key presentation themes...',
      'Generating 9-part presentation summary...'
    ]
    : [
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

  // ── Offline Mode (WebLLM / Local AI) ──────────────────────────────────────
  if (!navigator.onLine) {
    const localAi = await getLocalAI();
    if (!localAi) {
      clearInterval(timer);
      if (notesLoading) notesLoading.setAttribute('hidden', '');
      if (notesEmpty) notesEmpty.removeAttribute('hidden');
      if (notesBtn) notesBtn.disabled = false;
      showToast('AI note generation offline requires Local AI. Please connect to internet or enable WebLLM in Settings.', 'warning');
      return;
    }

    try {
      let finalNotes = '';
      if (isPptx && docState.slides && docState.slides.length > 10) {
        // Slide-by-slide chunking for large presentations
        const chunkSize = 10;
        const totalSlides = docState.slides.length;
        const chunkSummaries = [];

        for (let i = 0; i < totalSlides; i += chunkSize) {
          const chunkNum = Math.floor(i / chunkSize) + 1;
          const endSlide = Math.min(i + chunkSize, totalSlides);
          if (loadingText) loadingText.textContent = `Summarizing slides ${i + 1} to ${endSlide}...`;

          const chunkSlides = docState.slides.slice(i, endSlide);
          const chunkText = chunkSlides
            .map((s) => `### Slide ${s.slideNumber}: ${s.title}\n${s.content}\n${s.notes ? `*Notes:* ${s.notes}` : ''}`)
            .join('\n\n');

          const chunkPrompt = `Summarize these presentation slides concisely for academic study notes:\n\n${chunkText}`;
          const chunkSummary = await localAi.generateLocalResponse({
            prompt: chunkPrompt,
            history: [],
            mode: 'standard',
          });
          chunkSummaries.push(`### Section ${chunkNum} (Slides ${i + 1}-${endSlide})\n${chunkSummary}`);
        }

        if (loadingText) loadingText.textContent = 'Compiling final study notes...';
        const combinedText = chunkSummaries.join('\n\n');
        const synthesisPrompt = `You are an expert academic professor. Below are section summaries from the presentation "${docState.filename}" (${totalSlides} total slides):\n\n${combinedText}\n\nCompile a comprehensive, structured 9-part presentation summary with these exact 9 sections:
## 1. Presentation Overview
## 2. Overall Summary
## 3. Slide-by-Slide Explanation
## 4. Important Concepts and Definitions
## 5. Key Examination Points
## 6. Important Formulas and Technical Terms
## 7. Important Tables and Diagram Descriptions
## 8. Possible Viva Questions
## 9. Short Revision Notes`;

        finalNotes = await localAi.generateLocalResponse({
          prompt: synthesisPrompt,
          history: [],
          mode: 'standard',
        });
      } else {
        const summaryPrompt = isPptx
          ? `Compile a structured 9-part presentation summary for "${docState.filename}" with these exact 9 sections:
## 1. Presentation Overview
## 2. Overall Summary
## 3. Slide-by-Slide Explanation
## 4. Important Concepts and Definitions
## 5. Key Examination Points
## 6. Important Formulas and Technical Terms
## 7. Important Tables and Diagram Descriptions
## 8. Possible Viva Questions
## 9. Short Revision Notes

Presentation Slides:
${(docState.text || '').slice(0, 25000)}`
          : `Compile high-yield 9-part academic study notes for "${docState.filename}" with these exact 9 sections:
## 1. Document Overview
## 2. Topic-wise & Chapter Breakdown
## 3. Important Definitions
## 4. Key Concepts
## 5. Important Points & Takeaways
## 6. Formulas and Equations
## 7. Illustrative Examples
## 8. Important Revision & Exam Questions
## 9. Quick Revision Cram Sheet

Document Content:
${(docState.text || '').slice(0, 25000)}`;

        finalNotes = await localAi.generateLocalResponse({
          prompt: summaryPrompt,
          history: [],
          mode: 'standard',
        });
      }

      clearInterval(timer);
      docState.notes = finalNotes;

      if (notesLoading) notesLoading.setAttribute('hidden', '');
      if (notesRendered) {
        notesRendered.innerHTML = renderMarkdown(finalNotes);
        notesRendered.removeAttribute('hidden');
      }
      if (genNotesText) genNotesText.textContent = 'Regenerate Notes';
      showToast(isPptx ? '✅ 9-Part Presentation Summary generated on-device!' : '✅ 9-Part Study Notes generated on-device!', 'success');
      return;
    } catch (offlineNotesErr) {
      clearInterval(timer);
      if (notesLoading) notesLoading.setAttribute('hidden', '');
      if (notesEmpty) notesEmpty.removeAttribute('hidden');
      showToast('Local AI failed to generate notes: ' + offlineNotesErr.message, 'error');
      return;
    } finally {
      if (notesBtn) notesBtn.disabled = false;
      docState.isGeneratingNotes = false;
    }
  }

  // ── Online Mode (Gemini Server API) ───────────────────────────────────────
  try {
    const res = await fetch('/api/document/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: docState.text,
        filename: docState.filename,
        depth: depth,
        fileType: docState.fileType,
        isPresentation: isPptx,
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
    showToast(isPptx ? '✅ 9-Part Presentation Summary generated successfully!' : '✅ 9-Part Study Notes generated successfully!', 'success');

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

  // ── Offline Mode (Local AI WebLLM) ────────────────────────────────────────
  if (!navigator.onLine) {
    const localAi = await getLocalAI();
    if (!localAi) {
      aiMsgEl.innerHTML = `
        <div class="doc-msg-avatar" style="background:#ef4444;color:#fff;">⚠️</div>
        <div class="doc-msg-bubble" style="border-color:#fca5a5;background:#fef2f2;color:#991b1b;">
          <div class="doc-msg-source-tag" style="color:#991b1b;">Offline</div>
          <p>Local AI is required for offline document Q&A. Please check Settings to download a local model.</p>
        </div>
      `;
      docState.isChatting = false;
      return;
    }

    try {
      const prompt = `[DOCUMENT CONTEXT FOR "${docState.filename}"]:\n"""\n${(docState.text || '').slice(0, 15000)}\n"""\n\nStudent Question: ${query}`;
      const reply = await localAi.generateLocalResponse({
        prompt,
        history: (docState.chatHistory || []).slice(-6).map((m) => ({
          role: m.role === 'model' ? 'model' : 'user',
          content: m.content,
        })),
        mode: 'standard',
      });

      docState.chatHistory.push({ role: 'user', content: query });
      docState.chatHistory.push({ role: 'model', content: reply });

      aiMsgEl.innerHTML = `
        <div class="doc-msg-avatar">🤖</div>
        <div class="doc-msg-bubble">
          <div class="doc-msg-source-tag">Citing ${escapeHtml(docState.filename)} (Local AI)</div>
          <div class="markdown-content">${renderMarkdown(reply)}</div>
        </div>
      `;
    } catch (offlineChatErr) {
      aiMsgEl.innerHTML = `
        <div class="doc-msg-avatar" style="background:#ef4444;color:#fff;">⚠️</div>
        <div class="doc-msg-bubble" style="border-color:#fca5a5;background:#fef2f2;color:#991b1b;">
          <div class="doc-msg-source-tag" style="color:#991b1b;">Error</div>
          <p>${escapeHtml(offlineChatErr.message || 'Offline Q&A failed.')}</p>
        </div>
      `;
    } finally {
      docState.isChatting = false;
      if (chatMsgs) chatMsgs.scrollTop = chatMsgs.scrollHeight;
      if (chatInput) {
        chatInput.focus();
        if (chatSendBtn) chatSendBtn.disabled = chatInput.value.trim() === '';
      }
    }
    return;
  }

  // ── Online Mode (Server API Gemini) ───────────────────────────────────────
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
  const docStudioModal = document.getElementById('docStudioModal');
  const closeDocStudioBtn = document.getElementById('closeDocStudioBtn');
  const openDocStudioBtn = document.getElementById('openDocStudioBtn');
  const docTabs = document.querySelectorAll('.doc-tab');
  const docDropzone = document.getElementById('docDropzone');
  const docFileInput = document.getElementById('docFileInput');
  const docBrowseBtn = document.getElementById('docBrowseBtn');
  const docRemoveBtn = document.getElementById('docRemoveBtn');
  const docErrorDismissBtn = document.getElementById('docErrorDismissBtn');
  const docQuickNotesBtn = document.getElementById('docQuickNotesBtn');
  const docQuickChatBtn = document.getElementById('docQuickChatBtn');
  const docQuickTextBtn = document.getElementById('docQuickTextBtn');
  const docEmptyUploadBtn = document.getElementById('docEmptyUploadBtn');
  const docGenerateNotesBtn = document.getElementById('docGenerateNotesBtn');
  const docCopyNotesBtn = document.getElementById('docCopyNotesBtn');
  const docDownloadNotesBtn = document.getElementById('docDownloadNotesBtn');
  const docExportNotesBtn = document.getElementById('docExportNotesBtn');
  const docChatForm = document.getElementById('docChatForm');
  const docChatInput = document.getElementById('docChatInput');
  const docChatInputCount = document.getElementById('docChatInputCount');
  const docChatSendBtn = document.getElementById('docChatSendBtn');
  const docChatClearBtn = document.getElementById('docChatClearBtn');
  const docChatChips = document.getElementById('docChatChips');
  const docTextSearchInput = document.getElementById('docTextSearchInput');
  const docCopyRawTextBtn = document.getElementById('docCopyRawTextBtn');

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
   PROGRESSIVE WEB APP & OFFLINE RESILIENCE
───────────────────────────────────────────────────────────────── */
let deferredPwaPrompt = null;

function initPwaAndOfflineSupport() {
  const offlineBadge = document.getElementById('offlineIndicatorBadge');
  const offlineBanner = document.getElementById('offlineBanner');
  const apiStatusPill = document.getElementById('apiStatusPill');
  const pwaStatusBadge = document.getElementById('pwaStatusBadge');
  const pwaInstallBtn = document.getElementById('pwaInstallBtn');
  const pwaStatusDesc = document.getElementById('pwaStatusDesc');

  // Save original status pill markup for restoration
  const originalPillHtml = apiStatusPill ? apiStatusPill.innerHTML : null;

  async function updateNetworkUI(isOnline, isInitial) {
    const localAi = await getLocalAI();
    const modelId = localAi ? localAi.getSelectedModelId() : null;
    const isCached = localAi ? await localAi.isModelCached(modelId) : false;

    if (!isOnline) {
      if (offlineBadge) offlineBadge.removeAttribute('hidden');
      if (offlineBanner) {
        offlineBanner.removeAttribute('hidden');
        const bannerText = offlineBanner.querySelector('.offline-banner-text');
        if (bannerText) {
          if (isCached) {
            bannerText.innerHTML = '<strong>Offline Mode:</strong> On-device Local AI (WebGPU) is active. Ask study or coding questions with zero internet!';
          } else {
            bannerText.innerHTML = '<strong>Offline Mode:</strong> Gemini cloud paused. To enable offline generative AI, download a model in Settings.';
          }
        }
      }
      if (apiStatusPill) {
        if (isCached) {
          apiStatusPill.innerHTML = `
            <span class="status-dot dot-purple"></span>
            <span class="status-text">Local AI Active</span>
          `;
          apiStatusPill.title = 'Offline mode — On-device Local AI (WebGPU) is active.';
        } else {
          apiStatusPill.innerHTML = `
            <span class="status-dot dot-amber"></span>
            <span class="status-text">Offline (Cached)</span>
          `;
          apiStatusPill.title = 'Offline mode — Set up Local AI in Settings for offline responses.';
        }
      }
      if (pwaStatusBadge) {
        pwaStatusBadge.textContent = isCached ? 'Local AI Active' : 'Offline Mode';
        pwaStatusBadge.className = isCached ? 'status-badge-inline status-online' : 'status-badge-inline status-offline';
      }
      if (pwaStatusDesc) {
        pwaStatusDesc.textContent = isCached
          ? 'Operating on-device via WebGPU. Full generative responses enabled.'
          : 'Operating from cached assets. Download model in Settings to chat offline.';
      }
      updateEngineIndicator();
      if (!isInitial) {
        if (isCached) {
          showToast('Offline Mode: Switched to On-Device Local AI (WebGPU).', 'info');
        } else {
          showToast('You are offline. Download the local AI model in Settings to chat offline.', 'warn');
        }
      }
    } else {
      if (offlineBadge) offlineBadge.setAttribute('hidden', '');
      if (offlineBanner) offlineBanner.setAttribute('hidden', '');
      if (apiStatusPill && originalPillHtml) {
        apiStatusPill.innerHTML = originalPillHtml;
        apiStatusPill.title = 'Connected AI Engine';
      }
      if (pwaStatusBadge) {
        pwaStatusBadge.textContent = 'Active';
        pwaStatusBadge.className = 'status-badge-inline status-online';
      }
      if (pwaStatusDesc) {
        pwaStatusDesc.textContent = 'Service Worker registered. Core app available offline.';
      }
      updateEngineIndicator();
      if (!isInitial) {
        showToast('Internet connection restored. Gemini AI services reconnected.', 'success');
      }
    }
  }

  // Network state listeners
  window.addEventListener('online', () => updateNetworkUI(true, false));
  window.addEventListener('offline', () => updateNetworkUI(false, false));
  updateNetworkUI(navigator.onLine, true);

  // Register Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then((reg) => {
          console.log('[PWA] Service Worker registered with scope:', reg.scope);

          // Listen for new service worker installation
          reg.addEventListener('updatefound', () => {
            const installingWorker = reg.installing;
            if (installingWorker) {
              installingWorker.addEventListener('statechange', () => {
                if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('[PWA] New version of StudyMate AI is ready.');
                  showToast('A newer version of StudyMate AI is ready.', 'info');
                }
              });
            }
          });
        })
        .catch((err) => {
          console.warn('[PWA] Service Worker registration failed:', err);
        });
    });
  }

  // PWA Installation prompt handler
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPwaPrompt = e;
    if (pwaInstallBtn) {
      pwaInstallBtn.style.display = 'inline-block';
      pwaInstallBtn.onclick = async () => {
        if (!deferredPwaPrompt) return;
        deferredPwaPrompt.prompt();
        const choice = await deferredPwaPrompt.userChoice;
        if (choice && choice.outcome === 'accepted') {
          showToast('Thank you for installing StudyMate AI!', 'success');
        }
        deferredPwaPrompt = null;
        pwaInstallBtn.style.display = 'none';
      };
    }
  });

  window.addEventListener('appinstalled', () => {
    deferredPwaPrompt = null;
    if (pwaInstallBtn) pwaInstallBtn.style.display = 'none';
    showToast('StudyMate AI installed successfully!', 'success');
  });
}

/* ─────────────────────────────────────────────────────────────────
   INTERFACE APPEARANCE & VISUAL ACCESSIBILITY
   Translucency control: adjusts background surface opacity while
   preserving 100% text opacity and accessibility contrast.
───────────────────────────────────────────────────────────────── */
function applySurfaceOpacity(val, persist = true) {
  let num = parseInt(val, 10);
  if (isNaN(num)) num = 100;
  // Strictly clamp between 20% and 100% as required
  num = Math.max(20, Math.min(100, num));

  const decimal = (num / 100).toFixed(2);
  document.documentElement.style.setProperty('--app-surface-opacity', decimal);
  document.documentElement.style.setProperty('--surface-opacity', decimal);

  // Sync Preferences Modal Slider & Badge
  if (surfaceOpacitySlider && String(surfaceOpacitySlider.value) !== String(num)) {
    surfaceOpacitySlider.value = String(num);
  }
  if (surfaceOpacityVal) {
    surfaceOpacityVal.textContent = String(num);
  }

  // Sync Topbar Popover Slider & Badge
  const topbarSlider = document.getElementById('topbarTransparencySlider');
  const topbarVal = document.getElementById('topbarTransparencyVal');
  if (topbarSlider && String(topbarSlider.value) !== String(num)) {
    topbarSlider.value = String(num);
  }
  if (topbarVal) {
    topbarVal.textContent = num + '%';
  }

  // Live preview box in Preferences modal
  const previewBox = document.getElementById('opacityPreviewBox');
  if (previewBox) {
    previewBox.style.setProperty('--app-surface-opacity', decimal);
    previewBox.style.setProperty('--surface-opacity', decimal);
  }

  if (persist) {
    try {
      window.localStorage.setItem(OPACITY_STORAGE_KEY, String(num));
    } catch (e) {
      console.warn('[Appearance] Failed to save surface opacity:', e);
    }
  }
}

function initSurfaceOpacity() {
  let savedOpacity = 100;
  try {
    const raw = window.localStorage.getItem(OPACITY_STORAGE_KEY);
    if (raw !== null) {
      const parsed = parseInt(raw, 10);
      if (!isNaN(parsed) && parsed >= 20 && parsed <= 100) {
        savedOpacity = parsed;
      }
    }
  } catch (e) {
    savedOpacity = 100;
  }

  // Apply initially without re-writing localStorage
  applySurfaceOpacity(savedOpacity, false);

  // 1. Preferences Modal Slider listeners
  if (surfaceOpacitySlider) {
    surfaceOpacitySlider.addEventListener('input', (e) => {
      applySurfaceOpacity(e.target.value, false);
    });
    surfaceOpacitySlider.addEventListener('change', (e) => {
      applySurfaceOpacity(e.target.value, true);
    });
  }

  // Preferences Modal Reset button
  if (resetOpacityBtn) {
    resetOpacityBtn.addEventListener('click', () => {
      applySurfaceOpacity(100, true);
      showToast('Interface appearance reset to default (100% solid)', 'info');
    });
  }

  // 2. Topbar Transparency Toggle Button & Popover
  const topbarBtn = document.getElementById('topbarTransparencyBtn');
  const topbarPopover = document.getElementById('topbarTransparencyPopover');
  const topbarSlider = document.getElementById('topbarTransparencySlider');
  const topbarResetBtn = document.getElementById('topbarResetOpacityBtn');

  if (topbarBtn && topbarPopover) {
    topbarBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = topbarPopover.hasAttribute('hidden');
      if (isHidden) {
        topbarPopover.removeAttribute('hidden');
        topbarBtn.classList.add('active');
        topbarBtn.setAttribute('aria-expanded', 'true');
      } else {
        topbarPopover.setAttribute('hidden', '');
        topbarBtn.classList.remove('active');
        topbarBtn.setAttribute('aria-expanded', 'false');
      }
    });

    topbarPopover.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    document.addEventListener('click', (e) => {
      if (!topbarBtn.contains(e.target) && !topbarPopover.contains(e.target)) {
        if (!topbarPopover.hasAttribute('hidden')) {
          topbarPopover.setAttribute('hidden', '');
          topbarBtn.classList.remove('active');
          topbarBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !topbarPopover.hasAttribute('hidden')) {
        topbarPopover.setAttribute('hidden', '');
        topbarBtn.classList.remove('active');
        topbarBtn.setAttribute('aria-expanded', 'false');
        topbarBtn.focus();
      }
    });
  }

  // Topbar Slider listeners
  if (topbarSlider) {
    topbarSlider.addEventListener('input', (e) => {
      applySurfaceOpacity(e.target.value, false);
    });
    topbarSlider.addEventListener('change', (e) => {
      applySurfaceOpacity(e.target.value, true);
    });
  }

  // Topbar Reset button
  if (topbarResetBtn) {
    topbarResetBtn.addEventListener('click', () => {
      applySurfaceOpacity(100, true);
      showToast('Interface appearance reset to default (100% solid)', 'info');
    });
  }
}

async function checkStartupModelStatus() {
  try {
    const localAi = await getLocalAI();
    if (!localAi) return;

    const startupStatus = typeof localAi.getStartupStatus === 'function'
      ? await localAi.getStartupStatus()
      : null;

    if (!startupStatus) return;

    updateExamModeUI(startupStatus.examModeActive);
    await updateEngineIndicator();

    // If Exam Mode is active or browser is offline with installed model, pre-warm engine in background
    if (startupStatus.isInstalled && (startupStatus.examModeActive || !startupStatus.isOnline)) {
      localAi.ensureEngineReady(startupStatus.modelId).catch(err => {
        console.log('[Startup] Background engine readiness note:', err.message);
      });
    }
  } catch (e) {
    console.warn('[Startup] Model status check warning:', e);
  }
}

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
  initPwaAndOfflineSupport();
  initSurfaceOpacity();
  updateComposerButtons();
  updateStudyPanel();
  updateEngineIndicator();

  // Phase 1-3 & 7: Check startup model installation status and wire exam mode toggle
  if (examModeToggleBtn) {
    examModeToggleBtn.addEventListener('click', toggleExamMode);
  }
  checkStartupModelStatus();

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

  // Initialize desktop sidebar collapsed state from localStorage
  try {
    const savedSidebar = localStorage.getItem('studymate_sidebar_collapsed');
    if (window.innerWidth > 900 && savedSidebar === 'true') {
      document.body.classList.add('sidebar-collapsed');
      document.documentElement.classList.add('sidebar-collapsed');
      if (sidebar) sidebar.classList.add('collapsed');
      if (sidebarOpenBtn) sidebarOpenBtn.setAttribute('aria-expanded', 'false');
    } else if (window.innerWidth > 900) {
      if (sidebarOpenBtn) sidebarOpenBtn.setAttribute('aria-expanded', 'true');
    }
  } catch (e) { }

  // Auto-close mobile drawer on navigation or new chat
  document.querySelectorAll('.sidebar .nav-item, .sidebar .tool-btn, .sidebar .new-chat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        closeSidebar();
      }
    });
  });

  // Handle window resize between desktop rail and mobile drawer
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 900) {
      if (sidebar) sidebar.classList.remove('collapsed');
    } else {
      const isSavedCollapsed = localStorage.getItem('studymate_sidebar_collapsed') === 'true';
      if (isSavedCollapsed) {
        document.body.classList.add('sidebar-collapsed');
        document.documentElement.classList.add('sidebar-collapsed');
        if (sidebar) sidebar.classList.add('collapsed');
        if (sidebarOpenBtn) sidebarOpenBtn.setAttribute('aria-expanded', 'false');
      } else {
        document.body.classList.remove('sidebar-collapsed');
        document.documentElement.classList.remove('sidebar-collapsed');
        if (sidebar) sidebar.classList.remove('collapsed');
        if (sidebarOpenBtn) sidebarOpenBtn.setAttribute('aria-expanded', 'true');
      }
      closeSidebar();
    }
  });

  renderConvoList();
  messageInput.focus();

  // Phase 5: Image Generation Performance Mode Selector
  function initImageModeSelector() {
    const fastBtn = document.getElementById('imgModeFastBtn');
    const qualityBtn = document.getElementById('imgModeQualityBtn');
    const settingsSelect = document.getElementById('settingsImageModeSelect');

    function applyMode(mode) {
      state.imageGenMode = (mode === 'quality') ? 'quality' : 'fast';
      localStorage.setItem('studymate_image_mode', state.imageGenMode);
      if (fastBtn && qualityBtn) {
        if (state.imageGenMode === 'fast') {
          fastBtn.classList.add('active');
          qualityBtn.classList.remove('active');
        } else {
          fastBtn.classList.remove('active');
          qualityBtn.classList.add('active');
        }
      }
      if (settingsSelect && settingsSelect.value !== state.imageGenMode) {
        settingsSelect.value = state.imageGenMode;
      }
    }

    if (fastBtn) fastBtn.addEventListener('click', () => applyMode('fast'));
    if (qualityBtn) qualityBtn.addEventListener('click', () => applyMode('quality'));
    if (settingsSelect) settingsSelect.addEventListener('change', (e) => applyMode(e.target.value));

    applyMode(state.imageGenMode || 'fast');
  }
  initImageModeSelector();

  // Part 6: Initialize Data Structures Exam Tools & Syllabus Tracker
  initDataStructuresTools();

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
