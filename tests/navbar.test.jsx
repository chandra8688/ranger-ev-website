/**
 * Mobile menu regressions from the Nov 2026 review:
 *  - drawer was keyboard-reachable while closed
 *  - no Escape-to-close, no focus management
 */
import { describe, it, expect, beforeAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../src/components/Navbar.jsx';

beforeAll(() => {
  window.matchMedia = window.matchMedia || (() => ({ matches: false, addEventListener() {}, removeEventListener() {} }));
});

const renderNav = () =>
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  );

describe('Navbar mobile drawer', () => {
  it('is inert and hidden from assistive tech while closed', () => {
    const { container } = renderNav();
    const drawer = container.querySelector('#mobile-menu');
    expect(drawer).toHaveAttribute('inert');
    expect(drawer).not.toHaveClass('open');
  });

  it('opens from the toggle and exposes aria-expanded', () => {
    const { container } = renderNav();
    const toggle = screen.getByRole('button', { name: 'Open menu' });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(container.querySelector('#mobile-menu')).not.toHaveAttribute('inert');
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('closes on Escape and returns focus to the toggle', () => {
    const { container } = renderNav();
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    fireEvent.keyDown(document, { key: 'Escape' });
    const toggle = screen.getByRole('button', { name: 'Open menu' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(container.querySelector('#mobile-menu')).toHaveAttribute('inert');
    expect(document.activeElement).toBe(toggle);
    expect(document.body.style.overflow).toBe('');
  });

  it('closes when the backdrop is clicked', () => {
    const { container } = renderNav();
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    fireEvent.click(container.querySelector('.drawer__backdrop'));
    expect(container.querySelector('#mobile-menu')).not.toHaveClass('open');
  });

  it('renders exactly one primary navigation landmark and one mobile one', () => {
    renderNav();
    expect(screen.getAllByRole('navigation', { hidden: true }).map((n) => n.getAttribute('aria-label'))).toEqual(['Main', 'Mobile']);
  });
});
