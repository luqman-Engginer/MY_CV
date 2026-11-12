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
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      menuIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      });
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
      if (window.scrollY > 500) {
        backToTop.classList.remove('opacity-0', 'invisible', 'translate-y-4');
        backToTop.classList.add('opacity-100', 'visible', 'translate-y-0');
      } else {
        backToTop.classList.add('opacity-0', 'invisible', 'translate-y-4');
        backToTop.classList.remove('opacity-100', 'visible', 'translate-y-0');
      }
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

  const badgeColorClasses = {
    teal: 'bg-teal-950/80 text-teal-300 border-teal-500/40',
    cyan: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40',
    rose: 'bg-rose-950/80 text-rose-300 border-rose-500/40',
    amber: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
    purple: 'bg-purple-950/80 text-purple-300 border-purple-500/40',
    indigo: 'bg-indigo-950/80 text-indigo-300 border-indigo-500/40',
    blue: 'bg-blue-950/80 text-blue-300 border-blue-500/40'
  };

  const dotColorClasses = {
    teal: 'bg-teal-400 shadow-[0_0_8px_#2dd4bf]',
    cyan: 'bg-cyan-400 shadow-[0_0_8px_#00f0ff]',
    rose: 'bg-rose-500 shadow-[0_0_8px_#f43f5e]',
    amber: 'bg-amber-400 shadow-[0_0_8px_#fbbf24]',
    purple: 'bg-purple-400 shadow-[0_0_8px_#c084fc]',
    indigo: 'bg-indigo-400 shadow-[0_0_8px_#818cf8]',
    blue: 'bg-blue-400 shadow-[0_0_8px_#38bdf8]'
  };

  // Render Category Filter Buttons
  function renderFilterButtons() {
    if (!filtersContainer) return;
    filtersContainer.innerHTML = projectCategories.map(cat => `
      <button 
        type="button"
        class="filter-btn ${cat.id === activeFilter ? 'active' : ''} px-5 sm:px-6 py-2 text-xs sm:text-sm font-semibold rounded-full border border-cyan-500/30 text-slate-300 hover:text-white hover:border-cyan-400 transition-all bg-[#0c1326]/60 backdrop-blur-md"
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
        <div class="col-span-full py-16 px-6 text-center rounded-3xl bg-[#0c1326]/50 border border-slate-800/80">
          <div class="w-12 h-12 mx-auto mb-3 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
          </div>
          <h4 class="text-base font-bold text-white mb-1">No Projects in this Category</h4>
          <p class="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
            Projects under this category are currently in development or being documented. Check back soon!
          </p>
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
            ? `<span>Hide Projects</span><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"/></svg>`
            : `<span>See More Projects</span><svg class="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>`;
        }
      } else {
        loadMoreWrapper.classList.add('hidden');
      }
    }

    // Render cards markup
    gridContainer.innerHTML = displayedProjects.map((project, index) => {
      const badgeCls = badgeColorClasses[project.badgeColor] || badgeColorClasses.cyan;
      const dotCls = dotColorClasses[project.badgeColor] || dotColorClasses.cyan;
      
      const techTags = project.technologies.map(tech => `
        <span class="px-2.5 py-1 bg-slate-900/90 text-slate-300 text-[11px] font-medium rounded-lg border border-slate-800">
          ${tech}
        </span>
      `).join('');

      // GitHub Action Button
      const githubBtn = project.githubUrl
        ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-cyan-400 text-xs font-semibold shadow-sm hover:shadow-[0_0_12px_rgba(0,240,255,0.25)] transition-all group/gh" aria-label="View on GitHub">
            <svg class="w-3.5 h-3.5 text-slate-300 group-hover/gh:text-cyan-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>GitHub</span>
          </a>`
        : `<button type="button" class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/50 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 text-xs font-medium transition-all group/gh" title="URL GitHub belum diisi di projects.js (Tandai untuk diisi nanti)" onclick="alert('URL GitHub untuk project \\'${project.title}\\' belum diisi. Anda dapat mengisinya nanti di src/data/projects.js');">
            <svg class="w-3.5 h-3.5 text-slate-500 group-hover/gh:text-slate-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span class="truncate">GitHub <span class="text-[10px] text-cyan-400/80">(Tandai)</span></span>
          </button>`;

      // Live Demo Action Button
      const liveDemoBtn = project.liveDemoUrl
        ? `<a href="${project.liveDemoUrl}" target="_blank" rel="noopener noreferrer" class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-indigo-600/20 hover:from-cyan-500/30 hover:to-indigo-600/30 text-cyan-300 hover:text-white border border-cyan-500/30 hover:border-cyan-400 text-xs font-semibold shadow-[0_0_12px_rgba(0,240,255,0.15)] hover:shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all group/demo" aria-label="Live Demo">
            <span>Live Demo</span>
            <svg class="w-3.5 h-3.5 group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </a>`
        : `<button type="button" class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/50 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 text-xs font-medium transition-all group/demo" title="URL Live Demo belum diisi di projects.js (Tandai untuk diisi nanti)" onclick="alert('URL Live Demo untuk project \\'${project.title}\\' belum diisi. Anda dapat mengisinya nanti di src/data/projects.js');">
            <span>Live Demo</span>
            <span class="text-[10px] text-cyan-400/80">(Tandai)</span>
            <svg class="w-3.5 h-3.5 text-slate-500 group-hover/demo:text-slate-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </button>`;

      return `
        <article class="portfolio-item bg-[#0c1326]/80 backdrop-blur-xl rounded-2xl border border-cyan-500/15 overflow-hidden group hover:border-cyan-400/50 shadow-xl hover:shadow-[0_0_35px_rgba(0,240,255,0.18)] card-hover flex flex-col justify-between"
          data-category="${project.category}"
          style="animation: scaleIn 0.35s ease-out ${index * 0.06}s forwards;">
          
          <div>
            <!-- Thumbnail Container -->
            <div class="relative h-52 sm:h-56 overflow-hidden bg-slate-950">
              <img src="${project.image}" alt="${project.title}" loading="lazy" decoding="async" width="480" height="270" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
              
              <!-- Subtle Dark Gradient Vignette -->
              <div class="absolute inset-0 bg-gradient-to-t from-[#0c1326] via-[#0c1326]/20 to-transparent"></div>
              
              <!-- Category Pill Overlay -->
              <div class="absolute top-3.5 left-3.5 z-10">
                <span class="px-3 py-1 ${badgeCls} backdrop-blur-md rounded-full text-[11px] font-bold shadow-md">
                  ${project.categoryLabel}
                </span>
              </div>
            </div>

            <!-- Content Body -->
            <div class="p-6">
              <div class="flex items-center gap-2 mb-2">
                <span class="w-2 h-2 rounded-full ${dotCls}"></span>
                <h3 class="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  ${project.title}
                </h3>
              </div>
              
              <p class="text-slate-400 text-xs sm:text-sm mb-4 leading-relaxed line-clamp-2">
                ${project.description}
              </p>
              
              <!-- Technologies Tags -->
              <div class="flex flex-wrap gap-1.5 pt-1">
                ${techTags}
              </div>
            </div>
          </div>

          <!-- Card Action Buttons Group -->
          <div class="px-6 pb-6 pt-2 space-y-2.5">
            <!-- GitHub & Live Demo Row -->
            <div class="flex items-center gap-2">
              ${githubBtn}
              ${liveDemoBtn}
            </div>

            <!-- View Details Button -->
            <button type="button" class="view-details-btn group/btn flex items-center justify-between w-full px-4 py-2 rounded-xl bg-slate-900/60 hover:bg-cyan-950/40 text-slate-400 hover:text-cyan-300 border border-slate-800/80 hover:border-cyan-500/30 text-xs font-semibold transition-all cursor-pointer" data-project-id="${project.id}">
              <span>View Details</span>
              <svg class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

    const badgeCls = badgeColorClasses[project.badgeColor] || badgeColorClasses.cyan;

    // Features list
    const featuresListHtml = project.features && project.features.length > 0
      ? project.features.map(f => `
          <li class="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <span class="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
            <span class="text-xs sm:text-sm text-slate-200 leading-relaxed">${f}</span>
          </li>
        `).join('')
      : '<p class="text-xs text-slate-400">Fitur sedang didokumentasikan.</p>';

    // Tech tags
    const techTagsHtml = project.technologies.map(tech => `
      <span class="px-3 py-1 bg-cyan-950/40 text-cyan-300 text-xs font-semibold rounded-lg border border-cyan-500/30">
        ${tech}
      </span>
    `).join('');

    // GitHub Action Button
    const githubBtn = project.githubUrl
      ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 hover:border-cyan-400 text-xs sm:text-sm font-semibold shadow-md hover:shadow-[0_0_15px_rgba(0,240,255,0.25)] transition-all group/gh">
          <svg class="w-4 h-4 text-slate-300 group-hover/gh:text-cyan-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span>View on GitHub</span>
        </a>`
      : `<button type="button" class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900/50 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 text-xs sm:text-sm font-medium transition-all group/gh cursor-pointer" title="URL GitHub belum diisi di projects.js (Tandai untuk diisi nanti)" onclick="alert('URL GitHub untuk project \\'${project.title}\\' belum diisi. Anda dapat mengisinya nanti di src/data/projects.js');">
          <svg class="w-4 h-4 text-slate-500 group-hover/gh:text-slate-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span>GitHub <span class="text-xs text-cyan-400 font-semibold">(Tandai)</span></span>
        </button>`;

    // Live Demo Action Button
    const liveDemoBtn = project.liveDemoUrl
      ? `<a href="${project.liveDemoUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] transition-all group/demo">
          <span>Live Demo</span>
          <svg class="w-4 h-4 group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
        </a>`
      : `<button type="button" class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900/50 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 text-xs sm:text-sm font-medium transition-all group/demo cursor-pointer" title="URL Live Demo belum diisi di projects.js (Tandai untuk diisi nanti)" onclick="alert('URL Live Demo untuk project \\'${project.title}\\' belum diisi. Anda dapat mengisinya nanti di src/data/projects.js');">
          <span>Live Demo</span>
          <span class="text-xs text-cyan-400 font-semibold">(Tandai)</span>
          <svg class="w-4 h-4 text-slate-500 group-hover/demo:text-slate-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
        </button>`;

    modalContainer.innerHTML = `
      <!-- Modal Sticky Top Bar -->
      <div class="sticky top-0 z-20 flex items-center justify-between gap-4 px-6 sm:px-8 py-4 bg-[#0a1020]/95 backdrop-blur-xl border-b border-cyan-500/15">
        <button type="button" id="modal-back-btn" class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-cyan-950/60 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 text-xs sm:text-sm font-semibold transition-all group cursor-pointer">
          <svg class="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          <span>Kembali</span>
        </button>

        <div class="flex items-center gap-3">
          <span class="px-3 py-1 ${badgeCls} backdrop-blur-md rounded-full text-xs font-bold shadow-sm">
            ${project.categoryLabel}
          </span>
          <button type="button" id="modal-close-btn" class="w-8 h-8 rounded-xl bg-slate-900/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-slate-800 hover:border-rose-500/40 flex items-center justify-center transition-all cursor-pointer" aria-label="Close modal">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      </div>

      <!-- Modal Scrollable Content -->
      <div class="p-6 sm:p-8 space-y-8 max-h-[calc(88vh-80px)] overflow-y-auto">
        
        <!-- 7. Screenshot Project -->
        <div class="relative w-full rounded-2xl overflow-hidden border border-cyan-500/20 bg-slate-950 shadow-2xl group">
          <img src="${project.image}" alt="${project.title}" class="w-full max-h-[460px] object-cover object-top group-hover:scale-[1.01] transition-transform duration-500" loading="lazy" decoding="async" width="800" height="460">
          <div class="absolute inset-0 bg-gradient-to-t from-[#0a1020] via-transparent to-transparent opacity-50 pointer-events-none"></div>
        </div>

        <!-- Title & Action CTAs Header -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-5 pb-6 border-b border-slate-800/80">
          <div>
            <h2 id="modal-project-title" class="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
              ${project.title}
            </h2>
            <p class="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
              ${project.description}
            </p>
          </div>

          <!-- 8 & 9. GitHub & Live Demo Action Buttons -->
          <div class="flex flex-wrap items-center gap-3 shrink-0">
            ${githubBtn}
            ${liveDemoBtn}
          </div>
        </div>

        <!-- 1 & 2. Project Overview & Tujuan -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="p-6 rounded-2xl bg-[#0c1326]/75 border border-cyan-500/15 shadow-sm space-y-3">
            <div class="flex items-center gap-2.5 text-cyan-400 font-bold text-sm uppercase tracking-wider">
              <span>📋</span>
              <h4>Project Overview</h4>
            </div>
            <p class="text-slate-300 text-xs sm:text-sm leading-relaxed">
              ${project.overview || project.description}
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-[#0c1326]/75 border border-cyan-500/15 shadow-sm space-y-3">
            <div class="flex items-center gap-2.5 text-cyan-400 font-bold text-sm uppercase tracking-wider">
              <span>🎯</span>
              <h4>Deskripsi &amp; Tujuan</h4>
            </div>
            <p class="text-slate-300 text-xs sm:text-sm leading-relaxed">
              ${project.purpose || 'Membangun solusi digital yang memadukan fungsionalitas dan kemudahan penggunaan bagi pengguna akhir.'}
            </p>
          </div>
        </div>

        <!-- 3. Fitur Utama -->
        <div class="p-6 rounded-2xl bg-[#0c1326]/75 border border-cyan-500/15 shadow-sm space-y-4">
          <div class="flex items-center gap-2.5 text-cyan-400 font-bold text-sm uppercase tracking-wider">
            <span>⚡</span>
            <h4>Fitur Utama</h4>
          </div>
          <ul class="grid sm:grid-cols-2 gap-3">
            ${featuresListHtml}
          </ul>
        </div>

        <!-- 4. Teknologi yang Digunakan -->
        <div class="p-6 rounded-2xl bg-[#0c1326]/75 border border-cyan-500/15 shadow-sm space-y-3">
          <div class="flex items-center gap-2.5 text-cyan-400 font-bold text-sm uppercase tracking-wider">
            <span>🛠️</span>
            <h4>Teknologi yang Digunakan</h4>
          </div>
          <div class="flex flex-wrap gap-2 pt-1">
            ${techTagsHtml}
          </div>
        </div>

        <!-- 5. Peran dan Kontribusi Saya -->
        <div class="p-6 rounded-2xl bg-[#0c1326]/75 border border-cyan-500/15 shadow-sm space-y-3">
          <div class="flex items-center gap-2.5 text-cyan-400 font-bold text-sm uppercase tracking-wider">
            <span>👤</span>
            <h4>Peran &amp; Kontribusi Saya</h4>
          </div>
          <p class="text-slate-300 text-xs sm:text-sm leading-relaxed">
            ${project.role || 'Bertanggung jawab dalam implementasi antarmuka dan pengalaman pengguna.'}
          </p>
        </div>

        <!-- 6. Tantangan dan Solusi -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="p-6 rounded-2xl bg-[#140e1b]/70 border border-purple-500/20 shadow-sm space-y-2.5">
            <div class="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <span>⚠️</span>
              <h4>Tantangan</h4>
            </div>
            <p class="text-slate-300 text-xs sm:text-sm leading-relaxed">
              ${project.challenge || 'Mengoptimalkan performa dan kemudahan navigasi bagi pengguna di berbagai perangkat.'}
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-[#0a171d]/70 border border-teal-500/20 shadow-sm space-y-2.5">
            <div class="flex items-center gap-2 text-teal-300 font-bold text-xs uppercase tracking-wider">
              <span>💡</span>
              <h4>Solusi</h4>
            </div>
            <p class="text-slate-300 text-xs sm:text-sm leading-relaxed">
              ${project.solution || 'Menerapkan arsitektur desain yang bersih dan modular serta pengujian visual secara mendalam.'}
            </p>
          </div>
        </div>

        <!-- Bottom Navigation Footer -->
        <div class="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <button type="button" id="modal-bottom-back-btn" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-cyan-950/60 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 text-xs sm:text-sm font-semibold transition-all group cursor-pointer">
            <svg class="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            <span>Kembali ke Daftar Proyek</span>
          </button>

          <div class="flex items-center gap-3">
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

  // Support direct URL deep linking to project modal (e.g. #project-ecommerce-platform)
  function checkUrlHashForProject() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#project-')) {
      const projectId = hash.replace('#project-', '');
      const matched = projectsData.find((p) => String(p.id) === projectId);
      if (matched) {
        openProjectModal(matched);
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
