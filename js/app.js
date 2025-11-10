/**
 * Employee Map Application - Consolidated JavaScript
 * All functionality combined into a single file
 */

/* ========================================================================
   Employee Regions Data
   ======================================================================== */

// This constant is now embedded here (was in js/regions-data.js)
const regionsData = {
  "regions": {
    "SA-01": {
      "id": "SA-01",
      "name": "منطقة الرياض",
      "nameEn": "Riyadh Region",
      "employees": []
    },
    "SA-02": {
      "id": "SA-02",
      "name": "منطقة مكة المكرمة",
      "nameEn": "Makkah Region",
      "employees": [
        {
          "id": "emp001",
          "name": "خالد الزهراني",
          "nameEn": "Khalid Al Zahrani",
          "position": "مستشار",
          "positionEn": "Consultant",
          "startDate": "2025-04-06",
          "images": ["images/placeholder-avatar.svg"],
          "cv": ""
        },
        {
          "id": "emp002",
          "name": "أحمد الحربي",
          "nameEn": "Ahmad Al Harbi",
          "position": "مهندس خبير",
          "positionEn": "Senior Engineer",
          "startDate": "2025-01-05",
          "images": ["images/placeholder-avatar.svg"],
          "cv": ""
        }
      ]
    },
    "SA-03": {
      "id": "SA-03",
      "name": "المدينة المنورة",
      "nameEn": "Al Madinah",
      "employees": [
        {
          "id": "emp011",
          "name": "عبدالله السحيمي",
          "nameEn": "Abdullah Al Saihmi",
          "position": "كبير مهندسين",
          "positionEn": "Chief Engineer",
          "startDate": "2025-06-29",
          "images": ["images/placeholder-avatar.svg"],
          "cv": ""
        },
        {
          "id": "emp012",
          "name": "عبدالرحمن الحيدري",
          "nameEn": "Abdulrahman Al Haidari",
          "position": "مهندس خبير",
          "positionEn": "Senior Engineer",
          "startDate": "2025-06-29",
          "images": ["images/abdulrahman_alhaidari.png"],
          "cv": ""
        }
      ]
    },
    "SA-04": {
      "id": "SA-04",
      "name": "المنطقة الشرقية",
      "nameEn": "Eastern Province",
      "employees": [
        {
          "id": "emp003",
          "name": "فهد السحيباني",
          "nameEn": "Fahad Al Suhibani",
          "position": "كبير مهندسين",
          "positionEn": "Chief Engineer",
          "startDate": "2025-06-22",
          "images": ["images/fahad_alsuhibani.jpeg"],
          "cv": ""
        },
        {
          "id": "emp004",
          "name": "محمد الغامدي",
          "nameEn": "Muhammad Al Ghamdi",
          "position": "مهندس خبير",
          "positionEn": "Senior Engineer",
          "startDate": "2025-01-01",
          "images": ["images/placeholder-avatar.svg"],
          "cv": ""
        }
      ]
    },
    "SA-05": {
      "id": "SA-05",
      "name": "منطقة القصيم",
      "nameEn": "Al Qassim Region",
      "employees": [
        {
          "id": "emp007",
          "name": "عدنان المطوع",
          "nameEn": "Adnan Al Mutawa",
          "position": "كبير مهندسين",
          "positionEn": "Chief Engineer",
          "startDate": "2024-10-20",
          "images": ["images/adnan_almutawa.jpg"],
          "cv": ""
        },
        {
          "id": "emp008",
          "name": "عبدالله السبيعي",
          "nameEn": "Abdullah Al Subai",
          "position": "مهندس خبير",
          "positionEn": "Senior Engineer",
          "startDate": "2025-03-02",
          "images": ["images/abdullah_alsubaie.jpg"],
          "cv": ""
        }
      ]
    },
    "SA-06": {
      "id": "SA-06",
      "name": "منطقة حائل",
      "nameEn": "Hail Region",
      "employees": [
        {
          "id": "emp018",
          "name": "سلطان الشمري",
          "nameEn": "Sultan Al Shammari",
          "position": "كبير مهندسين",
          "positionEn": "Chief Engineer",
          "startDate": "2025-05-04",
          "images": ["images/sultan_alsahmmari.jpg"],
          "cv": ""
        }
      ]
    },
    "SA-07": {
      "id": "SA-07",
      "name": "منطقة تبوك",
      "nameEn": "Tabuk Region",
      "employees": [
        {
          "id": "emp005",
          "name": "ضيف الله العمراني",
          "nameEn": "Dhaifallah Al Omrani",
          "position": "كبير مهندسين",
          "positionEn": "Chief Engineer",
          "startDate": "2025-06-22",
          "images": ["images/daifallah_alomrani.jpg"],
          "cv": ""
        },
        {
          "id": "emp006",
          "name": "سلمان البلوي",
          "nameEn": "Salman Al Balawi",
          "position": "مهندس خبير",
          "positionEn": "Senior Engineer",
          "startDate": "2025-05-12",
          "images": ["images/salman_albalawi.jpg"],
          "cv": ""
        }
      ]
    },
    "SA-08": {
      "id": "SA-08",
      "name": "منطقة الحدود الشمالية",
      "nameEn": "Northern Borders Region",
      "employees": [
        {
          "id": "emp016",
          "name": "عبدالرحمن الرباعي",
          "nameEn": "Abdulrahman Al Rubai",
          "position": "كبير مهندسين",
          "positionEn": "Chief Engineer",
          "startDate": "2025-05-04",
          "images": ["images/placeholder-avatar.svg"],
          "cv": ""
        }
      ]
    },
    "SA-09": {
      "id": "SA-09",
      "name": "منطقة جازان",
      "nameEn": "Jazan Region",
      "employees": [
        {
          "id": "emp013",
          "name": "حسين عتودي",
          "nameEn": "Hussein Atoudi",
          "position": "كبير مهندسين",
          "positionEn": "Chief Engineer",
          "startDate": "2025-04-20",
          "images": ["images/placeholder-avatar.svg"],
          "cv": ""
        },
        {
          "id": "emp014",
          "name": "محمد نجمي",
          "nameEn": "Muhammad Najmi",
          "position": "مهندس محترف",
          "positionEn": "Professional Engineer",
          "startDate": "2025-03-02",
          "images": ["images/mohammed_najmi.jpeg"],
          "cv": ""
        }
      ]
    },
    "SA-10": {
      "id": "SA-10",
      "name": "منطقة نجران",
      "nameEn": "Najran Region",
      "employees": [
        {
          "id": "emp019",
          "name": "سلطان القحطاني",
          "nameEn": "Sultan Al Qahtani",
          "position": "كبير مهندسين",
          "positionEn": "Chief Engineer",
          "startDate": "2025-05-18",
          "images": ["images/sultan_alqahtani.jpg"],
          "cv": ""
        }
      ]
    },
    "SA-11": {
      "id": "SA-11",
      "name": "منطقة الباحة",
      "nameEn": "Al Bahah Region",
      "employees": [
        {
          "id": "emp017",
          "name": "فيصل الغامدي",
          "nameEn": "Faisal Al Ghamdi",
          "position": "كبير مهندسين",
          "positionEn": "Chief Engineer",
          "startDate": "2025-06-22",
          "images": ["images/placeholder-avatar.svg"],
          "cv": ""
        }
      ]
    },
    "SA-12": {
      "id": "SA-12",
      "name": "منطقة الجوف",
      "nameEn": "Al Jouf Region",
      "employees": [
        {
          "id": "emp015",
          "name": "عبدالله النصر",
          "nameEn": "Abdullah Al Nasser",
          "position": "كبير مهندسين",
          "positionEn": "Chief Engineer",
          "startDate": "2025-06-22",
          "images": ["images/abdullah_alnaser.jpeg"],
          "cv": ""
        }
      ]
    },
    "SA-14": {
      "id": "SA-14",
      "name": "منطقة عسير",
      "nameEn": "Asir Region",
      "employees": [
        {
          "id": "emp009",
          "name": "سعيد القاضي",
          "nameEn": "Saeed Al Qadi",
          "position": "مهندس خبير",
          "positionEn": "Senior Engineer",
          "startDate": "2025-06-29",
          "images": ["images/saeed_alqadi.jpg"],
          "cv": ""
        },
        {
          "id": "emp010",
          "name": "خالد القحطاني",
          "nameEn": "Khalid Al Qahtani",
          "position": "مهندس محترف",
          "positionEn": "Professional Engineer",
          "startDate": "2025-05-18",
          "images": ["images/khalid_alqahtani.jpg"],
          "cv": ""
        }
      ]
    }
  },
  "metadata": {
    "lastUpdated": "2025-10-29",
    "version": "1.0.0",
    "totalEmployees": 19,
    "totalRegions": 12
  }
};

