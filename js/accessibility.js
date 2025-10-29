/**
 * Accessibility Module
 * Implements WCAG 2.1 AA compliance features
 */

class AccessibilityManager {
  constructor() {
    this.focusableElements = [];
    this.lastFocusedElement = null;
    this.announcer = null;
  }

  /**
   * Initialize all accessibility features
   */
  init() {
    console.log('Initializing accessibility features...');

    this.createSkipLinks();
    this.createLiveRegion();
    this.setupKeyboardNavigation();
    this.enhanceFocusManagement();
    this.makeTooltipsAccessible();

    console.log('Accessibility features initialized');
  }

  /**
   * Create skip navigation links
   */
  createSkipLinks() {
    const skipLinks = document.createElement('div');
    skipLinks.className = 'skip-links';
    skipLinks.innerHTML = `
      <a href="#map-container" class="skip-link">الانتقال إلى الخريطة</a>
      <a href="#main-content" class="skip-link">الانتقال إلى المحتوى الرئيسي</a>
    `;
    document.body.insertBefore(skipLinks, document.body.firstChild);

    // Ensure map container has ID for skip link
    const mapContainer = document.getElementById('map-container');
    if (mapContainer) {
      mapContainer.setAttribute('role', 'application');
      mapContainer.setAttribute('aria-label', 'خريطة السعودية التفاعلية');
    }
  }

  /**
   * Create ARIA live region for announcements
   */
  createLiveRegion() {
    this.announcer = document.createElement('div');
    this.announcer.className = 'sr-only';
    this.announcer.setAttribute('role', 'status');
    this.announcer.setAttribute('aria-live', 'polite');
    this.announcer.setAttribute('aria-atomic', 'true');
    document.body.appendChild(this.announcer);
  }

  /**
   * Announce message to screen readers
   */
  announce(message, priority = 'polite') {
    if (!this.announcer) return;

    // Clear previous announcement
    this.announcer.textContent = '';

    // Set priority
    this.announcer.setAttribute('aria-live', priority);

    // Announce after short delay to ensure screen reader picks it up
    setTimeout(() => {
      this.announcer.textContent = message;
    }, 100);
  }

  /**
   * Set up keyboard navigation for map regions
   */
  setupKeyboardNavigation() {
    const svg = document.querySelector('#map-container svg');
    if (!svg) return;

    // Add ARIA label to SVG
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'خريطة السعودية التفاعلية تحتوي على 13 منطقة قابلة للنقر');

    const paths = svg.querySelectorAll('path');

    paths.forEach((path, index) => {
      // Make keyboard focusable
      path.setAttribute('tabindex', '0');

      // Add ARIA role and label
      path.setAttribute('role', 'button');
      const regionName = path.getAttribute('title');
      path.setAttribute('aria-label', `منطقة ${regionName}، اضغط Enter للعرض`);

      // Add keyboard event listeners
      path.addEventListener('keydown', (e) => {
        this.handlePathKeydown(e, path);
      });

      // Store for navigation
      this.focusableElements.push(path);
    });

