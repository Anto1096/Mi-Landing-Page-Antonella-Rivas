// ========================================
// ANIMATIONS - ANTONELLA RIVAS PORTFOLIO
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();

  // Testimonials Slider Logic
  const testimonialsGrid = document.querySelector(".testimonials-grid");
  const prevBtn = document.getElementById("prev-testimonial");
  const nextBtn = document.getElementById("next-testimonial");
  const testimonials = document.querySelectorAll(".testimonial-card");
  let currentIndex = 0;

  function showTestimonial(index) {
    if (!testimonialsGrid || testimonials.length === 0) {
      return;
    }

    // Use real card width to avoid overlap on different breakpoints.
    const slideWidth = testimonials[0].getBoundingClientRect().width;
    const offset = -index * slideWidth;
    testimonialsGrid.style.transform = `translateX(${offset}px)`;
  }

  if (testimonialsGrid && prevBtn && nextBtn && testimonials.length > 0) {
    testimonials.forEach((card) => {
      card.style.flex = "0 0 100%";
    });

    prevBtn.addEventListener("click", () => {

function initScrollReveal() {
  const revealTargets = [
    [".hero-title", { origin: "top", distance: "30px" }],
    [".hero-subtitle", { delay: 400 }],
    [".hero-description", { delay: 500 }],
    [".hero-buttons", { delay: 600 }],
    [".hero-image", { origin: "right", distance: "100px", delay: 700 }],
    [".about, .skills, .services, .projects, .testimonials, .contact", {}],
  ];

  const bootReveal = () => {
    if (typeof ScrollReveal === "undefined") {
      return;
    }

    const sr = ScrollReveal({
      origin: "bottom",
      distance: "60px",
      duration: 1000,
      delay: 200,
      reset: false,
    });

    revealTargets.forEach(([selector, options]) => {
      sr.reveal(selector, options);
    });
  };

  const loadRevealScript = () => {
    if (typeof ScrollReveal !== "undefined") {
      bootReveal();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://unpkg.com/scrollreveal";
    script.async = true;
    script.onload = bootReveal;
    document.body.appendChild(script);
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(loadRevealScript, { timeout: 1200 });
  } else {
    window.addEventListener("load", loadRevealScript, { once: true });
  }
}
      currentIndex =
        currentIndex > 0 ? currentIndex - 1 : testimonials.length - 1;
      showTestimonial(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
      currentIndex =
        currentIndex < testimonials.length - 1 ? currentIndex + 1 : 0;
      showTestimonial(currentIndex);
    });

    window.addEventListener("resize", () => showTestimonial(currentIndex));
    showTestimonial(currentIndex);
  }
});

// ========================================
// SCROLL ANIMATIONS
// ========================================

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animationType =
          element.getAttribute("data-animation") || "fadeInUp";

        element.classList.add("animate", animationType);

        // Add staggered delay for grouped elements
        if (element.hasAttribute("data-stagger")) {
          const siblings = Array.from(element.parentNode.children);
          const index = siblings.indexOf(element);
          element.style.animationDelay = `${index * 0.1}s`;
        }

        observer.unobserve(element);
      }
    });
  }, observerOptions);

  // Observe elements with animation attributes
  const animatedElements = document.querySelectorAll("[data-animation]");
  animatedElements.forEach((element) => {
    observer.observe(element);
  });

  // Auto-detect common elements for animation
  const autoAnimateElements = document.querySelectorAll(`
        .skill-card,
        .service-card,
        .project-card,
        .testimonial-card,
        .contact-item,
        .about-text,
        .hero-content,
        .section-header
    `);

  autoAnimateElements.forEach((element) => {
    if (!element.hasAttribute("data-animation")) {
      element.setAttribute("data-animation", "fadeInUp");
    }
    observer.observe(element);
  });
}

// ========================================
// HOVER ANIMATIONS
// ========================================

function initHoverAnimations() {
  // Card hover effects
  const cards = document.querySelectorAll(
    ".skill-card, .service-card, .project-card",
  );

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
      this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.15)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
    });
  });

  // Button hover effects
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
      this.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.4)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.3)";
    });
  });

  // Social links hover effects
  const socialLinks = document.querySelectorAll(".social-link");

  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.1)";
      this.style.boxShadow = "0 8px 20px rgba(102, 126, 234, 0.3)";
    });

    link.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "none";
    });
  });

  // Skill icons hover effects
  const skillIcons = document.querySelectorAll(".skill-icon");

  skillIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", function () {
      this.style.transform = "rotate(360deg) scale(1.2)";
      this.style.color = "#764ba2";
    });

    icon.addEventListener("mouseleave", function () {
      this.style.transform = "rotate(0deg) scale(1)";
      this.style.color = "#667eea";
    });
  });
}

// ========================================
// LOADING ANIMATIONS
// ========================================

function initLoadingAnimations() {
  // Page load animation
  window.addEventListener("load", function () {
    const loader = document.querySelector(".loader");
    if (loader) {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 300);
    }

    // Animate hero section
    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
      heroContent.classList.add("animate", "fadeInUp");
    }

    // Animate navigation
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      navbar.classList.add("animate", "slideInDown");
    }
  });

  // Image load animations
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.classList.add("animate", "fadeIn");
    });
  });
}

