import { Controller } from 'stimulus';

import {
  invert,
  loadThemeSetting,
  storeThemeSetting,
  setTheme,
} from './theme-toggle';

export default class extends Controller {
  connect() {
    this.element.classList.remove('is-hidden');
  }
  toggle() {
    const theme = invert(loadThemeSetting());
    setTheme(theme);
    storeThemeSetting(theme);
  }
}
