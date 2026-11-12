/**
 * Data Proyek Portofolio Luqman
 * Struktur data terpisah untuk memudahkan penambahan atau perubahan proyek.
 * 
 * CATATAN PENGISIAN URL:
 * - githubUrl: Isi dengan URL repository GitHub asli (misal: 'https://github.com/luqman-Engginer/nama-repo')
 * - liveDemoUrl: Isi dengan URL live website atau Figma prototype jika tersedia
 * - Jika belum tersedia, biarkan string kosong ('') dan tombol otomatis ditandai "Tandai untuk diisi nanti".
 */

export const projectCategories = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web Development' },
  { id: 'uiux', label: 'UI/UX Design' },
  { id: 'graphic', label: 'Graphic Design' },
  { id: 'backend', label: 'Backend' },
  { id: 'fullstack', label: 'Fullstack' }
];

export const projects = [
  {
    id: 'gantthers-website',
    title: 'Gantthers Website',
    category: 'web',
    categoryLabel: 'Web Development',
    badgeColor: 'teal',
    description: 'Barbershop platform with online ordering and modern user experience.',
    image: '/image2.png',
    technologies: ['JavaScript', 'Tailwind CSS', 'HTML5', 'Responsive Design'],
    featured: true,
    githubUrl: '', // [TANDAI UNTUK DIISI NANTI]: Contoh 'https://github.com/luqman-Engginer/gantthers-barbershop'
    liveDemoUrl: '', // [TANDAI UNTUK DIISI NANTI]: Contoh 'https://gantthers-barbershop.vercel.app'
    overview: 'Platform website modern untuk barbershop "Gantthers" yang mempermudah pelanggan dalam melihat katalog layanan, memilih kapster, serta melakukan reservasi atau pemesanan jadwal potong rambut secara online.',
    purpose: 'Mengotomasi proses booking barbershop konvensional dan meningkatkan kenyamanan pelanggan dengan antarmuka digital yang cepat, responsif, dan mudah diakses melalui perangkat smartphone maupun desktop.',
    features: [
      'Sistem booking & reservasi jadwal potong rambut online.',
      'Katalog layanan dan daftar harga lengkap dengan estimasi durasi waktu.',
      'Profil kapster barbershop serta jam operasional yang jelas.',
      'Integrasi tombol kontak langsung ke WhatsApp admin untuk konfirmasi instan.',
      'Desain antarmuka responsif dan ramah perangkat mobile (mobile-first layout).'
    ],
    role: 'Frontend Developer & UI Implementer. Mengembangkan antarmuka web, merancang tata letak responsif menggunakan Tailwind CSS, dan membangun alur interaksi pengguna yang mudah dipahami.',
    challenge: 'Menjaga alur booking tetap ringkas dan tidak membebani pengguna saat memesan jadwal dari layar smartphone yang sempit.',
    solution: 'Merancang hierarki form satu kolom dengan validasi masukan instan serta tombol Call-to-Action (CTA) yang mencolok dan terhubung langsung ke WhatsApp.'
  },
  {
    id: 'figma-design',
    title: 'Figma Design',
    category: 'uiux',
    categoryLabel: 'UI/UX Design',
    badgeColor: 'cyan',
    description: 'Landing page with intuitive navigation, comfortable contrast, and precise layout.',
    image: '/image1.png',
    technologies: ['Figma', 'UI/UX Design', 'Wireframing', 'Color Theory'],
    featured: true,
    githubUrl: '', // [TANDAI UNTUK DIISI NANTI]: Contoh link repository / design assets
    liveDemoUrl: '', // [TANDAI UNTUK DIISI NANTI]: Contoh link Figma Prototype / Preview
    overview: 'Konsep desain antarmuka landing page beresolusi tinggi yang dirancang menggunakan Figma, memadukan estetika visual futuristik dengan kontras warna gelap yang nyaman di mata serta tata letak presisi.',
    purpose: 'Menciptakan representasi visual interaktif yang memiliki daya tarik konversi tinggi sebelum produk masuk ke tahap implementasi pengkodean frontend.',
    features: [
      'Tata letak berbasis grid 12-kolom yang seimbang dan konsisten.',
      'Palet warna dark-mode yang telah diuji rasio kontrasnya untuk kenyamanan membaca.',
      'Komponen UI yang dapat digunakan kembali (reusable component library) seperti button, cards, dan badges.',
      'Alur wireframing dari sketsa kasar hingga prototipe interaktif high-fidelity.'
    ],
    role: 'UI/UX Designer. Melakukan riset layout, menyusun sketsa wireframe, menentukan palet warna dan tipografi, serta merangkai prototipe interaktif di Figma.',
    challenge: 'Memastikan elemen visual bertema neon dan gelap tetap mempertahankan tingkat keterbacaan (readability) yang tinggi tanpa membuat mata lelah.',
    solution: 'Menerapkan standar kontras WCAG, memperluas ruang kosong (whitespace), dan memfokuskan aksen warna terang hanya pada elemen kunci dan navigasi utama.'
  },
  {
    id: 'ecommerce-design',
    title: 'E-Commerce Design',
    category: 'uiux',
    categoryLabel: 'UI/UX Design',
    badgeColor: 'rose',
    description: 'Beautiful e-commerce interface focused on user comfort and seamless shopping.',
    image: '/image3.png',
    technologies: ['Figma', 'UI/UX Design', 'E-Commerce UI', 'Design Systems'],
    featured: true,
    githubUrl: '', // [TANDAI UNTUK DIISI NANTI]: Contoh link repository / design assets
    liveDemoUrl: '', // [TANDAI UNTUK DIISI NANTI]: Contoh link Figma Prototype / Preview
    overview: 'Rancangan desain antarmuka platform e-commerce yang menitikberatkan pada kenyamanan pengguna saat berbelanja digital, mulai dari penemuan katalog barang hingga tahap penyelesaian transaksi.',
    purpose: 'Mengoptimalkan alur transaksi digital (*user journey*) agar pembeli dapat menemukan produk yang diinginkan dengan cepat serta menyelesaikan proses checkout tanpa kendala.',
    features: [
      'Tampilan katalog produk berbentuk kartu grid yang bersih dan informatif.',
      'Fitur filter kategori dan kolom pencarian yang mudah dijangkau.',
      'Halaman detail produk dengan galeri visual foto, pilihan varian, dan deskripsi.',
      'Alur keranjang belanja (cart) dan checkout yang ringkas untuk mengurangi cart abandonment.'
    ],
    role: 'UI/UX Designer. Mengembangkan alur pengalaman pengguna (UX flow), menyusun sistem desain antarmuka e-commerce, dan membuat prototipe navigasi checkout.',
    challenge: 'Menyusun banyak informasi produk (harga, diskon, rating, stok, varian) dalam ruang kartu produk yang terbatas agar tetap terlihat bersih dan tidak padat.',
    solution: 'Menerapkan hierarki visual yang ketat: harga dan gambar menjadi titik fokus utama, sedangkan informasi sekunder diletakkan dengan bobot teks yang lebih lembut.'
  },
  {
    id: 'furniture-website',
    title: 'Furniture Website',
    category: 'web',
    categoryLabel: 'Web Development',
    badgeColor: 'amber',
    description: 'Streamlining furniture sales with an easy-to-use purchasing platform.',
    image: '/image4.png',
    technologies: ['JavaScript', 'CSS3', 'HTML5', 'Web App'],
    featured: false,
    githubUrl: '', // [TANDAI UNTUK DIISI NANTI]: Contoh 'https://github.com/luqman-Engginer/furniture-shop'
    liveDemoUrl: '', // [TANDAI UNTUK DIISI NANTI]: Contoh link live website furniture
    overview: 'Website katalog dan etalase digital untuk produk furnitur interior rumah modern, dirancang dengan gaya visual yang bersih untuk menonjolkan kualitas dan estetika furnitur.',
    purpose: 'Menyediakan platform web yang memudahkan calon pembeli menelusuri koleksi furnitur, mempelajari spesifikasi material dan dimensi, serta menghubungi pihak penjual.',
    features: [
      'Katalog furnitur interaktif berdasarkan kategori ruangan (Living Room, Bedroom, Office).',
      'Area pratinjau produk dengan visual besar dan informasi material yang terstruktur.',
      'Tata letak responsif yang nyaman dibuka di layar komputer, tablet, maupun ponsel pintar.',
      'Interaksi filter dan navigasi berbasis vanilla JavaScript tanpa dependensi berlebih.'
    ],
    role: 'Frontend Developer. Membangun struktur markup HTML5 semantik, menulis stylesheet CSS3 yang rapi, dan mengimplementasikan interaktivitas filter kategori menggunakan JavaScript.',
    challenge: 'Menampilkan aset visual produk furnitur berukuran besar agar tetap tajam namun halaman tetap dapat dibuka dengan cepat.',
    solution: 'Mengoptimalkan pemuatan gambar dengan lazy loading dan struktur kontainer gambar yang menjaga rasio aspek gambar tetap proporsional.'
  },
  {
    id: 'admin-website',
    title: 'Admin Website',
    category: 'web',
    categoryLabel: 'Web Development',
    badgeColor: 'cyan',
    description: 'Responsive admin dashboard for efficient school staff management.',
    image: '/image5.png',
    technologies: ['Tailwind CSS', 'HTML5', 'JavaScript', 'Admin Dashboard'],
    featured: false,
    githubUrl: '', // [TANDAI UNTUK DIISI NANTI]: Contoh 'https://github.com/luqman-Engginer/admin-dashboard'
    liveDemoUrl: '', // [TANDAI UNTUK DIISI NANTI]: Contoh link live dashboard
    overview: 'Aplikasi dashboard administrasi web responsif yang dirancang untuk membantu pengelolaan data staf, guru, dan aktivitas operasional di lingkungan sekolah secara terstruktur.',
    purpose: 'Mendigitalisasi pencatatan data staf sekolah yang sebelumnya berbasis spreadsheet manual menjadi sistem terpusat yang mudah dipantau dan dikelola.',
    features: [
      'Ringkasan metrik statistik operasional (total staf, kehadiran, dan aktivitas harian).',
      'Tabel manajemen data staf dengan filter pencarian dan label status.',
      'Sidebar navigasi responsif yang dapat dibuka-tutup pada tampilan layar kecil.',
      'Desain antarmuka bersih berbasis utility classes Tailwind CSS untuk performa optimal.'
    ],
    role: 'Frontend Developer. Mengembangkan komponen antarmuka dashboard, menyusun tabel data responsif dengan Tailwind CSS, serta mengatur logika interaksi sidebar di JavaScript.',
    challenge: 'Menyajikan tabel data staf yang memiliki banyak kolom pada perangkat smartphone tanpa menyebabkan horizontal scrolling yang canggung.',
    solution: 'Menerapkan wadah tabel dengan overflow terkontrol serta mode kartu ringkas (*card layout*) pada ukuran layar seluler.'
  },
  {
    id: 'canva-design',
    title: 'Canva Design',
    category: 'graphic',
    categoryLabel: 'Graphic Design',
    badgeColor: 'purple',
    description: 'Simple yet attractive graphic designs created with Canva for various needs.',
    image: '/image6.png',
    technologies: ['Canva', 'Graphic Design', 'Visual Identity', 'Typography'],
    featured: false,
    githubUrl: '', // [TANDAI UNTUK DIISI NANTI]: Contoh link repository / design assets
    liveDemoUrl: '', // [TANDAI UNTUK DIISI NANTI]: Contoh link Canva Presentation / Design Preview
    overview: 'Koleksi materi desain grafis dan publikasi visual yang dibuat menggunakan Canva untuk kebutuhan identitas promosi, poster media sosial, dan materi presentasi.',
    purpose: 'Menyampaikan pesan informasi dan promosi kepada audiens secara visual dengan komposisi tipografi yang tegas, warna yang harmonis, dan daya tarik tinggi.',
    features: [
      'Kumpulan poster dan banner promosi media sosial dengan format resolusi optimal.',
      'Penyelarasan tipografi modern yang mudah dibaca dalam sekilas pandang.',
      'Komposisi ruang negatif dan penempatan hierarki visual yang seimbang.',
      'Kesesuaian palet warna dengan pesan dan target audiens yang dituju.'
    ],
    role: 'Graphic Designer. Bertanggung jawab atas penciptaan konsep visual, pemilihan skema warna, penataan tipografi, dan penyusunan komposisi visual di Canva.',
    challenge: 'Membuat desain yang terlihat profesional dan unik dengan menggunakan alat desain berbasis templat.',
    solution: 'Membangun komposisi dari kanvas kosong (*blank canvas*) menggunakan aturan grid kustom, modifikasi tipografi unik, dan palet warna kontras yang khas.'
  }
];
