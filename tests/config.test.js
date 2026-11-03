/**
 * tests/config.test.js
 *
 * Tests the exported constants from src/config.js.
 * These tests verify behavioral invariants rather than just reflecting
 * implementation details:
 *   - BASE_URL is a valid HTTPS URL pointing to the production domain.
 *   - COMPANY_DOMAIN is a valid hostname without protocol.
 *   - BUSINESS_EMAIL is a valid email address format.
 *   - BASE_URL includes COMPANY_DOMAIN (they are consistent).
 */
import { describe, it, expect } from 'vitest';
import { BASE_URL, COMPANY_DOMAIN, BUSINESS_EMAIL } from '../src/config.js';

describe('src/config.js exports', () => {
  describe('COMPANY_DOMAIN', () => {
    it('is a non-empty string', () => {
      expect(typeof COMPANY_DOMAIN).toBe('string');
      expect(COMPANY_DOMAIN.trim().length).toBeGreaterThan(0);
    });

    it('does not include a protocol prefix (should be a bare hostname)', () => {
      expect(COMPANY_DOMAIN).not.toMatch(/^https?:\/\//);
    });

    it('contains at least one dot (valid domain structure)', () => {
      expect(COMPANY_DOMAIN).toContain('.');
    });
  });

  describe('BASE_URL', () => {
    it('is a non-empty string', () => {
      expect(typeof BASE_URL).toBe('string');
      expect(BASE_URL.trim().length).toBeGreaterThan(0);
    });

    it('starts with https://', () => {
      expect(BASE_URL).toMatch(/^https:\/\//);
    });

    it('is a parseable URL', () => {
      expect(() => new URL(BASE_URL)).not.toThrow();
    });

    it('does not have a trailing slash', () => {
      expect(BASE_URL.endsWith('/')).toBe(false);
    });

    it('includes COMPANY_DOMAIN as its hostname', () => {
      const parsed = new URL(BASE_URL);
      expect(parsed.hostname).toBe(COMPANY_DOMAIN);
    });
  });

  describe('BUSINESS_EMAIL', () => {
    it('is a non-empty string', () => {
      expect(typeof BUSINESS_EMAIL).toBe('string');
      expect(BUSINESS_EMAIL.trim().length).toBeGreaterThan(0);
    });

    it('matches a valid email address pattern', () => {
      // RFC 5322 simplified pattern: local@domain.tld
      expect(BUSINESS_EMAIL).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });

    it('does not contain whitespace', () => {
      expect(BUSINESS_EMAIL).not.toMatch(/\s/);
    });
  });
});
