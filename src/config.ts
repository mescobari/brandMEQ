// Site configuration for Max Escobari - Senior IT Project Manager
// Professional personal brand website

export interface SiteConfig {
  language: string;
  title: string;
  description: string;
}

export const siteConfig: SiteConfig = {
  language: "es",
  title: "Max Escobari | Project Manager Senior en TI | Arquitecto de Soluciones | ITIL",
  description: "Project Manager Senior con más de 25 años de experiencia liderando proyectos tecnológicos estratégicos en banca, energía, salud y desarrollo social. Especialista en ITIL, transformación digital y arquitectura de soluciones.",
};

// Navigation configuration
export interface NavLink {
  label: string;
  href: string;
}

export interface NavigationConfig {
  logo: string;
  links: NavLink[];
  contactLabel: string;
  contactHref: string;
}

export const navigationConfig: NavigationConfig = {
  logo: "MAX ESCOBARI",
  links: [
    { label: "Inicio", href: "#hero" },
    { label: "Sobre Mí", href: "#about" },
    { label: "Servicios", href: "#services" },
    { label: "Proyectos", href: "#portfolio" },
    { label: "Blog", href: "#blog" },
    { label: "Contacto", href: "#contact" },
  ],
  contactLabel: "Agendar Consulta",
  contactHref: "#contact",
};

// Hero section configuration
export interface HeroConfig {
  name: string;
  roles: string[];
  backgroundImage: string;
}

export const heroConfig: HeroConfig = {
  name: "MAX ESCOBARI",
  roles: [
    "Project Manager Senior",
    "Arquitecto de Soluciones TI",
    "Especialista ITIL",
    "Líder de Transformación Digital",
    "Consultor Estratégico",
  ],
  backgroundImage: "/images/hero-bg.jpg",
};

// About section configuration
export interface AboutStat {
  value: string;
  label: string;
}

export interface AboutImage {
  src: string;
  alt: string;
}

export interface AboutConfig {
  label: string;
  description: string;
  experienceValue: string;
  experienceLabel: string;
  stats: AboutStat[];
  images: AboutImage[];
}

export const aboutConfig: AboutConfig = {
  label: "SOBRE MÍ",
  description: "Soy Gabriel Max Antonio Escobari Quiroga, Project Manager Senior con más de 25 años de experiencia liderando proyectos tecnológicos estratégicos en sectores críticos como banca, energía, salud y desarrollo social. Mi trayectoria incluye la dirección de iniciativas de transformación digital en el Banco Central de Bolivia y YPFB, donde he demostrado capacidad para gestionar equipos multidisciplinarios, mitigar riesgos operativos y garantizar la continuidad del negocio en entornos altamente regulados. Como especialista certificado en ITIL 4 y Google Project Management, combino metodologías ágiles con enfoques híbridos para entregar soluciones que generan impacto medible en la eficiencia operativa y la trazabilidad organizacional.",
  experienceValue: "25+",
  experienceLabel: "Años de\nExperiencia",
  stats: [
    { value: "50+", label: "Proyectos\nEntregados" },
    { value: "99.9%", label: "Disponibilidad\nde Servicios" },
    { value: "40%", label: "Reducción de\nIncidentes" },
  ],
  images: [
    { src: "/images/about-1.jpg", alt: "Max Escobari trabajando en soluciones tecnológicas" },
    { src: "/images/about-2.jpg", alt: "Liderando equipos de desarrollo" },
    { src: "/images/about-3.jpg", alt: "Análisis estratégico de proyectos" },
    { src: "/images/about-4.jpg", alt: "Consultoría ejecutiva" },
  ],
};

// Services section configuration
export interface ServiceItem {
  iconName: string;
  title: string;
  description: string;
  image: string;
}

export interface ServicesConfig {
  label: string;
  heading: string;
  services: ServiceItem[];
}

