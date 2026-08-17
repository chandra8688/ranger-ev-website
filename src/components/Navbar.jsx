import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, MapPin } from 'lucide-react';
import { companyInfo } from '../data/company';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const close = () => setMobileOpen(false);

  const links = [
    { to: '/', label: 'Home', end: true },
    { to: '/about', label: 'About RANGER' },
    { to: '/chargers', label: 'Chargers' },
    { to: '/outlets', label: 'Outlets' },
    { to: '/partner', label: 'Partner' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container navbar__inner">
        {/* Logo & Brand Block */}
        <Link to="/" className="navbar__brand" onClick={close} aria-label="RANGER EV — Home">
          <div className="navbar__logo-wrap">
            <img
              src="/images/brand/ranger-logo-navbar.png"
              alt="RANGER EV Official Logo"
              className="navbar__logo"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <div className="navbar__wordmark">
            <span className="navbar__wordmark-title">RANGER</span>
            <span className="navbar__wordmark-accent" aria-hidden="true"></span>
            <span className="navbar__wordmark-tagline">POWERING EVERY JOURNEY</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main navigation">
          <div className="navbar__nav">
            {links.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Actions */}
        <div className="navbar__actions">
          <Link
            to="/outlets"
            className="btn btn--primary btn--sm"
            id="navbar-cta"
            style={{ whiteSpace: 'nowrap' }}
          >
            <MapPin size={15} aria-hidden="true" />
            Find an Outlet
          </Link>

          {/* Mobile toggle */}
          <button
            className="nav-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen
              ? <X size={28} color="#ffffff" strokeWidth={2.5} aria-hidden="true" />
              : <Menu size={28} color="#ffffff" strokeWidth={2.5} aria-hidden="true" />
            }
          </button>
        </div>
      </div>

      {/* Mobile Drawer — full-viewport overlay, panel slides in from right */}
      <nav className={`mobile-drawer${mobileOpen ? ' open' : ''}`} aria-label="Mobile navigation" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
        <div className="mobile-drawer__panel">
          {links.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              onClick={close}
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/outlets"
            className="btn btn--primary"
            onClick={close}
            style={{ marginTop: '1.5rem', justifyContent: 'center' }}
          >
            <MapPin size={16} aria-hidden="true" />
            Find a RANGER Outlet
          </Link>
        </div>
      </nav>
    </header>
  );
}
