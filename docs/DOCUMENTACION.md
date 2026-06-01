# Documentación del Proyecto — brandMEQ

> Sitio web de marca personal de **Max Escobari** · Project Manager Senior en TI
> Documento de análisis y estado del proyecto · Versión 1.0 · Mayo 2026

---

## 1. Resumen ejecutivo

**brandMEQ** es el sitio web de marca personal de **Gabriel Max Antonio Escobari Quiroga** ("Max Escobari"), Project Manager Senior en Tecnologías de Información con más de 25 años de experiencia liderando proyectos tecnológicos estratégicos en sectores críticos (banca, energía, salud, sector público y desarrollo social) en Bolivia.

### Objetivo del sitio

El objetivo estratégico es **posicionar a Max Escobari como autoridad y referente en su campo (marca personal)** con el fin de **captar contratos y consultorías** en transformación digital, gestión de proyectos TI e implementación de ITIL.

Toda la propuesta de valor, secciones y recomendaciones de mejora de este documento se enmarcan en ese objetivo: primero construir autoridad/credibilidad, y a partir de ahí generar oportunidades de negocio.

### Datos de referencia

| Dato | Valor |
|------|-------|
| URL oficial | https://mescobari.iq.com.bo/ |
| Idioma | Español |
| Email | maxescob@hotmail.com |
| Teléfono | +591-77925856 |
| LinkedIn | https://www.linkedin.com/in/max-escobari-2439a840/ |
| GitHub | https://github.com/mescobari |
| Ubicación | La Paz, Bolivia |

---

## 2. Tecnología y stack

### Núcleo

- **React 19.2** + **TypeScript 5.9** (modo estricto)
- **Vite 7.2** como build tool y servidor de desarrollo (target ES2022)
- Alias de importación `@/* → ./src/*`

### Estilos

- **Tailwind CSS 3.4** con un design system personalizado ("Exvia")
- PostCSS + Autoprefixer · `tailwindcss-animate`
- Tipografías **Geist** / **GeistMono**
- Paleta principal: negro `#131313`, azul `#0082F3`, focus `#4D65FF`

### Interfaz y componentes

- **shadcn/ui** (estilo *new-york*) sobre **Radix UI** (~52 componentes en `src/components/ui/`)
- Iconos **Lucide React** · Carruseles **Embla** · Toasts **Sonner** · Drawer **Vaul**
- Temas con **next-themes** · Efectos con **canvas-confetti**

### Formularios y validación

- **React Hook Form** + **Zod** + `@hookform/resolvers`

### Routing

- **React Router DOM 7** con **HashRouter** (URLs basadas en `#`)

### Herramientas

- **ESLint 9** (flat config) · `tsc` · plugin de inspección de componentes

### Scripts de build

| Script | Acción |
|--------|--------|
| `dev` | Servidor de desarrollo |
| `build` | `tsc -b && vite build` |
| `lint` | Linter ESLint |
| `preview` | Previsualización del build |

> **Nota:** Varias dependencias provienen del template base (recharts, react-day-picker, input-otp, react-resizable-panels, etc.) y no se utilizan en el sitio actual. Son candidatas a depuración para aligerar el proyecto.

---

## 3. Arquitectura y organización del código

### Configuración centralizada

Todo el contenido de la página principal se gestiona desde un único archivo: **`src/config.ts`**. Esto permite editar textos, servicios, proyectos y testimonios sin tocar los componentes. Incluye: `siteConfig`, `navigationConfig`, `heroConfig`, `aboutConfig`, `servicesConfig`, `portfolioConfig`, `testimonialsConfig`, `ctaConfig` y `footerConfig`. Las secciones se renderizan con verificaciones de nulos (si están vacías, no se muestran).

### Estructura de carpetas

```
brandMEQ/
├── src/
│   ├── config.ts            ← Configuración central de TODO el contenido
│   ├── App.tsx              ← Router principal + ensamblado del home
│   ├── main.tsx             ← Punto de entrada React
│   ├── index.css            ← Estilos globales, fuentes, animaciones
│   ├── sections/            ← Secciones de la página principal
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Testimonials.tsx
│   │   ├── CTA.tsx
│   │   └── Footer.tsx
│   ├── components/          ← Navigation, AnimatedButton, PageOverlay + ui/
│   ├── hooks/               ← parallax, scroll-animation, page-load, use-mobile
│   └── lib/                 ← utils (cn)
├── public/images/           ← Imágenes del sitio
└── docs/                    ← Esta documentación
```

