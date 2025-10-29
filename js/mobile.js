/**
 * Mobile Optimization Module
 * Touch gestures, responsive behavior, and mobile-first features
 */

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

  /**
   * Initialize mobile optimizations
   */
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

  /**
   * Fix SVG map sizing for mobile devices
   */
  fixMapSVGForMobile() {
    if (!this.isMobile && !this.isTablet) return;

    const svg = document.querySelector('.map-container svg');
    if (!svg) return;

    // Remove fixed width/height attributes to allow CSS to control sizing
    svg.removeAttribute('width');
    svg.removeAttribute('height');

    // Ensure proper viewBox for responsive scaling
    if (!svg.getAttribute('viewBox')) {
      // Use the original dimensions as viewBox if not present
      svg.setAttribute('viewBox', '0 0 730.13947 600.4032');
    }

    // Set preserveAspectRatio
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    console.log('SVG map optimized for mobile');
  }

  /**
   * Detect device type
   */
  detectDevice() {
    const width = window.innerWidth;
    const userAgent = navigator.userAgent.toLowerCase();

    // Check for mobile devices
    this.isMobile = width <= 768 || /mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

    // Check for tablets
    this.isTablet = (width > 768 && width <= 1024) || /ipad|tablet|playbook|silk/i.test(userAgent);

    // Add class to body for CSS targeting
    document.body.classList.toggle('is-mobile', this.isMobile);
    document.body.classList.toggle('is-tablet', this.isTablet);
    document.body.classList.toggle('is-desktop', !this.isMobile && !this.isTablet);
  }

  /**
   * Set up touch event support
   */
  setupTouchSupport() {
    // Add touch class if device supports touch
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      document.body.classList.add('touch-enabled');
    }

    // Handle touch events on map
    const mapContainer = document.getElementById('map-container');
    if (!mapContainer) return;

    // Touch start
    mapContainer.addEventListener('touchstart', (e) => {
      this.handleTouchStart(e);
    }, { passive: true });

    // Touch move
    mapContainer.addEventListener('touchmove', (e) => {
      this.handleTouchMove(e);
    }, { passive: true });

    // Touch end
    mapContainer.addEventListener('touchend', (e) => {
      this.handleTouchEnd(e);
    }, { passive: true });
  }

  /**
   * Handle touch start
   */
  handleTouchStart(e) {
    if (e.touches.length === 1) {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    } else if (e.touches.length === 2) {
      // Start pinch zoom detection
      this.isZooming = true;
    }
  }

  /**
   * Handle touch move
   */
  handleTouchMove(e) {
    if (e.touches.length === 2 && this.isZooming) {
      // Handle pinch zoom (if needed in future)
      // Currently map doesn't support zoom, but structure is ready
    }
  }

  /**
   * Handle touch end
   */
  handleTouchEnd(e) {
    if (e.changedTouches.length === 1) {
      this.touchEndX = e.changedTouches[0].clientX;
      this.touchEndY = e.changedTouches[0].clientY;

      // Check for swipe gesture
      this.detectSwipe();
    }

    this.isZooming = false;
  }

  /**
   * Detect swipe direction
   */
  detectSwipe() {
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;
    const minSwipeDistance = 50;

    // Horizontal swipe
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        this.handleSwipeRight();
      } else {
        this.handleSwipeLeft();
      }
    }

    // Vertical swipe
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > minSwipeDistance) {
      if (deltaY > 0) {
        this.handleSwipeDown();
      } else {
        this.handleSwipeUp();
      }
    }
  }

  /**
   * Handle swipe gestures
   */
  handleSwipeLeft() {
    // Navigate carousel forward if carousel is active
    const activeCarousel = document.querySelector('.carousel.show .carousel-control-next');
    if (activeCarousel) {
      activeCarousel.click();
    }
  }

  handleSwipeRight() {
    // Navigate carousel backward if carousel is active
    const activeCarousel = document.querySelector('.carousel.show .carousel-control-prev');
    if (activeCarousel) {
      activeCarousel.click();
    }
  }

  handleSwipeDown() {
    // Could be used to close modal in future
    // For now, no action
  }

  handleSwipeUp() {
    // Could be used for additional features
    // For now, no action
  }

  /**
   * Optimize viewport settings
   */
  optimizeViewport() {
    // Ensure viewport meta tag exists
    let viewportMeta = document.querySelector('meta[name="viewport"]');

    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      viewportMeta.content = 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes';
      document.head.appendChild(viewportMeta);
    }

    // Add mobile web app capabilities for iOS
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

  /**
   * Prevent double-tap zoom on buttons
   */
  preventDoubleTapZoom() {
    document.addEventListener('touchend', (e) => {
      const target = e.target;

      // Check if target is a button or interactive element
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

  /**
   * Optimize modals for mobile devices
   */
  optimizeModalsForMobile() {
    if (!this.isMobile) return;

    // Make modals full screen on mobile
    const modals = document.querySelectorAll('.modal-dialog');
    modals.forEach(modal => {
      modal.classList.add('modal-fullscreen-sm-down');
    });

    // Adjust modal positioning
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('shown.bs.modal', () => {
        // Scroll to top when modal opens
        modal.querySelector('.modal-body')?.scrollTo(0, 0);

        // Force light colors on mobile
        this.forceModalLightColors(modal);

        // Prevent body scroll on iOS
        document.body.style.position = 'fixed';
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.width = '100%';
      });

      modal.addEventListener('hidden.bs.modal', () => {
        // Restore body scroll
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      });
    });
  }

  /**
   * Force light colors on modal for readability
   */
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

    if (modalTitle) {
      modalTitle.style.color = '#212529';
    }

    // Fix table colors
    const tables = modal.querySelectorAll('.table');
    tables.forEach(table => {
      table.style.backgroundColor = '#ffffff';
      table.style.color = '#212529';

      const cells = table.querySelectorAll('th, td');
      cells.forEach(cell => {
        cell.style.color = '#212529';
        cell.style.backgroundColor = 'transparent';
      });

      // Fix striped rows
      const stripeRows = table.querySelectorAll('tbody tr:nth-of-type(odd)');
      stripeRows.forEach(row => {
        row.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
      });
    });

    // Fix all text elements
    const textElements = modal.querySelectorAll('h1, h2, h3, h4, h5, h6, p, div, span');
    textElements.forEach(el => {
      if (!el.classList.contains('btn-close')) {
        el.style.color = '#212529';
      }
    });

    // Fix links
    const links = modal.querySelectorAll('a');
    links.forEach(link => {
      if (!link.classList.contains('btn-close')) {
        // If it's a button, make text white
        if (link.classList.contains('btn') || link.classList.contains('btn-primary')) {
          link.style.color = '#ffffff';
          link.style.backgroundColor = '#0d6efd';
        } else {
          link.style.color = '#0d6efd';
        }
      }
    });

    // Fix all buttons
    const buttons = modal.querySelectorAll('.btn, button');
    buttons.forEach(btn => {
      if (btn.classList.contains('btn-primary')) {
        btn.style.color = '#ffffff';
        btn.style.backgroundColor = '#0d6efd';
      } else if (btn.classList.contains('btn-close')) {
        // Keep close button as is
      } else if (btn.classList.contains('btn')) {
        btn.style.color = '#212529';
      }
    });

    console.log('Forced light colors on modal for mobile');
  }

  /**
   * Set up swipe gestures for carousels
   */
  setupSwipeGestures() {
    // Swipe gestures are handled in detectSwipe()
    // This method can be extended for additional swipe features

    // Enable touch swiping on Bootstrap carousels
    document.addEventListener('DOMContentLoaded', () => {
      const carousels = document.querySelectorAll('.carousel');
      carousels.forEach(carousel => {
        carousel.setAttribute('data-bs-touch', 'true');
        carousel.setAttribute('data-bs-interval', 'false'); // Disable auto-play
      });
    });
  }

  /**
   * Handle orientation changes
   */
  handleOrientationChange() {
    window.addEventListener('orientationchange', () => {
      // Re-detect device on orientation change
      setTimeout(() => {
        this.detectDevice();

        // Announce orientation change
        if (window.AccessibilityManager) {
          const orientation = window.innerWidth > window.innerHeight ? 'أفقي' : 'عمودي';
          window.AccessibilityManager.announce(`تم تغيير الاتجاه إلى ${orientation}`);
        }
      }, 100);
    });

    // Also listen to resize for responsive adjustments
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.detectDevice();
      }, 250);
    });
  }

  /**
   * Optimize tooltip for mobile (show on tap instead of hover)
   */
  optimizeMobileTooltip() {
    if (!this.isMobile) return;

    const tooltip = document.getElementById('tooltip');
    const mapPaths = document.querySelectorAll('.map-container path');

    mapPaths.forEach(path => {
      // Disable hover on mobile
      path.addEventListener('touchstart', (e) => {
        // Show tooltip on touch
        const event = new MouseEvent('mouseover', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        path.dispatchEvent(event);

        // Hide tooltip after delay
        setTimeout(() => {
          if (tooltip) {
            tooltip.style.display = 'none';
          }
        }, 2000);
      }, { passive: true });
    });
  }

  /**
   * Make tables responsive on mobile
   */
  makeTablesResponsive() {
    if (!this.isMobile) return;

    const tables = document.querySelectorAll('.table');
    tables.forEach(table => {
      // Add responsive wrapper if not already present
      if (!table.parentElement.classList.contains('table-responsive')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-responsive';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      }
    });
  }

  /**
   * Optimize images for mobile
   */
  optimizeImages() {
    if (!this.isMobile) return;

    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Add lazy loading
      img.loading = 'lazy';

      // Add mobile-optimized class
      img.classList.add('img-fluid');
    });
  }

  /**
   * Add pull-to-refresh hint (visual only)
   */
  addPullToRefreshHint() {
    if (!this.isMobile) return;

    let startY = 0;
    let currentY = 0;
    let isPulling = false;

    document.addEventListener('touchstart', (e) => {
      if (window.scrollY === 0) {
        startY = e.touches[0].clientY;
        isPulling = true;
      }
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
      if (!isPulling) return;
      currentY = e.touches[0].clientY;

      // If pulled down more than 100px
      if (currentY - startY > 100) {
        // Could show refresh indicator here
        // For now, just structure is ready
      }
    }, { passive: true });

    document.addEventListener('touchend', () => {
      isPulling = false;
      startY = 0;
      currentY = 0;
    }, { passive: true });
  }

  /**
   * Check if device is in landscape mode
   */
  isLandscape() {
    return window.innerWidth > window.innerHeight;
  }

  /**
   * Check if device is in portrait mode
   */
  isPortrait() {
    return window.innerHeight > window.innerWidth;
  }

  /**
   * Get device pixel ratio
   */
  getDevicePixelRatio() {
    return window.devicePixelRatio || 1;
  }

  /**
   * Check if device has notch (iPhone X and newer)
   */
  hasNotch() {
    const iPhone = /iPhone/.test(navigator.userAgent) && !window.MSStream;
    const aspect = window.screen.width / window.screen.height;
    return iPhone && aspect.toFixed(3) === "0.462"; // iPhone X aspect ratio
  }
}

// Create global instance
window.MobileOptimizer = new MobileOptimizer();
