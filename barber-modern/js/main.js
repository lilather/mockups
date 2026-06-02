// Modern Barber Shop Website JavaScript

document.addEventListener('DOMContentLoaded', function () {
  // Initialize loading screen
  initLoadingScreen();

  // Initialize animations
  initAnimations();

  // Initialize smooth scrolling
  initSmoothScrolling();

  // Initialize form handling
  initForms();

  // Initialize call button
  initCallButton();

  // Initialize appointment banner
  initAppointmentBanner();

  // Initialize gallery lightbox
  initGalleryLightbox();

  // Initialize mobile menu
  initMobileMenu();
});

// Loading Screen
function initLoadingScreen() {
  const loading = document.querySelector('.loading');
  if (loading) {
    setTimeout(() => {
      loading.classList.add('hidden');
      setTimeout(() => {
        loading.style.display = 'none';
      }, 500);
    }, 1500);
  }
}

// Animations
function initAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all animated elements
  const animatedElements = document.querySelectorAll(
    '.fade-in, .slide-in-left, .slide-in-right'
  );
  animatedElements.forEach((el) => observer.observe(el));

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
      } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
      }
    });
  }

  // Counter animation for stats
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((stat) => statsObserver.observe(stat));
}

// Counter Animation
function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 16);
}

// Smooth Scrolling
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
}

// Form Handling
function initForms() {
  const forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleFormSubmission(form);
    });
  });
}

function handleFormSubmission(form) {
  const formData = new FormData(form);
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  // Show loading state
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  // Simulate form submission
  setTimeout(() => {
    // Show success message
    showNotification(
      "Thank you! Your message has been sent successfully. We'll get back to you soon.",
      'success'
    );

    // Reset form
    form.reset();

    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 2000);
}

// Notification System
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#d4af37'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-weight: 600;
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Close button functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }
  }, 5000);
}

// Call Button
function initCallButton() {
  const callBtn = document.querySelector('.call-us-btn');
  if (callBtn) {
    callBtn.addEventListener('click', () => {
      // Simulate phone call
      showNotification('Calling (555) 123-4567...', 'info');

      // In a real implementation, you would use:
      // window.location.href = 'tel:+15551234567';
    });
  }
}

// Appointment Banner
function initAppointmentBanner() {
  const appointmentBtn = document.querySelector('.appointment-banner .btn');
  if (appointmentBtn) {
    appointmentBtn.addEventListener('click', () => {
      // Scroll to contact form
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  }
}

// Gallery Lightbox
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        openLightbox(img.src, img.alt);
      }
    });
  });
}

function openLightbox(src, alt) {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${src}" alt="${alt}">
            <button class="lightbox-close">&times;</button>
        </div>
    `;

  // Add styles
  lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

  const content = lightbox.querySelector('.lightbox-content');
  content.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
    `;

  const img = lightbox.querySelector('img');
  img.style.cssText = `
        width: 100%;
        height: auto;
        border-radius: 10px;
    `;

  const closeBtn = lightbox.querySelector('.lightbox-close');
  closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        padding: 0;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

  document.body.appendChild(lightbox);

  // Animate in
  setTimeout(() => {
    lightbox.style.opacity = '1';
  }, 10);

  // Close functionality
  const closeLightbox = () => {
    lightbox.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(lightbox);
    }, 300);
  };

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });
}

// Mobile Menu Toggle
function initMobileMenu() {
  const navbarCollapse = document.querySelector('.navbar-collapse');
  if (!navbarCollapse) return;

  // Bootstrap's bundle already handles opening/closing via the toggler's
  // data-bs-toggle attribute, so we must NOT toggle .show ourselves here
  // (doing both makes the menu open then immediately close again).
  // We only add the "collapse after tapping a link" convenience, using
  // Bootstrap's Collapse API so its internal state stays in sync.
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
      }
    });
  });
}

// Service Cards Hover Effect
function initServiceCards() {
  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Team Cards Hover Effect
function initTeamCards() {
  const teamCards = document.querySelectorAll('.team-card');

  teamCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Testimonial Cards Hover Effect
function initTestimonialCards() {
  const testimonialCards = document.querySelectorAll('.testimonial-card');

  testimonialCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function () {
  initServiceCards();
  initTeamCards();
  initTestimonialCards();
});

// Utility Functions
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
  // Handle scroll-based animations
  const scrolled = window.pageYOffset;
  const navbar = document.querySelector('.navbar');

  if (navbar) {
    if (scrolled > 100) {
      navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
      navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
  }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Barber-specific functions
function scheduleAppointment() {
  showNotification('Redirecting to appointment booking system...', 'info');
  // In a real implementation, this would redirect to an appointment booking system
}

function emergencyContact() {
  showNotification('Emergency contact: (555) 999-8888', 'info');
  // In a real implementation, this would initiate an emergency call
}

// Service booking functions
function bookService(serviceName) {
  showNotification(`Booking appointment for ${serviceName}...`, 'info');
  // In a real implementation, this would open a booking form for the specific service
}

// Parallax effect for hero section
function initParallax() {
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      heroSection.style.transform = `translateY(${rate}px)`;
    });
  }
}

// Initialize parallax
document.addEventListener('DOMContentLoaded', initParallax);
