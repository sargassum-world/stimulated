// This is adapted from the MIT-licensed library @hotwired/turbo-rails.
import { connectStreamSource, disconnectStreamSource } from '@hotwired/turbo';
import { createConsumer } from '@anycable/web';
import { getCSRFToken, setCSRFToken, fetchCSRFToken } from './csrf';

// Copied verbatim from the MIT-licensed absoluteWSUrl function at
// https://github.com/anycable/anycable-client/blob/master/packages/web/index.js
export const makeWebSocketURL = (path) => {
  if (path.match(/wss?:\/\//)) return path;

  if (typeof window !== 'undefined') {
    let proto = window.location.protocol.replace('http', 'ws');

    return `${proto}//${window.location.host}${path}`;
  }

  return path;
};

let consumers = {};

function getConsumer(url) {
  if (consumers[url] === undefined) {
    consumers[url] = createConsumer(url === null ? undefined : url);
  }
  return consumers[url];
}

export default class TurboCableStreamSourceElement extends HTMLElement {
  async connectedCallback() {
    connectStreamSource(this);
    if (document.documentElement.hasAttribute('data-turbo-preview')) {
      return;
    }

    // Ensure CSRF token
    if (this.hasValidCSRFToken()) {
      setCSRFToken(this.getAttribute('csrf-token'));
    } else if (
      this.hasAttribute('csrf-token') &&
      this.hasAttribute('data-csrf-route')
    ) {
      await this.addCSRFToken();
    }

    // Initialize channel
    const channel = {
      channel: this.getAttribute('channel'),
      name: this.getAttribute('name'),
      integrity: this.getAttribute('integrity'),
    };
    if (this.hasAttribute('csrf-token')) {
      channel.csrfToken = this.getAttribute('csrf-token');
    }

    // Subscribe
    const consumer = getConsumer(makeWebSocketURL(this.getAttribute('cable-route')));
    this.subscription = consumer.subscriptions.create(channel, {
      received: this.dispatchMessageEvent.bind(this),
    });
  }

  disconnectedCallback() {
    disconnectStreamSource(this);
    if (this.subscription) this.subscription.unsubscribe();
  }

  dispatchMessageEvent(data) {
    return this.dispatchEvent(new MessageEvent('message', { data }));
  }

  async addCSRFToken() {
    if (this.hasValidCSRFToken() || this.setCSRFToken()) {
      return;
    }
    await fetchCSRFToken(this.getAttribute('data-csrf-route'));
    this.setCSRFToken();
  }

  setCSRFToken() {
    if (getCSRFToken() === null) {
      return false;
    }
    this.setAttribute('csrf-token', getCSRFToken());
    return this.hasValidCSRFToken();
  }

  hasValidCSRFToken() {
    return this.getAttribute('csrf-token').length > 0;
  }
}
