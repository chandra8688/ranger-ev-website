import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { companyInfo } from '../data/company';
import SEO from '../components/SEO';
import { BASE_URL } from '../config';
import { submitContactForm } from '../services/formService';

export default function Contact() {
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const { displayPhone, primaryPhone, email, whatsappNumber } = companyInfo.contact;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage('');

    try {
      const formData = new FormData(e.target);
      await submitContactForm(formData);
      setFormStatus('success');
    } catch (error) {
      setErrorMessage(error.message);
      setFormStatus('error');
    }
  };

  return (
    <main className="on-light" style={{ background: 'var(--surface-light)', minHeight: '100vh', paddingBottom: '4rem' }}>
      <SEO
        title="RANGER EV | Contact & Support"
        description="Get in touch with RANGER EV for corporate inquiries, partnership opportunities, or 24x7 charging support across our network."
        canonicalUrl={`${BASE_URL}/contact`}
      />

      {/* Header */}
      <section className="section" style={{ paddingBottom: '3rem' }}>
        <div className="container text-center" style={{ maxWidth: '700px' }}>
          <span className="t-eyebrow t-eyebrow--orange">Support & Inquiries</span>
          <h1 style={{ marginBottom: '1.25rem' }}>RANGER EV Corporate Support</h1>
          <p className="t-lead" style={{ margin: '0 auto' }}>
            Whether you require immediate operational assistance at a charging hub or wish to discuss strategic partnerships, the RANGER infrastructure team is available.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container">
        <div className="grid-2" style={{ gap: '3rem', maxWidth: '1000px', margin: '0 auto' }}>

          {/* Quick Actions (Mobile Priority) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 className="h3">Direct Channels</h2>
            <div className="green-rule"></div>
            <p style={{ color: 'var(--text-secondary-light)', marginBottom: '1rem' }}>
              Select the appropriate channel for expedited service.
            </p>

            <div className="contact-channels">
              <a href={`tel:${primaryPhone}`} className="contact-channel" style={{ background: '#ffffff', borderColor: 'rgba(17,18,20,0.08)' }}>
                <div className="contact-channel__icon ch-green"><Phone size={22} aria-hidden="true" /></div>
                <div>
                  <div className="contact-channel__label">Emergency Assistance</div>
                  <div className="contact-channel__value">24x7 Network Support</div>
                  <div className="contact-channel__sub">{displayPhone}</div>
                </div>
              </a>

              <a href={`https://wa.me/${whatsappNumber.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="contact-channel" style={{ background: '#ffffff', borderColor: 'rgba(17,18,20,0.08)' }}>
                <div className="contact-channel__icon ch-whatsapp"><MessageCircle size={22} aria-hidden="true" /></div>
                <div>
                  <div className="contact-channel__label">Customer Support</div>
                  <div className="contact-channel__value">General & Billing</div>
                  <div className="contact-channel__sub">WhatsApp Messaging</div>
                </div>
              </a>

              <a href={`mailto:${email}`} className="contact-channel" style={{ background: '#ffffff', borderColor: 'rgba(17,18,20,0.08)' }}>
                <div className="contact-channel__icon ch-email"><Mail size={22} aria-hidden="true" /></div>
                <div>
                  <div className="contact-channel__label">Business Partnerships</div>
                  <div className="contact-channel__value">B2B Inquiries</div>
                  <div className="contact-channel__sub">Fleet & Corporate</div>
                </div>
              </a>

              <a href={`mailto:${email}?subject=Site%20Acquisition`} className="contact-channel" style={{ background: '#ffffff', borderColor: 'rgba(17,18,20,0.08)' }}>
                <div className="contact-channel__icon ch-location"><MapPin size={22} aria-hidden="true" /></div>
                <div>
                  <div className="contact-channel__label">Site Acquisition</div>
                  <div className="contact-channel__value">Host a Charger</div>
                  <div className="contact-channel__sub">Landowner Submissions</div>
                </div>
              </a>
            </div>
          </div>

          {/* General Inquiry Form */}
          <div style={{ background: '#ffffff', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(17,18,20,0.08)' }}>
            <h2 className="h3" style={{ marginBottom: '0.5rem', color: '#111214' }}>Send a Message</h2>
            <p style={{ color: '#4F565D', marginBottom: '2rem', fontSize: '0.95rem' }}>
              Have a question about our network or services? Send us a message and we'll get back to you.
            </p>

            {/* Form Container */}
            {formStatus === 'success' ? (
              <div className="text-center" style={{ padding: '2rem 1rem' }}>
                <div style={{ color: 'var(--ranger-green)', display: 'inline-flex', marginBottom: '1.5rem' }}>
                  <CheckCircle2 size={48} aria-hidden="true" />
                </div>
                <h3 style={{ marginBottom: '1rem', color: '#111214' }}>Message Sent</h3>
                <p style={{ color: '#4F565D' }}>
                  Thank you for reaching out to RANGER EV. Our team will review your message and get back to you shortly.
                </p>
                <button onClick={() => setFormStatus('idle')} className="btn btn--outline" style={{ marginTop: '2rem', color: '#111214', borderColor: '#111214' }}>
                  Send Another Message
                </button>
              </div>
            ) : (
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

                <div className="form-field">
                  <label className="form-label" htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" className="form-input" autoComplete="name" required />
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" className="form-input" autoComplete="email" required />
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="inquiryType">Topic</label>
                  <select id="inquiryType" name="topic" className="form-select" required>
                    <option value="">Select a topic...</option>
                    <option value="Customer Support">Customer Support</option>
                    <option value="Business Partnership">Business Partnership</option>
                    <option value="Site Acquisition">Site Acquisition</option>
                    <option value="Corporate Inquiry">Corporate Inquiry</option>
                  </select>
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="msg">Message</label>
                  <textarea id="msg" name="message" className="form-textarea" required></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn--primary"
                  style={{ marginTop: '1rem', justifyContent: 'center' }}
                  disabled={formStatus === 'submitting'}
                  aria-disabled={formStatus === 'submitting'}
                >
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </main>
  );
}
