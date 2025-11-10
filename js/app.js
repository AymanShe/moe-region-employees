/**
 * Employee Map Application
 * Main application class for the Saudi Arabia interactive map
 */

class EmployeeMapApp {
  constructor() {
    this.regionData = null;
    this.metadata = { totalRegions: 0, totalEmployees: 0 };
    this.currentLanguage = 'ar';
    this.container = null;
    this.tooltip = null;
    this.employeeModal = null;
    this.regionPanel = null;
    this.regionPanelBody = null;
    this.regionPanelTitle = null;
    this.regionPanelMeta = null;
    this.regionPanelPrev = null;
    this.regionPanelNext = null;
    this.regionPanelClose = null;
    this.regionPanelBackdrop = null;
    this.regionOrder = [];
    this.currentRegionId = null;
    this.lastFocusedPath = null;
    this.touchStartX = null;
    this.visitedRegions = new Set();

    this.handleGlobalKeydown = this.handleGlobalKeydown.bind(this);
    this.handlePanelTouchStart = this.handlePanelTouchStart.bind(this);
    this.handlePanelTouchEnd = this.handlePanelTouchEnd.bind(this);
  }

  /**
   * Initialize the application
   */
  async init() {
    try {
      console.log('Initializing Employee Map Application...');

      // Initialize accessibility features
      if (window.AccessibilityManager) {
        window.AccessibilityManager.init();
        window.AccessibilityManager.announceLoading('جاري تحميل البيانات');
      }

      // Initialize mobile optimizations
      if (window.MobileOptimizer) {
        window.MobileOptimizer.init();
      }

      // Show loading indicator
      ErrorHandler.showLoading('جاري تحميل البيانات...');

      await this.loadData();
      this.cacheElements();
      this.setupEventListeners();

      // Hide loading indicator
      ErrorHandler.hideLoading();

      // Announce loaded state
      if (window.AccessibilityManager) {
        window.AccessibilityManager.announceLoaded('تم تحميل البيانات بنجاح');
      }

      console.log('Application initialized successfully');
    } catch (error) {
      ErrorHandler.hideLoading();

      // Announce error
      if (window.AccessibilityManager) {
        window.AccessibilityManager.announceError('فشل تحميل البيانات');
      }

      this.handleError('Failed to initialize application', error);
    }
  }

  /**
   * Load employee data from JSON file
   */
  async loadData() {
    try {
      console.log('Loading employee data...');
      const response = await fetch('data/regions.json');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Validate data structure
      try {
        DataValidator.validateData(data);
      } catch (validationError) {
        ErrorHandler.handleValidationError(validationError);
        // Continue anyway with whatever data we have
      }

      this.regionData = data.regions;
      if (data.metadata) {
        this.metadata = {
          totalRegions: data.metadata.totalRegions || Object.keys(data.regions || {}).length,
          totalEmployees: data.metadata.totalEmployees || 0
        };
      }
      if (!this.metadata.totalEmployees) {
        this.metadata.totalEmployees = Object.values(this.regionData || {}).reduce((acc, region) => {
          if (region && Array.isArray(region.employees)) {
            return acc + region.employees.length;
          }
          return acc;
        }, 0);
      }

      const totalEmployees = this.metadata.totalEmployees || (data.metadata && data.metadata.totalEmployees) || 0;
      const totalRegions = this.metadata.totalRegions || (data.metadata && data.metadata.totalRegions) || Object.keys(this.regionData || {}).length;
      console.log(`Loaded ${totalEmployees} employees across ${totalRegions} regions`);
    } catch (error) {
      ErrorHandler.logError('loadData', error, {
        url: 'data/regions.json'
      });

      if (error.message.includes('HTTP')) {
        ErrorHandler.handleNetworkError(error);
      }

      throw new Error('Failed to load employee data: ' + error.message);
    }
  }

