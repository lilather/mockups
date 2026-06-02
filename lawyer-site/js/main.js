// Lawyer Website JavaScript

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

  // Initialize consultation banner
  initConsultationBanner();
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
        navbar.style.background = 'rgba(26, 54, 93, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
      } else {
        navbar.style.background = 'rgba(26, 54, 93, 0.95)';
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
      'Thank you! Your message has been sent successfully.',
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
        background: ${type === 'success' ? '#48bb78' : '#4299e1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
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

// Consultation Banner
function initConsultationBanner() {
  const consultationBtn = document.querySelector('.consultation-banner .btn');
  if (consultationBtn) {
    consultationBtn.addEventListener('click', () => {
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

// Mobile Menu Toggle
function initMobileMenu() {
  const navbarCollapse = document.querySelector('.navbar-collapse');
  if (!navbarCollapse) return;

  // Bootstrap's bundle already opens/closes the menu via the toggler's
  // data-bs-toggle attribute. Toggling .show ourselves too made it open
  // then immediately close again. Only add "close after tapping a link",
  // using Bootstrap's Collapse API so its internal state stays in sync.
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
      }
    });
  });
}

// Parallax Effect
function initParallax() {
  const parallaxElements = document.querySelectorAll('.parallax');

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach((element) => {
      const speed = element.getAttribute('data-speed') || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
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
      card.style.transform = 'translateY(-5px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function () {
  initMobileMenu();
  initParallax();
  initServiceCards();
  initTeamCards();
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
      navbar.style.background = 'rgba(26, 54, 93, 0.98)';
    } else {
      navbar.style.background = 'rgba(26, 54, 93, 0.95)';
    }
  }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);
