import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, CheckCircle, Clock, AlertCircle, Gift, ChevronRight } from 'lucide-react';
import { getTokenInfo, getDownloadUrl, type TokenInfo } from '../lib/api';

// ─── Confetti ligero (sin dependencia externa) ────────────────────────────────
function spawnConfetti() {
  if (typeof window === 'undefined') return;
  const colors = ['#6B2D91', '#8B5CF6', '#c084fc', '#fbbf24', '#34d399'];
  for (let i = 0; i < 120; i++) {
    const el = document.createElement('div');
    el.style.cssText = `
      position:fixed;
      top:-10px;
      left:${Math.random() * 100}vw;
      width:${6 + Math.random() * 6}px;
      height:${6 + Math.random() * 6}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
      pointer-events:none;
      z-index:9999;
      animation: confettiFall ${1.5 + Math.random() * 2}s ease-in forwards;
      animation-delay:${Math.random() * 0.8}s;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
export default function DeliveryPage() {
  const { token }   = useParams<{ token: string }>();
  const navigate    = useNavigate();
  const [info, setInfo]             = useState<TokenInfo | null>(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');
  const [downloading, setDownloading] = useState(false);
  const [showUpsell, setShowUpsell] = useState(false);
  const [countdown, setCountdown]   = useState(30);

  // Cargar información del token
  useEffect(() => {
    if (!token) { setError('Token de descarga no encontrado.'); setLoading(false); return; }
    getTokenInfo(token)
      .then(data => { setInfo(data); setLoading(false); if (data.valid) spawnConfetti(); })
      .catch(() => { setError('No pudimos verificar tu enlace de descarga. Por favor contacta soporte.'); setLoading(false); });
  }, [token]);

  // Temporizador para banner de upsell
  useEffect(() => {
    if (!info?.valid) return;
    const timer = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { clearInterval(timer); setShowUpsell(true); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [info?.valid]);

  const handleDownload = useCallback(() => {
    if (!token) return;
    setDownloading(true);
    const url = getDownloadUrl(token);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ITIL4-Foundation-Guia-Completa.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => setDownloading(false), 3000);
  }, [token]);

  // ── Estados de carga / error ─────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0014', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '56px', height: '56px', border: '3px solid rgba(139,92,246,0.3)', borderTopColor: '#8B5CF6', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 20px' }} />
          <p style={{ color: '#9ca3af', fontFamily: "'Open Sans', sans-serif" }}>Verificando tu acceso…</p>
        </div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  if (error || !info) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0014', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ maxWidth: '480px', textAlign: 'center', fontFamily: "'Open Sans', sans-serif" }}>
          <AlertCircle size={56} color="#f87171" style={{ marginBottom: '20px' }} />
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff', marginBottom: '12px' }}>Enlace no válido</h2>
          <p style={{ color: '#9ca3af', lineHeight: 1.7, marginBottom: '28px' }}>
            {error || 'Este enlace ha expirado o ya alcanzó el límite de descargas.'}
          </p>
          <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
            Escríbenos a <a href="mailto:soporte@mescobari.com" style={{ color: '#8B5CF6' }}>soporte@mescobari.com</a> y te ayudamos de inmediato.
          </p>
        </div>
      </div>
    );
  }

  if (info.expired || info.used_up) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0014', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ maxWidth: '480px', textAlign: 'center', fontFamily: "'Open Sans', sans-serif" }}>
          <Clock size={56} color="#fbbf24" style={{ marginBottom: '20px' }} />
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff', marginBottom: '12px' }}>
            {info.expired ? 'Enlace expirado' : 'Límite de descargas alcanzado'}
          </h2>
          <p style={{ color: '#9ca3af', lineHeight: 1.7, marginBottom: '28px' }}>
            {info.expired
              ? 'Tu enlace de descarga expiró. Los enlaces son válidos por 7 días desde la compra.'
              : `Has alcanzado el máximo de ${info.maxDownloads} descargas. Escríbenos para obtener un nuevo enlace.`}
          </p>
          <a href="mailto:soporte@mescobari.com" style={{ display: 'inline-block', padding: '14px 32px', background: '#6B2D91', color: '#fff', textDecoration: 'none', borderRadius: '10px', fontWeight: 700 }}>
            Contactar Soporte
          </a>
        </div>
      </div>
    );
  }

  // ── Página principal de entrega ───────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: '#0a0014', fontFamily: "'Open Sans', sans-serif", color: '#f0e6ff' }}>

      {/* Keyframes */}
      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes confettiFall{to{transform:translateY(110vh) rotate(720deg);opacity:0}}
        @keyframes slideDown{from{transform:translateY(-100%);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes pulse-ring{0%{transform:scale(1);opacity:0.7}100%{transform:scale(1.4);opacity:0}}
      `}</style>

      {/* ── Banner de Upsell (aparece tras 30s) ───────────────────────────── */}
      {showUpsell && (
        <div style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', zIndex: 9000, width: 'min(600px, calc(100vw - 32px))', animation: 'slideDown 0.5s ease' }}>
          <div style={{ background: 'linear-gradient(135deg, #1c0533, #2d1052)', border: '2px solid #8B5CF6', borderRadius: '20px', padding: '24px 28px', boxShadow: '0 20px 60px rgba(107,45,145,0.6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Gift size={20} color="#fbbf24" />
                  <span style={{ fontWeight: 700, color: '#fbbf24', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Oferta exclusiva · Solo ahora</span>
                </div>
                <h3 style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff', margin: '0 0 8px', fontSize: '1.1rem' }}>
                  Completa tu Aprendizaje con el Audiobook ITIL 4
                </h3>
                <p style={{ color: '#d4b8f0', margin: '0 0 16px', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  Estudia mientras manejas, haces deporte o descansas. El mismo contenido narrado por un profesional. Solo por <strong style={{ color: '#fbbf24' }}>$17 USD</strong> (precio normal $47).
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => navigate(`/upsell?token=${token}`)}
                    style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #FF6B35, #f59e0b)', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: 800, cursor: 'pointer', fontSize: '0.95rem', fontFamily: "'Montserrat', sans-serif" }}
                  >
                    AGREGAR POR $17 → <ChevronRight size={16} style={{ display: 'inline', verticalAlign: 'middle' }} />
                  </button>
                  <button
                    onClick={() => { setShowUpsell(false); navigate('/gracias'); }}
                    style={{ padding: '12px 16px', background: 'none', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', color: '#9ca3af', cursor: 'pointer', fontSize: '0.82rem' }}
                  >
                    No, gracias
                  </button>
                </div>
              </div>
              <button onClick={() => setShowUpsell(false)} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: '1.2rem', flexShrink: 0, lineHeight: 1 }}>✕</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Contenido principal ───────────────────────────────────────────── */}
      <main style={{ maxWidth: '700px', margin: '0 auto', padding: '80px 20px' }}>

        {/* Celebration */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          {/* Ícono animado */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '28px' }}>
            <div style={{ position: 'absolute', inset: '-12px', borderRadius: '50%', border: '2px solid rgba(139,92,246,0.4)', animation: 'pulse-ring 2s ease-out infinite' }} />
            <div style={{ width: '88px', height: '88px', borderRadius: '50%', background: 'linear-gradient(135deg, #6B2D91, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(139,92,246,0.5)' }}>
              <CheckCircle size={44} color="#fff" fill="transparent" />
            </div>
          </div>
          <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#fff', marginBottom: '16px', lineHeight: 1.2 }}>
            ¡Felicitaciones! 🎉<br />Tu libro está listo
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#d4b8f0', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto' }}>
            Tu compra fue procesada exitosamente. Haz clic en el botón para descargar tu libro ahora mismo. También te enviamos el enlace a tu email.
          </p>
        </div>

        {/* Tarjeta de descarga */}
        <div style={{ background: 'linear-gradient(145deg, rgba(107,45,145,0.2), rgba(139,92,246,0.08))', border: '2px solid rgba(139,92,246,0.35)', borderRadius: '24px', padding: '40px', textAlign: 'center', marginBottom: '40px' }}>
          {/* Portada */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
            <img
              src="/images/portada2.png"
              alt="ITIL 4 Foundation – Guía Completa"
              style={{ width: '140px', borderRadius: '10px', boxShadow: '0 20px 50px rgba(139,92,246,0.4)', animation: 'itil-float 3s ease-in-out infinite' }}
            />
          </div>

          <h2 style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff', marginBottom: '6px', fontSize: '1.3rem' }}>
            ITIL 4 Foundation: Guía Completa de Certificación
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '28px' }}>PDF · +380 páginas · Máx. {info.maxDownloads} descargas</p>

          {/* Progreso de descargas */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '28px' }}>
            {Array.from({ length: info.maxDownloads }).map((_, i) => (
              <div key={i} style={{ width: '32px', height: '6px', borderRadius: '3px', background: i < info.downloads ? '#8B5CF6' : 'rgba(255,255,255,0.1)' }} />
            ))}
            <span style={{ fontSize: '0.78rem', color: '#6b7280', marginLeft: '8px', alignSelf: 'center' }}>
              {info.downloads}/{info.maxDownloads} usadas
            </span>
          </div>

          {/* Botón de descarga */}
          <button
            onClick={handleDownload}
            disabled={downloading}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '18px 44px', background: downloading ? 'rgba(139,92,246,0.4)' : 'linear-gradient(135deg, #6B2D91, #8B5CF6)', border: 'none', borderRadius: '14px', color: '#fff', fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: '1.1rem', cursor: downloading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', boxShadow: '0 8px 30px rgba(139,92,246,0.4)' }}
          >
            {downloading ? (
              <><div style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Iniciando…</>
            ) : (
              <><Download size={22} /> DESCARGAR MI LIBRO</>
            )}
          </button>

          <p style={{ marginTop: '16px', fontSize: '0.78rem', color: '#4b5563' }}>
            Enlace válido hasta: {new Date(info.expiresAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* Próximos pasos */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '28px', marginBottom: '40px' }}>
          <h3 style={{ fontFamily: "'Montserrat', sans-serif", color: '#c084fc', marginBottom: '20px', fontSize: '1.1rem' }}>
            ¿Y ahora qué?
          </h3>
          <ol style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { step: '1', text: 'Descarga tu libro y guárdalo en un lugar de fácil acceso.' },
              { step: '2', text: 'Revisa tu email — te enviamos el plan de estudio de 7 semanas.' },
              { step: '3', text: 'Empieza por el Módulo 1: Fundamentos de Gestión de Servicios (≈2 horas).' },
              { step: '4', text: 'Agenda tu examen en PeopleCert.org antes de que termines el libro para que tengas una fecha objetivo real.' },
            ].map((s) => (
              <li key={s.step} style={{ color: '#d4b8f0', lineHeight: 1.65, fontSize: '0.9rem' }}>
                <strong style={{ color: '#8B5CF6' }}>Paso {s.step}:</strong> {s.text}
              </li>
            ))}
          </ol>
        </div>

        {/* Contador de upsell */}
        {!showUpsell && countdown > 0 && (
          <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(107,45,145,0.1)', borderRadius: '12px', border: '1px solid rgba(139,92,246,0.15)' }}>
            <p style={{ color: '#9ca3af', fontSize: '0.85rem', margin: '0 0 6px' }}>
              <Gift size={14} color="#fbbf24" style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
              Tenemos una oferta especial para ti que aparece en…
            </p>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '2rem', fontWeight: 900, color: '#c084fc', margin: 0 }}>
              {countdown}s
            </p>
          </div>
        )}

        {/* Soporte */}
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <p style={{ color: '#4b5563', fontSize: '0.85rem' }}>
            ¿Problemas con tu descarga? Escríbenos a&nbsp;
            <a href="mailto:soporte@mescobari.com" style={{ color: '#8B5CF6', textDecoration: 'none' }}>soporte@mescobari.com</a>
            &nbsp;y respondemos en menos de 24 horas.
          </p>
        </div>
      </main>

      {/* ── TABLA DE IMÁGENES ─────────────────────────────────────────────── */}
      {import.meta.env.DEV && (
        <section style={{ padding: '48px 20px', background: '#111', borderTop: '2px solid #6B2D91' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h3 style={{ fontFamily: "'Montserrat', sans-serif", color: '#c084fc', marginBottom: '20px' }}>📋 Tabla de Imágenes — DeliveryPage</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', color: '#d4b8f0' }}>
                <thead>
                  <tr style={{ background: 'rgba(107,45,145,0.3)' }}>
                    {['ID', 'Dimensiones', 'Descripción', 'Ubicación'].map(h => <th key={h} style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid rgba(139,92,246,0.3)' }}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 'portada2.png', dim: '140 × 190 px', desc: 'Portada del libro en tarjeta de descarga', sec: 'Tarjeta central' },
                  ].map((r, i) => (
                    <tr key={i}>
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
