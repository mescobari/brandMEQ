'use strict';
const { v4: uuidv4 } = require('uuid');
const { db } = require('../db');

const EXPIRY_HOURS  = parseInt(process.env.DOWNLOAD_TOKEN_EXPIRY_HOURS || '168');
const MAX_DOWNLOADS = parseInt(process.env.DOWNLOAD_MAX_ATTEMPTS || '3');

function generateToken(orderId, product = 'book') {
  const token   = uuidv4();
  const expires = new Date(Date.now() + EXPIRY_HOURS * 60 * 60 * 1000).toISOString();
  db.insertToken({ token, order_id: orderId, product, downloads: 0, max_downloads: MAX_DOWNLOADS, expires_at: expires });
  return token;
}

function validateToken(token, ip) {
  const row = db.findToken(token);
  if (!row) return { valid: false, reason: 'Token inválido.' };
  if (new Date(row.expires_at) < new Date()) return { valid: false, reason: 'El link de descarga ha expirado. Contáctanos.' };
  if ((row.downloads || 0) >= row.max_downloads) return { valid: false, reason: `Límite de descargas (${row.max_downloads}) alcanzado.` };

  db.incrementToken(token, ip || 'unknown');

  // Fetch buyer info from orders
  const { db: rawDb } = require('../db');
  // We'll pass buyer info back via token row itself by joining manually
  return {
    valid:        true,
    product:      row.product,
    order_id:     row.order_id,
    downloads:    (row.downloads || 0) + 1,
    maxDownloads: row.max_downloads,
  };
}

module.exports = { generateToken, validateToken };