/* ========================================================================
   Error Handling Module
   ======================================================================== */

class ImageHandler {
  static handleImageError(imgElement, employeeName) {
    imgElement.dataset.originalSrc = imgElement.src;
    imgElement.src = 'images/placeholder-avatar.svg';
    imgElement.alt = `صورة غير متوفرة - ${employeeName}`;
    imgElement.classList.add('placeholder-image');
    console.warn(`Failed to load image: ${imgElement.dataset.originalSrc}`);
  }

  static preloadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(src);
      img.onerror = () => reject(new Error(`Failed to load: ${src}`));
      img.src = src;
    });
  }

  static async loadEmployeeImages(employee) {
    const imagePromises = employee.images.map(src =>
      this.preloadImage(src).catch(() => {
        console.warn(`Image not found: ${src}, using placeholder`);
        return 'images/placeholder-avatar.svg';
      })
    );
    return await Promise.all(imagePromises);
  }

  static setupAutoErrorHandling() {
    document.addEventListener('error', (e) => {
      if (e.target.tagName === 'IMG') {
        const img = e.target;
        if (!img.classList.contains('error-handled')) {
          img.classList.add('error-handled');
          this.handleImageError(img, img.alt || 'Unknown');
        }
      }
    }, true);
  }
}

class DataValidator {
  static validateRegion(region, regionId) {
    const errors = [];
    if (!region.id && !regionId) errors.push('Region ID is missing');
    if (!region.name) errors.push('Region name is missing');
    if (!region.employees) errors.push('Region employees array is missing');
    if (region.employees && !Array.isArray(region.employees)) {
      errors.push('Region employees must be an array');
    }
    if (errors.length > 0) {
      throw new Error(`Region validation failed for ${regionId}: ${errors.join(', ')}`);
    }
    return true;
  }

