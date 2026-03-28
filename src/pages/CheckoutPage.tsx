import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Shield, Lock, CheckCircle2, ArrowLeft } from 'lucide-react';
import { createPayPalOrder, capturePayPalOrder } from '../lib/api';

// ─── Tipos PayPal (declaración mínima para TS) ────────────────────────────────
declare global {
  interface Window {
    paypal?: {
      Buttons: (config: PayPalButtonsConfig) => { render: (el: string | HTMLElement) => void };
    };
  }
}
interface PayPalButtonsConfig {
  style?: { layout?: string; color?: string; shape?: string; label?: string };
  createOrder: () => Promise<string>;
  onApprove: (data: { orderID: string }) => Promise<void>;
  onError?: (err: unknown) => void;
  onCancel?: () => void;
}

// ─── Constantes ───────────────────────────────────────────────────────────────
const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || 'sb';
const PRODUCT_INFO = {
  book: {
    title: 'ITIL 4 Foundation: Guía Completa de Certificación',
    subtitle: 'PDF · Descarga inmediata · +380 páginas',
    price: 37,
    original: 97,
    items: [
      'Libro completo en PDF (+380 páginas)',
      'Plan de estudio de 7 semanas',
      '250+ preguntas de práctica comentadas',
      'Glosario ITIL 4 con 150+ términos',
      'Checklist pre-examen',
      'Actualizaciones gratuitas 12 meses',
    ],
  },
  upsell: {
    title: 'Audiobook ITIL 4 Foundation',
    subtitle: 'MP3 + PDF · Aprende en modo escucha',
    price: 17,
    original: 47,
    items: [
      'Versión narrada profesionalmente',
      'Ideal para desplazamientos y ejercicio',
      'Mismo contenido que el libro en audio',
      'Descarga MP3 + transcripción PDF',
    ],
  },
} as const;

type ProductKey = keyof typeof PRODUCT_INFO;

