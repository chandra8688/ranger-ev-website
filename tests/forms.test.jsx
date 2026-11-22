/**
 * Contact / Partner forms: honeypot present, validation focuses the first
 * invalid field, errors are announced, and bots are silently dropped.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../src/services/formService.js', () => ({
  submitContactForm: vi.fn(),
  submitPartnerForm: vi.fn(),
}));

const { submitContactForm } = await import('../src/services/formService.js');
const { default: Contact } = await import('../src/pages/Contact.jsx');
const { default: Partner } = await import('../src/pages/Partner.jsx');

const renderPage = (Page) => render(<MemoryRouter><Page /></MemoryRouter>);

const fillContact = () => {
  fireEvent.change(screen.getByLabelText(/^Name/), { target: { value: 'Asha Rao' } });
  fireEvent.change(screen.getByLabelText(/^Email/), { target: { value: 'asha@example.com' } });
  fireEvent.change(screen.getByLabelText(/^Topic/), { target: { value: 'Billing' } });
  fireEvent.change(screen.getByLabelText(/^Message/), { target: { value: 'Question about my invoice please.' } });
};

describe('forms', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    submitContactForm.mockReset();
  });
  afterEach(() => vi.useRealTimers());

  it('both forms include a Formspree honeypot field', () => {
    const { container, unmount } = renderPage(Contact);
    expect(container.querySelector('input[name="_gotcha"]')).not.toBeNull();
    unmount();
    const partner = renderPage(Partner);
    expect(partner.container.querySelector('input[name="_gotcha"]')).not.toBeNull();
  });

  it('marks and focuses the first invalid field instead of submitting', () => {
    renderPage(Contact);
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
    expect(submitContactForm).not.toHaveBeenCalled();
    const name = screen.getByLabelText(/^Name/);
    expect(name).toHaveAttribute('aria-invalid', 'true');
    expect(document.activeElement).toBe(name);
  });

  it('announces a submission failure with role="alert"', async () => {
    submitContactForm.mockRejectedValue(new Error('Server unavailable.'));
    renderPage(Contact);
    fillContact();
    act(() => { vi.advanceTimersByTime(2000); });
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Server unavailable.');
  });

  it('shows a success status after a valid submission', async () => {
    submitContactForm.mockResolvedValue({ ok: true });
    renderPage(Contact);
    fillContact();
    act(() => { vi.advanceTimersByTime(2000); });
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Message sent'));
    expect(submitContactForm).toHaveBeenCalledTimes(1);
  });

  it('silently drops submissions that fill the honeypot', async () => {
    renderPage(Contact);
    fillContact();
    fireEvent.change(document.querySelector('input[name="_gotcha"]'), { target: { value: 'spam' } });
    act(() => { vi.advanceTimersByTime(2000); });
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
    await waitFor(() => expect(screen.getByRole('status')).toBeInTheDocument());
    expect(submitContactForm).not.toHaveBeenCalled();
  });
});
