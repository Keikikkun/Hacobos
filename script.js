/**
 * ============================================================================
 * HACOBOS BREAD - Premium Progressive Enhancement Script
 * ============================================================================
 * A minimal, accessible JavaScript enhancement for a premium café website.
 * All features degrade gracefully; site is 100% functional without this file.
 * 
 * Features:
 * - Navbar scroll effect (subtle elevation)
 * - Mobile menu toggle (aria-expanded, keyboard support)
 * - Smooth scroll polyfill (fallback for older browsers)
 * - Carousel keyboard navigation & focus management
 * - Back-to-top button (minimal, fade-in on scroll)
 * 
 * Performance: ~1.2 KB minified. No libraries. Respects prefers-reduced-motion.
 * ============================================================================
 */

// ============================================================================
// 1. NAVBAR SCROLL EFFECT
// ============================================================================
// When user scrolls past hero, navbar gains subtle shadow for depth.
// Degrades: Static navbar looks fine without JS; just no shadow effect.

(function () {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  function updateNavbarOnScroll() {
    // Apply shadow after scrolling 50px past top
    if (window.scrollY > 50) {
      navbar.style.boxShadow = 'var(--shadow-md)';
    } else {
      navbar.style.boxShadow = 'var(--shadow-sm)';
    }
  }

  // Use passive listener for better scroll performance
  window.addEventListener('scroll', updateNavbarOnScroll, { passive: true });
})();

// ============================================================================
// 2. MOBILE MENU TOGGLE
// ============================================================================
// Provides accessible open/close menu for mobile without changing HTML.
// Uses aria-expanded for screen readers. Closes on Escape key.
// Degrades: Without JS, menu shows all links (default behavior).

