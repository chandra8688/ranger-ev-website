import React from 'react';
import { whatsappLink } from '../data/company';
import { trackEvent } from '../lib/analytics';

const WhatsAppIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35ZM12.04 21.5h-.01a9.5 9.5 0 0 1-4.84-1.33l-.35-.2-3.6.94.96-3.5-.23-.36A9.46 9.46 0 0 1 2.5 12C2.5 6.76 6.78 2.5 12.04 2.5c2.55 0 4.94.99 6.74 2.79a9.43 9.43 0 0 1 2.79 6.72c0 5.24-4.28 9.5-9.53 9.5Zm8.1-17.6A11.36 11.36 0 0 0 12.04.5C5.73.5.6 5.62.6 11.93c0 2.02.53 3.98 1.53 5.71L.5 23.5l6-1.57a11.45 11.45 0 0 0 5.53 1.41h.01c6.31 0 11.44-5.12 11.44-11.43 0-3.05-1.19-5.92-3.35-8.08Z" />
  </svg>
);

export default function WhatsAppButton() {
  return (
    <a
      className="fab-whatsapp"
      href={whatsappLink('Hi RANGER EV, I need help with charging.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with RANGER EV on WhatsApp (opens in a new tab)"
      onClick={() => trackEvent('click_whatsapp', { location: 'floating_button' })}
    >
      <WhatsAppIcon />
      <span>Chat with us</span>
    </a>
  );
}
