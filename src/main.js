import './style.css'

document.addEventListener('DOMContentLoaded', () => {

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

  const nav = document.querySelector('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 80) {
      nav.classList.add('nav-scrolled');
      if (currentScroll > lastScroll && currentScroll > 200) {
        nav.style.transform = 'translateY(-100%)';
      } else {
        nav.style.transform = 'translateY(0)';
      }
    } else {
      nav.classList.remove('nav-scrolled');
      nav.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
  });

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

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

  const typedTextEl = document.getElementById('typed-text');
  if (typedTextEl) {
    const words = ['Software Engineer', 'Graphic Designer', 'Public Speaker', 'Problem Solver'];
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

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
      }

      setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();
  }

  const counters = document.querySelectorAll('.counter');

  function animateCounters() {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
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
    }, { threshold: 0.5 });
    counterObserver.observe(aboutSection);
  }

  const skillBars = document.querySelectorAll('.skill-bar-fill');

  function animateSkillBars() {
    skillBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = width + '%';
      }, 200);
    });
  }

  const skillsSection = document.getElementById('focus');
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
    }, { threshold: 0.3 });
    skillObserver.observe(skillsSection);
  }

  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const extraPortfolios = document.querySelectorAll('.extra-portfolio');
  let activeFilter = 'all';
  let isExpanded = false;

  function updatePortfolioVisibility() {
    portfolioItems.forEach(item => {
      const isExtra = item.classList.contains('extra-portfolio');
      const matchesFilter = activeFilter === 'all' || item.getAttribute('data-category') === activeFilter;
      const shouldShow = matchesFilter && (!isExtra || isExpanded);

      if (shouldShow) {
        item.classList.remove('item-hidden');
      } else {
        item.classList.add('item-hidden');
      }
    });
  }

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.getAttribute('data-filter');
        updatePortfolioVisibility();
      });
    });
  }

  const loadMoreBtn = document.getElementById('btn-load-more');

  if (loadMoreBtn && extraPortfolios.length > 0) {
    updatePortfolioVisibility();

    loadMoreBtn.addEventListener('click', () => {
      isExpanded = !isExpanded;
      updatePortfolioVisibility();

      extraPortfolios.forEach((card, index) => {
        if (isExpanded) {
          card.style.animation = `scaleIn 0.5s ease-out ${index * 0.1}s forwards`;
        } else {
          card.style.animation = '';
        }
      });

      loadMoreBtn.innerHTML = isExpanded
        ? `Hide Projects <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"/></svg>`
        : `See More Projects <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>`;
    });
  }

  const sliderHero = document.getElementById('sliderHero');
  const slideKiri = document.getElementById('slideKiri');
  const slideKanan = document.getElementById('slideKanan');

  if (slideKiri && slideKanan && sliderHero) {
    slideKiri.addEventListener('click', () => sliderHero.scrollBy({ left: -260, behavior: 'smooth' }));
    slideKanan.addEventListener('click', () => sliderHero.scrollBy({ left: 260, behavior: 'smooth' }));
  }

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

  const faders = document.querySelectorAll('.fade-in-section');
  if (faders.length > 0) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    faders.forEach(el => {
      el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out');
      fadeObserver.observe(el);
    });
  }

  if (typeof AOS !== 'undefined') {
    AOS.init({
      once: true,
      offset: 60,
      duration: 800,
      easing: 'ease-out-cubic',
    });
  }
});
