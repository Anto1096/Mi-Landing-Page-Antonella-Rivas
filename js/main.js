// ========================================
// MAIN JAVASCRIPT - ANTONELLA RIVAS PORTFOLIO
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all modules
  initThemeToggle();
  initNavigation();
  initScrollEffects();
  initAnimations();
  initSmoothScrolling();
  initBackToTop();
  initScrollProgress();
  initMobileMenu();
  initProjectFilters();
  initLazyLoading();
  initAnalyticsTracking();

  console.log("Portfolio loaded successfully! 🚀");
});

function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");

  if (!themeToggle) {
    return;
  }

  const themeIcon = themeToggle.querySelector("i");

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    const isDark = theme === "dark";
    themeIcon.className = isDark ? "fas fa-sun" : "fas fa-moon";
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Activar modo claro" : "Activar modo oscuro",
    );
    themeToggle.setAttribute(
      "title",
      isDark ? "Activar modo claro" : "Activar modo oscuro",
    );
  }

  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "light";
    applyTheme(currentTheme === "dark" ? "light" : "dark");
  });
}

// ========================================
// NAVIGATION FUNCTIONALITY
// ========================================

function initNavigation() {
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");

  // Add active class to current section
  function setActiveLink() {
    const currentSection = getCurrentSection();
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  // Get current section based on scroll position
  function getCurrentSection() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = window.scrollY + 100;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        return section.id;
      }
    }

    return "home";
  }

  // Add navbar background on scroll
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  // Event listeners
  window.addEventListener("scroll", () => {
    handleNavbarScroll();
    setActiveLink();
  });

  // Initial call
  setActiveLink();
}

// ========================================
// MOBILE MENU FUNCTIONALITY
// ========================================

function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const navMenuActions = document.querySelectorAll(".nav-github-btn");

  function toggleMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    hamburger.setAttribute(
      "aria-expanded",
      navMenu.classList.contains("active") ? "true" : "false",
    );

    // Prevent body scrolling when menu is open
    document.body.style.overflow = navMenu.classList.contains("active")
      ? "hidden"
      : "";
  }

  function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  // Event listeners
  hamburger.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleMenu();
    // Track menu interaction
    if (typeof gtag !== "undefined") {
      gtag("event", "menu_toggle", {
        event_category: "navigation",
        event_label: "mobile_menu",
      });
    }
  });

  navMenu.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  // Close menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  navMenuActions.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      closeMenu();
    }
  });

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      closeMenu();
    }
  });
}

// ========================================
// SMOOTH SCROLLING
// ========================================

function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = 70;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// ========================================
// SCROLL EFFECTS
// ========================================

function initScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  }, observerOptions);

  // Observe all sections and cards
  const elementsToObserve = document.querySelectorAll(
    "section, .skill-card, .service-card, .project-card, .testimonial-card",
  );

  elementsToObserve.forEach((element) => {
    element.classList.add("loading");
    observer.observe(element);
  });
}

// ========================================
// ANIMATIONS
// ========================================

function initAnimations() {
  // Stagger animation for skill cards
  const skillCards = document.querySelectorAll(".skill-card");
  skillCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });

  // Stagger animation for service cards
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });

  // Stagger animation for project cards
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
}

// ========================================
// BACK TO TOP BUTTON
// ========================================

function initBackToTop() {
  const backToTopButton = document.createElement("button");
  backToTopButton.className = "back-to-top";
  backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
  backToTopButton.setAttribute("aria-label", "Volver arriba");

  document.body.appendChild(backToTopButton);

  function toggleBackToTop() {
    if (window.scrollY > 500) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Event listeners
  window.addEventListener("scroll", toggleBackToTop);
  backToTopButton.addEventListener("click", scrollToTop);
}

// ========================================
// SCROLL PROGRESS BAR
// ========================================

function initScrollProgress() {
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';

  document.body.appendChild(progressBar);

  const progressBarFill = progressBar.querySelector(".scroll-progress-bar");

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    progressBarFill.style.width = scrollPercent + "%";
  }

  window.addEventListener("scroll", updateScrollProgress);
}