(function () {
  const navbarMenu = document.querySelector('.navbar-menu');
  if (!navbarMenu) return;

  // Create hamburger button (inserted via JS to maintain clean HTML)
  const hamburger = document.createElement('button');
  hamburger.setAttribute('aria-label', 'Toggle navigation menu');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('class', 'hamburger-menu');
  hamburger.setAttribute('type', 'button');
  
  // Simple hamburger SVG icon
  hamburger.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  `;

  // Insert hamburger only on mobile (before navbar-menu)
  const navbar = document.querySelector('.navbar .container');
  if (navbar) {
    navbar.insertBefore(hamburger, navbarMenu);
  }

  let isMenuOpen = false;

  // Toggle menu on hamburger click
  hamburger.addEventListener('click', function () {
    isMenuOpen = !isMenuOpen;
    hamburger.setAttribute('aria-expanded', isMenuOpen ? 'true' : 'false');
    navbarMenu.classList.toggle('mobile-menu-open', isMenuOpen);
  });

  // Close menu when clicking a link (accessibility + UX)
  const menuLinks = navbarMenu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function () {
      isMenuOpen = false;
      hamburger.setAttribute('aria-expanded', 'false');
      navbarMenu.classList.remove('mobile-menu-open');
    });
  });

  // Close menu on Escape key (accessibility best practice)
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && isMenuOpen) {
      isMenuOpen = false;
      hamburger.setAttribute('aria-expanded', 'false');
      navbarMenu.classList.remove('mobile-menu-open');
      hamburger.focus(); // Return focus to hamburger
    }
  });

  // Trap focus inside menu when open (accessibility requirement for modals/menus)
  document.addEventListener('keydown', function (event) {
    if (!isMenuOpen || event.key !== 'Tab') return;

    const focusableElements = navbarMenu.querySelectorAll('a');
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      lastElement.focus();
      event.preventDefault();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      firstElement.focus();
      event.preventDefault();
    }
  });
})();

// ============================================================================
// 3. SMOOTH SCROLL POLYFILL & FOCUS MANAGEMENT
// ============================================================================
// Provides smooth scrolling for anchor links in older browsers.
// After scroll, moves focus to target section (accessibility improvement).
// Degrades: Without JS, instant jump still works; focus management skipped.

(function () {
  // Check if browser supports native smooth scroll
  const supportsNativeScroll = 'scrollBehavior' in document.documentElement.style;

  // Get all anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      const href = this.getAttribute('href');
      const target = document.querySelector(href);

      if (!target) return;

      // If browser doesn't support smooth scroll, do it manually
      if (!supportsNativeScroll) {
        event.preventDefault();
        smoothScrollTo(target.offsetTop);
      }

      // Always move focus to target for accessibility (even with native smooth scroll)
      // Small delay to avoid visual jump perception
      setTimeout(() => {
        target.focus({ preventScroll: true });
        // Fallback: if element can't receive focus, announce with aria-live
        if (document.activeElement !== target) {
          // Screen readers will announce section heading
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    });
  });

  // Smooth scroll animation (for browsers without native support)
  function smoothScrollTo(targetY) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 600; // milliseconds
    let start = null;

    function animation(currentTime) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = ease(timeElapsed / duration);

      window.scrollTo(0, startY + distance * run);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    // Easing function (ease-in-out-cubic)
    function ease(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    requestAnimationFrame(animation);
  }
})();

// ============================================================================
// 4. CAROUSEL KEYBOARD & AUTO-PLAY CONTROL
// ============================================================================
// Pure JavaScript carousel without Bootstrap dependency.
// Auto-plays every 5 seconds. Arrow keys, Home/End navigate images.
// Pauses on hover. Degrades: Works with mouse buttons only if JS disabled.

(function () {
  const carousel = document.querySelector('#aboutCarousel');
  if (!carousel) return;

  const items = carousel.querySelectorAll('.carousel-item');
  const prevBtn = carousel.querySelector('.carousel-control-prev');
  const nextBtn = carousel.querySelector('.carousel-control-next');
  
  if (items.length === 0) return;

  let currentIndex = 0;
  let autoPlayInterval;
  const autoPlayDelay = 5000; // 5 seconds

  // Show specific slide
  function showSlide(index) {
    // Wrap around
    if (index >= items.length) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = items.length - 1;
    } else {
      currentIndex = index;
    }

    // Remove active class from all items
    items.forEach(item => item.classList.remove('active'));
    
    // Add active class to current item
    items[currentIndex].classList.add('active');
  }

  // Next slide
  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  // Previous slide
  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  // Start auto-play
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
  }

  // Stop auto-play
  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Restart auto-play
  function restartAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  // Button click handlers
  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      prevSlide();
      restartAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      nextSlide();
      restartAutoPlay();
    });
  }

  // Keyboard navigation
  carousel.addEventListener('keydown', function (event) {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        prevSlide();
        restartAutoPlay();
        break;
      case 'ArrowRight':
        event.preventDefault();
        nextSlide();
        restartAutoPlay();
        break;
      case 'Home':
        event.preventDefault();
        showSlide(0);
        restartAutoPlay();
        break;
      case 'End':
        event.preventDefault();
        showSlide(items.length - 1);
        restartAutoPlay();
        break;
    }
  });

  // Pause on hover
  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);

  // Accessibility: Make carousel focusable
  carousel.setAttribute('tabindex', '0');
  carousel.setAttribute('role', 'region');
  carousel.setAttribute('aria-label', 'Image carousel - use arrow keys to navigate');

  // Start auto-play when page loads
  startAutoPlay();
})();

// ============================================================================
// 5. BACK-TO-TOP BUTTON
// ============================================================================
// Minimal, discreet "return to top" button appears after scrolling 300px.
// Smooth scroll animation. No gimmicks, no jank.
// Degrades: Without JS, no back-to-top button; can scroll manually.

(function () {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Create back-to-top button (inserted via JS to keep HTML clean)
  const backToTop = document.createElement('button');
  backToTop.setAttribute('id', 'back-to-top');
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.setAttribute('type', 'button');
  backToTop.setAttribute('class', 'back-to-top');
  backToTop.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  `;

  // Insert button into page (right before closing body tag)
  document.body.appendChild(backToTop);

  // Show/hide button based on scroll position
  function toggleBackToTopButton() {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  // Use passive listener for performance
  window.addEventListener('scroll', toggleBackToTopButton, { passive: true });

  // Smooth scroll to top on click
  backToTop.addEventListener('click', function () {
    if (prefersReducedMotion) {
      // Instant scroll if user prefers reduced motion
      window.scrollTo(0, 0);
    } else {
      // Smooth scroll
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  });

  // Hide button on focus out (accessibility: reduce visual clutter)
  backToTop.addEventListener('blur', function () {
    if (window.scrollY <= 300) {
      backToTop.classList.remove('visible');
    }
  });
})();

// ============================================================================
// 6. SCROLL-BASED REVEAL ANIMATIONS (Task 1)
// ============================================================================
// Fade + slide-up animations for content blocks as they enter viewport.
// Uses IntersectionObserver for excellent performance (no scroll events).
// Respects prefers-reduced-motion for accessibility.

(function () {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Select all elements marked for scroll reveal
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (revealElements.length === 0) return;
  
  // If user prefers reduced motion, just make everything visible immediately
  if (prefersReducedMotion) {
    revealElements.forEach(el => el.classList.add('is-visible'));
    return;
  }
  
  // Create IntersectionObserver with optimized settings
  const observerOptions = {
    threshold: 0.1,           // Trigger when 10% visible
    rootMargin: '0px 0px -50px 0px' // Trigger a bit before fully in view
  };
  
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Unobserve after animation triggers (no need to watch again)
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all reveal elements
  revealElements.forEach(el => observer.observe(el));
})();

// ============================================================================
// 7. SMOOTH SCROLL WITH FOCUS MANAGEMENT (Task 2)
// ============================================================================
// CSS handles scroll-behavior: smooth.
// This JS ensures focus moves to the target section for accessibility.

(function () {
  // Get all anchor navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1); // Remove #
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Let CSS handle the smooth scroll
        // After scroll completes, move focus to target for accessibility
        setTimeout(() => {
          // Find heading in target or use target itself
          const heading = targetElement.querySelector('h1, h2, h3') || targetElement;
          heading.focus({ preventScroll: true });
          
          // If element is not naturally focusable, make it focusable temporarily
          if (!heading.hasAttribute('tabindex')) {
            heading.setAttribute('tabindex', '-1');
          }
        }, 500); // Rough scroll animation time
      }
    });
  });
})();

