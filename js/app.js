/**
 * Employee Map Application
 * Main application class for the Saudi Arabia interactive map
 */

class EmployeeMapApp {
  constructor() {
    this.regionData = null;
    this.currentLanguage = 'ar';
    this.container = null;
    this.tooltip = null;
    this.regionModal = null;
    this.employeeModal = null;
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

      console.log(`Loaded ${data.metadata.totalEmployees} employees across ${data.metadata.totalRegions} regions`);
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

    // Region modal elements
    const regionModalEl = document.getElementById('regionModal');
    this.regionModal = new bootstrap.Modal(regionModalEl);
    this.regionModalTitle = document.getElementById('regionModalLabel');
    this.regionModalBody = document.getElementById('modalBody');
    this.regionModalEl = regionModalEl;

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
    this.regionModalEl.addEventListener('click', (e) => {
      this.handleEmployeeLinkClick(e);
    });
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
      this.openRegionModal(regionId);
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
   * Open modal showing all employees in a region
   */
  openRegionModal(regionId) {
    const region = this.regionData[regionId];
    if (!region) return;

    // Generate employee table rows
    const rows = region.employees.map((emp, i) => `
      <tr>
        <td>
          <a href="#" class="employee-link"
             data-region="${regionId}"
             data-index="${i}">
            ${emp.name}
          </a>
        </td>
        <td>${emp.position}</td>
        <td>${emp.startDate}</td>
      </tr>
    `).join('');

    // Set modal content
    this.regionModalTitle.textContent = region.name;
    this.regionModalBody.innerHTML = `
      <h6>الموظفون:</h6>
      <div class="table-responsive">
        <table class="table table-striped mb-0">
          <thead class="table-light">
            <tr>
              <th scope="col">الاسم</th>
              <th scope="col">المنصب</th>
              <th scope="col">تاريخ البدء</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;

    // Show modal
    this.regionModal.show();

    // Enhance table accessibility
    if (window.AccessibilityManager) {
      const table = this.regionModalBody.querySelector('table');
      if (table) {
        window.AccessibilityManager.enhanceTableAccessibility(table);
      }
    }
  }

  /**
   * Handle employee link click from region modal
   */
  handleEmployeeLinkClick(e) {
    const link = e.target.closest('.employee-link');
    if (!link) return;

    e.preventDefault();

    // Hide region modal
    this.regionModal.hide();

    // Get employee data
    const regionId = link.dataset.region;
    const empIndex = parseInt(link.dataset.index);
    const employee = this.regionData[regionId].employees[empIndex];

    if (!employee) return;

    // Show employee modal
    this.openEmployeeModal(employee);
  }

  /**
   * Open modal showing employee details
   */
  openEmployeeModal(employee) {
    // Generate carousel items with error handling
    const carouselItems = employee.images.map((src, i) => `
      <div class="carousel-item ${i === 0 ? 'active' : ''}">
        <img src="${src}"
             class="d-block w-100"
             alt="${employee.name}"
             onerror="ImageHandler.handleImageError(this, '${employee.name}')">
      </div>
    `).join('');

    // Set modal content
    this.employeeModalTitle.textContent = employee.name;
    this.employeeModalBody.innerHTML = `
      <div id="employeeCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          ${carouselItems}
        </div>
        <button class="carousel-control-prev" type="button"
                data-bs-target="#employeeCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon"></span>
          <span class="visually-hidden">السابق</span>
        </button>
        <button class="carousel-control-next" type="button"
                data-bs-target="#employeeCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon"></span>
          <span class="visually-hidden">التالي</span>
        </button>
      </div>
      <a href="${employee.cv}" class="btn btn-primary mt-3" target="_blank">تحميل السيرة الذاتية</a>
    `;

    // Show modal
    this.employeeModal.show();

    // Enhance carousel accessibility
    if (window.AccessibilityManager) {
      const carousel = this.employeeModalBody.querySelector('.carousel');
      if (carousel) {
        window.AccessibilityManager.enhanceCarouselAccessibility(carousel);
      }
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

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new EmployeeMapApp();
  app.init();
});
