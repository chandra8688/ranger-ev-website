import { useCallback, useRef, useState } from 'react';
import { trackEvent } from './analytics';

const MIN_FILL_MS = 1500; // humans (even with autofill) don't submit a multi-field form in under 1.5 s

/**
 * Shared submit logic for Formspree forms: honeypot + timing spam checks,
 * native validation with focus on the first invalid field, and status/error
 * state that the page announces via role="alert" / role="status".
 */
export default function useFormSubmit(submitFn, { eventName }) {
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [error, setError] = useState('');
  const startedAt = useRef(Date.now());
  const alertRef = useRef(null);
  const successRef = useRef(null);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.querySelectorAll('[required]').forEach((el) => el.setAttribute('aria-invalid', String(!el.validity.valid)));
      form.querySelector(':invalid')?.focus();
      return;
    }

    const data = new FormData(form);
    // Spam traps: bots fill hidden fields and submit instantly. Pretend success.
    if (data.get('_gotcha') || Date.now() - startedAt.current < MIN_FILL_MS) {
      setStatus('success');
      return;
    }

    setStatus('submitting');
    setError('');
    try {
      await submitFn(data);
      setStatus('success');
      trackEvent(eventName);
      requestAnimationFrame(() => successRef.current?.focus());
    } catch (err) {
      setError(err.message);
      setStatus('error');
      requestAnimationFrame(() => alertRef.current?.focus());
    }
  }, [submitFn, eventName]);

  const onFieldInput = useCallback((e) => {
    if (e.target.hasAttribute('aria-invalid')) e.target.setAttribute('aria-invalid', String(!e.target.validity.valid));
  }, []);

  const reset = useCallback(() => {
    startedAt.current = Date.now();
    setStatus('idle');
    setError('');
  }, []);

  return { status, error, onSubmit, onFieldInput, reset, alertRef, successRef };
}