  /**
   * Cache DOM elements
   */
  cacheElements() {
    this.container = document.getElementById('map-container');
    this.tooltip = document.getElementById('tooltip');

    // Region panel elements
    this.regionPanel = document.getElementById('regionPanel');
    this.regionPanelBody = document.getElementById('regionPanelBody');
    this.regionPanelTitle = document.getElementById('regionPanelTitle');
    this.regionPanelMeta = document.getElementById('regionPanelMeta');
    this.regionPanelPrev = document.getElementById('regionPanelPrev');
    this.regionPanelNext = document.getElementById('regionPanelNext');
    this.regionPanelClose = document.getElementById('regionPanelClose');
    this.regionPanelBackdrop = document.getElementById('regionPanelBackdrop');
    this.regionOrder = this.container
      ? Array.from(this.container.querySelectorAll('path'))
          .map(path => path.id)
          .filter(Boolean)
      : [];

    // HUD elements
    this.hudRegionsVisited = document.getElementById('hudRegionsVisited');
    this.hudRegionsTotal = document.getElementById('hudRegionsTotal');
    this.hudRegionEmployees = document.getElementById('hudRegionEmployees');

    if (!this.metadata.totalRegions && this.regionOrder.length > 0) {
      this.metadata.totalRegions = this.regionOrder.length;
    }

    if (this.hudRegionsTotal && this.metadata.totalRegions) {
      this.hudRegionsTotal.textContent = this.metadata.totalRegions;
    }

    // Employee modal elements
    const employeeModalEl = document.getElementById('employeeModal');
    this.employeeModal = new bootstrap.Modal(employeeModalEl);
    this.employeeModalTitle = document.getElementById('employeeModalLabel');
    this.employeeModalBody = document.getElementById('employeeModalBody');
    this.employeeModalEl = employeeModalEl;
  }

  /**
   * Set up event listeners for all interactive elements
   */
  setupEventListeners() {
    // Wire up region paths
    this.container.querySelectorAll('path').forEach(path => {
      this.setupRegionEvents(path);
    });

    // Delegate clicks on employee names
    if (this.regionPanelBody) {
      this.regionPanelBody.addEventListener('click', (e) => {
        this.handleEmployeeLinkClick(e);
      });
    }

    // Panel controls
    if (this.regionPanelPrev) {
      this.regionPanelPrev.addEventListener('click', () => this.navigateRegion(-1));
    }
    if (this.regionPanelNext) {
      this.regionPanelNext.addEventListener('click', () => this.navigateRegion(1));
    }
    if (this.regionPanelClose) {
      this.regionPanelClose.addEventListener('click', () => this.closeRegionPanel());
    }
    if (this.regionPanelBackdrop) {
      this.regionPanelBackdrop.addEventListener('click', () => this.closeRegionPanel());
    }

    if (this.regionPanel) {
      this.regionPanel.addEventListener('touchstart', this.handlePanelTouchStart, { passive: true });
      this.regionPanel.addEventListener('touchend', this.handlePanelTouchEnd, { passive: true });
    }

    document.addEventListener('keydown', this.handleGlobalKeydown);
  }

  /**
   * Set up events for a region path
   */
  setupRegionEvents(path) {
    const regionId = path.id;
    const region = this.regionData[regionId];

    if (!region) return;

    // Mouseover: show tooltip
    path.addEventListener('mouseover', () => {
      this.showTooltip(region);
    });

    // Mousemove: position tooltip
    path.addEventListener('mousemove', (e) => {
      this.positionTooltip(e);
    });

    // Mouseout: hide tooltip
    path.addEventListener('mouseout', () => {
      this.hideTooltip();
    });

    // Click: open region modal
    path.addEventListener('click', () => {
      this.lastFocusedPath = path;
      this.openRegionPanel(regionId);
    });
  }

  /**
   * Show tooltip with region info
   */
  showTooltip(region) {
    this.tooltip.innerHTML = `<strong>${region.name}</strong><br>عدد الموظفين: ${region.employees.length}`;
    this.tooltip.style.display = 'block';
  }

