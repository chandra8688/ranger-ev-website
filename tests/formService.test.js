/**
 * tests/formService.test.js
 *
 * Tests submitContactForm and submitPartnerForm using a mocked fetch.
 * No real HTTP requests are made — the production Formspree endpoints
 * are never called.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { submitContactForm, submitPartnerForm } from '../src/services/formService.js';

// Helper: create a mock Response with a given ok status and JSON body
function mockResponse(ok, body) {
  return {
    ok,
    json: () => Promise.resolve(body),
  };
}

describe('formService', () => {
  beforeEach(() => {
    // Replace global fetch with a vi.fn() before each test
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ---------------------------------------------------------------
  // submitContactForm
  // ---------------------------------------------------------------
  describe('submitContactForm', () => {
    it('calls fetch with POST method and Accept: application/json header', async () => {
      fetch.mockResolvedValueOnce(mockResponse(true, { next: '/' }));

      const formData = new FormData();
      formData.append('name', 'Test User');
      await submitContactForm(formData);

      expect(fetch).toHaveBeenCalledOnce();
      const [url, options] = fetch.mock.calls[0];
      expect(typeof url).toBe('string');
      expect(url).toContain('formspree.io');
      expect(options.method).toBe('POST');
      expect(options.headers['Accept']).toBe('application/json');
    });

    it('resolves with the JSON response body on success', async () => {
      const successBody = { next: '/' };
      fetch.mockResolvedValueOnce(mockResponse(true, successBody));

      const result = await submitContactForm(new FormData());
      expect(result).toEqual(successBody);
    });

    it('throws an Error with the Formspree error message on HTTP failure with errors array', async () => {
      fetch.mockResolvedValueOnce(
        mockResponse(false, { errors: [{ message: 'Invalid email address' }] })
      );

      await expect(submitContactForm(new FormData())).rejects.toThrow('Invalid email address');
    });

    it('throws a generic user-friendly message on HTTP failure with no errors array', async () => {
      fetch.mockResolvedValueOnce(mockResponse(false, {}));

      await expect(submitContactForm(new FormData())).rejects.toThrow(
        "We couldn't send your request right now"
      );
    });

    it('throws a user-friendly Error on network failure', async () => {
      fetch.mockRejectedValueOnce(new Error('Network Error'));

      await expect(submitContactForm(new FormData())).rejects.toThrow('Network Error');
    });

    it('throws a generic fallback message when network error has no message', async () => {
      // Simulate a rejection with a non-Error object (no .message property)
      fetch.mockRejectedValueOnce({});

      await expect(submitContactForm(new FormData())).rejects.toThrow(
        "We couldn't send your request right now"
      );
    });
  });

  // ---------------------------------------------------------------
  // submitPartnerForm
  // ---------------------------------------------------------------
  describe('submitPartnerForm', () => {
    it('calls a different endpoint than the contact form', async () => {
      fetch.mockResolvedValueOnce(mockResponse(true, { next: '/' }));
      const contactSpy = vi.fn().mockResolvedValueOnce(mockResponse(true, { next: '/' }));
      fetch.mockImplementationOnce(contactSpy);

      await submitContactForm(new FormData());
      const contactUrl = fetch.mock.calls[0][0];

      fetch.mockClear();
      fetch.mockResolvedValueOnce(mockResponse(true, { next: '/' }));
      await submitPartnerForm(new FormData());
      const partnerUrl = fetch.mock.calls[0][0];

      expect(partnerUrl).not.toBe(contactUrl);
    });

    it('resolves with the JSON response body on success', async () => {
      const successBody = { next: '/' };
      fetch.mockResolvedValueOnce(mockResponse(true, successBody));

      const result = await submitPartnerForm(new FormData());
      expect(result).toEqual(successBody);
    });

    it('throws an error on HTTP failure', async () => {
      fetch.mockResolvedValueOnce(mockResponse(false, { errors: [{ message: 'Rate limited' }] }));

      await expect(submitPartnerForm(new FormData())).rejects.toThrow('Rate limited');
    });
  });
});
