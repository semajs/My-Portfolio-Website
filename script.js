/* =============== SHOW/HIDE LOADER =============== */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  loader.classList.add('hidden');
});

/* =============== SCROLL PROGRESS INDICATOR =============== */
window.addEventListener('scroll', () => {
  const scrollProgress = document.getElementById('scrollProgress');
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercentage = (scrollTop / scrollHeight) * 100;
  scrollProgress.style.width = scrollPercentage + '%';
});

/* =============== HEADER SCROLL SHADOW =============== */
const scrollHeader = () => {
  const header = document.getElementById('header');
  window.scrollY >= 50 ? header.classList.add('scroll-header') 
                       : header.classList.remove('scroll-header');
};
window.addEventListener('scroll', scrollHeader);

/* =============== MOBILE MENU =============== */
const navMenu = document.getElementById('navMenu');
const navToggle = document.getElementById('navToggle');
const navClose = document.getElementById('navClose');

// Show menu
if(navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

// Hide menu
if(navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

// Remove menu on mobile when clicking nav links
const navLinks = document.querySelectorAll('.nav__link');

const linkAction = () => {
  navMenu.classList.remove('show-menu');
};

navLinks.forEach(link => link.addEventListener('click', linkAction));

/* =============== ACTIVE LINK ON SCROLL =============== */
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute('id');
    const sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionsClass.classList.add('active-link');
    } else {
      sectionsClass.classList.remove('active-link');
    }
  });
};

window.addEventListener('scroll', scrollActive);

/* =============== SMOOTH SCROLLING =============== */
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if(targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

/* =============== THEME TOGGLE (DARK/LIGHT MODE) =============== */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Get theme from storage or default to light
const getCurrentTheme = () => document.documentElement.getAttribute('data-theme') || 'light';
const getCurrentIcon = () => themeIcon.classList.contains('fa-moon') ? 'fa-moon' : 'fa-sun';

// Set theme on page load
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

if (selectedTheme) {
  document.documentElement.setAttribute('data-theme', selectedTheme);
  themeIcon.classList.remove('fa-moon', 'fa-sun');
  themeIcon.classList.add(selectedIcon);
}

// Theme toggle click event
themeToggle.addEventListener('click', () => {
  const currentTheme = getCurrentTheme();
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  const newIcon = currentTheme === 'dark' ? 'fa-moon' : 'fa-sun';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  themeIcon.classList.remove('fa-moon', 'fa-sun');
  themeIcon.classList.add(newIcon);
  
  localStorage.setItem('selected-theme', newTheme);
  localStorage.setItem('selected-icon', newIcon);
});

/* =============== TYPING ANIMATION =============== */
const typingText = document.getElementById('typingText');
const textArray = ['A Junior Web Developer', 'Web Designer', 'Problem Solver', 'Creative Thinker'];
let textArrayIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 200;

const typeText = () => {
  const currentText = textArray[textArrayIndex];
  
  if (isDeleting) {
    typingText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingDelay = 100;
  } else {
    typingText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingDelay = 200;
  }
  
  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    typingDelay = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textArrayIndex++;
    if (textArrayIndex === textArray.length) {
      textArrayIndex = 0;
    }
    typingDelay = 500;
  }
  
  setTimeout(typeText, typingDelay);
};

// Start typing animation
setTimeout(typeText, 1000);

/* =============== SCROLL ANIMATIONS (INTERSECTION OBSERVER) =============== */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      
      // Animate skill bars when skills section is visible
      if (entry.target.classList.contains('skills')) {
        animateSkillBars();
      }
      
      // Animate counters in about section
      if (entry.target.classList.contains('about')) {
        animateCounters();
      }
    }
  });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
  observer.observe(section);
});

/* =============== ANIMATE SKILL BARS =============== */
let skillsAnimated = false;

const animateSkillBars = () => {
  if (skillsAnimated) return;
  
  const skillBars = document.querySelectorAll('.skills__percentage');
  
  skillBars.forEach(bar => {
    const percentage = bar.getAttribute('data-percentage');
    bar.style.width = percentage + '%';
  });
  
  skillsAnimated = true;
};

/* =============== ANIMATE COUNTERS =============== */
let countersAnimated = false;

const animateCounters = () => {
  if (countersAnimated) return;
  
  const counters = document.querySelectorAll('.about__box');
  
  counters.forEach((counter, index) => {
    const subtitle = counter.querySelector('.about__subtitle');
    const text = subtitle.textContent;
    const number = parseInt(text.match(/\d+/)?.[0] || 0);
    
    if (number > 0) {
      let current = 0;
      const increment = number / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
          current = number;
          clearInterval(timer);
        }
        subtitle.textContent = text.replace(/\d+/, Math.floor(current));
      }, 30);
    }
  });
  
  countersAnimated = true;
};

/* =============== PROJECT FILTERING =============== */
const filterButtons = document.querySelectorAll('.projects__filter-btn');
const projectCards = document.querySelectorAll('.project__card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    // Filter projects with animation
    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      
      if (filter === 'all' || category === filter) {
        card.style.animation = 'fadeInUp 0.6s ease-out';
        card.classList.remove('hide');
      } else {
        card.classList.add('hide');
      }
    });
  });
});

/* =============== CONTACT FORM VALIDATION =============== */
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const contactMessage = document.getElementById('contactMessage');