  static validateEmployee(employee, index) {
    const errors = [];
    if (!employee.name) errors.push('Employee name is missing');
    if (!employee.position) errors.push('Employee position is missing');
    if (!employee.startDate) errors.push('Employee start date is missing');
    if (employee.images && !Array.isArray(employee.images)) {
      errors.push('Employee images must be an array');
    }
    if (employee.images && employee.images.length === 0) {
      console.warn(`Employee ${employee.name} has no images`);
    }
    if (!employee.cv) {
      console.warn(`Employee ${employee.name} has no CV`);
    }
    if (errors.length > 0) {
      console.error(`Employee validation failed at index ${index}:`, errors);
      return false;
    }
    return true;
  }

  static validateData(data) {
    if (!data) throw new Error('Data is null or undefined');
    if (!data.regions) throw new Error('Data is missing "regions" property');
    if (typeof data.regions !== 'object') {
      throw new Error('Data "regions" must be an object');
    }

    if (!data.metadata) {
      console.warn('Data is missing metadata');
    } else {
      if (!data.metadata.version) console.warn('Data metadata missing version');
      if (!data.metadata.lastUpdated) console.warn('Data metadata missing lastUpdated');
    }

    let totalEmployees = 0;
    const regionCount = Object.keys(data.regions).length;

    Object.entries(data.regions).forEach(([regionId, region]) => {
      try {
        this.validateRegion(region, regionId);
        region.employees.forEach((emp, index) => {
          this.validateEmployee(emp, index);
        });
        totalEmployees += region.employees.length;
      } catch (error) {
        console.error(`Validation error for region ${regionId}:`, error);
      }
    });

    if (data.metadata) {
      if (data.metadata.totalEmployees !== totalEmployees) {
        console.warn(
          `Employee count mismatch: metadata says ${data.metadata.totalEmployees}, found ${totalEmployees}`
        );
      }
      if (data.metadata.totalRegions !== regionCount) {
        console.warn(
          `Region count mismatch: metadata says ${data.metadata.totalRegions}, found ${regionCount}`
        );
      }
    }

    return true;
  }
}

class ErrorHandler {
  static showError(message, type = 'warning') {
    const toastHTML = `
      <div class="toast align-items-center text-white bg-${type === 'error' ? 'danger' : 'warning'} border-0"
           role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            ${this.escapeHtml(message)}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto"
                  data-bs-dismiss="toast" aria-label="إغلاق"></button>
        </div>
      </div>
    `;

    const container = document.getElementById('toast-container') || this.createToastContainer();
    container.insertAdjacentHTML('beforeend', toastHTML);

    const toastElement = container.lastElementChild;
    const toast = new bootstrap.Toast(toastElement, {
      autohide: true,
      delay: type === 'error' ? 5000 : 3000
    });
    toast.show();

    toastElement.addEventListener('hidden.bs.toast', () => {
      toastElement.remove();
    });
  }

