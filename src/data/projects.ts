// ─── Projects — single source of truth (home grid, /proyectos list, case-study pages) ───
// Facts come from Max's master CV (05_agente_laboral/job-search-os/cv.md) and the existing site copy.
// The `approach` phases describe the delivery framework for each role; they were added as
// industry-standard practice and are pending Max's review (see docs/DECISIONES-PROYECTOS.md).
import type { Locale } from '@/content/types';

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ProjectPhase {
  title: string;
  text: string;
}

export interface ProjectImages {
  cover: string;
  gallery: string[];
}

/** Everything that is shown to the reader, per language. */
export interface ProjectText {
  title: string;
  summary: string;
  institution: string;
  sector: string;
  role: string;
  context: string;
  challenge: string;
  solution: string;
  results: ProjectMetric[];
  achievements: string[];
  responsibilities: string[];
  approach: ProjectPhase[];
  capabilities: string[];
  stack: string[];
  coverAlt: string;
  /** One caption per gallery image (also used as alt text). */
  gallery: string[];
}

export interface Project {
  slug: string;
  year: string; // badge year (short)
  period: string; // full range
  size: 'large' | 'small';
  images: ProjectImages;
  text: Record<Locale, ProjectText>;
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

// Illustrative photos from Unsplash (free license), stored locally per project.
const img = (slug: string): ProjectImages => ({
  cover: `/images/proyectos/${slug}/cover.jpg`,
  gallery: [
    `/images/proyectos/${slug}/gallery-1.jpg`,
    `/images/proyectos/${slug}/gallery-2.jpg`,
    `/images/proyectos/${slug}/gallery-3.jpg`,
  ],
});

export const projects: Project[] = [
  // ── 1. Central Bank of Bolivia ─────────────────────────────────────────
  {
    slug: 'modernizacion-banco-central',
    year: '2025',
    period: '2025',
    size: 'large',
    images: img('modernizacion-banco-central'),
    text: {
      en: {
        title: 'Systems Modernization, Central Bank of Bolivia',
        summary:
          'Continuity and resilience for the mission-critical systems behind the national financial infrastructure, modernized at 99.9% availability.',
        institution: 'Central Bank of Bolivia',
        sector: 'Banking / Finance',
        role: 'Assistant Manager of Information Systems / Senior Project Manager',
        context:
          'The Central Bank of Bolivia runs the systems behind the national financial infrastructure: external debt management, retail payments, international financial messaging and fiscal participation processes. Any outage has a national impact, and every change is subject to regulatory and audit scrutiny.',
        challenge:
          'Modernize mission-critical systems while keeping them running, compliant and resilient, under strong operational and audit pressure.',
        solution:
          'Led the planning and execution of high-risk technology initiatives, coordinating 33 professionals across development, operations and quality control. Directed the modernization of the main financial platforms, including external debt management and retail payments, and oversaw the systems that support international financial messaging and fiscal participation processes.',
        results: [
          { value: '99.9%', label: 'Service availability on modernized platforms' },
          { value: '33', label: 'Professionals coordinated' },
          { value: '3', label: 'Disciplines aligned: development, operations and QA' },
        ],
        achievements: [
          'Modernized core financial platforms, including external debt management and retail payments, at 99.9% availability.',
          'Optimized processing times in international financial messaging and fiscal participation processes.',
          'Reduced operational and regulatory risk in mission-critical systems.',
          'Served as a key advisor to senior management on technology risk, reliability and continuity.',
        ],
        responsibilities: [
          'Senior technology and risk leader for systems supporting the national financial infrastructure.',
          'Planning and execution of high-risk initiatives with national financial impact.',
          'Alignment of business objectives, regulatory requirements and technical execution.',
          'Decision support for senior management under operational and audit pressure.',
        ],
        approach: [
          { title: 'Risk-based prioritization', text: 'Map critical services and their dependencies, then rank initiatives by business impact and operational risk before committing people and budget.' },
          { title: 'Governance and change control', text: 'ITIL-aligned change management with approval gates, segregation of duties and audit-ready records for every release.' },
          { title: 'Staged modernization', text: 'Incremental releases through test environments, regression testing by the QA team and a rollback plan for each change.' },
          { title: 'Continuity and service operation', text: 'Availability targets, incident and problem management, and continuity plans reviewed together with operations.' },
          { title: 'Executive reporting', text: 'Regular risk and progress reporting so senior management can decide on reliability and continuity with clear evidence.' },
        ],
        capabilities: ['IT Project Management', 'Technology Risk Management', 'IT Service Management (ITIL 4)', 'Business Continuity', 'Executive Communication'],
        stack: ['Mission-critical financial systems', 'Payment systems', 'International financial messaging', 'ITIL 4', 'Change & release management', 'Business continuity'],
        coverAlt: 'Neoclassical bank building facade (illustrative photo)',
        gallery: [
          'Server infrastructure behind mission-critical services',
          'Retail payment systems',
          'Financial market and debt data',
        ],
      },
      es: {
        title: 'Modernización de Sistemas, Banco Central de Bolivia',
        summary:
          'Continuidad y resiliencia de los sistemas de misión crítica que sostienen la infraestructura financiera nacional, modernizados con 99,9% de disponibilidad.',
        institution: 'Banco Central de Bolivia',
        sector: 'Banca / Financiero',
        role: 'Subgerente de Sistemas de Información / Senior Project Manager',
        context:
          'El Banco Central de Bolivia opera los sistemas que sostienen la infraestructura financiera nacional: gestión de deuda externa, pagos minoristas, mensajería financiera internacional y procesos de participación fiscal. Cualquier interrupción tiene impacto nacional y cada cambio está sujeto a control regulatorio y de auditoría.',
        challenge:
          'Modernizar sistemas de misión crítica sin dejar de garantizar su continuidad operativa, el cumplimiento normativo y su resiliencia, bajo fuerte presión operativa y de auditoría.',
        solution:
          'Lideró la planificación y ejecución de iniciativas tecnológicas de alto riesgo, coordinando a 33 profesionales en desarrollo, operaciones y control de calidad. Dirigió la modernización de las principales plataformas financieras, incluidas la gestión de deuda externa y los pagos minoristas, y supervisó los sistemas de mensajería financiera internacional y de participación fiscal.',
        results: [
          { value: '99.9%', label: 'Disponibilidad del servicio en plataformas modernizadas' },
          { value: '33', label: 'Profesionales coordinados' },
          { value: '3', label: 'Disciplinas alineadas: desarrollo, operaciones y QA' },
        ],
        achievements: [
          'Modernización de las principales plataformas financieras, incluidas deuda externa y pagos minoristas, con 99,9% de disponibilidad.',
          'Optimización de los tiempos de procesamiento en mensajería financiera internacional y participación fiscal.',
          'Reducción del riesgo operativo y regulatorio en sistemas de misión crítica.',
          'Asesor clave de la alta gerencia en riesgo tecnológico, confiabilidad y continuidad.',
        ],
        responsibilities: [
          'Líder senior de tecnología y riesgo para los sistemas de la infraestructura financiera nacional.',
          'Planificación y ejecución de iniciativas de alto riesgo con impacto financiero nacional.',
          'Alineación entre objetivos de negocio, requisitos regulatorios y ejecución técnica.',
          'Soporte a la toma de decisiones de la alta gerencia bajo presión operativa y de auditoría.',
        ],
        approach: [
          { title: 'Priorización basada en riesgo', text: 'Mapear los servicios críticos y sus dependencias, y ordenar las iniciativas por impacto en el negocio y riesgo operativo antes de comprometer personas y presupuesto.' },
          { title: 'Gobierno y control de cambios', text: 'Gestión de cambios alineada a ITIL con puntos de aprobación, segregación de funciones y registros listos para auditoría en cada liberación.' },
          { title: 'Modernización por etapas', text: 'Liberaciones incrementales a través de ambientes de prueba, pruebas de regresión del equipo de QA y un plan de reversión para cada cambio.' },
          { title: 'Continuidad y operación del servicio', text: 'Metas de disponibilidad, gestión de incidentes y problemas, y planes de continuidad revisados junto con operaciones.' },
          { title: 'Reportes ejecutivos', text: 'Informes periódicos de riesgo y avance para que la alta gerencia decida sobre confiabilidad y continuidad con evidencia clara.' },
        ],
        capabilities: ['Gestión de Proyectos TI', 'Gestión de Riesgos Tecnológicos', 'Gestión de Servicios TI (ITIL 4)', 'Continuidad del Negocio', 'Comunicación Ejecutiva'],
        stack: ['Sistemas financieros de misión crítica', 'Sistemas de pagos', 'Mensajería financiera internacional', 'ITIL 4', 'Gestión de cambios y liberaciones', 'Continuidad del negocio'],
        coverAlt: 'Fachada neoclásica de un edificio bancario (foto ilustrativa)',
        gallery: [
          'Infraestructura de servidores detrás de servicios de misión crítica',
          'Sistemas de pagos minoristas',
          'Datos de mercado y deuda',
        ],
      },
    },
  },

  // ── 2. YPFB ────────────────────────────────────────────────────────────
  {
    slug: 'migracion-financiero-ypfb',
    year: '2024',
    period: '2023 – 2024',
    size: 'small',
    images: img('migracion-financiero-ypfb'),
    text: {
      en: {
        title: 'Financial System Migration, YPFB',
        summary:
          'A 30-year-old legacy financial system migrated with no service interruption at one of the country’s most important energy organizations.',
        institution: 'YPFB (Bolivian State Petroleum Company)',
        sector: 'Energy',
        role: 'Director of Corporate Solutions / Senior Software Engineer',
        context:
          'YPFB is Bolivia’s state petroleum company and one of the country’s most important energy organizations. Its core financial operations depended on a legacy system that had been in service for 30 years, tied to vendors, regulations and daily business processes.',
        challenge:
          'Replace the 30-year-old legacy financial system without interrupting the service, while managing legacy dependencies, multiple vendors and regulatory constraints.',
        solution:
          'Led the migration with a structured risk management and transition strategy, designed and implemented enterprise digital platforms, and oversaw the adoption of modern system architectures that improved interoperability. Acted as technology and risk advisor to executive stakeholders throughout the transition.',
        results: [
          { value: '0', label: 'Service interruptions during the migration' },
          { value: '−40%', label: 'Critical incidents' },
          { value: '+50%', label: 'Procurement transparency and operational traceability' },
        ],
        achievements: [
          'Migrated a 30-year-old legacy financial system with no service interruption.',
          'Increased procurement transparency and operational traceability by more than 50%.',
          'Reduced critical incidents by 40% through modern, interoperable architectures.',
          'Kept business continuity, efficiency and long-term sustainability at the center of every technology decision.',
        ],
        responsibilities: [
          'Leadership of strategic initiatives focused on continuity, risk mitigation and large-scale digital transformation.',
          'Design and implementation of enterprise digital platforms.',
          'Technology and risk advisory to executives during transitions involving legacy systems, vendors and regulatory constraints.',
        ],
        approach: [
          { title: 'Legacy assessment', text: 'Inventory of the legacy system’s modules, interfaces, data and business rules, with owners and dependencies identified.' },
          { title: 'Transition strategy and risk register', text: 'Phased migration plan with a risk register, contingency actions and go/no-go criteria agreed with stakeholders.' },
          { title: 'Data migration and reconciliation', text: 'Migration rehearsals and balance reconciliation between the legacy and the new system before each cutover.' },
          { title: 'Controlled cutover', text: 'Cutover windows outside peak operations, with rollback plans and parallel validation of results.' },
          { title: 'Stabilization (hypercare)', text: 'Close post go-live support, incident tracking and user assistance until operations were stable.' },
        ],
        capabilities: ['Legacy Modernization', 'Solutions Architecture', 'Risk & Transition Management', 'Vendor Coordination', 'Digital Transformation'],
        stack: ['Legacy migration', 'Enterprise digital platforms', 'Modern system architectures', 'Interoperability', 'Risk management'],
        coverAlt: 'Industrial energy plant with pipes and equipment (illustrative photo)',
        gallery: [
          'Energy infrastructure',
          'Interfaces and integrations between systems',
          'Procurement and logistics traceability',
        ],
      },
      es: {
        title: 'Migración Sistema Financiero, YPFB',
        summary:
          'Migración de un sistema financiero heredado de 30 años, sin interrupción del servicio, en una de las organizaciones energéticas más importantes del país.',
        institution: 'YPFB — Yacimientos Petrolíferos Fiscales Bolivianos',
        sector: 'Energético',
        role: 'Director de Soluciones Corporativas / Ingeniero de Software Senior',
        context:
          'YPFB es la empresa petrolera estatal de Bolivia y una de las organizaciones energéticas más importantes del país. Sus operaciones financieras dependían de un sistema heredado con 30 años de servicio, ligado a proveedores, normativa y procesos diarios del negocio.',
        challenge:
          'Reemplazar el sistema financiero heredado de 30 años sin interrumpir el servicio, gestionando dependencias del sistema antiguo, múltiples proveedores y restricciones regulatorias.',
        solution:
          'Lideró la migración con una estrategia estructurada de gestión de riesgos y transición, diseñó e implementó plataformas digitales empresariales y supervisó la adopción de arquitecturas modernas que mejoraron la interoperabilidad. Actuó como asesor de tecnología y riesgo de los ejecutivos durante toda la transición.',
        results: [
          { value: '0', label: 'Interrupciones del servicio durante la migración' },
          { value: '−40%', label: 'Incidentes críticos' },
          { value: '+50%', label: 'Transparencia en compras y trazabilidad operativa' },
        ],
        achievements: [
          'Migración de un sistema financiero heredado de 30 años sin interrupción del servicio.',
          'Aumento de más del 50% en la transparencia de compras y la trazabilidad operativa.',
          'Reducción del 40% de los incidentes críticos con arquitecturas modernas e interoperables.',
          'Continuidad del negocio, eficiencia y sostenibilidad como eje de cada decisión tecnológica.',
        ],
        responsibilities: [
          'Liderazgo de iniciativas estratégicas centradas en continuidad, mitigación de riesgos y transformación digital a gran escala.',
          'Diseño e implementación de plataformas digitales empresariales.',
          'Asesoría de tecnología y riesgo a ejecutivos en transiciones con sistemas heredados, proveedores y restricciones regulatorias.',
        ],
        approach: [
          { title: 'Diagnóstico del sistema heredado', text: 'Inventario de módulos, interfaces, datos y reglas de negocio del sistema antiguo, con responsables y dependencias identificados.' },
          { title: 'Estrategia de transición y registro de riesgos', text: 'Plan de migración por fases con registro de riesgos, acciones de contingencia y criterios de go/no-go acordados con los interesados.' },
          { title: 'Migración y conciliación de datos', text: 'Ensayos de migración y conciliación de saldos entre el sistema heredado y el nuevo antes de cada paso a producción.' },
          { title: 'Paso a producción controlado', text: 'Ventanas de corte fuera de los picos de operación, con planes de reversión y validación en paralelo de los resultados.' },
          { title: 'Estabilización (hypercare)', text: 'Soporte cercano después de la salida en vivo, seguimiento de incidentes y asistencia a usuarios hasta estabilizar la operación.' },
        ],
        capabilities: ['Modernización de Sistemas Heredados', 'Arquitectura de Soluciones', 'Gestión de Riesgos y Transición', 'Coordinación de Proveedores', 'Transformación Digital'],
        stack: ['Migración de sistemas heredados', 'Plataformas digitales empresariales', 'Arquitecturas modernas', 'Interoperabilidad', 'Gestión de riesgos'],
        coverAlt: 'Planta industrial energética con tuberías y equipos (foto ilustrativa)',
        gallery: [
          'Infraestructura energética',
          'Interfaces e integraciones entre sistemas',
          'Trazabilidad de compras y logística',
        ],
      },
    },
  },

  // ── 3. SISIN / SISFIN — VIPFE ──────────────────────────────────────────
  {
    slug: 'sisin-sisfin-inversion-publica',
    year: '2009',
    period: '2008 – 2009',
    size: 'small',
    images: img('sisin-sisfin-inversion-publica'),
    text: {
      en: {
        title: 'SISIN/SISFIN — National Public Investment',
        summary:
          'Management and improvement of Bolivia’s national systems for public investment and external financing, with technical missions to Chile and Argentina.',
        institution: 'Ministry of Development Planning (VIPFE)',
        sector: 'Public Sector',
        role: 'Head of Systems Unit / Project Manager',
        context:
          'The Vice Ministry of Public Investment and External Financing (VIPFE) runs the national systems that register and track public investment (SISIN) and external financing (SISFIN) across Bolivia, together with the NGO and consultant registries.',
        challenge:
          'Manage and improve the national systems for public investment, external financing, NGOs and consultants, and evaluate the transfer of peer systems from other countries.',
        solution:
          'Managed SISIN and SISFIN, leading functional improvements and database optimization. Led technical missions to Chile (BIP system, MIDEPLAN and AGCI) and Argentina (BAPIN system, Ministry of Economy) to assess technology transfer and interoperability, and prepared monthly early-warning reports on national public investment.',
        results: [
          { value: '2', label: 'International technical missions (Chile · Argentina)' },
          { value: '4', label: 'National registries managed: SISIN, SISFIN, NGOs and consultants' },
          { value: 'Monthly', label: 'Early-warning reports on national public investment' },
        ],
        achievements: [
          'Functional improvements and database optimization in SISIN and SISFIN.',
          'Feasibility analysis for technology transfer with Chile (BIP — MIDEPLAN, AGCI).',
          'Evaluation of Argentina’s BAPIN system for interoperability with Bolivia.',
          'Monthly early-warning reports on national public investment.',
        ],
        responsibilities: [
          'Head of the Systems Unit for national public investment and external financing systems.',
          'Administration of SISIN, SISFIN and the NGO and consultant registries.',
          'Technical and functional analysis with international counterparts.',
        ],
        approach: [
          { title: 'Baseline and data quality', text: 'Review of system functions, database performance and data quality to prioritize improvements.' },
          { title: 'Benchmarking peer systems', text: 'Structured comparison with Chile’s BIP and Argentina’s BAPIN: functional coverage, architecture and transfer effort.' },
          { title: 'Interoperability analysis', text: 'Mapping of the data standards and processes needed to exchange information between national systems.' },
          { title: 'Early-warning reporting', text: 'Monthly indicators on investment execution to flag delays and risks to decision makers.' },
        ],
        capabilities: ['Public Sector Information Systems', 'Database Optimization', 'Interoperability', 'International Cooperation', 'Data-driven Reporting'],
        stack: ['SISIN', 'SISFIN', 'Relational databases', 'Systems analysis', 'Interoperability'],
        coverAlt: 'Legislative chamber seen from above (illustrative photo)',
        gallery: [
          'Public investment shapes cities and infrastructure',
          'Technical and functional analysis',
          'Indicators for early-warning reports',
        ],
      },
      es: {
        title: 'SISIN/SISFIN — Inversión Pública Nacional',
        summary:
          'Administración y mejora de los sistemas nacionales de inversión pública y financiamiento externo, con misiones técnicas a Chile y Argentina.',
        institution: 'Ministerio de Planificación del Desarrollo — VIPFE',
        sector: 'Sector Público',
        role: 'Jefe de la Unidad de Sistemas / Project Manager',
        context:
          'El Viceministerio de Inversión Pública y Financiamiento Externo (VIPFE) administra los sistemas nacionales que registran y siguen la inversión pública (SISIN) y el financiamiento externo (SISFIN) en Bolivia, junto con los registros de ONG y de consultores.',
        challenge:
          'Administrar y mejorar los sistemas nacionales de inversión pública, financiamiento externo, ONG y consultores, y evaluar la transferencia de sistemas homólogos de otros países.',
        solution:
          'Administró el SISIN y el SISFIN, liderando mejoras funcionales y la optimización de bases de datos. Lideró misiones técnicas a Chile (sistema BIP, MIDEPLAN y AGCI) y Argentina (sistema BAPIN, Ministerio de Economía) para evaluar la transferencia tecnológica y la interoperabilidad, y elaboró informes mensuales de alerta temprana sobre la inversión pública nacional.',
        results: [
          { value: '2', label: 'Misiones técnicas internacionales (Chile · Argentina)' },
          { value: '4', label: 'Registros nacionales administrados: SISIN, SISFIN, ONG y consultores' },
          { value: 'Mensual', label: 'Informes de alerta temprana sobre la inversión pública' },
        ],
        achievements: [
          'Mejoras funcionales y optimización de bases de datos en SISIN y SISFIN.',
          'Análisis de factibilidad de transferencia tecnológica con Chile (BIP — MIDEPLAN, AGCI).',
          'Evaluación del sistema BAPIN de Argentina para su interoperabilidad con Bolivia.',
          'Informes mensuales de alerta temprana sobre la inversión pública nacional.',
        ],
        responsibilities: [
          'Jefe de la Unidad de Sistemas de inversión pública y financiamiento externo.',
          'Administración del SISIN, el SISFIN y los registros de ONG y consultores.',
          'Análisis técnico y funcional con contrapartes internacionales.',
        ],
        approach: [
          { title: 'Línea base y calidad de datos', text: 'Revisión de funciones, rendimiento de la base de datos y calidad de los datos para priorizar mejoras.' },
          { title: 'Comparación con sistemas homólogos', text: 'Comparación estructurada con el BIP de Chile y el BAPIN de Argentina: cobertura funcional, arquitectura y esfuerzo de transferencia.' },
          { title: 'Análisis de interoperabilidad', text: 'Mapeo de los estándares de datos y procesos necesarios para intercambiar información entre sistemas nacionales.' },
          { title: 'Alerta temprana', text: 'Indicadores mensuales de ejecución de la inversión para advertir retrasos y riesgos a quienes toman decisiones.' },
        ],
        capabilities: ['Sistemas de Información del Sector Público', 'Optimización de Bases de Datos', 'Interoperabilidad', 'Cooperación Internacional', 'Reportes Basados en Datos'],
        stack: ['SISIN', 'SISFIN', 'Bases de datos relacionales', 'Análisis de sistemas', 'Interoperabilidad'],
        coverAlt: 'Hemiciclo legislativo visto desde arriba (foto ilustrativa)',
        gallery: [
          'La inversión pública da forma a ciudades e infraestructura',
          'Análisis técnico y funcional',
          'Indicadores para informes de alerta temprana',
        ],
      },
    },
  },

  // ── 4. SIAF — Japanese University Hospital ─────────────────────────────
  {
    slug: 'siaf-hospital-japones',
    year: '2003',
    period: '1997 – 2003',
    size: 'small',
    images: img('siaf-hospital-japones'),
    text: {
      en: {
        title: 'SIAF — Japanese University Hospital',
        summary:
          'Design and rollout of the Integrated Financial Management System (SIAF) for hospital management, under Japanese cooperation (JICA).',
        institution: 'Japanese University Hospital (JICA cooperation)',
        sector: 'Healthcare',
        role: 'Information Systems Design and Development Consultant',
        context:
          'Built with Japanese cooperation (JICA), the Japanese University Hospital needed one integrated system to manage its finances and administration, and a model that other public health centers could adopt.',
        challenge:
          'Design and implement an Integrated Financial Management System (SIAF) for hospital management, within the framework of Japanese cooperation.',
        solution:
          'Designed and developed a new version of SIAF and coordinated staff training to make it sustainable. The system was later replicated in several health institutions nationwide (through Medicus Mundi), and Max took part in the Emergency Coordination Center (patient referral and counter-referral).',
        results: [
          { value: '1st', label: 'Hospital ERP running over a LAN in Bolivia' },
          { value: '6', label: 'Years of design, development and rollout (1997 – 2003)' },
          { value: 'JICA', label: 'Official recognition' },
        ],
        achievements: [
          'Official recognition from JICA and the Japanese University Hospital for the SIAF implementation.',
          'Certificate in Exhibitor Quality at a JICA seminar (1999).',
          'Replication of SIAF in health institutions nationwide.',
          'Participation in the Emergency Coordination Center (referral and counter-referral).',
        ],
        responsibilities: [
          'Design and development of the new SIAF version.',
          'Coordination of staff training to ensure the system’s sustainability.',
          'Support for the replication of the system in other health institutions.',
        ],
        approach: [
          { title: 'Process discovery', text: 'Mapping of financial and administrative flows with each hospital area: billing, budget, procurement and accounting.' },
          { title: 'Integrated design', text: 'One shared database for all modules, running on the hospital’s local network in a client-server architecture.' },
          { title: 'Iterative build and validation', text: 'Module-by-module delivery, validated by the people who would use it every day.' },
          { title: 'Training and adoption', text: 'Staff training and user guides so the hospital could run the system on its own.' },
          { title: 'Replication', text: 'Packaging the solution so other health centers could adopt it with minimal adaptation.' },
        ],
        capabilities: ['Healthcare Information Systems', 'Software Design & Development', 'Training & Change Management', 'Client-Server Architecture'],
        stack: ['SIAF', 'Hospital financial systems', 'Client-server architecture', 'Local area network (LAN)'],
        coverAlt: 'Modern hospital reception area (illustrative photo)',
        gallery: [
          'Hospital administration',
          'Patient care supported by reliable information',
          'Health services',
        ],
      },
      es: {
        title: 'SIAF — Hospital Universitario Japonés',
        summary:
          'Diseño e implementación del Sistema Integrado de Administración Financiera (SIAF) para la gestión hospitalaria, en el marco de la cooperación japonesa (JICA).',
        institution: 'Hospital Universitario Japonés (cooperación JICA)',
        sector: 'Salud',
        role: 'Consultor de diseño y desarrollo de sistemas de información',
        context:
          'Construido con la cooperación japonesa (JICA), el Hospital Universitario Japonés necesitaba un sistema integrado para gestionar sus finanzas y su administración, y un modelo que otros centros de salud públicos pudieran adoptar.',
        challenge:
          'Diseñar e implementar un Sistema Integrado de Administración Financiera (SIAF) para la gestión hospitalaria, en el marco de la cooperación japonesa.',
        solution:
          'Diseñó y desarrolló una nueva versión del SIAF y coordinó la capacitación del personal para asegurar su sostenibilidad. El sistema se replicó después en varias instituciones de salud del país (a través de Medicus Mundi), y Max participó en el Centro Coordinador de Emergencias (referencia y contrarreferencia de pacientes).',
        results: [
          { value: '1º', label: 'ERP hospitalario sobre red LAN en Bolivia' },
          { value: '6', label: 'Años de diseño, desarrollo e implementación (1997 – 2003)' },
          { value: 'JICA', label: 'Reconocimiento oficial' },
        ],
        achievements: [
          'Reconocimiento oficial de JICA y del Hospital Universitario Japonés por la implementación del SIAF.',
          'Certificado de calidad como expositor en un seminario de JICA (1999).',
          'Réplica del SIAF en instituciones de salud a nivel nacional.',
          'Participación en el Centro Coordinador de Emergencias (referencia y contrarreferencia).',
        ],
        responsibilities: [
          'Diseño y desarrollo de la nueva versión del SIAF.',
          'Coordinación de la capacitación del personal para la sostenibilidad del sistema.',
          'Apoyo a la réplica del sistema en otras instituciones de salud.',
        ],
        approach: [
          { title: 'Relevamiento de procesos', text: 'Mapeo de los flujos financieros y administrativos con cada área del hospital: facturación, presupuesto, compras y contabilidad.' },
          { title: 'Diseño integrado', text: 'Una base de datos compartida por todos los módulos, sobre la red local del hospital en arquitectura cliente-servidor.' },
          { title: 'Construcción y validación iterativa', text: 'Entregas módulo por módulo, validadas por las personas que lo usarían a diario.' },
          { title: 'Capacitación y adopción', text: 'Capacitación del personal y guías de uso para que el hospital operara el sistema por su cuenta.' },
          { title: 'Réplica', text: 'Empaquetado de la solución para que otros centros de salud pudieran adoptarla con mínima adaptación.' },
        ],
        capabilities: ['Sistemas de Información en Salud', 'Diseño y Desarrollo de Software', 'Capacitación y Gestión del Cambio', 'Arquitectura Cliente-Servidor'],
        stack: ['SIAF', 'Sistemas financieros hospitalarios', 'Arquitectura cliente-servidor', 'Red de área local (LAN)'],
        coverAlt: 'Recepción de un hospital moderno (foto ilustrativa)',
        gallery: [
          'Administración hospitalaria',
          'Atención al paciente respaldada por información confiable',
          'Servicios de salud',
        ],
      },
    },
  },

  // ── 5. SISPRO — PASA → UNDP ────────────────────────────────────────────
  {
    slug: 'sispro-seguimiento-proyectos',
    year: '2021',
    period: '2003 – 2021',
    size: 'small',
    images: img('sispro-seguimiento-proyectos'),
    text: {
      en: {
        title: 'SISPRO — Project Monitoring',
        summary:
          'A national monitoring system for investment and development projects, built to last: in use and reused for almost two decades.',
        institution: 'Food Security Support Program (PASA) → UNDP · Mother Earth Authority',
        sector: 'Development / Government',
        role: 'Head of Monitoring & Systems Manager (PASA) / Lead Consultant (UNDP)',
        context:
          'The Food Security Support Program (PASA) funded projects in municipalities across Bolivia and needed reliable, nationwide visibility of their progress and impact.',
        challenge:
          'Create a national monitoring system for investment and development projects that could scale and be reused over time.',
        solution:
          'Designed and implemented the Integrated Project Monitoring System (SISPRO) nationwide, with data loading, reporting and staff training, and led the impact assessment of food security projects together with municipalities and cooperation agencies. Almost two decades later, re-implemented a results-based version for the Plurinational Mother Earth Authority (UNDP).',
        results: [
          { value: '18+', label: 'Years in use and reuse' },
          { value: '2', label: 'Implementations: PASA (2003) and UNDP (2021)' },
          { value: 'National', label: 'Coverage of the monitoring system' },
        ],
        achievements: [
          'Nationwide rollout with data loading, report generation and staff training.',
          'Better supervision of funded projects.',
          'Impact assessment of food security projects with municipalities and cooperation agencies.',
          'Results-based re-implementation for the Plurinational Mother Earth Authority (UNDP).',
        ],
        responsibilities: [
          'Design and implementation of SISPRO.',
          'Supervision of funded projects through monitoring data.',
          'Coordination with municipalities and international cooperation agencies.',
        ],
        approach: [
          { title: 'Results framework', text: 'Indicators defined from each project’s logical framework: activities, outputs and outcomes.' },
          { title: 'Field data flow', text: 'Standard forms and data loading routines so municipalities and field staff report in the same way.' },
          { title: 'Reports for decision makers', text: 'Automated reports on physical and financial progress for program managers.' },
          { title: 'Capacity building', text: 'Training so local teams could keep the system running after delivery.' },
          { title: 'Results-based re-implementation', text: 'An updated, outcome-focused version for UNDP, reusing the proven model.' },
        ],
        capabilities: ['Monitoring & Evaluation', 'Results-based Management', 'Web Development', 'Capacity Building'],
        stack: ['PHP', 'MySQL', 'XAMPP', 'BI', 'Logical framework'],
        coverAlt: 'Farm field at sunrise (illustrative photo)',
        gallery: [
          'Agricultural production',
          'Rural development projects in the field',
          'Mother Earth: environment and natural resources',
        ],
      },
      es: {
        title: 'SISPRO — Seguimiento a Proyectos',
        summary:
          'Sistema nacional de seguimiento a proyectos de inversión y desarrollo, hecho para durar: en uso y reutilizado durante casi dos décadas.',
        institution: 'Programa de Apoyo a la Seguridad Alimentaria (PASA) → PNUD · Autoridad de la Madre Tierra',
        sector: 'Desarrollo / Gobierno',
        role: 'Jefe de Monitoreo y Encargado de Sistemas (PASA) / Consultor Principal (PNUD)',
        context:
          'El Programa de Apoyo a la Seguridad Alimentaria (PASA) financiaba proyectos en municipios de todo el país y necesitaba visibilidad confiable y nacional sobre su avance e impacto.',
        challenge:
          'Crear un sistema nacional de seguimiento a proyectos de inversión y desarrollo, escalable y reutilizable en el tiempo.',
        solution:
          'Diseñó e implementó el Sistema Integrado de Seguimiento a Proyectos (SISPRO) a nivel nacional, con cargado de datos, emisión de reportes y capacitación de personal, y lideró la evaluación de impacto de proyectos de seguridad alimentaria junto con municipios y agencias de cooperación. Casi dos décadas después, reimplementó una versión basada en resultados para la Autoridad Plurinacional de la Madre Tierra (PNUD).',
        results: [
          { value: '18+', label: 'Años de uso y reutilización' },
          { value: '2', label: 'Implementaciones: PASA (2003) y PNUD (2021)' },
          { value: 'Nacional', label: 'Cobertura del sistema de seguimiento' },
        ],
        achievements: [
          'Implementación nacional con cargado de datos, emisión de reportes y capacitación de personal.',
          'Mejor supervisión de los proyectos financiados.',
          'Evaluación de impacto de proyectos de seguridad alimentaria con municipios y agencias de cooperación.',
          'Reimplementación basada en resultados para la Autoridad Plurinacional de la Madre Tierra (PNUD).',
        ],
        responsibilities: [
          'Diseño e implementación del SISPRO.',
          'Supervisión de los proyectos financiados a partir de datos de seguimiento.',
          'Coordinación con municipios y agencias de cooperación internacional.',
        ],
        approach: [
          { title: 'Marco de resultados', text: 'Indicadores definidos a partir del marco lógico de cada proyecto: actividades, productos y resultados.' },
          { title: 'Flujo de datos de campo', text: 'Formularios estándar y rutinas de carga para que municipios y técnicos de campo reporten de la misma forma.' },
          { title: 'Reportes para la toma de decisiones', text: 'Reportes automáticos de avance físico y financiero para los responsables del programa.' },
          { title: 'Fortalecimiento de capacidades', text: 'Capacitación para que los equipos locales mantuvieran el sistema después de la entrega.' },
          { title: 'Reimplementación basada en resultados', text: 'Una versión actualizada, centrada en resultados, para el PNUD, reutilizando el modelo probado.' },
        ],
        capabilities: ['Monitoreo y Evaluación', 'Gestión Basada en Resultados', 'Desarrollo Web', 'Fortalecimiento de Capacidades'],
        stack: ['PHP', 'MySQL', 'XAMPP', 'BI', 'Marco lógico'],
        coverAlt: 'Campo de cultivo al amanecer (foto ilustrativa)',
        gallery: [
          'Producción agrícola',
          'Proyectos de desarrollo rural en campo',
          'Madre Tierra: medio ambiente y recursos naturales',
        ],
      },
    },
  },

  // ── 6. M&E — Cuna Association (IDB-FOMIN) ──────────────────────────────
  {
    slug: 'monitoreo-evaluacion-cuna',
    year: '2014',
    period: '2010 – 2014',
    size: 'large',
    images: img('monitoreo-evaluacion-cuna'),
    text: {
      en: {
        title: 'Monitoring & Evaluation System (M&E)',
        summary:
          'Monitoring, evaluation and contract management systems for social and health projects in three countries, aligned with IDB-FOMIN requirements.',
        institution: 'Cuna Association (IDB-FOMIN)',
        sector: 'Social Development',
        role: 'Systems Manager / Project Manager',
        context:
          'Cuna Association ran social and health projects in Bolivia, Peru and Ecuador funded by the Multilateral Investment Fund of the Inter-American Development Bank (IDB-FOMIN), which required consistent indicators and statistical reporting.',
        challenge:
          'Design and implement integrated monitoring and evaluation systems for social and health projects in Bolivia, Peru and Ecuador, aligned with IDB-FOMIN requirements.',
        solution:
          'Led the development of monitoring, evaluation and contract management systems. Designed the structure, flows and indicators of the monitoring system based on the logical framework, built interactive dashboards and web platforms to visualize indicators, and managed the statistical information for the IDB-FOMIN project status report (PSR). Coordinated technical teams and managed the IT infrastructure.',
        results: [
          { value: '3', label: 'Countries: Bolivia · Peru · Ecuador' },
          { value: '4', label: 'Years leading systems (2010 – 2014)' },
          { value: 'IDB', label: 'Statistics for the FOMIN project status report' },
        ],
        achievements: [
          'Interactive dashboards and web platforms to visualize indicators.',
          'Better traceability of logical-framework indicators and faster decision-making.',
          'Statistical information for IDB-FOMIN project status reports.',
          'Secure, available IT infrastructure with continuous support.',
        ],
        responsibilities: [
          'Development of monitoring, evaluation and contract management systems.',
          'Coordination of technical teams.',
          'Management of the IT infrastructure: security, availability and support.',
        ],
        approach: [
          { title: 'Indicator design', text: 'Structure, flows and indicators of the M&E system derived from each project’s logical framework.' },
          { title: 'Multi-country data standards', text: 'Common definitions so data from Bolivia, Peru and Ecuador could be compared side by side.' },
          { title: 'Dashboards and visualization', text: 'Interactive dashboards for program managers and donors to follow progress at a glance.' },
          { title: 'Donor reporting', text: 'Statistical outputs aligned with IDB-FOMIN reporting requirements.' },
        ],
        capabilities: ['Monitoring & Evaluation', 'BI & Dashboards', 'Multi-country Programs', 'IT Infrastructure Management'],
        stack: ['PHP', 'MySQL', 'Laravel', 'BI dashboards', 'Logical framework'],
        coverAlt: 'Smiling children (illustrative photo)',
        gallery: [
          'Interactive indicator dashboards',
          'Indicator design workshops',
          'Community-centered programs',
        ],
      },
      es: {
        title: 'Sistema de Monitoreo y Evaluación (M&E)',
        summary:
          'Sistemas de monitoreo, evaluación y gestión de contratos para proyectos sociales y de salud en tres países, alineados al BID-FOMIN.',
        institution: 'Asociación Cuna — BID FOMIN',
        sector: 'Desarrollo Social',
        role: 'Gerente de Sistemas / Project Manager',
        context:
          'La Asociación Cuna ejecutaba proyectos sociales y de salud en Bolivia, Perú y Ecuador financiados por el Fondo Multilateral de Inversiones del Banco Interamericano de Desarrollo (BID-FOMIN), que exigía indicadores consistentes y reportes estadísticos.',
        challenge:
          'Diseñar e implementar sistemas integrales de monitoreo y evaluación para proyectos sociales y de salud en Bolivia, Perú y Ecuador, alineados a los requisitos del BID-FOMIN.',
        solution:
          'Lideró el desarrollo de sistemas de monitoreo, evaluación y gestión de contratos. Diseñó la estructura, los flujos y los indicadores del sistema de monitoreo basado en marco lógico, construyó dashboards interactivos y plataformas web de visualización, y gestionó la información estadística para el informe de estado del proyecto (PSR) del BID-FOMIN. Coordinó equipos técnicos y administró la infraestructura TI.',
        results: [
          { value: '3', label: 'Países: Bolivia · Perú · Ecuador' },
          { value: '4', label: 'Años liderando sistemas (2010 – 2014)' },
          { value: 'BID', label: 'Estadísticas para el informe de estado del FOMIN' },
        ],
        achievements: [
          'Dashboards interactivos y plataformas web para visualizar indicadores.',
          'Mejor trazabilidad de los indicadores del marco lógico y decisiones más ágiles.',
          'Información estadística para los informes de estado del BID-FOMIN.',
          'Infraestructura TI segura y disponible, con soporte continuo.',
        ],
        responsibilities: [
          'Desarrollo de sistemas de monitoreo, evaluación y gestión de contratos.',
          'Coordinación de equipos técnicos.',
          'Administración de la infraestructura TI: seguridad, disponibilidad y soporte.',
        ],
        approach: [
          { title: 'Diseño de indicadores', text: 'Estructura, flujos e indicadores del sistema de M&E derivados del marco lógico de cada proyecto.' },
          { title: 'Estándares de datos multipaís', text: 'Definiciones comunes para comparar los datos de Bolivia, Perú y Ecuador lado a lado.' },
          { title: 'Dashboards y visualización', text: 'Dashboards interactivos para que responsables y donantes sigan el avance de un vistazo.' },
          { title: 'Reportes al donante', text: 'Productos estadísticos alineados a los requisitos de reporte del BID-FOMIN.' },
        ],
        capabilities: ['Monitoreo y Evaluación', 'BI y Dashboards', 'Programas Multipaís', 'Gestión de Infraestructura TI'],
        stack: ['PHP', 'MySQL', 'Laravel', 'Dashboards BI', 'Marco lógico'],
        coverAlt: 'Niños sonriendo (foto ilustrativa)',
        gallery: [
          'Dashboards interactivos de indicadores',
          'Talleres de diseño de indicadores',
          'Programas centrados en la comunidad',
        ],
      },
    },
  },
];

export const getProjectIndex = (slug: string): number =>
  projects.findIndex((p) => p.slug === slug);

export const getProject = (slug: string | undefined): Project | undefined =>
  slug ? projects.find((p) => p.slug === slug) : undefined;

export const gradientFor = (index: number): string =>
  PROJECT_GRADIENTS[index % PROJECT_GRADIENTS.length];
