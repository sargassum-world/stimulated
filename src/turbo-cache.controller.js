import * as Turbo from '@hotwired/turbo/core';
import { Controller } from 'stimulus';

export default class extends Controller {
  clear(e) {
    // This assumes the controller is attached to a form!
    e.preventDefault();
    Turbo.clearCache();
    e.target.submit();
  }
}
