---
title: "Arquitectura backend con Node.js: principios para sistemas que duran"
subtitle: "Cómo estructurar servicios mantenibles, observables y escalables"
excerpt: "Una guía práctica, basada en proyectos de misión crítica, para diseñar backends en Node.js que resistan el crecimiento y el cambio sin colapsar en deuda técnica."
date: 2026-05-12
updated: 2026-05-18
author: Max Escobari
category: desarrollo-de-software
topic: Node.js
tags: ["Node.js", "Backend", "Arquitectura", "APIs"]
cover: /images/blog/arquitectura-backend-node/cover.jpg
draft: false
---

Tras liderar la migración de sistemas financieros heredados de más de 30 años, hay una lección que se repite: **la arquitectura no se trata de elegir el framework más moderno, sino de contener la complejidad** a medida que el sistema crece.

## El principio rector: separar lo que cambia de lo que no

La regla más rentable que he aplicado es aislar las **reglas de negocio** de los **detalles de infraestructura** (la base de datos, el framework HTTP, los proveedores externos).

> Si tu lógica de negocio importa directamente el cliente de la base de datos, ya tienes un problema de mantenibilidad esperando a ocurrir.

### Capas mínimas recomendadas

1. **Dominio** — entidades y reglas puras, sin dependencias externas.
2. **Casos de uso** — orquestan el dominio para resolver una intención.
3. **Adaptadores** — HTTP, base de datos, colas, terceros.

## Un ejemplo concreto

```typescript
// caso de uso: independiente del framework y de la base de datos
export class RegistrarPago {
  constructor(private readonly pagos: RepositorioPagos) {}

  async ejecutar(input: NuevoPago): Promise<Pago> {
    const pago = Pago.crear(input); // valida invariantes en el dominio
    await this.pagos.guardar(pago);
    return pago;
  }
}
```

El controlador HTTP solo traduce la petición y delega:

```typescript
router.post('/pagos', async (req, res) => {
  const pago = await registrarPago.ejecutar(req.body);
  res.status(201).json(pago);
});
```

## Observabilidad desde el día uno

En sistemas críticos, **lo que no puedes medir, no lo puedes operar**. Tres mínimos no negociables:

- Logs estructurados (JSON) con correlación por request.
- Métricas de latencia y tasa de error por endpoint.
- Trazas distribuidas cuando hay múltiples servicios.

## Conclusión

La longevidad de un backend se decide en sus fronteras: mantén el dominio limpio, haz reemplazables los detalles y mide todo. El resto es disciplina sostenida en el tiempo.
