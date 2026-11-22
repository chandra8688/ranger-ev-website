import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Cable, Car, Clock, Factory, CheckCircle2 } from 'lucide-react';
import RouteSEO from '../components/RouteSEO';
import TransitionTicker from '../components/TransitionTicker';
import ChargeCalculator from '../components/ChargeCalculator';
import Reveal from '../components/Reveal';
import { chargerDetails } from '../data/chargers';
import { outletsData } from '../data/outlets';

const FEATURE_ICONS = [Zap, Cable, CheckCircle2, Car];

export default function Chargers() {
  const tariff = outletsData[0].specs.tariffPerKwh;

  return (
    <div className="page">
      <RouteSEO path="/chargers" />

      <header className="page-hero">
        <div className="container">
          <div className="grid-2 grid-center">
            <div>
              <p className="eyebrow">The hardware</p>
              <h1>RANGER 60 kW DC fast charger</h1>
              <p className="lead">
                Engineered for highway duty: two CCS2 guns, two cars at once, and 24×7 availability at every RANGER outlet.
              </p>
              <div className="cluster btn-row" style={{ marginTop: '2rem' }}>
                <a href="#estimate" className="btn btn--primary">Estimate time &amp; cost</a>
                <a href="#specs" className="btn btn--secondary">Full specifications</a>
              </div>
            </div>
            <img
              src="/images/chargers/charger_asthetic_transparent.webp"
              width="961"
              height="952"
              alt="RANGER 60 kW DC fast charger with two CCS2 charging guns"
              fetchPriority="high"
              style={{ maxHeight: 560, width: 'auto', marginInline: 'auto' }}
            />
          </div>
        </div>
      </header>

      <TransitionTicker />

      <section className="section">
        <div className="container">
          <div className="grid-4">
            {chargerDetails.confirmedFeatures.map((f, i) => {
              const Icon = FEATURE_ICONS[i] ?? Zap;
              return (
                <Reveal key={f.title} className="card" delay={String(i)}>
                  <span className="icon-tile"><Icon size={22} aria-hidden="true" /></span>
                  <h2 className="h4">{f.title}</h2>
                  <p className="small">{f.description}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="specs" className="section section--surface section--border">
        <div className="container">
          <div className="grid-2">
            <div>
              <p className="eyebrow">Specifications</p>
              <h2>Technical details</h2>
              <p className="lead" style={{ marginTop: '1.25rem' }}>
                {chargerDetails.brandingNote}. Every RANGER outlet runs the same hardware, so you know what to expect at each stop.
              </p>
              <div className="card card--2" style={{ marginTop: '2rem' }}>
                <h3 className="h4"><Car size={20} aria-hidden="true" className="inline-icon" />Works with your car</h3>
                <p className="small" style={{ marginTop: '0.75rem' }}>
                  Any EV with a CCS2 DC charging port, including:
                </p>
                <ul className="cluster" style={{ marginTop: '1rem' }} aria-label="Example compatible cars">
                  {chargerDetails.compatibleExamples.map((c) => (
                    <li key={c} className="badge">{c}</li>
                  ))}
                </ul>
                <p className="xsmall muted" style={{ marginTop: '1rem' }}>Illustrative list. Check your owner’s manual for your car’s DC charging port.</p>
              </div>
            </div>
            <div className="card">
              <table className="spec-table">
                <caption className="visually-hidden">RANGER 60 kW DC fast charger specifications</caption>
                <tbody>
                  {chargerDetails.specTable.map(([k, v]) => (
                    <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section id="estimate" className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Plan your stop</p>
            <h2>How long, and how much?</h2>
            <p className="lead">Pick your car and battery levels to estimate charging time and cost at ₹{tariff}/kWh.</p>
          </div>
          <ChargeCalculator tariffPerKwh={tariff} />
        </div>
      </section>

      <section className="section section--surface section--border">
        <div className="container text-center container--narrow">
          <span className="icon-tile mx-auto"><Factory size={22} aria-hidden="true" /></span>
          <h2>Experience it on the road</h2>
          <p className="lead mx-auto" style={{ marginTop: '1rem' }}>
            Two RANGER 60 kW chargers are live at Outlet #01 on NH 765, open 24×7.
          </p>
          <div className="cluster btn-row" style={{ justifyContent: 'center', marginTop: '2rem' }}>
            <Link to="/outlets/outlet-01" className="btn btn--primary">
              Visit Outlet #01 <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/outlets" className="btn btn--secondary">
              <Clock size={16} aria-hidden="true" /> All outlets
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
