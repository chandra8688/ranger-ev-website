import React from 'react';
import { Link } from 'react-router-dom';
import { setConsent } from '../lib/analytics';

/**
 * Analytics consent (Google Consent Mode v2). Until the visitor chooses,
 * GA runs with analytics_storage=denied (no cookies, anonymous pings only).
 */
export default function ConsentBanner({ onClose }) {
  const choose = (value) => {
    setConsent(value);
    onClose();
  };

  return (
    <section className="consent" role="region" aria-label="Cookie consent">
      <p>
        We use analytics cookies to understand how drivers use this site and improve it. No advertising cookies.{' '}
        <Link to="/privacy">Privacy policy</Link>
      </p>
      <div className="consent__actions">
        <button type="button" className="btn btn--secondary btn--sm" onClick={() => choose('denied')}>
          Decline
        </button>
        <button type="button" className="btn btn--primary btn--sm" onClick={() => choose('granted')}>
          Accept analytics
        </button>
      </div>
    </section>
  );
}
