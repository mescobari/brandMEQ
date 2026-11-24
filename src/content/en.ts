// English content (default locale, employer-facing). Same shape as es.ts.
// Facts must stay backed by the master CV (05_agente_laboral/job-search-os/cv.md).
import type { SiteContent } from './types';

export const en: SiteContent = {
  siteConfig: {
    language: 'en',
    title: 'Max Escobari | Senior IT Project Manager | Solutions Architect | ITIL',
    description:
      'Senior IT Project Manager with 25+ years leading strategic technology projects in banking, energy, healthcare, and social development. ITIL 4 and Google Project Management certified.',
  },

  navigationConfig: {
    logo: 'MAX ESCOBARI',
    links: [
      { label: 'Home', href: '#hero' },
      { label: 'About', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Projects', href: '#portfolio' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '#contact' },
    ],
    contactLabel: 'Get in Touch',
    contactHref: '#contact',
  },

  heroConfig: {
    name: 'MAX ESCOBARI',
    roles: [
      'Senior IT Project Manager',
      'IT Solutions Architect',
      'ITIL Specialist',
      'Digital Transformation Leader',
      'Strategic Consultant',
    ],
    backgroundImage: '/images/maxHero.png',
  },

  aboutConfig: {
    label: 'ABOUT ME',
    headline: ['Senior IT Project Manager', 'IT Solutions Architect'],
    description:
      'Senior IT Project Manager with 25+ years leading mission-critical technology in banking, energy, healthcare, and social development. At the Central Bank of Bolivia, I led 33 professionals and the modernization of core financial platforms at 99.9% availability. At YPFB, I migrated a 30-year-old legacy financial system with no service interruption and cut critical incidents by 40%. Most recently, I served as Director of Systems & Strategic Initiatives for a US energy SaaS company (remote). ITIL 4 and Google Project Management certified, I bring structure, risk control, and clear executive communication to complex, regulated environments.',
    experienceValue: '25+',
    experienceLabel: 'Years of\nExperience',
    stats: [
      { value: '33', label: 'Professionals\nLed' },
      { value: '99.9%', label: 'Service\nAvailability' },
      { value: '40%', label: 'Fewer Critical\nIncidents' },
    ],
    bioImage: {
      src: '/images/maxBio.png',
      alt: 'Gabriel Max Antonio Escobari Quiroga — Senior IT Project Manager',
    },
    images: [
      { src: '/images/about-1.jpg', alt: 'Max Escobari working on technology solutions' },
      { src: '/images/about-2.jpg', alt: 'Leading development teams' },
      { src: '/images/about-3.jpg', alt: 'Strategic project analysis' },
      { src: '/images/about-4.jpg', alt: 'Executive advisory' },
    ],
  },

  institutionsConfig: {
    label: 'ORGANIZATIONS I HAVE WORKED WITH',
    items: [
      { name: 'Central Bank of Bolivia', logo: '/images/logos/bcb.png', initials: 'BCB' },
      { name: 'YPFB', logo: '/images/logos/ypfb.png', initials: 'YPFB' },
      { name: 'Cuna Association', logo: '/images/logos/cuna.png', initials: 'AC' },
      { name: 'Ministry of Development Planning (VIPFE)', logo: '/images/logos/vipfe.png', initials: 'VIPFE' },
      { name: 'PASA — Food Security', logo: '/images/logos/pasa.png', initials: 'PASA' },
      { name: 'JICA — Japanese Hospital', logo: '/images/logos/jica.png', initials: 'JICA' },
      { name: 'UNDP — Mother Earth Authority', logo: '/images/logos/pnud.png', initials: 'UNDP' },
    ],
  },

  servicesConfig: {
    label: 'EXPERTISE',
    heading: 'Areas of expertise',
    ctaText: "Let's talk",
    ctaHref: '#contact',
    services: [
      {
        categoryKey: 'arquitectura-de-soluciones',
        iconName: 'Network',
        title: 'Solutions Architecture',
        subtitle: 'Infrastructure',
        description:
          'Design and delivery of scalable technology architectures that ensure interoperability, security, and long-term sustainability. Focused on legacy system modernization and cloud migration.',
      },
      {
        categoryKey: 'desarrollo-de-software',
        iconName: 'Code2',
        title: 'Software Development',
        subtitle: 'Full-stack',
        description:
          'Technical leadership of full-stack projects with React, Angular, Node.js, Laravel, and Spring Boot. End-to-end software lifecycle management with a focus on quality and agile delivery.',
      },
      {
        categoryKey: 'gestion-de-proyectos-ti',
        iconName: 'KanbanSquare',
        title: 'IT Project Management',
        subtitle: 'Agile & PMBOK',
        description:
          'End-to-end leadership of technology projects using agile methods (Scrum, Kanban) and hybrid PMBOK approaches. Scope, schedule, cost, risk, and stakeholder management with clear, measurable executive reporting.',
      },
      {
        categoryKey: 'implementacion-itil',
        iconName: 'Settings2',
        title: 'ITIL Implementation',
        subtitle: 'Service Management',
        description:
          'IT service management best practices based on ITIL 4. Optimization of service desk, incident, problem, and change management to maximize availability and user satisfaction.',
      },
      {
        categoryKey: 'gemelos-digitales',
        iconName: 'Cpu',
        title: 'Digital Twins',
        subtitle: 'Simulation',
        description:
          'A digital twin helps anticipate failures and optimize operations in real time, reducing risk and cost in tangible ways.',
      },
      {
        categoryKey: 'ia-agentica',
        iconName: 'Bot',
        title: 'Agentic AI',
        subtitle: 'Automation',
        description:
          'Autonomous agents that speed up critical processes, execute tasks with full traceability, and free teams to focus on strategic decisions.',
      },
    ],
  },

  portfolioConfig: {
    label: 'PROJECTS',
    heading: 'Proven experience in strategic sectors',
    description:
      'For more than 25 years, I have led critical technology projects for leading public and private institutions, delivering measurable impact on operational efficiency, transparency, and business continuity.',
    projects: [
      { title: 'Central Bank Systems Modernization', category: 'Financial Sector', year: '2025', image: '/images/portfolio-1.jpg', featured: true },
      { title: 'YPFB Financial System Migration', category: 'Energy Sector', year: '2024', image: '/images/portfolio-2.jpg' },
      { title: 'SIAF — Japanese University Hospital', category: 'Healthcare', year: '2015', image: '/images/portfolio-3.jpg' },
      { title: 'Government Procurement Digital Platform', category: 'Public Sector', year: '2023', image: '/images/portfolio-4.jpg' },
      { title: 'Social Project Monitoring System', category: 'Social Development', year: '2014', image: '/images/portfolio-5.jpg' },
    ],
    cta: {
      label: 'HIRING?',
      heading: "Let's talk about your team's next technology initiative",
      linkText: 'Get in touch',
      linkHref: '#contact',
    },
    viewAllLabel: 'View all projects',
    cardText: {
      'modernizacion-banco-central': { title: 'Systems Modernization, Central Bank of Bolivia', sector: 'Banking / Finance' },
      'migracion-financiero-ypfb': { title: 'Financial System Migration, YPFB', sector: 'Energy' },
      'sisin-sisfin-inversion-publica': { title: 'SISIN/SISFIN — National Public Investment', sector: 'Public Sector' },
      'siaf-hospital-japones': { title: 'SIAF — Japanese University Hospital', sector: 'Healthcare' },
      'sispro-seguimiento-proyectos': { title: 'SISPRO — Project Monitoring', sector: 'Development / Government' },
      'monitoreo-evaluacion-cuna': { title: 'Monitoring & Evaluation System (M&E)', sector: 'Social Development' },
    },
  },

  testimonialsConfig: {
    label: 'TESTIMONIALS',
    heading: "What leaders I've worked with say",
    testimonials: [
      {
        quote:
          'Max Escobari led the design and implementation of SIAF at the Japanese University Hospital, coordinating staff training to ensure its sustainability. His strategic approach and ability to manage multidisciplinary teams were decisive in the success of the first hospital ERP to run over a LAN in Bolivia.',
        author: 'Toichiro ISO',
        role: 'Hospital Management Expert',
        company: 'JICA Japan',
        image: '/images/testimonial-1.jpg',
        rating: 5,
        translated: true,
      },
      {
        quote:
          "Max Escobari played a key role in DIGEMIG's technology transformation. His technical leadership was essential to creating and implementing Bolivia's Electronic Passport system, aligned with ICAO standards. Thanks to his solid experience managing large-scale projects, we achieved a secure, efficient system that consolidated our institutional modernization.",
        author: 'Mercedes URQUIOLA',
        role: 'Head of Systems',
        company: 'DIGEMIG – Ministry of Government, Bolivia',
        image: '/images/testimonial-2.jpg',
        rating: 5,
        translated: true,
      },
      {
        quote:
          'Max was my right hand — I placed my full trust in him to help navigate a very complex environment. He was loyal, committed, and always dependable. He is one of those rare individuals who not only generates ideas but also steps up at the right moment. He thinks outside the box and brings innovative solutions when they are most needed.',
        author: 'Paolo TOSELLI',
        role: 'Geo-Coordination for Brazil',
        company: 'European Commission',
        image: '/images/testimonial-3.jpg',
        rating: 5,
      },
      {
        quote:
          'Working with Max Escobari for almost five years was key to modernizing our management. He led the migration of our budget accounting system to a modern web platform and integrated it with our monitoring platform. His technical excellence, strategic leadership, and commitment to technology sustainability left a lasting impact on our organization.',
        author: 'Delsy MERINO',
        role: 'Executive Director',
        company: 'Cuna Association',
        image: '/images/testimonial-4.jpg',
        rating: 5,
        translated: true,
      },
    ],
  },

  ctaConfig: {
    tags: ['Senior IT Project Manager', 'Solutions Architect', 'ITIL Specialist', 'Digital Transformation Consultant'],
    heading: 'Looking for a senior technology leader for your team?',
    description:
      'Whether you need to modernize critical systems, adopt agile delivery, or lead an end-to-end digital transformation, I bring the experience and certifications to make it succeed. Open to remote roles.',
    buttonText: 'Start a conversation',
    buttonHref: 'mailto:maxescob@hotmail.com',
    email: 'maxescob@hotmail.com',
    backgroundImage: '/images/cta-bg.jpg',
  },

  footerConfig: {
    logo: 'MAX ESCOBARI',
    description:
      'Senior IT Project Manager specializing in strategic technology projects, digital transformation, and ITIL best practices. 25+ years delivering measurable results in critical sectors.',
    columns: [
      {
        title: 'Services',
        links: [
          { label: 'Solutions Architecture', href: '#services' },
          { label: 'Software Development', href: '#services' },
          { label: 'IT Project Management', href: '#services' },
          { label: 'ITIL Implementation', href: '#services' },
        ],
      },
      {
        title: 'Experience',
        links: [
          { label: 'Financial Sector', href: '#portfolio' },
          { label: 'Energy Sector', href: '#portfolio' },
          { label: 'Healthcare', href: '#portfolio' },
          { label: 'Public Sector', href: '#portfolio' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Tech Blog', href: '/blog' },
          { label: 'Publications', href: '#publications' },
          { label: 'Certifications', href: '#about' },
          { label: 'Success Stories', href: '#portfolio' },
        ],
      },
    ],
    socialLinks: [
      { iconName: 'Linkedin', href: 'https://www.linkedin.com/in/max-escobari-2439a840/', label: 'LinkedIn' },
      { iconName: 'Github', href: 'https://github.com/mescobari', label: 'GitHub' },
      { iconName: 'Mail', href: 'mailto:maxescob@hotmail.com', label: 'Email' },
    ],
    newsletterHeading: 'Stay updated',
    newsletterDescription: 'Subscribe for technical articles, project management insights, and IT industry news.',
    newsletterButtonText: 'Subscribe',
    newsletterPlaceholder: 'your@email.com',
    copyright: '© 2025 Max Escobari. All rights reserved.',
    credit: 'Designed with technical precision and strategic vision',
  },

  uiText: {
    loading: 'Loading',
    toggleMenu: 'Toggle menu',
    languageSwitcherLabel: 'Language',
    heroBackgroundAlt: 'Hero background',
    carouselRoleDescription: 'carousel',
    carouselLabel: 'Areas of expertise — auto-rotating, hover to pause',
    previous: 'Previous',
    next: 'Next',
    goToTestimonial: 'Go to testimonial',
    previousTestimonial: 'Previous testimonial',
    nextTestimonial: 'Next testimonial',
    translatedNote: 'Translated from Spanish',
    institutionsFallbackLabel: 'Organizations I have worked with',
    ctaBackgroundAlt: 'Background',
  },
};
