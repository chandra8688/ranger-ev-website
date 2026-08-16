import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { companyInfo } from '../data/company';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { displayPhone, primaryPhone, displayWhatsapp, whatsappNumber, email } = companyInfo.contact;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">

          {/* Column 1: Brand */}
          <div className="footer__brand-col">
            <Link to="/" className="footer__logo-wrap" aria-label="RANGER EV — Home">
              <img
                src="/images/brand/ranger-logo-transparent.png"
                alt="RANGER EV"
                className="footer__logo"
                loading="lazy"
              />
            </Link>
            <h2 className="footer__tagline">Powering Every Journey</h2>
            <p className="footer__desc">
              RANGER EV is an infrastructure provider building a reliable, high-speed electric vehicle charging network for India's national highways.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="footer__col-title">Navigation</h3>
            <div className="footer__links">
              <Link to="/">Home</Link>
              <Link to="/about">About RANGER</Link>
              <Link to="/chargers">Our Chargers</Link>
              <Link to="/outlets">Charging Outlets</Link>
            </div>
          </div>

          {/* Column 3: Corporate */}
          <div>
            <h3 className="footer__col-title">Corporate & Business</h3>
            <div className="footer__links">
              <Link to="/partner">Site Acquisition & Partnership</Link>
              <Link to="/contact">Business & Customer Support</Link>
            </div>
          </div>

          {/* Column 4: Contact & Action */}
          <div>
            <h3 className="footer__col-title">24/7 Support</h3>
            <div className="footer__contact">
              <div className="footer__contact-item">
                <Phone size={16} className="footer__contact-icon" aria-hidden="true" />
                <div className="footer__contact-value">
                  <a href={`tel:${primaryPhone}`}>{displayPhone}</a>
                  <div className="footer__contact-sub" style={{ fontSize: '0.75rem', marginTop: '0.15rem' }}>Network Operations: 24×7</div>
                </div>
              </div>
              <div className="footer__contact-item">
                <Mail size={16} className="footer__contact-icon" aria-hidden="true" />
                <div className="footer__contact-value">
                  <a href={`mailto:${email}`}>{email}</a>
                  <div className="footer__contact-sub" style={{ fontSize: '0.75rem', marginTop: '0.15rem' }}>Corporate: Mon-Fri 9AM-6PM</div>
                </div>
              </div>
              <div className="footer__contact-item">
                <MapPin size={16} className="footer__contact-icon" aria-hidden="true" />
                <div className="footer__contact-value">
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">Corporate Office</a>
                  <div className="footer__contact-sub" style={{ fontSize: '0.75rem', marginTop: '0.15rem' }}>Hyderabad, Telangana</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <p className="footer__bottom-text">
            &copy; {currentYear} RANGER EV Infrastructure. All rights reserved.
          </p>
          <div className="flex-gap-sm">
            <span className="status-badge status-badge--op" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.1)' }}>
              <span className="status-dot" style={{ background: '#3DAA6B' }}></span>
              Network Online
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
