// script.js — complete logic with Gmail compose integration
document.addEventListener('DOMContentLoaded', () => {
  // --- footer year ---
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- smooth scroll for internal anchors ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        // Smooth scroll
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // If mobile nav is open, close it after clicking a link
        const nav = document.querySelector('.nav');
        const menuBtn = document.querySelector('.menu-btn');
        if (nav && nav.classList.contains('open')) {
          nav.classList.remove('open');
          nav.style.display = '';
          if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // --- mobile menu toggle ---
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      nav.style.display = isOpen ? 'flex' : '';
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    // Keep menu state consistent on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 880) {
        nav.style.display = '';
        nav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      } else if (nav.classList.contains('open')) {
        nav.style.display = 'flex';
      }
    });
  }

  // --- contact form / Gmail compose handler ---
  const recipient = 'jrjaswanthraj@gmail.com';
  const sendBtn = document.getElementById('sendBtn');
  const clearBtn = document.getElementById('clearBtn');
  const nameInput = document.getElementById('name');
  const messageInput = document.getElementById('message');

  if (sendBtn && nameInput && messageInput) {
    sendBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = nameInput.value.trim();
      const msg = messageInput.value.trim();

      if (!name || !msg) {
        alert('Please enter your name and a short message before sending.');
        return;
      }

      const subject = `Portfolio contact from ${name}`;
      const body = `Name: ${name}\n\nMessage:\n${msg}\n`;

      // Open Gmail compose with pre-filled subject and body
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(gmailUrl, '_blank'); // opens in a new tab
    });
  }

  if (clearBtn && nameInput && messageInput) {
    clearBtn.addEventListener('click', () => {
      nameInput.value = '';
      messageInput.value = '';
      nameInput.focus();
    });
  }
});
