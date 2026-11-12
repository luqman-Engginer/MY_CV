import './style.css';
import { projects, projectCategories } from './data/projects.js';

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

  // --- Dynamic Project Showcase Logic ---
  const filtersContainer = document.getElementById('portfolio-filters');
  const gridContainer = document.getElementById('portfolio-grid');
  const loadMoreBtn = document.getElementById('btn-load-more');
  const loadMoreWrapper = document.getElementById('load-more-wrapper');

  let activeFilter = 'all';
  let isExpanded = false;

  // Render Category Filter Buttons
  function renderFilterButtons() {
    if (!filtersContainer) return;
    filtersContainer.innerHTML = projectCategories.map(cat => `
      <button
        type="button"
        class="filter-btn ${cat.id === activeFilter ? 'active' : ''}"
        data-filter="${cat.id}">
        ${cat.label}
      </button>
    `).join('');

    const buttons = filtersContainer.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        if (activeFilter === filter) return;
        activeFilter = filter;
        
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        renderProjectCards();
      });
    });
  }

  // Render Project Cards
  function renderProjectCards() {
    if (!gridContainer) return;

    // Filter projects according to active tab
    const filteredProjects = activeFilter === 'all'
      ? projects
      : projects.filter(p => p.category === activeFilter);

    // Empty state if category has no projects yet
    if (filteredProjects.length === 0) {
      gridContainer.innerHTML = `
        <div class="project-empty">
          <h4>No projects in this category</h4>
          <p>Projects under this category are currently in development or being documented. Check back soon.</p>
        </div>
      `;
      if (loadMoreWrapper) loadMoreWrapper.classList.add('hidden');
      return;
    }

    // Determine how many projects to display
    const defaultLimit = 3;
    const shouldLimit = activeFilter === 'all' && !isExpanded && filteredProjects.length > defaultLimit;
    const displayedProjects = shouldLimit ? filteredProjects.slice(0, defaultLimit) : filteredProjects;

    // Toggle Load More button
    if (loadMoreWrapper) {
      if (activeFilter === 'all' && filteredProjects.length > defaultLimit) {
        loadMoreWrapper.classList.remove('hidden');
        if (loadMoreBtn) {
          loadMoreBtn.innerHTML = isExpanded
            ? `<span>Show less</span><svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>`
            : `<span>See more projects</span><svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>`;
        }
      } else {
        loadMoreWrapper.classList.add('hidden');
      }
    }

    // Render cards markup
    gridContainer.innerHTML = displayedProjects.map((project, index) => {
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

    // Attach click listeners to "View Details" buttons
    const detailButtons = gridContainer.querySelectorAll('.view-details-btn');
    detailButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projId = btn.getAttribute('data-project-id');
        openProjectModal(projId);
      });
    });
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

  // Initialize Portfolio Showcase
  renderFilterButtons();
  renderProjectCards();

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
