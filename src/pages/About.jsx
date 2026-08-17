import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Map, Zap, ArrowRight } from 'lucide-react';
import RouteGraphic from '../components/illustrations/RouteGraphic';
import TransitionTicker from '../components/TransitionTicker';
import SEO from '../components/SEO';
import { BASE_URL } from '../config';

export default function About() {
  return (
    <main>
      <SEO 
        title="RANGER EV | About Our EV Charging Infrastructure"
        description="Learn how RANGER EV is building a robust, reliable 60 kW CCS2 highway charging network to eliminate range anxiety across India."
        canonicalUrl={`${BASE_URL}/about`}
      />
      {/* Hero */}
      <section className="section section--lg on-light" style={{ background: 'var(--surface-light)' }}>
        <div className="container text-center" style={{ maxWidth: '800px' }}>
          <span className="t-eyebrow t-eyebrow--orange">About RANGER</span>
          <h1 style={{ marginBottom: '1.5rem' }}>Building the Highway Charging Network</h1>
          <p className="t-lead" style={{ margin: '0 auto' }}>
            RANGER EV is dedicated to solving the biggest challenge in electric mobility:
            reliable, fast charging for long-distance travel on India's highways.
          </p>
        </div>
      </section>

      <TransitionTicker />

      {/* Our Beginning */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <h2 style={{ marginBottom: '1rem' }}>Our Beginning</h2>
              <div className="green-rule"></div>
              <p className="t-lead" style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
                Every journey starts with a single step. For RANGER, that step was the opening of
                <strong> Outlet #01 on August 2, 2026</strong>.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                Located at Ayyasagar on the Srisailam Highway (NH 765), this inaugural 24x7 hub
                serves as the blueprint for our future. We focused on getting the fundamentals right:
                60 kW DC fast charging, CCS2 compatibility, and co-location with essential driver amenities.
              </p>
              <p>
                We are systematically expanding our highway network, focusing strictly on high-reliability hardware and strategic location acquisition.
              </p>
            </div>

            <div style={{ background: 'var(--surface-elevated)', padding: '3rem 2rem', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary-dark)' }}>Outlet #01 Facts</h3>

              <div className="info-strip info-strip--dark">
                <div className="info-row info-row--dark">
                  <span className="info-label info-label--dark">Opened</span>
                  <span className="info-value info-value--dark">2 August 2026</span>
                </div>
                <div className="info-row info-row--dark">
                  <span className="info-label info-label--dark">Location</span>
                  <span className="info-value info-value--dark">NH 765, Ayyasagar</span>
                </div>
                <div className="info-row info-row--dark">
                  <span className="info-label info-label--dark">Technology</span>
                  <span className="info-value info-value--dark">60 kW DC Fast Charging</span>
                </div>
                <div className="info-row info-row--dark" style={{ borderBottom: 'none' }}>
                  <span className="info-label info-label--dark">Availability</span>
                  <span className="info-value info-value--green">24x7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why RANGER */}
      <section className="section" style={{ background: 'var(--surface-elevated)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>The RANGER Difference</h2>
            <p className="t-lead" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Why choose our network for your highway journey?
            </p>
          </div>

          <div className="grid-auto-3">
            <div className="partner-cat">
              <div className="partner-cat__icon">
                <Zap size={22} />
              </div>
              <h3 className="h4" style={{ marginBottom: '0.5rem' }}>Dependable Hardware</h3>
              <p>We deploy industrial-grade 60 kW DC chargers that deliver consistent power without overheating or unexpected throttling.</p>
            </div>

            <div className="partner-cat">
              <div className="partner-cat__icon">
                <Map size={22} />
              </div>
              <h3 className="h4" style={{ marginBottom: '0.5rem' }}>Highway Focused</h3>
              <p>We don't build in crowded city centers. Our mission is strictly to enable intercity and cross-country travel.</p>
            </div>

            <div className="partner-cat">
              <div className="partner-cat__icon">
                <Target size={22} />
              </div>
              <h3 className="h4" style={{ marginBottom: '0.5rem' }}>Driver Experience</h3>
              <p>Charging takes time. That's why we co-locate our chargers with food, restrooms, and parking, ensuring a restful stop.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Where We're Going */}
      <section className="section section--lg">
        <div className="container text-center">
          <span className="t-eyebrow">The Vision</span>
          <h2 style={{ marginBottom: '1rem' }}>Where We're Going</h2>
          <div className="green-rule green-rule--center"></div>
          <p className="t-lead" style={{ maxWidth: '700px', margin: '1.5rem auto 3rem' }}>
            The transition to electric mobility requires infrastructure that drivers can trust.
            RANGER is expanding its footprint along major corridors, bringing our standard of
            reliable fast charging to new highways.
          </p>

          <div style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
            <RouteGraphic style={{ width: '100%' }} />
          </div>

          <Link to="/partner" className="btn btn--primary">
            Partner With RANGER
          </Link>
        </div>
      </section>

    </main>
  );
}
