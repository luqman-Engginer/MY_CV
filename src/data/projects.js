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
    title: 'Admin Lab Booking',
    category: 'web',
    categoryLabel: 'Web Development',
    badgeColor: 'cyan',
    description: 'Lab administration dashboard for laptop permits, equipment loans, and overdue monitoring.',
    image: '/projects/admin-lab-booking.png',
    technologies: ['HTML5', 'JavaScript', 'Tailwind CSS', 'localStorage'],
    featured: false,
    githubUrl: 'https://github.com/luqman-Engginer/My-project-Admin',
    liveDemoUrl: '',
    overview: 'Dashboard admin untuk mencatat izin peminjaman laptop, peminjaman alat, laporan kunci lemari, dan pelanggaran keterlambatan di laboratorium sekolah.',
    purpose: 'Membantu admin lab mencatat peminjaman dan memantau barang yang melewati deadline dari satu dashboard.',
    features: [
      'Login gate dengan whitelist email admin dan guru.',
      'Pencatatan izin laptop dengan autocomplete siswa, kelas, dan nomor laptop.',
      'Pencatatan peminjaman alat untuk guru atau staf dengan deadline.',
      'Laporan kunci lemari berupa checklist dan unggah foto bukti.',
      'Daftar pelanggaran otomatis untuk peminjaman yang melewati deadline.',
      'Data demo disimpan di localStorage karena aplikasi berjalan tanpa backend.'
    ],
    role: 'Frontend Developer. Membangun dashboard, form peminjaman, monitoring deadline, dan penyimpanan data lokal.',
    challenge: 'Membuat alur peminjaman lab yang cepat dipakai admin tanpa backend, sambil tetap memberi peringatan keterlambatan.',
    solution: 'Autocomplete mengisi data siswa dan laptop otomatis, deadline dipantau berkala, dan data disimpan di localStorage.'
  }
];
