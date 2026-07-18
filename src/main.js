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

  document.getElementById('year').textContent = new Date().getFullYear();

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-10');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(element => {
    element.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-[1000ms]', 'ease-out');
    observer.observe(element);
  });

  const btnLoadMore = document.getElementById('btn-load-more');
  const extraPortfolios = document.querySelectorAll('.extra-portfolio');
  let isExpanded = false;

  if (btnLoadMore && extraPortfolios.length > 0) {
    btnLoadMore.addEventListener('click', () => {
      isExpanded = !isExpanded;
      extraPortfolios.forEach(card => {
        if (isExpanded) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.5s ease-out forwards';
        } else {
          card.classList.add('hidden');
          card.style.animation = '';
        }
      });
      btnLoadMore.innerHTML = isExpanded
        ? 'Hide <svg class="w-5 h-5 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg>'
        : 'See More Projects <svg class="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>';
    });
  }

  const sliderHero = document.getElementById('sliderHero');
  const slideKiri = document.getElementById('slideKiri');
  const slideKanan = document.getElementById('slideKanan');

  if (slideKiri && slideKanan && sliderHero) {
    slideKiri.addEventListener('click', () => {
      sliderHero.scrollBy({ left: -260, behavior: 'smooth' });
    });
    slideKanan.addEventListener('click', () => {
      sliderHero.scrollBy({ left: 260, behavior: 'smooth' });
    });
  }

  const waForm = document.getElementById('whatsapp-form');

  if (waForm) {
    waForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const nama = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const pesan = document.getElementById('message').value;
      const nomorWhatsApp = "6281317161076";
      const teksPesan = `Halo Luqman!\n\nSaya tertarik untuk berkolaborasi.\n\n*Nama:* ${nama}\n*Email:* ${email}\n*Pesan:* ${pesan}`;
      const pesanEncoded = encodeURIComponent(teksPesan);
      const urlWhatsApp = `https://wa.me/${nomorWhatsApp}?text=${pesanEncoded}`;
      window.open(urlWhatsApp, '_blank');
      waForm.reset();
    });
  }

  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.remove('opacity-0', 'invisible');
        backToTop.classList.add('opacity-100', 'visible');
      } else {
        backToTop.classList.add('opacity-0', 'invisible');
        backToTop.classList.remove('opacity-100', 'visible');
      }
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (typeof AOS !== 'undefined') {
    AOS.init({
      once: true,
      offset: 50,
    });
  }
});
