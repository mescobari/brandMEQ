---
title: "Artículo de prueba: verificando el flujo del blog"
subtitle: "Un post de ejemplo para validar publicación, categoría, tags y SEO"
excerpt: "Artículo de prueba creado para verificar de extremo a extremo el módulo de blog: frontmatter, render de Markdown, categoría como especialidad, tags, tiempo de lectura y SEO. Puedes borrarlo cuando quieras."
date: 2026-05-31
author: Max Escobari
category: implementacion-itil
topic: ITIL 4
tags: ["Prueba", "ITIL 4", "Service Desk"]
draft: false
---

Este es un **artículo de prueba**. Su única función es verificar que el módulo de blog funciona de extremo a extremo: que el archivo Markdown se detecta, se parsea su frontmatter, se renderiza el contenido, se asigna la categoría correcta (una *Especialidad*) y se calculan tags y tiempo de lectura.

> Si estás leyendo esto en `/blog/articulo-de-prueba`, el flujo completo funciona. 🎉

## Qué estamos verificando

1. **Detección automática** — el archivo `.md` aparece sin tocar código.
2. **Categoría = Especialidad** — este post se clasifica bajo *Implementación ITIL*.
3. **Tags** — aparece en `/blog/tag/itil-4` y demás.
4. **SEO** — título, descripción, Open Graph y JSON-LD `Article` por página.

### Un bloque de código

```typescript
function saludar(nombre: string): string {
  return `Hola, ${nombre}. El blog funciona.`;
}

console.log(saludar('Max'));
```

### Una lista de tareas típica de ITIL 4

- Gestión de incidentes
- Gestión de cambios
- Gestión de la disponibilidad
- Mejora continua del servicio

## Conclusión

Si todo lo anterior se ve bien renderizado, el módulo de blog está listo para publicar contenido real. **Puedes eliminar este archivo** (`content/blog/articulo-de-prueba.md`) cuando termines de revisar.
