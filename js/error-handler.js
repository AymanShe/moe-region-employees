/**
 * Error Handling Module
 * Provides comprehensive error handling for the application
 */

/**
 * ImageHandler - Handles image loading with fallbacks
 */
class ImageHandler {
  /**
   * Handle image load errors with placeholder
   */
  static handleImageError(imgElement, employeeName) {
    // Store original src for logging
    imgElement.dataset.originalSrc = imgElement.src;

    // Replace with placeholder
    imgElement.src = 'images/placeholder-avatar.svg';
    imgElement.alt = `صورة غير متوفرة - ${employeeName}`;
    imgElement.classList.add('placeholder-image');

    // Log for monitoring
    console.warn(`Failed to load image: ${imgElement.dataset.originalSrc}`);
  }

  /**
   * Preload an image and return a promise
   */
  static preloadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(src);
      img.onerror = () => reject(new Error(`Failed to load: ${src}`));
      img.src = src;
    });
  }

  /**
   * Load all employee images with fallback
   */
  static async loadEmployeeImages(employee) {
    const imagePromises = employee.images.map(src =>
      this.preloadImage(src).catch(() => {
        console.warn(`Image not found: ${src}, using placeholder`);
        return 'images/placeholder-avatar.svg';
      })
    );
    return await Promise.all(imagePromises);
  }

  /**
   * Setup automatic error handling for all images
   */
  static setupAutoErrorHandling() {
    // Handle images loaded after page load
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

/**
 * DataValidator - Validates data structure and content
 */
class DataValidator {
  /**
   * Validate region data structure
   */
  static validateRegion(region, regionId) {
    const errors = [];

    // Check required fields
    if (!region.id && !regionId) {
      errors.push('Region ID is missing');
    }
    if (!region.name) {
      errors.push('Region name is missing');
    }
    if (!region.employees) {
      errors.push('Region employees array is missing');
    }

    // Validate employees array
    if (region.employees && !Array.isArray(region.employees)) {
      errors.push('Region employees must be an array');
    }

    if (errors.length > 0) {
      throw new Error(`Region validation failed for ${regionId}: ${errors.join(', ')}`);
    }

    return true;
  }

  /**
   * Validate employee data structure
   */
  static validateEmployee(employee, index) {
    const errors = [];

    // Check required fields
    if (!employee.name) {
      errors.push('Employee name is missing');
    }
    if (!employee.position) {
      errors.push('Employee position is missing');
    }
    if (!employee.startDate) {
      errors.push('Employee start date is missing');
    }

    // Validate arrays
    if (employee.images && !Array.isArray(employee.images)) {
      errors.push('Employee images must be an array');
    }
    if (employee.images && employee.images.length === 0) {
      console.warn(`Employee ${employee.name} has no images`);
    }

    // Validate CV path
    if (!employee.cv) {
      console.warn(`Employee ${employee.name} has no CV`);
    }

    if (errors.length > 0) {
      console.error(`Employee validation failed at index ${index}:`, errors);
      return false;
    }

    return true;
  }

  /**
   * Validate entire data structure
   */
  static validateData(data) {
    if (!data) {
      throw new Error('Data is null or undefined');
    }

    if (!data.regions) {
      throw new Error('Data is missing "regions" property');
    }

    if (typeof data.regions !== 'object') {
      throw new Error('Data "regions" must be an object');
    }

    // Validate metadata
    if (!data.metadata) {
      console.warn('Data is missing metadata');
    } else {
      if (!data.metadata.version) {
        console.warn('Data metadata missing version');
      }
      if (!data.metadata.lastUpdated) {
        console.warn('Data metadata missing lastUpdated');
      }
    }

    // Validate each region
    let totalEmployees = 0;
    const regionCount = Object.keys(data.regions).length;

    Object.entries(data.regions).forEach(([regionId, region]) => {
      try {
        this.validateRegion(region, regionId);

        // Validate employees
        region.employees.forEach((emp, index) => {
          this.validateEmployee(emp, index);
        });

        totalEmployees += region.employees.length;
      } catch (error) {
        console.error(`Validation error for region ${regionId}:`, error);
      }
    });

    // Check metadata totals
    if (data.metadata) {
      if (data.metadata.totalEmployees !== totalEmployees) {
        console.warn(
          `Employee count mismatch: metadata says ${data.metadata.totalEmployees}, ` +
          `found ${totalEmployees}`
        );
      }
      if (data.metadata.totalRegions !== regionCount) {
        console.warn(
          `Region count mismatch: metadata says ${data.metadata.totalRegions}, ` +
          `found ${regionCount}`
        );
      }
    }

    return true;
  }
}

/**
 * ErrorHandler - Displays user-friendly error messages
 */
class ErrorHandler {
  /**
   * Show error message to user using Bootstrap toast
   */
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

    // Remove toast element after it's hidden
    toastElement.addEventListener('hidden.bs.toast', () => {
      toastElement.remove();
    });
  }

  /**
   * Create toast container if it doesn't exist
   */
  static createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container position-fixed top-0 end-0 p-3';
    container.setAttribute('style', 'z-index: 9999');
    document.body.appendChild(container);
    return container;
  }

  /**
   * Escape HTML to prevent XSS
   */
  static escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Show loading indicator
   */
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

    // Remove existing loader if any
    this.hideLoading();

    document.body.insertAdjacentHTML('beforeend', loadingHTML);
  }

  /**
   * Hide loading indicator
   */
  static hideLoading() {
    const loader = document.getElementById('global-loading');
    if (loader) {
      loader.remove();
    }
  }

  /**
   * Handle network errors with user-friendly messages
   */
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

  /**
   * Handle data validation errors
   */
  static handleValidationError(error) {
    console.error('Validation error:', error);
    this.showError('البيانات المحملة تحتوي على أخطاء', 'error');
  }

  /**
   * Log error for debugging
   */
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

    // In production, send to error tracking service
    // this.sendToErrorService(errorLog);
  }
}

// Initialize image error handling when script loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    ImageHandler.setupAutoErrorHandling();
  });
} else {
  ImageHandler.setupAutoErrorHandling();
}
