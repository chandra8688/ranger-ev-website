import React from 'react';

/** Standard inner-page header: eyebrow, h1, lead, optional actions. */
export default function PageHero({ eyebrow, title, lead, children, center = false, breadcrumb }) {
  return (
    <header className="page-hero">
      <div className={`container${center ? ' text-center' : ''}`}>
        {breadcrumb}
        <div className={`section-head${center ? ' text-center' : ''}`} style={{ marginBottom: 0 }}>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1>{title}</h1>
          {lead && <p className="lead">{lead}</p>}
          {children}
        </div>
      </div>
    </header>
  );
}
