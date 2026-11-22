import { useEffect } from 'react';
import { BASE_URL, DEFAULT_OG_IMAGE } from '../config';

const setMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (content == null || content === '') {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const absolute = (url) => (url && url.startsWith('/') ? `${BASE_URL}${url}` : url);

/**
 * Imperative <head> manager. Every tag it owns is set or cleared on each
 * route, so nothing leaks from the previous page (canonical, og:url, robots,
 * JSON-LD, keywords).
 */
export default function SEO({ title, description, keywords, canonicalUrl, jsonLd, ogImage, ogType = 'website', noindex = false }) {
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : null;

  useEffect(() => {
    if (title) document.title = title;
    setMeta('property', 'og:title', title);
    setMeta('name', 'twitter:title', title);

    setMeta('name', 'description', description);
    setMeta('property', 'og:description', description);
    setMeta('name', 'twitter:description', description);

    setMeta('name', 'keywords', keywords);
    setMeta('property', 'og:type', ogType);

    const image = absolute(ogImage || DEFAULT_OG_IMAGE);
    setMeta('property', 'og:image', image);
    setMeta('name', 'twitter:image', image);
    setMeta('name', 'twitter:card', 'summary_large_image');
    // Only the default image has known 1200x630 dimensions.
    const isDefault = !ogImage || ogImage === DEFAULT_OG_IMAGE || ogImage.includes('1200x630');
    setMeta('property', 'og:image:width', isDefault ? '1200' : null);
    setMeta('property', 'og:image:height', isDefault ? '630' : null);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (canonicalUrl && !noindex) {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', canonicalUrl);
      setMeta('property', 'og:url', canonicalUrl);
    } else {
      if (canonical) canonical.remove();
      setMeta('property', 'og:url', null);
    }

    setMeta('name', 'robots', noindex ? 'noindex, follow' : null);

    const scriptId = 'json-ld-structured-data';
    let script = document.getElementById(scriptId);
    if (jsonLdString) {
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      if (script.textContent !== jsonLdString) script.textContent = jsonLdString;
    } else if (script) {
      script.remove();
    }

    // Let the analytics listener know the page's metadata is final.
    window.dispatchEvent(new CustomEvent('ranger:pageview-ready', { detail: { title } }));
  }, [title, description, keywords, canonicalUrl, jsonLdString, ogImage, ogType, noindex]);

  return null;
}
