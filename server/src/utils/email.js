'use strict';
const nodemailer = require('nodemailer');
const { getDb }  = require('../db');

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM = process.env.EMAIL_FROM || '"Max Escobari" <soporte@mescobari.com>';
const BASE = process.env.FRONTEND_URL || 'http://localhost:5173';

// ─── Helpers ─────────────────────────────────────────────────────────────────
async function send(to, subject, html, type = 'general') {
  const db = getDb();
  try {
    await transport.sendMail({ from: FROM, to, subject, html });
    db.prepare(`INSERT INTO email_log (to_email, subject, type, success) VALUES (?,?,?,1)`)
      .run(to, subject, type);
    console.log(`[EMAIL] ✅ Sent "${subject}" → ${to}`);
  } catch (err) {
    db.prepare(`INSERT INTO email_log (to_email, subject, type, success) VALUES (?,?,?,0)`)
      .run(to, subject, type);
    console.error(`[EMAIL] ❌ Failed → ${to}:`, err.message);
    // Don't rethrow — email failure should not break the request
  }
}

const base = (content) => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <style>
    body{margin:0;padding:0;background:#f4f4f8;font-family:'Segoe UI',Arial,sans-serif;color:#1F2937;}
    .wrap{max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08);}
    .header{background:linear-gradient(135deg,#6B2D91,#8B5CF6);padding:40px 32px;text-align:center;}
    .header h1{margin:0;color:#fff;font-size:24px;font-weight:800;}
    .header p{margin:8px 0 0;color:rgba(255,255,255,.8);font-size:14px;}
    .body{padding:32px;}
    .body p{line-height:1.7;margin:0 0 16px;}
    .btn{display:inline-block;padding:14px 32px;background:#FF6B35;color:#fff!important;text-decoration:none;border-radius:10px;font-weight:700;font-size:16px;margin:16px 0;}
    .box{background:#F3EEFF;border-left:4px solid #6B2D91;border-radius:8px;padding:16px 20px;margin:16px 0;}
    .footer{background:#1a0033;padding:24px 32px;text-align:center;color:rgba(255,255,255,.5);font-size:12px;}
    .footer a{color:rgba(255,255,255,.6);text-decoration:none;}
    .stars{color:#f59e0b;font-size:20px;letter-spacing:2px;}
  </style>
</head>
<body>
  <div style="padding:24px 16px;">
    <div class="wrap">${content}</div>
  </div>
</body>
</html>`;

const footer = () => `
<div class="footer">
  <p>© ${new Date().getFullYear()} Ing. Max Escobari Quiroga · <a href="${BASE}">mescobari.com</a></p>
  <p>Para cancelar suscripción: <a href="#">clic aquí</a> · <a href="#">Soporte</a></p>
  <p style="font-size:10px;margin-top:8px;">ITIL® es marca registrada de AXELOS Limited. Sin afiliación oficial.</p>
</div>`;

// ─── Email 1: Lead Magnet delivery ────────────────────────────────────────────
async function sendLeadMagnet(to, name) {
  const subject = '🎁 Tus PDFs gratuitos de ITIL 4 están aquí';
  const html = base(`
    <div class="header">
      <h1>¡Hola, ${name}! 👋</h1>
      <p>Tus recursos de estudio gratuitos te esperan</p>
    </div>
    <div class="body">
      <p>Me alegra mucho que hayas dado el primer paso hacia tu certificación ITIL 4.</p>
      <p>Aquí tienes los dos PDFs que prometí:</p>
      <div class="box">
        <strong>📋 Checklist: Los 7 Días Previos al Examen</strong><br/>
        <small>El plan exacto para llegar en óptimas condiciones al día del examen.</small>
      </div>
      <div class="box">
        <strong>📖 Glosario de Términos Clave de ITIL 4</strong><br/>
        <small>Los 80+ términos que sí o sí aparecen en el examen, con definiciones claras.</small>
      </div>
      <p style="text-align:center">
        <a class="btn" href="${BASE}/#/ventas?ref=email1">
          📥 Descargar mis PDFs Gratis
        </a>
      </p>
      <p>En los próximos días te enviaré más recursos de estudio. Pero si estás decidido a certificarte pronto, hay una forma más rápida:</p>
      <p style="text-align:center">
        <a href="${BASE}/#/ventas" style="color:#6B2D91;font-weight:600;">
          → Ver la guía completa con 40 exámenes tipo resueltos
        </a>
      </p>
      <p>Cualquier pregunta, responde este email directamente.</p>
      <p>¡A certificarse! 🏆<br/><strong>Max Escobari</strong><br/><small>ITIL® Certified Professional</small></p>
    </div>
    ${footer()}
  `);
  await send(to, subject, html, 'lead_magnet');
}

// ─── Email 2: Day 2 — Testimonio ──────────────────────────────────────────────
async function sendLeadDay2(to, name) {
  const subject = '📊 Carlos aprobó ITIL 4 con 87%... así lo hizo';
  const html = base(`
    <div class="header">
      <h1>${name}, mira este resultado 👇</h1>
      <p>Una historia real que te va a motivar</p>
    </div>
    <div class="body">
      <div class="box">
        <div class="stars">★★★★★</div>
        <p style="margin:8px 0 4px;font-style:italic;">"Estudié con este libro durante 4 semanas y aprobé con 87%. Las explicaciones de cada pregunta son lo que realmente marca la diferencia — entiendes por qué está bien o mal, no solo memorizas."</p>
        <small>— <strong>Carlos R.</strong>, IT Service Manager · Lima, Perú</small>
      </div>
      <p>Lo que Carlos hizo diferente fue simple: usó un método.</p>
      <p>No estudió más horas. Estudió de forma diferente, con material que explica el <em>razonamiento</em> del examinador.</p>
      <p>El libro tiene exactamente eso: 40 preguntas tipo con análisis completo de cada opción.</p>
      <p style="text-align:center">
        <a class="btn" href="${BASE}/#/ventas">
          🎯 Ver el contenido completo del libro
        </a>
      </p>
      <p>¿Tienes alguna duda sobre si este material es para ti? Responde este email y te ayudo personalmente.</p>
      <p>Saludos,<br/><strong>Max</strong></p>
    </div>
    ${footer()}
  `);
  await send(to, subject, html, 'lead_day2');
}

// ─── Email 3: Day 4 — Contenido del libro ─────────────────────────────────────
async function sendLeadDay4(to, name) {
  const subject = '📚 Por dentro: qué incluye el libro de ITIL 4';
  const html = base(`
    <div class="header">
      <h1>¿Qué hay dentro del libro?</h1>
      <p>Un desglose honesto para que decidas con información</p>
    </div>
    <div class="body">
      <p>Hola ${name},</p>
      <p>Muchos me preguntan exactamente qué incluye el libro antes de comprarlo. Respuesta directa:</p>
      <div class="box"><strong>📅 Capítulo 1 – Plan de 4 Semanas</strong><br/>Un plan día a día con objetivos claros. Semana 1: fundamentos. Semana 2: SVS y prácticas. Semana 3: simulacros intensivos. Semana 4: estrategia final.</div>
      <div class="box"><strong>🧠 Capítulo 2 – Fundamentos Técnicos</strong><br/>Los 7 principios guía, las 4 dimensiones, la cadena de valor, y las 14 prácticas explicadas con analogías reales. Sin jerga innecesaria.</div>
      <div class="box"><strong>✅ Capítulo 3 – Solucionario de 40 Preguntas</strong><br/>Cada pregunta tiene: respuesta correcta, análisis de las 4 opciones, y la "trampa mental" que usa el examinador. Esto es lo que más diferencia al libro.</div>
      <p>Todo esto por <strong>$37 USD</strong> (precio normal: $97).</p>
      <p style="text-align:center">
        <a class="btn" href="${BASE}/#/ventas">🚀 Quiero el libro completo →</a>
      </p>
      <p>La oferta especial expira pronto. Cualquier consulta, estoy aquí.</p>
      <p><strong>Max</strong></p>
    </div>
    ${footer()}
  `);
  await send(to, subject, html, 'lead_day4');
}

// ─── Email 4: Day 7 — Oferta final ────────────────────────────────────────────
async function sendLeadDay7(to, name) {
  const subject = '⏰ Última oportunidad — Oferta termina hoy';
  const html = base(`
    <div class="header">
      <h1>Hoy es el último día, ${name}</h1>
      <p>La oferta especial termina a medianoche</p>
    </div>
    <div class="body">
      <p>Esta semana te compartí recursos gratis, testimonios reales y el contenido del libro.</p>
      <p>Hoy quiero ser directo contigo:</p>
      <p style="font-size:18px;font-weight:700;color:#6B2D91;">¿Cuánto vale para ti aprobar la certificación ITIL 4?</p>
      <p>Un aumento salarial promedio tras certificarte en ITIL 4: <strong>+15% a +30%</strong>.</p>
      <p>El costo de reprobar el examen: <strong>$250+ USD</strong> solo en fees.</p>
      <p>El costo del libro: <strong>$37 USD hoy</strong>. Un café por semana.</p>
      <div class="box" style="text-align:center;border-color:#FF6B35;">
        <p style="font-size:32px;font-weight:900;color:#FF6B35;margin:0;">$37 USD</p>
        <p style="margin:4px 0 0;font-size:13px;color:#666;">Precio normal: <s>$97 USD</s> · Solo hoy</p>
      </div>
      <p style="text-align:center">
        <a class="btn" href="${BASE}/#/ventas">🏆 Sí, quiero certificarme →</a>
      </p>
      <p>Si decides que no es para ti, lo entiendo. Pero si hay una parte de ti que sabe que quieres avanzar en tu carrera… este es el momento.</p>
      <p>Con todo el apoyo,<br/><strong>Max Escobari</strong></p>
    </div>
    ${footer()}
  `);
  await send(to, subject, html, 'lead_day7');
}

// ─── Purchase confirmation ────────────────────────────────────────────────────
async function sendPurchaseConfirmation(to, name, downloadToken, product = 'book') {
  const downloadUrl = `${BASE}/#/entrega/${downloadToken}`;
  const subject = '🎉 ¡Compra exitosa! Tu libro ITIL 4 te espera';
  const html = base(`
    <div class="header">
      <h1>¡Gracias por tu compra, ${name}!</h1>
      <p>Tu camino hacia la certificación comienza ahora</p>
    </div>
    <div class="body">
      <p>Tu pago fue procesado exitosamente. 🎊</p>
      <div class="box" style="border-color:#10b981;">
        <strong>✅ Pedido confirmado</strong><br/>
        <small>Producto: ${product === 'book' ? 'Guía ITIL 4 + Solucionario' : 'Guía ITIL 4 + Solucionario + Audiobook'}</small><br/>
        <small>Acceso: Link seguro de descarga (válido 7 días)</small>
      </div>
      <p style="text-align:center">
        <a class="btn" href="${downloadUrl}">
          📥 Descargar mi libro ahora
        </a>
      </p>
      <p><strong>⚠️ Importante:</strong> Guarda este email. El link de descarga es personal y válido por 7 días (3 descargas máximo).</p>
      <p><strong>¿Necesitas ayuda?</strong> Escríbenos a <a href="mailto:soporte@mescobari.com">soporte@mescobari.com</a> y respondemos en menos de 24 horas.</p>
      <p>¡A conquistar esa certificación! 🏆<br/><strong>Max Escobari</strong></p>
    </div>
    ${footer()}
  `);
  await send(to, subject, html, 'purchase_confirmation');
}

// ─── Upsell purchase confirmation ────────────────────────────────────────────
async function sendUpsellConfirmation(to, name, downloadToken) {
  const downloadUrl = `${BASE}/#/entrega/${downloadToken}`;
  const subject = '🎧 ¡Tu Audiobook ITIL 4 está listo!';
  const html = base(`
    <div class="header">
      <h1>¡Excelente decisión, ${name}!</h1>
      <p>Tu Audiobook de ITIL 4 está disponible</p>
    </div>
    <div class="body">
      <p>Hemos agregado el <strong>Audiobook de ITIL 4</strong> a tu pedido.</p>
      <p>Ahora puedes estudiar en cualquier lugar: en el auto, caminando, en el gimnasio.</p>
      <p style="text-align:center">
        <a class="btn" href="${downloadUrl}">
          🎧 Descargar mi Audiobook
        </a>
      </p>
      <p>¡El conocimiento no espera! Tu certificación está más cerca que nunca.</p>
      <p><strong>Max</strong></p>
    </div>
    ${footer()}
  `);
  await send(to, subject, html, 'upsell_confirmation');
}

module.exports = {
  sendLeadMagnet,
  sendLeadDay2,
  sendLeadDay4,
  sendLeadDay7,
  sendPurchaseConfirmation,
  sendUpsellConfirmation,
};