// ============================================================================
// 8. MENU PREVIEW FALLBACK - Image Error Handling (Task 3)
// ============================================================================
// Enhanced image loading with graceful fallback when images fail to load.
// Shows placeholder when image is missing or network error occurs.

(function () {
  const menuItemsWithImages = document.querySelectorAll('.menu-item[data-image]');
  if (menuItemsWithImages.length === 0) return;
  
  const loadedImages = new Set();
  
  function loadPreviewImage(menuItem, imageName) {
    if (loadedImages.has(imageName)) return;
    
    const previewImg = menuItem.querySelector('.preview-image');
    if (!previewImg) return;
    
    const imagePath = `images/Menu/${imageName}`;
    const testImg = new Image();
    
    testImg.onload = function () {
      previewImg.src = imagePath;
      previewImg.classList.remove('has-error');
      previewImg.style.opacity = '0';
      previewImg.style.transition = 'opacity 0.3s ease-in';
      
      setTimeout(() => {
        previewImg.style.opacity = '1';
      }, 10);
      
      loadedImages.add(imageName);
    };
    
    testImg.onerror = function () {
      // Image failed to load - show placeholder
      console.warn(`Menu preview image not found: ${imagePath}`);
      previewImg.classList.add('has-error');
      loadedImages.add(imageName); // Mark as attempted
    };
    
    testImg.src = imagePath;
  }
  
  menuItemsWithImages.forEach(function (menuItem) {
    const imageName = menuItem.getAttribute('data-image');
    if (!imageName) return;
    
    // Load on hover
    menuItem.addEventListener('mouseenter', function () {
      loadPreviewImage(menuItem, imageName);
    }, { passive: true });
    
    // Load on focus
    menuItem.addEventListener('focus', function () {
      loadPreviewImage(menuItem, imageName);
    }, { passive: true, capture: true });
    
    // Load on touch
    menuItem.addEventListener('touchstart', function () {
      loadPreviewImage(menuItem, imageName);
    }, { passive: true });
  });
  
  // Pre-load first 2 images
  const firstTwoImages = Array.from(menuItemsWithImages).slice(0, 2);
  firstTwoImages.forEach(function (menuItem) {
    const imageName = menuItem.getAttribute('data-image');
    if (imageName) {
      loadPreviewImage(menuItem, imageName);
    }
  });
})();

// ============================================================================
// End of script
// ============================================================================
