'use strict';
const fs   = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const COLLECTIONS = ['leads', 'orders', 'download_tokens', 'email_log'];
const store = {};

function dbPath(name) { return path.join(DATA_DIR, `${name}.json`); }

function load(name) {
  const p = dbPath(name);
  if (!fs.existsSync(p)) fs.writeFileSync(p, '[]', 'utf8');
  try { store[name] = JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch (_) { store[name] = []; }
}

function save(name) {
  fs.writeFileSync(dbPath(name), JSON.stringify(store[name], null, 2), 'utf8');
}

function nextId(name) {
  const col = store[name] || [];
  return col.length === 0 ? 1 : Math.max(...col.map(r => r.id)) + 1;
}

function initDb() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  COLLECTIONS.forEach(load);
  console.log('[DB] JSON store inicializado en', DATA_DIR);
}

function insert(name, record) {
  const id  = nextId(name);
  const now = new Date().toISOString();
  const row = { id, created_at: now, ...record };
  store[name].push(row);
  save(name);
  return row;
}

function findOne(name, predicate) {
  return (store[name] || []).find(predicate) || null;
}

function update(name, predicate, patch) {
  let changed = false;
  store[name] = (store[name] || []).map(row => {
    if (predicate(row)) { changed = true; return { ...row, ...patch }; }
    return row;
  });
  if (changed) save(name);
  return changed;
}

function countAll(name) { return (store[name] || []).length; }

const db = {
  insertLead:    (d)        => insert('leads', d),
  findLead:      (email)    => findOne('leads', r => r.email === email),
  countLeads:    ()         => countAll('leads'),
  insertOrder:   (d)        => insert('orders', d),
  findOrder:     (paypalId) => findOne('orders', r => r.paypal_order_id === paypalId),
  markOrderPaid: (paypalId) => update('orders', r => r.paypal_order_id === paypalId, { status: 'paid', paid_at: new Date().toISOString() }),
  insertToken:   (d)        => insert('download_tokens', d),
  findToken:     (token)    => findOne('download_tokens', r => r.token === token),
  incrementToken:(token, ip) => {
    const row = findOne('download_tokens', r => r.token === token);
    if (!row) return false;
    return update('download_tokens', r => r.token === token, { downloads: (row.downloads || 0) + 1, last_ip: ip });
  },
  logEmail: (d) => insert('email_log', d),
};

module.exports = { initDb, db };
