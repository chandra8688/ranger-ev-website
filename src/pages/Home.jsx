import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Navigation, Zap, Clock, Route as RouteIcon, PlugZap, Coffee } from 'lucide-react';
import RouteSEO from '../components/RouteSEO';
import TransitionTicker from '../components/TransitionTicker';
import Reveal from '../components/Reveal';
import Picture from '../components/Picture';
import { outletsData, directionsUrl } from '../data/outlets';
import { trackEvent } from '../lib/analytics';
import { amenityIcon } from '../components/amenityIcons';

const outlet = outletsData[0];
const photo = (name) => outlet.photos.find((p) => p.src.endsWith(name));


export default function Home() {
  return (
    <>
      <RouteSEO path="/" />

      {/* HERO */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__media">
          <img
            src="/images/cinematic/hero_cinematic_highway_v2_1786922470899.webp"
            width="1376"
            height="768"
            alt=""
            fetchPriority="high"
            decoding="sync"
          />
        </div>
        <div className="container container--wide">
          <div className="hero__content">
            <p className="eyebrow">Highway EV fast charging · Telangana</p>
            <h1 id="hero-title" className="display">Powering every journey.</h1>
            <p className="lead">
              24×7 DC fast-charging hubs on India&apos;s highways — with a café, Wi-Fi and a place to rest while your car charges.
            </p>
            <div className="cluster btn-row hero__actions">
              <Link to={`/outlets/${outlet.id}`} className="btn btn--primary btn--lg">
                <MapPin size={18} aria-hidden="true" />
                Visit Outlet #01
              </Link>
              <a
                href={directionsUrl(outlet)}
                className="btn btn--secondary btn--lg"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('click_directions', { outlet_id: outlet.id, location: 'home_hero' })}
              >
                <Navigation size={18} aria-hidden="true" />
                Get directions
                <span className="visually-hidden"> (opens Google Maps in a new tab)</span>
              </a>
            </div>
          </div>

          <dl className="stats" aria-label="Outlet #01 at a glance">
            <div className="stat"><dt className="stat__label">DC output per charger</dt><dd className="stat__value">60<small>kW</small></dd></div>
            <div className="stat"><dt className="stat__label">Charging points</dt><dd className="stat__value">{outlet.specs.totalChargingPoints}<small>CCS2</small></dd></div>
            <div className="stat"><dt className="stat__label">Per kWh</dt><dd className="stat__value">₹{outlet.specs.tariffPerKwh}</dd></div>
            <div className="stat"><dt className="stat__label">Always open</dt><dd className="stat__value">24×7</dd></div>
          </dl>
        </div>
      </section>

      <TransitionTicker />

      {/* VISION */}
      <section className="section">
        <div className="container">
          <div className="grid-2 grid-center">
            <Reveal className="photo ratio-4x5">
              <img
                src="/images/cinematic/vision_charging_hub_1786922492514.webp"
                width="896"
                height="1200"
                alt="Concept render of a RANGER highway charging hub at night"
                loading="lazy"
                decoding="async"
              />
            </Reveal>
            <Reveal delay="1">
              <p className="eyebrow">Why RANGER</p>
              <h2>Built for the long drive, not the city block.</h2>
              <p className="lead" style={{ marginTop: '1.25rem' }}>
                Range anxiety lives on the highway. We put dependable DC fast chargers exactly where intercity drivers need them —
                with food, restrooms and Wi-Fi on site, so a charging stop feels like a proper break.
              </p>
              <div className="stack" style={{ '--stack': '1.5rem', marginTop: '2.25rem' }}>
                <div className="feature">
                  <h3 className="h4"><Zap size={20} aria-hidden="true" className="inline-icon" />Fast DC charging</h3>
                  <p>Dual-gun 60 kW CCS2 chargers — two cars per unit, four at the outlet.</p>
                </div>
                <div className="feature">
                  <h3 className="h4"><Clock size={20} aria-hidden="true" className="inline-icon" />Open 24×7</h3>
                  <p>The highway never sleeps, and neither do we. Support is a call or WhatsApp away.</p>
                </div>
                <div className="feature">
                  <h3 className="h4"><RouteIcon size={20} aria-hidden="true" className="inline-icon" />On your route</h3>
                  <p>Located on national highways with easy on-and-off access for long-distance travellers.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* OUTLET #01 SPOTLIGHT */}
      <section className="section section--surface section--border" aria-labelledby="outlet-title">
        <div className="container">
          <div className="split-7-5">
            <Reveal className="mosaic">
              <div className="photo"><Picture photo={photo('totem-night')} sizes="(max-width: 760px) 100vw, 30vw" /></div>
              <div className="photo"><Picture photo={photo('cafe-front')} sizes="(max-width: 760px) 50vw, 15vw" /></div>
              <div className="photo"><Picture photo={photo('site-parking')} sizes="(max-width: 760px) 50vw, 15vw" /></div>
              <div className="photo"><Picture photo={photo('cafe-seating')} sizes="(max-width: 760px) 50vw, 15vw" /></div>
              <div className="photo"><Picture photo={photo('charger-unit')} sizes="(max-width: 760px) 50vw, 15vw" /></div>
              <div className="photo"><Picture photo={photo('site-overview')} sizes="(max-width: 760px) 50vw, 15vw" /></div>
            </Reveal>

            <Reveal delay="1">
              <span className="badge badge--live"><span className="dot" aria-hidden="true" />Open now · 24×7</span>
              <h2 id="outlet-title" style={{ marginTop: '1.25rem' }}>RANGER Outlet #01</h2>
              <p className="lead" style={{ marginTop: '1rem' }}>
                Our first hub is live on the Srisailam Highway (NH 765) near {outlet.landmark} — a real stop with a café and
                breakfast, not just a plug.
              </p>

              <div className="specs" style={{ marginTop: '1.75rem' }}>
                <div className="specs__row"><span className="specs__label">Location</span><span className="specs__value">{outlet.shortName}, NH 765</span></div>
                <div className="specs__row"><span className="specs__label">Chargers</span><span className="specs__value">2 × 60 kW DC · 4 points</span></div>
                <div className="specs__row"><span className="specs__label">Tariff</span><span className="specs__value specs__value--green">{outlet.specs.tariff}</span></div>
                <div className="specs__row"><span className="specs__label">Opened</span><span className="specs__value">{outlet.openedDisplay}</span></div>
              </div>

              <ul className="amenity-list" style={{ marginTop: '1.75rem' }} aria-label="Amenities">
                {outlet.amenities.map((a) => {
                  const Icon = amenityIcon(a.id);
                  return <li key={a.id} className="amenity"><Icon size={18} aria-hidden="true" />{a.name}</li>;
                })}
              </ul>

              <div className="cluster btn-row" style={{ marginTop: '2rem' }}>
                <Link to={`/outlets/${outlet.id}`} className="btn btn--primary">
                  Station details
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <a
                  href={directionsUrl(outlet)}
                  className="btn btn--secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('click_directions', { outlet_id: outlet.id, location: 'home_spotlight' })}
                >
                  <Navigation size={16} aria-hidden="true" />
                  Directions
                  <span className="visually-hidden"> (opens Google Maps in a new tab)</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">How it works</p>
            <h2>Charging at RANGER in three steps.</h2>
          </Reveal>
          <div className="steps">
            <Reveal className="step">
              <h3><MapPin size={20} aria-hidden="true" className="inline-icon" />Navigate</h3>
              <p>Open directions to the outlet. Look for the illuminated RANGER totem at the entrance.</p>
            </Reveal>
            <Reveal className="step" delay="1">
              <h3><PlugZap size={20} aria-hidden="true" className="inline-icon" />Plug in</h3>
              <p>Park at a free bay and connect the CCS2 gun to your car. Our on-site team and 24×7 line can help.</p>
            </Reveal>
            <Reveal className="step" delay="2">
              <h3><Coffee size={20} aria-hidden="true" className="inline-icon" />Take a break</h3>
              <p>Grab breakfast or a coffee, use the Wi-Fi and restrooms, and drive on charged up.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className="section section--surface section--border">
        <div className="container">
          <div className="grid-2 grid-center">
            <Reveal>
              <img
                src="/images/chargers/charger_home_transparent.webp"
                width="961"
                height="947"
                alt="RANGER 60 kW DC fast charger"
                loading="lazy"
                decoding="async"
                style={{ maxHeight: 560, width: 'auto', marginInline: 'auto' }}
              />
            </Reveal>
            <Reveal delay="1">
              <p className="eyebrow">Technology</p>
              <h2>The RANGER 60 kW DC fast charger.</h2>
              <p className="lead" style={{ marginTop: '1.25rem' }}>
                Custom RANGER-branded, Make in India hardware with two CCS2 guns per unit — compatible with most electric cars sold in India.
              </p>
              <dl className="stats" style={{ marginTop: '2rem', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', background: 'transparent' }}>
                <div className="stat"><dt className="stat__label">DC power</dt><dd className="stat__value">60<small>kW</small></dd></div>
                <div className="stat"><dt className="stat__label">Cars per charger</dt><dd className="stat__value">2</dd></div>
              </dl>
              <Link to="/chargers" className="link-arrow" style={{ marginTop: '2rem' }}>
                Specifications &amp; cost estimator <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PARTNER */}
      <section className="section">
        <div className="container">
          <Reveal className="card card--2" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', alignItems: 'center' }}>
            <div>
              <p className="eyebrow">Grow the network</p>
              <h2 className="h3">Own land or a business on a highway?</h2>
            </div>
            <div>
              <p>
                Outlet #01 is just the beginning. Partner with RANGER to host a fast-charging hub at your dhaba, hotel, fuel
                station or commercial plot — and bring EV travellers to your door.
              </p>
              <Link to="/partner" className="btn btn--secondary" style={{ marginTop: '1.5rem' }}>
                Partner with RANGER <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="cta-band" aria-labelledby="cta-title">
        <div className="cta-band__media">
          <img src="/images/cinematic/final_cta_highway_1786922809369.webp" width="1376" height="768" alt="" loading="lazy" decoding="async" />
        </div>
        <div className="container container--narrow">
          <h2 id="cta-title">Ready for your next journey?</h2>
          <p className="lead">Plan your stop at RANGER Outlet #01 on NH 765 — open 24×7.</p>
          <div className="cluster btn-row" style={{ justifyContent: 'center' }}>
            <Link to="/outlets" className="btn btn--primary btn--lg">
              <MapPin size={18} aria-hidden="true" />
              Find a charger
            </Link>
            <Link to="/chargers#estimate" className="btn btn--secondary btn--lg">
              Estimate charging cost
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
