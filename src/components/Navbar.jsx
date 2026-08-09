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
        {/* Logo */}
        <Link to="/" className="navbar__logo-wrap" onClick={close} aria-label="RANGER EV — Home">
          <img
            src={companyInfo.branding.logo}
            alt="RANGER EV Official Logo"
            className="navbar__logo"
            loading="eager"
            fetchpriority="high"
          />
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
          <Link to="/outlets" className="btn btn--primary btn--sm" style={{ display: 'none' }} aria-hidden="true" tabIndex={-1}>
            Find an Outlet
          </Link>
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
              ? <X size={22} aria-hidden="true" />
              : <Menu size={22} aria-hidden="true" />
            }
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <nav className={`mobile-drawer${mobileOpen ? ' open' : ''}`} aria-label="Mobile navigation">
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
          style={{ marginTop: '0.5rem', justifyContent: 'center' }}
        >
          <MapPin size={16} aria-hidden="true" />
          Find a RANGER Outlet
        </Link>
      </nav>
    </header>
  );
}
