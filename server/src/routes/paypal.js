'use strict';
const express = require('express');
const router  = express.Router();
const fetch   = require('node-fetch');

const { db }                      = require('../db');
const { generateToken }           = require('../utils/token');
const { sendPurchaseConfirmation } = require('../utils/email');

// ─── PayPal REST API helpers ──────────────────────────────────────────────────
const BASE_URL = process.env.PAYPAL_MODE === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

async function getAccessToken() {
  const clientId     = process.env.PAYPAL_CLIENT_ID     || 'YOUR_CLIENT_ID';
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET || 'YOUR_SECRET';
  const creds        = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const res = await fetch(`${BASE_URL}/v1/oauth2/token`, {
    method:  'POST',
    headers: { Authorization: `Basic ${creds}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body:    'grant_type=client_credentials',
  });
  const data = await res.json();
  return data.access_token;
}

const PRICES = {
  book:   parseFloat(process.env.BOOK_PRICE_USD   || '37.00'),
  upsell: parseFloat(process.env.UPSELL_PRICE_USD || '17.00'),
};
const DESCRIPTIONS = {
  book:   'Preparación para la Certificación ITIL 4 Foundation — Guía + Solucionario de 40 Exámenes',
  upsell: 'Audiobook ITIL 4 Foundation — Escucha y aprende en cualquier lugar',
};

// ─── POST /api/paypal/create-order ────────────────────────────────────────────
router.post('/create-order', async (req, res, next) => {
  try {
    const { product = 'book', email, name } = req.body;
    if (!email || !name)  return res.status(400).json({ error: 'Email y nombre son requeridos.' });
    if (!PRICES[product]) return res.status(400).json({ error: 'Producto inválido.' });

    const token  = await getAccessToken();
    const amount = PRICES[product].toFixed(2);
    const ppRes  = await fetch(`${BASE_URL}/v2/checkout/orders`, {
      method:  'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', Prefer: 'return=representation' },
      body:    JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: { currency_code: 'USD', value: amount, breakdown: { item_total: { currency_code: 'USD', value: amount } } },
          items:  [{ name: DESCRIPTIONS[product], quantity: '1', unit_amount: { currency_code: 'USD', value: amount }, category: 'DIGITAL_GOODS' }],
          custom_id: JSON.stringify({ email, name, product }),
        }],
        application_context: { brand_name: 'Max Escobari — ITIL 4', locale: 'es-BO', shipping_preference: 'NO_SHIPPING', user_action: 'PAY_NOW' },
      }),
    });
    const order = await ppRes.json();
    if (!ppRes.ok) throw new Error(order.message || 'Error creando orden PayPal');

    // Save pending order in JSON DB
    if (!db.findOrder(order.id)) {
      db.insertOrder({ paypal_order_id: order.id, email: email.toLowerCase(), name, product, amount_usd: PRICES[product], status: 'pending', ip: req.ip || '' });
    }
    res.json({ orderID: order.id });
  } catch (err) { console.error('[PayPal create-order]', err.message); next(err); }
});

// ─── POST /api/paypal/capture-order ──────────────────────────────────────────
router.post('/capture-order', async (req, res, next) => {
  try {
    const { orderID } = req.body;
    if (!orderID) return res.status(400).json({ error: 'orderID requerido.' });

    const token   = await getAccessToken();
    const ppRes   = await fetch(`${BASE_URL}/v2/checkout/orders/${orderID}/capture`, {
      method:  'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body:    '{}',
    });
    const result = await ppRes.json();
    if (!ppRes.ok || result.status !== 'COMPLETED')
      return res.status(402).json({ error: 'El pago no fue completado.', detail: result.message });

    const storedOrder = db.findOrder(orderID);
    if (!storedOrder) return res.status(404).json({ error: 'Orden no encontrada en BD.' });

    db.markOrderPaid(orderID);
    const paidOrder  = db.findOrder(orderID);
    const dlToken    = generateToken(paidOrder.id, paidOrder.product);

    await sendPurchaseConfirmation(paidOrder.email, paidOrder.name, dlToken, paidOrder.product);

    res.json({ ok: true, downloadToken: dlToken, product: paidOrder.product, message: '¡Pago exitoso! Revisa tu email.' });
  } catch (err) { console.error('[PayPal capture-order]', err.message); next(err); }
});

// ─── POST /api/paypal/upsell-order ────────────────────────────────────────────
router.post('/upsell-order', async (req, res, next) => {
  try {
    const { originalToken } = req.body;
    if (!originalToken) return res.status(400).json({ error: 'originalToken requerido.' });

    const tokenRow = db.findToken(originalToken);
    if (!tokenRow) return res.status(404).json({ error: 'Token no encontrado.' });

    const mainOrder = db.findOrder ? null : null; // we have order_id
    // Find order by id from token
    const allOrders = require('../db').db;
    // Use order_id from tokenRow to find buyer info
    const buyerOrder = (() => {
      try {
        const { db: dbMod } = require('../db');
        // Scan orders for the id
        const orders = JSON.parse(require('fs').readFileSync(
          require('path').join(__dirname, '../../data/orders.json'), 'utf8'
        ));
        return orders.find(o => o.id === tokenRow.order_id) || null;
      } catch (_) { return null; }
    })();

    if (!buyerOrder) return res.status(404).json({ error: 'Comprador no encontrado.' });

    const token  = await getAccessToken();
    const amount = PRICES.upsell.toFixed(2);
    const ppRes  = await fetch(`${BASE_URL}/v2/checkout/orders`, {
      method:  'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', Prefer: 'return=representation' },
      body:    JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: { currency_code: 'USD', value: amount, breakdown: { item_total: { currency_code: 'USD', value: amount } } },
          items:  [{ name: DESCRIPTIONS.upsell, quantity: '1', unit_amount: { currency_code: 'USD', value: amount }, category: 'DIGITAL_GOODS' }],
          custom_id: JSON.stringify({ email: buyerOrder.email, name: buyerOrder.name, product: 'upsell' }),
        }],
        application_context: { brand_name: 'Max Escobari — ITIL 4', shipping_preference: 'NO_SHIPPING', user_action: 'PAY_NOW' },
      }),
    });
    const order = await ppRes.json();
    if (!ppRes.ok) throw new Error(order.message || 'Error creando orden upsell');

    db.insertOrder({ paypal_order_id: order.id, email: buyerOrder.email, name: buyerOrder.name, product: 'upsell', amount_usd: PRICES.upsell, status: 'pending', ip: req.ip || '' });
    res.json({ orderID: order.id });
  } catch (err) { console.error('[PayPal upsell-order]', err.message); next(err); }
});

module.exports = router;

