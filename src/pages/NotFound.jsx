import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { BASE_URL } from '../config';

export default function NotFound() {
  useEffect(() => {
    document.body.classList.remove('has-sticky-bar');
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ background: 'var(--clr-offwhite)', minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
      <SEO 
        title="Page Not Found | RANGER EV"
        description="The requested page could not be found."
        canonicalUrl={`${BASE_URL}/`}
      />
      
      <div className="container section text-center" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ fontSize: 'clamp(4rem, 10vw, 6rem)', color: 'var(--clr-ranger-green)', marginBottom: '0', lineHeight: 1 }}>404</h1>
        <h2 style={{ marginBottom: '1rem' }}>Page Not Found</h2>
        <p className="t-lead" style={{ margin: '0 0 2.5rem', maxWidth: '500px', color: 'var(--txt-muted)' }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="btn btn--primary">
          Return to Home
        </Link>
      </div>
    </main>
  );
}
