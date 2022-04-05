// This is all copied from the MIT-licensed library @hotwired/turbo-rails, modified to statically
// import @rails/actioncable instead of dynamically importing it (allowing IIFE bundling), and
// simplified for readability.
import { connectStreamSource, disconnectStreamSource } from '@hotwired/turbo';
import { createConsumer, logger } from '@rails/actioncable';

import { Turbo } from './turbo.js';

let consumer;

function getConsumer() {
  if (consumer === undefined) {
    consumer = createConsumer();
  }
  return consumer;
}

export default class TurboCableStreamSourceElement extends HTMLElement {
  connectedCallback() {
    connectStreamSource(this);
    this.subscription = getConsumer().subscriptions.create(this.channel, {
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

  get channel() {
    return {
      channel: this.getAttribute('channel'),
      signed_stream_name: this.getAttribute('signed-stream-name'),
    };
  }
}
