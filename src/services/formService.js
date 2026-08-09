/**
 * RANGER EV Form Service
 * 
 * This service handles form submissions using Formspree. 
 * By isolating this logic, the React UI components remain completely unaware
 * of the specific backend provider (Formspree, Resend, Custom API).
 * 
 * To migrate away from Formspree in the future, modify ONLY this file.
 */

// Formspree production endpoints for the RANGER EV project.
// Override via Vercel environment variables if the destination email changes in future.
const CONTACT_ENDPOINT = import.meta.env.VITE_FORMSPREE_CONTACT_URL || 'https://formspree.io/f/xrpzpbda';
const PARTNER_ENDPOINT = import.meta.env.VITE_FORMSPREE_PARTNER_URL || 'https://formspree.io/f/xdenekjb';

/**
 * Helper to execute a form submission.
 */
const submitForm = async (endpoint, formData) => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    });

    if (!response.ok) {
      // Handle HTTP errors cleanly without exposing raw errors to UI
      let errorMessage = 'We couldn\'t send your request right now. Please try again in a few minutes.';
      try {
        const errorData = await response.json();
        // Formspree typically returns `{ errors: [{ message: "..." }] }`
        if (errorData.errors && errorData.errors.length > 0) {
          errorMessage = errorData.errors.map(err => err.message).join(', ');
        }
      } catch (e) {
        // Fallback generic error message
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    // If it's a network failure or a thrown error from above
    throw new Error(error.message || 'We couldn\'t send your request right now. Please try again in a few minutes.');
  }
};

export const submitContactForm = async (formData) => {
  return submitForm(CONTACT_ENDPOINT, formData);
};

export const submitPartnerForm = async (formData) => {
  return submitForm(PARTNER_ENDPOINT, formData);
};
