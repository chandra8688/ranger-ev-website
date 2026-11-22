import React from 'react';
import { Building2, MapPin, Zap, Phone, Mail, ArrowRight } from 'lucide-react';
import RouteSEO from '../components/RouteSEO';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { FormError, FormSuccess, Honeypot, ConsentNote } from '../components/FormFeedback';
import { companyInfo } from '../data/company';
import { submitPartnerForm } from '../services/formService';
import useFormSubmit from '../lib/useFormSubmit';

const BENEFITS = [
  { icon: MapPin, title: 'Bring highway travellers to you', body: 'EV drivers plan their trips around reliable fast chargers — and spend time on site while they charge.' },
  { icon: Building2, title: 'Made for highway businesses', body: 'A natural fit for dhabas, restaurants, hotels, resorts, fuel stations and vacant commercial land.' },
  { icon: Zap, title: 'We handle the hardware', body: 'RANGER supplies the 60 kW DC chargers, assesses your site and agrees the right deployment model with you.' },
];

const STEPS = [
  ['Submit your site', 'Tell us where it is and what’s there today.'],
  ['Site assessment', 'Our team reviews location, access and power availability.'],
  ['Agreement & build', 'We agree terms and install RANGER chargers.'],
];

export default function Partner() {
  const { status, error, onSubmit, onFieldInput, reset, alertRef, successRef } = useFormSubmit(submitPartnerForm, { eventName: 'submit_partner_form' });
  const { displayPhone, primaryPhone, email } = companyInfo.contact;

  return (
    <div className="page">
      <RouteSEO path="/partner" />
      <PageHero
        eyebrow="Partner with us"
        title="Host a RANGER fast charger."
        lead="Turn your highway property into a next-generation rest stop. We partner with landowners and businesses to build reliable EV charging."
      />

      <section className="section section--tight">
        <div className="container">
          <div className="grid-2">
            <div>
              <h2 className="h3">Why partner with RANGER?</h2>
              <div className="stack" style={{ '--stack': '1.25rem', marginTop: '1.75rem' }}>
                {BENEFITS.map(({ icon: Icon, title, body }, i) => (
                  <Reveal key={title} className="card card--2" delay={String(i)} style={{ display: 'flex', gap: '1rem' }}>
                    <span className="icon-tile" style={{ marginBottom: 0 }}><Icon size={22} aria-hidden="true" /></span>
                    <div>
                      <h3 className="h4">{title}</h3>
                      <p className="small" style={{ marginTop: '0.4rem' }}>{body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <h2 className="h3" style={{ marginTop: '3rem' }}>How it works</h2>
              <ol className="steps" style={{ gridTemplateColumns: '1fr', marginTop: '1.5rem', gap: '1.5rem' }}>
                {STEPS.map(([t, d]) => (
                  <li key={t} className="step" style={{ paddingTop: 0, paddingLeft: '4rem' }}>
                    <h3 className="h4">{t}</h3>
                    <p className="small">{d}</p>
                  </li>
                ))}
              </ol>

              <div className="card" style={{ marginTop: '2.5rem' }}>
                <h3 className="h4">Prefer to talk first?</h3>
                <div className="cluster" style={{ marginTop: '1rem' }}>
                  <a href={`tel:${primaryPhone}`} className="btn btn--secondary btn--sm"><Phone size={16} aria-hidden="true" />{displayPhone}</a>
                  <a href={`mailto:${email}?subject=Site%20partnership`} className="btn btn--secondary btn--sm"><Mail size={16} aria-hidden="true" />Email us</a>
                </div>
              </div>
            </div>

            <div className="card">
              {status === 'success' ? (
                <FormSuccess title="Site submitted" onReset={reset} resetLabel="Submit another location" successRef={successRef}>
                  Thank you. Our partnerships team will review your property and contact you.
                </FormSuccess>
              ) : (
                <>
                  <h2 className="h3">Submit a location</h2>
                  <p className="small" style={{ marginTop: '0.5rem', marginBottom: '1.75rem' }}>
                    A few details help us assess your site. Fields marked <span className="text-amber">*</span> are required.
                  </p>

                  <form className="form" onSubmit={onSubmit} onInput={onFieldInput} noValidate>
                    {status === 'error' && <FormError message={error} alertRef={alertRef} />}
                    <Honeypot />
                    <input type="hidden" name="_subject" value="New site partnership enquiry — RANGER EV" />

                    <div className="form-row">
                      <div className="field">
                        <label htmlFor="firstName">First name<span className="req" aria-hidden="true">*</span></label>
                        <input type="text" id="firstName" name="firstName" className="input" autoComplete="given-name" required />
                      </div>
                      <div className="field">
                        <label htmlFor="lastName">Last name<span className="req" aria-hidden="true">*</span></label>
                        <input type="text" id="lastName" name="lastName" className="input" autoComplete="family-name" required />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="field">
                        <label htmlFor="phone">Phone<span className="req" aria-hidden="true">*</span></label>
                        <input type="tel" id="phone" name="phone" className="input" autoComplete="tel" inputMode="tel" pattern="[0-9+\-\s()]{8,}" required aria-describedby="phone-hint" />
                        <span id="phone-hint" className="hint">e.g. +91 98765 43210</span>
                      </div>
                      <div className="field">
                        <label htmlFor="email">Email<span className="req" aria-hidden="true">*</span></label>
                        <input type="email" id="email" name="email" className="input" autoComplete="email" required />
                      </div>
                    </div>

                    <div className="field">
                      <label htmlFor="propertyType">Property type<span className="req" aria-hidden="true">*</span></label>
                      <select id="propertyType" name="propertyType" className="select" required defaultValue="">
                        <option value="" disabled>Select a property type…</option>
                        <option value="highway_restaurant">Highway restaurant / dhaba</option>
                        <option value="hotel_resort">Hotel / resort</option>
                        <option value="fuel_station">Existing fuel station</option>
                        <option value="commercial_land">Vacant commercial land</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="field">
                      <label htmlFor="location">Highway &amp; location<span className="req" aria-hidden="true">*</span></label>
                      <input type="text" id="location" name="location" className="input" placeholder="e.g. NH 44, near Hyderabad" required />
                    </div>

                    <div className="field">
                      <label htmlFor="message">Anything else?</label>
                      <textarea id="message" name="message" className="textarea" placeholder="Space available, current power connection, Google Maps link…" />
                    </div>

                    <ConsentNote />

                    <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={status === 'submitting'}>
                      {status === 'submitting' ? 'Submitting…' : <>Submit location <ArrowRight size={18} aria-hidden="true" /></>}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
