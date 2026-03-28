'use strict';
const express = require('express');
const router  = express.Router();
const path    = require('path');
const fs      = require('fs');
const { validateToken } = require('../utils/token');
const { db }            = require('../db');

const PDF_PATHS = {
  book:      process.env.BOOK_PDF_PATH      || path.join(__dirname, '../../assets/libro-itil4-completo.pdf'),
  upsell:    process.env.AUDIOBOOK_PDF_PATH || path.join(__dirname, '../../assets/audiobook-itil4.pdf'),
  checklist: process.env.CHECKLIST_PDF_PATH || path.join(__dirname, '../../assets/checklist-7dias.pdf'),
  glossary:  process.env.GLOSSARY_PDF_PATH  || path.join(__dirname, '../../assets/glosario-itil4.pdf'),
  sample:    process.env.SAMPLE_PDF_PATH    || path.join(__dirname, '../../assets/muestra-itil4.pdf'),
};

// GET /api/download/info/:token
router.get('/info/:token', (req, res) => {
  const row = db.findToken(req.params.token);
  if (!row) return res.status(404).json({ error: 'Token inválido.' });
  const expired = new Date(row.expires_at) < new Date();
  const used_up = (row.downloads || 0) >= row.max_downloads;
  const order   = db.findOrder ? null : null; // buyer info via token order_id
  res.json({
    valid: !expired && !used_up,
    product: row.product,
    downloads: row.downloads || 0,
    maxDownloads: row.max_downloads,
    expiresAt: row.expires_at,
    expired, used_up,
  });
});

// GET /api/download/:token
router.get('/:token', (req, res) => {
  const ip     = req.ip || '';
  const result = validateToken(req.params.token, ip);
  if (!result.valid) return res.status(403).json({ error: result.reason });

  const pdfPath = PDF_PATHS[result.product];
  if (!pdfPath || !fs.existsSync(pdfPath)) {
    return res.status(404).json({
      error: 'Archivo no encontrado. Contacta soporte@mescobari.com.',
      debug: process.env.NODE_ENV !== 'production' ? pdfPath : undefined,
    });
  }

  const stat = fs.statSync(pdfPath);
  res.set({
    'Content-Type':           'application/pdf',
    'Content-Disposition':    `attachment; filename="${path.basename(pdfPath)}"`,
    'Content-Length':         stat.size,
    'Cache-Control':          'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  const stream = fs.createReadStream(pdfPath);
  stream.pipe(res);
  stream.on('error', (err) => {
    console.error('[DOWNLOAD] Stream error:', err.message);
    if (!res.headersSent) res.status(500).json({ error: 'Error al descargar.' });
  });
});

module.exports = router;
