// Mobile navigation toggle logic
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
  });
}

// Destination search and filter functionality
const destinationSearch = document.getElementById('destination-search');
const destinationGrid = document.getElementById('destination-grid');
if (destinationSearch && destinationGrid) {
  destinationSearch.addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase().trim();
    const items = destinationGrid.querySelectorAll('.destination-item');
    items.forEach((item) => {
      const keywords = item.dataset.keywords.toLowerCase();
      const title = item.querySelector('h2').textContent.toLowerCase();
      const matches = title.includes(query) || keywords.includes(query);
      item.style.display = matches ? 'block' : 'none';
    });
  });
}

// Gallery slider behavior with manual controls and automatic rotation
const slides = document.querySelectorAll('.gallery-slider .slide');
const sliderButtons = document.querySelectorAll('.slider-button');
let activeSlide = 0;

function showSlide(index) {
  slides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === index);
  });
}

function nextSlide() {
  activeSlide = (activeSlide + 1) % slides.length;
  showSlide(activeSlide);
}

function prevSlide() {
  activeSlide = (activeSlide - 1 + slides.length) % slides.length;
  showSlide(activeSlide);
}

if (sliderButtons.length) {
  sliderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (button.dataset.action === 'next') {
        nextSlide();
      } else {
        prevSlide();
      }
    });
  });
  setInterval(nextSlide, 6500);
}

// Contact form validation and success feedback
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');

    let valid = true;

    function showError(input, message) {
      const errorElement = document.getElementById(`${input.id}-error`);
      errorElement.textContent = message;
      input.classList.add('invalid');
      valid = false;
    }

    function clearError(input) {
      const errorElement = document.getElementById(`${input.id}-error`);
      errorElement.textContent = '';
      input.classList.remove('invalid');
    }

    clearError(nameInput);
    clearError(emailInput);
    clearError(phoneInput);
    clearError(messageInput);

    if (!nameInput.value.trim()) {
      showError(nameInput, 'Please enter your name.');
    }

    if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
      showError(emailInput, 'Please enter a valid email address.');
    }

    if (!phoneInput.value.trim()) {
      showError(phoneInput, 'Please enter your phone number.');
    }

    if (!messageInput.value.trim()) {
      showError(messageInput, 'Please enter a message.');
    }

    if (valid) {
      formStatus.textContent = 'Thank you! Your message has been submitted successfully.';
      formStatus.style.color = 'var(--primary)';
      contactForm.reset();
    } else {
      formStatus.textContent = 'Please fix the highlighted errors and try again.';
      formStatus.style.color = '#dc2626';
    }
  });
}