// ========================================
// PROJECT FILTERS (for future expansion)
// ========================================

function initProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (filterButtons.length === 0) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter projects
      projectCards.forEach((card) => {
        const categories = card.getAttribute("data-category");

        if (filter === "all" || categories.includes(filter)) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 100);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// ========================================
// LAZY LOADING FOR IMAGES
// ========================================

function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("loading");
          img.classList.add("loaded");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for older browsers
    images.forEach((img) => {
      img.src = img.dataset.src;
      img.classList.remove("loading");
      img.classList.add("loaded");
    });
  }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function for performance optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Get element's offset from top
function getOffset(element) {
  let offsetTop = 0;
  while (element) {
    offsetTop += element.offsetTop;
    element = element.offsetParent;
  }
  return offsetTop;
}

// ========================================
// PERFORMANCE OPTIMIZATIONS
// ========================================

// Optimize scroll events
const optimizedScrollHandler = throttle(() => {
  // Scroll-related functions will be called here
}, 16); // ~60fps

window.addEventListener("scroll", optimizedScrollHandler);

// Optimize resize events
const optimizedResizeHandler = debounce(() => {
  // Resize-related functions will be called here
}, 250);

window.addEventListener("resize", optimizedResizeHandler);

// ========================================
// ACCESSIBILITY IMPROVEMENTS
// ========================================

// Skip to content link
function initSkipLink() {
  const skipLink = document.createElement("a");
  skipLink.href = "#main-content";
  skipLink.textContent = "Saltar al contenido principal";
  skipLink.className = "skip-link";

  document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize accessibility features
initSkipLink();

// Focus management for keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("keyboard-nav");
  }
});

document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-nav");
});

// ========================================
// ERROR HANDLING
// ========================================

// Global error handler
window.addEventListener("error", (e) => {
  console.error("Error occurred:", e.error);
  // You can add error reporting here
});

// Unhandled promise rejection handler
window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled promise rejection:", e.reason);
  // You can add error reporting here
});

// ========================================
// EXPORT FUNCTIONS (for testing)
// ========================================

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initNavigation,
    initScrollEffects,
    initAnimations,
    initSmoothScrolling,
    initBackToTop,
    initScrollProgress,
    initMobileMenu,
    debounce,
    throttle,
    isInViewport,
    getOffset,
  };
}

// This duplicate code has been removed - functionality is already handled above

// ========================================
// ANALYTICS TRACKING
// ========================================

function initAnalyticsTracking() {
  // Track project link clicks
  const projectLinks = document.querySelectorAll(".project-link");
  projectLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const projectName = link
        .closest(".project-card")
        .querySelector(".project-title").textContent;
      const linkType = link
        .querySelector("i")
        .classList.contains("fa-external-link-alt")
        ? "demo"
        : "github";

      if (typeof gtag !== "undefined") {
        gtag("event", "project_click", {
          event_category: "engagement",
          event_label: projectName,
          custom_parameter: linkType,
        });
      }
    });
  });

  // Track contact form interactions
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", () => {
      if (typeof gtag !== "undefined") {
        gtag("event", "form_submit", {
          event_category: "engagement",
          event_label: "contact_form",
        });
      }
    });
  }

  // Track scroll depth
  let maxScrollDepth = 0;
  window.addEventListener("scroll", () => {
    const scrollDepth = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
        100,
    );

    if (scrollDepth > maxScrollDepth && scrollDepth % 25 === 0) {
      maxScrollDepth = scrollDepth;
      if (typeof gtag !== "undefined") {
        gtag("event", "scroll_depth", {
          event_category: "engagement",
          event_label: `${scrollDepth}%`,
        });
      }
    }
  });

  // Track language changes
  const langButtons = document.querySelectorAll(".language-switcher a");
  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (typeof gtag !== "undefined") {
        gtag("event", "language_change", {
          event_category: "interaction",
          event_label: button.textContent.trim(),
        });
      }
    });
  });
}
