import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Phone } from 'lucide-react';
import Logo from './Logo';
import { companyInfo } from '../data/company';
import { trackEvent } from '../lib/analytics';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/chargers', label: 'Chargers' },
  { to: '/outlets', label: 'Outlets' },
  { to: '/partner', label: 'Partner' },
  { to: '/contact', label: 'Contact' },
];

const navClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);
  const { pathname } = useLocation();

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close on route change (e.g. browser back while the drawer is open).
  useEffect(() => { setOpen(false); }, [pathname]);

  // Close when the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1101px)');
    const onChange = (e) => { if (e.matches) setOpen(false); };
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  // Scroll lock, Escape to close, focus trap.
  useEffect(() => {
    if (!open) return undefined;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const focusables = () => [toggleRef.current, ...(panelRef.current?.querySelectorAll('a[href], button') ?? [])].filter(Boolean);
    focusables()[1]?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key !== 'Tab') return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  const { primaryPhone, displayPhone } = companyInfo.contact;

  return (
    <>
    <header className={`navbar${scrolled || open ? ' scrolled' : ''}`}>
      <div className="container container--wide navbar__inner">
        <Link to="/" className="brand" aria-label="RANGER EV home" viewTransition>
          <Logo className="brand__logo" eager />
          <span className="brand__word" aria-hidden="true">
            <span className="brand__title">RANGER</span>
            <span className="brand__rule" />
            <span className="brand__tag">POWERING EVERY JOURNEY</span>
          </span>
        </Link>

        <nav aria-label="Main" className="navbar__nav">
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={navClass} viewTransition>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <a
            href={`tel:${primaryPhone}`}
            className="btn btn--secondary btn--sm nav-call"
            aria-label={`Call 24×7 support ${displayPhone}`}
            onClick={() => trackEvent('click_call', { location: 'navbar' })}
          >
            <Phone size={16} aria-hidden="true" />
            <span>Call</span>
          </a>
          <Link to="/outlets" className="btn btn--primary btn--sm nav-cta" viewTransition>
            <MapPin size={16} aria-hidden="true" />
            Find an Outlet
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="nav-toggle"
            onClick={() => (open ? close(false) : setOpen(true))}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>

      {/* Rendered outside <header>: the header's backdrop-filter would otherwise
          trap this fixed overlay inside the header's stacking context, covering
          the close button (the original tablet-width bug). */}
      <div id="mobile-menu" className={`drawer${open ? ' open' : ''}`} inert={!open}>
        <div className="drawer__backdrop" onClick={() => close()} aria-hidden="true" />
        <nav ref={panelRef} className="drawer__panel" aria-label="Mobile">
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={navClass} onClick={() => close(false)} viewTransition>
              {label}
            </NavLink>
          ))}
          <div className="drawer__cta">
            <Link to="/outlets" className="btn btn--primary btn--lg" onClick={() => close(false)}>
              <MapPin size={18} aria-hidden="true" />
              Find a RANGER Outlet
            </Link>
            <a href={`tel:${primaryPhone}`} className="btn btn--secondary btn--lg" onClick={() => trackEvent('click_call', { location: 'drawer' })}>
              <Phone size={18} aria-hidden="true" />
              24×7 Support
            </a>
          </div>
          <p className="drawer__meta">{displayPhone} · {companyInfo.contact.email}</p>
        </nav>
      </div>
    </>
  );
}
