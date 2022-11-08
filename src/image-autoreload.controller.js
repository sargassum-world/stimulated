import { Controller } from '@hotwired/stimulus';

function getRandom(min, max) {
  return;
}

function setRandomInterval(intervalFunction, minDelay, maxDelay) {
  let timeout;

  function runInterval() {
    function timeoutFunction() {
      runInterval();
      intervalFunction();
    }

    const delay = Math.random() * (maxDelay - minDelay) + minDelay;
    timeout = setTimeout(timeoutFunction, delay);
  }

  runInterval();
  return () => {
    clearTimeout(timeout);
  };
}

export default class extends Controller {
  static values = {
    minInterval: Number,
    maxInterval: Number,
  };

  connect() {
    let src = this.element.src;
    this.element.focus();
    this.clearTimeout = setRandomInterval(
      () => {
        this.element.src = src + '?_time=' + Date.now();
      },
      this.minIntervalValue * 1000,
      this.maxIntervalValue * 1000,
    );
  }

  disconnect() {
    this.clearTimeout();
  }
}