  /**
   * Position tooltip relative to mouse
   */
  positionTooltip(e) {
    const rect = this.container.getBoundingClientRect();
    this.tooltip.style.left = (e.clientX - rect.left + 10) + 'px';
    this.tooltip.style.top = (e.clientY - rect.top + 10) + 'px';
  }

  /**
   * Hide tooltip
   */
  hideTooltip() {
    this.tooltip.style.display = 'none';
  }

  /**
   * Open the persistent region panel with employees
   */
  openRegionPanel(regionId, options = {}) {
    if (!this.regionPanel || !this.regionPanelBody) return;

    const region = this.regionData[regionId];
    if (!region) return;

    const { announce = true, focusPanel = true } = options;
    this.currentRegionId = regionId;

    if (this.regionPanelTitle) {
      this.regionPanelTitle.textContent = region.name;
    }

    if (this.regionPanelMeta) {
      const englishName = region.nameEn ? ` / ${region.nameEn}` : '';
      this.regionPanelMeta.textContent = `${region.employees.length} موظف${englishName}`;
    }

    const hasEmployees = Array.isArray(region.employees) && region.employees.length > 0;

    let bodyContent = `
      <div class="region-panel__summary">
        <span class="employee-card__badge">${region.employees.length} موظف</span>
        ${region.nameEn ? `<span class="region-panel__subtitle">${region.nameEn}</span>` : ''}
      </div>
    `;

    if (hasEmployees) {
      const employeesMarkup = region.employees.map((emp, index) => `
        <button type="button"
                class="employee-card"
                data-region="${regionId}"
                data-index="${index}">
          <span class="employee-link">
            <span>${emp.name}</span>
            ${emp.nameEn ? `<span class="employee-card__name-en">${emp.nameEn}</span>` : ''}
          </span>
          <div class="employee-card__details">
            <span>${emp.position}</span>
            ${emp.positionEn ? `<span class="employee-card__position-en">${emp.positionEn}</span>` : ''}
            <span>تاريخ البدء: ${emp.startDate}</span>
          </div>
        </button>
      `).join('');

      bodyContent += `<div class="region-panel__list">${employeesMarkup}</div>`;
    } else {
      bodyContent += `<p class="region-panel__placeholder">لا يوجد موظفون في هذه المنطقة حالياً.</p>`;
    }

    this.regionPanelBody.innerHTML = bodyContent;
    this.regionPanelBody.scrollTop = 0;

    this.regionPanel.classList.add('is-active');
    this.regionPanel.setAttribute('aria-hidden', 'false');

    if (this.regionPanelBackdrop) {
      this.regionPanelBackdrop.hidden = false;
      this.regionPanelBackdrop.classList.add('is-active');
    }

    this.updatePanelNavigation();
    this.highlightRegion(regionId);
    this.markRegionVisited(regionId);
    this.updateHud(region);

    if (focusPanel) {
      requestAnimationFrame(() => {
        if (this.regionPanelBody) {
          this.regionPanelBody.focus();
        }
      });
    }

    if (window.AccessibilityManager && announce) {
      window.AccessibilityManager.announce(`منطقة ${region.name} تحتوي على ${region.employees.length} موظف`);
    }
  }

  /**
   * Close the region panel and reset highlights
   */
  closeRegionPanel() {
    if (!this.regionPanel) return;

    this.regionPanel.classList.remove('is-active');
    this.regionPanel.setAttribute('aria-hidden', 'true');

    if (this.regionPanelBackdrop) {
      this.regionPanelBackdrop.classList.remove('is-active');
      this.regionPanelBackdrop.hidden = true;
    }

    if (this.regionPanelBody) {
      this.regionPanelBody.innerHTML = `<p class="region-panel__placeholder">اختر منطقة من الخريطة لعرض الموظفين.</p>`;
    }

    this.clearRegionHighlight();
    this.currentRegionId = null;
    this.updatePanelNavigation();
    this.touchStartX = null;

    if (this.lastFocusedPath) {
      this.lastFocusedPath.focus();
    }

    if (window.AccessibilityManager) {
      window.AccessibilityManager.announce('تم إغلاق لوحة المنطقة');
    }
  }