  static createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container position-fixed top-0 end-0 p-3';
    container.setAttribute('style', 'z-index: 9999');
    document.body.appendChild(container);
    return container;
  }

  static escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  static showLoading(message = 'جاري التحميل...') {
    const loadingHTML = `
      <div id="global-loading" class="loading-overlay">
        <div class="spinner-container">
          <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
            <span class="visually-hidden">${this.escapeHtml(message)}</span>
          </div>
          <p class="mt-3">${this.escapeHtml(message)}</p>
        </div>
      </div>
    `;
    this.hideLoading();
    document.body.insertAdjacentHTML('beforeend', loadingHTML);
  }

  static hideLoading() {
    const loader = document.getElementById('global-loading');
    if (loader) loader.remove();
  }

  static handleNetworkError(error) {
    console.error('Network error:', error);
    let message = 'حدث خطأ في الاتصال بالخادم';
    if (!navigator.onLine) {
      message = 'لا يوجد اتصال بالإنترنت. يرجى التحقق من الاتصال.';
    } else if (error.message.includes('404')) {
      message = 'الملف المطلوب غير موجود';
    } else if (error.message.includes('500')) {
      message = 'خطأ في الخادم. يرجى المحاولة لاحقاً';
    }
    this.showError(message, 'error');
  }

  static handleValidationError(error) {
    console.error('Validation error:', error);
    this.showError('البيانات المحملة تحتوي على أخطاء', 'error');
  }

  static logError(context, error, additionalInfo = {}) {
    const errorLog = {
      timestamp: new Date().toISOString(),
      context,
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name
      },
      ...additionalInfo,
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    console.error('Error logged:', errorLog);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    ImageHandler.setupAutoErrorHandling();
  });
} else {
  ImageHandler.setupAutoErrorHandling();
}

/* ========================================================================
   Accessibility Module
   ======================================================================== */

class AccessibilityManager {
  constructor() {
    this.focusableElements = [];
    this.lastFocusedElement = null;
    this.announcer = null;
  }

  init() {
    console.log('Initializing accessibility features...');
    this.createSkipLinks();
    this.createLiveRegion();
    this.setupKeyboardNavigation();
    this.enhanceFocusManagement();
    this.makeTooltipsAccessible();
    console.log('Accessibility features initialized');
  }

  createSkipLinks() {
    const skipLinks = document.createElement('div');
    skipLinks.className = 'skip-links';
    skipLinks.innerHTML = `
      <a href="#map-container" class="skip-link">الانتقال إلى الخريطة</a>
      <a href="#main-content" class="skip-link">الانتقال إلى المحتوى الرئيسي</a>
    `;
    document.body.insertBefore(skipLinks, document.body.firstChild);

    const mapContainer = document.getElementById('map-container');
    if (mapContainer) {
      mapContainer.setAttribute('role', 'application');
      mapContainer.setAttribute('aria-label', 'خريطة السعودية التفاعلية');
    }
  }

  createLiveRegion() {
    this.announcer = document.createElement('div');
    this.announcer.className = 'sr-only';
    this.announcer.setAttribute('role', 'status');
    this.announcer.setAttribute('aria-live', 'polite');
    this.announcer.setAttribute('aria-atomic', 'true');
    document.body.appendChild(this.announcer);
  }

  announce(message, priority = 'polite') {
    if (!this.announcer) return;
    this.announcer.textContent = '';
    this.announcer.setAttribute('aria-live', priority);
    setTimeout(() => {
      this.announcer.textContent = message;
    }, 100);
  }

  setupKeyboardNavigation() {
    const svg = document.querySelector('#map-container svg');
    if (!svg) return;

    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'خريطة السعودية التفاعلية تحتوي على 13 منطقة قابلة للنقر');

    const paths = svg.querySelectorAll('path');
    paths.forEach((path) => {
      path.setAttribute('tabindex', '0');
      path.setAttribute('role', 'button');
      const regionName = path.getAttribute('title');
      path.setAttribute('aria-label', `منطقة ${regionName}، اضغط Enter للعرض`);
      path.addEventListener('keydown', (e) => {
        this.handlePathKeydown(e, path);
      });
      this.focusableElements.push(path);
    });

