// ─── API Client — Frontend → Backend ─────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
  return data as T;
}

// ─── Leads ────────────────────────────────────────────────────────────────────
export interface LeadPayload {
  name: string;
  email: string;
  source?: string;
}

export const submitLead = (payload: LeadPayload) =>
  request<{ ok: boolean; message: string }>('POST', '/api/leads', payload);

export const getLeadCount = () =>
  request<{ count: number }>('GET', '/api/leads/count');

// ─── PayPal ───────────────────────────────────────────────────────────────────
export interface CreateOrderPayload {
  product: 'book' | 'upsell';
  customerEmail: string;
  customerName: string;
}

export interface CreateOrderResult {
  id: string;          // PayPal order ID
  approveUrl?: string;
}

export const createPayPalOrder = (payload: CreateOrderPayload) =>
  request<CreateOrderResult>('POST', '/api/paypal/create-order', payload);

export interface CaptureOrderPayload {
  orderID: string;
}

export interface CaptureOrderResult {
  status: string;
  downloadToken: string;
  product: string;
  email: string;
}

export const capturePayPalOrder = (payload: CaptureOrderPayload) =>
  request<CaptureOrderResult>('POST', '/api/paypal/capture-order', payload);

export interface UpsellOrderPayload {
  originalToken: string;
}

export const createUpsellOrder = (payload: UpsellOrderPayload) =>
  request<CreateOrderResult>('POST', '/api/paypal/upsell-order', payload);

// ─── Download ─────────────────────────────────────────────────────────────────
export interface TokenInfo {
  valid: boolean;
  product: string;
  downloads: number;
  maxDownloads: number;
  expiresAt: string;
  expired: boolean;
  used_up: boolean;
}

export const getTokenInfo = (token: string) =>
  request<TokenInfo>('GET', `/api/download/info/${token}`);

export const getDownloadUrl = (token: string) =>
  `${API_BASE}/api/download/${token}`;
