import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Map, Zap, ArrowRight } from 'lucide-react';
import RouteSEO from '../components/RouteSEO';
import PageHero from '../components/PageHero';
import TransitionTicker from '../components/TransitionTicker';
import Picture from '../components/Picture';
import Reveal from '../components/Reveal';
import { outletsData } from '../data/outlets';
import { SCENES } from '../data/scenes';

const outlet = outletsData[0];

const VALUES = [
  { icon: Zap, title: 'Dependable hardware', body: 'Industrial-grade 60 kW DC chargers with two CCS2 guns, backed by a 24×7 support line.' },
  { icon: Map, title: 'Highway focused', body: 'We build on intercity routes, not crowded city centres — our job is to make long EV trips easy.' },
  { icon: Target, title: 'Driver experience', body: 'Charging takes time, so every outlet pairs chargers with food, restrooms, Wi-Fi and parking.' },
];

export default function About() {
  return (
    <div className="page">
      <RouteSEO path="/about" />
      <PageHero
        eyebrow="About RANGER"
        title="Building India’s highway charging network."
        lead="RANGER EV exists to solve the hardest part of electric mobility: fast, reliable charging for long-distance travel."
      />

      <TransitionTicker />

      <section className="section">
        <div className="container">
          <div className="grid-2 grid-center">
            <Reveal>
              <p className="eyebrow">Our beginning</p>
              <h2>It started with Outlet #01.</h2>
              <p className="lead" style={{ marginTop: '1.25rem' }}>
                On <strong>{outlet.openedDisplay}</strong> we opened our first hub at {outlet.shortName} on the Srisailam Highway (NH 765).
              </p>
              <p style={{ marginTop: '1rem' }}>
                It is the blueprint for everything that follows: 60 kW DC fast charging, CCS2 compatibility, 24×7 access, and a
                café, restrooms and Wi-Fi so drivers can actually rest.
              </p>
              <p style={{ marginTop: '1rem' }}>
                We are expanding one carefully chosen highway site at a time, with the same hardware and the same standard at every stop.
              </p>
            </Reveal>
            <Reveal className="photo ratio-4x5" delay="1">
              <Picture photo={SCENES['highway-journey']} sizes="(max-width: 860px) 100vw, 50vw" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--surface section--border">
        <div className="container">
          <div className="section-head text-center">
            <p className="eyebrow">What drives us</p>
            <h2>The RANGER difference</h2>
          </div>
          <div className="grid-3">
            {VALUES.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} className="card card--interactive" delay={String(i)}>
                <span className="icon-tile"><Icon size={22} aria-hidden="true" /></span>
                <h3 className="h4">{title}</h3>
                <p>{body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2 grid-center">
            <Reveal className="card card--2">
              <h3 className="h4">Outlet #01 at a glance</h3>
              <div className="specs" style={{ marginTop: '1rem' }}>
                <div className="specs__row"><span className="specs__label">Opened</span><span className="specs__value">{outlet.openedDisplay}</span></div>
                <div className="specs__row"><span className="specs__label">Location</span><span className="specs__value">NH 765, {outlet.shortName}</span></div>
                <div className="specs__row"><span className="specs__label">Chargers</span><span className="specs__value">2 × 60 kW DC (CCS2)</span></div>
                <div className="specs__row"><span className="specs__label">Tariff</span><span className="specs__value">{outlet.specs.tariff}</span></div>
                <div className="specs__row"><span className="specs__label">Availability</span><span className="specs__value specs__value--green">24×7</span></div>
              </div>
            </Reveal>
            <Reveal delay="1">
              <p className="eyebrow">Where we’re going</p>
              <h2>The next stops on the map.</h2>
              <p className="lead" style={{ marginTop: '1.25rem' }}>
                The shift to electric needs infrastructure drivers can trust. We are bringing the RANGER standard to new highway corridors —
                and we are looking for landowners and businesses to build it with us.
              </p>
              <div className="cluster btn-row" style={{ marginTop: '2rem' }}>
                <Link to="/partner" className="btn btn--primary">Partner with RANGER <ArrowRight size={16} aria-hidden="true" /></Link>
                <Link to="/outlets" className="btn btn--secondary">See the network</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