---

## 4. Árbol de páginas del sitio

### 4.1 Página principal — IMPLEMENTADA

| Ruta | Componente | Estado |
|------|-----------|--------|
| `/` | `PersonalBrandSite` (`src/App.tsx`) | ✅ Implementada |

### 4.2 Funnel de ventas ITIL — REMOVIDO ✓

> El embudo ITIL se separó a un proyecto independiente (`itil4-funnel`). **Ya fue eliminado de este repositorio** (mayo 2026): la carpeta `src/pages/` completa, los hooks exclusivos `useCountdown.ts` y `useTypewriter.ts`, el cliente API `src/lib/api.ts`, y sus rutas en `App.tsx`. El sitio compila correctamente (`npm run build` ✓). Las rutas `/itil4`, `/libro-itil`, `/ventas`, `/checkout`, `/entrega/:token`, `/upsell` y `/gracias` **ya no existen** en este proyecto.

### 4.3 Páginas / secciones PENDIENTES de desarrollar

> Referenciadas en la navegación o el footer, pero **sin destino implementado** (enlaces rotos).

| Elemento | Enlace | Estado | Relevancia |
|----------|--------|--------|------------|
| **Blog / Blog Técnico** | `#blog` (navbar + footer) | ❌ No existe | **Alta** — clave para construir autoridad/marca personal |
| **Publicaciones** | `#publications` (footer) | ❌ No existe | Media — refuerza credibilidad (papers, charlas) |
| Detalle de proyecto | (sin enlace aún) | ❌ No existe | Media — casos de éxito ampliados |
| Detalle de servicio | (sin enlace aún) | ❌ No existe | Baja/Media |
| Sección de Certificaciones dedicada | hoy apunta a `#about` | ❌ No existe | Media — verifica credenciales |

---

## 5. Secciones y nombres de la página principal

La página principal (`/`) se compone, **en orden**, de: barra de navegación + las siguientes secciones + footer.

| # | Sección | ID / ancla | Nombre visible | Contenido | Archivo |
|---|---------|-----------|----------------|-----------|---------|
| 1 | **Hero** | `#hero` | "MAX ESCOBARI" | Nombre a gran escala, roles rotativos, efecto de seguimiento del cursor (mouse-tracking) | `src/sections/Hero.tsx` |
| 2 | **About** | `#about` | "SOBRE MÍ" | Bio, badge "25+ años", stats (50+ proyectos, 99.9% disponibilidad, 40% reducción de incidentes), grid 2×2 de imágenes | `src/sections/About.tsx` |
| 3 | **Services** | `#services` | "SERVICIOS" | "Soluciones tecnológicas estratégicas…" + 4 servicios | `src/sections/Services.tsx` |
| 4 | **Portfolio** | `#portfolio` | "PROYECTOS" | "Experiencia comprobada en sectores estratégicos" — bento grid con 5 proyectos + CTA | `src/sections/Portfolio.tsx` |
| 5 | **Testimonials** | `#testimonials` | "TESTIMONIOS" | Carrusel automático (6s) con 4 testimonios | `src/sections/Testimonials.tsx` |
| 6 | **CTA** | `#contact` | "Transforme su organización…" | Tags de roles + botón de contacto (mailto) | `src/sections/CTA.tsx` |
| 7 | **Footer** | — | "MAX ESCOBARI" | 3 columnas (Servicios / Experiencia / Recursos), redes, newsletter, copyright 2025 | `src/sections/Footer.tsx` |

### Detalle de la sección Servicios (4)

1. **Arquitectura de Soluciones** — arquitecturas escalables, modernización de sistemas heredados, migración cloud.
2. **Desarrollo de Software** — liderazgo técnico full-stack (React, Angular, Node.js, Laravel, Spring Boot).
3. **Gestión de Proyectos TI** — metodologías ágiles (Scrum, Kanban) e híbridas (PMBOK).
4. **Implementación ITIL** — mejores prácticas de gestión de servicios según ITIL 4.

### Detalle de la sección Proyectos (5)

