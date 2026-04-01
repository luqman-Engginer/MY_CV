import './style.css'

// 1. Mengatur tahun dinamis di footer
document.getElementById('year').textContent = new Date().getFullYear();

// 2. Logika Animasi Scroll (Intersection Observer)
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

// Menerapkan state awal ke semua elemen yang memiliki class 'fade-in'
document.querySelectorAll('.fade-in').forEach(element => {
  // Setup CSS transisi awal menggunakan class Tailwind via JS
  element.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-[1000ms]', 'ease-out');
  observer.observe(element);
});

document.addEventListener('DOMContentLoaded', () => {
  
  // ========================================================
  // 1. FITUR TOMBOL "LIHAT LAINNYA" (PORTOFOLIO)
  // ========================================================
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

      // Ubah tulisan di tombol
      btnLoadMore.innerText = isExpanded ? 'Hide' : 'See More';
    });
  }

  // ========================================================
  // 2. FITUR SLIDER KOTAK KEAHLIAN (HALAMAN HERO ATAS)
  // ========================================================
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

// ========================================================
  // 3. FITUR KIRIM FORM KE WHATSAPP
  // ========================================================
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