    // Add arrow key navigation
    svg.addEventListener('keydown', (e) => {
      this.handleArrowNavigation(e);
    });
  }

  /**
   * Handle keydown events on map paths
   */
  handlePathKeydown(e, path) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      path.click();

      // Announce to screen readers
      const regionName = path.getAttribute('title');
      this.announce(`فتح منطقة ${regionName}`);
    }
  }

  /**
   * Handle arrow key navigation between regions
   */
  handleArrowNavigation(e) {
    const currentElement = document.activeElement;
    const currentIndex = this.focusableElements.indexOf(currentElement);

    if (currentIndex === -1) return;

    let nextIndex;

    switch(e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = (currentIndex + 1) % this.focusableElements.length;
        this.focusableElements[nextIndex].focus();
        break;

      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) nextIndex = this.focusableElements.length - 1;
        this.focusableElements[nextIndex].focus();
        break;

      case 'Home':
        e.preventDefault();
        this.focusableElements[0].focus();
        break;

      case 'End':
        e.preventDefault();
        this.focusableElements[this.focusableElements.length - 1].focus();
        break;
    }
  }

  /**
   * Enhance focus management for modals
   */
  enhanceFocusManagement() {
    const regionModal = document.getElementById('regionModal');
    const employeeModal = document.getElementById('employeeModal');

    if (regionModal) {
      this.setupModalFocusTrap(regionModal);
    }

    if (employeeModal) {
      this.setupModalFocusTrap(employeeModal);
    }
  }

  /**
   * Trap focus inside modal when open
   */
  setupModalFocusTrap(modalElement) {
    modalElement.addEventListener('shown.bs.modal', () => {
      // Store last focused element
      this.lastFocusedElement = document.activeElement;

      // Get all focusable elements in modal
      const focusableElements = modalElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Focus first element
      firstElement.focus();

      // Trap focus
      modalElement.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      });

      // Announce modal opened
      const modalTitle = modalElement.querySelector('.modal-title');
      if (modalTitle) {
        this.announce(`نافذة منبثقة: ${modalTitle.textContent}`);
      }
    });

    modalElement.addEventListener('hidden.bs.modal', () => {
      // Restore focus to last focused element
      if (this.lastFocusedElement) {
        this.lastFocusedElement.focus();
      }

      this.announce('تم إغلاق النافذة المنبثقة');
    });
  }

  /**
   * Make tooltips accessible to screen readers
   */
  makeTooltipsAccessible() {
    const tooltip = document.getElementById('tooltip');
    if (!tooltip) return;

    // Add ARIA live region to tooltip
    tooltip.setAttribute('role', 'tooltip');
    tooltip.setAttribute('aria-live', 'polite');
    tooltip.setAttribute('aria-atomic', 'true');
  }

  /**
   * Enhance table accessibility
   */
  enhanceTableAccessibility(table) {
    // Add proper ARIA roles
    table.setAttribute('role', 'table');
    table.setAttribute('aria-label', 'جدول الموظفين');

    const thead = table.querySelector('thead');
    if (thead) {
      thead.setAttribute('role', 'rowgroup');

      const headerRow = thead.querySelector('tr');
      if (headerRow) {
        headerRow.setAttribute('role', 'row');

        headerRow.querySelectorAll('th').forEach(th => {
          th.setAttribute('role', 'columnheader');
          th.setAttribute('scope', 'col');
        });
      }
    }

    const tbody = table.querySelector('tbody');
    if (tbody) {
      tbody.setAttribute('role', 'rowgroup');

      tbody.querySelectorAll('tr').forEach(tr => {
        tr.setAttribute('role', 'row');

        tr.querySelectorAll('td').forEach(td => {
          td.setAttribute('role', 'cell');
        });
      });
    }

    // Announce table information
    const rowCount = tbody ? tbody.querySelectorAll('tr').length : 0;
    this.announce(`جدول يحتوي على ${rowCount} موظف`);
  }

  /**
   * Add ARIA labels to carousel
   */
  enhanceCarouselAccessibility(carousel) {
    carousel.setAttribute('role', 'region');
    carousel.setAttribute('aria-label', 'معرض الصور');
    carousel.setAttribute('aria-roledescription', 'carousel');

    const carouselInner = carousel.querySelector('.carousel-inner');
    if (carouselInner) {
      carouselInner.setAttribute('role', 'group');
      carouselInner.setAttribute('aria-live', 'polite');
    }

    // Add labels to navigation buttons
    const prevButton = carousel.querySelector('.carousel-control-prev');
    const nextButton = carousel.querySelector('.carousel-control-next');

    if (prevButton) {
      prevButton.setAttribute('aria-label', 'الصورة السابقة');
    }

    if (nextButton) {
      nextButton.setAttribute('aria-label', 'الصورة التالية');
    }

    // Announce current slide
    const items = carousel.querySelectorAll('.carousel-item');
    items.forEach((item, index) => {
      item.setAttribute('role', 'group');
      item.setAttribute('aria-roledescription', 'slide');
      item.setAttribute('aria-label', `صورة ${index + 1} من ${items.length}`);
    });
  }

  /**
   * Check if user prefers reduced motion
   */
  prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Announce loading state
   */
  announceLoading(message = 'جاري التحميل') {
    this.announce(message, 'assertive');
  }

  /**
   * Announce loaded state
   */
  announceLoaded(message = 'اكتمل التحميل') {
    this.announce(message, 'polite');
  }

  /**
   * Announce error state
   */
  announceError(message) {
    this.announce(`خطأ: ${message}`, 'assertive');
  }
}

// Create global instance
window.AccessibilityManager = new AccessibilityManager();
