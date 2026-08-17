import React, { useEffect } from 'react';
import { BASE_URL } from '../config';

// Utility to create or update meta tags
const setMetaTag = (attrName, attrValue, content) => {
  if (!content) return;
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

export default function SEO({ title, description, keywords, canonicalUrl, jsonLd, ogImage, ogType = 'website', noindex = false }) {
  useEffect(() => {
    // 1. Title
    if (title) {
      document.title = title;
      setMetaTag('property', 'og:title', title);
      setMetaTag('name', 'twitter:title', title);
    }

    // 2. Description
    if (description) {
      setMetaTag('name', 'description', description);
      setMetaTag('property', 'og:description', description);
      setMetaTag('name', 'twitter:description', description);
    }

    // 3. Keywords
    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }

    // 4. Open Graph Type
    setMetaTag('property', 'og:type', ogType);

    // 5. Open Graph Image
    const defaultImage = '/og-image-opt.jpg';
    let imageToUse = ogImage || defaultImage;
    if (imageToUse.startsWith('/')) {
      imageToUse = `${BASE_URL}${imageToUse}`;
    }
    setMetaTag('property', 'og:image', imageToUse);
    setMetaTag('name', 'twitter:image', imageToUse);
    setMetaTag('name', 'twitter:card', 'summary_large_image');

    // 6. Canonical URL & og:url
    if (canonicalUrl && !noindex) {
      setMetaTag('property', 'og:url', canonicalUrl);
      
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonicalUrl);
    } else if (noindex) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (linkCanonical) {
        linkCanonical.remove();
      }
    }

    // 7. Robots (noindex, follow)
    if (noindex) {
      setMetaTag('name', 'robots', 'noindex, follow');
    } else {
      let element = document.querySelector('meta[name="robots"]');
      if (element) {
        element.remove();
      }
    }


    // 7. Inject JSON-LD
    if (jsonLd) {
      const scriptId = 'json-ld-structured-data';
      let existingScript = document.getElementById(scriptId);
      if (!existingScript) {
        existingScript = document.createElement('script');
        existingScript.id = scriptId;
        existingScript.type = 'application/ld+json';
        document.head.appendChild(existingScript);
      }
      existingScript.textContent = JSON.stringify(jsonLd);
    }
  }, [title, description, keywords, canonicalUrl, jsonLd, ogImage, ogType]);

  return null;
}
