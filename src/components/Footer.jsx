import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import Logo from './Logo';
import { companyInfo, whatsappLink } from '../data/company';
import { operationalCount } from '../data/outlets';
import { trackEvent } from '../lib/analytics';

export default function Footer({ onManageCookies }) {
  const year = new Date().getFullYear();
  const { displayPhone, primaryPhone, email, displayWhatsapp } = companyInfo.contact;
  const live = operationalCount();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <Link to="/" className="brand" aria-label="RANGER EV home">
              <Logo className="brand__logo" />
              <span className="brand__word" aria-hidden="true">
                <span className="brand__title">RANGER</span>
                <span className="brand__rule" />
                <span className="brand__tag">POWERING EVERY JOURNEY</span>
              </span>
            </Link>
            <p className="footer__about">
              RANGER EV builds reliable, 24×7 DC fast-charging hubs on India&apos;s national highways — with food, Wi-Fi and a place to rest while you charge.
            </p>
            <p className="badge badge--live" style={{ marginTop: '1.5rem' }}>
              <span className="dot" aria-hidden="true" />
              {live} {live === 1 ? 'outlet' : 'outlets'} operational
            </p>
          </div>

          <div>
            <h2 className="footer__title">Explore</h2>
            <ul className="footer__links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About RANGER</Link></li>
              <li><Link to="/chargers">Our Chargers</Link></li>
              <li><Link to="/outlets">Charging Outlets</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="footer__title">Business</h2>
            <ul className="footer__links">
              <li><Link to="/partner">Host a Charger</Link></li>
              <li><Link to="/contact">Contact &amp; Support</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="footer__title">24×7 Support</h2>
            <ul className="footer__contact">
              <li className="footer__contact-item">
                <Phone size={16} aria-hidden="true" />
                <div>
                  <a href={`tel:${primaryPhone}`} onClick={() => trackEvent('click_call', { location: 'footer' })}>{displayPhone}</a>
                  <small>Charging support, 24×7</small>
                </div>
              </li>
              <li className="footer__contact-item">
                <MessageCircle size={16} aria-hidden="true" />
                <div>
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('click_whatsapp', { location: 'footer' })}>
                    {displayWhatsapp}
                    <span className="visually-hidden"> on WhatsApp (opens in a new tab)</span>
                  </a>
                  <small>WhatsApp</small>
                </div>
              </li>
              <li className="footer__contact-item">
                <Mail size={16} aria-hidden="true" />
                <div>
                  <a href={`mailto:${email}`}>{email}</a>
                  <small>Business enquiries, Mon–Fri 9 AM–6 PM</small>
                </div>
              </li>
              <li className="footer__contact-item">
                <MapPin size={16} aria-hidden="true" />
                <div>
                  <a href={companyInfo.office.mapsUrl} target="_blank" rel="noopener noreferrer">
                    {companyInfo.office.label}
                    <span className="visually-hidden"> on Google Maps (opens in a new tab)</span>
                  </a>
                  <small>{companyInfo.office.city}</small>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="xsmall muted">&copy; {year} {companyInfo.legalName}. All rights reserved.</p>
          <div className="footer__legal">
            <Link to="/privacy">Privacy</Link>
            {onManageCookies && (
              <button type="button" onClick={onManageCookies}>Cookie settings</button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
