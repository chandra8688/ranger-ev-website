import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import SEO from '../components/SEO';
import { notFoundMeta } from '../data/seo';

export default function NotFound() {
  return (
    <div className="page">
      <SEO title={notFoundMeta.title} description={notFoundMeta.description} noindex />
      <section className="section not-found">
        <div className="container container--narrow">
          <p className="not-found__code" aria-hidden="true">404</p>
          <h1 className="h2" style={{ marginTop: '1rem' }}>This road doesn&apos;t lead anywhere.</h1>
          <p className="lead mx-auto" style={{ marginTop: '1rem' }}>
            The page you&apos;re looking for doesn&apos;t exist or has moved.
          </p>
          <div className="cluster btn-row" style={{ justifyContent: 'center', marginTop: '2rem' }}>
            <Link to="/" className="btn btn--primary">Back to home</Link>
            <Link to="/outlets" className="btn btn--secondary"><MapPin size={16} aria-hidden="true" /> Find an outlet</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
