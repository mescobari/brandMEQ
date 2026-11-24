// Spanish content (selectable locale). Same shape as en.ts.
import type { SiteContent } from './types';

export const es: SiteContent = {
  siteConfig: {
    language: 'es',
    title: 'Max Escobari | Project Manager Senior en TI | Arquitecto de Soluciones | ITIL',
    description:
      'Project Manager Senior con más de 25 años de experiencia liderando proyectos tecnológicos estratégicos en banca, energía, salud y desarrollo social. Especialista en ITIL, transformación digital y arquitectura de soluciones.',
  },

  navigationConfig: {
    logo: 'MAX ESCOBARI',
    links: [
      { label: 'Inicio', href: '#hero' },
      { label: 'Sobre Mí', href: '#about' },
      { label: 'Servicios', href: '#services' },
      { label: 'Proyectos', href: '#portfolio' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contacto', href: '#contact' },
    ],
    contactLabel: 'Agendar Consulta',
    contactHref: '#contact',
  },

  heroConfig: {
    name: 'MAX ESCOBARI',
    roles: [
      'Project Manager Senior',
      'Arquitecto de Soluciones TI',
      'Especialista ITIL',
      'Líder de Transformación Digital',
      'Consultor Estratégico',
    ],
    backgroundImage: '/images/maxHero.png',
  },

  aboutConfig: {
    label: 'SOBRE MÍ',
    headline: ['Project Manager Senior', 'Arquitecto de Soluciones TI'],
    description:
      'Soy Gabriel Max Antonio Escobari Quiroga, Project Manager Senior con más de 25 años de experiencia liderando proyectos tecnológicos estratégicos en sectores críticos como banca, energía, salud y desarrollo social. Mi trayectoria incluye la dirección de iniciativas de transformación digital en el Banco Central de Bolivia y YPFB, donde he demostrado capacidad para gestionar equipos multidisciplinarios, mitigar riesgos operativos y garantizar la continuidad del negocio en entornos altamente regulados. Como especialista certificado en ITIL 4 y Google Project Management, combino metodologías ágiles con enfoques híbridos para entregar soluciones que generan impacto medible en la eficiencia operativa y la trazabilidad organizacional.',
    experienceValue: '25+',
    experienceLabel: 'Años de\nExperiencia',
    stats: [
      { value: '33', label: 'Profesionales\nLiderados' },
      { value: '99.9%', label: 'Disponibilidad\nde Servicios' },
      { value: '40%', label: 'Reducción de\nIncidentes' },
    ],
    bioImage: {
      src: '/images/maxBio.png',
      alt: 'Gabriel Max Antonio Escobari Quiroga — Project Manager Senior en TI',
    },
    images: [
      { src: '/images/about-1.jpg', alt: 'Max Escobari trabajando en soluciones tecnológicas' },
      { src: '/images/about-2.jpg', alt: 'Liderando equipos de desarrollo' },
      { src: '/images/about-3.jpg', alt: 'Análisis estratégico de proyectos' },
      { src: '/images/about-4.jpg', alt: 'Consultoría ejecutiva' },
    ],
  },

  institutionsConfig: {
    label: 'INSTITUCIONES CON LAS QUE HE TRABAJADO',
    items: [
      { name: 'Banco Central de Bolivia', logo: '/images/logos/bcb.png', initials: 'BCB' },
      { name: 'YPFB', logo: '/images/logos/ypfb.png', initials: 'YPFB' },
      { name: 'Asociación Cuna', logo: '/images/logos/cuna.png', initials: 'AC' },
      { name: 'Ministerio de Planificación del Desarrollo (VIPFE)', logo: '/images/logos/vipfe.png', initials: 'VIPFE' },
      { name: 'PASA — Seguridad Alimentaria', logo: '/images/logos/pasa.png', initials: 'PASA' },
      { name: 'JICA — Hospital Japonés', logo: '/images/logos/jica.png', initials: 'JICA' },
      { name: 'PNUD — Autoridad de la Madre Tierra', logo: '/images/logos/pnud.png', initials: 'PNUD' },
    ],
  },

  servicesConfig: {
    label: 'ESPECIALIDADES',
    heading: 'Áreas de especialización',
    ctaText: 'Hablemos',
    ctaHref: '#contact',
    services: [
      {
        categoryKey: 'arquitectura-de-soluciones',
        iconName: 'Network',
        title: 'Arquitectura de Soluciones',
        subtitle: 'Infraestructura',
        description:
          'Diseño e implementación de arquitecturas tecnológicas escalables que garantizan interoperabilidad, seguridad y sostenibilidad a largo plazo. Especializado en la modernización de sistemas heredados y migración a infraestructuras cloud.',
      },
      {
        categoryKey: 'desarrollo-de-software',
        iconName: 'Code2',
        title: 'Desarrollo de Software',
        subtitle: 'Full-stack',
        description:
          'Liderazgo técnico en proyectos de desarrollo full-stack utilizando tecnologías modernas como React, Angular, Node.js, Laravel y Spring Boot. Gestión completa del ciclo de vida del software con enfoque en calidad y entregas ágiles.',
      },
      {
        categoryKey: 'gestion-de-proyectos-ti',
        iconName: 'KanbanSquare',
        title: 'Gestión de Proyectos TI',
        subtitle: 'Ágil & PMBOK',
        description:
          'Dirección integral de proyectos tecnológicos aplicando metodologías ágiles (Scrum, Kanban) y enfoques híbridos PMBOK. Gestión de alcance, tiempo, costos, riesgos y stakeholders con reportes ejecutivos claros y medibles.',
      },
      {
        categoryKey: 'implementacion-itil',
        iconName: 'Settings2',
        title: 'Implementación ITIL',
        subtitle: 'Gestión de Servicios',
        description:
          'Implementación de mejores prácticas en gestión de servicios de TI según el marco ITIL 4. Optimización de procesos de service desk, gestión de incidentes, problemas y cambios para maximizar la disponibilidad y satisfacción del usuario.',
      },
      {
        categoryKey: 'gemelos-digitales',
        iconName: 'Cpu',
        title: 'Gemelos Digitales',
        subtitle: 'Simulación',
        description:
          'Un gemelo digital permite anticipar fallas y optimizar operaciones en tiempo real, reduciendo riesgos y costos de manera tangible.',
      },
      {
        categoryKey: 'ia-agentica',
        iconName: 'Bot',
        title: 'IA Agéntica',
        subtitle: 'Automatización',
        description:
          'Agentes autónomos que aceleran procesos críticos, ejecutan tareas con trazabilidad y liberan a los equipos para decisiones estratégicas.',
      },
    ],
  },

  portfolioConfig: {
    label: 'PROYECTOS',
    heading: 'Experiencia comprobada en sectores estratégicos',
    description:
      'A lo largo de más de 25 años, he liderado proyectos tecnológicos críticos en instituciones públicas y privadas de primer nivel, generando impacto medible en eficiencia operativa, transparencia y continuidad del negocio.',
    projects: [
      { title: 'Modernización Sistemas Banco Central', category: 'Sector Financiero', year: '2025', image: '/images/portfolio-1.jpg', featured: true },
      { title: 'Migración Sistema Financiero YPFB', category: 'Sector Energético', year: '2024', image: '/images/portfolio-2.jpg' },
      { title: 'SIAF Hospital Universitario Japonés', category: 'Sector Salud', year: '2015', image: '/images/portfolio-3.jpg' },
      { title: 'Plataforma Digital de Compras Estatales', category: 'Sector Público', year: '2023', image: '/images/portfolio-4.jpg' },
      { title: 'Sistema Monitoreo Proyectos Sociales', category: 'Desarrollo Social', year: '2014', image: '/images/portfolio-5.jpg' },
    ],
    cta: {
      label: '¿TIENE UN PROYECTO?',
      heading: 'Hablemos sobre su iniciativa tecnológica',
      linkText: 'Agendar consulta gratuita',
      linkHref: '#contact',
    },
    viewAllLabel: 'Ver todos los proyectos',
  },

  testimonialsConfig: {
    label: 'TESTIMONIOS',
    heading: 'Lo que dicen los líderes con los que he colaborado',
    testimonials: [
      {
        quote:
          'Max Escobari lideró el diseño e implementación del SIAF en el Hospital Universitario Japonés, coordinando la capacitación del personal para asegurar su sostenibilidad. Su enfoque estratégico y su habilidad para gestionar equipos multidisciplinarios fueron determinantes en el éxito del primer ERP hospitalario en operar sobre una red LAN en Bolivia.',
        author: 'Toichiro ISO',
        role: 'Experto en Gestión Hospitalaria',
        company: 'JICA Japón',
        image: '/images/testimonial-1.jpg',
        rating: 5,
      },
      {
        quote:
          'El Ing. Max Escobari desempeñó un papel clave en la transformación tecnológica de la DIGEMIG. Su liderazgo técnico fue esencial para la creación e implementación del sistema de Pasaportes Electrónicos de Bolivia, alineado con las normativas de la OACI. Gracias a su sólida experiencia en gestión de proyectos de gran escala, se logró un sistema seguro y eficiente que consolidó la modernización institucional.',
        author: 'Mercedes URQUIOLA',
        role: 'Responsable de Sistemas',
        company: 'DIGEMIG – Ministerio de Gobierno, Bolivia',
        image: '/images/testimonial-2.jpg',
        rating: 5,
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
          'Trabajar con Max Escobari durante casi cinco años fue clave para la modernización de nuestra gestión. Lideró la migración de nuestro sistema contable presupuestario a una plataforma web moderna, e integró el sistema contable con nuestra plataforma de monitoreo. Su excelencia técnica, liderazgo estratégico y compromiso con la sostenibilidad tecnológica dejaron un impacto duradero en nuestra organización.',
        author: 'Delsy MERINO',
        role: 'Directora Ejecutiva',
        company: 'Asociación CUNA',
        image: '/images/testimonial-4.jpg',
        rating: 5,
      },
    ],
  },

  ctaConfig: {
    tags: ['Project Manager Senior', 'Arquitecto de Soluciones', 'Especialista ITIL', 'Consultor en Transformación Digital'],
    heading: 'Transforme su organización con liderazgo tecnológico experto',
    description:
      'Ya sea que necesite modernizar sistemas críticos, implementar metodologías ágiles o liderar una transformación digital integral, cuento con la experiencia y las certificaciones necesarias para garantizar el éxito de su iniciativa.',
    buttonText: 'Iniciar conversación',
    buttonHref: 'mailto:maxescob@hotmail.com',
    email: 'maxescob@hotmail.com',
    backgroundImage: '/images/cta-bg.jpg',
  },

  footerConfig: {
    logo: 'MAX ESCOBARI',
    description:
      'Project Manager Senior especializado en liderar proyectos tecnológicos estratégicos, transformación digital e implementación de mejores prácticas ITIL. Más de 25 años de experiencia generando resultados medibles en sectores críticos.',
    columns: [
      {
        title: 'Servicios',
        links: [
          { label: 'Arquitectura de Soluciones', href: '#services' },
          { label: 'Desarrollo de Software', href: '#services' },
          { label: 'Gestión de Proyectos TI', href: '#services' },
          { label: 'Implementación ITIL', href: '#services' },
        ],
      },
      {
        title: 'Experiencia',
        links: [
          { label: 'Sector Financiero', href: '#portfolio' },
          { label: 'Sector Energético', href: '#portfolio' },
          { label: 'Sector Salud', href: '#portfolio' },
          { label: 'Sector Público', href: '#portfolio' },
        ],
      },
      {
        title: 'Recursos',
        links: [
          { label: 'Blog Técnico', href: '/blog' },
          { label: 'Publicaciones', href: '#publications' },
          { label: 'Certificaciones', href: '#about' },
          { label: 'Casos de Éxito', href: '#portfolio' },
        ],
      },
    ],
    socialLinks: [
      { iconName: 'Linkedin', href: 'https://www.linkedin.com/in/max-escobari-2439a840/', label: 'LinkedIn' },
      { iconName: 'Github', href: 'https://github.com/mescobari', label: 'GitHub' },
      { iconName: 'Mail', href: 'mailto:maxescob@hotmail.com', label: 'Email' },
    ],
    newsletterHeading: 'Manténgase actualizado',
    newsletterDescription:
      'Suscríbase para recibir artículos técnicos, insights sobre gestión de proyectos y novedades del sector TI.',
    newsletterButtonText: 'Suscribirse',
    newsletterPlaceholder: 'su@email.com',
    copyright: '© {year} Max Escobari. Todos los derechos reservados.',
    credit: 'Diseñado con precisión técnica y visión estratégica',
  },

  uiText: {
    loading: 'Cargando',
    toggleMenu: 'Abrir o cerrar menú',
    languageSwitcherLabel: 'Idioma',
    heroBackgroundAlt: 'Fondo del hero',
    carouselRoleDescription: 'carrusel',
    carouselLabel: 'Especialidades — rotación automática, pase el cursor para pausar',
    previous: 'Anterior',
    next: 'Siguiente',
    goToTestimonial: 'Ir al testimonio',
    previousTestimonial: 'Testimonio anterior',
    nextTestimonial: 'Siguiente testimonio',
    translatedNote: 'Traducido del inglés',
    institutionsFallbackLabel: 'Instituciones con las que he trabajado',
    ctaBackgroundAlt: 'Fondo',
  },

  projectsPage: {
    metaTitle: 'Proyectos · Max Escobari',
    metaDescription:
      'Proyectos tecnológicos estratégicos liderados por Max Escobari en banca, energía, salud, sector público y desarrollo social.',
    label: 'PROYECTOS',
    heading: 'Trayectoria de proyectos',
    intro:
      'Sistemas de misión crítica, migraciones de sistemas heredados y plataformas nacionales de seguimiento. Cada caso cuenta el contexto, el reto, cómo se ejecutó el trabajo y los resultados.',
    statYears: 'Años de experiencia',
    statProjects: 'Proyectos destacados',
    statCountries: 'Países involucrados',
    viewCaseStudy: 'Ver caso de estudio',
    breadcrumbHome: 'Inicio',
    breadcrumbProjects: 'Proyectos',
    institution: 'Institución',
    period: 'Periodo',
    role: 'Rol',
    sector: 'Sector',
    impactLabel: 'IMPACTO',
    impactHeading: 'Resultados que importaron',
    storyLabel: 'LA HISTORIA',
    contextLabel: 'Contexto',
    challengeLabel: 'El reto',
    solutionLabel: 'La solución',
    approachLabel: 'ENFOQUE DE EJECUCIÓN',
    approachHeading: 'Cómo se ejecutó el trabajo',
    roleLabel: 'Mi rol',
    outcomesLabel: 'Logros clave',
    galleryLabel: 'GALERÍA',
    capabilitiesLabel: 'Capacidades',
    stackLabel: 'Herramientas y métodos',
    photoNote: 'Fotos ilustrativas · Unsplash',
    openImage: 'Abrir imagen',
    closeImage: 'Cerrar imagen',
    ctaLabel: '¿CONTRATANDO?',
    ctaHeading: '¿Tu equipo enfrenta un reto similar?',
    ctaText:
      'Aporto estructura, control de riesgos y comunicación ejecutiva clara en entornos complejos y regulados. Disponible para roles remotos.',
    ctaPrimary: 'Contáctame',
    previous: 'Proyecto anterior',
    next: 'Siguiente proyecto',
    allProjects: 'Todos los proyectos',
    notFound: 'Proyecto no encontrado',
  },
};
