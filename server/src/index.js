'use strict';
require('dotenv').config();

const express = require('express');
const cors    = require('cors');
const helmet  = require('helmet');
const rateLimit = require('express-rate-limit');
const path    = require('path');

const { initDb }       = require('./db');
const leadsRouter      = require('./routes/leads');
const paypalRouter     = require('./routes/paypal');
const downloadRouter   = require('./routes/download');

// ─── App ──────────────────────────────────────────────────────────────────────
const app  = express();
const PORT = process.env.PORT || 3001;

// ─── Security ─────────────────────────────────────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: { policy: 'same-site' } }));
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:5174',
  ],
  credentials: true,
}));

// ─── Rate limiting ────────────────────────────────────────────────────────────
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Demasiadas solicitudes. Intenta en 15 minutos.' },
});
const strictLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { error: 'Demasiados intentos. Intenta en 1 hora.' },
});

// ─── Body parsing ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Static assets for PDFs (served via /download route, NOT directly) ───────
// Never expose raw /assets publicly.

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/leads',    apiLimiter,    leadsRouter);
app.use('/api/paypal',   apiLimiter,    paypalRouter);
app.use('/api/download', strictLimiter, downloadRouter);

// ─── Health ───────────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ status: 'ok', ts: new Date().toISOString() }));

// ─── Error handler ────────────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('[ERROR]', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Error interno del servidor.' });
});

// ─── Start ───────────────────────────────────────────────────────────────────
initDb();
app.listen(PORT, () => {
  console.log(`\n🚀 ITIL4 Funnel Server corriendo en http://localhost:${PORT}`);
  console.log(`   Modo PayPal: ${process.env.PAYPAL_MODE || 'sandbox'}\n`);
});
