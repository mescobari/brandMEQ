// ─── Projects — single source of truth (grid + individual case-study pages) ───

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ProjectImages {
  cover: string;
  gallery: string[];
}

export interface Project {
  slug: string;
  titulo: string;
  resumen: string;
  institucion: string;
  sector: string;
  anio: string; // badge year (short)
  periodo: string; // full range for the case study
  rol: string;
  reto: string;
  solucion: string;
  resultados: ProjectMetric[];
  logros: string[];
  stack: string[];
  imagenes: ProjectImages;
  size: 'large' | 'small';
}

// Brand-spectrum gradients used for placeholders / accents (by project order).
export const PROJECT_GRADIENTS = [
  'linear-gradient(150deg, #0EA5A5 0%, #3B82F6 100%)',
  'linear-gradient(150deg, #3B82F6 0%, #6366F1 100%)',
  'linear-gradient(150deg, #6366F1 0%, #8B5CF6 100%)',
  'linear-gradient(150deg, #0E7490 0%, #2DD4C4 100%)',
  'linear-gradient(150deg, #7C3AED 0%, #9333EA 100%)',
  'linear-gradient(150deg, #2DD4C4 0%, #3B82F6 100%)',
];

const img = (slug: string): ProjectImages => ({
  cover: `/images/proyectos/${slug}/cover.jpg`,
  gallery: [
    `/images/proyectos/${slug}/gallery-1.jpg`,
    `/images/proyectos/${slug}/gallery-2.jpg`,
    `/images/proyectos/${slug}/gallery-3.jpg`,
  ],
});

