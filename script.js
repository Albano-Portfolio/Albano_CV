/* ================================================================
   JASON L. ALBANO — SENIOR AI-ENABLED HEALTHCARE DATA ANALYST
   script.js — Main JavaScript
   
   SECTIONS:
   1. Theme Toggle (Dark / Light)
   2. Navigation (Sticky + Hamburger Menu + Active Links)
   3. Typewriter Effect (Hero subtitle rotation)
   4. Hero Canvas (Floating particle dots)
   5. Scroll Reveal Animations
   6. Back to Top Button
   7. Contact Form Handler
   8. Timeline Animation (Draw-in effect)
   9. Skill Tag Stagger Animation
   ================================================================ */

/* ================================================================
   HELPER: Wait for DOM to be ready
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {

  // ================================================================
  // 1. THEME TOGGLE
  // ================================================================
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Check for saved preference, default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  if (savedTheme === 'light') {
    html.setAttribute('data-theme', 'light');
  }

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  });


  // ================================================================
  // 2. NAVIGATION
  // ================================================================
  const navbar   = document.getElementById('navbar');
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  // Sticky navbar on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);
  });

  // Close mobile menu when a link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    });
  });

  // Active nav link on scroll (highlight current section)
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();


  // ================================================================
  // 3. TYPEWRITER EFFECT
  //    Cycles through an array of role descriptors in the hero.
  //    CUSTOMIZE: Edit the 'phrases' array to change what rotates.
  // ================================================================
  const typewriterEl = document.getElementById('typewriterText');

  const phrases = [
    'Senior Healthcare Data Analyst',
    'AI-Enabled Analytics Expert',
    'Databricks & SQL Specialist',
    'Power BI & Tableau Developer',
    'Healthcare Claims Analyst',
    'Cost Containment Strategist',
    'Business Intelligence Leader',
    'Healthcare AI Practitioner',
  ];

  let phraseIndex  = 0;
  let charIndex    = 0;
  let isDeleting   = false;
  let typeDelay    = 80;  // ms per character typed
  let deleteDelay  = 40;  // ms per character deleted
  let pauseDelay   = 2000; // ms to pause at full phrase

  function typewriter() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      // Remove one character
      typewriterEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typeDelay = deleteDelay;
    } else {
      // Add one character
      typewriterEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typeDelay = 80;
    }

    if (!isDeleting && charIndex === current.length) {
      // Pause at end of phrase, then start deleting
      typeDelay = pauseDelay;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Move to next phrase
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeDelay = 400; // brief pause before typing next
    }

    setTimeout(typewriter, typeDelay);
  }

  // Start typewriter after 1 second
  setTimeout(typewriter, 1000);


  // ================================================================
  // 4. HERO CANVAS — FLOATING PARTICLES
  //    Creates animated data-point particles in the hero background.
  // ================================================================
  const canvas = document.getElementById('heroCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrame;

    function resizeCanvas() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function randomBetween(min, max) {
      return Math.random() * (max - min) + min;
    }

    // Particle constructor
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x     = randomBetween(0, canvas.width);
        this.y     = randomBetween(0, canvas.height);
        this.size  = randomBetween(1, 3);
        this.speedX = randomBetween(-0.3, 0.3);
        this.speedY = randomBetween(-0.5, -0.1);
        this.opacity = randomBetween(0.1, 0.5);
        this.fadeSpeed = randomBetween(0.003, 0.008);
        this.color = Math.random() > 0.6 ? '#00D4FF' : (Math.random() > 0.5 ? '#00B8A0' : '#F5A623');
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= this.fadeSpeed;

        if (this.opacity <= 0 || this.y < -10) {
          this.reset();
          this.y = canvas.height + 10;
          this.opacity = randomBetween(0.1, 0.5);
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Create initial particle pool
    function initParticles() {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 12000);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrame = requestAnimationFrame(animateParticles);
    }

    // Draw connecting lines between nearby particles
    function drawConnections() {
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx   = p1.x - p2.x;
          const dy   = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.save();
            ctx.globalAlpha = (1 - dist / 100) * 0.08;
            ctx.strokeStyle = '#00D4FF';
            ctx.lineWidth   = 0.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawConnections();
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrame = requestAnimationFrame(animate);
    }

    // Init on load and resize
    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', () => {
      cancelAnimationFrame(animationFrame);
      resizeCanvas();
      initParticles();
      animate();
    });
  }


  // ================================================================
  // 5. SCROLL REVEAL ANIMATIONS
  //    Uses IntersectionObserver to trigger CSS class 'revealed'
  //    when elements scroll into view.
  // ================================================================
  const revealEls = document.querySelectorAll(
    '.reveal-up, .reveal-left, .reveal-right'
  );

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Optional: stop observing after first reveal
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers — just show everything
    revealEls.forEach(el => el.classList.add('revealed'));
  }


  // ================================================================
  // 6. BACK TO TOP BUTTON
  // ================================================================
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  // ================================================================
  // 7. CONTACT FORM — MAILTO HANDLER
  //    No backend, no signup, no setup required.
  //    Clicking "Send Message" opens the visitor's email client
  //    with To, Subject, and Body pre-filled from the form.
  // ================================================================
  const contactForm = document.getElementById('contactForm');
  const submitBtn   = document.getElementById('submitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = document.getElementById('contactName').value.trim();
      const email   = document.getElementById('contactEmail').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !email || !message) {
        alert('Please fill in all fields before sending.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      // Build the mailto link — opens visitor's email app pre-filled
      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body    = encodeURIComponent(
        `Hi Jason,\n\nMy name is ${name} and my email is ${email}.\n\n${message}\n\nBest regards,\n${name}`
      );
      const mailtoURL = `mailto:Japi782004@yahoo.com?subject=${subject}&body=${body}`;

      window.location.href = mailtoURL;

      // Visual confirmation
      submitBtn.textContent = '✓ Opening your email app…';
      submitBtn.style.background = 'var(--teal)';
      setTimeout(() => {
        submitBtn.textContent = 'Send Message';
        submitBtn.style.background = '';
        contactForm.reset();
      }, 3000);
    });
  }

  // ================================================================
  // 7b. RESUME DOWNLOAD — GRACEFUL FALLBACK
  //     If the PDF file isn't in the repo yet, show a helpful note
  //     instead of a broken download. Works silently when PDF exists.
  // ================================================================
  const resumeBtn  = document.getElementById('resumeDownloadBtn');
  const resumeNote = document.getElementById('resumeNote');

  if (resumeBtn && resumeNote) {
    resumeBtn.addEventListener('click', async (e) => {
      // Try a HEAD request to see if the PDF actually exists
      try {
        const res = await fetch('Jason_Albano_Resume.pdf', { method: 'HEAD' });
        if (!res.ok) {
          // File not found — suppress download and show note
          e.preventDefault();
          resumeNote.style.display = 'block';
        }
        // If ok, the browser handles the download normally
      } catch {
        // Network error or file missing
        e.preventDefault();
        resumeNote.style.display = 'block';
      }
    });
  }


  // ================================================================
  // 8. TIMELINE ANIMATION
  //    Staggers timeline item reveals for a draw-in effect.
  // ================================================================
  const timelineItems = document.querySelectorAll('.timeline-item');

  if ('IntersectionObserver' in window && timelineItems.length > 0) {
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add a small delay based on position in view
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, 100);
          timelineObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    timelineItems.forEach(item => timelineObserver.observe(item));
  }


  // ================================================================
  // 9. SKILL TAGS — STAGGERED POP-IN ANIMATION
  //    When skill categories enter view, animate tags one by one.
  // ================================================================
  const skillCategories = document.querySelectorAll('.skill-category');

  if ('IntersectionObserver' in window && skillCategories.length > 0) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const tags = entry.target.querySelectorAll('.skill-tag');
          tags.forEach((tag, i) => {
            tag.style.animationDelay = `${i * 0.06}s`;
            tag.classList.add('tag-pop');
          });
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    skillCategories.forEach(cat => skillObserver.observe(cat));
  }

  // Inject the tag-pop keyframe dynamically
  const tagStyle = document.createElement('style');
  tagStyle.textContent = `
    @keyframes tagPop {
      0%   { opacity: 0; transform: scale(0.85) translateY(6px); }
      60%  { transform: scale(1.05) translateY(-1px); }
      100% { opacity: 1; transform: scale(1) translateY(0); }
    }
    .tag-pop {
      animation: tagPop 0.4s ease forwards;
      opacity: 0;
    }
  `;
  document.head.appendChild(tagStyle);


  // ================================================================
  // 10. SMOOTH ANCHOR SCROLLING
  //     Adds offset for fixed navbar when clicking anchor links.
  // ================================================================
  const NAVBAR_HEIGHT = 80; // px — adjust if nav height changes

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });


  // ================================================================
  // 11. KEYBOARD NAVIGATION — Trap focus in mobile menu when open
  // ================================================================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      hamburger.focus();
    }
  });


  // ================================================================
  // 12. TOOL ITEM TOOLTIPS
  //     Shows data-tip attribute as a simple tooltip on hover.
  // ================================================================
  const toolItems = document.querySelectorAll('.tool-item[data-tip]');

  // Create a single reusable tooltip element
  const tooltip = document.createElement('div');
  tooltip.id = 'toolTip';
  tooltip.setAttribute('role', 'tooltip');
  tooltip.style.cssText = `
    position: fixed;
    background: rgba(13, 22, 36, 0.95);
    border: 1px solid rgba(0, 212, 255, 0.2);
    color: #E8EDF5;
    padding: 0.3rem 0.75rem;
    border-radius: 6px;
    font-size: 0.75rem;
    font-family: 'DM Sans', sans-serif;
    pointer-events: none;
    z-index: 9000;
    opacity: 0;
    transition: opacity 0.2s ease;
    white-space: nowrap;
    backdrop-filter: blur(8px);
  `;
  document.body.appendChild(tooltip);

  toolItems.forEach(item => {
    item.addEventListener('mouseenter', (e) => {
      tooltip.textContent = item.getAttribute('data-tip');
      tooltip.style.opacity = '1';
    });

    item.addEventListener('mousemove', (e) => {
      tooltip.style.left = (e.clientX + 14) + 'px';
      tooltip.style.top  = (e.clientY - 28) + 'px';
    });

    item.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
    });
  });


  // ================================================================
  // 13. PROFESSIONAL DEVELOPMENT SCROLL — drag to scroll on desktop
  // ================================================================
  const pdWrap = document.querySelector('.pd-scroll-wrap');
  if (pdWrap) {
    let isDragging = false;
    let startX;
    let scrollLeft;

    pdWrap.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX - pdWrap.offsetLeft;
      scrollLeft = pdWrap.scrollLeft;
      pdWrap.style.cursor = 'grabbing';
    });

    pdWrap.addEventListener('mouseleave', () => {
      isDragging = false;
      pdWrap.style.cursor = '';
    });

    pdWrap.addEventListener('mouseup', () => {
      isDragging = false;
      pdWrap.style.cursor = '';
    });

    pdWrap.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x    = e.pageX - pdWrap.offsetLeft;
      const walk = (x - startX) * 1.5;
      pdWrap.scrollLeft = scrollLeft - walk;
    });
  }

  // ================================================================
  // INIT COMPLETE
  // ================================================================
  console.log(
    '%c Jason L. Albano Portfolio',
    'color: #00D4FF; font-family: monospace; font-size: 14px; font-weight: bold;'
  );
  console.log(
    '%c Senior AI-Enabled Healthcare Data Analyst | Nashville, TN',
    'color: #7A8BA8; font-family: monospace; font-size: 11px;'
  );

}); // End DOMContentLoaded
