import { Mutex } from 'async-mutex';

// Globally shared CSRF token

// These are globals because we only need to fetch a CSRF token once, and because they are used by
// multiple Stimulus controllers and custom HTML elements; we can reuse the global token as long as
// the CSRF cookie (for the Double Submit Cookie pattern) remains valid.
export let csrfToken = null;
let fetchMutex = new Mutex();

export function getCSRFToken() {
  return csrfToken;
}

export function setCSRFToken(token) {
  csrfToken = token;
}

export async function fetchCSRFToken(route) {
  await fetchMutex.runExclusive(async () => {
    if (csrfToken !== null) {
      return;
    }
    const response = await fetch(route, {
      headers: {
        Accept: 'application/json',
      },
    });
    const responseBody = await response.json();
    csrfToken = responseBody.token;
  });
}

// Attachment of CSRF token to custom HTML elements

export async function attachCSRFToken(htmlElement) {
  if (hasValidCSRFToken(htmlElement)) {
    setCSRFToken(htmlElement.getAttribute('csrf-token'));
    return;
  }
  if (addCSRFToken(htmlElement)) {
    return;
  }
  await fetchCSRFToken(htmlElement.getAttribute('csrf-route'));
  addCSRFToken(htmlElement);
}

function addCSRFToken(htmlElement) {
  if (getCSRFToken() === null) {
    return false;
  }
  htmlElement.setAttribute('csrf-token', getCSRFToken());
  return hasValidCSRFToken(htmlElement);
}

function hasValidCSRFToken(htmlElement) {
  if (!htmlElement.hasAttribute('csrf-token')) {
    return false;
  }
  return htmlElement.getAttribute('csrf-token').length > 0;
}
