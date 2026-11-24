import './style.css';
import { projects, projectCategories, portfolioTabs } from './data/projects.js';
import { certificates } from './data/certificates.js';
import { techStackGroups } from './data/techstacks.js';

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Dark Mode & Light Mode System
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');

  function getInitialTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem('theme', theme);
    updateThemeIcons(theme);

    // Update meta theme-color for browser chrome
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'light' ? '#f8fafc' : '#070a11');
    }
  }

  function updateThemeIcons(theme) {
    const isLight = theme === 'light';
    const label = isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode';

    [themeToggleBtn, themeToggleMobileBtn].forEach(btn => {
      if (!btn) return;
      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);
      const sunIcon = btn.querySelector('.theme-icon-sun');
      const moonIcon = btn.querySelector('.theme-icon-moon');
      if (sunIcon && moonIcon) {
        if (isLight) {
          sunIcon.classList.add('hidden');
          moonIcon.classList.remove('hidden');
        } else {
          sunIcon.classList.remove('hidden');
          moonIcon.classList.add('hidden');
        }
      }
    });
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  }

  // Initialize theme
  applyTheme(getInitialTheme());

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (themeToggleMobileBtn) themeToggleMobileBtn.addEventListener('click', toggleTheme);

  // Fallback listener for system changes (if not manually overridden)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });


  // ==========================================
  // 2. Mobile Drawer Navigation
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileDrawerBackdrop = document.getElementById('mobile-drawer-backdrop');
  const mobileDrawerClose = document.getElementById('mobile-drawer-close');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const setMobileDrawer = (isOpen) => {
    if (!mobileDrawer) return;
    if (isOpen) {
      mobileDrawer.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      setTimeout(() => mobileDrawer.classList.add('is-open'), 10);
    } else {
      mobileDrawer.classList.remove('is-open');
      document.body.style.overflow = '';
      setTimeout(() => mobileDrawer.classList.add('hidden'), 250);
    }
    if (menuIcon && closeIcon) {
      menuIcon.classList.toggle('hidden', isOpen);
      closeIcon.classList.toggle('hidden', !isOpen);
    }
    if (mobileMenuBtn) {
      mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    }
  };

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = !mobileDrawer.classList.contains('hidden');
      setMobileDrawer(!isOpen);
    });
  }

  if (mobileDrawerClose) {
    mobileDrawerClose.addEventListener('click', () => setMobileDrawer(false));
  }

  if (mobileDrawerBackdrop) {
    mobileDrawerBackdrop.addEventListener('click', () => setMobileDrawer(false));
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => setMobileDrawer(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && !mobileDrawer.classList.contains('hidden')) {
      setMobileDrawer(false);
    }
  });


  // ==========================================
  // 3. Header Scroll Effects & Scrollspy
  // ==========================================
  const header = document.getElementById('main-header');
  const capsuleNav = document.getElementById('capsule-nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      if (capsuleNav) capsuleNav.classList.add('nav-scrolled');
      if (currentScroll > lastScroll && currentScroll > 280) {
        if (header) header.style.transform = 'translateY(-120%)';
      } else {
        if (header) header.style.transform = 'translateY(0)';
      }
    } else {
      if (capsuleNav) capsuleNav.classList.remove('nav-scrolled');
      if (header) header.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
  });

  // Active Navigation Scrollspy
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('#capsule-nav nav a[href^="#"]');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    desktopNavLinks.forEach(link => {
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('nav-link-active');
      } else {
        link.classList.remove('nav-link-active');
      }
    });
  });

  // Dynamic Year in Footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Back to Top Button
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('is-visible', window.scrollY > 500);
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // ==========================================
  // 4. Hero Dynamic Typing Effect
  // ==========================================
  const typedTextEl = document.getElementById('typed-text');
  if (typedTextEl) {
    const phrases = [
      'Scalable Backend Systems',
      'High-Performance Web Apps',
      'Clean Modular Code',
      'Thoughtful UI/UX Products'
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function typeEffect() {
      const current = phrases[phraseIdx];
      if (isDeleting) {
        typedTextEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;
      } else {
        typedTextEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
      }

      let speed = isDeleting ? 40 : 85;

      if (!isDeleting && charIdx === current.length) {
        speed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        speed = 400;
      }

      setTimeout(typeEffect, speed);
    }

    typeEffect();
  }


  // ==========================================
  // 5. Animated Number Counters
  // ==========================================
  const counters = document.querySelectorAll('.counter');
  function animateCounters() {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10) || 100;
      const duration = 1500;
      const step = Math.ceil(target / (duration / 25));
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target + '%';
          clearInterval(timer);
        } else {
          counter.textContent = current + '%';
        }
      }, 25);
    });
  }

  const aboutSection = document.getElementById('about');
  let countersAnimated = false;
  if (aboutSection && counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          animateCounters();
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    counterObserver.observe(aboutSection);
  }


  // ==========================================
  // 6. SVG Tech Icon Helper
  // ==========================================
  function getTechIconSvg(id) {
    switch (id) {
      case 'golang':
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`;
      case 'typescript':
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="4"/><path d="M7 8h6m-3 0v8"/><path d="M14 15.5c.5.5 1.5 1 2.5 1s1.5-.5 1.5-1.2c0-1.8-4-1.2-4-3.2 0-.8.7-1.6 2-1.6 1 0 1.8.4 2.3.8"/></svg>`;
      case 'javascript':
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="4"/><path d="M8 15v1a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9"/><path d="M16 9h-2a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h0a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2"/></svg>`;
      case 'html-css':
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m4 3 2 15 6 3 6-3 2-15H4z"/><path d="M7.5 7.5h9"/><path d="m8 11.5 8 .5-1 4.5-3 1.5-3-1.5-.5-2.5"/></svg>`;
      case 'tailwind':
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>`;
      case 'rest-apis':
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16"/><path d="m15 5 7 7-7 7"/><path d="m9 19-7-7 7-7"/></svg>`;
      case 'git-github':
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>`;
      case 'responsive-systems':
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="12" x="3" y="4" rx="2"/><line x1="2" x2="22" y1="20" y2="20"/><path d="M7 16h10"/></svg>`;
      case 'laravel':
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`;
      case 'nodejs':
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 2 7v10l10 5 10-5V7L12 2z"/><path d="m12 12 8.5-4.5"/><path d="M12 12v9.5"/><path d="M12 12 3.5 7.5"/></svg>`;
      case 'python-flask':
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.31"/><path d="M14 9.3V1.99"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/></svg>`;
      case 'mysql':
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>`;
      case 'react':
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="12" rx="10" ry="4.5"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>`;
      case 'figma':
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/></svg>`;
      case 'canva':
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`;
      case 'wireframing':
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`;
      case 'prototyping':
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3v18l7-5 7 5V3z"/></svg>`;
      case 'user-flow':
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><circle cx="18" cy="6" r="3"/><path d="M9 6h6M6 9v9h9"/></svg>`;
      case 'public-speaking':
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>`;
      case 'debate-mun':
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14 12 6.5-6.5a2.12 2.12 0 0 0-3-3L11 9"/><path d="m9 11-6.5 6.5a2.12 2.12 0 0 0 3 3L12 14"/><path d="m14 12-3-3"/><path d="m9 11 3 3"/><circle cx="19" cy="19" r="2"/></svg>`;
      default:
        return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`;
    }
  }


  // ==========================================
  // 7. 3-Tab Portfolio Hub Switcher
  // ==========================================
  const filtersContainer = document.getElementById('portfolio-filters');
  const subfiltersContainer = document.getElementById('projects-subfilters');
  const gridContainer = document.getElementById('portfolio-grid');

  let activeTab = 'projects'; // 'projects' | 'certificates' | 'techstacks'
  let activeProjectFilter = 'all'; // 'all' | 'fullstack' | 'backend' | 'web'

  // Render Master 3-Tab Buttons (Projects | Certificates | Tech Stack)
  function renderMasterTabs() {
    if (!filtersContainer) return;

    filtersContainer.innerHTML = portfolioTabs.map(tab => {
      let icon = '';
      if (tab.id === 'projects') {
        icon = `<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>`;
      } else if (tab.id === 'certificates') {
        icon = `<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>`;
      } else {
        icon = `<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`;
      }

      return `
        <button
          type="button"
          class="hub-tab-btn ${tab.id === activeTab ? 'active' : ''}"
          data-tab="${tab.id}"
          role="tab"
          aria-selected="${tab.id === activeTab}">
          ${icon}
          <span>${tab.label}</span>
        </button>
      `;
    }).join('');

    const buttons = filtersContainer.querySelectorAll('.hub-tab-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        if (activeTab === tab) return;
        activeTab = tab;

        buttons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        renderPortfolioContent();
      });
    });
  }

  // Render Sub-filters for Projects
  function renderProjectSubfilters() {
    if (!subfiltersContainer) return;

    if (activeTab !== 'projects') {
      subfiltersContainer.classList.add('hidden');
      return;
    }

    subfiltersContainer.classList.remove('hidden');
    subfiltersContainer.innerHTML = projectCategories.map(cat => `
      <button
        type="button"
        class="subfilter-btn ${cat.id === activeProjectFilter ? 'active' : ''}"
        data-filter="${cat.id}">
        <span>${cat.label}</span>
      </button>
    `).join('');

    const subBtns = subfiltersContainer.querySelectorAll('.subfilter-btn');
    subBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const f = btn.getAttribute('data-filter');
        if (activeProjectFilter === f) return;
        activeProjectFilter = f;

        subBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        renderProjectCards();
      });
    });
  }

  // Dispatcher for the 3 Tabs
  function renderPortfolioContent() {
    renderProjectSubfilters();
    if (activeTab === 'projects') {
      if (gridContainer) gridContainer.className = 'project-grid';
      renderProjectCards();
    } else if (activeTab === 'certificates') {
      if (gridContainer) gridContainer.className = 'project-grid cert-grid';
      renderCertificateCards();
    } else if (activeTab === 'techstacks') {
      if (gridContainer) gridContainer.className = 'tech-hub-wrap';
      renderTechStackCards();
    }
  }


  // ==========================================
  // 7A. Tab 1: Render Software Engineering Project Cards
  // ==========================================
  function renderProjectCards() {
    if (!gridContainer) return;

    const filtered = activeProjectFilter === 'all'
      ? projects
      : projects.filter(p => p.category === activeProjectFilter);

    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div class="empty-state">
          <h4>No projects in this category</h4>
          <p>Projects under this filter are currently being developed.</p>
        </div>
      `;
      return;
    }

    gridContainer.innerHTML = filtered.map((project, index) => {
      const techTags = project.technologies.map(tech => `
        <span class="tech-tag">${tech}</span>
      `).join('');

      const githubBtn = project.githubUrl
        ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="GitHub Repository">
            <svg fill="currentColor" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>GitHub</span>
          </a>`
        : '';

      const liveDemoBtn = project.liveDemoUrl
        ? `<a href="${project.liveDemoUrl}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Open Live Demo">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
            <span>Live Demo</span>
          </a>`
        : '';

      return `
        <article class="project-card" data-category="${project.category}" style="--delay: ${index * 45}ms">
          <div class="project-media">
            <span class="project-number">${String(index + 1).padStart(2, '0')}</span>
            <img src="${project.image}" alt="${project.title}" loading="lazy" decoding="async" width="600" height="375">
            <span class="project-category">${project.categoryLabel}</span>
          </div>

          <div class="project-body">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-desc">${project.description}</p>
            <div class="project-tech">
              ${techTags}
            </div>
          </div>

          <div class="project-footer">
            <div class="project-links">
              ${githubBtn}
              ${liveDemoBtn}
            </div>

            <button type="button" class="project-details view-details-btn" data-project-id="${project.id}">
              <span>View Details</span>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </article>
      `;
    }).join('');

    const detailButtons = gridContainer.querySelectorAll('.view-details-btn');
    detailButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projId = btn.getAttribute('data-project-id');
        openProjectModal(projId);
      });
    });
  }


  // ==========================================
  // 7B. Tab 2: Render Verified Certificate Cards
  // ==========================================
  function renderCertificateCards() {
    if (!gridContainer) return;

    gridContainer.innerHTML = certificates.map((cert, index) => {
      const skillsHtml = cert.skills.map(s => `<span class="tech-tag">${s}</span>`).join('');
      const certIndexFormatted = String(index + 1).padStart(2, '0');

      return `
        <article class="project-card cert-card" style="--delay: ${index * 50}ms">
          <div class="project-media cert-media">
            <span class="project-number">${certIndexFormatted}</span>
            <img src="${cert.image}" alt="${cert.title}" loading="lazy" decoding="async" width="600" height="400">
            <span class="project-category">${cert.category}</span>
          </div>

          <div class="project-body">
            <div class="cert-meta-row">
              <span class="cert-issuer">
                <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
                ${cert.issuer}
              </span>
              <span class="cert-date">${cert.date}</span>
            </div>
            <h3 class="project-title">${cert.title}</h3>
            <p class="project-desc">${cert.description}</p>
            <div class="project-tech">
              ${skillsHtml}
            </div>
          </div>

          <div class="project-footer cert-footer">
            <a href="${cert.pdfUrl}" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--sm cert-action-btn" aria-label="Open ${cert.title}">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              <span>${cert.isImage ? 'Buka Dokumen' : 'Buka PDF'}</span>
            </a>

            <button type="button" class="project-details view-cert-btn" data-cert-id="${cert.id}">
              <span>Detail</span>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </article>
      `;
    }).join('');

    const certButtons = gridContainer.querySelectorAll('.view-cert-btn');
    certButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const certId = btn.getAttribute('data-cert-id');
        openCertificateModal(certId);
      });
    });
  }


  // ==========================================
  // 7C. Tab 3: Render Structured Tech Stack Cards (NO PERCENTAGES)
  // ==========================================
  function renderTechStackCards() {
    if (!gridContainer) return;

    gridContainer.innerHTML = techStackGroups.map((group, gIdx) => {
      const itemsHtml = group.items.map((tech, idx) => {
        const iconSvg = getTechIconSvg(tech.id);
        const highlightsHtml = tech.highlights.map(h => `<span class="tech-tag">${h}</span>`).join('');

        return `
          <div class="tech-card" style="--delay: ${(gIdx * 6 + idx) * 35}ms">
            <div class="tech-card__head">
              <div class="tech-icon-wrap" aria-hidden="true">
                ${iconSvg}
              </div>
              <div class="tech-badge-group">
                <span class="tech-role-badge">${tech.role}</span>
              </div>
            </div>

            <div class="tech-card__body">
              <h4 class="tech-card__title">${tech.name}</h4>
              <p class="tech-card__summary">${tech.summary}</p>
              
              <div class="tech-card__learned-box">
                <span class="tech-learned-label">Practical Application:</span>
                <p class="tech-learned-text">${tech.learned}</p>
              </div>

              <div class="tech-card__highlights">
                ${highlightsHtml}
              </div>
            </div>
          </div>
        `;
      }).join('');

      return `
        <div class="tech-group-section">
          <div class="tech-group-header">
            <div class="tech-group-title-row">
              <span class="tech-group-num">0${gIdx + 1}</span>
              <h3>${group.title}</h3>
            </div>
            <p class="tech-group-subtitle">${group.subtitle}</p>
          </div>

          <div class="tech-group-grid">
            ${itemsHtml}
          </div>
        </div>
      `;
    }).join('');
  }


  // ==========================================
  // 8. Certificate Detail Modal
  // ==========================================
  const projectModal = document.getElementById('project-detail-modal');
  const modalContainer = document.getElementById('modal-container');

  function openCertificateModal(certId) {
    const cert = certificates.find(c => c.id === certId);
    if (!cert || !projectModal || !modalContainer) return;

    const skillsHtml = cert.skills.map(s => `<span class="tech-tag">${s}</span>`).join('');

    modalContainer.innerHTML = `
      <div class="modal-topbar">
        <button type="button" id="modal-back-btn" class="modal-back">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          <span>Back</span>
        </button>

        <div class="modal-top-actions">
          <span class="project-category">${cert.category}</span>
          <button type="button" id="modal-close-btn" class="modal-close" aria-label="Close certificate details">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      </div>

      <div class="modal-scroll">
        <div class="modal-cover">
          <img src="${cert.image}" alt="${cert.title}" loading="lazy" decoding="async" width="1200" height="700">
        </div>

        <div class="modal-head">
          <div>
            <h2 id="modal-project-title" class="modal-title">${cert.title}</h2>
            <p class="modal-subtitle">${cert.issuer} • ${cert.date}</p>
          </div>

          <div class="modal-actions">
            <a href="${cert.pdfUrl}" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--sm">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              <span>${cert.isImage ? 'Open Full Document' : 'Open PDF Document'}</span>
            </a>
          </div>
        </div>

        <div class="modal-grid">
          <div class="modal-panel">
            <h4>Issuer / Authority</h4>
            <p>${cert.issuer}</p>
          </div>
          <div class="modal-panel">
            <h4>Credential ID</h4>
            <p style="font-family: monospace; color: var(--accent); font-weight: 600;">${cert.credentialId}</p>
          </div>
        </div>

        <div class="modal-panel">
          <h4>Program Overview &amp; Learning Description</h4>
          <p>${cert.description}</p>
        </div>

        <div class="modal-panel">
          <h4>Verified Competencies &amp; Skills</h4>
          <div class="tech-row">
            ${skillsHtml}
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" id="modal-bottom-back-btn" class="btn btn--ghost btn--sm">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            <span>Back to portfolio</span>
          </button>

          <div class="modal-actions">
            <a href="${cert.pdfUrl}" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--sm">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              <span>${cert.isImage ? 'View Document' : 'View PDF'}</span>
            </a>
          </div>
        </div>
      </div>
    `;

    bindModalEvents();
  }


  // ==========================================
  // 9. Project Detail Modal
  // ==========================================
  function openProjectModal(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project || !projectModal || !modalContainer) return;

    const featuresListHtml = project.features && project.features.length > 0
      ? project.features.map(f => `
          <li class="feature-item">
            <span class="feature-check" aria-hidden="true">✓</span>
            <span>${f}</span>
          </li>
        `).join('')
      : '<li class="feature-item"><span class="feature-check" aria-hidden="true">✓</span><span>Features are being documented.</span></li>';

    const techTagsHtml = project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('');

    const githubBtnHtml = project.githubUrl
      ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn--ghost btn--sm">
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          <span>Repository</span>
        </a>`
      : '';

    const liveDemoBtnHtml = project.liveDemoUrl
      ? `<a href="${project.liveDemoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--sm">
          <span>Live Demo</span>
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        </a>`
      : '';

    modalContainer.innerHTML = `
      <div class="modal-topbar">
        <button type="button" id="modal-back-btn" class="modal-back">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          <span>Back</span>
        </button>

        <div class="modal-top-actions">
          <span class="project-category">${project.categoryLabel}</span>
          <button type="button" id="modal-close-btn" class="modal-close" aria-label="Close project details">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      </div>

      <div class="modal-scroll">
        <div class="modal-cover">
          <img src="${project.image}" alt="${project.title}" loading="lazy" decoding="async" width="1200" height="700">
        </div>

        <div class="modal-head">
          <div>
            <h2 id="modal-project-title" class="modal-title">${project.title}</h2>
            <p class="modal-subtitle">${project.description}</p>
          </div>

          <div class="modal-actions">
            ${githubBtnHtml}
            ${liveDemoBtnHtml}
          </div>
        </div>

        <div class="modal-grid">
          <div class="modal-panel">
            <h4>Project Purpose</h4>
            <p>${project.purpose || project.overview || project.description}</p>
          </div>
          <div class="modal-panel">
            <h4>My Role &amp; Responsibility</h4>
            <p>${project.role || 'Full-Stack Software Engineering & Interface Design'}</p>
          </div>
        </div>

        <div class="modal-panel">
          <h4>Key Features &amp; Implementation</h4>
          <ul class="features-list">
            ${featuresListHtml}
          </ul>
        </div>

        ${project.challenge && project.solution ? `
          <div class="modal-grid">
            <div class="modal-panel">
              <h4>Engineering Challenge</h4>
              <p>${project.challenge}</p>
            </div>
            <div class="modal-panel">
              <h4>Architectural Solution</h4>
              <p>${project.solution}</p>
            </div>
          </div>
        ` : ''}

        <div class="modal-panel">
          <h4>Technologies &amp; Architecture</h4>
          <div class="tech-row">
            ${techTagsHtml}
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" id="modal-bottom-back-btn" class="btn btn--ghost btn--sm">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            <span>Back to projects</span>
          </button>

          <div class="modal-actions">
            ${githubBtnHtml}
            ${liveDemoBtnHtml}
          </div>
        </div>
      </div>
    `;

    bindModalEvents();
  }

  function bindModalEvents() {
    const backBtn = document.getElementById('modal-back-btn');
    const bottomBackBtn = document.getElementById('modal-bottom-back-btn');
    const closeBtn = document.getElementById('modal-close-btn');

    const closeModal = () => {
      projectModal.classList.remove('is-open');
      document.body.style.overflow = '';
      projectModal.setAttribute('aria-hidden', 'true');
    };

    if (backBtn) backBtn.addEventListener('click', closeModal);
    if (bottomBackBtn) bottomBackBtn.addEventListener('click', closeModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    projectModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    projectModal.setAttribute('aria-hidden', 'false');

    projectModal.onclick = (e) => {
      if (e.target === projectModal) closeModal();
    };

    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', escHandler);
      }
    });
  }


  // ==========================================
  // 10. WhatsApp Contact Form
  // ==========================================
  const whatsappForm = document.getElementById('whatsapp-form');
  if (whatsappForm) {
    whatsappForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const msg = document.getElementById('message')?.value.trim();

      const text = `Halo Luqman,%0A%0ASaya *${encodeURIComponent(name || '')}* (${encodeURIComponent(email || '')}).%0A%0A*Pesan:*%0A${encodeURIComponent(msg || '')}`;
      window.open(`https://wa.me/6281317161076?text=${text}`, '_blank');
    });
  }


  // ==========================================
  // 11. Initial Render & Hash Deeplinking
  // ==========================================
  renderMasterTabs();
  renderPortfolioContent();

  // Support direct hash deep-linking (e.g. #project-foodloop-id or #skills)
  function checkUrlHash() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#project-')) {
      const projId = hash.replace('#project-', '');
      openProjectModal(projId);
    } else if (hash === '#skills') {
      activeTab = 'techstacks';
      renderMasterTabs();
      renderPortfolioContent();
      const el = document.getElementById('portfolio');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  checkUrlHash();
  window.addEventListener('hashchange', checkUrlHash);

  // Initialize AOS if loaded
  if (window.AOS) {
    window.AOS.init({
      duration: 800,
      once: true,
      offset: 40,
      easing: 'ease-out-cubic'
    });
  }
});