// Validation functions
const validateName = (name) => {
  return name.trim().length >= 2;
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateMessage = (message) => {
  return message.trim().length >= 10;
};

// Show error message
const showError = (input, message) => {
  const errorElement = document.getElementById(input.id + 'Error');
  errorElement.textContent = message;
  input.classList.add('error');
};

// Clear error message
const clearError = (input) => {
  const errorElement = document.getElementById(input.id + 'Error');
  errorElement.textContent = '';
  input.classList.remove('error');
};

// Real-time validation
nameInput.addEventListener('input', () => {
  if (nameInput.value.length > 0) {
    if (validateName(nameInput.value)) {
      clearError(nameInput);
    } else {
      showError(nameInput, 'Name must be at least 2 characters');
    }
  } else {
    clearError(nameInput);
  }
});

emailInput.addEventListener('input', () => {
  if (emailInput.value.length > 0) {
    if (validateEmail(emailInput.value)) {
      clearError(emailInput);
    } else {
      showError(emailInput, 'Please enter a valid email address');
    }
  } else {
    clearError(emailInput);
  }
});

messageInput.addEventListener('input', () => {
  if (messageInput.value.length > 0) {
    if (validateMessage(messageInput.value)) {
      clearError(messageInput);
    } else {
      showError(messageInput, 'Message must be at least 10 characters');
    }
  } else {
    clearError(messageInput);
  }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Clear previous messages
  contactMessage.className = 'contact__message';
  contactMessage.style.display = 'none';
  
  // Validate all fields
  let isValid = true;
  
  if (!validateName(nameInput.value)) {
    showError(nameInput, 'Please enter your name (at least 2 characters)');
    isValid = false;
  }
  
  if (!validateEmail(emailInput.value)) {
    showError(emailInput, 'Please enter a valid email address');
    isValid = false;
  }
  
  if (!validateMessage(messageInput.value)) {
    showError(messageInput, 'Please enter a message (at least 10 characters)');
    isValid = false;
  }
  
  if (isValid) {
    // Simulate form submission (replace with actual API call)
    const formData = {
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value
    };
    
    console.log('Form submitted:', formData);
    
    // Show success message
    contactMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
    contactMessage.classList.add('success');
    contactMessage.style.display = 'block';
    
    // Reset form
    contactForm.reset();
    clearError(nameInput);
    clearError(emailInput);
    clearError(messageInput);
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      contactMessage.style.display = 'none';
    }, 5000);
    
    /* 
    // Uncomment this section for actual form submission
    fetch('your-form-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      contactMessage.textContent = 'Message sent successfully!';
      contactMessage.classList.add('success');
      contactMessage.style.display = 'block';
      contactForm.reset();
    })
    .catch(error => {
      contactMessage.textContent = 'Error sending message. Please try again.';
      contactMessage.classList.add('error');
      contactMessage.style.display = 'block';
    });
    */
  }
});

/* =============== BACK TO TOP BUTTON =============== */
// Create back to top button
const backToTopButton = document.createElement('button');
backToTopButton.className = 'back-to-top';
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTopButton);

// Show/hide back to top button
const toggleBackToTop = () => {
  if (window.scrollY > 400) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
};

window.addEventListener('scroll', toggleBackToTop);

// Scroll to top on click
backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

/* =============== PARALLAX EFFECT =============== */
const homeImage = document.querySelector('.home__image');

window.addEventListener('scroll', () => {
  const scrollPosition = window.pageYOffset;
  if (homeImage && scrollPosition < window.innerHeight) {
    homeImage.style.transform = `translateY(${scrollPosition * 0.3}px)`;
  }
});

/* =============== PREVENT RIGHT CLICK ON IMAGES (OPTIONAL) =============== */
/*
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
});
*/

/* =============== DOWNLOAD RESUME FUNCTIONALITY =============== */
const downloadButtons = document.querySelectorAll('a[download]');

downloadButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    // Add custom download logic here if needed
    console.log('Resume download initiated');
    
    // You can track downloads with analytics
    /*
    if (typeof gtag !== 'undefined') {
      gtag('event', 'download', {
        'event_category': 'Resume',
        'event_label': 'Resume Download'
      });
    }
    */
  });
});

/* =============== CURSOR ANIMATION (OPTIONAL - ADVANCED) =============== */
/*
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.className = 'cursor-follower';
document.body.appendChild(cursorFollower);

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

const animateFollower = () => {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
};

animateFollower();
*/

/* =============== LAZY LOADING IMAGES =============== */
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      imageObserver.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));

/* =============== KEYBOARD ACCESSIBILITY =============== */
// Allow keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) {
    navMenu.classList.remove('show-menu');
  }
});

// Focus trap for mobile menu
const focusableElements = navMenu.querySelectorAll('a, button');
const firstFocusable = focusableElements[0];
const lastFocusable = focusableElements[focusableElements.length - 1];

navMenu.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  }
});

/* =============== PERFORMANCE OPTIMIZATION =============== */
// Debounce function for scroll events
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Apply debounce to scroll-heavy functions
const debouncedScrollActive = debounce(scrollActive, 50);
const debouncedScrollHeader = debounce(scrollHeader, 50);

window.addEventListener('scroll', debouncedScrollActive);
window.addEventListener('scroll', debouncedScrollHeader);

/* =============== CONSOLE MESSAGE =============== */
console.log('%c👋 Welcome to my Portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cLooking for developers? Let\'s connect!', 'color: #8b5cf6; font-size: 14px;');
console.log('%cEmail: your.email@example.com', 'color: #06b6d4; font-size: 12px;');

/* =============== SERVICE WORKER (FOR PWA - OPTIONAL) =============== */
/*
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registered:', registration);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed:', error);
      });
  });
}
*/

/* =============== INITIALIZE =============== */
document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio website loaded successfully!');
  
  // Add any initialization code here
  
  // Example: Set focus to first input on contact form when section is visible
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    const contactObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Optional: Auto-focus first input (may not be desired for UX)
          // nameInput.focus();
        }
      });
    }, { threshold: 0.5 });
    
    contactObserver.observe(contactSection);
  }
});