    svg.addEventListener('keydown', (e) => {
      this.handleArrowNavigation(e);
    });
  }

  handlePathKeydown(e, path) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      path.click();
      const regionName = path.getAttribute('title');
      this.announce(`فتح منطقة ${regionName}`);
    }
  }

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

  enhanceFocusManagement() {
    const regionModal = document.getElementById('regionModal');
    const employeeModal = document.getElementById('employeeModal');

    if (regionModal) this.setupModalFocusTrap(regionModal);
    if (employeeModal) this.setupModalFocusTrap(employeeModal);
  }

  setupModalFocusTrap(modalElement) {
    modalElement.addEventListener('shown.bs.modal', () => {
      this.lastFocusedElement = document.activeElement;

      const focusableElements = modalElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      firstElement.focus();

      modalElement.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      });

      const modalTitle = modalElement.querySelector('.modal-title');
      if (modalTitle) {
        this.announce(`نافذة منبثقة: ${modalTitle.textContent}`);
      }
    });

    modalElement.addEventListener('hidden.bs.modal', () => {
      if (this.lastFocusedElement) {
        this.lastFocusedElement.focus();
      }
      this.announce('تم إغلاق النافذة المنبثقة');
    });
  }

  makeTooltipsAccessible() {
    const tooltip = document.getElementById('tooltip');
    if (!tooltip) return;
    tooltip.setAttribute('role', 'tooltip');
    tooltip.setAttribute('aria-live', 'polite');
    tooltip.setAttribute('aria-atomic', 'true');
  }

  enhanceTableAccessibility(table) {
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

    const rowCount = tbody ? tbody.querySelectorAll('tr').length : 0;
    this.announce(`جدول يحتوي على ${rowCount} موظف`);
  }

  enhanceCarouselAccessibility(carousel) {
    carousel.setAttribute('role', 'region');
    carousel.setAttribute('aria-label', 'معرض الصور');
    carousel.setAttribute('aria-roledescription', 'carousel');

    const carouselInner = carousel.querySelector('.carousel-inner');
    if (carouselInner) {
      carouselInner.setAttribute('role', 'group');
      carouselInner.setAttribute('aria-live', 'polite');
    }

    const prevButton = carousel.querySelector('.carousel-control-prev');
    const nextButton = carousel.querySelector('.carousel-control-next');

    if (prevButton) prevButton.setAttribute('aria-label', 'الصورة السابقة');
    if (nextButton) nextButton.setAttribute('aria-label', 'الصورة التالية');

    const items = carousel.querySelectorAll('.carousel-item');
    items.forEach((item, index) => {
      item.setAttribute('role', 'group');
      item.setAttribute('aria-roledescription', 'slide');
      item.setAttribute('aria-label', `صورة ${index + 1} من ${items.length}`);
    });
  }

  prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  announceLoading(message = 'جاري التحميل') {
    this.announce(message, 'assertive');
  }

  announceLoaded(message = 'اكتمل التحميل') {
    this.announce(message, 'polite');
  }

  announceError(message) {
    this.announce(`خطأ: ${message}`, 'assertive');
  }
}

window.AccessibilityManager = new AccessibilityManager();

/* ========================================================================
   Mobile Optimization Module
   ======================================================================== */

class MobileOptimizer {
  constructor() {
    this.isMobile = false;
    this.isTablet = false;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.isZooming = false;
    this.lastTouchTime = 0;
    this.doubleTapDelay = 300;
  }

  init() {
    console.log('Initializing mobile optimizations...');
    this.detectDevice();
    this.fixMapSVGForMobile();
    this.setupTouchSupport();
    this.optimizeViewport();
    this.preventDoubleTapZoom();
    this.optimizeModalsForMobile();
    this.setupSwipeGestures();
    this.handleOrientationChange();
    console.log(`Device: ${this.isMobile ? 'Mobile' : this.isTablet ? 'Tablet' : 'Desktop'}`);
  }

  fixMapSVGForMobile() {
    if (!this.isMobile && !this.isTablet) return;

    const svg = document.querySelector('.map-container svg');
    if (!svg) return;

    svg.removeAttribute('width');
    svg.removeAttribute('height');

    if (!svg.getAttribute('viewBox')) {
      svg.setAttribute('viewBox', '0 0 730.13947 600.4032');
    }

    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    console.log('SVG map optimized for mobile');
  }

