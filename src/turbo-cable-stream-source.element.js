// This is adapted from the MIT-licensed library @hotwired/turbo-rails.
import { connectStreamSource, disconnectStreamSource } from '@hotwired/turbo';
import { createConsumer, logger } from '@rails/actioncable';
import { getCSRFToken, setCSRFToken, fetchCSRFToken } from './csrf';

let consumer;

function getConsumer(url) {
  if (consumer === undefined) {
    consumer = createConsumer(url === null ? undefined : url);
  }
  return consumer;
}

export default class TurboCableStreamSourceElement extends HTMLElement {
  async connectedCallback() {
    connectStreamSource(this);
    if (this.hasValidCSRFToken()) {
      setCSRFToken(this.getAttribute('csrf-token'));
    } else if (
      this.hasAttribute('csrf-token') &&
      this.hasAttribute('data-csrf-route')
    ) {
      await this.addCSRFToken();
    }
    const channel = {
      channel: this.getAttribute('channel'),
      name: this.getAttribute('name'),
      integrity: this.getAttribute('integrity'),
    };
    if (this.hasAttribute('csrf-token')) {
      channel.csrfToken = this.getAttribute('csrf-token');
    }
    this.subscription = getConsumer(
      this.getAttribute('cable-route'),
    ).subscriptions.create(channel, {
      received: this.dispatchMessageEvent.bind(this),
    });
    if (this.hasAttribute('logging')) {
      logger.enabled = true;
    }
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
