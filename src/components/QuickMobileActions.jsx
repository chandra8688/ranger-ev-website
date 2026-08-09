import React from 'react';
import { Navigation, Phone, MessageSquare } from 'lucide-react';

export default function QuickMobileActions({ googleMapsUrl, phone, whatsapp }) {
  return (
    <div className="sticky-mobile-actions">
      <div className="mobile-action-buttons">
        <a 
          href={googleMapsUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-primary"
          aria-label="Get Directions (opens in new tab)"
        >
          <Navigation size={16} aria-hidden="true" />
          <span>Directions</span>
        </a>

        <a 
          href={`tel:${phone}`} 
          className="btn btn-secondary"
          aria-label="Call Support"
        >
          <Phone size={16} aria-hidden="true" />
          <span>Call</span>
        </a>

        <a 
          href={`https://wa.me/${(whatsapp || '').replace(/[^0-9]/g, '')}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-outline"
          aria-label="WhatsApp Support (opens in new tab)"
          style={{ background: 'rgba(37, 211, 102, 0.1)', color: '#25D366', borderColor: 'rgba(37, 211, 102, 0.4)' }}
        >
          <MessageSquare size={16} aria-hidden="true" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
