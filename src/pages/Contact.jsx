import React from 'react';
import { Phone, Mail, MessageCircle, MapPin, ArrowRight } from 'lucide-react';
import RouteSEO from '../components/RouteSEO';
import PageHero from '../components/PageHero';
import { FormError, FormSuccess, Honeypot, ConsentNote } from '../components/FormFeedback';
import { companyInfo, whatsappLink } from '../data/company';
import { submitContactForm } from '../services/formService';
import useFormSubmit from '../lib/useFormSubmit';
import { trackEvent } from '../lib/analytics';

export default function Contact() {
  const { status, error, onSubmit, onFieldInput, reset, alertRef, successRef } = useFormSubmit(submitContactForm, { eventName: 'submit_contact_form' });
  const { displayPhone, primaryPhone, email, displayWhatsapp } = companyInfo.contact;

  const channels = [
    { href: `tel:${primaryPhone}`, icon: Phone, label: '24×7 charging support', value: displayPhone, sub: 'Call for help at an outlet', event: 'click_call' },
    { href: whatsappLink('Hi RANGER EV, I need help.'), icon: MessageCircle, label: 'WhatsApp', value: displayWhatsapp, sub: 'Questions, billing and updates', external: true, event: 'click_whatsapp' },
    { href: `mailto:${email}`, icon: Mail, label: 'Business & fleets', value: email, sub: 'Mon–Fri, 9 AM–6 PM' },
    { href: '/partner', icon: MapPin, label: 'Site acquisition', value: 'Host a RANGER charger', sub: 'Submit your highway property', internal: true },
  ];

  return (
    <div className="page">
      <RouteSEO path="/contact" />
      <PageHero
        eyebrow="Support & enquiries"
        title="Talk to RANGER EV"
        lead="Need help at a charger right now? Call or WhatsApp us — we’re available 24×7. For everything else, send a message below."
      />

      <section className="section section--tight">
        <div className="container">
          <div className="grid-2">
            <div>
              <h2 className="h3">Direct channels</h2>
              <ul className="channels" style={{ marginTop: '1.5rem' }}>
                {channels.map(({ href, icon: Icon, label, value, sub, external, event }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="channel"
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      onClick={event ? () => trackEvent(event, { location: 'contact_page' }) : undefined}
                    >
                      <span className="icon-tile"><Icon size={20} aria-hidden="true" /></span>
                      <span>
                        <span className="channel__label">{label}</span>
                        <span className="channel__value" style={{ display: 'block' }}>{value}</span>
                        <span className="channel__sub">{sub}</span>
                        {external && <span className="visually-hidden"> (opens in a new tab)</span>}
                      </span>
                      <ArrowRight size={18} className="channel__arrow" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              {status === 'success' ? (
                <FormSuccess title="Message sent" onReset={reset} resetLabel="Send another message" successRef={successRef}>
                  Thanks for contacting RANGER EV. We usually reply within one business day. For urgent charging help, call {displayPhone}.
                </FormSuccess>
              ) : (
                <>
                  <h2 className="h3">Send a message</h2>
                  <p className="small" style={{ marginTop: '0.5rem', marginBottom: '1.75rem' }}>Fields marked <span className="text-amber">*</span> are required.</p>

                  <form className="form" onSubmit={onSubmit} onInput={onFieldInput} noValidate>
                    {status === 'error' && <FormError message={error} alertRef={alertRef} />}
                    <Honeypot />
                    <input type="hidden" name="_subject" value="New website enquiry — RANGER EV" />

                    <div className="form-row">
                      <div className="field">
                        <label htmlFor="name">Name<span className="req" aria-hidden="true">*</span></label>
                        <input type="text" id="name" name="name" className="input" autoComplete="name" required />
                      </div>
                      <div className="field">
                        <label htmlFor="phone">Phone</label>
                        <input type="tel" id="phone" name="phone" className="input" autoComplete="tel" inputMode="tel" />
                      </div>
                    </div>

                    <div className="field">
                      <label htmlFor="email">Email<span className="req" aria-hidden="true">*</span></label>
                      <input type="email" id="email" name="email" className="input" autoComplete="email" required />
                    </div>

                    <div className="field">
                      <label htmlFor="topic">Topic<span className="req" aria-hidden="true">*</span></label>
                      <select id="topic" name="topic" className="select" required defaultValue="">
                        <option value="" disabled>Select a topic…</option>
                        <option>Charging support</option>
                        <option>Billing</option>
                        <option>Fleet or business partnership</option>
                        <option>Site acquisition</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="field">
                      <label htmlFor="message">Message<span className="req" aria-hidden="true">*</span></label>
                      <textarea id="message" name="message" className="textarea" required minLength={10} />
                    </div>

                    <ConsentNote />

                    <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={status === 'submitting'}>
                      {status === 'submitting' ? 'Sending…' : 'Send message'}
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
