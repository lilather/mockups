// Coffee Roastery Website JavaScript

document.addEventListener('DOMContentLoaded', function () {
  // Loading Screen
  const loading = document.querySelector('.loading');
  if (loading) {
    setTimeout(() => {
      loading.classList.add('hidden');
      setTimeout(() => {
        loading.style.display = 'none';
      }, 500);
    }, 1500);
  }

  // Smooth Scrolling for Navigation Links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Get header height for proper offset
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 0;

        // Calculate target position with offset
        const targetPosition = targetSection.offsetTop - headerHeight - 20;

        // Smooth scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });

        // Update active nav link
        navLinks.forEach((navLink) => navLink.classList.remove('active'));
        this.classList.add('active');

        console.log(`Scrolling to ${targetId} at position ${targetPosition}`);
      } else {
        console.warn(`Target section ${targetId} not found`);
      }
    });
  });

  // Navbar Background on Scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(139, 69, 19, 0.98) !important';
    } else {
      navbar.style.background = 'rgba(139, 69, 19, 0.95) !important';
    }
  });

  // Intersection Observer for Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver(function (entries) {
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
  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  // Counter Animation for Stats
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-target'));
          animateCounter(entry.target, target);
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((stat) => {
    statsObserver.observe(stat);
  });

  function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 20);
  }

  // Form Submission
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      // Show loading state
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Simulate form submission
      setTimeout(() => {
        // Show success message
        showNotification(
          "Message sent successfully! We'll get back to you soon.",
          'success'
        );

        // Reset form
        this.reset();

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }

  // Newsletter Form
  const newsletterForm = document.querySelector('.footer form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = this.querySelector('input[type="email"]').value;
      if (email) {
        showNotification(
          'Thank you for subscribing to our newsletter!',
          'success'
        );
        this.reset();
      }
    });
  }

  // Notification System
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

    // Add styles
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : '#17a2b8'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
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

  // Order Now Button Functionality
  const orderNowBtn = document.querySelector('.order-now-btn');
  if (orderNowBtn) {
    orderNowBtn.addEventListener('click', function () {
      // Scroll to products section or redirect to menu
      const productsSection = document.querySelector('#products');
      if (productsSection) {
        productsSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      } else {
        window.location.href = 'menu.html';
      }
    });
  }

  // Product Card Interactions
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach((card) => {
    const addToCartBtn = card.querySelector('.btn-primary');
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const productName = card.querySelector('.product-name').textContent;
        showNotification(`${productName} added to cart!`, 'success');
      });
    }
  });

  // Mobile Menu Toggle Enhancement
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  if (navbarToggler && navbarCollapse) {
    // Close mobile menu when clicking on a link
    const mobileNavLinks = navbarCollapse.querySelectorAll('.nav-link');
    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 992) {
          navbarCollapse.classList.remove('show');
        }
      });
    });
  }

  // Parallax Effect for Hero Section
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    window.addEventListener('scroll', function () {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      heroSection.style.transform = `translateY(${rate}px)`;
    });
  }

  // Coffee Card Hover Effects
  const coffeeCards = document.querySelectorAll('.coffee-card');
  coffeeCards.forEach((card) => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-15px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Lazy Loading for Images (if needed)
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // Initialize tooltips if Bootstrap is available
  if (typeof bootstrap !== 'undefined') {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  // Category Filtering Functionality
  const categoryItems = document.querySelectorAll('.category-item');
  const menuSections = document.querySelectorAll(
    '.products-section[data-category]'
  );

  // Set default active category
  let activeCategory = 'hot-coffee';

  // Function to filter menu sections by category
  function filterMenu(category) {
    // Update active category
    activeCategory = category;

    // Show/hide menu sections based on category
    menuSections.forEach((section) => {
      const sectionCategory = section.getAttribute('data-category');
      if (sectionCategory === category) {
        section.style.display = 'block';
        // Use a gentler animation
        setTimeout(() => {
          section.style.opacity = '1';
          section.style.transform = 'translateY(0)';
        }, 50);
      } else {
        section.style.display = 'none';
        section.style.opacity = '0';
        section.style.transform = 'translateY(10px)';
      }
    });

    // Update active category styling
    categoryItems.forEach((item) => {
      const itemCategory = item.getAttribute('data-category');
      if (itemCategory === category) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Smooth scroll to the active menu section with offset
    const activeSection = document.querySelector(
      `[data-category="${category}"]`
    );
    if (activeSection) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = activeSection.offsetTop - headerHeight - 50;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  }

  // Add click event listeners to category items
  categoryItems.forEach((item) => {
    // Click event for filtering
    item.addEventListener('click', function (e) {
      e.preventDefault();
      const category = this.getAttribute('data-category');
      filterMenu(category);
    });
  });

  // Initialize with hot coffee category (commented out to prevent auto-scroll)
  // filterMenu('hot-coffee');

  // Jump to Top Button Functionality
  const jumpToTopBtn = document.getElementById('jumpToTop');

  // Show/hide button based on scroll position
  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 300) {
      jumpToTopBtn.classList.add('show');
    } else {
      jumpToTopBtn.classList.remove('show');
    }
  });

  // Smooth scroll to top when button is clicked
  jumpToTopBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  console.log('Bean & Brew Coffee Roastery website loaded successfully!');
});
