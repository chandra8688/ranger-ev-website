import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Zap, Clock, ShieldCheck, Coffee, Wifi, Car } from 'lucide-react';
import HighwayComposition from '../components/illustrations/HighwayComposition';
import RangerChargerIllustration from '../components/illustrations/RangerChargerIllustration';
import EnergyWave from '../components/illustrations/EnergyWave';
import RouteGraphic from '../components/illustrations/RouteGraphic';
import { companyInfo } from '../data/company';
import SEO from '../components/SEO';
import { BASE_URL } from '../config';


export default function Home() {
  return (
    <main>
      <SEO 
        title="RANGER EV | 60 kW DC Fast Charging on NH765"
        description="Building a reliable EV fast-charging network for India's highways. Experience seamless 60 kW DC charging designed for the long drive on NH765, Telangana."
        canonicalUrl={`${BASE_URL}/`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ElectricVehicleChargingStation",
          "name": "RANGER EV",
          "url": BASE_URL,
          "logo": `${BASE_URL}/logo.png`,
          "telephone": companyInfo.contact.primaryPhone,
          "email": "rangerevhub@gmail.com",

          "address": {
            "@type": "PostalAddress",
            "streetAddress": "NH765",
            "addressLocality": "Ayyasagar",
            "addressRegion": "Telangana",
            "addressCountry": "IN"
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
          }
        }}
      />
      {/* ========================================================
          SECTION 1: HERO
          ======================================================== */}
      <section className="section section--lg" style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)', paddingBottom: 'clamp(5rem, 8vw, 8rem)', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div className="hero-grid" style={{ alignItems: 'center' }}>

            {/* Left: Typography & Story */}
            <div style={{ maxWidth: '600px' }}>
              <span className="t-eyebrow">RANGER EV</span>
              <h1 style={{ marginBottom: '1.5rem' }}>Powering<br />Every Journey</h1>
              <p className="t-lead" style={{ marginBottom: '2.5rem' }}>
                Building a reliable EV fast-charging network for India's highways.
                Experience seamless 60 kW DC charging designed for the long drive.
              </p>

              <div className="flex-gap-1">
                <Link to="/outlets" className="btn btn--primary">
                  <MapPin size={18} aria-hidden="true" />
                  Find Charging Station
                </Link>
                <Link to="/outlets/outlet-01" className="btn btn--outline">
                  View Outlet #01
                </Link>
              </div>
            </div>

            {/* Right: Illustration */}
            <div style={{ position: 'relative' }}>
              <HighwayComposition style={{ width: '100%', height: 'auto', transform: 'scale(1.05)' }} />
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 1.5: TRUST STRIP
          ======================================================== */}
      <div style={{ background: 'var(--clr-white)', padding: '1.5rem 0', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', color: 'var(--txt-muted)', fontSize: '0.9rem', fontWeight: '500' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={16}/> 24×7</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Zap size={16}/> 60 kW DC</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Zap size={16}/> CCS2</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Coffee size={16}/> Cafe</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Wifi size={16}/> Free Wi-Fi</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><MapPin size={16}/> Highway Location</span>
        </div>
      </div>

      {/* ========================================================
          SECTION 2: WHAT RANGER IS
          ======================================================== */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container text-center" style={{ maxWidth: '800px' }}>
          <span className="t-eyebrow t-eyebrow--orange">The Vision</span>
          <h2 style={{ marginBottom: '1.5rem' }}>The Highway Charging Standard</h2>
          <div className="green-rule green-rule--center"></div>
          <p className="t-lead" style={{ marginTop: '1.5rem' }}>
            RANGER EV is an infrastructure provider dedicated to solving highway range anxiety. 
            We deploy robust 60 kW CCS2 DC fast chargers at strategic locations, ensuring 
            that drivers can travel cross-country with total confidence. Operational since August 2026.
          </p>
        </div>
      </section>

      {/* ========================================================
          SECTION 3: DESIGNED AROUND THE JOURNEY
          ======================================================== */}
      <section className="section section--lg" style={{ position: 'relative' }}>
        <EnergyWave
          baseColor="#F6F8F5"
          accentColor="#E4F5EB"
          opacity={0.6}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', transform: 'translateY(-99%)' }}
        />

        <div className="container">
          <div className="grid-auto-3">
            <div className="partner-cat">
              <div className="partner-cat__icon">
                <Zap size={22} className="text-green" />
              </div>
              <h3 className="h4" style={{ marginBottom: '0.75rem' }}>Fast Charging</h3>
              <p>Dual-gun 60 kW DC chargers utilizing the CCS2 standard, capable of charging two vehicles simultaneously to get you back on the road quickly.</p>
            </div>

            <div className="partner-cat">
              <div className="partner-cat__icon">
                <Clock size={22} className="text-green" />
              </div>
              <h3 className="h4" style={{ marginBottom: '0.75rem' }}>24×7 Access</h3>
              <p>The highway never sleeps, and neither do we. RANGER outlets are operational 24 hours a day, 7 days a week for uninterrupted travel.</p>
            </div>

            <div className="partner-cat">
              <div className="partner-cat__icon">
                <MapPin size={22} className="text-green" />
              </div>
              <h3 className="h4" style={{ marginBottom: '0.75rem' }}>Strategic Locations</h3>
              <p>Situated on major national routes with easy on-and-off access, designed specifically to serve long-distance commuters and travelers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 4: RANGER CHARGING TECHNOLOGY (Dark Section)
          ======================================================== */}
      <section className="section section--lg on-dark" style={{ background: 'var(--bg-dark-surface)', overflow: 'hidden' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>

            <div>
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

              <Link to="/chargers" className="btn btn--outline" style={{ color: 'var(--bg-main)', borderColor: 'rgba(255,255,255,0.3)' }}>
                View Technical Specifications
              </Link>
            </div>

            <div className="flex-center" style={{ position: 'relative' }}>
              <RangerChargerIllustration
                variant="dark"
                style={{ height: '480px', width: 'auto', zIndex: 2 }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 5: OUTLET #01
          ======================================================== */}
      <section className="section section--lg">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>

            <div style={{ order: 2 }}>
              <HighwayComposition style={{ width: '100%', transform: 'scale(1.05)' }} />
            </div>

            <div style={{ order: 1 }}>
              <span className="status-badge status-badge--op" style={{ marginBottom: '1.5rem' }}>
                <span className="status-dot"></span>
                First Operational Outlet
              </span>
              <h2 style={{ marginBottom: '1.5rem' }}>RANGER Outlet #01</h2>
              <p className="t-lead" style={{ marginBottom: '2.5rem' }}>
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

              <Link to="/outlets/outlet-01" className="btn btn--outline">
                View Location Details
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 6: BUILT FOR HIGHWAY STOPS
          ======================================================== */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="text-center" style={{ maxWidth: '700px', margin: '0 auto 3.5rem' }}>
            <h2>More Than Just Charging</h2>
            <p className="t-lead" style={{ marginTop: '1rem' }}>
              RANGER outlets are co-located with essential amenities, turning your charging time into a comfortable break.
            </p>
          </div>

          <div className="amenity-strip" style={{ justifyContent: 'center' }}>
            <div className="amenity-item">
              <div className="amenity-icon"><Zap size={24} /></div>
              <span className="amenity-label">60kW Fast Charging</span>
            </div>
            <div className="amenity-item">
              <div className="amenity-icon"><Car size={24} /></div>
              <span className="amenity-label">Ample Parking</span>
            </div>
            <div className="amenity-item">
              <div className="amenity-icon"><Coffee size={24} /></div>
              <span className="amenity-label">Food & Refreshments</span>
            </div>
            <div className="amenity-item">
              <div className="amenity-icon"><ShieldCheck size={24} /></div>
              <span className="amenity-label">Clean Restrooms</span>
            </div>
            <div className="amenity-item">
              <div className="amenity-icon"><Wifi size={24} /></div>
              <span className="amenity-label">Free Wi-Fi</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 7: EXPANDING THE NETWORK
          ======================================================== */}
      <section className="section section--lg">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>

            <div>
              <span className="t-eyebrow">The Future</span>
              <h2 style={{ marginBottom: '1.5rem' }}>Expanding the RANGER Network</h2>
              <div className="green-rule"></div>
              <p className="t-lead" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                Outlet #01 is just the beginning. We are actively identifying new strategic
                highway locations to build a comprehensive charging network.
              </p>
              <p style={{ marginBottom: '2rem' }}>
                If you own commercial property or land along a major highway, partner with RANGER
                to host next-generation EV infrastructure.
              </p>
              <Link to="/partner" className="btn-text">
                Partner With RANGER
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <div style={{ padding: '2rem' }}>
              <RouteGraphic style={{ width: '100%' }} />
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 8: CLOSING CTA
          ======================================================== */}
      <section className="section on-dark text-center" style={{ background: 'var(--clr-primary-dark)', position: 'relative' }}>
        <EnergyWave
          baseColor="var(--bg-dark-surface)"
          accentColor="var(--clr-primary-dark)"
          flipY={true}
          opacity={0.4}
          style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', transform: 'translateY(99%)' }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h2 style={{ marginBottom: '1rem', color: 'var(--clr-white)' }}>Ready for your next journey?</h2>
          <p className="t-lead" style={{ marginBottom: '2.5rem', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            Find a RANGER charging outlet along your route and experience reliable, fast highway charging.
          </p>
          <Link to="/outlets" className="btn btn--white">
            <MapPin size={18} />
            Find a Charger
          </Link>
        </div>
      </section>

    </main>
  );
}