  detectDevice() {
    const width = window.innerWidth;
    const userAgent = navigator.userAgent.toLowerCase();

    this.isMobile = width <= 768 || /mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    this.isTablet = (width > 768 && width <= 1024) || /ipad|tablet|playbook|silk/i.test(userAgent);

    document.body.classList.toggle('is-mobile', this.isMobile);
    document.body.classList.toggle('is-tablet', this.isTablet);
    document.body.classList.toggle('is-desktop', !this.isMobile && !this.isTablet);
  }

  setupTouchSupport() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      document.body.classList.add('touch-enabled');
    }

    const mapContainer = document.getElementById('map-container');
    if (!mapContainer) return;

    mapContainer.addEventListener('touchstart', (e) => {
      this.handleTouchStart(e);
    }, { passive: true });

    mapContainer.addEventListener('touchmove', (e) => {
      this.handleTouchMove(e);
    }, { passive: true });

    mapContainer.addEventListener('touchend', (e) => {
      this.handleTouchEnd(e);
    }, { passive: true });
  }

  handleTouchStart(e) {
    if (e.touches.length === 1) {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    } else if (e.touches.length === 2) {
      this.isZooming = true;
    }
  }

  handleTouchMove(e) {
    if (e.touches.length === 2 && this.isZooming) {
      // Handle pinch zoom if needed in future
    }
  }

  handleTouchEnd(e) {
    if (e.changedTouches.length === 1) {
      this.touchEndX = e.changedTouches[0].clientX;
      this.touchEndY = e.changedTouches[0].clientY;
      this.detectSwipe();
    }
    this.isZooming = false;
  }

  detectSwipe() {
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;
    const minSwipeDistance = 50;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        this.handleSwipeRight();
      } else {
        this.handleSwipeLeft();
      }
    }

    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > minSwipeDistance) {
      if (deltaY > 0) {
        this.handleSwipeDown();
      } else {
        this.handleSwipeUp();
      }
    }
  }

  handleSwipeLeft() {
    const activeCarousel = document.querySelector('.carousel.show .carousel-control-next');
    if (activeCarousel) activeCarousel.click();
  }

  handleSwipeRight() {
    const activeCarousel = document.querySelector('.carousel.show .carousel-control-prev');
    if (activeCarousel) activeCarousel.click();
  }

  handleSwipeDown() {}
  handleSwipeUp() {}

  optimizeViewport() {
    let viewportMeta = document.querySelector('meta[name="viewport"]');

    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      viewportMeta.content = 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes';
      document.head.appendChild(viewportMeta);
    }

    if (!document.querySelector('meta[name="apple-mobile-web-app-capable"]')) {
      const appleMeta = document.createElement('meta');
      appleMeta.name = 'apple-mobile-web-app-capable';
      appleMeta.content = 'yes';
      document.head.appendChild(appleMeta);
    }

    if (!document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')) {
      const statusMeta = document.createElement('meta');
      statusMeta.name = 'apple-mobile-web-app-status-bar-style';
      statusMeta.content = 'black-translucent';
      document.head.appendChild(statusMeta);
    }
  }

  preventDoubleTapZoom() {
    document.addEventListener('touchend', (e) => {
      const target = e.target;

      if (target.matches('button, .btn, a, [role="button"], path')) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - this.lastTouchTime;

        if (tapLength < this.doubleTapDelay && tapLength > 0) {
          e.preventDefault();
        }

        this.lastTouchTime = currentTime;
      }
    }, { passive: false });
  }

  optimizeModalsForMobile() {
    if (!this.isMobile) return;

    const modals = document.querySelectorAll('.modal-dialog');
    modals.forEach(modal => {
      modal.classList.add('modal-fullscreen-sm-down');
    });

    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('shown.bs.modal', () => {
        modal.querySelector('.modal-body')?.scrollTo(0, 0);
        this.forceModalLightColors(modal);
        document.body.style.position = 'fixed';
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.width = '100%';
      });

      modal.addEventListener('hidden.bs.modal', () => {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      });
    });
  }

  forceModalLightColors(modal) {
    if (!this.isMobile) return;

    const modalContent = modal.querySelector('.modal-content');
    const modalHeader = modal.querySelector('.modal-header');
    const modalBody = modal.querySelector('.modal-body');
    const modalTitle = modal.querySelector('.modal-title');

    if (modalContent) {
      modalContent.style.backgroundColor = '#ffffff';
      modalContent.style.color = '#212529';
    }
    if (modalHeader) {
      modalHeader.style.backgroundColor = '#ffffff';
      modalHeader.style.color = '#212529';
    }
    if (modalBody) {
      modalBody.style.backgroundColor = '#ffffff';
      modalBody.style.color = '#212529';
    }
    if (modalTitle) modalTitle.style.color = '#212529';

    const tables = modal.querySelectorAll('.table');
    tables.forEach(table => {
      table.style.backgroundColor = '#ffffff';
      table.style.color = '#212529';

      const cells = table.querySelectorAll('th, td');
      cells.forEach(cell => {
        cell.style.color = '#212529';
        cell.style.backgroundColor = 'transparent';
      });

      const stripeRows = table.querySelectorAll('tbody tr:nth-of-type(odd)');
      stripeRows.forEach(row => {
        row.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
      });
    });

    const textElements = modal.querySelectorAll('h1, h2, h3, h4, h5, h6, p, div, span');
    textElements.forEach(el => {
      if (!el.classList.contains('btn-close')) {
        el.style.color = '#212529';
      }
    });

    const links = modal.querySelectorAll('a');
    links.forEach(link => {
      if (!link.classList.contains('btn-close')) {
        if (link.classList.contains('btn') || link.classList.contains('btn-primary')) {
          link.style.color = '#ffffff';
          link.style.backgroundColor = '#0d6efd';
        } else {
          link.style.color = '#0d6efd';
        }
      }
    });

    const buttons = modal.querySelectorAll('.btn, button');
    buttons.forEach(btn => {
      if (btn.classList.contains('btn-primary')) {
        btn.style.color = '#ffffff';
        btn.style.backgroundColor = '#0d6efd';
      } else if (!btn.classList.contains('btn-close') && btn.classList.contains('btn')) {
        btn.style.color = '#212529';
      }
    });

    console.log('Forced light colors on modal for mobile');
  }

  setupSwipeGestures() {
    document.addEventListener('DOMContentLoaded', () => {
      const carousels = document.querySelectorAll('.carousel');
      carousels.forEach(carousel => {
        carousel.setAttribute('data-bs-touch', 'true');
        carousel.setAttribute('data-bs-interval', 'false');
      });
    });
  }

  handleOrientationChange() {
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.detectDevice();

        if (window.AccessibilityManager) {
          const orientation = window.innerWidth > window.innerHeight ? 'أفقي' : 'عمودي';
          window.AccessibilityManager.announce(`تم تغيير الاتجاه إلى ${orientation}`);
        }
      }, 100);
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.detectDevice();
      }, 250);
    });
  }

  optimizeMobileTooltip() {
    if (!this.isMobile) return;

    const tooltip = document.getElementById('tooltip');
    const mapPaths = document.querySelectorAll('.map-container path');

    mapPaths.forEach(path => {
      path.addEventListener('touchstart', (e) => {
        const event = new MouseEvent('mouseover', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        path.dispatchEvent(event);

        setTimeout(() => {
          if (tooltip) tooltip.style.display = 'none';
        }, 2000);
      }, { passive: true });
    });
  }

  makeTablesResponsive() {
    if (!this.isMobile) return;

    const tables = document.querySelectorAll('.table');
    tables.forEach(table => {
      if (!table.parentElement.classList.contains('table-responsive')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-responsive';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      }
    });
  }

  optimizeImages() {
    if (!this.isMobile) return;

    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.loading = 'lazy';
      img.classList.add('img-fluid');
    });
  }

  isLandscape() {
    return window.innerWidth > window.innerHeight;
  }

  isPortrait() {
    return window.innerHeight > window.innerWidth;
  }

  getDevicePixelRatio() {
    return window.devicePixelRatio || 1;
  }

  hasNotch() {
    const iPhone = /iPhone/.test(navigator.userAgent) && !window.MSStream;
    const aspect = window.screen.width / window.screen.height;
    return iPhone && aspect.toFixed(3) === "0.462";
  }
}

