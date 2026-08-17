import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Zap, Clock, ShieldCheck, Coffee, Wifi, Car } from 'lucide-react';
import { companyInfo } from '../data/company';
import SEO from '../components/SEO';
import { BASE_URL } from '../config';
import TransitionTicker from '../components/TransitionTicker';

export default function Home() {
  return (
    <main>
      <SEO 
        title="RANGER EV | EV Fast Charging Network in India"
        description="Building a reliable EV fast-charging network for India's highways. Experience seamless 60 kW DC charging designed for the long drive."
        canonicalUrl={`${BASE_URL}/`}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "RANGER EV",
            "url": BASE_URL
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "RANGER EV",
            "url": BASE_URL,
            "logo": `${BASE_URL}/images/brand/ranger-logo-transparent.png`,
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": companyInfo.contact.primaryPhone,
              "contactType": "customer service",
              "email": "rangerevhub@gmail.com"
            }
          }
        ]}
      />
      
      {/* ========================================================
          SECTION 1: HERO
          ======================================================== */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img 
            src="/images/cinematic/hero_cinematic_highway_v2_1786922470899.webp"
            alt="Cinematic highway landscape representing the long drive"
            fetchPriority="high"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '75% center' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(17,18,20,0.95) 0%, rgba(17,18,20,0.5) 45%, transparent 100%)' }}></div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-main) 0%, transparent 30%)' }}></div>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '640px' }}>
            <span className="hero-eyebrow">RANGER EV</span>
            <h1 style={{ marginBottom: '1.5rem', lineHeight: 1.05 }}>Powering<br />Every Journey</h1>
            <p className="t-lead" style={{ marginBottom: '2.5rem', color: 'rgba(255,255,255,0.8)' }}>
              Building a reliable EV fast-charging network for India's highways.
              Experience seamless 60 kW DC charging designed for the long drive.
            </p>

            <div className="flex-gap-1">
              <Link to="/outlets" className="btn btn--primary" style={{ padding: '1rem 2rem' }}>
                <MapPin size={18} aria-hidden="true" />
                Find Charging Station
              </Link>
              <Link to="/outlets/outlet-01" className="btn btn--outline" style={{ padding: '1rem 2rem' }}>
                View Outlet #01
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 1.5: TRUST STRIP
          ======================================================== */}
      <TransitionTicker />

      {/* ========================================================
          SECTION 2: VISION / ABOUT
          ======================================================== */}
      <section className="section section--lg" style={{ background: 'var(--bg-main)', overflow: 'hidden' }}>
        <div className="container">
          <div className="editorial-grid">
            <div className="editorial-grid__left">
              <img src="/images/cinematic/vision_charging_hub_1786922492514.webp" alt="Clean, premium EV charging hub environment at night" loading="lazy" decoding="async" style={{ width: '100%', height: 'auto', borderRadius: '4px', objectFit: 'cover', aspectRatio: '4/5' }} />
            </div>
            <div className="editorial-grid__right" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span className="t-eyebrow t-eyebrow--orange">The Vision</span>
              <h2 style={{ marginBottom: '1.5rem' }}>The Highway Charging Standard</h2>
              <div className="green-rule"></div>
              <p className="t-lead" style={{ marginTop: '1.5rem', color: 'rgba(255,255,255,0.8)' }}>
                RANGER EV is an infrastructure provider dedicated to solving highway range anxiety. 
                We deploy robust 60 kW CCS2 DC fast chargers at strategic locations, ensuring 
                that drivers can travel cross-country with total confidence. Operational since August 2026.
              </p>
              <img src="/images/cinematic/vision_highway_journey_1786922522954.webp" alt="Electric vehicle traveling on a dark highway" loading="lazy" decoding="async" style={{ width: '85%', height: 'auto', borderRadius: '4px', objectFit: 'cover', aspectRatio: '4/5', marginLeft: 'auto', display: 'block', marginTop: '2rem' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3: DESIGNED AROUND THE JOURNEY
          ======================================================== */}
      <section className="section section--lg on-dark" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="grid-auto-3" style={{ gap: '4rem' }}>
            
            <div style={{ paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <Zap size={28} style={{ color: 'var(--ranger-green)', marginBottom: '1.5rem' }} />
              <h3 className="h4" style={{ marginBottom: '1rem' }}>Fast Charging</h3>
              <p style={{ fontSize: '1.125rem', lineHeight: 1.65 }}>Dual-gun 60 kW DC chargers utilizing the CCS2 standard, capable of charging two vehicles simultaneously to get you back on the road quickly.</p>
            </div>

            <div style={{ paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <Clock size={28} style={{ color: 'var(--ranger-green)', marginBottom: '1.5rem' }} />
              <h3 className="h4" style={{ marginBottom: '1rem' }}>24×7 Access</h3>
              <p style={{ fontSize: '1.125rem', lineHeight: 1.65 }}>The highway never sleeps, and neither do we. RANGER outlets are operational 24 hours a day, 7 days a week for uninterrupted travel.</p>
            </div>

            <div style={{ paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <MapPin size={28} style={{ color: 'var(--ranger-green)', marginBottom: '1.5rem' }} />
              <h3 className="h4" style={{ marginBottom: '1rem' }}>Strategic Locations</h3>
              <p style={{ fontSize: '1.125rem', lineHeight: 1.65 }}>Situated on major national routes with easy on-and-off access, designed specifically to serve long-distance commuters and travelers.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 4: TECHNOLOGY / CHARGERS
          ======================================================== */}
      <section className="section section--lg on-dark" style={{ background: 'var(--bg-dark-surface)', padding: 0, overflow: 'hidden' }}>
        <div className="split-50">
          <div style={{ position: 'relative', minHeight: '600px', background: 'var(--bg-dark-surface)' }}>
            <img src="/images/chargers/charger_home_transparent.webp" alt="RANGER 60 kW DC Fast Charger" loading="lazy" decoding="async" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center bottom', paddingBottom: '2rem', paddingTop: '2rem' }} />
          </div>
          <div style={{ padding: '6rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="t-eyebrow t-eyebrow--glow">Technology</span>
            <h2 style={{ marginBottom: '1.5rem' }}>Built for the demands of highway travel.</h2>
            <div className="green-rule"></div>
            <p className="t-lead" style={{ marginBottom: '2.5rem', marginTop: '1.5rem' }}>
              The RANGER 60 kW DC Fast Charger is designed for reliability and speed.
              Featuring dual CCS2 charging guns, it provides efficient power delivery
              for modern electric vehicles.
            </p>
            <div style={{ display: 'flex', gap: '3rem', marginBottom: '2.5rem' }}>
              <div className="spec-stat">
                <div className="spec-stat__number">60<span className="spec-stat__unit">kW</span></div>
                <div className="spec-stat__label">DC Power</div>
              </div>
              <div className="spec-stat">
                <div className="spec-stat__number spec-stat__number--green">2</div>
                <div className="spec-stat__label">EVs Simultaneously</div>
              </div>
            </div>
            <div>
              <Link to="/chargers" className="btn btn--outline" style={{ color: 'var(--clr-white)', borderColor: 'rgba(255,255,255,0.3)' }}>
                View Technical Specifications
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 5: OUTLET #01
          ======================================================== */}
      <section className="section section--lg on-dark" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src="/images/cinematic/network_highway_scene_1786922800043.webp" alt="Atmospheric highway scene at dusk" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--bg-main) 0%, rgba(17,18,20,0.8) 100%)' }}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="editorial-grid">
            <div className="editorial-grid__left">
              <span className="status-badge status-badge--op" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
                <span className="status-dot"></span>
                First Operational Outlet
              </span>
              
              <h2 style={{ marginBottom: '1.5rem', lineHeight: 1.1 }}>RANGER Outlet #01</h2>
              <p className="t-lead" style={{ marginBottom: '2.5rem', color: 'rgba(255,255,255,0.7)' }}>
                Our inaugural charging hub is now live on the Srisailam Highway (NH 765),
                providing a crucial energy link for travelers heading south.
              </p>

              <div className="info-strip" style={{ marginBottom: '2rem' }}>
                <div className="info-row">
                  <span className="info-label">Location</span>
                  <span className="info-value">Ayyasagar, NH 765</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Status</span>
                  <span className="info-value info-value--green">Operational 24×7</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Capacity</span>
                  <span className="info-value">2 Chargers / 4 Points</span>
                </div>
              </div>

              <Link to="/outlets/outlet-01" className="btn btn--outline" style={{ padding: '1rem 2rem' }}>
                View Location Details
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 6: AMENITIES / EXPERIENCE
          ======================================================== */}
      <section className="section section--lg" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="text-center" style={{ maxWidth: '700px', margin: '0 auto 3.5rem' }}>
            <h2>More Than Just Charging</h2>
            <p className="t-lead" style={{ marginTop: '1rem', color: 'var(--txt-muted)' }}>
              RANGER outlets are co-located with essential amenities, turning your charging time into a comfortable break.
            </p>
          </div>

          <div className="masonry-grid">
            <div className="amenity-card masonry-item">
              <div className="editorial-image">
                <img src="/images/cinematic/amenity_charging_1786922724004.webp" alt="Vehicle charging port connected to a charger" loading="lazy" decoding="async" />
              </div>
              <div className="amenity-card-content">
                <div className="amenity-card-title">60kW Fast Charging</div>
              </div>
            </div>
            
            <div className="amenity-card masonry-item">
              <div className="editorial-image">
                <img src="/images/cinematic/amenity_parking.webp" alt="Spacious parking bays at a charging facility" loading="lazy" decoding="async" />
              </div>
              <div className="amenity-card-content">
                <div className="amenity-card-title">Ample Parking</div>
              </div>
            </div>

            <div className="amenity-card masonry-item">
              <div className="editorial-image">
                <img src="/images/cinematic/amenity_cafe_1786922734138.webp" alt="Modern cafe interior with seating" loading="lazy" decoding="async" />
              </div>
              <div className="amenity-card-content">
                <div className="amenity-card-title">Food & Refreshments</div>
              </div>
            </div>
            
            <div className="amenity-card masonry-item">
              <div className="editorial-image">
                <img src="/images/cinematic/amenity_toilets_1786922787166.webp" alt="Modern clean restroom facilities" loading="lazy" decoding="async" />
              </div>
              <div className="amenity-card-content">
                <div className="amenity-card-title">Clean Restrooms</div>
              </div>
            </div>
            
            <div className="amenity-card masonry-item masonry-item--wide">
              <div className="editorial-image">
                <img src="/images/cinematic/amenity_wifi_1786922760773.webp" alt="Conceptual digital connectivity graphic" loading="lazy" decoding="async" style={{ aspectRatio: '21/9', objectFit: 'cover', width: '100%' }} />
              </div>
              <div className="amenity-card-content">
                <div className="amenity-card-title">Free Wi-Fi</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 7: PARTNER
          ======================================================== */}
      <section className="section section--lg" style={{ background: 'var(--bg-main)' }}>
        <div className="container">
          <div className="editorial-grid">
            <div className="editorial-grid__left" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
              <span className="t-eyebrow" style={{ color: 'var(--txt-muted)' }}>The Future</span>
              <h2 className="h1" style={{ marginBottom: '1.5rem', lineHeight: 1.1 }}>Expanding the RANGER Network</h2>
            </div>
            <div className="editorial-grid__right" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
              <p className="t-lead" style={{ marginTop: '1.5rem', marginBottom: '1.5rem', color: 'var(--txt-inverse)' }}>
                Outlet #01 is just the beginning. We are actively identifying new strategic
                highway locations to build a comprehensive charging network.
              </p>
              <p style={{ marginBottom: '2rem', color: 'var(--txt-muted)' }}>
                If you own commercial property or land along a major highway, partner with RANGER
                to host next-generation EV infrastructure.
              </p>
              <Link to="/partner" className="btn btn--outline" style={{ padding: '1rem 2rem' }}>
                Partner With RANGER
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 8: CLOSING CTA
          ======================================================== */}
      <section className="section section--lg" style={{ position: 'relative', overflow: 'hidden', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src="/images/cinematic/final_cta_highway_1786922809369.webp" alt="Empty highway leading to the horizon" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,18,20,0.95) 0%, rgba(17,18,20,0.5) 100%)' }}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1rem', color: 'var(--clr-white)' }}>Ready for your next journey?</h2>
          <p className="t-lead" style={{ marginBottom: '2.5rem', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            Find a RANGER charging outlet along your route and experience reliable, fast highway charging.
          </p>
          <Link to="/outlets" className="btn btn--primary" style={{ padding: '1.25rem 2.5rem', fontSize: '1.1rem' }}>
            <MapPin size={20} />
            Find a Charger
          </Link>
        </div>
      </section>

    </main>
  );
}
