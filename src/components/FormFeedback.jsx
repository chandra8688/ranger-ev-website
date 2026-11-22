import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FormError({ message, alertRef }) {
  return (
    <div className="form-alert" role="alert" tabIndex={-1} ref={alertRef}>
      <AlertCircle size={20} aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }} />
      <div>
        <strong>We couldn&apos;t send that</strong>
        {message} You can also call or WhatsApp us 24×7.
      </div>
    </div>
  );
}

export function FormSuccess({ title, children, onReset, resetLabel, successRef }) {
  return (
    <div className="form-success" role="status" tabIndex={-1} ref={successRef}>
      <span className="form-success__icon"><CheckCircle2 size={36} aria-hidden="true" /></span>
      <h3>{title}</h3>
      <p style={{ marginTop: '0.75rem' }}>{children}</p>
      <button type="button" className="btn btn--secondary" onClick={onReset} style={{ marginTop: '1.75rem' }}>
        {resetLabel}
      </button>
    </div>
  );
}

/** Honeypot (Formspree `_gotcha`) — hidden from people and assistive tech. */
export function Honeypot() {
  return (
    <div className="hp-field" aria-hidden="true">
      <label htmlFor="_gotcha">Leave this field empty</label>
      <input type="text" id="_gotcha" name="_gotcha" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function ConsentNote() {
  return (
    <p className="form-consent">
      By submitting, you agree that RANGER EV may use these details to respond to you, as described in our{' '}
      <Link to="/privacy">privacy policy</Link>.
    </p>
  );
}
