import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Analytics from './components/Analytics';
import WhatsAppButton from './components/WhatsAppButton';
import ConsentBanner from './components/ConsentBanner';
import { getConsent } from './lib/analytics';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Chargers = lazy(() => import('./pages/Chargers'));
const Outlets = lazy(() => import('./pages/Outlets'));
const OutletDetail = lazy(() => import('./pages/OutletDetail'));
const Partner = lazy(() => import('./pages/Partner'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }
    // Lazy routes render after this effect, so wait (up to ~3 s) for the target.
    let frame;
    const started = performance.now();
    const seek = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) el.scrollIntoView();
      else if (performance.now() - started < 3000) frame = requestAnimationFrame(seek);
    };
    seek();
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    if (!getConsent()) setShowConsent(true);
  }, []);

  return (
    <Router>
      <ScrollManager />
      <Analytics />
      <div className="app-shell">
        <a href="#main" className="skip-link">Skip to content</a>
        <Navbar />
        <main id="main" className="app-main" tabIndex={-1}>
          <Suspense fallback={<div className="route-fallback" aria-hidden="true" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/chargers" element={<Chargers />} />
              <Route path="/outlets" element={<Outlets />} />
              <Route path="/outlets/:id" element={<OutletDetail />} />
              <Route path="/partner" element={<Partner />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer onManageCookies={() => setShowConsent(true)} />
        <WhatsAppButton />
        {showConsent && <ConsentBanner onClose={() => setShowConsent(false)} />}
      </div>
    </Router>
  );
}
