import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Zap, Coffee } from 'lucide-react';
import { outletsData } from '../data/outlets';
import SEO from '../components/SEO';
import { BASE_URL } from '../config';

export default function Outlets() {
  return (
    <main style={{ background: 'var(--clr-offwhite)', minHeight: '100vh', paddingBottom: '4rem' }}>
      <SEO 
        title="Charging Stations | RANGER EV"
        description="Locate RANGER EV charging stations. Fast, reliable 60 kW DC charging with premium amenities across India's highways."
        canonicalUrl={`${BASE_URL}/outlets`}
      />

      {/* Header */}
      <section className="section" style={{ paddingBottom: '3rem' }}>
        <div className="container">
          <span className="t-eyebrow t-eyebrow--orange">Charging Network</span>
          <h1 style={{ marginBottom: '1rem' }}>RANGER Outlets</h1>
          <p className="t-lead" style={{ maxWidth: '600px' }}>
            Find reliable 60 kW DC fast charging on your route.
            Our network is expanding across India's major highways.
          </p>
        </div>
      </section>

      {/* Directory Grid */}
      <section className="container">
        <div className="grid-2">

          {outletsData.map((outlet) => (
            <div key={outlet.id} style={{ background: 'var(--clr-white)', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                  <span className="status-badge status-badge--op" style={{ marginBottom: '0.75rem' }}>
                    <span className="status-dot"></span>
                    Operational
                  </span>
                  <h2 className="h3">{outlet.title}</h2>
                  <p style={{ color: 'var(--txt-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                    {outlet.highway} — {outlet.locationArea.split(',')[0]}
                  </p>
                </div>
                <div style={{ background: 'var(--clr-green-pale)', color: 'var(--clr-ranger-green)', padding: '0.75rem', borderRadius: '50%' }}>
                  <MapPin size={24} />
                </div>
              </div>

              <div className="green-rule" style={{ marginBottom: '1.5rem' }}></div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--txt-medium)', fontWeight: '600', marginBottom: '0.2rem', fontSize: '0.85rem' }}>
                    <Zap size={16} className="text-green" /> Charging
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--txt-muted)' }}>{outlet.specs.totalChargingPoints} Points ({outlet.specs.powerPerCharger} DC)</p>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--txt-medium)', fontWeight: '600', marginBottom: '0.2rem', fontSize: '0.85rem' }}>
                    <Coffee size={16} className="text-green" /> Amenities
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--txt-muted)' }}>Food, Restrooms, Parking</p>
                </div>
              </div>

              <Link to={`/outlets/${outlet.id}`} className="btn btn--outline" style={{ width: '100%', justifyContent: 'center' }}>
                View Details & Directions
              </Link>
            </div>
          ))}

          {/* Future Expansion Card */}
          <div style={{ background: 'transparent', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '1.5px dashed var(--clr-gray-300)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '320px' }}>
            <div style={{ background: 'var(--clr-gray-100)', color: 'var(--clr-gray-500)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
              <MapPin size={24} />
            </div>
            <h3 className="h4" style={{ color: 'var(--txt-medium)', marginBottom: '0.5rem' }}>More Locations Coming Soon</h3>
            <p style={{ color: 'var(--txt-muted)', fontSize: '0.9rem', maxWidth: '280px', margin: '0 auto 1.5rem' }}>
              We are actively developing new fast-charging hubs across national highways.
            </p>
            <Link to="/partner" className="btn-text" style={{ color: 'var(--txt-medium)' }}>
              Partner With Us <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}