  /**
   * Navigate to adjacent region within panel
   */
  navigateRegion(direction = 1) {
    if (!this.isPanelActive()) return;

    const currentIndex = this.regionOrder.indexOf(this.currentRegionId);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex + direction;

    if (this.regionOrder.length > 0) {
      nextIndex = (nextIndex + this.regionOrder.length) % this.regionOrder.length;
    }

    const nextRegionId = this.regionOrder[nextIndex];
    const nextPath = document.getElementById(nextRegionId);
    if (nextPath) {
      this.lastFocusedPath = nextPath;
      nextPath.focus();
    }

    this.openRegionPanel(nextRegionId, { announce: true, focusPanel: true });
  }

  /**
   * Update panel navigation button states
   */
  updatePanelNavigation() {
    const index = this.regionOrder.indexOf(this.currentRegionId);
    const active = this.isPanelActive();

    const shouldDisable = !active || index === -1 || this.regionOrder.length <= 1;

    if (this.regionPanelPrev) {
      this.regionPanelPrev.disabled = shouldDisable;
    }

    if (this.regionPanelNext) {
      this.regionPanelNext.disabled = shouldDisable;
    }
  }

  /**
   * Highlight the active region on the map
   */
  highlightRegion(regionId) {
    if (!this.container) return;

    this.container.querySelectorAll('path').forEach(path => {
      if (path.id === regionId) {
        path.classList.add('region-active');
        path.classList.remove('region-dim');
        path.setAttribute('aria-current', 'true');
      } else {
        path.classList.remove('region-active');
        path.classList.add('region-dim');
        path.removeAttribute('aria-current');
      }
    });
  }

  /**
   * Track visited regions and update HUD counts
   */
  markRegionVisited(regionId) {
    if (!regionId) return;

    const previousCount = this.visitedRegions.size;
    this.visitedRegions.add(regionId);

    if (window.AccessibilityManager && this.visitedRegions.size !== previousCount) {
      window.AccessibilityManager.announce(
        `تم استكشاف ${this.visitedRegions.size} من ${this.metadata.totalRegions} مناطق`
      );
    }
  }

  /**
   * Clear region highlight classes
   */
  clearRegionHighlight() {
    if (!this.container) return;

    this.container.querySelectorAll('path').forEach(path => {
      path.classList.remove('region-active', 'region-dim');
      path.removeAttribute('aria-current');
    });
  }

  /**
   * Determine if panel is active
   */
  isPanelActive() {
    return !!(this.regionPanel && this.regionPanel.classList.contains('is-active'));
  }

