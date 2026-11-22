/**
 * Page-level regressions: unknown outlets must render the real 404 (noindex),
 * the outlet page must show the tariff, and pages must not nest <main>.
 */
import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import OutletDetail from '../src/pages/OutletDetail.jsx';

beforeAll(() => {
  window.IntersectionObserver = class { observe() {} disconnect() {} };
  window.scrollTo = () => {};
});

beforeEach(() => {
  document.head.innerHTML = '';
  document.title = '';
});

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/outlets/:id" element={<OutletDetail />} />
      </Routes>
    </MemoryRouter>,
  );

describe('OutletDetail', () => {
  it('shows the tariff, imagery and directions for a valid outlet', () => {
    const { container } = renderAt('/outlets/outlet-01');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('RANGER Outlet #01');
    expect(container.textContent).toContain('₹23');
    expect(container.querySelector('img[src*="/images/scenes/"]')).not.toBeNull();
    const directions = screen.getAllByRole('link', { name: /directions|navigate/i })[0];
    expect(directions.getAttribute('href')).toMatch(/^https:\/\/www\.google\.com\/maps\/dir\//);
    expect(document.querySelector('meta[name="robots"]')).toBeNull();
    expect(document.querySelector('link[rel="canonical"]').getAttribute('href')).toMatch(/\/outlets\/outlet-01$/);
  });

  it('renders the 404 page with noindex for an unknown outlet id', () => {
    renderAt('/outlets/does-not-exist');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/doesn.t lead anywhere/i);
    expect(document.title).toMatch(/Page Not Found/);
    expect(document.querySelector('meta[name="robots"]').getAttribute('content')).toBe('noindex, follow');
    expect(document.querySelector('link[rel="canonical"]')).toBeNull();
  });

  it('does not render its own <main> (App provides the single landmark)', () => {
    const { container } = renderAt('/outlets/outlet-01');
    expect(container.querySelector('main')).toBeNull();
  });
});
