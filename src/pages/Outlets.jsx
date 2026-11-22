import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Zap, IndianRupee, Clock, ArrowRight, Navigation, Handshake } from 'lucide-react';
import RouteSEO from '../components/RouteSEO';
import PageHero from '../components/PageHero';
import Picture from '../components/Picture';
import Reveal from '../components/Reveal';
import { outletsData, directionsUrl } from '../data/outlets';
import { trackEvent } from '../lib/analytics';

const NetworkMap = lazy(() => import('../components/NetworkMap'));

export default function Outlets() {
  return (
    <div className="page">
      <RouteSEO path="/outlets" />
      <PageHero
        eyebrow="Charging network"
        title="RANGER outlets"
        lead="24×7 DC fast charging on India’s highways. Pick an outlet for directions, pricing, photos and amenities."
      />

      <section className="section section--tight">
        <div className="container">
          <h2 className="h4" style={{ marginBottom: '1.25rem' }}>
            {outletsData.length} operational {outletsData.length === 1 ? 'outlet' : 'outlets'}
          </h2>

          <div className="stack" style={{ '--stack': '1.25rem' }}>
            {outletsData.map((o) => {
              const cardPhoto = o.photos.find((p) => p.src === o.images.card);
              return (
                <Reveal as="article" key={o.id} className="card card--interactive outlet-card" aria-labelledby={`${o.id}-title`}>
                  <div className="outlet-card__media">
                    <Picture photo={cardPhoto} sizes="(max-width: 760px) 100vw, 40vw" eager />
                  </div>
                  <div className="outlet-card__body">
                    <span className="badge badge--live" style={{ alignSelf: 'flex-start' }}><span className="dot" aria-hidden="true" />Operational</span>
                    <h3 id={`${o.id}-title`} className="h2">{o.title}</h3>
                    <p>{o.highway} · {o.locationArea}</p>
                    <div className="outlet-card__meta">
                      <span><Zap size={16} aria-hidden="true" />{o.specs.chargersCount} × {o.specs.powerPerCharger} {o.specs.connectorType}</span>
                      <span><IndianRupee size={16} aria-hidden="true" />{o.specs.tariff}</span>
                      <span><Clock size={16} aria-hidden="true" />{o.specs.operatingHours}</span>
                    </div>
                    <div className="cluster" style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
                      <Link to={`/outlets/${o.id}`} className="btn btn--primary">
                        Station details <ArrowRight size={16} aria-hidden="true" />
                        <span className="visually-hidden"> for {o.title}</span>
                      </Link>
                      <a
                        href={directionsUrl(o)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--secondary"
                        onClick={() => trackEvent('click_directions', { outlet_id: o.id, location: 'outlets_list' })}
                      >
                        <Navigation size={16} aria-hidden="true" /> Directions
                        <span className="visually-hidden"> to {o.title} (opens Google Maps in a new tab)</span>
                      </a>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--tight section--border" aria-labelledby="map-title">
        <div className="container">
          <div className="section-head" style={{ marginBottom: '1.75rem' }}>
            <h2 id="map-title" className="h3">Network map</h2>
            <p style={{ marginTop: '0.5rem' }}>Zoom and select a pin for details and directions.</p>
          </div>
          <Suspense fallback={<div className="network-map" aria-hidden="true" />}>
            <NetworkMap />
          </Suspense>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="placeholder-card">
            <span className="icon-tile icon-tile--amber"><MapPin size={22} aria-hidden="true" /></span>
            <h2 className="h4">More outlets are on the way</h2>
            <p style={{ marginTop: '0.5rem', maxWidth: '52ch', marginInline: 'auto' }}>
              We are evaluating sites along key highway corridors. Own a suitable property on a highway?
            </p>
            <Link to="/partner" className="btn btn--secondary" style={{ marginTop: '1.5rem' }}>
              <Handshake size={16} aria-hidden="true" /> Host a RANGER charger
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