  /**
   * Handle global keyboard shortcuts for the panel
   */
  handleGlobalKeydown(event) {
    if (!this.isPanelActive()) return;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        this.navigateRegion(-1);
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        this.navigateRegion(1);
        break;
      case 'Escape':
        event.preventDefault();
        this.closeRegionPanel();
        break;
      default:
        break;
    }
  }

  /**
   * Start tracking horizontal swipe on the panel
   */
  handlePanelTouchStart(event) {
    if (!this.isPanelActive() || !event.changedTouches || event.changedTouches.length === 0) {
      return;
    }
    this.touchStartX = event.changedTouches[0].clientX;
  }

  /**
   * Complete swipe gesture and navigate regions
   */
  handlePanelTouchEnd(event) {
    if (!this.isPanelActive() || this.touchStartX === null || !event.changedTouches || event.changedTouches.length === 0) {
      this.touchStartX = null;
      return;
    }

    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchEndX - this.touchStartX;
    const threshold = 45;

    if (Math.abs(deltaX) >= threshold) {
      if (deltaX > 0) {
        this.navigateRegion(-1);
      } else {
        this.navigateRegion(1);
      }
    }

    this.touchStartX = null;
  }

  /**
   * Handle employee link click from region panel
   */
  handleEmployeeLinkClick(e) {
    const link = e.target.closest('.employee-card');
    if (!link) return;

    e.preventDefault();

    const regionId = link.dataset.region;
    const empIndex = parseInt(link.dataset.index, 10);
    const region = this.regionData[regionId];
    if (!region) return;

    const employee = region.employees[empIndex];
    if (!employee) return;

    this.openEmployeeModal(employee);
  }

  /**
   * Open modal showing employee details
   */
  openEmployeeModal(employee) {
    // Get the first (and only) image
    const profileImage = employee.images && employee.images.length > 0
      ? employee.images[0]
      : 'images/placeholder-avatar.svg';

    // Set modal content with single image (no carousel needed)
    this.employeeModalTitle.textContent = employee.name;
    this.employeeModalBody.innerHTML = `
      <div class="employee-profile">
        <img src="${profileImage}"
             class="employee-profile__image"
             alt="${employee.name}"
             onerror="ImageHandler.handleImageError(this, '${employee.name}')">
        <div class="employee-profile__details">
          <p class="employee-profile__position">${employee.position}</p>
          ${employee.positionEn ? `<p class="employee-profile__position-en">${employee.positionEn}</p>` : ''}
          ${employee.startDate ? `<p class="employee-profile__start-date">تاريخ البدء: ${employee.startDate}</p>` : ''}
        </div>
      </div>
      ${employee.cv ? `<a href="${employee.cv}" class="btn btn-primary mt-3" target="_blank">تحميل السيرة الذاتية</a>` : ''}
    `;

    // Show modal
    this.employeeModal.show();

    // Announce to accessibility manager
    if (window.AccessibilityManager) {
      window.AccessibilityManager.announce(`${employee.name} - ${employee.position}`);
    }
  }

  /**
   * Handle application errors
   */
  handleError(message, error) {
    console.error(message, error);

    // Log error for debugging
    ErrorHandler.logError('Application Error', error, { context: message });

    // Show user-friendly error message
    ErrorHandler.showError('حدث خطأ أثناء تحميل التطبيق. يرجى تحديث الصفحة.', 'error');
  }
}

// Monitor network status
window.addEventListener('online', () => {
  console.log('Network connection restored');
  const statusDiv = document.querySelector('.network-status');
  if (statusDiv) statusDiv.remove();
});

window.addEventListener('offline', () => {
  console.warn('Network connection lost');
  const statusDiv = document.createElement('div');
  statusDiv.className = 'network-status offline';
  statusDiv.textContent = 'لا يوجد اتصال بالإنترنت';
  document.body.appendChild(statusDiv);
});

const THEME_STORAGE_KEY = 'moe-ui-theme';

function applyTheme(theme) {
  const resolvedTheme = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', resolvedTheme);
  document.body.setAttribute('data-theme', resolvedTheme);

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    const icon = themeToggle.querySelector('.cta-toggle__icon');
    const label = themeToggle.querySelector('.cta-toggle__label');
    themeToggle.setAttribute('aria-pressed', resolvedTheme === 'dark');
    if (icon) {
      icon.textContent = resolvedTheme === 'dark' ? '🌜' : '🌞';
    }
    if (label) {
      label.textContent = resolvedTheme === 'dark' ? 'الوضع الداكن' : 'الوضع الفاتح';
    }
  }
}

function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(initialTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  });

  const mediaQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  if (mediaQuery) {
    const listener = (event) => {
      const storedValue = localStorage.getItem(THEME_STORAGE_KEY);
      if (storedValue) return;
      applyTheme(event.matches ? 'dark' : 'light');
    };
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', listener);
    } else if (typeof mediaQuery.addListener === 'function') {
      mediaQuery.addListener(listener);
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new EmployeeMapApp();
  app.init();
  initThemeToggle();
});
