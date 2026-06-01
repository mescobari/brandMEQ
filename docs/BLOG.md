# Módulo Blog — Arquitectura y guía

> Estado: **Fases 1, 2 y 3 implementadas** — lectura + URLs limpias + **prerender SSG** + **panel de administración (Decap CMS, modo local)**.

## Decisiones de arquitectura

| Tema | Decisión |
|------|----------|
| Framework | Se mantiene **Vite + React** (no se migró a Astro/Next, para no romper lo existente). |
| Contenido | **Markdown + frontmatter YAML** por artículo (no JSON monolítico). |
| Categorías | **Son las especialidades de la sección Especialidades** (`servicesConfig` en `src/config.ts`) — single source of truth. Los temas secundarios se definen en `src/blog/lib/posts.ts` (`TOPICS`). |
| Carga | `import.meta.glob` en build (`src/blog/lib/posts.ts`). Sin backend, sin BD. |
| Routing | Migrado de **HashRouter → BrowserRouter** (URLs limpias `/blog/...`). |
| Hosting | cPanel/Apache estático + `public/.htaccess` (SPA fallback). |
| Rendimiento | Rutas de blog/proyectos con **lazy-load**; `highlight.js` con solo los lenguajes usados. |
| SEO | Meta/OG/Twitter/canonical/JSON-LD `Article` por página (`src/blog/lib/useSeo.ts`). |

### Cambio relevante: URLs limpias
Todo el sitio pasó de `dominio/#/...` a `dominio/...`. `src/main.tsx` redirige automáticamente las URLs viejas con `#`. En el servidor, `public/.htaccess` sirve `index.html` para rutas sin archivo (deep links). `vite.config.ts` usa `base: '/'`.

## Estructura de carpetas

```
content/
  blog/<slug>.md            # artículos (frontmatter + cuerpo Markdown)
public/images/blog/<slug>/  # imágenes y galerías (subir manualmente)
src/blog/
  lib/posts.ts              # cargador, parser, render, helpers
  lib/useSeo.ts             # SEO por página
  components/ BlogLayout, PostCard, ShareButtons
  pages/ BlogListPage, BlogPostPage
```

## Cómo publicar un artículo

1. Crear `content/blog/mi-slug.md` con frontmatter:

```yaml
---
title: "Título del artículo"
subtitle: "Subtítulo opcional"
excerpt: "Resumen para listados y SEO."
date: 2026-06-01
updated: 2026-06-03        # opcional
author: Max Escobari
category: desarrollo-de-software   # slug de una especialidad (ver Especialidades)
topic: Node.js            # opcional
tags: ["Node.js", "Backend"]
cover: /images/blog/mi-slug/cover.jpg   # opcional (si falta, placeholder de marca)
draft: false              # true = no se publica
publishAt: 2026-06-10     # opcional: programar a futuro (no aparece hasta esa fecha)
---

Contenido en **Markdown**: encabezados, listas, > citas,
código con resaltado (```ts ... ```), imágenes y `<iframe>` para videos.
```

2. (Opcional) Subir imágenes a `public/images/blog/mi-slug/`.
3. `npm run build` y desplegar `dist/` (incluye `.htaccess`).

El artículo aparece automáticamente en `/blog`, su categoría y sus tags. Borradores (`draft: true`) y programados a futuro se ocultan en producción.

## Rutas

| Ruta | Página |
|------|--------|
| `/blog` | Listado (con búsqueda, filtro por categoría, paginación) |
| `/blog/categoria/:cat` | Artículos de una categoría |
| `/blog/tag/:tag` | Artículos de un tag |
| `/blog/:slug` | Artículo individual |

## Build y despliegue (con SSG)

| Comando | Qué hace |
|---------|----------|
| `npm run build` | **Build de producción**: typecheck + `vite build` + **prerender SSG** (`scripts/prerender.mjs`). Genera HTML real por ruta + `sitemap.xml` + `rss.xml`. **Este es el que se despliega.** |
| `npm run build:fast` | Build rápido sin prerender (para verificación local). |
| `npm run prerender` | Solo el prerender (requiere un `dist/` ya construido). |

Despliegue: subir **todo** `dist/` a Apache/cPanel (incluye `.htaccess`, `robots.txt`, `sitemap.xml`, `rss.xml` y las carpetas `index.html` por ruta).

### Cómo funciona el prerender (Fase 2)
`scripts/prerender.mjs` levanta `vite preview`, recorre el sitio con un navegador headless (**Puppeteer**), descubre las rutas por sus enlaces internos y guarda el HTML ya renderizado (contenido + `<title>` + Open Graph + JSON-LD `Article`) en `dist/<ruta>/index.html`. Apache sirve esos HTML directamente; el `.htaccess` cubre cualquier ruta no prerenderizada. Es **agnóstico a versiones** (ejecuta el SPA real) y **no modifica el código de la app**.

## Administración (Fase 3 — Decap CMS, modo local)

Panel gráfico en **`/admin`** (Decap CMS, cargado por CDN → **sin dependencias en el bundle**). En modo local edita los `.md` directamente en tu equipo, **sin login ni servicios**.

### Flujo de trabajo para publicar
1. Terminal 1: `npm run dev` (la app).
2. Terminal 2: `npm run cms` (proxy local de Decap en el puerto 8081).
3. Abre **`http://localhost:5173/admin/index.html`**.
4. Crea/edita artículos con el formulario (título, categoría = especialidad, tags, portada, contenido Markdown, borrador, programación…). Al **guardar**, Decap escribe/actualiza el `.md` en `content/blog/` y las imágenes en `public/images/blog/`.
5. Revisa en `/blog`, luego: `git add . && git commit` → `npm run build` → subir `dist/`.

### Archivos
- `public/admin/index.html` — carga Decap CMS por CDN.
- `public/admin/config.yml` — colección "blog", campos (= frontmatter) y opciones de categoría (las 6 especialidades).

> ⚠️ Las opciones de **categoría** en `config.yml` son YAML estático: si cambias las especialidades en `src/config.ts`, actualiza también la lista en `config.yml`.

### Upgrade futuro a edición remota (web, opcional)
`config.yml` ya trae el backend `github` (repo `mescobari/brandMEQ`). Para editar/publicar **desde la web con login** en tu hosting cPanel:
1. Crear una **GitHub OAuth App**.
2. Desplegar un **proxy OAuth en PHP** en tu cPanel (Apache + PHP) y apuntar el backend a él.
3. Quitar/ignorar `local_backend` en producción.

Mientras tanto, `/admin` en producción muestra el login pero solo funciona en local. Si no quieres exponerlo, puedes protegerlo con **Basic Auth** vía `.htaccess` en la carpeta `/admin`, o no subir `dist/admin/`.
