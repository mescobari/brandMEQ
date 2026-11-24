# Decisiones — páginas interiores de Proyectos

Fecha: 2026-11-24 · Rama: `max` · Autor: Claude (con autonomía delegada por Max)

Registro de las decisiones tomadas al construir `/proyectos` y las 6 páginas de caso de estudio
(`/proyectos/:slug`). Cada punto indica **qué revisar** para que Max confirme o cambie.

## 1. Contenido y veracidad

| # | Decisión | Por qué | Revisar |
|---|----------|---------|---------|
| 1.1 | Hechos tomados solo del CV maestro (`05_agente_laboral/job-search-os/cv.md`) y del texto que ya existía en el sitio. | Regla de datos veraces. | — |
| 1.2 | **Sección "Enfoque de ejecución / Delivery approach" (4–5 fases por proyecto) es contenido NUEVO**: prácticas estándar de la industria para cada rol (p. ej. ensayos de migración y conciliación en YPFB; gestión de cambios ITIL en el BCB; marco lógico en SISPRO/Cuna). No tienen cifras ni logros inventados. | Pediste "aumentar conceptos que se deberían realizar según el tema y el cargo". | **Sí — confirmar que cada fase refleja lo que realmente hiciste.** Están en `src/data/projects.ts`, campo `approach`. |
| 1.3 | Párrafo de **Contexto** nuevo por proyecto (qué es la institución y por qué el proyecto era crítico). | Ayuda a un reclutador extranjero a entender instituciones bolivianas. | Revisar redacción. |
| 1.4 | BCB: se quitó la métrica "−Riesgo" (no era una cifra) y se puso "3 disciplinas alineadas: desarrollo, operaciones y QA" (del CV: 33 profesionales en esas 3 áreas). | Métricas deben ser verificables. | — |
| 1.5 | Cuna (M&E): **se quitó "+40% eficiencia"**. En el CV ese 40% corresponde a tu etapa de Consultor Independiente (2015–2023), no a Cuna (2010–2014). Se reemplazó por "3 países" y "4 años". | Evitar atribuir una cifra al proyecto equivocado. | **Sí — si el 40% sí aplica a Cuna, se puede volver a poner.** |
| 1.6 | Cuna: rol cambiado a "Gerente de Sistemas / Project Manager" (CV) en vez de "Consultor Técnico / Responsable de Sistemas" (texto anterior del sitio). | El CV es la fuente maestra. | Confirmar. |
| 1.7 | YPFB: rol "Director de Soluciones Corporativas / Ingeniero de Software Senior" (CV) en vez de "/ Project Manager TI". | Igual que 1.6. | Confirmar. |
| 1.8 | SIAF: se mantiene "1º ERP hospitalario sobre LAN en Bolivia" (ya estaba en el sitio y en el testimonio de JICA). Métrica "6 años de diseño, desarrollo e implementación (1997–2003)". | Dato existente. | — |
| 1.9 | VIPFE: "Mensual" en lugar de "12 informes al año" (estuviste ~11 meses). | No exagerar. | — |
| 1.10 | Cuna: stack mantiene **Laravel** (estaba en el sitio), aunque el CV lo asocia a 2015+. | No quitar sin confirmar. | **Sí — Laravel salió en 2011; confirmar si se usó en Cuna.** |
| 1.11 | Página de listado: "5 países involucrados" = Bolivia, Chile y Argentina (misiones VIPFE), Perú y Ecuador (Cuna). | Derivado de los proyectos. | — |

## 2. Fotografías

- 24 fotos de **Unsplash** (licencia gratuita, uso comercial, sin atribución obligatoria), guardadas localmente en
  `public/images/proyectos/<slug>/` (cover 2000×1125, galería 1200×900; ~5,4 MB en total, carga diferida).
- Son **ilustrativas, no de las instituciones reales**: cada página muestra la nota "Fotos ilustrativas · Unsplash"
  y el alt dice "(foto ilustrativa)". Así nadie cree que es el edificio real del BCB o de YPFB.
- Se descartó una foto que mostraba a una figura política real.
- IDs de origen (images.unsplash.com/photo-…), por si se quiere cambiar alguna:

