/**
 * Data Proyek Portofolio Luqman
 * Struktur data terpisah untuk memudahkan penambahan atau perubahan proyek.
 *
 * CATATAN PENGISIAN URL:
 * - githubUrl: Isi dengan URL repository GitHub asli (misal: 'https://github.com/luqman-Engginer/nama-repo')
 * - liveDemoUrl: Isi dengan URL live website atau Figma prototype jika tersedia
 * - Jika belum tersedia, biarkan string kosong ('') dan tombol otomatis ditandai "Tandai untuk diisi nanti".
 *
 * CATATAN GAMBAR:
 * - Cover memakai GitHub social preview dari repository asli di public/projects/.
 */

export const portfolioTabs = [
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'techstacks', label: 'Tech Stacks' }
];

export const projectCategories = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web Development' },
  { id: 'backend', label: 'Backend' },
  { id: 'fullstack', label: 'Fullstack' }
];

export const projects = [
  {
    id: 'foodloop-id',
    title: 'FoodLoop ID',
    category: 'fullstack',
    categoryLabel: 'Fullstack',
    badgeColor: 'teal',
    description: 'Food surplus platform for reducing waste and measuring supply chain impact.',
    image: '/projects/foodloop-id.png',
    technologies: ['Python', 'Flask', 'MySQL', 'HTMX', 'Tailwind CSS'],
    featured: true,
    githubUrl: 'https://github.com/luqman-Engginer/Project_ketahanan_pangan',
    liveDemoUrl: '',
    overview: 'Platform web untuk mencatat pasokan pangan, memantau masa simpan, dan mengubah data surplus menjadi laporan dampak. Dikembangkan untuk lomba Web Development Soedirman Technoporia 2026 dengan tema Ketahanan Pangan.',
    purpose: 'Mengurangi surplus pangan yang terbuang melalui pencatatan stok, alur review admin, dan laporan dampak yang bisa diukur.',
    features: [
      'Pencatatan pasokan, stok dengan saran FEFO, dan waste log per supplier.',
      'Antrian review admin untuk menyetujui atau menolak pasokan beserta catatan.',
      'Dashboard KPI, tren bulanan, kartu insight, dan audit log aktivitas.',
      'Ekspor laporan PDF, XLSX, dan CSV serta endpoint dampak publik.',
      'Notifikasi real-time via SSE dan pengamanan Argon2, CSRF, rate limit, serta CSP.'
    ],
    role: 'Full-stack Developer. Membangun backend Flask, alur supplier/admin, antarmuka Jinja2 dan HTMX, perhitungan dampak, serta laporan ekspor.',
    challenge: 'Menjaga data antar-supplier tetap terisolasi dan perhitungan dampak hanya memakai pasokan yang sudah disetujui.',
    solution: 'Query supplier difilter dari sesi, KPI dihitung dari data approved, dan logika ekspor dipisahkan ke service layer agar konsisten.'
  },
  {
    id: 'schoolhub',
    title: 'SchoolHub',
    category: 'fullstack',
    categoryLabel: 'Fullstack',
    badgeColor: 'indigo',
    description: 'Integrated school platform with public CMS and multi-role dashboards.',
    image: '/projects/schoolhub.png',
    technologies: ['Node.js', 'Express', 'MySQL', 'React', 'Tailwind CSS'],
    featured: true,
    githubUrl: 'https://github.com/luqman-Engginer/School_systemss',
    liveDemoUrl: '',
    overview: 'Platform sekolah terpadu untuk SMA Cendekia Muda Jakarta yang menggabungkan website publik, CMS, dan dashboard untuk admin, guru, murid, serta wali.',
    purpose: 'Menyatukan informasi akademik, kehadiran, tugas, komunikasi, dan konten sekolah dalam satu sistem multi-role.',
    features: [
      'Website publik dengan berita, agenda, galeri, prestasi, guru-staf, FAQ, dan PPDB.',
      'Dashboard admin untuk akademik, pengguna, relasi wali, laporan, branding, dan CMS.',
      'Ruang guru untuk materi, tugas, penilaian, kehadiran, disiplin, dan diskusi.',
      'Ruang murid untuk materi, tugas, kuis, progres, jadwal, dan aspirasi.',
      'Portal wali untuk memantau akademik, kehadiran, disiplin, dan pertemuan.'
    ],
    role: 'Full-stack Developer. Membangun API Express dan MySQL, antarmuka React per role, skema data, seed demo, serta alur deployment.',
    challenge: 'Menjaga konsistensi data akademik dan hak akses lima peran saat frontend statis dipisahkan dari backend.',
    solution: 'Route dipisah per role, otorisasi dicek di server dengan JWT, dan health check serta backup database disiapkan untuk operasional.'
  },
  {
    id: 'pencatatan-keuangan',
    title: 'Pencatatan Keuangan',
    category: 'fullstack',
    categoryLabel: 'Fullstack',
    badgeColor: 'amber',
    description: 'Financial recording app with balance dashboard, transactions, categories, and admin controls.',
    image: '/projects/pencatatan-keuangan.png',
    technologies: ['Laravel', 'PHP', 'MySQL', 'Blade', 'Tailwind CSS'],
    featured: true,
    githubUrl: 'https://github.com/luqman-Engginer/project_keuangan_with_ng_Ageng',
    liveDemoUrl: '',
    overview: 'Aplikasi web untuk mencatat pemasukan dan pengeluaran, mengelola kategori, serta memantau saldo dan riwayat transaksi.',
    purpose: 'Menyediakan pencatatan keuangan yang aman dan terisolasi per pengguna, dengan kontrol admin untuk status akun.',
    features: [
      'Dashboard total pemasukan, pengeluaran, saldo, dan transaksi terbaru.',
      'CRUD transaksi dengan filter jenis dan kategori.',
      'Validasi saldo tidak negatif serta proteksi kepemilikan data dari manipulasi ID.',
      'Kategori bawaan dan kategori kustom yang hanya terlihat oleh pemiliknya.',
      'Panel admin untuk mencari, mengaktifkan, menonaktifkan, dan menghapus pengguna.',
      '32 automated test untuk alur autentikasi, transaksi, isolasi data, dan admin.'
    ],
    role: 'Full-stack Developer. Membangun autentikasi, CRUD transaksi dan kategori, perhitungan saldo, panel admin, serta test suite.',
    challenge: 'Mencegah manipulasi ID dan transaksi yang membuat saldo negatif tanpa mengunci alur pencatatan pengguna.',
    solution: 'Kepemilikan data dicek di server, saldo dihitung langsung dari database, dan pengeluaran yang melebihi saldo ditolak.'
  },
  {
    id: 'api-perpustakaan',
    title: 'API Perpustakaan',
    category: 'backend',
    categoryLabel: 'Backend',
    badgeColor: 'blue',
    description: 'Library management API with a React dashboard for book collections and stock.',
    image: '/projects/api-perpustakaan.png',
    technologies: ['Laravel', 'PHP', 'MySQL', 'React', 'Vite'],
    featured: false,
    githubUrl: 'https://github.com/luqman-Engginer/api_with_bglabib',
    liveDemoUrl: '',
    overview: 'Proyek terpisah berisi REST API Laravel untuk data buku dan kategori, serta dashboard React untuk mengelola koleksi perpustakaan.',
    purpose: 'Menyediakan fondasi backend perpustakaan dan antarmuka admin untuk melihat, mencari, dan menambah koleksi buku.',
    features: [
      'REST API Laravel untuk daftar, detail, dan tambah buku.',
      'CRUD kategori melalui endpoint API.',
      'Dashboard React dengan statistik judul, stok, kategori, dan pencarian buku.',
      'Form tambah buku dengan validasi input dan notifikasi hasil request.',
      'Struktur repo dipisah antara backend perpus_api dan frontend frontend-perpus.'
    ],
    role: 'Full-stack Developer. Membangun REST API Laravel untuk buku dan kategori serta dashboard React yang mengonsumsi API.',
    challenge: 'Menyatukan kontrak data antara backend Laravel dan frontend React saat bentuk respons API masih berkembang.',
    solution: 'Frontend menormalkan beberapa kemungkinan bentuk respons dan memusatkan request dalam satu helper agar perubahan API mudah diikuti.'
  },
  {
    id: 'portal-ppdb',
    title: 'Portal PPDB',
    category: 'web',
    categoryLabel: 'Web Development',
    badgeColor: 'purple',
    description: 'Student admission portal with role-based access, registration, and separate dashboards.',
    image: '/projects/portal-ppdb.png',
    technologies: ['Laravel', 'PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
    featured: false,
    githubUrl: 'https://github.com/luqman-Engginer/website_profile',
    liveDemoUrl: '',
    overview: 'Aplikasi web untuk mengelola pendaftaran peserta didik baru, dengan registrasi calon siswa dan panel administrator yang dipisahkan.',
    purpose: 'Mengelola alur PPDB secara terpusat dan membatasi akses administrator agar tidak bisa dibuat melalui registrasi publik.',
    features: [
      'Registrasi akun calon siswa dengan validasi domain email @gmail.com.',
      'Login dengan pilihan role User atau Administrator yang divalidasi ke database.',
      'Dashboard terpisah untuk calon siswa dan administrator.',
      'Middleware admin untuk melindungi seluruh URL panel administrator.',
      'Akun administrator dibuat melalui seeder, bukan registrasi publik.'
    ],
    role: 'Full-stack Developer. Membangun alur registrasi dan login, middleware RBAC, dashboard user/admin, serta skema database.',
    challenge: 'Mencegah pendaftaran admin ilegal dan memastikan pilihan role saat login tidak bisa dipakai untuk menaikkan hak akses.',
    solution: 'Registrasi publik hanya membuat akun user, admin dibuat lewat seeder, dan role diverifikasi ulang di server melalui middleware.'
  },
  {
    id: 'admin-lab-booking',
    title: 'Website Admin — Manajemen Lab & Peminjaman',
    category: 'web',
    categoryLabel: 'Web Development',
    badgeColor: 'cyan',
    description: 'Dashboard administrasi lab sekolah untuk izin peminjaman laptop, monitoring peminjaman aktif, dan pelanggaran deadline.',
    image: '/image5.png',
    technologies: ['HTML5', 'JavaScript', 'Tailwind CSS', 'localStorage'],
    featured: false,
    githubUrl: 'https://github.com/luqman-Engginer/My-project-Admin',
    liveDemoUrl: '',
    overview: 'Dashboard admin sekolah untuk mencatat perizinan laptop santri, peminjaman alat guru, laporan inventaris lemari, dan pemantauan pelanggaran deadline secara langsung.',
    purpose: 'Membantu staf lab mengelola alur peminjaman perangkat dan memantau barang yang terlambat dikembalikan dalam satu antarmuka terpusat.',
    features: [
      'Form izin laptop dengan autocomplete nama santri, kelas, dan nomor laptop.',
      'Tabel monitoring peminjaman aktif dengan status otomatis (Selesai / Telat).',
      'Peringatan visual banner untuk pelanggaran aktif yang melewati deadline.',
      'Checklist inventaris kunci lemari dan form peminjaman alat guru.',
      'Penyimpanan state data lokal yang cepat dan responsif tanpa backend.'
    ],
    role: 'Frontend Developer. Membangun antarmuka dashboard, sistem input perizinan, dan logika peringatan deadline.',
    challenge: 'Membuat sistem administrasi lab yang praktis digunakan staf sekolah secara real-time langsung di browser.',
    solution: 'Menyusun layout bersih berbasis Tailwind CSS dengan komponen modular dan manajemen state lokal yang handal.'
  },
  {
    id: 'gantthers-barbershop',
    title: 'Gantthers — Barbershop & Grooming Platform',
    category: 'web',
    categoryLabel: 'Web Development',
    badgeColor: 'teal',
    description: 'Website layanan barbershop modern untuk reservasi online, katalog gaya rambut, dan jadwal layanan grooming.',
    image: '/image2.png',
    technologies: ['HTML5', 'Tailwind CSS', 'JavaScript', 'Responsive Web'],
    featured: false,
    githubUrl: 'https://github.com/luqman-Engginer',
    liveDemoUrl: '',
    overview: 'Website Gantthers Barbershop dirancang untuk menghadirkan pengalaman grooming profesional secara online, mempermudah reservasi janji temu dan menampilkan portofolio cukur rambut.',
    purpose: 'Menyediakan kemudahan booking online bagi pelanggan barbershop agar tidak perlu mengantre secara konvensional.',
    features: [
      'Hero banner modern dengan tagline "We Can Change You To Be Different Look".',
      'Tombol call-to-action "Book Appointment" terintegrasi.',
      'Navigasi menu Home, About, Store, Pricing, dan Contact.',
      'Desain bertema gelap elegan yang merepresentasikan nuansa premium barbershop.'
    ],
    role: 'Frontend Developer. Merancang antarmuka web, tipografi tegas, dan layout responsif untuk kenyamanan pengguna.',
    challenge: 'Menciptakan kesan visual maskulin yang berkelas namun tetap ringan dan cepat diakses pelanggan di smartphone.',
    solution: 'Menggunakan fotografi atmospheric bernuansa monokromatik dengan aksen merah kontras pada tombol aksi.'
  },
  {
    id: 'furniture-website',
    title: 'Doranz — Minimalist Furniture & Interior',
    category: 'web',
    categoryLabel: 'Web Development',
    badgeColor: 'amber',
    description: 'Platform etalase furnitur modern dengan katalog perabot rumah tangga bernuansa minimalis nan estetik.',
    image: '/image4.png',
    technologies: ['HTML5', 'Tailwind CSS', 'JavaScript', 'UI Components'],
    featured: false,
    githubUrl: 'https://github.com/luqman-Engginer',
    liveDemoUrl: '',
    overview: 'Website Doranz membantu pengguna menemukan furnitur minimalis modern untuk interior ruangan dengan kemudahan pencarian produk yang elegan.',
    purpose: 'Memudahkan institusi dan pelanggan dalam menjelajahi serta memesan perabot rumah tangga berkualitas tinggi.',
    features: [
      'Hero showcase "Make your interior more minimalistic & modern".',
      'Fitur pencarian instan furnitur dengan search bar terintegrasi.',
      'Menu navigasi terstruktur: Furniture, Shop, About Us, Contact, dan Shopping Cart.',
      'Tampilan visual perabot 3D photorealistic dengan palet warna hangat.'
    ],
    role: 'Frontend Developer. Membangun tata letak halaman produk, styling utilitas Tailwind, dan integrasi elemen katalog.',
    challenge: 'Menyajikan perabot rumah dalam konteks ruangan nyata tanpa mengurangi fokus pengguna pada detail produk.',
    solution: 'Menata komposisi hero section yang seimbang antara interior photography dengan elemen tipografi yang bersih.'
  },
  {
    id: 'ecommerce-ui-design',
    title: 'QuirkQube — Wireless Audio Store UI',
    category: 'web',
    categoryLabel: 'UI/UX Design',
    badgeColor: 'blue',
    description: 'Desain antarmuka toko online audio nirkabel dengan presentasi produk interaktif dan tata letak belanja modern.',
    image: '/image3.png',
    technologies: ['Figma', 'UI/UX', 'Design System', 'Prototyping'],
    featured: false,
    githubUrl: 'https://github.com/luqman-Engginer',
    liveDemoUrl: '',
    overview: 'QuirkQube merupakan rancangan antarmuka e-commerce khusus perangkat audio nirkabel yang mengedepankan visual headphone bergradien segar dan alur belanja intuitif.',
    purpose: 'Menciptakan pengalaman belanja headphone yang menarik secara visual, informatif, dan memicu rasa ingin membeli.',
    features: [
      'Hero section produk unggulan "Best Product Wireless Headphone".',
      'Tombol aksi "Shop By Category" dan autentikasi Masuk/Daftar.',
      'Kartu deskripsi spesifikasi produk dengan layout minimalis.',
      'Skema warna hijau gradien modern yang dinamis dan ramah mata.'
    ],
    role: 'UI/UX Designer. Melakukan riset antarmuka, pembuatan design system di Figma, dan penataan tata letak visual.',
    challenge: 'Menonjolkan detail fisik produk headphone nirkabel di atas background kanvas digital yang memikat.',
    solution: 'Menggunakan sudut pandang hero angle melayang dengan tipografi latar besar dan kontras kartu yang kuat.'
  },
  {
    id: 'figma-landing-page',
    title: 'ReelUp — Modern Video Landing Page',
    category: 'web',
    categoryLabel: 'UI/UX Design',
    badgeColor: 'indigo',
    description: 'Eksplorasi landing page SaaS platform video teknologi tinggi dengan navigasi presisi dan struktur modular.',
    image: '/image1.png',
    technologies: ['Figma', 'Prototyping', 'Estetika & Layout', 'Typography'],
    featured: false,
    githubUrl: 'https://github.com/luqman-Engginer',
    liveDemoUrl: '',
    overview: 'Perancangan antarmuka ReelUp ("Most Powerful Way To Connect Every Audience") yang menonjolkan kekuatan video engagement digital untuk bisnis modern.',
    purpose: 'Menghadirkan landing page kredibel dengan konversi tinggi bagi calon pengguna SaaS platform video.',
    features: [
      'Hero headline berani dengan tombol "Get Started - For Free!" dan "Book A Demo".',
      'Navigasi lengkap: Products, Customer Stories, Resources, dan Pricing.',
      'Galeri preview multi-format visual dan media engagement.',
      'Komponen tipografi terstruktur dengan jarak whitespace yang lega.'
    ],
    role: 'UI Designer. Mengembangkan visual layout, hierarki teks, pemilihan palet warna monokrom modern, dan wireframing Figma.',
    challenge: 'Menyampaikan proposisi nilai platform teknologi video yang kompleks secara ringkas dan ramah dipahami pengunjung baru.',
    solution: 'Menggabungkan judul berukuran besar, copy ringkas, dan pratinjau kartu konten interaktif di bagian bawah.'
  },
  {
    id: 'canva-brand-design',
    title: 'Branding & CV Bahasa Arab (لقمان)',
    category: 'web',
    categoryLabel: 'Creative Design',
    badgeColor: 'purple',
    description: 'Perancangan identitas visual dan ringkasan resume profesional dalam Bahasa Arab untuk profil siswa RPL SMK Madinatul Qur\'an.',
    image: '/image6.png',
    technologies: ['Canva', 'Graphic Design', 'Branding', 'Typography'],
    featured: false,
    githubUrl: 'https://github.com/luqman-Engginer',
    liveDemoUrl: '',
    overview: 'Karya desain grafis personal branding dan ringkasan portofolio profesional dalam Bahasa Arab (لقمان - هندسة البرمجيات) untuk profil siswa kejuruan software engineering.',
    purpose: 'Mempromosikan kemampuan multilingual (Bahasa Arab, Inggris, Indonesia) dan keahlian rekayasa perangkat lunak.',
    features: [
      'Tipografi kaligrafi modern Bahasa Arab "لقمان - هندسة البرمجيات".',
      'Kartu profil dengan layout minimalis dan tone warna navy-cream yang harmonis.',
      'Informasi pendidikan resmi di SMK Madinatul Qur\'an (2025-2027).',
      'Komposisi layout ramah cetak maupun media sosial.'
    ],
    role: 'Graphic Designer. Merancang konsep visual, tata letak kartu identitas, dan tipografi teks Bahasa Arab.',
    challenge: 'Menyesuaikan layout tata letak tulisan Arab (kanan-ke-kiri / RTL) dengan estetika desain grafis modern.',
    solution: 'Mengatur hierarki heading, avatar berbingkai lingkaran, dan tombol aksi terstruktur yang proporsional.'
  }
];
