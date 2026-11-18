import './style.css';
import { projects, portfolioTabs } from './data/projects.js';
import { certificates } from './data/certificates.js';
import { techStacks } from './data/techstacks.js';

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Navigation Drawer ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileMenuBtn && mobileMenu) {
    const setMobileMenu = (isOpen) => {
      mobileMenu.classList.toggle('hidden', !isOpen);
      menuIcon.classList.toggle('hidden', isOpen);
      closeIcon.classList.toggle('hidden', !isOpen);
      mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    };

    mobileMenuBtn.addEventListener('click', () => {
      setMobileMenu(mobileMenu.classList.contains('hidden'));
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => setMobileMenu(false));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        setMobileMenu(false);
      }
    });
  }

  // --- Header Scroll Effects & Scrollspy ---
  const header = document.getElementById('main-header');
  const capsuleNav = document.getElementById('capsule-nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 60) {
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
    const scrollPos = window.scrollY + 180;

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

  // --- Back to Top Button ---
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('is-visible', window.scrollY > 500);
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Dynamic Typing Effect ---
  const typedTextEl = document.getElementById('typed-text');
  if (typedTextEl) {
    const words = ['Software Engineer', 'Frontend Developer', 'UI/UX Designer', 'Public Speaker'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        typedTextEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedTextEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 45 : 90;

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 450;
      }

      setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();
  }

  // --- Animated Number Counters ---
  const counters = document.querySelectorAll('.counter');

  function animateCounters() {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      if (isNaN(target)) return;
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.round(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
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
    }, { threshold: 0.3 });
    counterObserver.observe(aboutSection);
  }

  // --- Skill Progress Bars Animation (Targeting #skills correctly) ---
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  function animateSkillBars() {
    skillBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = width + '%';
      }, 150);
    });
  }

  const skillsSection = document.getElementById('skills');
  let skillsAnimated = false;

  if (skillsSection && skillBars.length > 0) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
          skillsAnimated = true;
          animateSkillBars();
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    skillObserver.observe(skillsSection);
  }

  // --- Tech Icon SVG Helper ---
  function getTechIconSvg(id) {
    switch (id) {
      case 'golang':
        return `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`;
      case 'laravel':
        return `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`;
      case 'nodejs':
        return `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 2 7v10l10 5 10-5V7L12 2z"/><path d="m12 12 8.5-4.5"/><path d="M12 12v9.5"/><path d="M12 12 3.5 7.5"/></svg>`;
      case 'python-flask':
        return `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.31"/><path d="M14 9.3V1.99"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/></svg>`;
      case 'react':
        return `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="12" rx="10" ry="4.5"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>`;
      case 'javascript':
        return `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="4"/><path d="M8 15v1a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9"/><path d="M16 9h-2a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h0a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2"/></svg>`;
      case 'tailwind':
        return `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>`;
      case 'mysql':
        return `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>`;
      case 'git-github':
        return `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>`;
      case 'figma':
        return `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/></svg>`;
      case 'canva':
        return `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`;
      case 'public-speaking':
        return `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>`;
      default:
        return `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`;
    }
  }

  // --- Dynamic Portfolio Showcase Logic (3 Categories: Projects, Certificates, Tech Stacks) ---
  const filtersContainer = document.getElementById('portfolio-filters');
  const gridContainer = document.getElementById('portfolio-grid');
  const loadMoreBtn = document.getElementById('btn-load-more');
  const loadMoreWrapper = document.getElementById('load-more-wrapper');

  let activeTab = 'projects';
  let isExpanded = false;

  // Render Top 3 Portfolio Category Buttons
  function renderFilterButtons() {
    if (!filtersContainer) return;
    filtersContainer.innerHTML = portfolioTabs.map(tab => `
      <button
        type="button"
        class="filter-btn ${tab.id === activeTab ? 'active' : ''}"
        data-tab="${tab.id}">
        ${tab.label}
      </button>
    `).join('');

    const buttons = filtersContainer.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        if (activeTab === tab) return;
        activeTab = tab;
        
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        renderPortfolioContent();
      });
    });
  }

  // Master Portfolio Content Dispatcher
  function renderPortfolioContent() {
    if (activeTab === 'projects') {
      renderProjectCards();
    } else if (activeTab === 'certificates') {
      renderCertificateCards();
    } else if (activeTab === 'techstacks') {
      renderTechStackCards();
    }
  }

  // 1. Render Project Cards (Display all projects in full masonry gallery)
  function renderProjectCards() {
    if (!gridContainer) return;
    if (loadMoreWrapper) loadMoreWrapper.classList.add('hidden');

    gridContainer.innerHTML = projects.map((project, index) => {
      const techTags = project.technologies.map(tech => `
        <span class="tech-tag">${tech}</span>
      `).join('');

      const githubBtn = project.githubUrl
        ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="View ${project.title} on GitHub">
            <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>GitHub</span>
          </a>`
        : '';

      const liveDemoBtn = project.liveDemoUrl
        ? `<a href="${project.liveDemoUrl}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Open live demo for ${project.title}">
            <span>Live demo</span>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </a>`
        : '';

      return `
        <article class="project-card" data-category="${project.category}" style="--delay: ${index * 60}ms">
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
              <span>Details</span>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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

  // 2. Render Certificate Cards
  function renderCertificateCards() {
    if (!gridContainer) return;
    if (loadMoreWrapper) loadMoreWrapper.classList.add('hidden');

    gridContainer.innerHTML = certificates.map((cert, index) => {
      const skillsHtml = cert.skills.map(s => `<span class="tech-tag">${s}</span>`).join('');
      const certIndexFormatted = String(index + 1).padStart(2, '0');

      return `
        <article class="project-card cert-card" style="--delay: ${index * 60}ms">
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

          <div class="project-footer">
            <div class="project-links" style="width: 100%;">
              <a href="${cert.pdfUrl}" target="_blank" rel="noopener noreferrer" class="project-link" style="width: 100%; justify-content: center; padding: 10px 14px; background: rgba(125, 211, 252, 0.08); border: 1px solid rgba(125, 211, 252, 0.22); border-radius: 8px; color: var(--accent); font-weight: 600; font-size: 13px;" aria-label="Open ${cert.title}">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
                <span>${cert.isImage ? 'Lihat Dokumen / Kredensial' : 'Buka Sertifikat PDF'}</span>
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // 3. Render Tech Stack Cards
  function renderTechStackCards() {
    if (!gridContainer) return;
    if (loadMoreWrapper) loadMoreWrapper.classList.add('hidden');

    gridContainer.innerHTML = techStacks.map((tech, index) => {
      const usedInHtml = tech.usedIn.map(u => `<span class="tech-tag">${u}</span>`).join('');
      const techIndexFormatted = String(index + 1).padStart(2, '0');
      const iconSvg = getTechIconSvg(tech.id);

      return `
        <article class="project-card tech-card" style="--delay: ${index * 45}ms">
          <div class="tech-card-header">
            <div class="tech-icon-wrap" aria-hidden="true">
              ${iconSvg}
            </div>
            <div class="tech-badge-group">
              <span class="project-category">${tech.categoryLabel}</span>
              <span class="tech-level-badge">${tech.level}</span>
            </div>
          </div>

          <div class="project-body">
            <h3 class="project-title tech-title">
              <span class="tech-num">${techIndexFormatted}.</span> ${tech.name}
            </h3>
            <p class="tech-exp-label">${tech.experience}</p>
            <div class="tech-progress-bar" title="Proficiency: ${tech.proficiency}%">
              <div class="tech-progress-fill" style="width: ${tech.proficiency}%"></div>
            </div>
            <p class="project-desc">${tech.description}</p>
            <div class="tech-used-section">
              <span class="tech-used-label">Applied in:</span>
              <div class="project-tech">
                ${usedInHtml}
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // --- Certificate Detail Modal Implementation ---
  function openCertificateModal(certId) {
    const cert = certificates.find(c => c.id === certId);
    if (!cert || !projectModal || !modalContainer) return;

    const skillsHtml = cert.skills.map(s => `<span class="tech-tag">${s}</span>`).join('');

    modalContainer.innerHTML = `
      <div class="modal-topbar">
        <button type="button" id="modal-back-btn" class="modal-back">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          <span>Back</span>
        </button>

        <div class="modal-top-actions">
          <span class="project-category">${cert.category}</span>
          <button type="button" id="modal-close-btn" class="modal-close" aria-label="Close certificate details">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
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
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              <span>${cert.isImage ? 'Open Full Credential' : 'Open PDF Certificate'}</span>
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
            <p style="font-family: monospace; color: var(--accent);">${cert.credentialId}</p>
          </div>
        </div>

        <div class="modal-panel">
          <h4>Certificate Overview</h4>
          <p>${cert.description}</p>
        </div>

        <div class="modal-panel">
          <h4>Verified Skills &amp; Competencies</h4>
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
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              <span>${cert.isImage ? 'View Document' : 'View PDF'}</span>
            </a>
          </div>
        </div>
      </div>
    `;

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
  }

  // --- Project Detail Modal Implementation ---
  const projectModal = document.getElementById('project-detail-modal');
  const modalContainer = document.getElementById('modal-container');

  function openProjectModal(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project || !projectModal || !modalContainer) return;

    // Features list
    const featuresListHtml = project.features && project.features.length > 0
      ? project.features.map(f => `
          <li class="feature-item">
            <span class="feature-check" aria-hidden="true">✓</span>
            <span>${f}</span>
          </li>
        `).join('')
      : '<li class="feature-item"><span class="feature-check" aria-hidden="true">✓</span><span>Features are being documented.</span></li>';

    // Tech tags
    const techTagsHtml = project.technologies.map(tech => `
      <span class="tech-tag">${tech}</span>
    `).join('');

    // GitHub Action Button
    const githubBtn = project.githubUrl
      ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn--ghost btn--sm">
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span>View on GitHub</span>
        </a>`
      : '';

    // Live Demo Action Button
    const liveDemoBtn = project.liveDemoUrl
      ? `<a href="${project.liveDemoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--sm">
          <span>Live demo</span>
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
        </a>`
      : '';

    modalContainer.innerHTML = `
      <div class="modal-topbar">
        <button type="button" id="modal-back-btn" class="modal-back">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          <span>Back</span>
        </button>

        <div class="modal-top-actions">
          <span class="project-category">${project.categoryLabel}</span>
          <button type="button" id="modal-close-btn" class="modal-close" aria-label="Close project details">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      </div>

      <div class="modal-scroll">
        <div class="modal-cover">
          <img src="${project.image}" alt="${project.title}" loading="lazy" decoding="async" width="1200" height="600">
        </div>

        <div class="modal-head">
          <div>
            <h2 id="modal-project-title" class="modal-title">${project.title}</h2>
            <p class="modal-subtitle">${project.description}</p>
          </div>

          <div class="modal-actions">
            ${githubBtn}
            ${liveDemoBtn}
          </div>
        </div>

        <div class="modal-grid">
          <div class="modal-panel">
            <h4>Project overview</h4>
            <p>${project.overview || project.description}</p>
          </div>
          <div class="modal-panel">
            <h4>Purpose</h4>
            <p>${project.purpose || 'Building a digital solution that balances functionality with ease of use.'}</p>
          </div>
        </div>

        <div class="modal-panel">
          <h4>Key features</h4>
          <ul class="feature-list">
            ${featuresListHtml}
          </ul>
        </div>

        <div class="modal-panel">
          <h4>Technology stack</h4>
          <div class="tech-row">
            ${techTagsHtml}
          </div>
        </div>

        <div class="modal-panel">
          <h4>Role &amp; contribution</h4>
          <p>${project.role || 'Responsible for interface implementation and user experience.'}</p>
        </div>

        <div class="modal-grid">
          <div class="modal-panel modal-panel--warn">
            <h4>Challenge</h4>
            <p>${project.challenge || 'Balancing performance and clear navigation across different devices.'}</p>
          </div>
          <div class="modal-panel modal-panel--good">
            <h4>Solution</h4>
            <p>${project.solution || 'Applying a clean, modular architecture with careful visual testing.'}</p>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" id="modal-bottom-back-btn" class="btn btn--ghost btn--sm">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            <span>Back to projects</span>
          </button>

          <div class="modal-actions">
            ${githubBtn}
            ${liveDemoBtn}
          </div>
        </div>
      </div>
    `;

    // Attach back & close button event listeners
    const backBtn = document.getElementById('modal-back-btn');
    const bottomBackBtn = document.getElementById('modal-bottom-back-btn');
    const closeBtn = document.getElementById('modal-close-btn');

    if (backBtn) backBtn.addEventListener('click', closeProjectModal);
    if (bottomBackBtn) bottomBackBtn.addEventListener('click', closeProjectModal);
    if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);

    projectModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Sync URL hash for sharing / deep linking
    try {
      window.history.replaceState(null, '', `#project-${project.id}`);
    } catch {
      // safe fallback if iframe/security context prevents replaceState
    }
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.add('hidden');
    document.body.style.overflow = '';

    // Clear hash if it matches current project
    try {
      if (window.location.hash.startsWith('#project-')) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    } catch {
      // safe fallback
    }
  }

  // Close modal when clicking outside backdrop
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && !projectModal.classList.contains('hidden')) {
      closeProjectModal();
    }
  });

  // Load More Toggle
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      isExpanded = !isExpanded;
      renderProjectCards();
    });
  }

  // Initialize Portfolio Showcase (3 Tabs: Projects, Certificates, Tech Stacks)
  renderFilterButtons();
  renderPortfolioContent();

  // Support direct URL deep linking to project modal (e.g. #project-foodloop-id)
  function checkUrlHashForProject() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#project-')) {
      const projectId = hash.replace('#project-', '');
      const matched = projects.find((p) => String(p.id) === projectId);
      if (matched) {
        openProjectModal(matched.id);
      }
    }
  }

  window.addEventListener('hashchange', checkUrlHashForProject);
  checkUrlHashForProject();

  // --- WhatsApp Contact Form ---
  const waForm = document.getElementById('whatsapp-form');
  if (waForm) {
    waForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const nama = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const pesan = document.getElementById('message').value.trim();

      if (!nama || !email || !pesan) {
        alert('Please fill in all fields before sending.');
        return;
      }

      const nomorWhatsApp = '6281317161076';
      const teksPesan = `Halo Luqman!%0A%0ASaya tertarik untuk berkolaborasi.%0A%0A*Nama:* ${encodeURIComponent(nama)}%0A*Email:* ${encodeURIComponent(email)}%0A*Pesan:* ${encodeURIComponent(pesan)}`;
      window.open(`https://wa.me/${nomorWhatsApp}?text=${teksPesan}`, '_blank');
      waForm.reset();
    });
  }

  // --- AOS Initialization ---
  if (typeof AOS !== 'undefined') {
    AOS.init({
      once: true,
      offset: 50,
      duration: 750,
      easing: 'ease-out-cubic',
    });
  }
});
