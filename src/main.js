import './style.css'

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      // Buka/tutup menu dropdown
      mobileMenu.classList.toggle('hidden');
      
      // Ganti ikon burger jadi X, atau sebaliknya
      menuIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
    });

    // Otomatis tutup menu kalau salah satu link diklik
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
  threshold: 0.2 // Elemen akan beranimasi saat 20% bagiannya terlihat di layar
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Tambahkan class untuk memunculkan elemen
      entry.target.classList.add('opacity-100', 'translate-y-0');
      // Hapus class awal yang menyembunyikan elemen
      entry.target.classList.remove('opacity-0', 'translate-y-10');
      
      // Hentikan observasi agar animasi hanya terjadi sekali
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);


document.querySelectorAll('.fade-in').forEach(element => {
  // Setup CSS transisi awal menggunakan class Tailwind via JS
  element.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-[1000ms]', 'ease-out');
  observer.observe(element);
});

document.addEventListener('DOMContentLoaded', () => {
  

  const btnLoadMore = document.getElementById('btn-load-more');
  const extraPortfolios = document.querySelectorAll('.extra-portfolio');
  let isExpanded = false;

  if (btnLoadMore && extraPortfolios.length > 0) {
    btnLoadMore.addEventListener('click', () => {
      isExpanded = !isExpanded;
      
      extraPortfolios.forEach(card => {
        if (isExpanded) {
          card.classList.remove('hidden');
          // Animasi opsional jika ada di Tailwind kamu
          card.classList.add('animate-fade-in'); 
        } else {
          card.classList.add('hidden');
          card.classList.remove('animate-fade-in');
        }
      });


      btnLoadMore.innerText = isExpanded ? 'Hide' : 'See More';
    });
  }


  const sliderHero = document.getElementById('sliderHero');
  const slideKiri = document.getElementById('slideKiri');
  const slideKanan = document.getElementById('slideKanan');

  if (slideKiri && slideKanan && sliderHero) {
    slideKiri.addEventListener('click', () => { 
        sliderHero.scrollLeft -= 240; 
    });
    slideKanan.addEventListener('click', () => { 
        sliderHero.scrollLeft += 240; 
    });
  }

});

  const waForm = document.getElementById('whatsapp-form');

  if (waForm) {
    waForm.addEventListener('submit', function(e) {
      // Mencegah form melakukan refresh halaman secara otomatis
      e.preventDefault();

      // Mengambil nilai dari inputan form
      const nama = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const pesan = document.getElementById('message').value;

      // Nomor WhatsApp tujuan (Nomor Luqman)
      const nomorWhatsApp = "6281317161076";

      // Membuat template teks pesan yang rapi untuk dikirim
      const teksPesan = `Halo Luqman!\n\nSaya tertarik untuk berkolaborasi.\n\n*Nama:* ${nama}\n*Email:* ${email}\n*Pesan:* ${pesan}`;

      // Mengubah format teks menjadi URL (mengganti spasi jadi %20, enter jadi %0A, dll)
      const pesanEncoded = encodeURIComponent(teksPesan);

      // Membuat link menuju WhatsApp API
      const urlWhatsApp = `https://wa.me/${nomorWhatsApp}?text=${pesanEncoded}`;

      // Membuka WhatsApp di tab baru
      window.open(urlWhatsApp, '_blank');
      
      // Mengosongkan isian form setelah tombol diklik
      waForm.reset();
    });
  }

document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      once: true, // Animasi cuma jalan sekali waktu scroll turun
      offset: 50, // Mulai animasi kalau jarak elemen ke bawah layar sisa 50px
    });
  }

  const slider = document.getElementById('sliderHero');
  const btnKiri = document.getElementById('slideKiri');
  const btnKanan = document.getElementById('slideKanan');

  if (btnKiri && btnKanan && slider) {
    btnKiri.addEventListener('click', () => {
      slider.scrollBy({ left: -250, behavior: 'smooth' });
    });

    btnKanan.addEventListener('click', () => {
      slider.scrollBy({ left: 250, behavior: 'smooth' });
    });
  }
});