export const projects: Project[] = [
  {
    slug: 'modernizacion-banco-central',
    titulo: 'Modernización de Sistemas, Banco Central de Bolivia',
    resumen:
      'Continuidad y resiliencia de sistemas de misión crítica que respaldan la infraestructura financiera nacional.',
    institucion: 'Banco Central de Bolivia',
    sector: 'Banca / Financiero',
    anio: '2025',
    periodo: '2025',
    rol: 'Subgerente de Sistemas de Información / Senior Project Manager',
    reto:
      'Garantizar la continuidad operativa, el cumplimiento normativo y la resiliencia de sistemas de misión crítica que respaldan la infraestructura financiera nacional, bajo fuerte presión operativa y de auditoría.',
    solucion:
      'Lideró la planificación y ejecución de iniciativas tecnológicas de alto riesgo, coordinando a 33 profesionales en desarrollo, operaciones y QA. Dirigió la modernización de plataformas financieras clave: gestión de deuda externa, sistemas de pagos minoristas y mensajería financiera internacional.',
    resultados: [
      { value: '99.9%', label: 'Disponibilidad del servicio' },
      { value: '33', label: 'Profesionales liderados' },
      { value: '−Riesgo', label: 'Operativo y regulatorio' },
    ],
    logros: [
      'Reducción del riesgo operativo y regulatorio en sistemas de misión crítica.',
      'Optimización de los tiempos de procesamiento.',
      'Modernización de plataformas de deuda externa, pagos minoristas y mensajería internacional.',
    ],
    stack: ['Sistemas financieros de misión crítica', 'Gestión de riesgos TI', 'Continuidad de negocio', 'ITIL 4'],
    imagenes: img('modernizacion-banco-central'),
    size: 'large',
  },
  {
    slug: 'migracion-financiero-ypfb',
    titulo: 'Migración Sistema Financiero, YPFB',
    resumen:
      'Migración de un sistema financiero heredado de 30 años sin interrupción del servicio en una organización energética estratégica.',
    institucion: 'YPFB — Yacimientos Petrolíferos Fiscales Bolivianos',
    sector: 'Energético',
    anio: '2024',
    periodo: '2023 – 2024',
    rol: 'Director de Soluciones Corporativas / Project Manager TI',
    reto:
      'Migrar un sistema financiero heredado de 30 años de antigüedad sin interrupción del servicio, en una de las organizaciones energéticas más importantes del país, con restricciones regulatorias y múltiples proveedores.',
    solucion:
      'Aplicó una estrategia estructurada de gestión de riesgos y transición; diseñó e implementó plataformas digitales empresariales; supervisó la adopción de arquitecturas de sistemas modernas, mejorando la interoperabilidad.',
    resultados: [
      { value: '+50%', label: 'Transparencia y trazabilidad en compras' },
      { value: '−40%', label: 'Incidentes críticos' },
      { value: '0', label: 'Downtime en la migración' },
    ],
    logros: [
      'Continuidad del negocio garantizada durante toda la transición.',
      'Adopción de arquitecturas modernas e interoperables.',
    ],
    stack: ['Arquitecturas modernas', 'Plataformas empresariales', 'Gestión de riesgos', 'Migración de legacy'],
    imagenes: img('migracion-financiero-ypfb'),
    size: 'small',
  },
  {
    slug: 'sisin-sisfin-inversion-publica',
    titulo: 'SISIN/SISFIN — Inversión Pública Nacional',
    resumen:
      'Administración y modernización de los sistemas nacionales de inversión pública y financiamiento externo (VIPFE).',
    institucion: 'Ministerio de Planificación del Desarrollo — VIPFE',
    sector: 'Sector Público',
    anio: '2009',
    periodo: '2008 – 2009',
    rol: 'Jefe de la Unidad de Sistemas',
    reto:
      'Administrar y modernizar los sistemas nacionales de inversión pública (SISIN), financiamiento externo (SISFIN), ONG y registro de consultores, y evaluar la transferencia tecnológica de sistemas homólogos internacionales.',
    solucion:
      'Administró los sistemas nacionales y lideró misiones técnicas internacionales a Chile (sistema BIP — MIDEPLAN/AGCI) y Argentina (sistema BAPIN — Ministerio de Economía) para analizar la factibilidad de transferencia e interoperabilidad. Elaboró informes mensuales de alerta temprana sobre la inversión pública nacional.',
    resultados: [
      { value: 'Nacional', label: 'Escala de los sistemas de inversión' },
      { value: '2 países', label: 'Misiones de transferencia (Chile · Argentina)' },
      { value: 'Mensual', label: 'Informes de alerta temprana' },
    ],
    logros: [
      'Análisis de factibilidad de transferencia (BIP–MIDEPLAN, BAPIN).',
      'Evaluación de interoperabilidad entre sistemas homólogos.',
    ],
    stack: ['SISIN', 'SISFIN', 'Bases de datos', 'Análisis de sistemas', 'Interoperabilidad'],
    imagenes: img('sisin-sisfin-inversion-publica'),
    size: 'small',
  },
  {
    slug: 'siaf-hospital-japones',
    titulo: 'SIAF — Hospital Universitario Japonés',
    resumen:
      'Diseño e implementación del Sistema Integrado de Administración Financiera para la gestión hospitalaria (cooperación JICA).',
    institucion: 'JICA — Hospital Universitario Japonés',
    sector: 'Salud',
    anio: '2003',
    periodo: '1997 – 2003',
    rol: 'Consultor de diseño y desarrollo de sistemas de información',
    reto:
      'Diseñar e implementar un Sistema Integrado de Administración Financiera (SIAF) para la gestión hospitalaria, en el marco de la cooperación japonesa.',
    solucion:
      'Diseñó y desarrolló una nueva versión del SIAF; posteriormente lo replicó en varias instituciones de salud a nivel nacional (vía Medicus Mundi) y participó en el Centro Coordinador de Emergencias (referencia/contrarreferencia).',
    resultados: [
      { value: '1º', label: 'ERP hospitalario sobre LAN en Bolivia' },
      { value: 'Nacional', label: 'Implementación en múltiples centros' },
      { value: 'JICA', label: 'Reconocimiento oficial' },
    ],
    logros: [
      'Reconocimiento oficial de JICA y del Hospital Universitario Japonés.',
      'Certificación de expositor y participación en el Centro Coordinador de Emergencias.',
    ],
    stack: ['SIAF', 'Sistemas financieros hospitalarios', 'Arquitectura cliente-servidor'],
    imagenes: img('siaf-hospital-japones'),
    size: 'small',
  },
  {
    slug: 'sispro-seguimiento-proyectos',
    titulo: 'SISPRO — Seguimiento a Proyectos',
    resumen:
      'Sistema nacional de seguimiento y monitoreo a proyectos de inversión y desarrollo, escalable y reutilizable.',
    institucion: 'PASA (Min. Agricultura) → PNUD – Autoridad de la Madre Tierra',
    sector: 'Desarrollo / Gobierno',
    anio: '2021',
    periodo: '2003 – 2021',
    rol: 'Encargado de Sistemas (PASA) / Consultor Principal (PNUD)',
    reto:
      'Crear un sistema nacional de seguimiento y monitoreo a proyectos de inversión y desarrollo, escalable y reutilizable en el tiempo.',
    solucion:
      'Desarrolló e implementó el SISPRO a nivel nacional, con cargado de datos, emisión de reportes y capacitación de personal. Casi dos décadas después, reimplementó una versión basada en resultados para la Autoridad Plurinacional de la Madre Tierra (PNUD).',
    resultados: [
      { value: '+18 años', label: 'Vigencia y reutilización' },
      { value: 'Nacional', label: 'Cobertura del sistema de M&E' },
      { value: 'PNUD', label: 'Reimplementación basada en resultados' },
    ],
    logros: [
      'Cargado de datos, emisión de reportes y capacitación de personal a nivel nacional.',
      'Reutilización del sistema durante casi dos décadas.',
    ],
    stack: ['PHP', 'MySQL', 'XAMPP', 'BI', 'Marco lógico'],
    imagenes: img('sispro-seguimiento-proyectos'),
    size: 'small',
  },
  {
    slug: 'monitoreo-evaluacion-cuna',
    titulo: 'Sistema de Monitoreo y Evaluación (M&E)',
    resumen:
      'Sistemas integrales de M&E para proyectos sociales y de salud en tres países, alineados al BID-FOMIN.',
    institucion: 'Asociación Cuna — BID FOMIN',
    sector: 'Desarrollo Social',
    anio: '2014',
    periodo: '2010 – 2014',
    rol: 'Consultor Técnico / Responsable de Sistemas',
    reto:
      'Diseñar e implementar sistemas integrales de monitoreo y evaluación para proyectos sociales y de salud ejecutados en Bolivia, Perú y Ecuador, alineados a los requisitos del BID-FOMIN.',
    solucion:
      'Diseñó la estructura, flujos e indicadores del sistema de monitoreo basado en marco lógico; construyó dashboards interactivos y plataformas web de visualización; gestionó la generación de información estadística para el PSR del BID-FOMIN.',
    resultados: [
      { value: '+40%', label: 'Eficiencia en seguimiento y decisiones' },
      { value: '3 países', label: 'Bolivia · Perú · Ecuador' },
      { value: 'BID-FOMIN', label: 'Información estadística para el PSR' },
    ],
    logros: [
      'Dashboards interactivos y plataformas web de visualización.',
      'Trazabilidad mejorada de indicadores basados en marco lógico.',
    ],
    stack: ['Laravel', 'PHP', 'MySQL', 'Dashboards BI', 'Marco lógico'],
    imagenes: img('monitoreo-evaluacion-cuna'),
    size: 'large',
  },
];

export const getProjectIndex = (slug: string): number =>
  projects.findIndex((p) => p.slug === slug);

export const getProject = (slug: string | undefined): Project | undefined =>
  slug ? projects.find((p) => p.slug === slug) : undefined;

export const gradientFor = (index: number): string =>
  PROJECT_GRADIENTS[index % PROJECT_GRADIENTS.length];
