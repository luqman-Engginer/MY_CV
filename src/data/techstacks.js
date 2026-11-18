/**
 * Data Tech Stacks Portofolio Luqman
 * Menampilkan teknologi dan keahlian yang telah dikuasai.
 */

export const techCategories = [
  { id: 'all', label: 'All Stacks' },
  { id: 'backend', label: 'Backend' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'database', label: 'Database & Tools' },
  { id: 'design', label: 'Design & Soft Skills' }
];

export const techStacks = [
  {
    id: 'golang',
    name: 'Golang (Go)',
    category: 'backend',
    categoryLabel: 'Backend Language',
    level: 'Advanced',
    proficiency: 80,
    icon: 'fa-brands fa-golang',
    badgeColor: 'cyan',
    experience: 'Clean Architecture & APIs',
    description: 'High-performance backend programming, building RESTful web services, routing, and concurrent network architecture.',
    usedIn: ['Backend microservices', 'High-throughput APIs', 'Clean modular services']
  },
  {
    id: 'laravel',
    name: 'PHP & Laravel',
    category: 'backend',
    categoryLabel: 'Backend Framework',
    level: 'Advanced',
    proficiency: 85,
    icon: 'fa-brands fa-laravel',
    badgeColor: 'rose',
    experience: 'MVC & Enterprise Systems',
    description: 'Full-featured enterprise web apps with Eloquent ORM, role-based access control (RBAC), Blade templating, and automated unit testing.',
    usedIn: ['Pencatatan Keuangan', 'API Perpustakaan', 'Portal PPDB']
  },
  {
    id: 'nodejs',
    name: 'Node.js & Express',
    category: 'backend',
    categoryLabel: 'Backend Runtime',
    level: 'Proficient',
    proficiency: 78,
    icon: 'fa-brands fa-node-js',
    badgeColor: 'emerald',
    experience: 'REST APIs & Realtime',
    description: 'Building event-driven JavaScript server applications, modular route handling, JWT authentication, and database connectors.',
    usedIn: ['SchoolHub Integrated Platform', 'REST Services', 'Session Management']
  },
  {
    id: 'python-flask',
    name: 'Python & Flask',
    category: 'backend',
    categoryLabel: 'Backend Framework',
    level: 'Proficient',
    proficiency: 75,
    icon: 'fa-brands fa-python',
    badgeColor: 'amber',
    experience: 'Web & Impact Services',
    description: 'Lightweight web backend using Flask, Jinja2, HTMX reactive components, and security-first hashing with Argon2.',
    usedIn: ['FoodLoop ID Surplus Platform', 'Data processing', 'Supply chain tools']
  },
  {
    id: 'react',
    name: 'React & Vite',
    category: 'frontend',
    categoryLabel: 'Frontend Library',
    level: 'Advanced',
    proficiency: 82,
    icon: 'fa-brands fa-react',
    badgeColor: 'sky',
    experience: 'Interactive Web Apps',
    description: 'Modern component-driven SPAs with React hooks, responsive layouts, modular state handling, and instant Vite bundling.',
    usedIn: ['SchoolHub Frontend', 'Library Dashboard', 'Dynamic Client UIs']
  },
  {
    id: 'javascript',
    name: 'JavaScript (ES6+)',
    category: 'frontend',
    categoryLabel: 'Core Language',
    level: 'Advanced',
    proficiency: 85,
    icon: 'fa-brands fa-js',
    badgeColor: 'amber',
    experience: 'DOM & Asynchronous Logic',
    description: 'Deep mastery of vanilla JavaScript, promises, async/await, DOM manipulations, event delegation, and browser APIs.',
    usedIn: ['Portfolio interactions', 'Admin Lab Booking', 'Custom modal systems']
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    categoryLabel: 'CSS Framework',
    level: 'Expert',
    proficiency: 90,
    icon: 'fa-solid fa-wind',
    badgeColor: 'cyan',
    experience: 'Modern Design Systems',
    description: 'Crafting polished, responsive dark-mode user interfaces with micro-animations, glassmorphism, and bespoke utility styles.',
    usedIn: ['All major web projects', 'Responsive dashboards', 'Mobile-first layouts']
  },
  {
    id: 'mysql',
    name: 'MySQL & Databases',
    category: 'database',
    categoryLabel: 'Relational Database',
    level: 'Advanced',
    proficiency: 80,
    icon: 'fa-solid fa-database',
    badgeColor: 'blue',
    experience: 'Schema & Queries',
    description: 'Designing normalized relational databases, indexing, foreign keys, transaction safety, and query optimization.',
    usedIn: ['SchoolHub MySQL schema', 'FoodLoop DB', 'Keuangan database']
  },
  {
    id: 'git-github',
    name: 'Git & GitHub',
    category: 'database',
    categoryLabel: 'Version Control',
    level: 'Advanced',
    proficiency: 85,
    icon: 'fa-brands fa-github',
    badgeColor: 'slate',
    experience: 'Workflow & Collaboration',
    description: 'Branching management, semantic commit histories, pull requests, project documentation, and code reviews.',
    usedIn: ['All 6 open source repositories', 'Automated workflows', 'Documentation']
  },
  {
    id: 'figma',
    name: 'Figma (UI/UX)',
    category: 'design',
    categoryLabel: 'Interface Design',
    level: 'Advanced',
    proficiency: 80,
    icon: 'fa-brands fa-figma',
    badgeColor: 'purple',
    experience: 'Wireframing & Prototyping',
    description: 'Wireframing, user flows, responsive component libraries, accessibility checks, and high-fidelity clickable prototypes.',
    usedIn: ['Web app UI designs', 'Design handoff', 'Product concepts']
  },
  {
    id: 'canva',
    name: 'Canva & Graphic Design',
    category: 'design',
    categoryLabel: 'Visual Graphic',
    level: 'Expert',
    proficiency: 88,
    icon: 'fa-solid fa-palette',
    badgeColor: 'pink',
    experience: 'Branding & Social Assets',
    description: 'Creative visual identity, presentation decks, marketing collateral, social preview graphics, and event publications.',
    usedIn: ['School marketing materials', 'Social preview branding', 'Presentations']
  },
  {
    id: 'public-speaking',
    name: 'Public Speaking & MUN',
    category: 'design',
    categoryLabel: 'Soft Skills & Leadership',
    level: 'Advanced',
    proficiency: 85,
    icon: 'fa-solid fa-microphone',
    badgeColor: 'indigo',
    experience: 'Diplomacy & Debate',
    description: 'Model United Nations competitive speech, structured debate, cross-cultural diplomacy, and persuasive technical presentations.',
    usedIn: ['ECOFIN Canada Delegate', 'Class2Class Global Presentation', 'School Debate']
  }
];
