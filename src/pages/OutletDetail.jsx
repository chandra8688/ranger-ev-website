import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navigation, Phone, Clock, Zap, Cable, Car, IndianRupee, MapPin, Landmark, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import Picture from '../components/Picture';
import Gallery from '../components/Gallery';
import MapEmbed from '../components/MapEmbed';
import FAQ from '../components/FAQ';
import Breadcrumb from '../components/Breadcrumb';
import Reveal from '../components/Reveal';
import NotFound from './NotFound';
import { getOutletById, directionsUrl } from '../data/outlets';
import { companyInfo, whatsappLink } from '../data/company';
import { outletRouteMeta, faqJsonLd } from '../data/seo';
import { outletFaqs } from '../data/faqs';
import { amenityIcon } from '../components/amenityIcons';
import { trackEvent } from '../lib/analytics';
import { BASE_URL } from '../config';

const WhatsAppGlyph = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04.5C5.73.5.6 5.62.6 11.93c0 2.02.53 3.98 1.53 5.71L.5 23.5l6-1.57a11.45 11.45 0 0 0 5.53 1.41c6.31 0 11.44-5.12 11.44-11.43C23.47 5.62 18.35.5 12.04.5Zm5.43 13.88c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49 2.48 1.08 3 .86 3.56.81.57-.08 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
  </svg>
);