| Proyecto | cover | gallery-1 | gallery-2 | gallery-3 |
|---|---|---|---|---|
| modernizacion-banco-central | 1541354329998-f4d9a9f9297f | 1558494949-ef010cbdcc31 | 1601597111158-2fceff292cdc | 1611974789855-9c2a0a7236a3 |
| migracion-financiero-ypfb | 1513828583688-c52646db42da | 1473341304170-971dccb5ac1e | 1544197150-b99a580bb7a8 | 1586528116311-ad8dd3c8310d |
| sisin-sisfin-inversion-publica | 1555848962-6e79363ec58f | 1477959858617-67f85cf4f1df | 1454165804606-c3d57bc86b40 | 1434626881859-194d67b2b86f |
| siaf-hospital-japones | 1519494026892-80bbd2d6fd0d | 1538108149393-fbbd81895907 | 1576091160399-112ba8d25d1d | 1584982751601-97dcc096659c |
| sispro-seguimiento-proyectos | 1500382017468-9049fed747ef | 1574943320219-553eb213f72d | 1625246333195-78d9c38ad449 | 1441974231531-c6227db76b6e |
| monitoreo-evaluacion-cuna | 1488521787991-ed7bbaae773c | 1551288049-bebda4e38f71 | 1552664730-d307ca884978 | 1469571486292-0ba58a3f068b |

**Revisar:** si tienes fotos reales (con permiso) de algún proyecto, reemplazan a estas con el mismo nombre de archivo.

## 3. Arquitectura e idiomas

| # | Decisión | Por qué |
|---|----------|---------|
| 3.1 | `src/data/projects.ts` es la **fuente única** bilingüe (`text.en` / `text.es`) para la home, el listado y los casos. Se eliminó `portfolioConfig.cardText`. | Un solo lugar para editar cada proyecto. |
| 3.2 | Textos de interfaz de estas páginas en `projectsPage` (en `src/content/en.ts` y `es.ts`). | Mismo patrón i18n de la Task 11. |
| 3.3 | **Se mantienen las URLs `/proyectos/<slug-en-español>`** también en inglés. | Ya están publicadas (están en `main`) y pueden estar compartidas o indexadas; cambiarlas rompería enlaces. Sin rutas duplicadas (regla de la Task 11). Si se quiere `/projects/...` en inglés, se puede agregar después con redirección. |
| 3.4 | El test `npm run test:i18n` ahora valida también los proyectos: paridad EN/ES, sin español en EN, imágenes existentes, sin "30 años de experiencia". | Evitar regresiones. |

## 4. Diseño UI/UX (misma línea gráfica)

- Paleta, tipografía (Plus Jakarta / Geist Mono), degradado de marca cian→azul→violeta, fondos `about-dark` y
  `specialties-light`, y animaciones fade-up de 700 ms: **idénticos a la home**.
- Caso de estudio, en orden: hero a pantalla casi completa con zoom de entrada + parallax suave → tarjeta de
  metadatos superpuesta → historia (reto como cita fija + contexto y solución) → banda oscura de impacto con
  **contadores animados** → línea de tiempo del enfoque con riel que se llena al hacer scroll → rol y logros →
  galería bento con **lightbox** (teclado: ← → Esc) → capacidades y herramientas → CTA → anterior/siguiente con
  foto → footer.
- Listado: cabecera oscura con 3 cifras animadas y filas editoriales alternadas con la métrica principal sobre la foto.
- Navbar y footer del sitio reutilizados (con selector EN | ES). Desde una página interior, "Get in Touch",
  los enlaces del menú y del footer llevan a la sección correcta de la home (`/#contact`, etc.).
- Accesibilidad: `prefers-reduced-motion` respetado, breadcrumb con `aria-current`, lightbox con `role="dialog"`,
  foco en cerrar, alt en todas las imágenes, cifras con texto para lectores de pantalla.

## 5. Cambios colaterales

- `Navigation`, `Footer` y `Portfolio`: el `return null` se movió después de los hooks (corrige errores de lint
  *rules-of-hooks* que ya existían). Lint del repo: 42 → 33 errores (los restantes son previos, en otros archivos).
- `AnimatedButton` acepta `onClick` también cuando es enlace.
- La home hace scroll a `#sección` al llegar desde otra página.

## Pendiente (no hecho)

- No se desplegó nada ni se tocó `main`.
- Pendientes previos del backlog siguen igual (texto en fotos del hero/bio, "© 2025", JSON-LD `worksFor`, blog en español, pasos 4 y 5).
