import React, { useState } from 'react';
import { Building2, MapPin, Zap, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { companyInfo } from '../data/company';
import SEO from '../components/SEO';
import { BASE_URL } from '../config';
import { submitPartnerForm } from '../services/formService';

export default function Partner() {
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage('');

    try {
      const formData = new FormData(e.target);
      await submitPartnerForm(formData);
      setFormStatus('success');
    } catch (error) {
      setErrorMessage(error.message);
      setFormStatus('error');
    }
  };

  return (
    <main className="on-light" style={{ background: 'var(--surface-light)', minHeight: '100vh', paddingBottom: '4rem' }}>
      <SEO
        title="Partner With RANGER EV | Host a Charging Station"
        description="Join the RANGER EV network. Monetize your highway commercial property by hosting a 60 kW CCS2 DC fast charging station."
        canonicalUrl={`${BASE_URL}/partner`}
      />

      {/* Header */}
      <section className="section" style={{ paddingBottom: '3rem' }}>
        <div className="container text-center" style={{ maxWidth: '800px' }}>
          <span className="t-eyebrow t-eyebrow--orange">Partner With Us</span>
          <h1 style={{ marginBottom: '1.25rem' }}>Host a RANGER Fast Charger</h1>
          <p className="t-lead" style={{ margin: '0 auto' }}>
            Turn your highway property into a next-generation rest stop.
            We partner with landowners and commercial properties to build reliable EV charging infrastructure.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container">
        <div className="editorial-grid">

          {/* Left: Info */}
          <div className="editorial-grid__left" style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 className="h3" style={{ marginBottom: '1.5rem' }}>Why Partner With RANGER?</h2>
            <div className="green-rule" style={{ marginBottom: '3rem' }}></div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', flexGrow: 1 }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--ranger-green)', marginTop: '0.25rem' }}><MapPin size={24} aria-hidden="true" /></div>
                <div>
                  <h3 className="h4" style={{ marginBottom: '0.25rem' }}>Attract Highway Travelers</h3>
                  <p style={{ color: 'var(--text-secondary-light)' }}>EV drivers plan their routes around reliable fast chargers. Hosting a RANGER unit brings a steady stream of premium customers to your location.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--ranger-green)', marginTop: '0.25rem' }}><Building2 size={24} aria-hidden="true" /></div>
                <div>
                  <h3 className="h4" style={{ marginBottom: '0.25rem' }}>Ideal for Commercial Properties</h3>
                  <p style={{ color: 'var(--text-secondary-light)' }}>Perfect for highway dhabas, restaurants, resorts, and existing fuel stations looking to future-proof their business.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--ranger-green)', marginTop: '0.25rem' }}><Zap size={24} aria-hidden="true" /></div>
                <div>
                  <h3 className="h4" style={{ marginBottom: '0.25rem' }}>Turnkey Infrastructure</h3>
                  <p style={{ color: 'var(--text-secondary-light)' }}>We provide industry-leading 60 kW DC hardware. Our team assesses your location and discusses the optimal deployment strategy.</p>
                </div>
              </div>
            </div>

            {/* Editorial Anchor to fix empty lower-left space */}
            <div style={{ marginTop: 'auto', paddingTop: '4rem' }}>
              <div style={{ fontSize: '10rem', fontWeight: 800, lineHeight: 0.8, color: 'rgba(17,18,20,0.03)', letterSpacing: '-0.05em' }}>
                01
              </div>
            </div>

            <div style={{ background: '#ffffff', padding: '2rem', borderRadius: 'var(--radius-lg)', marginTop: '2rem', border: '1px solid rgba(17,18,20,0.08)' }}>
              <h3 className="h4" style={{ marginBottom: '1rem', color: '#111214' }}>Direct Contact</h3>
              <p style={{ color: '#4F565D', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                Prefer to speak directly with our partnerships team?
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a href={`tel:${companyInfo.contact.primaryPhone}`} className="btn-text" style={{ color: 'var(--ranger-green)' }}>
                  Call: {companyInfo.contact.displayPhone}
                </a>
                <a href={`mailto:${companyInfo.contact.email}`} className="btn-text" style={{ color: 'var(--ranger-green)' }}>
                  Email: {companyInfo.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="editorial-grid__right">
            <div style={{ background: '#ffffff', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid rgba(17,18,20,0.08)' }}>

              {formStatus === 'success' ? (
                <div className="text-center" style={{ padding: '3rem 1rem' }}>
                  <div style={{ color: 'var(--ranger-green)', display: 'inline-flex', marginBottom: '1.5rem' }}>
                    <CheckCircle2 size={48} aria-hidden="true" />
                  </div>
                  <h3 style={{ marginBottom: '1rem', color: '#111214' }}>Inquiry Received</h3>
                  <p style={{ color: '#4F565D' }}>
                    Thank you for your interest in partnering with RANGER. Our team will review your property details and contact you shortly.
                  </p>
                  <button onClick={() => setFormStatus('idle')} className="btn btn--outline" style={{ marginTop: '2rem', color: '#111214', borderColor: '#111214' }}>
                    Submit Another Location
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="h3" style={{ marginBottom: '0.5rem', color: '#111214' }}>Submit a Location</h2>
                  <p style={{ color: '#4F565D', marginBottom: '2rem', fontSize: '0.95rem' }}>
                    Provide details about your property to help us evaluate its suitability for a fast-charging hub.
                  </p>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                    {formStatus === 'error' && (
                      <div style={{ padding: '1rem', background: '#FEF2F2', border: '1px solid #F87171', borderRadius: 'var(--radius-sm)', color: '#991B1B', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                        <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '0.125rem' }} aria-hidden="true" />
                        <div>
                          <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Submission Failed</strong>
                          <span style={{ fontSize: '0.9rem' }}>{errorMessage}</span>
                        </div>
                      </div>
                    )}

                    <div className="form-grid">
                      <div className="form-field">
                        <label className="form-label" htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" name="firstName" className="form-input" autoComplete="given-name" required />
                      </div>
                      <div className="form-field">
                        <label className="form-label" htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" name="lastName" className="form-input" autoComplete="family-name" required />
                      </div>
                    </div>

                    <div className="form-grid">
                      <div className="form-field">
                        <label className="form-label" htmlFor="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone" className="form-input" autoComplete="tel" required />
                      </div>
                      <div className="form-field">
                        <label className="form-label" htmlFor="email">Email Address</label>
                        <input type="email" id="email" name="email" className="form-input" autoComplete="email" required />
                      </div>
                    </div>

                    <div className="form-field">
                      <label className="form-label" htmlFor="propertyType">Property Type</label>
                      <select id="propertyType" name="propertyType" className="form-select" required>
                        <option value="">Select a property type...</option>
                        <option value="highway_restaurant">Highway Restaurant / Dhaba</option>
                        <option value="hotel_resort">Hotel / Resort</option>
                        <option value="fuel_station">Existing Fuel Station</option>
                        <option value="commercial_land">Vacant Commercial Land</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label className="form-label" htmlFor="location">Highway / Location Details</label>
                      <input type="text" id="location" name="location" className="form-input" placeholder="e.g. NH 44, Near Hyderabad" required />
                    </div>

                    <div className="form-field">
                      <label className="form-label" htmlFor="message">Additional Information</label>
                      <textarea id="message" name="message" className="form-textarea" placeholder="Tell us about the space available, current power capacity, etc."></textarea>
                    </div>

                    <button
                      type="submit"
                      className="btn btn--primary"
                      style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}
                      disabled={formStatus === 'submitting'}
                      aria-disabled={formStatus === 'submitting'}
                    >
                      {formStatus === 'submitting' ? 'Submitting...' : 'Submit Location Inquiry'}
                      {formStatus !== 'submitting' && <ArrowRight size={18} aria-hidden="true" />}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