// ========================================
// COUNTER ANIMATIONS
// ========================================

function initCounterAnimations() {
  const counters = document.querySelectorAll(".counter");

  if (counters.length === 0) return;

  const observerOptions = {
    threshold: 0.5,
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute("data-target"));
        const duration =
          parseInt(counter.getAttribute("data-duration")) || 2000;

        animateCounter(counter, target, duration);
        counterObserver.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
}

function animateCounter(element, target, duration) {
  const start = 0;
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function (easeOutQuart)
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);

    const current = Math.floor(start + (target - start) * easeOutQuart);
    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }

  requestAnimationFrame(updateCounter);
}

// ========================================
// PARALLAX EFFECTS
// ========================================

function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll(".parallax");

  if (parallaxElements.length === 0) return;

  function updateParallax() {
    const scrollTop = window.pageYOffset;

    parallaxElements.forEach((element) => {
      const speed = element.getAttribute("data-speed") || 0.5;
      const yPos = -(scrollTop * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }

  // Throttle scroll events for performance
  let ticking = false;

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener("scroll", () => {
    requestTick();
    ticking = false;
  });
}

// ========================================
// TEXT ANIMATIONS
// ========================================

function initTextAnimations() {
  // Typewriter effect
  const typewriterElements = document.querySelectorAll(".typewriter");

  typewriterElements.forEach((element) => {
    const text = element.textContent;
    const speed = parseInt(element.getAttribute("data-speed")) || 100;

    element.textContent = "";
    element.style.borderRight = "2px solid #667eea";

    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      } else {
        // Blinking cursor effect
        setInterval(() => {
          element.style.borderRight =
            element.style.borderRight === "2px solid transparent"
              ? "2px solid #667eea"
              : "2px solid transparent";
        }, 500);
      }
    }

    // Start typing when element is in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          typeWriter();
          observer.unobserve(element);
        }
      });
    });

    observer.observe(element);
  });

  // Text reveal animation
  const textRevealElements = document.querySelectorAll(".text-reveal");

  textRevealElements.forEach((element) => {
    const text = element.textContent;
    element.innerHTML = "";

    // Wrap each character in a span
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.animationDelay = `${i * 0.05}s`;
      element.appendChild(span);
    }

    // Trigger animation when in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          element.classList.add("animate");
          observer.unobserve(element);
        }
      });
    });

    observer.observe(element);
  });
}

// ========================================
// CUSTOM ANIMATIONS
// ========================================

// Floating animation for elements
function addFloatingAnimation(element) {
  let start = null;

  function animate(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;

    const y = Math.sin(elapsed * 0.002) * 10;
    element.style.transform = `translateY(${y}px)`;

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

// Pulse animation for elements
function addPulseAnimation(element) {
  let start = null;

  function animate(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;

    const scale = 1 + Math.sin(elapsed * 0.003) * 0.05;
    element.style.transform = `scale(${scale})`;

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

// Morphing background animation
function initMorphingBackground() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.zIndex = "-1";
  canvas.style.pointerEvents = "none";

  document.body.appendChild(canvas);

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Animation parameters
  const particles = [];
  const particleCount = 50;

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.3 + 0.1,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Wrap around edges
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(102, 126, 234, ${particle.opacity})`;
      ctx.fill();
    });

    // Draw connections
    particles.forEach((particle, i) => {
      particles.slice(i + 1).forEach((otherParticle) => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const opacity = ((100 - distance) / 100) * 0.1;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.strokeStyle = `rgba(102, 126, 234, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// ========================================
// ANIMATION UTILITIES
// ========================================

// Ease functions
const easeFunctions = {
  linear: (t) => t,
  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => t * (2 - t),
  easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => --t * t * t + 1,
  easeInOutCubic: (t) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInQuart: (t) => t * t * t * t,
  easeOutQuart: (t) => 1 - --t * t * t * t,
  easeInOutQuart: (t) =>
    t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
};

// Generic animation function
function animate(element, properties, duration, easing = "easeOutQuart") {
  const startTime = performance.now();
  const startValues = {};

  // Get initial values
  Object.keys(properties).forEach((prop) => {
    startValues[prop] = parseFloat(getComputedStyle(element)[prop]) || 0;
  });

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeFunctions[easing](progress);

    Object.keys(properties).forEach((prop) => {
      const start = startValues[prop];
      const end = properties[prop];
      const current = start + (end - start) * easedProgress;

      if (prop === "opacity") {
        element.style.opacity = current;
      } else if (prop === "transform") {
        element.style.transform = `translateY(${current}px)`;
      } else {
        element.style[prop] = current + "px";
      }
    });

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// ========================================
// EXPORT FUNCTIONS (for testing)
// ========================================

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initScrollAnimations,
    initHoverAnimations,
    initLoadingAnimations,
    initCounterAnimations,
    initParallaxEffects,
    initTextAnimations,
    animateCounter,
    addFloatingAnimation,
    addPulseAnimation,
    animate,
    easeFunctions,
  };
}