| Proyecto | Sector | Año |
|----------|--------|-----|
| Modernización Sistemas Banco Central *(destacado)* | Financiero | 2025 |
| Migración Sistema Financiero YPFB | Energético | 2024 |
| SIAF Hospital Universitario Japonés | Salud | 2015 |
| Plataforma Digital de Compras Estatales | Público | 2023 |
| Sistema Monitoreo Proyectos Sociales *(destacado)* | Desarrollo Social | 2014 |

### Detalle de la sección Testimonios (4)

| Autor | Cargo | Organización |
|-------|-------|--------------|
| Toichiro ISO | Experto en Gestión Hospitalaria | JICA Japón |
| Mercedes Urquiola | Responsable de Sistemas | DIGEMIG – Ministerio de Gobierno |
| Paolo Toselli | Geo-Coordination for Brazil | European Commission |
| Delsy Merino | Directora Ejecutiva | Asociación CUNA |

### Navegación

**Menú:** Inicio · Sobre Mí · Servicios · Proyectos · ~~Blog~~ *(roto)* · Contacto — y botón **"Agendar Consulta"**.

---

## 6. Hallazgos y observaciones para mejora

| # | Hallazgo | Impacto |
|---|----------|---------|
| 1 | **Enlaces rotos:** `#blog` (navbar + footer) y `#publications` (footer) no tienen destino | Alto — afecta credibilidad y el objetivo de autoridad |
| 2 | **Newsletter** sin backend evidente (revisar si realmente envía/almacena) | Medio |
| 3 | **Funnel ITIL** pendiente de eliminar del repositorio (rutas en `App.tsx` + carpeta `pages/`) | Medio — peso muerto |
| 4 | **HashRouter** genera URLs con `#`, subóptimo para SEO y para compartir enlaces de una marca personal | Medio — evaluar `BrowserRouter` |
| 5 | **Dependencias del template base sin uso** | Bajo — depurar para aligerar |
| 6 | **Imágenes** parecen placeholders; falta material visual profesional real | Alto — credibilidad |
| 7 | **Email** de contacto es Hotmail; un correo de dominio propio reforzaría la marca | Bajo/Medio |

---

## 7. Información necesaria para mejorar el sitio

Para diseñar las mejoras alineadas con el objetivo de **posicionar a Max como autoridad y captar consultorías**, se necesita la siguiente información del cliente:

### Objetivo y conversión
- ¿Cuál es la **acción #1** que queremos que haga el visitante? (agendar una llamada, llenar un formulario, descargar CV/dossier)
- ¿Hay un **CRM o calendario** (p. ej. Calendly) a integrar para agendar?
- ¿Existen **métricas/analytics** actuales del sitio?

### Contenido de autoridad (prioritario)
- ¿Max **escribirá un blog / artículos**? ¿Sobre qué temas y con qué frecuencia?
- ¿Tiene **publicaciones, charlas, podcasts o ponencias** existentes que mostrar?
- ¿Hay **material descargable** (whitepapers, guías, casos de éxito en PDF)?

### Prueba social y credenciales
- ¿Qué **logos de clientes/instituciones** está autorizado a mostrar?
- ¿**Certificaciones** con enlace de verificación? (ITIL 4, Google PM, etc.)
- ¿Las **métricas de proyectos** (50+, 99.9%, 40%) están confirmadas y son citables?

### Activos de marca
- ¿Dispone de **fotos profesionales reales**? (las actuales parecen placeholders)
- ¿Tiene **logo / identidad visual** definitiva?
- ¿Hay **videos** (presentación personal, casos)?

### Idioma y alcance
- ¿El sitio será **solo en español** o también en **inglés**? (un testimonio ya está en inglés y hay clientes internacionales como la Comisión Europea)

### Servicios y oferta comercial
- ¿Se comunicarán **paquetes o tarifas** de consultoría?
- ¿Cuál es el **segmento objetivo** prioritario? (sector público, banca, energía…)

### Técnico y operación
- ¿**Dominio definitivo** y **hosting**?
- ¿**Correo profesional** de dominio propio?
- ¿Integración de **newsletter** (Mailchimp u otro)?
- ¿Requisitos **legales** (política de privacidad, cookies)?

---

*Documento generado como análisis del estado actual del proyecto. No modifica el código del sitio.*