export default function OutletDetail() {
  const { id } = useParams();
  const outlet = getOutletById(id);

  useEffect(() => {
    if (!outlet) return undefined;
    document.body.classList.add('has-sticky-bar');
    return () => document.body.classList.remove('has-sticky-bar');
  }, [outlet]);

  if (!outlet) return <NotFound />;

  const meta = outletRouteMeta(outlet);
  const faqs = outletFaqs(outlet);
  const { primaryPhone, displayPhone } = companyInfo.contact;
  const waLink = whatsappLink(`Hi RANGER EV, I have a question about ${outlet.title}.`);
  const track = (name, location) => () => trackEvent(name, { outlet_id: outlet.id, location });

  const specRows = [
    [Clock, 'Hours', outlet.specs.operatingHours],
    [Zap, 'Power', `${outlet.specs.chargersCount} × ${outlet.specs.powerPerCharger} DC`],
    [Cable, 'Connector', `${outlet.specs.connectorType} · ${outlet.specs.gunsPerCharger} guns per charger`],
    [Car, 'Capacity', `${outlet.specs.maxSimultaneousEVs} cars at once`],
    [IndianRupee, 'Tariff', outlet.specs.tariff],
  ];

  return (
    <div className="page">
      <SEO
        title={meta.title}
        description={meta.description}
        canonicalUrl={`${BASE_URL}/outlets/${outlet.id}`}
        ogImage={meta.ogImage}
        jsonLd={[...meta.jsonLd, faqJsonLd(faqs)]}
      />

      <header className="page-hero page-hero--image">
        <div className="page-hero__media">
          <Picture photo={outlet.images.hero} sizes="(min-width: 1024px) 58vw, 100vw" eager alt="" imgClassName="page-hero__img" />
        </div>
        <div className="container">
          <Breadcrumb items={[['Home', '/'], ['Outlets', '/outlets'], [outlet.title]]} />
          <div style={{ marginTop: '1.5rem' }}>
            <span className="badge badge--live"><span className="dot" aria-hidden="true" />Operational · {outlet.specs.operatingHours}</span>
            <h1 style={{ marginTop: '1rem' }}>{outlet.title}</h1>
            <p className="lead" style={{ marginTop: '0.75rem' }}>{outlet.highway} · {outlet.locationArea}</p>
            <div className="cluster" style={{ marginTop: '1.75rem' }}>
              <a href={directionsUrl(outlet)} target="_blank" rel="noopener noreferrer" className="btn btn--primary" onClick={track('click_directions', 'outlet_hero')}>
                <Navigation size={18} aria-hidden="true" /> Directions
                <span className="visually-hidden"> (opens Google Maps in a new tab)</span>
              </a>
              <a href={`tel:${primaryPhone}`} className="btn btn--secondary" onClick={track('click_call', 'outlet_hero')}>
                <Phone size={18} aria-hidden="true" /> Call {displayPhone}
              </a>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp" onClick={track('click_whatsapp', 'outlet_hero')}>
                <WhatsAppGlyph /> WhatsApp
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="section section--tight">
        <div className="container">
          <div className="split-7-5">
            <div className="stack" style={{ '--stack': '1.5rem' }}>
              <Reveal className="card">
                <h2 className="h3">Charging details</h2>
                <div className="specs" style={{ marginTop: '1.25rem' }}>
                  {specRows.map(([Icon, label, value]) => (
                    <div className="specs__row" key={label}>
                      <span className="specs__label"><Icon size={16} aria-hidden="true" />{label}</span>
                      <span className={`specs__value${label === 'Tariff' ? ' specs__value--green' : ''}`}>{value}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal className="card">
                <h2 className="h3">Amenities</h2>
                <ul className="amenity-list" style={{ marginTop: '1.25rem' }}>
                  {outlet.amenities.map((a) => {
                    const Icon = amenityIcon(a.id);
                    return <li key={a.id} className="amenity"><Icon size={18} aria-hidden="true" />{a.name}</li>;
                  })}
                </ul>
              </Reveal>

              <Reveal className="card">
                <h2 className="h3">The RANGER experience</h2>
                <p className="small" style={{ marginTop: '0.5rem', marginBottom: '1.25rem' }}>What to expect at a RANGER hub. Select an image to enlarge it. Imagery is illustrative.</p>
                <Gallery photos={outlet.gallery} label="The RANGER experience" />
              </Reveal>
            </div>

            <aside className="stack" style={{ '--stack': '1.5rem', position: 'sticky', top: 'calc(var(--nav-h) + 1.5rem)' }} aria-label="Pricing and location">
              <div className="price-card">
                <p className="eyebrow eyebrow--plain" style={{ marginBottom: '0.75rem' }}>Charging tariff</p>
                <p className="price-card__value">₹{outlet.specs.tariffPerKwh}<span>/ kWh</span></p>
                <p className="price-card__note">
                  A typical 20→80% top-up of a mid-size EV costs roughly ₹600–₹800.{' '}
                  <Link to="/chargers#estimate" className="link-arrow">Estimate for your car <ArrowRight size={14} aria-hidden="true" /></Link>
                </p>
              </div>

              <div className="card">
                <h2 className="h4">Location</h2>
                <div style={{ marginTop: '1rem' }}><MapEmbed outlet={outlet} /></div>
                <div className="specs" style={{ marginTop: '1rem' }}>
                  <div className="specs__row"><span className="specs__label"><MapPin size={16} aria-hidden="true" />Address</span><span className="specs__value small">{outlet.fullAddress}</span></div>
                  <div className="specs__row"><span className="specs__label"><Landmark size={16} aria-hidden="true" />Landmark</span><span className="specs__value small">{outlet.landmark}</span></div>
                </div>
                <a href={directionsUrl(outlet)} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--block" style={{ marginTop: '1rem' }} onClick={track('click_directions', 'outlet_sidebar')}>
                  <Navigation size={18} aria-hidden="true" /> Navigate with Google Maps
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section section--tight section--border">
        <div className="container container--narrow">
          <div className="section-head">
            <p className="eyebrow">Good to know</p>
            <h2>Frequently asked questions</h2>
          </div>
          <FAQ items={faqs} />
        </div>
      </section>

      <div className="sticky-actions" role="region" aria-label="Quick actions">
        <div className="sticky-actions__grid">
          <a href={directionsUrl(outlet)} target="_blank" rel="noopener noreferrer" className="btn btn--primary" onClick={track('click_directions', 'outlet_sticky')}>
            <Navigation size={16} aria-hidden="true" /> Navigate
            <span className="visually-hidden"> (opens Google Maps in a new tab)</span>
          </a>
          <a href={`tel:${primaryPhone}`} className="btn btn--secondary" onClick={track('click_call', 'outlet_sticky')}>
            <Phone size={16} aria-hidden="true" /> Call
          </a>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp" onClick={track('click_whatsapp', 'outlet_sticky')}>
            <WhatsAppGlyph /> Chat
            <span className="visually-hidden"> on WhatsApp (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
