/**
 * tests/seo.test.jsx
 *
 * Tests the SEO component's imperative DOM mutations using React Testing Library.
 * All tests use the jsdom environment configured in vite.config.js.
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';

// Mock src/config.js so tests are independent of VITE_ env vars
vi.mock('../src/config.js', () => ({
  COMPANY_DOMAIN: 'ranger-ev-website.vercel.app',
  BASE_URL: 'https://ranger-ev-website.vercel.app',
  BUSINESS_EMAIL: 'rangerevhub@gmail.com',
}));

// Import AFTER mock is registered
const { default: SEO } = await import('../src/components/SEO.jsx');

describe('SEO component', () => {
  beforeEach(() => {
    // Clean up any DOM state left by previous tests
    document.title = '';
    document.head.innerHTML = '';
  });

  // --- Title ---
  describe('page title', () => {
    it('sets document.title when title prop is provided', () => {
      render(<SEO title="RANGER EV | Test Page" />);
      expect(document.title).toBe('RANGER EV | Test Page');
    });

    it('updates document.title on re-render with a new title', () => {
      const { rerender } = render(<SEO title="Page One" />);
      expect(document.title).toBe('Page One');
      rerender(<SEO title="Page Two" />);
      expect(document.title).toBe('Page Two');
    });
  });

  // --- Description meta ---
  describe('description meta tag', () => {
    it('creates a meta[name="description"] tag with the provided description', () => {
      render(<SEO description="Test description for RANGER EV" />);
      const meta = document.querySelector('meta[name="description"]');
      expect(meta).not.toBeNull();
      expect(meta.getAttribute('content')).toBe('Test description for RANGER EV');
    });

    it('updates description content on re-render', () => {
      const { rerender } = render(<SEO description="First description" />);
      rerender(<SEO description="Updated description" />);
      const meta = document.querySelector('meta[name="description"]');
      expect(meta.getAttribute('content')).toBe('Updated description');
    });
  });

  // --- Canonical URL ---
  describe('canonical URL', () => {
    it('creates a link[rel="canonical"] tag when canonicalUrl is provided', () => {
      render(
        <SEO
          title="Test"
          canonicalUrl="https://ranger-ev-website.vercel.app/about"
        />
      );
      const link = document.querySelector('link[rel="canonical"]');
      expect(link).not.toBeNull();
      expect(link.getAttribute('href')).toBe('https://ranger-ev-website.vercel.app/about');
    });

    it('does not create a canonical link when noindex is true', () => {
      render(
        <SEO
          title="Not Found"
          canonicalUrl="https://ranger-ev-website.vercel.app/404"
          noindex={true}
        />
      );
      const link = document.querySelector('link[rel="canonical"]');
      expect(link).toBeNull();
    });

    it('removes an existing canonical link when switching to noindex', () => {
      const { rerender } = render(
        <SEO title="Page" canonicalUrl="https://ranger-ev-website.vercel.app/page" />
      );
      expect(document.querySelector('link[rel="canonical"]')).not.toBeNull();

      rerender(<SEO title="Not Found" noindex={true} />);
      expect(document.querySelector('link[rel="canonical"]')).toBeNull();
    });
  });

  // --- Robots noindex ---
  describe('robots meta tag', () => {
    it('adds meta[name="robots"] content="noindex, follow" when noindex=true', () => {
      render(<SEO title="404" noindex={true} />);
      const meta = document.querySelector('meta[name="robots"]');
      expect(meta).not.toBeNull();
      expect(meta.getAttribute('content')).toBe('noindex, follow');
    });

    it('removes robots meta when switching from noindex to indexable', () => {
      const { rerender } = render(<SEO title="404" noindex={true} />);
      expect(document.querySelector('meta[name="robots"]')).not.toBeNull();

      rerender(<SEO title="Home" noindex={false} />);
      expect(document.querySelector('meta[name="robots"]')).toBeNull();
    });

    it('does not add robots meta when noindex is false (default)', () => {
      render(<SEO title="Home" />);
      expect(document.querySelector('meta[name="robots"]')).toBeNull();
    });
  });

  // --- JSON-LD structured data ---
  describe('JSON-LD structured data', () => {
    const sampleJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'RANGER EV',
    };

    it('injects a script[type="application/ld+json"] when jsonLd prop is provided', () => {
      render(<SEO jsonLd={sampleJsonLd} />);
      const script = document.getElementById('json-ld-structured-data');
      expect(script).not.toBeNull();
      expect(script.type).toBe('application/ld+json');
    });

    it('script content matches serialized jsonLd prop', () => {
      render(<SEO jsonLd={sampleJsonLd} />);
      const script = document.getElementById('json-ld-structured-data');
      expect(JSON.parse(script.textContent)).toEqual(sampleJsonLd);
    });

    it('updates script content on re-render with different jsonLd', () => {
      const { rerender } = render(<SEO jsonLd={sampleJsonLd} />);
      const updated = { ...sampleJsonLd, name: 'Updated Name' };
      rerender(<SEO jsonLd={updated} />);
      const script = document.getElementById('json-ld-structured-data');
      expect(JSON.parse(script.textContent).name).toBe('Updated Name');
    });

    it('removes the JSON-LD script when jsonLd prop is removed (next page has no structured data)', () => {
      const { rerender } = render(<SEO jsonLd={sampleJsonLd} />);
      expect(document.getElementById('json-ld-structured-data')).not.toBeNull();

      // Simulate navigating to a page without structured data
      rerender(<SEO title="Contact" />);
      expect(document.getElementById('json-ld-structured-data')).toBeNull();
    });

    it('does not create duplicate script elements across multiple renders', () => {
      const { rerender } = render(<SEO jsonLd={sampleJsonLd} />);
      rerender(<SEO jsonLd={{ ...sampleJsonLd, name: 'Second' }} />);
      rerender(<SEO jsonLd={{ ...sampleJsonLd, name: 'Third' }} />);

      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      expect(scripts.length).toBe(1);
    });
  });
});
