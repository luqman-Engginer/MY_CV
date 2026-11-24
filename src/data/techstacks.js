/**
 * Data Tech Stack Portofolio Luqman (Software Engineering & UI/UX)
 * Terstruktur tanpa persentase/progress bar sesuai standar Software Engineering.
 * Menguraikan apa yang telah dipelajari dan diterapkan secara praktis.
 */

export const techStackGroups = [
  {
    id: 'engineering',
    title: 'Engineering & Web Systems',
    subtitle: 'Languages, frameworks, architecture, and production workflows applied in projects.',
    icon: 'code',
    items: [
      {
        id: 'golang',
        name: 'Golang (Go)',
        category: 'backend',
        role: 'Core Backend Language',
        badgeColor: 'cyan',
        summary: 'High-performance backend programming with clean architecture, goroutine concurrency, and robust routing.',
        learned: 'Mempelajari arsitektur backend modular, manajemen memory efisien, konkurensi goroutine/channel, dan pembuatan microservice RESTful API berkinerja tinggi.',
        highlights: ['Clean Architecture', 'Concurrent Services', 'Standard Library', 'High-Throughput APIs']
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        category: 'frontend',
        role: 'Type-Safe Systems',
        badgeColor: 'blue',
        summary: 'Strict type contracts, interfaces, and compile-time validation for scalable applications.',
        learned: 'Menerapkan strict typing, generic interfaces, type guards, dan normalisasi kontrak data antara backend dan antarmuka web modern.',
        highlights: ['Strict Typing', 'Generic Interfaces', 'API Contract Safety', 'Refactor Confidence']
      },
      {
        id: 'javascript',
        name: 'JavaScript (ES6+)',
        category: 'frontend',
        role: 'Core Language',
        badgeColor: 'amber',
        summary: 'Asynchronous event loops, DOM orchestration, promises, and modern client-side architectures.',
        learned: 'Menguasai manipulasi DOM tanpa framework, async/await, event delegation, client-side storage (localStorage), dan custom reactive UI patterns.',
        highlights: ['ESNext Syntax', 'Async / Await', 'DOM Orchestration', 'Event Systems']
      },
      {
        id: 'html-css',
        name: 'HTML5 & Modern CSS',
        category: 'frontend',
        role: 'Semantic Foundation',
        badgeColor: 'orange',
        summary: 'Accessible semantic structures, CSS Grid & Flexbox layouts, and custom property design tokens.',
        learned: 'Membangun struktur markup yang ramah SEO dan a11y (aksesibilitas), komposisi layout CSS Grid/Flexbox kompleks, dan sistem variabel token.',
        highlights: ['Semantic Markup', 'CSS Grid & Flexbox', 'Accessibility (a11y)', 'Fluid Layouts']
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        category: 'frontend',
        role: 'Design System Engine',
        badgeColor: 'sky',
        summary: 'Utility-first styling, design token scaling, micro-interactions, and dark/light mode themes.',
        learned: 'Merancang design system responsif, dark mode & light mode toggle berbasis token CSS variabel, dan micro-interaction visual yang konsisten.',
        highlights: ['Utility Architecture', 'Dark & Light Mode', 'Design Tokens', 'Mobile-First Patterns']
      },
      {
        id: 'rest-apis',
        name: 'REST APIs & Web Services',
        category: 'backend',
        role: 'System Integration',
        badgeColor: 'emerald',
        summary: 'Resource-oriented endpoint design, JWT authorization middleware, and structured JSON payloads.',
        learned: 'Merancang endpoint RESTful berstandar RFC, proteksi middleware JWT & RBAC, penanganan error terpusat, dan integrasi antar frontend-backend.',
        highlights: ['Resource Endpoints', 'JWT & RBAC Auth', 'Error Standards', 'JSON Normalization']
      },
      {
        id: 'git-github',
        name: 'Git & GitHub',
        category: 'tools',
        role: 'Version Control',
        badgeColor: 'slate',
        summary: 'Branching workflows, semantic commit conventions, pull requests, and automated deployment.',
        learned: 'Manajemen branching feature/fix, konvensi commit semantik, code review pull request, dan dokumentasi repositori open-source.',
        highlights: ['Branching Strategies', 'Semantic Commits', 'PR Code Reviews', 'Open Source Docs']
      },
      {
        id: 'responsive-systems',
        name: 'Responsive Systems',
        category: 'frontend',
        role: 'Viewport Architecture',
        badgeColor: 'indigo',
        summary: 'Fluid typography, adaptive breakpoint systems, touch UX, and mobile drawer navigation.',
        learned: 'Membangun antarmuka adaptif yang responsif mulus dari smartphone (320px) hingga layar monitor 4K dengan navigasi drawer interaktif.',
        highlights: ['Mobile-First Layouts', 'Adaptive Drawers', 'Fluid Typography', 'Touch Targets']
      },
      {
        id: 'laravel',
        name: 'PHP & Laravel',
        category: 'backend',
        role: 'Enterprise MVC Framework',
        badgeColor: 'rose',
        summary: 'MVC architectural patterns, Eloquent ORM relations, RBAC middleware, and automated test suites.',
        learned: 'Membangun aplikasi web enterprise dengan Eloquent ORM, migrasi skema database, autentikasi multi-role, dan 30+ automated unit tests.',
        highlights: ['Eloquent ORM', 'RBAC Middleware', 'Automated Testing', 'Blade Templating']
      },
      {
        id: 'nodejs',
        name: 'Node.js & Express',
        category: 'backend',
        role: 'Server Runtime',
        badgeColor: 'green',
        summary: 'Event-driven server applications, modular route controllers, and JSON API pipelines.',
        learned: 'Membangun server backend event-driven Express.js, arsitektur route modular, middleware pipeline, dan koneksi database MySQL.',
        highlights: ['Express Middleware', 'Route Isolation', 'JSON Pipelines', 'Server State']
      },
      {
        id: 'python-flask',
        name: 'Python & Flask',
        category: 'backend',
        role: 'Lightweight Backend',
        badgeColor: 'amber',
        summary: 'Lightweight micro-framework services, HTMX reactivity, and Argon2 cryptographic security.',
        learned: 'Membangun backend platform surplus pangan FoodLoop ID, alur data FEFO, pengamanan password Argon2, dan generator laporan ekspor PDF/Excel.',
        highlights: ['Flask Services', 'HTMX Reactivity', 'Argon2 Security', 'Export Generators']
      },
      {
        id: 'mysql',
        name: 'MySQL & Relational Databases',
        category: 'database',
        role: 'Relational Schema',
        badgeColor: 'blue',
        summary: 'Schema normalization (3NF), foreign keys, indexing, and transactional ACID consistency.',
        learned: 'Merancang skema database relasional ternormalisasi, foreign key constraints, pengindeksan query, dan pengamanan transaksi ACID.',
        highlights: ['3NF Normalization', 'Index Optimization', 'ACID Transactions', 'Relational Schemas']
      },
      {
        id: 'react',
        name: 'React & Vite',
        category: 'frontend',
        role: 'Component Architecture',
        badgeColor: 'cyan',
        summary: 'Component-driven SPAs, custom React hooks, reactive state flow, and lightning-fast Vite builds.',
        learned: 'Membangun antarmuka SPA modular dengan hooks (useState, useEffect, useMemo), state management efisien, dan bundling optimal via Vite.',
        highlights: ['Modular Components', 'Custom Hooks', 'State Management', 'Vite Tooling']
      }
    ]
  },
  {
    id: 'design-communication',
    title: 'UI/UX, Design & Communication',
    subtitle: 'Human-centered interface craft, brand identity, and persuasive verbal leadership.',
    icon: 'palette',
    items: [
      {
        id: 'figma',
        name: 'Figma & UI Design',
        category: 'design',
        role: 'Product Interface Design',
        badgeColor: 'purple',
        summary: 'Scalable design systems, atomic components, auto-layout, and high-fidelity clickable mockups.',
        learned: 'Merancang antarmuka produk digital (ReelUp, QuirkQube) dengan auto-layout presisi, komponen bervarian, dan pedoman developer handoff.',
        highlights: ['Design Systems', 'Auto-Layout', 'Component Variants', 'Developer Handoff']
      },
      {
        id: 'canva',
        name: 'Canva & Graphic Design',
        category: 'design',
        role: 'Visual Branding',
        badgeColor: 'pink',
        summary: 'Brand identity assets, marketing collateral, social kits, and multilingual typographic layouts.',
        learned: 'Merancang identitas visual personal branding bahasa Arab (لقمان), materi publikasi sekolah, dan aset grafis media sosial yang estetis.',
        highlights: ['Brand Identity', 'Visual Marketing', 'Typography Layouts', 'Social Collateral']
      },
      {
        id: 'wireframing',
        name: 'Wireframing',
        category: 'design',
        role: 'Structural Planning',
        badgeColor: 'slate',
        summary: 'Low-fidelity layout blueprints, structural content hierarchy, and rapid UX exploration.',
        learned: 'Menyusun wireframe kerangka dasar antarmuka aplikasi sebelum tahap visual untuk memvalidasi kebutuhan fungsional dan keterbacaan.',
        highlights: ['Low-Fi Blueprints', 'Visual Hierarchy', 'Rapid Prototyping', 'Content Placement']
      },
      {
        id: 'prototyping',
        name: 'Interactive Prototyping',
        category: 'design',
        role: 'Interaction UX',
        badgeColor: 'violet',
        summary: 'Clickable user journeys, micro-interactions, animated states, and user testing clickpaths.',
        learned: 'Membangun prototipe interaktif yang dapat diuji coba langsung oleh pengguna untuk memvalidasi alur navigasi dan transisi tombol.',
        highlights: ['Clickable Flows', 'Smart Animate', 'Usability Testing', 'Transition States']
      },
      {
        id: 'user-flow',
        name: 'User Flow & Journey Mapping',
        category: 'design',
        role: 'UX Architecture',
        badgeColor: 'teal',
        summary: 'Decision-tree mapping, friction reduction, onboarding flows, and conversion path design.',
        learned: 'Memetakan alur langkah pengguna dari registrasi hingga transaksi checkout, meminimalkan hambatan navigasi, dan memaksimalkan kejelasan aksi.',
        highlights: ['Journey Mapping', 'Friction Reduction', 'Decision Trees', 'Onboarding Paths']
      },
      {
        id: 'public-speaking',
        name: 'Public Speaking',
        category: 'soft-skills',
        role: 'Verbal Leadership',
        badgeColor: 'emerald',
        summary: 'Technical concept articulation, audience engagement, persuasive speech, and live Q&A.',
        learned: 'Menyampaikan gagasan teknis secara terstruktur dan percaya diri di hadapan audiens, presentasi proyek, dan sesi tanya jawab interaktif.',
        highlights: ['Technical Pitching', 'Stage Presence', 'Clear Articulation', 'Audience Engagement']
      },
      {
        id: 'debate-mun',
        name: 'Debate & Model United Nations',
        category: 'soft-skills',
        role: 'Diplomacy & Negotiation',
        badgeColor: 'indigo',
        summary: 'Model United Nations diplomacy, resolution drafting, cross-cultural speech, and structured debate.',
        learned: 'Mewakili Delegasi Kanada di komite ECOFIN UI MUN Club: menyusun draf resolusi diplomasi, bernegosiasi lintas budaya, dan berdebat terstruktur.',
        highlights: ['MUN Diplomacy', 'Resolution Drafting', 'Structured Debate', 'Cross-Cultural Comm']
      }
    ]
  }
];

// Flat export for backwards compatibility
export const techStacks = techStackGroups.flatMap(group => group.items);
