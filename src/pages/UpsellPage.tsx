import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Headphones, CheckCircle2, Zap, Clock, X } from 'lucide-react';
import { createUpsellOrder, capturePayPalOrder } from '../lib/api';

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || 'sb';

// ─────────────────────────────────────────────────────────────────────────────
export default function UpsellPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const originalToken = params.get('token') || '';

  const [step,    setStep]    = useState<'offer'|'paying'|'processing'|'error'>('offer');
  const [errorMsg, setErrorMsg] = useState('');
  const paypalRef = useRef<HTMLDivElement>(null);
  const sdkLoaded = useRef(false);

  // Cargar SDK de PayPal
  useEffect(() => {
    if (sdkLoaded.current) return;
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD&intent=capture`;
    script.async = true;
    script.onload = () => { sdkLoaded.current = true; };
    document.body.appendChild(script);
  }, []);

  // Renderizar botones PayPal al pasar a "paying"
  useEffect(() => {
    if (step !== 'paying') return;
    const tryRender = () => {
      if (!window.paypal || !paypalRef.current) return false;
      paypalRef.current.innerHTML = '';
      window.paypal.Buttons({
        style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay' },
        createOrder: async () => {
          const res = await createUpsellOrder({ originalToken });
          return res.id;
        },
        onApprove: async ({ orderID }) => {
          setStep('processing');
          try {
            const res = await capturePayPalOrder({ orderID });
            navigate(`/gracias?upsell=true&token=${res.downloadToken}`);
          } catch (e) {
            setErrorMsg((e as Error).message || 'Error al procesar el pago.');
            setStep('error');
          }
        },
        onError: (e) => {
          console.error('[PayPal upsell error]', e);
          setErrorMsg('Ocurrió un error con PayPal. Por favor intenta de nuevo.');
          setStep('error');
        },
        onCancel: () => setStep('offer'),
      }).render(paypalRef.current!);
      return true;
    };
    if (!tryRender()) {
      const interval = setInterval(() => { if (tryRender()) clearInterval(interval); }, 200);
      return () => clearInterval(interval);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const declineUpsell = () => navigate('/gracias');

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: '#0a0014', fontFamily: "'Open Sans', sans-serif", color: '#f0e6ff' }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes itil-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}`}</style>

      {/* Barra de urgencia */}
      <div style={{ background: 'linear-gradient(90deg, #b45309, #f59e0b)', padding: '10px 20px', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Clock size={14} /> ESTA OFERTA APARECE UNA SOLA VEZ — Cerrar esta página significa perderla para siempre
        </p>
      </div>

      <main style={{ maxWidth: '700px', margin: '0 auto', padding: '60px 20px' }}>

        {step === 'offer' && (
          <>
            {/* Encabezado */}
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(251,191,36,0.1))', border: '1px solid #f59e0b', borderRadius: '100px', padding: '8px 20px', marginBottom: '24px' }}>
                <Zap size={16} color="#fbbf24" />
                <span style={{ color: '#fbbf24', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Oferta Especial · Solo Esta Vez</span>
              </div>
              <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#fff', lineHeight: 1.2, marginBottom: '20px' }}>
                Espera — Tu Libro Está Listo.<br />
                <span style={{ color: '#fbbf24' }}>¿Quieres Aprender También con los Oídos?</span>
              </h1>
              <p style={{ fontSize: '1.1rem', color: '#d4b8f0', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
                Hemos creado el <strong style={{ color: '#fff' }}>Audiobook oficial del libro ITIL 4 Foundation</strong> para que puedas estudiar mientras manejas, en el gym o antes de dormir — y reforzar lo que aprendiste leyendo.
              </p>
            </div>

            {/* Demostración del producto */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'center', justifyContent: 'center', marginBottom: '48px' }}>
              {/* Ícono del audiobook */}
              <div style={{ position: 'relative' }}>
                <div style={{ width: '160px', height: '160px', borderRadius: '50%', background: 'linear-gradient(135deg, #b45309, #f59e0b)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 60px rgba(245,158,11,0.4)', animation: 'itil-float 3s ease-in-out infinite' }}>
                  <Headphones size={72} color="#fff" />
                </div>
                {/* Placeholder para visualización del producto de audio */}
                <div style={{ position: 'absolute', bottom: '-8px', right: '-8px', background: '#0a0014', border: '2px dashed rgba(245,158,11,0.4)', borderRadius: '8px', padding: '4px 8px' }}>
                  <p style={{ margin: 0, fontSize: '0.65rem', color: '#f59e0b', fontWeight: 700 }}>Imagen 1 — 160×160 px</p>
                </div>
              </div>

              <div style={{ flex: '1 1 280px' }}>
                <h2 style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff', margin: '0 0 8px', fontSize: '1.3rem' }}>
                  Audiobook ITIL 4 Foundation
                </h2>
                <p style={{ color: '#9ca3af', margin: '0 0 20px', fontSize: '0.9rem' }}>Narración profesional · +7 horas de audio · MP3 + transcripción PDF</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    'Narrado por locutor profesional nativo en español',
                    '+7 horas de audio de alta calidad MP3',
                    'Cubre todos los módulos del libro completo',
                    'Transcripción PDF sincronizada incluida',
                    'Ideal para refuerzo auditivo del contenido',
                    'Descarga inmediata, escucha offline siempre',
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: '#d4b8f0', fontSize: '0.9rem' }}>
                      <CheckCircle2 size={16} color="#34d399" style={{ marginTop: '2px', flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Precio */}
            <div style={{ background: 'linear-gradient(145deg, rgba(180,83,9,0.15), rgba(245,158,11,0.08))', border: '2px solid rgba(245,158,11,0.35)', borderRadius: '20px', padding: '36px', textAlign: 'center', marginBottom: '32px' }}>
              <p style={{ color: '#9ca3af', margin: '0 0 4px', fontSize: '0.9rem' }}>Precio normal</p>
              <p style={{ color: '#6b7280', textDecoration: 'line-through', margin: '0 0 8px', fontSize: '1.3rem' }}>$47 USD</p>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '4rem', fontWeight: 900, color: '#fbbf24', margin: '0 0 4px', lineHeight: 1 }}>$17</p>
              <p style={{ color: '#f59e0b', fontWeight: 700, margin: '0 0 28px' }}>USD · Solo en esta página · Lo añades a tu pedido anterior</p>

              <button
                onClick={() => setStep('paying')}
                style={{ width: '100%', padding: '20px', background: 'linear-gradient(135deg, #b45309, #f59e0b)', border: 'none', borderRadius: '14px', color: '#fff', fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: '1.15rem', cursor: 'pointer', marginBottom: '12px', boxShadow: '0 8px 30px rgba(245,158,11,0.4)' }}
              >
                SÍ — AGREGAR AUDIOBOOK POR $17 →
              </button>
              <p style={{ fontSize: '0.78rem', color: '#4b5563', margin: 0 }}>Pago seguro con PayPal · Descarga inmediata tras confirmar</p>
            </div>

            {/* Argumento final */}
            <div style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.07)', marginBottom: '32px' }}>
              <p style={{ margin: 0, color: '#d4b8f0', lineHeight: 1.75, fontSize: '0.95rem' }}>
                <strong style={{ color: '#fbbf24' }}>¿Por qué agregar el audiobook?</strong> Los estudios de aprendizaje multimodal demuestran que combinar lectura con escucha aumenta la retención del contenido hasta un <strong style={{ color: '#fff' }}>40% más</strong>. Los candidatos que usan ambos formatos llegan al examen con más confianza y mejor recordación de los conceptos clave.
              </p>
            </div>

            {/* Declinar */}
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={declineUpsell}
                style={{ background: 'none', border: 'none', color: '#4b5563', cursor: 'pointer', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'underline' }}
              >
                <X size={14} />
                No gracias, prefiero estudiar solo con el libro
              </button>
            </div>
          </>
        )}

        {/* Formulario de pago PayPal */}
        {step === 'paying' && (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff', marginBottom: '12px' }}>Agrega el Audiobook por $17 USD</h2>
            <p style={{ color: '#9ca3af', marginBottom: '28px' }}>Completa el pago con PayPal:</p>
            <div ref={paypalRef} style={{ minHeight: '50px', maxWidth: '500px', margin: '0 auto' }} />
            <button onClick={() => setStep('offer')} style={{ marginTop: '20px', background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: '0.85rem' }}>
              ← Volver a la oferta
            </button>
          </div>
        )}

        {/* Procesando */}
        {step === 'processing' && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ width: '56px', height: '56px', border: '3px solid rgba(245,158,11,0.3)', borderTopColor: '#f59e0b', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 20px' }} />
            <p style={{ color: '#d4b8f0' }}>Confirmando tu compra del audiobook…</p>
          </div>
        )}

        {/* Error */}
        {step === 'error' && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ fontSize: '3rem', marginBottom: '12px' }}>⚠️</p>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", color: '#f87171', marginBottom: '10px' }}>Error procesando el pago</h2>
            <p style={{ color: '#d4b8f0', marginBottom: '24px' }}>{errorMsg}</p>
            <button onClick={() => setStep('paying')} style={{ padding: '14px 28px', background: '#6B2D91', border: 'none', borderRadius: '10px', color: '#fff', cursor: 'pointer', fontWeight: 700, marginRight: '12px' }}>
              Reintentar
            </button>
            <button onClick={declineUpsell} style={{ padding: '14px 28px', background: 'none', border: '1px solid #4b5563', borderRadius: '10px', color: '#9ca3af', cursor: 'pointer' }}>
              Ir a mi libro
            </button>
          </div>
        )}
      </main>

      {/* TABLA DE IMÁGENES */}
      {import.meta.env.DEV && (
        <section style={{ padding: '48px 20px', background: '#111', borderTop: '2px solid #6B2D91' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h3 style={{ fontFamily: "'Montserrat', sans-serif", color: '#c084fc', marginBottom: '20px' }}>📋 Tabla de Imágenes — UpsellPage</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', color: '#d4b8f0' }}>
              <thead>
                <tr style={{ background: 'rgba(107,45,145,0.3)' }}>
                  {['ID', 'Dimensiones', 'Descripción', 'Ubicación'].map(h => <th key={h} style={{ padding: '10px 14px', textAlign: 'left', border: '1px solid rgba(139,92,246,0.3)' }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '10px 14px', border: '1px solid rgba(139,92,246,0.15)', fontFamily: 'monospace', color: '#c084fc' }}>audiobook-cover.jpg</td>
                  <td style={{ padding: '10px 14px', border: '1px solid rgba(139,92,246,0.15)' }}>160 × 160 px</td>
                  <td style={{ padding: '10px 14px', border: '1px solid rgba(139,92,246,0.15)' }}>Portada circular del audiobook — diseño con auriculares sobre fondo dorado</td>
                  <td style={{ padding: '10px 14px', border: '1px solid rgba(139,92,246,0.15)', color: '#9ca3af' }}>Sección central del producto</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
