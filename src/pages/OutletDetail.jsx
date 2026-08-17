import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Navigation, Clock, Zap, Coffee, Phone, ArrowLeft, AlertCircle, MessageSquare, SquareParking, UtensilsCrossed, Wifi, Toilet, Sofa, Cable, Car } from 'lucide-react';
import { outletsData } from '../data/outlets';
import { companyInfo } from '../data/company';
import SEO from '../components/SEO';
import { BASE_URL } from '../config';

export default function OutletDetail() {
  const { id } = useParams();
  const outlet = outletsData.find(o => o.id === id);

  const getAmenityIcon = (id) => {
    switch (id) {
      case 'parking': return <SquareParking size={18} />;
      case 'food': return <Coffee size={18} />;
      case 'breakfast': return <UtensilsCrossed size={18} />;
      case 'wifi': return <Wifi size={18} />;
      case 'toilets': return <Toilet size={18} />;
      case 'rest_area': return <Sofa size={18} />;
      default: return <Coffee size={18} />;
    }
  };

  // Add padding to body for mobile sticky actions
  useEffect(() => {
    document.body.classList.add('has-sticky-bar');
    window.scrollTo(0, 0);
    return () => {
      document.body.classList.remove('has-sticky-bar');
    };
  }, [id]);

  if (!outlet) {
    return (
      <div className="container section text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2>Outlet Not Found</h2>
        <p className="t-lead" style={{ margin: '1rem 0 2rem' }}>The requested RANGER outlet could not be found.</p>
        <Link to="/outlets" className="btn btn--primary" style={{ alignSelf: 'center' }}>Return to Directory</Link>
      </div>
    );
  }

  return (
    <main className="on-dark" style={{ background: 'var(--surface-dark)', minHeight: '100vh', paddingBottom: '3rem' }}>
      <SEO 
        title={`RANGER EV | ${outlet.title}`}
        description={`Visit ${outlet.title} on ${outlet.highway}. 24x7 60 kW CCS2 DC fast charging for EVs in ${outlet.state}. Restrooms, dining, and premium amenities.`}
        canonicalUrl={`${BASE_URL}/outlets/${outlet.id}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ElectricVehicleChargingStation",
          "name": outlet.title,
          "url": `${BASE_URL}/outlets/${outlet.id}`,
          "telephone": companyInfo.contact.primaryPhone.replace(/ /g, ''),
          "address": {
            "@type": "PostalAddress",
            "streetAddress": outlet.highway,
            "addressLocality": outlet.location,
            "addressRegion": outlet.state,
            "addressCountry": "IN"
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
          }
        }}
      />
      <style>{`
        .amenity-item-hover {
          transition: all 0.2s ease;
        }
        .amenity-item-hover:hover .amenity-icon-wrapper {
          color: var(--clr-primary) !important;
        }
        .amenity-item-hover:hover .amenity-text {
          color: var(--text-primary-dark) !important;
        }
      `}</style>
      
      <div style={{ position: 'relative', width: '100%', background: '#111214', overflow: 'hidden' }}>
        <img
          src="/images/cinematic/vision_charging_hub_1786922492514.webp"
          alt="Atmospheric editorial visual representing the RANGER charging experience"
          fetchPriority="high"
          style={{ width: '100%', height: '420px', objectFit: 'cover', opacity: 0.85 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--surface-dark) 0%, transparent 40%)' }}></div>
      </div>

      <div className="container" style={{ marginTop: '-2rem', position: 'relative', zIndex: 10 }}>
        
        {/* Breadcrumb */}
        <div className="breadcrumb" style={{ background: 'var(--surface-elevated)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', display: 'inline-flex', boxShadow: 'var(--shadow-sm)', marginBottom: '1.5rem', border: '1px solid var(--border-light)' }}>
          <Link to="/outlets" style={{ color: 'var(--text-secondary-dark)' }}>Outlets</Link>
          <span className="breadcrumb-sep" style={{ color: 'var(--text-secondary-dark)' }}>/</span>
          <span style={{ color: 'var(--text-primary-dark)', fontWeight: '600' }}>{outlet.id.toUpperCase()}</span>
        </div>

        <div className="grid-2" style={{ gap: '2.5rem', alignItems: 'flex-start' }}>
          
          {/* Main Info Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Title Card */}
            <div className="detail-card" style={{ background: 'var(--surface-elevated)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-light)' }}>
              <span className="status-badge status-badge--op" style={{ marginBottom: '1rem', color: 'var(--ranger-green)' }}>
                <span className="status-dot"></span>
                Operational
              </span>
              <h1 style={{ marginBottom: '0.5rem', color: 'var(--text-primary-dark)' }}>{outlet.title}</h1>
              <p className="t-lead" style={{ color: 'var(--text-secondary-dark)', marginBottom: '1.5rem' }}>
                {outlet.highway} - {outlet.locationArea}
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '2rem' }}>
                <a href={outlet.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn--primary" aria-label={`Get Google Maps directions to ${outlet.title} (opens in new tab)`}>
                  <Navigation size={18} aria-hidden="true" /> Directions
                </a>
                <a href={`tel:${companyInfo.contact.primaryPhone}`} className="btn btn--outline" aria-label={`Call ${outlet.title} support`}>
                  <Phone size={18} aria-hidden="true" /> Call
                </a>
                <a href={`https://wa.me/${companyInfo.contact.whatsappNumber.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn btn--outline" style={{ color: '#25D366', borderColor: 'rgba(37, 211, 102, 0.4)' }} aria-label={`WhatsApp chat with ${outlet.title} support (opens in new tab)`}>
                  <MessageSquare size={18} aria-hidden="true" /> WhatsApp
                </a>
              </div>
            </div>

            {/* Spec Card */}
            <div className="detail-card" style={{ background: 'var(--surface-elevated)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-light)' }}>
              <h2 className="h3" style={{ marginBottom: '1.5rem', color: 'var(--text-primary-dark)' }}>Charging Details</h2>
              
              <div className="info-strip info-strip--dark">
                <div className="info-row info-row--dark">
                  <span className="info-label info-label--dark" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> Hours</span>
                  <span className="info-value info-value--dark" style={{ color: 'var(--text-primary-dark)' }}>{outlet.specs.operatingHours}</span>
                </div>
                <div className="info-row info-row--dark">
                  <span className="info-label info-label--dark" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Zap size={16} /> Power</span>
                  <span className="info-value info-value--dark" style={{ color: 'var(--text-primary-dark)' }}>{outlet.specs.powerPerCharger} DC</span>
                </div>
                <div className="info-row info-row--dark">
                  <span className="info-label info-label--dark" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Cable size={16} /> Connector</span>
                  <span className="info-value info-value--dark" style={{ color: 'var(--text-primary-dark)' }}>{outlet.specs.connectorType}</span>
                </div>
                <div className="info-row info-row--dark" style={{ borderBottom: 'none' }}>
                  <span className="info-label info-label--dark" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Car size={16} /> Capacity</span>
                  <span className="info-value info-value--dark" style={{ color: 'var(--text-primary-dark)' }}>{outlet.specs.maxSimultaneousEVs} EVs Simultaneously</span>
                </div>
              </div>
            </div>

            {/* Amenities Card */}
            <div className="detail-card" style={{ background: 'var(--surface-elevated)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-light)' }}>
              <h2 className="h3" style={{ marginBottom: '1.5rem', color: 'var(--text-primary-dark)' }}>Amenities</h2>
              <ul className="outlet-amenities-grid">
                {outlet.amenities.map((item, idx) => (
                  <li key={item.id} className="amenity-item-hover" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary-dark)' }}>
                    <div className="amenity-icon-wrapper" style={{ color: 'var(--ranger-green)', transition: 'color 0.2s ease' }}>{getAmenityIcon(item.id)}</div>
                    <span className="amenity-text" style={{ fontWeight: '500', transition: 'color 0.2s ease', color: 'var(--text-primary-dark)' }}>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Map Column */}
          <div style={{ position: 'sticky', top: '90px' }}>
            <div style={{ background: 'var(--surface-elevated)', padding: '1rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-light)' }}>
              <iframe
                src={`https://maps.google.com/maps?q=${outlet.coordinates.lat},${outlet.coordinates.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                className="map-embed"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map showing location of ${outlet.title}`}
                style={{ opacity: 0.9 }}
              ></iframe>
              <div style={{ marginTop: '1.25rem', padding: '0 1rem 0.5rem' }}>
                <h3 className="h4" style={{ marginBottom: '0.5rem', color: 'var(--text-primary-dark)' }}>Address</h3>
                <p style={{ color: '#AEB5BC', lineHeight: '1.6' }}>
                  {outlet.fullAddress}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', fontSize: '0.9rem', color: 'var(--clr-primary)' }}>
                  <AlertCircle size={16} aria-hidden="true" />
                  <span style={{ color: '#AEB5BC' }}>Landmark: {outlet.landmark}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Sticky Mobile Actions */}
      <div className="sticky-actions">
        <div className="sticky-actions__grid">
          <a href={outlet.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn--primary" aria-label={`Navigate to ${outlet.title} (opens in new tab)`}>
            <Navigation size={16} aria-hidden="true" /> Navigate
          </a>
          <a href={`tel:${companyInfo.contact.primaryPhone}`} className="btn btn--outline" style={{ background: 'var(--surface-dark)', borderColor: 'var(--border-dark)' }} aria-label="Call support">
            <Phone size={16} aria-hidden="true" />
            Call Support
          </a>
          <a href={`https://wa.me/${companyInfo.contact.whatsappNumber.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="btn btn--outline" style={{ background: 'var(--surface-dark)', borderColor: 'var(--border-dark)', color: '#25D366' }} aria-label="WhatsApp chat (opens in new tab)">
            <MessageSquare size={16} aria-hidden="true" /> Chat
          </a>
        </div>
      </div>

    </main>
  );
}