// ─────────────────────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const product = (params.get('product') || 'book') as ProductKey;
  const prefillEmail = params.get('email') || '';
  const prefillName  = params.get('name')  || '';

  const [name,  setName]  = useState(prefillName);
  const [email, setEmail] = useState(prefillEmail);
  const [step,  setStep]  = useState<'form'|'paypal'|'processing'|'error'>('form');
  const [errorMsg, setErrorMsg] = useState('');
  const paypalRef = useRef<HTMLDivElement>(null);
  const sdkLoaded = useRef(false);

  const info = PRODUCT_INFO[product] ?? PRODUCT_INFO.book;

  // Cargar SDK de PayPal
  useEffect(() => {
    if (sdkLoaded.current) return;
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD&intent=capture`;
    script.async = true;
    script.onload = () => { sdkLoaded.current = true; };
    document.body.appendChild(script);
    return () => { /* mantener en DOM entre navegaciones */ };
  }, []);

  // Renderizar botones de PayPal cuando paso a "paypal"
  useEffect(() => {
    if (step !== 'paypal') return;
    if (!window.paypal) {
      const interval = setInterval(() => {
        if (window.paypal && paypalRef.current) {
          clearInterval(interval);
          renderButtons();
        }
      }, 200);
      return () => clearInterval(interval);
    }
    if (paypalRef.current) renderButtons();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  function renderButtons() {
    if (!window.paypal || !paypalRef.current) return;
    paypalRef.current.innerHTML = '';
    window.paypal.Buttons({
      style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'pay' },
      createOrder: async () => {
        try {
          const res = await createPayPalOrder({ product, customerEmail: email, customerName: name });
          return res.id;
        } catch (err) {
          setErrorMsg((err as Error).message || 'No se pudo crear la orden.');
          setStep('error');
          throw err;
        }
      },
      onApprove: async ({ orderID }) => {
        setStep('processing');
        try {
          const res = await capturePayPalOrder({ orderID });
          navigate(`/entrega/${res.downloadToken}?product=${res.product}`);
        } catch (err) {
          setErrorMsg((err as Error).message || 'Error capturando el pago.');
          setStep('error');
        }
      },
      onError: (err) => {
        console.error('[PayPal error]', err);
        setErrorMsg('Ocurrió un error con PayPal. Por favor intenta de nuevo.');
        setStep('error');
      },
      onCancel: () => setStep('paypal'),
    }).render(paypalRef.current!);
  }

  function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setStep('paypal');
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: '#0a0014', fontFamily: "'Open Sans', sans-serif", color: '#f0e6ff', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <header style={{ borderBottom: '1px solid rgba(139,92,246,0.2)', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '900px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <button onClick={() => navigate('/ventas')} style={{ background: 'none', border: 'none', color: '#8B5CF6', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
          <ArrowLeft size={16} /> Volver
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6b7280', fontSize: '0.8rem' }}>
          <Lock size={14} color="#34d399" />
          <span style={{ color: '#34d399' }}>Compra 100% Segura</span>
        </div>
      </header>

      {/* Cuerpo */}
      <main style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: '32px', maxWidth: '900px', margin: '0 auto', padding: '40px 20px', width: '100%', boxSizing: 'border-box' }}>

        {/* ── Columna izquierda: formulario / PayPal ───────────────────────── */}
        <div style={{ flex: '1 1 420px' }}>

          {/* Paso 1: Datos */}
          {(step === 'form' || step === 'paypal') && (
            <>
              {/* Indicador de pasos */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
                {[{ n: 1, label: 'Tus datos' }, { n: 2, label: 'Pago' }].map((s) => {
                  const active = (s.n === 1 && step === 'form') || (s.n === 2 && step === 'paypal');
                  const done   = (s.n === 1 && step === 'paypal');
                  return (
                    <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                      <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: done ? '#8B5CF6' : active ? '#6B2D91' : 'rgba(255,255,255,0.08)', border: `2px solid ${active || done ? '#8B5CF6' : 'rgba(255,255,255,0.15)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                        {done ? '✓' : s.n}
                      </span>
                      <span style={{ fontSize: '0.85rem', color: active ? '#e9d5ff' : '#6b7280', fontWeight: active ? 700 : 400 }}>{s.label}</span>
                      {s.n < 2 && <div style={{ flex: 1, height: '1px', background: done ? '#8B5CF6' : 'rgba(255,255,255,0.1)' }} />}
                    </div>
                  );
                })}
              </div>

              {step === 'form' && (
                <form onSubmit={handleContinue}>
                  <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '24px' }}>
                    Completa tus datos
                  </h2>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', color: '#c084fc', fontWeight: 600 }}>Nombre completo *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Ej: Carlos Rodríguez"
                      style={{ width: '100%', boxSizing: 'border-box', padding: '14px 16px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '10px', color: '#fff', fontSize: '1rem', outline: 'none' }}
                    />
                  </div>
                  <div style={{ marginBottom: '28px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', color: '#c084fc', fontWeight: 600 }}>Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Ej: carlos@empresa.com"
                      style={{ width: '100%', boxSizing: 'border-box', padding: '14px 16px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '10px', color: '#fff', fontSize: '1rem', outline: 'none' }}
                    />
                    <p style={{ margin: '6px 0 0', fontSize: '0.78rem', color: '#6b7280' }}>
                      Recibirás el enlace de descarga a este email.
                    </p>
                  </div>
                  <button type="submit" className="itil-btn-primary" style={{ width: '100%', padding: '18px', fontSize: '1.1rem', borderRadius: '12px' }}>
                    CONTINUAR AL PAGO →
                  </button>
                </form>
              )}

              {step === 'paypal' && (
                <div>
                  <div style={{ marginBottom: '20px', padding: '14px 18px', background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', borderRadius: '10px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={18} color="#34d399" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#a7f3d0', fontWeight: 600 }}>{name}</p>
                      <p style={{ margin: 0, fontSize: '0.82rem', color: '#6b7280' }}>{email}</p>
                    </div>
                    <button onClick={() => setStep('form')} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#8B5CF6', cursor: 'pointer', fontSize: '0.8rem', flexShrink: 0 }}>Editar</button>
                  </div>
                  <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '20px' }}>
                    Elige tu forma de pago
                  </h2>
                  <div ref={paypalRef} style={{ minHeight: '50px' }} />
                  <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#4b5563', marginTop: '16px' }}>
                    🔒 Tu pago es procesado de forma segura por PayPal.&nbsp;Nunca almacenamos tus datos de tarjeta.
                  </p>
                </div>
              )}
            </>
          )}

          {/* Paso: Procesando */}
          {step === 'processing' && (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ width: '56px', height: '56px', border: '3px solid rgba(139,92,246,0.3)', borderTopColor: '#8B5CF6', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 24px' }} />
              <h2 style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff', marginBottom: '10px' }}>Confirmando tu pago…</h2>
              <p style={{ color: '#9ca3af' }}>Por favor no cierres esta ventana.</p>
            </div>
          )}

          {/* Paso: Error */}
          {step === 'error' && (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p style={{ fontSize: '3rem', marginBottom: '16px' }}>⚠️</p>
              <h2 style={{ fontFamily: "'Montserrat', sans-serif", color: '#f87171', marginBottom: '12px' }}>Algo salió mal</h2>
              <p style={{ color: '#d4b8f0', marginBottom: '28px', lineHeight: 1.65 }}>{errorMsg}</p>
              <button onClick={() => { setStep('paypal'); setErrorMsg(''); }} className="itil-btn-primary" style={{ padding: '14px 32px', borderRadius: '10px' }}>
                Intentar de nuevo
              </button>
              <p style={{ marginTop: '16px', fontSize: '0.82rem', color: '#6b7280' }}>
                ¿Necesitas ayuda? Escríbemos a <a href="mailto:soporte@mescobari.com" style={{ color: '#8B5CF6' }}>soporte@mescobari.com</a>
              </p>
            </div>
          )}
        </div>

        {/* ── Columna derecha: resumen del pedido ─────────────────────────── */}
        <div style={{ flex: '0 0 280px', minWidth: '260px' }}>
          <div style={{ position: 'sticky', top: '24px' }}>
            <div style={{ background: 'rgba(107,45,145,0.12)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: '20px', padding: '28px' }}>
              {/* Portada miniatura */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <img src="/images/portada2.png" alt="Libro" style={{ width: '100px', borderRadius: '8px', boxShadow: '0 12px 40px rgba(139,92,246,0.35)' }} />
              </div>

              <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '1rem', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>{info.title}</h3>
              <p style={{ fontSize: '0.82rem', color: '#9ca3af', marginBottom: '20px' }}>{info.subtitle}</p>

              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px' }}>
                {info.items.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', padding: '6px 0', fontSize: '0.85rem', color: '#d4b8f0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <CheckCircle2 size={14} color="#34d399" style={{ marginTop: '3px', flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Precio */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Precio regular</span>
                  <span style={{ color: '#6b7280', textDecoration: 'line-through', fontSize: '0.9rem' }}>${info.original} USD</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#fff', fontWeight: 700 }}>Total</span>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '1.8rem', fontWeight: 900, color: '#c084fc' }}>${info.price} USD</span>
                </div>
              </div>

              {/* Señales de confianza */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { icon: <Shield size={14} color="#34d399"/>, text: 'Garantía de devolución 7 días' },
                  { icon: <Lock size={14} color="#60a5fa"/>, text: 'Pago cifrado SSL' },
                  { icon: <CheckCircle2 size={14} color="#c084fc"/>, text: 'Descarga inmediata tras pago' },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.78rem', color: '#9ca3af' }}>
                    {s.icon} {s.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Spinner keyframe */}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
