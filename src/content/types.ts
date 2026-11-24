// Shared content types. Every locale file (en.ts, es.ts) exports one SiteContent.

export type Locale = 'en' | 'es';

export interface SiteConfig {
  language: Locale;
  title: string;
  description: string;
}

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

export interface HeroConfig {
  name: string;
  roles: string[];
  backgroundImage: string;
}

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
  headline: [string, string];
  description: string;
  experienceValue: string;
  experienceLabel: string;
  stats: AboutStat[];
  bioImage: AboutImage;
  images: AboutImage[];
}

export interface Institution {
  name: string;
  logo: string;
  initials: string;
}

export interface InstitutionsConfig {
  label: string;
  items: Institution[];
}

export interface ServiceItem {
  /** Stable, locale-independent id. Equals the blog category slug (slugify of the Spanish title). */
  categoryKey: string;
  iconName: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface ServicesConfig {
  label: string;
  heading: string;
  ctaText: string;
  ctaHref: string;
  services: ServiceItem[];
}

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

export interface ProjectCardText {
  title: string;
  sector: string;
}

export interface PortfolioConfig {
  label: string;
  heading: string;
  description: string;
  projects: ProjectItem[];
  cta: PortfolioCTA;
  viewAllLabel: string;
  /** Optional per-locale card text for the home grid, keyed by project slug (src/data/projects.ts). */
  cardText: Record<string, ProjectCardText>;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  /** True when the quote shown is a translation of the original. */
  translated?: boolean;
}

export interface TestimonialsConfig {
  label: string;
  heading: string;
  testimonials: TestimonialItem[];
}

export interface CTAConfig {
  tags: string[];
  heading: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  email: string;
  backgroundImage: string;
}

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

/** Small UI strings that used to be hard-coded inside components. */
export interface UiText {
  loading: string;
  toggleMenu: string;
  languageSwitcherLabel: string;
  heroBackgroundAlt: string;
  carouselRoleDescription: string;
  carouselLabel: string;
  previous: string;
  next: string;
  goToTestimonial: string;
  previousTestimonial: string;
  nextTestimonial: string;
  translatedNote: string;
  institutionsFallbackLabel: string;
  ctaBackgroundAlt: string;
}

export interface SiteContent {
  siteConfig: SiteConfig;
  navigationConfig: NavigationConfig;
  heroConfig: HeroConfig;
  aboutConfig: AboutConfig;
  institutionsConfig: InstitutionsConfig;
  servicesConfig: ServicesConfig;
  portfolioConfig: PortfolioConfig;
  testimonialsConfig: TestimonialsConfig;
  ctaConfig: CTAConfig;
  footerConfig: FooterConfig;
  uiText: UiText;
}
