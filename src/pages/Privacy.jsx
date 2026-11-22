import React from 'react';
import RouteSEO from '../components/RouteSEO';
import PageHero from '../components/PageHero';
import { companyInfo } from '../data/company';

const UPDATED = '22 November 2026';

/**
 * Plain-language privacy notice. NOTE FOR THE OWNER: this is a starting point
 * aligned with India's DPDP Act 2023, not legal advice — have it reviewed.
 */
export default function Privacy() {
  const { email, displayPhone } = companyInfo.contact;

  return (
    <div className="page">
      <RouteSEO path="/privacy" />
      <PageHero eyebrow="Legal" title="Privacy policy" lead={`Last updated ${UPDATED}.`} />

      <section className="section section--tight">
        <div className="container">
          <div className="prose">
            <p>
              This notice explains how {companyInfo.legalName} (&ldquo;RANGER EV&rdquo;, &ldquo;we&rdquo;) handles personal data collected through
              this website. We collect as little as we need, and we never sell it.
            </p>

            <h2>What we collect</h2>
            <ul>
              <li><strong>Contact form:</strong> your name, email, optional phone number, topic and message.</li>
              <li><strong>Partner form:</strong> your name, phone, email, property type, location and any details you add.</li>
              <li>
                <strong>Analytics (only if you accept):</strong> anonymised usage data from Google Analytics 4, such as pages viewed, device type and
                approximate region. If you decline, analytics runs without cookies and without identifying you.
              </li>
            </ul>

            <h2>Why we use it</h2>
            <ul>
              <li>To reply to your enquiry and provide charging support.</li>
              <li>To evaluate sites you submit for a RANGER charging outlet.</li>
              <li>To understand which pages are useful and improve the website.</li>
            </ul>

            <h2>Who processes it</h2>
            <p>
              Form submissions are delivered to us by Formspree (formspree.io). The website is hosted by Vercel. Analytics is provided by Google.
              The outlets map uses OpenStreetMap tiles; Google Maps loads only when you choose to open it on an outlet page. These providers process data on our
              behalf under their own security and privacy terms.
            </p>

            <h2>How long we keep it</h2>
            <p>
              We keep enquiries only as long as needed to respond and for related follow-up, and partner submissions for as long as the site is
              under evaluation. Analytics data is retained according to our Google Analytics retention setting.
            </p>

            <h2>Your choices and rights</h2>
            <p>
              You can ask to access, correct or delete your personal data, or withdraw consent, at any time by emailing{' '}
              <a href={`mailto:${email}`}>{email}</a>. You can change your analytics choice using &ldquo;Cookie settings&rdquo; in the footer.
            </p>

            <h2>Contact</h2>
            <p>
              Questions or complaints about privacy: <a href={`mailto:${email}`}>{email}</a> or {displayPhone}.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
