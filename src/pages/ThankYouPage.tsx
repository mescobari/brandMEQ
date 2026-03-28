import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, BookOpen, Mail, Users, Share2, Download, Star, ArrowRight } from 'lucide-react';
import { getDownloadUrl } from '../lib/api';

// ─── Confetti ligero ──────────────────────────────────────────────────────────
function launchConfetti() {
  const colors = ['#6B2D91', '#8B5CF6', '#c084fc', '#fbbf24', '#34d399', '#60a5fa'];
  for (let i = 0; i < 150; i++) {
    const el = document.createElement('div');
    el.style.cssText = `
      position:fixed;top:-10px;left:${Math.random() * 100}vw;
      width:${5 + Math.random() * 7}px;height:${5 + Math.random() * 7}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
      pointer-events:none;z-index:9999;
      animation:confFall ${2 + Math.random() * 2}s ease-in forwards;
      animation-delay:${Math.random()}s;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 5000);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
export default function ThankYouPage() {
  const [params]        = useSearchParams();
  const hasUpsell       = params.get('upsell') === 'true';
  const downloadToken   = params.get('token') || '';
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    launchConfetti();
    // segundo lanzamiento de confetti
    const t = setTimeout(launchConfetti, 1500);
    return () => clearTimeout(t);
  }, []);

  const shareUrl  = 'https://mescobari.com/#/itil4';
  const shareText = '¡Acabo de conseguir el libro ITIL 4 Foundation en español! Listo para certificarme 🚀';

  const shareLinks = [
    { label: 'WhatsApp',  href: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,          color: '#25D366' },
    { label: 'LinkedIn',  href: `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, color: '#0A66C2' },
    { label: 'Twitter/X', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, color: '#1d9bf0' },
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: '#0a0014', fontFamily: "'Open Sans', sans-serif", color: '#f0e6ff' }}>
      <style>{`
        @keyframes confFall{to{transform:translateY(110vh) rotate(720deg);opacity:0}}
        @keyframes itil-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse-ring{0%{transform:scale(1);opacity:0.6}100%{transform:scale(1.5);opacity:0}}
      `}</style>

      <main style={{ maxWidth: '780px', margin: '0 auto', padding: '72px 20px 80px' }}>

        {/* ── Hero de confirmación ─────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: '64px', animation: 'fadeUp 0.6s ease both' }}>
          {/* Ícono animado */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '32px' }}>
            <div style={{ position: 'absolute', inset: '-16px', borderRadius: '50%', border: '2px solid rgba(52,211,153,0.4)', animation: 'pulse-ring 2s ease-out infinite' }} />
            <div style={{ position: 'absolute', inset: '-8px', borderRadius: '50%', border: '2px solid rgba(52,211,153,0.2)', animation: 'pulse-ring 2s ease-out infinite 0.4s' }} />
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, #059669, #34d399)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 50px rgba(52,211,153,0.5)' }}>
              <CheckCircle size={52} color="#fff" />
            </div>
          </div>

          <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: '#fff', lineHeight: 1.2, marginBottom: '20px' }}>
            ¡Bienvenido al Club! 🎉<br />
            <span style={{ color: '#34d399' }}>Tu compra fue exitosa.</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#d4b8f0', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto' }}>
            {hasUpsell
              ? 'Tienes el <strong>libro completo + el audiobook ITIL 4</strong> en camino a tu email. Eres parte del grupo de profesionales que se certifican de manera inteligente.'
              : 'Tu libro ITIL 4 Foundation está en camino a tu email. Eres parte del grupo de profesionales que se certifican de manera inteligente.'}
          </p>
          {hasUpsell && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '16px', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '100px', padding: '8px 18px' }}>
              <Star size={14} fill="#fbbf24" color="#fbbf24" />
              <span style={{ color: '#fbbf24', fontWeight: 700, fontSize: '0.85rem' }}>Audiobook ITIL 4 también incluido</span>
            </div>
          )}
        </div>

        {/* ── Tarjeta de producto ─────────────────────────────────────────── */}
        <div style={{ background: 'linear-gradient(145deg, rgba(107,45,145,0.2), rgba(139,92,246,0.08))', border: '2px solid rgba(139,92,246,0.3)', borderRadius: '24px', padding: '36px', marginBottom: '40px', display: 'flex', flexWrap: 'wrap', gap: '28px', alignItems: 'center', animation: 'fadeUp 0.6s ease 0.15s both' }}>
          <img
            src="/images/portada2.png"
            alt="ITIL 4 Foundation"
            style={{ width: '120px', borderRadius: '10px', boxShadow: '0 16px 40px rgba(139,92,246,0.4)', animation: 'itil-float 3s ease-in-out infinite', flexShrink: 0 }}
          />
          <div style={{ flex: 1, minWidth: '220px' }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff', margin: '0 0 6px', fontSize: '1.2rem' }}>
              ITIL 4 Foundation: Guía Completa de Certificación
            </h2>
            <p style={{ color: '#9ca3af', margin: '0 0 20px', fontSize: '0.85rem' }}>PDF · +380 páginas · Descarga inmediata</p>
            {downloadToken && (
              <a
                href={getDownloadUrl(downloadToken)}
                download
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'linear-gradient(135deg, #6B2D91, #8B5CF6)', borderRadius: '10px', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem', fontFamily: "'Montserrat', sans-serif" }}
              >
                <Download size={18} /> Descargar Libro
              </a>
            )}
            {!downloadToken && (
              <p style={{ color: '#9ca3af', fontSize: '0.85rem', margin: 0 }}>
                📧 Revisa tu email — el enlace de descarga ya fue enviado.
              </p>
            )}
          </div>
        </div>

        {/* ── Lo que pasa ahora ──────────────────────────────────────────── */}
        <div style={{ marginBottom: '48px', animation: 'fadeUp 0.6s ease 0.25s both' }}>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", color: '#c084fc', fontSize: '1.3rem', fontWeight: 800, marginBottom: '24px' }}>
            ¿Qué pasa ahora?
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { icon: <Mail size={22} color="#60a5fa" />, title: 'Revisa tu email', desc: 'Te enviamos una confirmación con todos tus enlaces de descarga y el plan de estudio de 7 semanas. (Revisa también tu carpeta de spam si no lo ves en los próximos 5 minutos.)' },
              { icon: <Download size={22} color="#34d399" />, title: 'Descarga tu libro', desc: 'Usa el botón de arriba o el enlace del email para guardar tu PDF. Recomendamos guardarlo en Google Drive o Dropbox para acceso desde cualquier dispositivo.' },
              { icon: <BookOpen size={22} color="#c084fc" />, title: 'Empieza por el Módulo 1', desc: 'El primer capítulo — Fundamentos de Gestión de Servicios — toma solo 2 horas y sienta las bases para todo lo demás. Tómate un café y comienza hoy mismo.' },
              { icon: <Star size={22} color="#fbbf24" />, title: 'Agenda tu examen', desc: 'Entra a PeopleCert.org y reserva tu fecha de examen antes de terminar el libro. Tener una fecha real cambia completamente tu nivel de compromiso y velocidad de aprendizaje.' },
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '20px 24px', background: 'rgba(255,255,255,0.03)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(107,45,145,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {step.icon}
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: '#fff', margin: '0 0 6px', fontFamily: "'Montserrat', sans-serif" }}>{step.title}</p>
                  <p style={{ color: '#b8a4cc', margin: 0, lineHeight: 1.65, fontSize: '0.9rem' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Plan semana 1 ─────────────────────────────────────────────── */}
        <div style={{ padding: '32px', background: 'rgba(107,45,145,0.12)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '20px', marginBottom: '48px', animation: 'fadeUp 0.6s ease 0.35s both' }}>
          <h3 style={{ fontFamily: "'Montserrat', sans-serif", color: '#c084fc', marginBottom: '20px', fontSize: '1.1rem' }}>
            📅 Tu Plan de Estudio — Semana 1
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
            {[
              { day: 'Día 1–2',  topic: 'Módulo 1: Fundamentos de Gestión de Servicios', hrs: '2 h' },
              { day: 'Día 3–4',  topic: 'Módulo 2: El Sistema de Valor del Servicio (SVS)', hrs: '2.5 h' },
              { day: 'Día 5',    topic: 'Módulo 3: Las 4 Dimensiones', hrs: '1.5 h' },
              { day: 'Día 6',    topic: 'Primer simulacro de 20 preguntas', hrs: '45 min' },
              { day: 'Día 7',    topic: 'Revisión de errores + descanso activo', hrs: '1 h' },
            ].map((d, i) => (
              <div key={i} style={{ padding: '14px 16px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', border: '1px solid rgba(139,92,246,0.15)' }}>
                <p style={{ fontWeight: 700, color: '#8B5CF6', margin: '0 0 4px', fontSize: '0.82rem', fontFamily: "'Montserrat', sans-serif" }}>{d.day}</p>
                <p style={{ color: '#d4b8f0', margin: '0 0 6px', fontSize: '0.85rem', lineHeight: 1.5 }}>{d.topic}</p>
                <p style={{ color: '#6b7280', margin: 0, fontSize: '0.78rem' }}>⏱ {d.hrs}</p>
              </div>
            ))}
          </div>
          <p style={{ color: '#6b7280', fontSize: '0.82rem', marginTop: '16px', margin: '16px 0 0' }}>
            El plan completo de 7 semanas llegará a tu email junto con el libro.
          </p>
        </div>

        {/* ── Comunidad ────────────────────────────────────────────────────── */}
        <div style={{ padding: '32px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', marginBottom: '48px', textAlign: 'center', animation: 'fadeUp 0.6s ease 0.45s both' }}>
          <Users size={36} color="#c084fc" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff', marginBottom: '10px', fontSize: '1.2rem' }}>
            Únete a la Comunidad
          </h3>
          <p style={{ color: '#b8a4cc', lineHeight: 1.7, marginBottom: '24px', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto 24px' }}>
            Más de {(1843).toLocaleString('es-ES')} profesionales de TI comparten dudas, recursos y apoyo mutuo en nuestro grupo de WhatsApp. Estudia acompañado.
          </p>
          <a
            href="https://wa.me/g/XXXX"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: '#25D366', borderRadius: '12px', color: '#fff', textDecoration: 'none', fontWeight: 700, fontFamily: "'Montserrat', sans-serif" }}
          >
            <Users size={18} /> Unirme al Grupo WhatsApp <ArrowRight size={16} />
          </a>
        </div>

        {/* ── Compartir ────────────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', animation: 'fadeUp 0.6s ease 0.55s both' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
            <Share2 size={18} color="#8B5CF6" />
            <h3 style={{ fontFamily: "'Montserrat', sans-serif", color: '#c084fc', margin: 0, fontSize: '1.1rem' }}>Comparte tu logro</h3>
          </div>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '20px' }}>
            Cuéntale a tu red que vas por la certificación. Te sorprenderá cuántos colegas también quieren hacerlo.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '16px' }}>
            {shareLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: '10px 20px', background: s.color, borderRadius: '10px', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem' }}
              >
                {s.label}
              </a>
            ))}
            <button
              onClick={copyLink}
              style={{ padding: '10px 20px', background: copied ? '#34d399' : 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', color: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem', transition: 'all 0.2s' }}
            >
              {copied ? '✓ Copiado' : 'Copiar enlace'}
            </button>
          </div>
        </div>

        {/* ── Divider ───────────────────────────────────────────────────────── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '48px 0 32px' }} />

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#4b5563', fontSize: '0.8rem', margin: '0 0 8px' }}>
            ¿Tienes preguntas? <a href="mailto:soporte@mescobari.com" style={{ color: '#8B5CF6', textDecoration: 'none' }}>soporte@mescobari.com</a>
          </p>
          <p style={{ color: '#374151', fontSize: '0.78rem', margin: 0 }}>
            © {new Date().getFullYear()} Max Escobari Q. · Todos los derechos reservados
          </p>
        </div>
      </main>

      {/* ── TABLA DE IMÁGENES ─────────────────────────────────────────────── */}
      {import.meta.env.DEV && (
        <section style={{ padding: '48px 20px', background: '#111', borderTop: '2px solid #6B2D91' }}>
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <h3 style={{ fontFamily: "'Montserrat', sans-serif", color: '#c084fc', marginBottom: '20px' }}>📋 Tabla de Imágenes — ThankYouPage</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', color: '#d4b8f0' }}>
                <thead>
                  <tr style={{ background: 'rgba(107,45,145,0.3)' }}>
                    {['ID', 'Dimensiones', 'Descripción', 'Ubicación'].map(h => <th key={h} style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid rgba(139,92,246,0.3)' }}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 'portada2.png', dim: '120 × 162 px',  desc: 'Portada del libro en tarjeta de confirmación de compra', sec: 'Tarjeta de producto' },
                  ].map((r, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <td style={{ padding: '10px 14px', border: '1px solid rgba(139,92,246,0.15)', fontFamily: 'monospace', color: '#c084fc' }}>{r.id}</td>
                      <td style={{ padding: '10px 14px', border: '1px solid rgba(139,92,246,0.15)' }}>{r.dim}</td>
                      <td style={{ padding: '10px 14px', border: '1px solid rgba(139,92,246,0.15)' }}>{r.desc}</td>
                      <td style={{ padding: '10px 14px', border: '1px solid rgba(139,92,246,0.15)', color: '#9ca3af' }}>{r.sec}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
