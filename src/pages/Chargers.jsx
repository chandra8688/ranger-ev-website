import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, SplitSquareHorizontal } from 'lucide-react';
import RangerChargerIllustration from '../components/illustrations/RangerChargerIllustration';
import TransitionTicker from '../components/TransitionTicker';
import SEO from '../components/SEO';
import { BASE_URL } from '../config';

export default function Chargers() {
  return (
    <main>
      <SEO 
        title="60 kW CCS2 DC Fast Charger | RANGER EV"
        description="Discover the robust 60 kW DC fast chargers powering the RANGER EV highway network. Reliable, dual-gun CCS2 technology built for the long drive."
        canonicalUrl={`${BASE_URL}/chargers`}
      />
      <section className="section section--lg on-light" style={{ background: 'var(--surface-light)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>

            {/* Left: Content */}
            <div>
              <span className="t-eyebrow t-eyebrow--orange">The Hardware</span>
              <h1 style={{ marginBottom: '1.25rem' }}>RANGER<br />60 kW DC<br />Fast Charger</h1>
              <div className="green-rule"></div>

              <p className="t-lead" style={{ marginTop: '1.5rem', marginBottom: '2.5rem' }}>
                Engineered for the demands of the highway. Our chargers deliver robust,
                reliable DC power to get you back on the road without unnecessary delays.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ background: 'rgba(61,139,67,0.15)', color: 'var(--ranger-green)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                    <Zap size={24} />
                  </div>
                  <div>
                    <h3 className="h4" style={{ marginBottom: '0.25rem' }}>60 kW Direct Current</h3>
                    <p style={{ fontSize: '0.95rem' }}>Provides substantial power to rapidly replenish modern EV batteries.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ background: 'rgba(61,139,67,0.15)', color: 'var(--ranger-green)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                    <SplitSquareHorizontal size={24} />
                  </div>
                  <div>
                    <h3 className="h4" style={{ marginBottom: '0.25rem' }}>Dual CCS2 Connectors</h3>
                    <p style={{ fontSize: '0.95rem' }}>Equipped with two industry-standard CCS2 charging guns, capable of charging two vehicles simultaneously.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Illustration */}
            <div className="flex-center" style={{ padding: '2rem' }}>
              <RangerChargerIllustration
                style={{ height: '560px', width: 'auto', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.08))' }}
              />
            </div>

          </div>
        </div>
      </section>

      <TransitionTicker />

      <section className="section section--lg on-dark text-center" style={{ background: 'var(--surface-dark)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Experience it on the road</h2>
          <p className="t-lead" style={{ margin: '0 auto 2.5rem' }}>
            Our 60 kW chargers are currently deployed and operational at RANGER Outlet #01.
          </p>
          <Link to="/outlets" className="btn btn--primary">
            Find a RANGER Outlet
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
