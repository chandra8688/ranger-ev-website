import React from 'react';
import { Link } from 'react-router-dom';

/** items: [[label, path?], ...] — the last item is the current page. */
export default function Breadcrumb({ items, className = '' }) {
  return (
    <nav aria-label="Breadcrumb" className={`breadcrumb ${className}`.trim()}>
      <ol>
        {items.map(([label, path], i) => {
          const last = i === items.length - 1;
          return (
            <li key={label}>
              {last || !path ? <span aria-current={last ? 'page' : undefined}>{label}</span> : <Link to={path}>{label}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
