import { Controller } from '@hotwired/stimulus';
import { csrfToken, setCSRFToken, fetchCSRFToken } from './csrf';

export default class extends Controller {
  static targets = ['token', 'route', 'omit'];
  async connect() {
    if (this.omitTarget) {
      this.omitTarget.value = true;
    }
    if (this.hasValidToken()) {
      setCSRFToken(this.tokenTarget.value);
      return;
    }
    await this.addToken();
  }

  async addToken(e) {
    if (this.hasValidToken() || this.setToken()) {
      return;
    }

    if (e !== undefined) {
      e.preventDefault();
    }

    await fetchCSRFToken(this.routeTarget.value);
    this.setToken();
    if (e !== undefined) {
      // Assumes the controller is mounted on a form!
      e.target.submit();
    }
  }

  setToken() {
    if (csrfToken === null) {
      return false;
    }
    this.tokenTarget.value = csrfToken;
    return this.hasValidToken();
  }

  hasValidToken() {
    return this.tokenTarget.value.length > 0;
  }
}
