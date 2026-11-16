/**
 * StudyMate AI — DS Complete Answers Interactive Learning Module
 * Dedicated 100% Offline 2-Panel Data Structures Study & Code Environment
 * Supporting all 108 Operations across 7 Categories with Full 14-Section Display
 */

(function () {
  'use strict';

  // Module state
  let currentTopicId = 'sll_insert_beginning';
  let activeTab = 'all';
  let isWorkspaceActive = false;

  // DOM Elements cache
  let dsLearningWorkspace = null;
  let chatLayout = null;
  let navDSCompleteAnswers = null;
  let navHome = null;
  let dsAccordionContainer = null;
  let dsTopicSearchInput = null;
  let dsSearchClearBtn = null;
  let dsContentContainer = null;
  let dsDetailHeader = null;
  let dsBreadcrumbCategory = null;
  let dsBreadcrumbSubcategory = null;
  let dsBreadcrumbCurrent = null;
  let dsHeaderCopyCodeBtn = null;
  let dsHeaderDownloadCodeBtn = null;
  let dsBackToChatBtn = null;
  let dsExpandChatbotBtn = null;
  let dsSidebarOpenBtn = null;
  let dsStudyPanelToggleBtn = null;
  let dsMiniQAInput = null;
  let dsMiniQASubmitBtn = null;
  let dsMiniQAHints = null;
  let dsSectionTabs = null;

  /**
   * Helper: Escape HTML
   */
  function escapeHtml(text) {
    if (text === null || text === undefined) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Helper: Toast notifications
   */
  function notify(msg, type = 'info') {
    if (typeof window.showToast === 'function') {
      window.showToast(msg, type);
    } else {
      const container = document.getElementById('toastContainer');
      if (container) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = msg;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 3500);
      } else {
        console.log(`[${type.toUpperCase()}] ${msg}`);
      }
    }
  }

  /**
   * Initialize DS Learning Module
   */
  function init() {
    // Cache DOM
    dsLearningWorkspace = document.getElementById('dsLearningWorkspace');
    chatLayout = document.querySelector('.chat-layout');
    navDSCompleteAnswers = document.getElementById('navDSCompleteAnswers');
    navHome = document.getElementById('navHome');
    dsAccordionContainer = document.getElementById('dsAccordionContainer');
    dsTopicSearchInput = document.getElementById('dsTopicSearchInput');
    dsSearchClearBtn = document.getElementById('dsSearchClearBtn');
    dsContentContainer = document.getElementById('dsContentContainer');
    dsDetailHeader = document.getElementById('dsDetailHeader');
    dsBreadcrumbCategory = document.getElementById('dsBreadcrumbCategory');
    dsBreadcrumbSubcategory = document.getElementById('dsBreadcrumbSubcategory');
    dsBreadcrumbCurrent = document.getElementById('dsBreadcrumbCurrent');
    dsHeaderCopyCodeBtn = document.getElementById('dsHeaderCopyCodeBtn');
    dsHeaderDownloadCodeBtn = document.getElementById('dsHeaderDownloadCodeBtn');
    dsBackToChatBtn = document.getElementById('dsBackToChatBtn');
    dsExpandChatbotBtn = document.getElementById('dsExpandChatbotBtn');
    dsSidebarOpenBtn = document.getElementById('dsSidebarOpenBtn');
    dsStudyPanelToggleBtn = document.getElementById('dsStudyPanelToggleBtn');
    dsMiniQAInput = document.getElementById('dsMiniQAInput');
    dsMiniQASubmitBtn = document.getElementById('dsMiniQASubmitBtn');
    dsMiniQAHints = document.getElementById('dsMiniQAHints');
    dsSectionTabs = document.getElementById('dsSectionTabs');

    if (!window.DS_COMPLETE_DATA) {
      console.warn('DS_COMPLETE_DATA not found. Retrying in 100ms...');
      setTimeout(init, 100);
      return;
    }

    // Build sidebar accordion
    renderAccordion();

    // Attach listeners
    bindEvents();

    // Default selection
    if (window.DS_COMPLETE_DATA.TOPICS[currentTopicId]) {
      selectTopic(currentTopicId, false);
    } else {
      const firstId = Object.keys(window.DS_COMPLETE_DATA.TOPICS)[0];
      if (firstId) selectTopic(firstId, false);
    }

    // Check if url query specifies openDS
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('view') === 'ds') {
      const topic = urlParams.get('topic');
      openWorkspace(topic || undefined);
    }
  }

  /**
   * Bind event listeners
   */
  function bindEvents() {
    // Sidebar nav: DS Complete Answers
    if (navDSCompleteAnswers) {
      navDSCompleteAnswers.addEventListener('click', (e) => {
        e.preventDefault();
        openWorkspace();
      });
    }

    // Sidebar nav: Home (return to chat)
    if (navHome) {
      navHome.addEventListener('click', (e) => {
        if (isWorkspaceActive) {
          e.preventDefault();
          closeWorkspace();
        }
      });
    }

    // New Chat button closes workspace if open
    const newChatBtn = document.getElementById('newChatBtn');
    if (newChatBtn) {
      newChatBtn.addEventListener('click', () => {
        if (isWorkspaceActive) closeWorkspace();
      });
    }

    // Clicking conversation in convo list closes workspace
    const convoList = document.getElementById('convoList');
    if (convoList) {
      convoList.addEventListener('click', (e) => {
        if (isWorkspaceActive && e.target.closest('.convo-item')) {
          closeWorkspace();
        }
      });
    }

    // Back to Chat button inside DS Workspace
    if (dsBackToChatBtn) {
      dsBackToChatBtn.addEventListener('click', () => {
        closeWorkspace();
      });
    }

    // Expand Chatbot dock button
    if (dsExpandChatbotBtn) {
      dsExpandChatbotBtn.addEventListener('click', () => {
        closeWorkspace();
      });
    }

    // Left Navigation Sidebar Toggle from inside DS Workspace
    if (dsSidebarOpenBtn) {
      dsSidebarOpenBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (typeof window.toggleSidebar === 'function') {
          window.toggleSidebar();
        } else {
          const sidebar = document.getElementById('sidebar');
          const overlay = document.getElementById('sidebarOverlay');
          if (window.innerWidth > 900) {
            const isCollapsed = document.body.classList.toggle('sidebar-collapsed');
            if (sidebar) sidebar.classList.toggle('collapsed', isCollapsed);
          } else {
            if (sidebar && sidebar.classList.contains('open')) {
              sidebar.classList.remove('open', 'active');
              if (overlay) overlay.classList.remove('visible', 'active');
            } else if (sidebar) {
              sidebar.classList.add('open', 'active');
              if (overlay) overlay.classList.add('visible', 'active');
            }
          }
        }
      });
    }

    // Right Study Companion Sidebar Toggle Button
    if (dsStudyPanelToggleBtn) {
      dsStudyPanelToggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleStudyCompanion();
      });
    }

    // Study Panel close button & overlay sync
    const studyCloseBtn = document.getElementById('studyPanelCloseBtn');
    if (studyCloseBtn) {
      studyCloseBtn.addEventListener('click', () => {
        updateStudyToggleBtnState(false);
      });
    }
    const studyOverlay = document.getElementById('studyPanelOverlay');
    if (studyOverlay) {
      studyOverlay.addEventListener('click', () => {
        updateStudyToggleBtnState(false);
      });
    }

    // Real-time search filter
    if (dsTopicSearchInput) {
      dsTopicSearchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        filterTopics(query);
        if (dsSearchClearBtn) {
          dsSearchClearBtn.hidden = !query;
        }
      });
    }

    if (dsSearchClearBtn) {
      dsSearchClearBtn.addEventListener('click', () => {
        if (dsTopicSearchInput) {
          dsTopicSearchInput.value = '';
          filterTopics('');
          dsTopicSearchInput.focus();
        }
        dsSearchClearBtn.hidden = true;
      });
    }

    // Mini DS Q&A Search Box
    if (dsMiniQASubmitBtn && dsMiniQAInput) {
      const handleMiniQA = () => {
        const query = dsMiniQAInput.value.trim();
        if (!query) return;
        findAndOpenBestTopicMatch(query);
      };

      dsMiniQASubmitBtn.addEventListener('click', handleMiniQA);
      dsMiniQAInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleMiniQA();
      });
    }

    // Mini Q&A Hint Chips
    if (dsMiniQAHints) {
      dsMiniQAHints.addEventListener('click', (e) => {
        const chip = e.target.closest('.ds-hint-chip');
        if (!chip) return;
        const targetId = chip.getAttribute('data-query');
        if (targetId && window.DS_COMPLETE_DATA.TOPICS[targetId]) {
          selectTopic(targetId);
        } else if (chip.textContent) {
          findAndOpenBestTopicMatch(chip.textContent.trim());
        }
      });
    }

    // Header Quick Actions: Copy C Code & Download
    if (dsHeaderCopyCodeBtn) {
      dsHeaderCopyCodeBtn.addEventListener('click', () => {
        copyCurrentCode();
      });
    }

    if (dsHeaderDownloadCodeBtn) {
      dsHeaderDownloadCodeBtn.addEventListener('click', () => {
        downloadCurrentCode();
      });
    }

    // Section Tabs
    if (dsSectionTabs) {
      dsSectionTabs.addEventListener('click', (e) => {
        const tabBtn = e.target.closest('.ds-tab-btn');
        if (!tabBtn) return;
        const tabKey = tabBtn.getAttribute('data-tab');
        if (tabKey) {
          setActiveTab(tabKey);
        }
      });
    }
  }

  /**
   * Check if Study Companion panel is currently visible/open
   */
  function isStudyPanelVisible() {
    const studyPanel = document.getElementById('studyPanel');
    if (!studyPanel) return false;
    const isDesktop = window.innerWidth > 1260;
    if (isDesktop) {
      return !studyPanel.classList.contains('collapsed') && !document.body.classList.contains('study-panel-collapsed');
    }
    return studyPanel.classList.contains('open') || studyPanel.classList.contains('active');
  }

  /**
   * Update the Study Companion Toggle Button UI state
   */
  function updateStudyToggleBtnState(isVisible) {
    if (!dsStudyPanelToggleBtn) dsStudyPanelToggleBtn = document.getElementById('dsStudyPanelToggleBtn');
    if (!dsStudyPanelToggleBtn) return;

    const visible = (typeof isVisible === 'boolean') ? isVisible : isStudyPanelVisible();

    const hideIcon = dsStudyPanelToggleBtn.querySelector('.ds-toggle-icon-hide');
    const showIcon = dsStudyPanelToggleBtn.querySelector('.ds-toggle-icon-show');

    if (visible) {
      dsStudyPanelToggleBtn.title = 'Hide Study Companion';
      dsStudyPanelToggleBtn.setAttribute('aria-label', 'Hide Study Companion');
      dsStudyPanelToggleBtn.setAttribute('aria-expanded', 'true');
      dsStudyPanelToggleBtn.classList.remove('panel-hidden');
      if (hideIcon) hideIcon.style.display = '';
      if (showIcon) showIcon.style.display = 'none';
    } else {
      dsStudyPanelToggleBtn.title = 'Show Study Companion';
      dsStudyPanelToggleBtn.setAttribute('aria-label', 'Show Study Companion');
      dsStudyPanelToggleBtn.setAttribute('aria-expanded', 'false');
      dsStudyPanelToggleBtn.classList.add('panel-hidden');
      if (hideIcon) hideIcon.style.display = 'none';
      if (showIcon) showIcon.style.display = '';
    }
  }

  /**
   * Toggle Study Companion sidebar visibility
   */
  function toggleStudyCompanion() {
    const visible = isStudyPanelVisible();
    if (visible) {
      if (typeof window.closeStudyPanel === 'function') {
        window.closeStudyPanel();
      } else {
        const studyPanel = document.getElementById('studyPanel');
        if (studyPanel) {
          studyPanel.classList.add('collapsed');
          studyPanel.classList.remove('open', 'active');
        }
        document.body.classList.add('study-panel-collapsed');
        const appWs = document.querySelector('.app-workspace');
        if (appWs) appWs.classList.add('study-panel-collapsed');
        const overlay = document.getElementById('studyPanelOverlay');
        if (overlay) overlay.classList.remove('visible', 'active');
      }
      updateStudyToggleBtnState(false);
    } else {
      if (typeof window.openStudyPanel === 'function') {
        window.openStudyPanel();
      } else {
        const studyPanel = document.getElementById('studyPanel');
        if (studyPanel) {
          studyPanel.classList.remove('collapsed');
          studyPanel.classList.add('open', 'active');
        }
        document.body.classList.remove('study-panel-collapsed');
        const appWs = document.querySelector('.app-workspace');
        if (appWs) appWs.classList.remove('study-panel-collapsed');
        if (window.innerWidth <= 1260) {
          const overlay = document.getElementById('studyPanelOverlay');
          if (overlay) overlay.classList.add('visible', 'active');
        }
      }
      updateStudyToggleBtnState(true);
    }
  }

  /**
   * Open DS Learning Workspace
   */
  function openWorkspace(topicId) {
    if (!dsLearningWorkspace) return;

    isWorkspaceActive = true;
    document.body.classList.add('ds-mode-active');
    const appWs = document.querySelector('.app-workspace');
    if (appWs) appWs.classList.add('ds-mode-active');

    dsLearningWorkspace.style.display = 'flex';

    if (chatLayout) {
      chatLayout.style.display = 'none';
    }

    // Update active nav styling in sidebar
    document.querySelectorAll('.nav-menu .nav-item').forEach(el => el.classList.remove('active'));
    if (navDSCompleteAnswers) navDSCompleteAnswers.classList.add('active');

    // Close mobile sidebar if open
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');

    if (topicId && window.DS_COMPLETE_DATA.TOPICS[topicId]) {
      selectTopic(topicId);
    } else {
      selectTopic(currentTopicId, false);
    }

    // Update Study Companion toggle button state
    updateStudyToggleBtnState(isStudyPanelVisible());

    // Update Left Sidebar toggle button state
    const isSidebarCollapsed = document.body.classList.contains('sidebar-collapsed') ||
      document.documentElement.classList.contains('sidebar-collapsed') ||
      (sidebar && sidebar.classList.contains('collapsed'));
    if (typeof window.updateSidebarToggleBtns === 'function') {
      window.updateSidebarToggleBtns(isSidebarCollapsed);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Close DS Learning Workspace & return to Chat
   */
  function closeWorkspace() {
    if (!dsLearningWorkspace) return;

    isWorkspaceActive = false;
    document.body.classList.remove('ds-mode-active');
    const appWs = document.querySelector('.app-workspace');
    if (appWs) appWs.classList.remove('ds-mode-active');

    dsLearningWorkspace.style.display = 'none';

    if (chatLayout) {
      chatLayout.style.display = '';
    }

    // Update active nav styling
    document.querySelectorAll('.nav-menu .nav-item').forEach(el => el.classList.remove('active'));
    if (navHome) navHome.classList.add('active');
  }

  /**
   * Render Category Accordions in Left Panel
   */
  function renderAccordion() {
    if (!dsAccordionContainer || !window.DS_COMPLETE_DATA) return;

    const categories = window.DS_COMPLETE_DATA.CATEGORIES;
    const topicsMap = window.DS_COMPLETE_DATA.TOPICS;

    let html = '';

    categories.forEach((cat, catIdx) => {
      // Default expand first category (or one holding currentTopicId)
      const isExpanded = catIdx === 0 || cat.subcategories.some(sub => sub.topics.includes(currentTopicId));

      html += `
        <div class="ds-accordion-category ${isExpanded ? 'expanded' : ''}" data-cat-id="${cat.id}">
          <button type="button" class="ds-category-header" aria-expanded="${isExpanded}">
            <div class="ds-category-title-wrap">
              <span class="ds-cat-chevron">${isExpanded ? '▼' : '▶'}</span>
              <span class="ds-cat-name">${escapeHtml(cat.name)}</span>
            </div>
            <span class="ds-cat-badge">${cat.count}</span>
          </button>
          <div class="ds-category-content" ${isExpanded ? '' : 'hidden'}>
      `;

      cat.subcategories.forEach(sub => {
        html += `
          <div class="ds-subcategory-group" data-subcat-id="${sub.id}">
            <div class="ds-subcategory-title">${escapeHtml(sub.name)}</div>
            <div class="ds-topic-list">
        `;

        sub.topics.forEach(tid => {
          const t = topicsMap[tid];
          if (!t) return;
          const isActive = tid === currentTopicId;

          html += `
            <button type="button" 
                    class="ds-topic-btn ${isActive ? 'active' : ''}" 
                    data-topic-id="${t.id}" 
                    title="${escapeHtml(t.title)}">
              <span class="ds-topic-bullet">•</span>
              <span class="ds-topic-text">${escapeHtml(t.title)}</span>
            </button>
          `;
        });

        html += `
            </div>
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;
    });

    dsAccordionContainer.innerHTML = html;

    // Attach accordion header toggle listeners
    dsAccordionContainer.querySelectorAll('.ds-category-header').forEach(headerBtn => {
      headerBtn.addEventListener('click', () => {
        const catBox = headerBtn.closest('.ds-accordion-category');
        const content = catBox.querySelector('.ds-category-content');
        const chevron = headerBtn.querySelector('.ds-cat-chevron');
        const isCurrentlyExpanded = catBox.classList.contains('expanded');

        if (isCurrentlyExpanded) {
          catBox.classList.remove('expanded');
          headerBtn.setAttribute('aria-expanded', 'false');
          if (content) content.hidden = true;
          if (chevron) chevron.textContent = '▶';
        } else {
          catBox.classList.add('expanded');
          headerBtn.setAttribute('aria-expanded', 'true');
          if (content) content.hidden = false;
          if (chevron) chevron.textContent = '▼';
        }
      });
    });

    // Attach topic click listeners
    dsAccordionContainer.querySelectorAll('.ds-topic-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const topicId = btn.getAttribute('data-topic-id');
        if (topicId) selectTopic(topicId);
      });
    });
  }

  /**
   * Filter Topics in Accordion
   */
  function filterTopics(query) {
    if (!dsAccordionContainer) return;

    const topicButtons = dsAccordionContainer.querySelectorAll('.ds-topic-btn');
    const categories = dsAccordionContainer.querySelectorAll('.ds-accordion-category');

    if (!query) {
      // Show all topics
      topicButtons.forEach(btn => btn.style.display = '');
      categories.forEach(cat => {
        cat.style.display = '';
        const content = cat.querySelector('.ds-category-content');
        const header = cat.querySelector('.ds-category-header');
        const chevron = header ? header.querySelector('.ds-cat-chevron') : null;
        const isExp = cat.classList.contains('expanded');
        if (content) content.hidden = !isExp;
        if (chevron) chevron.textContent = isExp ? '▼' : '▶';
      });
      return;
    }

    // Filter matching topics
    const qLower = query.toLowerCase();
    const matchedCategoryIds = new Set();

    topicButtons.forEach(btn => {
      const text = btn.textContent.toLowerCase();
      const topicId = btn.getAttribute('data-topic-id') || '';
      const topicObj = window.DS_COMPLETE_DATA?.TOPICS[topicId];
      const keywords = (topicObj?.keywords || []).join(' ').toLowerCase();

      const isMatch = text.includes(qLower) || topicId.toLowerCase().includes(qLower) || keywords.includes(qLower);

      if (isMatch) {
        btn.style.display = '';
        const catBox = btn.closest('.ds-accordion-category');
        if (catBox) matchedCategoryIds.add(catBox.getAttribute('data-cat-id'));
      } else {
        btn.style.display = 'none';
      }
    });

    // Auto-expand and reveal matching categories
    categories.forEach(cat => {
      const catId = cat.getAttribute('data-cat-id');
      const content = cat.querySelector('.ds-category-content');
      const header = cat.querySelector('.ds-category-header');
      const chevron = header ? header.querySelector('.ds-cat-chevron') : null;

      if (matchedCategoryIds.has(catId)) {
        cat.style.display = '';
        cat.classList.add('expanded');
        if (content) content.hidden = false;
        if (chevron) chevron.textContent = '▼';
        if (header) header.setAttribute('aria-expanded', 'true');
      } else {
        cat.style.display = 'none';
      }
    });
  }

  /**
   * Select and Render a Topic
   */
  function selectTopic(topicId, scrollContent = true) {
    if (!window.DS_COMPLETE_DATA || !window.DS_COMPLETE_DATA.TOPICS[topicId]) {
      console.error('Topic ID not found:', topicId);
      return;
    }

    currentTopicId = topicId;
    const topic = window.DS_COMPLETE_DATA.TOPICS[topicId];

    // Update active highlight in accordion
    if (dsAccordionContainer) {
      dsAccordionContainer.querySelectorAll('.ds-topic-btn').forEach(btn => {
        if (btn.getAttribute('data-topic-id') === topicId) {
          btn.classList.add('active');
          // Ensure parent category is expanded
          const cat = btn.closest('.ds-accordion-category');
          if (cat && !cat.classList.contains('expanded')) {
            cat.classList.add('expanded');
            const content = cat.querySelector('.ds-category-content');
            const chevron = cat.querySelector('.ds-cat-chevron');
            if (content) content.hidden = false;
            if (chevron) chevron.textContent = '▼';
          }
        } else {
          btn.classList.remove('active');
        }
      });
    }

    // Update breadcrumbs
    if (dsBreadcrumbCategory) dsBreadcrumbCategory.textContent = topic.categoryName || 'Data Structures';
    if (dsBreadcrumbSubcategory) dsBreadcrumbSubcategory.textContent = topic.subcategoryName || topic.categoryName;
    if (dsBreadcrumbCurrent) dsBreadcrumbCurrent.textContent = topic.title;

    // Render full 14 sections
    renderTopicSections(topic);

    // Apply active tab filter
    applyTabVisibility();

    // Scroll to top of right panel
    if (scrollContent && dsContentContainer) {
      dsContentContainer.scrollTop = 0;
    }
  }

  /**
   * Set Active Section Tab
   */
  function setActiveTab(tabKey) {
    activeTab = tabKey;
    if (dsSectionTabs) {
      dsSectionTabs.querySelectorAll('.ds-tab-btn').forEach(btn => {
        if (btn.getAttribute('data-tab') === tabKey) {
          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');
        } else {
          btn.classList.remove('active');
          btn.setAttribute('aria-selected', 'false');
        }
      });
    }
    applyTabVisibility();
  }

  /**
   * Apply Tab Visibility Filter
   */
  function applyTabVisibility() {
    if (!dsContentContainer) return;

    const sections = dsContentContainer.querySelectorAll('.ds-section-card');
    sections.forEach(sec => {
      const secType = sec.getAttribute('data-section-type');

      if (activeTab === 'all') {
        sec.style.display = '';
      } else if (activeTab === 'concept') {
        sec.style.display = (secType === 'hero' || secType === 'definition' || secType === 'concept' || secType === 'apps') ? '' : 'none';
      } else if (activeTab === 'algorithm') {
        sec.style.display = (secType === 'hero' || secType === 'algorithm' || secType === 'pseudocode') ? '' : 'none';
      } else if (activeTab === 'program') {
        sec.style.display = (secType === 'hero' || secType === 'c_program') ? '' : 'none';
      } else if (activeTab === 'dryrun') {
        sec.style.display = (secType === 'hero' || secType === 'sample_io' || secType === 'dry_run') ? '' : 'none';
      } else if (activeTab === 'complexity') {
        sec.style.display = (secType === 'hero' || secType === 'complexity' || secType === 'pros_cons' || secType === 'viva') ? '' : 'none';
      }
    });
  }

  /**
   * Render All 14 Structured Sections
   */
  function renderTopicSections(topic) {
    if (!dsContentContainer) return;

    let html = '';

    // Hero Header
    html += `
      <div class="ds-section-card ds-hero-card" data-section-type="hero">
        <div class="ds-hero-meta">
          <span class="ds-badge ds-badge-cat">${escapeHtml(topic.categoryName || 'Data Structures')}</span>
          <span class="ds-badge ds-badge-sub">${escapeHtml(topic.subcategoryName || topic.categoryName)}</span>
          <span class="ds-badge ds-badge-id">ID: ${escapeHtml(topic.id)}</span>
        </div>
        <h1 class="ds-hero-title">${escapeHtml(topic.title)}</h1>
        <div class="ds-hero-keywords">
          ${(topic.keywords || []).map(kw => `<span class="ds-keyword-tag">#${escapeHtml(kw)}</span>`).join(' ')}
        </div>
      </div>
    `;

    // 1. Definition
    html += `
      <section class="ds-section-card" data-section-type="definition">
        <div class="ds-section-header">
          <span class="ds-sec-icon">📖</span>
          <h2 class="ds-sec-title">1. Definition</h2>
        </div>
        <div class="ds-definition-box">
          <p>${escapeHtml(topic.definition)}</p>
        </div>
      </section>
    `;

    // 2. Concept Explanation
    html += `
      <section class="ds-section-card" data-section-type="concept">
        <div class="ds-section-header">
          <span class="ds-sec-icon">💡</span>
          <h2 class="ds-sec-title">2. Concept &amp; Detailed Explanation</h2>
        </div>
        <div class="ds-sec-body ds-prose">
          <p>${escapeHtml(topic.concept_explanation)}</p>
        </div>
      </section>
    `;

    // 3. Algorithm
    html += `
      <section class="ds-section-card" data-section-type="algorithm">
        <div class="ds-section-header">
          <span class="ds-sec-icon">📋</span>
          <h2 class="ds-sec-title">3. Step-by-Step Algorithm</h2>
        </div>
        <div class="ds-sec-body">
          <div class="ds-steps-container">
            ${formatSteps(topic.algorithm)}
          </div>
        </div>
      </section>
    `;

    // 4. Pseudocode
    html += `
      <section class="ds-section-card" data-section-type="pseudocode">
        <div class="ds-section-header">
          <span class="ds-sec-icon">📝</span>
          <h2 class="ds-sec-title">4. Structured Pseudocode</h2>
        </div>
        <div class="ds-sec-body">
          <pre class="ds-pseudocode-block"><code>${escapeHtml(topic.pseudocode || topic.algorithm)}</code></pre>
        </div>
      </section>
    `;

    // 5. Complete C Program
    html += `
      <section class="ds-section-card ds-program-card" data-section-type="c_program">
        <div class="ds-section-header">
          <div class="ds-sec-header-left">
            <span class="ds-sec-icon">💻</span>
            <h2 class="ds-sec-title">5. Complete Standalone C Program</h2>
            <span class="ds-badge ds-badge-c">Compilable C</span>
          </div>
          <div class="ds-sec-header-actions">
            <button type="button" class="btn-copy-code-sm" onclick="window.DS_LEARNING_MODULE.copyCode()" title="Copy C Program to Clipboard">
              <span>📋</span> Copy Code
            </button>
            <button type="button" class="btn-download-code-sm" onclick="window.DS_LEARNING_MODULE.downloadCode()" title="Download .c File">
              <span>💾</span> Download .c
            </button>
          </div>
        </div>
        <div class="ds-sec-body">
          <div class="ds-code-viewer-container">
            <div class="ds-code-viewer-header">
              <span class="ds-code-lang">C Source File — ${escapeHtml(topic.id)}.c</span>
              <span class="ds-code-standout">Complete &amp; Standalone</span>
            </div>
            <pre class="code-block-pre ds-code-pre"><code class="code-block-content ds-code-content">${escapeHtml(topic.c_program)}</code></pre>
          </div>
        </div>
      </section>
    `;

    // 6 & 7. Sample Input and Sample Output
    html += `
      <section class="ds-section-card" data-section-type="sample_io">
        <div class="ds-section-header">
          <span class="ds-sec-icon">🖥️</span>
          <h2 class="ds-sec-title">6 &amp; 7. Sample Input &amp; Terminal Output</h2>
        </div>
        <div class="ds-sec-body">
          <div class="ds-io-grid">
            <div class="ds-io-col">
              <h3 class="ds-io-label">Sample Input</h3>
              <div class="ds-io-box ds-input-box">
                <code>${escapeHtml(topic.sample_input || 'Standard test input')}</code>
              </div>
            </div>
            <div class="ds-io-col">
              <h3 class="ds-io-label">Expected Terminal Output</h3>
              <div class="ds-io-box ds-terminal-box">
                <pre><code>${escapeHtml(topic.sample_output || 'Program execution completed.')}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    // 8. Dry Run & Execution Walkthrough
    html += `
      <section class="ds-section-card" data-section-type="dry_run">
        <div class="ds-section-header">
          <span class="ds-sec-icon">🔍</span>
          <h2 class="ds-sec-title">8. Dry Run &amp; Execution Walkthrough</h2>
        </div>
        <div class="ds-sec-body ds-prose">
          <div class="ds-dryrun-box">
            ${formatDryRun(topic.dry_run)}
          </div>
        </div>
      </section>
    `;

    // 9 & 10. Time & Space Complexity
    html += `
      <section class="ds-section-card" data-section-type="complexity">
        <div class="ds-section-header">
          <span class="ds-sec-icon">⏱️</span>
          <h2 class="ds-sec-title">9 &amp; 10. Time &amp; Space Complexity Analysis</h2>
        </div>
        <div class="ds-sec-body">
          <div class="ds-complexity-grid">
            <div class="ds-complexity-card">
              <h3 class="ds-comp-title">Time Complexity</h3>
              <div class="ds-comp-content">
                <pre class="ds-comp-pre"><code>${escapeHtml(topic.time_complexity)}</code></pre>
              </div>
            </div>
            <div class="ds-complexity-card">
              <h3 class="ds-comp-title">Space Complexity (Auxiliary)</h3>
              <div class="ds-comp-content">
                <pre class="ds-comp-pre"><code>${escapeHtml(topic.space_complexity)}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    // 11. Advantages & Disadvantages
    html += `
      <section class="ds-section-card" data-section-type="pros_cons">
        <div class="ds-section-header">
          <span class="ds-sec-icon">⚖️</span>
          <h2 class="ds-sec-title">11. Advantages &amp; Disadvantages</h2>
        </div>
        <div class="ds-sec-body ds-prose">
          <div class="ds-adv-disadv-box">
            ${formatBulletText(topic.advantages_disadvantages)}
          </div>
        </div>
      </section>
    `;

    // 12. Real-World Applications
    html += `
      <section class="ds-section-card" data-section-type="apps">
        <div class="ds-section-header">
          <span class="ds-sec-icon">🌍</span>
          <h2 class="ds-sec-title">12. Practical Real-World Applications</h2>
        </div>
        <div class="ds-sec-body ds-prose">
          <div class="ds-apps-box">
            ${formatBulletText(topic.applications)}
          </div>
        </div>
      </section>
    `;

    // 13 & 14. Viva Questions & Answers
    html += `
      <section class="ds-section-card" data-section-type="viva">
        <div class="ds-section-header">
          <span class="ds-sec-icon">🎓</span>
          <h2 class="ds-sec-title">13 &amp; 14. Academic &amp; Viva Voce Questions</h2>
        </div>
        <div class="ds-sec-body">
          <div class="ds-viva-list">
            ${(topic.viva_questions || []).map((vq, idx) => `
              <div class="ds-viva-item">
                <div class="ds-viva-q"><strong>Q${idx + 1}:</strong> ${escapeHtml(vq.q)}</div>
                <div class="ds-viva-a"><strong>Ans:</strong> ${escapeHtml(vq.a)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;

    dsContentContainer.innerHTML = html;
  }

  /**
   * Helper: Format Steps
   */
  function formatSteps(text) {
    if (!text) return '<p>No algorithm specified.</p>';
    const lines = text.split('\n').filter(l => l.trim().length > 0);
    return lines.map(line => {
      return `<div class="ds-step-row"><span class="ds-step-bullet">Step</span><span class="ds-step-text">${escapeHtml(line)}</span></div>`;
    }).join('');
  }

  /**
   * Helper: Format Dry Run
   */
  function formatDryRun(text) {
    if (!text) return '<p>Standard verification run.</p>';
    // If it contains markdown tables, format nicely or preformat
    return `<pre class="ds-dryrun-pre"><code>${escapeHtml(text)}</code></pre>`;
  }

  /**
   * Helper: Format Bullet Lists
   */
  function formatBulletText(text) {
    if (!text) return '<p>None specified.</p>';
    const lines = text.split('\n');
    let out = '';
    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed) return;
      if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*')) {
        out += `<li class="ds-bullet-item">${escapeHtml(trimmed.replace(/^[-*•]\s*/, ''))}</li>`;
      } else {
        out += `<p class="ds-bullet-p"><strong>${escapeHtml(trimmed)}</strong></p>`;
      }
    });
    return out ? `<ul class="ds-bullet-list">${out}</ul>` : `<p>${escapeHtml(text)}</p>`;
  }

  /**
   * Copy current C program to clipboard
   */
  function copyCurrentCode() {
    if (!window.DS_COMPLETE_DATA || !window.DS_COMPLETE_DATA.TOPICS[currentTopicId]) return;
    const code = window.DS_COMPLETE_DATA.TOPICS[currentTopicId].c_program;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(() => {
        notify('C Program copied to clipboard!', 'success');
      }).catch(() => {
        fallbackCopy(code);
      });
    } else {
      fallbackCopy(code);
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      notify('C Program copied to clipboard!', 'success');
    } catch (e) {
      notify('Failed to copy code.', 'error');
    }
    ta.remove();
  }

  /**
   * Download current C program as .c file
   */
  function downloadCurrentCode() {
    if (!window.DS_COMPLETE_DATA || !window.DS_COMPLETE_DATA.TOPICS[currentTopicId]) return;
    const topic = window.DS_COMPLETE_DATA.TOPICS[currentTopicId];
    const filename = `${topic.id}.c`;
    const blob = new Blob([topic.c_program], { type: 'text/x-c;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    notify(`Downloaded ${filename}`, 'success');
  }

  /**
   * Natural Query Topic Matcher (Local Mini Q&A)
   */
  function findAndOpenBestTopicMatch(query) {
    if (!window.DS_COMPLETE_DATA || !query) return;

    const q = query.trim().toLowerCase();
    const topics = window.DS_COMPLETE_DATA.ALL_TOPICS;

    // Direct match check on id
    if (window.DS_COMPLETE_DATA.TOPICS[q]) {
      selectTopic(q);
      notify(`Loaded: ${window.DS_COMPLETE_DATA.TOPICS[q].title}`, 'success');
      return;
    }

    let bestTopic = null;
    let highestScore = -1;

    // Tokenize query words
    const queryTokens = q.split(/\s+/).filter(w => w.length > 1);

    for (const t of topics) {
      const full = window.DS_COMPLETE_DATA.TOPICS[t.id];
      if (!full) continue;

      let score = 0;
      const titleLower = full.title.toLowerCase();
      const idLower = full.id.toLowerCase();
      const keywords = (full.keywords || []).map(k => k.toLowerCase());

      // Exact phrase in title
      if (titleLower.includes(q)) score += 50;
      if (idLower.includes(q)) score += 40;

      // Exact keyword match
      if (keywords.some(k => k.includes(q) || q.includes(k))) score += 45;

      // Token overlap
      for (const token of queryTokens) {
        if (titleLower.includes(token)) score += 10;
        if (idLower.includes(token)) score += 8;
        if (keywords.some(k => k.includes(token))) score += 7;
        if (full.category.toLowerCase().includes(token)) score += 3;
        if ((full.subcategory || '').toLowerCase().includes(token)) score += 3;
      }

      // Negative weight for unrelated concepts
      if (q.includes('doubly') && !idLower.includes('dll')) score -= 20;
      if (q.includes('circular') && !idLower.includes('cll') && !idLower.includes('cqueue')) score -= 20;
      if (q.includes('bst') && !idLower.includes('bst')) score -= 15;
      if (q.includes('stack') && !idLower.includes('stack')) score -= 20;
      if (q.includes('queue') && !idLower.includes('queue')) score -= 20;

      if (score > highestScore) {
        highestScore = score;
        bestTopic = full;
      }
    }

    if (bestTopic && highestScore > 5) {
      selectTopic(bestTopic.id);
      notify(`Matched: ${bestTopic.title}`, 'success');
    } else {
      notify('No exact match found. Displaying related topics.', 'info');
      // Set search filter to query
      if (dsTopicSearchInput) {
        dsTopicSearchInput.value = query;
        filterTopics(query);
      }
    }
  }

  // Expose Global Public API
  window.DS_LEARNING_MODULE = {
    init: init,
    open: openWorkspace,
    close: closeWorkspace,
    selectTopic: selectTopic,
    setActiveTab: setActiveTab,
    copyCode: copyCurrentCode,
    downloadCode: downloadCurrentCode,
    search: findAndOpenBestTopicMatch,
    toggleStudyCompanion: toggleStudyCompanion,
    updateStudyToggleBtn: updateStudyToggleBtnState,
    isStudyPanelVisible: isStudyPanelVisible
  };

  // Auto-init on DOMContentLoaded or immediate if ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
