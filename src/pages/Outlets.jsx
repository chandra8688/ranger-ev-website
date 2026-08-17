import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Zap, Coffee } from 'lucide-react';
import { outletsData } from '../data/outlets';
import RouteGraphic from '../components/illustrations/RouteGraphic';
import SEO from '../components/SEO';
import { BASE_URL } from '../config';

export default function Outlets() {
  return (
    <main className="on-light" style={{ background: 'var(--surface-light)', minHeight: '100vh', paddingBottom: '6rem' }}>
      <SEO
        title="RANGER EV | Highway EV Charging Stations"
        description="Find RANGER EV fast-charging stations along India's highways. Check locations, real-time status, and premium amenities."
        canonicalUrl={`${BASE_URL}/outlets`}
      />

      <section className="section">
        <div className="container">
          <div className="editorial-grid">

            {/* Left Column: Typography & Description */}
            <div className="editorial-grid__left">
              <span className="t-eyebrow t-eyebrow--orange">Charging Network</span>
              <h1 style={{ marginBottom: '1.5rem' }}>RANGER Outlets</h1>
              <div className="green-rule" style={{ marginBottom: '2rem' }}></div>
              <p className="t-lead">
                Find reliable 60 kW DC fast charging on your route.
                Our network is expanding across India's major highways, ensuring you never have to compromise on speed or amenities.
              </p>

              <div style={{ marginTop: '4rem' }}>
                <h3 className="h4" style={{ marginBottom: '1.5rem', color: 'var(--text-secondary-light)' }}>Operational Hubs</h3>
                {outletsData.map((outlet) => (
                  <Link to={`/outlets/${outlet.id}`} key={outlet.id} style={{ display: 'block', background: 'var(--clr-white)', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)', transition: 'transform 0.3s ease, box-shadow 0.3s ease', textDecoration: 'none', color: 'inherit' }} className="outlet-card-hover">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                      <div>
                        <span className="status-badge status-badge--op" style={{ marginBottom: '0.75rem' }}>
                          <span className="status-dot"></span>
                          Operational
                        </span>
                        <h2 className="h3" style={{ color: 'var(--bg-main)' }}>{outlet.title}</h2>
                        <p style={{ color: 'var(--text-secondary-light)', fontSize: '0.9rem', marginTop: '0.25rem', marginBottom: 0 }}>
                          {outlet.highway} - {outlet.locationArea.split(',')[0]}
                        </p>
                      </div>
                      <div style={{ background: 'rgba(61,139,67,0.1)', color: 'var(--ranger-green)', padding: '0.75rem', borderRadius: '50%' }}>
                        <MapPin size={24} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid rgba(17,18,20,0.1)', paddingTop: '1rem' }}>
                      <span className="text-green fw-800">View Details</span>
                      <ArrowRight size={16} className="text-green" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Column: Visual Anchor & Future Locations */}
            <div className="editorial-grid__right" style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
              <div style={{ padding: '2rem', background: 'var(--surface-dark)', borderRadius: 'var(--radius-lg)' }}>
                <RouteGraphic style={{ width: '100%', height: 'auto' }} />
              </div>

              <div style={{ padding: '2.5rem', border: '1px dashed var(--border-dark-surface)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                <div style={{ color: 'var(--text-secondary-light)', marginBottom: '1rem' }}>
                  <MapPin size={32} style={{ margin: '0 auto' }} opacity={0.5} />
                </div>
                <h3 className="h4" style={{ color: 'var(--bg-main)', marginBottom: '0.5rem' }}>More Locations Coming Soon</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary-light)', margin: 0 }}>
                  We are actively acquiring sites along key corridors to expand the RANGER network.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