export const servicesConfig: ServicesConfig = {
  label: "SERVICIOS",
  heading: "Soluciones tecnológicas estratégicas para la transformación digital de su organización",
  services: [
    {
      iconName: "Layout",
      title: "Arquitectura de Soluciones",
      description: "Diseño e implementación de arquitecturas tecnológicas escalables que garantizan interoperabilidad, seguridad y sostenibilidad a largo plazo. Especializado en la modernización de sistemas heredados y migración a infraestructuras cloud.",
      image: "/images/service-1.jpg",
    },
    {
      iconName: "Code",
      title: "Desarrollo de Software",
      description: "Liderazgo técnico en proyectos de desarrollo full-stack utilizando tecnologías modernas como React, Angular, Node.js, Laravel y Spring Boot. Gestión completa del ciclo de vida del software con enfoque en calidad y entregas ágiles.",
      image: "/images/service-2.jpg",
    },
    {
      iconName: "Kanban",
      title: "Gestión de Proyectos TI",
      description: "Dirección integral de proyectos tecnológicos aplicando metodologías ágiles (Scrum, Kanban) y enfoques híbridos PMBOK. Gestión de alcance, tiempo, costos, riesgos y stakeholders con reportes ejecutivos claros y medibles.",
      image: "/images/service-3.jpg",
    },
    {
      iconName: "CheckCircle",
      title: "Implementación ITIL",
      description: "Implementación de mejores prácticas en gestión de servicios de TI según el marco ITIL 4. Optimización de procesos de service desk, gestión de incidentes, problemas y cambios para maximizar la disponibilidad y satisfacción del usuario.",
      image: "/images/service-4.jpg",
    },
  ],
};

// Portfolio section configuration
export interface ProjectItem {
  title: string;
  category: string;
  year: string;
  image: string;
  featured?: boolean;
}

export interface PortfolioCTA {
  label: string;
  heading: string;
  linkText: string;
  linkHref: string;
}

export interface PortfolioConfig {
  label: string;
  heading: string;
  description: string;
  projects: ProjectItem[];
  cta: PortfolioCTA;
  viewAllLabel: string;
}

export const portfolioConfig: PortfolioConfig = {
  label: "PROYECTOS",
  heading: "Experiencia comprobada en sectores estratégicos",
  description: "A lo largo de más de 25 años, he liderado proyectos tecnológicos críticos en instituciones públicas y privadas de primer nivel, generando impacto medible en eficiencia operativa, transparencia y continuidad del negocio.",
  projects: [
    {
      title: "Modernización Sistemas Banco Central",
      category: "Sector Financiero",
      year: "2025",
      image: "/images/portfolio-1.jpg",
      featured: true,
    },
    {
      title: "Migración Sistema Financiero YPFB",
      category: "Sector Energético",
      year: "2024",
      image: "/images/portfolio-2.jpg",
    },
    {
      title: "SIAF Hospital Universitario Japonés",
      category: "Sector Salud",
      year: "2015",
      image: "/images/portfolio-3.jpg",
    },
    {
      title: "Plataforma Digital de Compras Estatales",
      category: "Sector Público",
      year: "2023",
      image: "/images/portfolio-4.jpg",
    },
    {
      title: "Sistema Monitoreo Proyectos Sociales",
      category: "Desarrollo Social",
      year: "2014",
      image: "/images/portfolio-5.jpg",
    },
  ],
  cta: {
    label: "¿TIENE UN PROYECTO?",
    heading: "Hablemos sobre su iniciativa tecnológica",
    linkText: "Agendar consulta gratuita",
    linkHref: "#contact",
  },
  viewAllLabel: "Ver todos los proyectos",
};

// Testimonials section configuration
export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
  rating: number;
}

export interface TestimonialsConfig {
  label: string;
  heading: string;
  testimonials: TestimonialItem[];
}