window.MobileOptimizer = new MobileOptimizer();

/* ========================================================================
   Main Application
   ======================================================================== */

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

  async init() {
    try {
      console.log('Initializing Employee Map Application...');

      if (window.AccessibilityManager) {
        window.AccessibilityManager.init();
        window.AccessibilityManager.announceLoading('جاري تحميل البيانات');
      }

      if (window.MobileOptimizer) {
        window.MobileOptimizer.init();
      }

      ErrorHandler.showLoading('جاري تحميل البيانات...');

      await this.loadData();
      this.cacheElements();
      this.setupEventListeners();

      ErrorHandler.hideLoading();

      if (window.AccessibilityManager) {
        window.AccessibilityManager.announceLoaded('تم تحميل البيانات بنجاح');
      }

      console.log('Application initialized successfully');
    } catch (error) {
      ErrorHandler.hideLoading();

      if (window.AccessibilityManager) {
        window.AccessibilityManager.announceError('فشل تحميل البيانات');
      }

      this.handleError('Failed to initialize application', error);
    }
  }

  async loadData() {
    try {
      console.log('Loading employee data...');

      if (typeof regionsData === 'undefined') {
        throw new Error('Employee data not loaded. Make sure data is embedded in app.js.');
      }

      const data = regionsData;

      try {
        DataValidator.validateData(data);
      } catch (validationError) {
        ErrorHandler.handleValidationError(validationError);
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
        source: 'embedded data'
      });

      throw new Error('Failed to load employee data: ' + error.message);
    }
  }

  cacheElements() {
    this.container = document.getElementById('map-container');
    this.tooltip = document.getElementById('tooltip');

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

    this.hudRegionsVisited = document.getElementById('hudRegionsVisited');
    this.hudRegionsTotal = document.getElementById('hudRegionsTotal');
    this.hudRegionEmployees = document.getElementById('hudRegionEmployees');

    if (!this.metadata.totalRegions && this.regionOrder.length > 0) {
      this.metadata.totalRegions = this.regionOrder.length;
    }

    if (this.hudRegionsTotal && this.metadata.totalRegions) {
      this.hudRegionsTotal.textContent = this.metadata.totalRegions;
    }

    const employeeModalEl = document.getElementById('employeeModal');
    this.employeeModal = new bootstrap.Modal(employeeModalEl);
    this.employeeModalTitle = document.getElementById('employeeModalLabel');
    this.employeeModalBody = document.getElementById('employeeModalBody');
    this.employeeModalEl = employeeModalEl;
  }

  setupEventListeners() {
    this.container.querySelectorAll('path').forEach(path => {
      this.setupRegionEvents(path);
    });

    if (this.regionPanelBody) {
      this.regionPanelBody.addEventListener('click', (e) => {
        this.handleEmployeeLinkClick(e);
      });
    }

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

  setupRegionEvents(path) {
    const regionId = path.id;
    const region = this.regionData[regionId];

    if (!region) return;

    path.addEventListener('mouseover', () => {
      this.showTooltip(region);
    });

    path.addEventListener('mousemove', (e) => {
      this.positionTooltip(e);
    });

    path.addEventListener('mouseout', () => {
      this.hideTooltip();
    });

    path.addEventListener('click', () => {
      this.lastFocusedPath = path;
      this.openRegionPanel(regionId);
    });
  }

  showTooltip(region) {
    this.tooltip.innerHTML = `<strong>${region.name}</strong><br>عدد الموظفين: ${region.employees.length}`;
    this.tooltip.style.display = 'block';
  }

  positionTooltip(e) {
    const rect = this.container.getBoundingClientRect();
    this.tooltip.style.left = (e.clientX - rect.left + 10) + 'px';
    this.tooltip.style.top = (e.clientY - rect.top + 10) + 'px';
  }

  hideTooltip() {
    this.tooltip.style.display = 'none';
  }

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

  clearRegionHighlight() {
    if (!this.container) return;

    this.container.querySelectorAll('path').forEach(path => {
      path.classList.remove('region-active', 'region-dim');
      path.removeAttribute('aria-current');
    });
  }

  isPanelActive() {
    return !!(this.regionPanel && this.regionPanel.classList.contains('is-active'));
  }

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

  handlePanelTouchStart(event) {
    if (!this.isPanelActive() || !event.changedTouches || event.changedTouches.length === 0) {
      return;
    }
    this.touchStartX = event.changedTouches[0].clientX;
  }

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

  openEmployeeModal(employee) {
    const profileImage = employee.images && employee.images.length > 0
      ? employee.images[0]
      : 'images/placeholder-avatar.svg';

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

    this.employeeModal.show();

    if (window.AccessibilityManager) {
      window.AccessibilityManager.announce(`${employee.name} - ${employee.position}`);
    }
  }

  updateHud(region) {
    if (this.hudRegionEmployees && region) {
      this.hudRegionEmployees.textContent = region.employees.length;
    }
    if (this.hudRegionsVisited) {
      this.hudRegionsVisited.textContent = this.visitedRegions.size;
    }
  }

  handleError(message, error) {
    console.error(message, error);

    ErrorHandler.logError('Application Error', error, { context: message });

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
