import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Zap, Clock, Navigation, CheckCircle2, ChevronRight } from 'lucide-react';

export default function OutletCard({ outlet }) {
  if (!outlet.isOperational) {
    return (
      <div className="card" style={{ opacity: 0.7, borderStyle: 'dashed' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span className="badge-pill orange-pill">Planned Location</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Outlet #{outlet.outletNumber}</span>
        </div>
        <h3 style={{ marginBottom: '0.5rem' }}>{outlet.title}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{outlet.highway}</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '1rem' }}>
          Network Expansion Planned Across Major Highway Corridors.
        </p>
      </div>
    );
  }

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ position: 'relative', borderRadius: 'var(--radius-sm)', overflow: 'hidden', marginBottom: '1.25rem' }}>
        <img 
          src={outlet.images.hero} 
          alt={outlet.title} 
          style={{ width: '100%', height: '220px', objectFit: 'cover' }} 
          loading="lazy"
        />
        <div 
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: 'rgba(11, 15, 18, 0.85)',
            backdropFilter: 'blur(6px)',
            padding: '0.35rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(0, 230, 118, 0.4)',
            color: 'var(--brand-ev-green)',
            fontSize: '0.8rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          <Clock size={14} />
          <span>{outlet.specs.operatingHours}</span>
        </div>
        <div 
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            background: 'rgba(12, 59, 37, 0.9)',
            padding: '0.35rem 0.75rem',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text-primary)',
            fontSize: '0.85rem',
            fontWeight: '700'
          }}
        >
          Tariff: {outlet.specs.tariff}
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--brand-ev-green)' }}>
          <MapPin size={18} />
          <span style={{ fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {outlet.highway}
          </span>
        </div>

        <h3 style={{ marginBottom: '0.5rem', fontSize: '1.4rem' }}>{outlet.title}</h3>
        
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
          {outlet.locationName}<br />
          <span style={{ color: 'var(--text-muted)' }}>Landmark: {outlet.landmark}</span>
        </p>

        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '0.75rem', 
            background: 'var(--bg-dark-800)', 
            padding: '1rem', 
            borderRadius: 'var(--radius-sm)',
            marginBottom: '1.25rem'
          }}
        >
          <div>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Charger Rating</span>
            <strong style={{ fontSize: '0.95rem', color: 'var(--brand-ev-green)' }}>{outlet.specs.powerPerCharger} DC</strong>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Charging Points</span>
            <strong style={{ fontSize: '0.95rem' }}>{outlet.specs.totalChargingPoints} EV Points</strong>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Connector</span>
            <strong style={{ fontSize: '0.95rem' }}>{outlet.specs.connectorType} Dual-Gun</strong>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Units Count</span>
            <strong style={{ fontSize: '0.95rem' }}>{outlet.specs.chargersCount} RANGER Units</strong>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {outlet.amenities.slice(0, 4).map((amenity) => (
            <span 
              key={amenity.id} 
              style={{
                fontSize: '0.75rem',
                background: 'rgba(255,255,255,0.05)',
                padding: '0.25rem 0.6rem',
                borderRadius: '4px',
                color: 'var(--text-secondary)'
              }}
            >
              • {amenity.name}
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <a 
          href={outlet.googleMapsUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-secondary"
          style={{ fontSize: '0.85rem', padding: '0.65rem' }}
        >
          <Navigation size={15} />
          <span>Directions</span>
        </a>
        <Link 
          to={`/outlets/${outlet.id}`} 
          className="btn btn-primary"
          style={{ fontSize: '0.85rem', padding: '0.65rem' }}
        >
          <span>Outlet Details</span>
          <ChevronRight size={15} />
        </Link>
      </div>
    </div>
  );
}
