// Global configuration.
// `import.meta.env` is provided by Vite; the fallback keeps these modules
// importable from plain Node (used by scripts/prerender.mjs at build time).
const env = import.meta.env || {};

export const COMPANY_DOMAIN = 'ranger-ev-website.vercel.app';
export const BASE_URL = env.VITE_BASE_URL || `https://${COMPANY_DOMAIN}`;
export const BUSINESS_EMAIL = 'rangerevhub@gmail.com';
export const GA_MEASUREMENT_ID = 'G-328SHQT2V0';
export const DEFAULT_OG_IMAGE = '/og-image-1200x630.jpg';
