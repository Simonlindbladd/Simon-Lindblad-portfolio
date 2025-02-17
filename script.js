document.addEventListener('DOMContentLoaded', () => {
  // 1. Hamburger Menu Toggle with Slide Down/Up Effect and Disable Scrolling
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const menuOverlay = document.querySelector('.menu-overlay');
  const navLinks = document.querySelectorAll('.overlay-navbar a');

  hamburgerMenu.addEventListener('click', () => {
    if (!menuOverlay.classList.contains('active')) {
      // Open the menu:
      menuOverlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
      // Force reflow so the browser registers the display change
      void menuOverlay.offsetHeight;
      menuOverlay.classList.add('active');
    } else {
      // Close the menu:
      menuOverlay.classList.remove('active');
      menuOverlay.addEventListener('transitionend', function handler() {
        if (!menuOverlay.classList.contains('active')) {
          menuOverlay.style.display = 'none';
          document.body.style.overflow = '';
        }
        menuOverlay.removeEventListener('transitionend', handler);
      });
    }
    hamburgerMenu.classList.toggle('active');
  });

  // Smooth Scrolling for Navigation Links and Re-enable Scrolling When Menu Closes
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default jump behavior
      const targetId = link.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
      // Close the menu:
      menuOverlay.classList.remove('active');
      hamburgerMenu.classList.remove('active');
      menuOverlay.style.display = 'none';
      document.body.style.overflow = ''; // Re-enable scrolling
    });
  });

  // 2. Scroll Progress Bar
  const progressBar = document.createElement('div');
  progressBar.id = 'progress-bar';
  progressBar.style.position = 'fixed';
  progressBar.style.top = '0';
  progressBar.style.left = '0';
  progressBar.style.height = '4px';
  progressBar.style.backgroundColor = '#3498db';
  progressBar.style.zIndex = '9999';
  progressBar.style.transition = 'width 0.1s ease-out';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });


  function typewriter(element, delay = 300) { 
    const text = element.textContent;
    element.textContent = "";
    let index = 0;
    const interval = setInterval(() => {
      element.textContent += text[index];
      index++;
      if (index === text.length) {
        clearInterval(interval);
        const blinkingDot = document.createElement('span');
        blinkingDot.textContent = '.';
        blinkingDot.classList.add('blinking-dot');
        element.appendChild(blinkingDot);
      }
    }, delay);
  }

  const homeHeading = document.querySelector('.home-content h3');
  if (homeHeading) {
    typewriter(homeHeading, 200); // Call with 200ms delay for a slower effect
  }

  // 4. Intersection Observer for Fade-In from Bottom on Sections
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observerInstance.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all section elements for the fade-in effect
  document.querySelectorAll('section').forEach(el => {
    observer.observe(el);
  });

  // 5. Parallax Effect for Elements with Class "parallax"
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    document.querySelectorAll('.parallax').forEach(el => {
      el.style.transform = `translateY(${scrollPosition * 0.2}px)`;
    });
  });
});
