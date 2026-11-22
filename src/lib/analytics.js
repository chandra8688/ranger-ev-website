/**
 * Thin wrapper over gtag. index.html defines the dataLayer stub, sets Consent
 * Mode defaults and calls `config` with send_page_view:false, so page views
 * are sent exactly once per route from here (after the page title is final).
 */
const CONSENT_KEY = 'ranger-consent-v1';

const gtag = (...args) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') window.gtag(...args);
};

let lastPageLocation = null;

export function trackPageView() {
  const location = window.location.href;
  if (location === lastPageLocation) return; // dedupe (StrictMode, re-renders)
  lastPageLocation = location;
  gtag('event', 'page_view', {
    page_title: document.title,
    page_location: location,
    page_path: window.location.pathname + window.location.search,
  });
}

/** Conversion-style events: directions, calls, WhatsApp, form submits. */
export function trackEvent(name, params = {}) {
  gtag('event', name, params);
}

export function getConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY); // 'granted' | 'denied' | null
  } catch {
    return null;
  }
}

export function setConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage unavailable — choice applies to this page view only */
  }
  gtag('consent', 'update', { analytics_storage: value });
}

/** Test helper. */
export function __resetAnalyticsForTests() {
  lastPageLocation = null;
}