export const testimonialsConfig: TestimonialsConfig = {
  label: "TESTIMONIOS",
  heading: "Lo que dicen los líderes con los que he colaborado",
  testimonials: [
    {
      quote: "La implementación del SIAF en nuestro hospital transformó completamente nuestra gestión financiera. Max demostró un dominio excepcional tanto de los aspectos técnicos como de los procesos institucionales, logrando una interoperabilidad que sentó las bases para el sistema oficial de gestión hospitalaria en Bolivia.",
      author: "Lic. Toichiro Iso",
      role: "Representante de Cooperación",
      company: "JICA Japón",
      image: "/images/testimonial-1.jpg",
      rating: 5,
    },
    {
      quote: "Max lideró la migración de nuestro sistema financiero heredado de 30 años con una precisión técnica y una gestión de riesgos ejemplar. Su capacidad para coordinar equipos multidisciplinarios y mantener la continuidad operativa durante la transición fue fundamental para el éxito del proyecto.",
      author: "Ing. Luis Fernando Guzmán",
      role: "Director de Tecnología",
      company: "ATI Unión Europea",
      image: "/images/testimonial-2.jpg",
      rating: 5,
    },
    {
      quote: "Su experiencia en la gestión de proyectos tecnológicos para el desarrollo social ha sido invaluable. Los sistemas de monitoreo que implementó mejoraron nuestra trazabilidad operativa en más del 50%, permitiéndonos tomar decisiones basadas en datos en tiempo real.",
      author: "Lic. Delsy Merino Vargas",
      role: "Directora Ejecutiva",
      company: "Asociación Cuna",
      image: "/images/testimonial-3.jpg",
      rating: 5,
    },
  ],
};

// CTA section configuration
export interface CTAConfig {
  tags: string[];
  heading: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  email: string;
  backgroundImage: string;
}

export const ctaConfig: CTAConfig = {
  tags: [
    "Project Manager Senior",
    "Arquitecto de Soluciones",
    "Especialista ITIL",
    "Consultor en Transformación Digital",
  ],
  heading: "Transforme su organización con liderazgo tecnológico experto",
  description: "Ya sea que necesite modernizar sistemas críticos, implementar metodologías ágiles o liderar una transformación digital integral, cuento con la experiencia y las certificaciones necesarias para garantizar el éxito de su iniciativa.",
  buttonText: "Iniciar conversación",
  buttonHref: "mailto:maxescob@hotmail.com",
  email: "maxescob@hotmail.com",
  backgroundImage: "/images/cta-bg.jpg",
};

// Footer section configuration
export interface FooterLinkColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface SocialLink {
  iconName: string;
  href: string;
  label: string;
}

export interface FooterConfig {
  logo: string;
  description: string;
  columns: FooterLinkColumn[];
  socialLinks: SocialLink[];
  newsletterHeading: string;
  newsletterDescription: string;
  newsletterButtonText: string;
  newsletterPlaceholder: string;
  copyright: string;
  credit: string;
}

export const footerConfig: FooterConfig = {
  logo: "MAX ESCOBARI",
  description: "Project Manager Senior especializado en liderar proyectos tecnológicos estratégicos, transformación digital e implementación de mejores prácticas ITIL. Más de 25 años de experiencia generando resultados medibles en sectores críticos.",
  columns: [
    {
      title: "Servicios",
      links: [
        { label: "Arquitectura de Soluciones", href: "#services" },
        { label: "Desarrollo de Software", href: "#services" },
        { label: "Gestión de Proyectos TI", href: "#services" },
        { label: "Implementación ITIL", href: "#services" },
      ],
    },
    {
      title: "Experiencia",
      links: [
        { label: "Sector Financiero", href: "#portfolio" },
        { label: "Sector Energético", href: "#portfolio" },
        { label: "Sector Salud", href: "#portfolio" },
        { label: "Sector Público", href: "#portfolio" },
      ],
    },
    {
      title: "Recursos",
      links: [
        { label: "Blog Técnico", href: "#blog" },
        { label: "Publicaciones", href: "#publications" },
        { label: "Certificaciones", href: "#about" },
        { label: "Casos de Éxito", href: "#portfolio" },
      ],
    },
  ],
  socialLinks: [
    { iconName: "Linkedin", href: "https://www.linkedin.com/in/max-escobari-2439a840/", label: "LinkedIn" },
    { iconName: "Github", href: "https://github.com/mescobari", label: "GitHub" },
    { iconName: "Mail", href: "mailto:maxescob@hotmail.com", label: "Email" },
  ],
  newsletterHeading: "Manténgase actualizado",
  newsletterDescription: "Suscríbase para recibir artículos técnicos, insights sobre gestión de proyectos y novedades del sector TI.",
  newsletterButtonText: "Suscribirse",
  newsletterPlaceholder: "su@email.com",
  copyright: "© 2025 Max Escobari. Todos los derechos reservados.",
  credit: "Diseñado con precisión técnica y visión estratégica",
};
