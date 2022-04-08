import { Mutex } from 'async-mutex';

// These are globals because we only need to fetch a CSRF token once, and because they are used by
// multiple Stimulus controllers and custom HTML elements; we can reuse the global token as long as
// the CSRF cookie (for the Double Submit Cookie pattern) remains valid.
export let csrfToken = null;
let fetchMutex = new Mutex();

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
