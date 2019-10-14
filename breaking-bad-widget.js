import { LitElement, html, } from 'lit-element';
import { getComponentSharedStyles, } from '@cells-components/cells-lit-helpers/cells-lit-helpers.js';
import '@lit-training/breaking-bad-profile-list/breaking-bad-profile-list.js';
import '@lit-training/breaking-bad-dm/breaking-bad-dm.js';
import '@bbva-web-components/bbva-spinner/bbva-spinner.js';
import { CellsI18nMixin } from '@cells-components/cells-i18n-mixin/cells-i18n-mixin.js';
import styles from './breaking-bad-widget-styles.js';
/**
This component ...

Example:

```html
<breaking-bad-widget></breaking-bad-widget>
```
* @customElement
* @polymer
* @LitElement
* @demo demo/index.html
*/
export class BreakingBadWidget extends CellsI18nMixin(LitElement) {
  static get is() {
    return 'breaking-bad-widget';
  }

  // Declare properties
  static get properties() {
    return {};
  }

  static get shadyStyles() {
    return `
      ${styles.cssText}
      ${getComponentSharedStyles('breaking-bad-widget-shared-styles').cssText}
    `;
  }

  firstUpdated() {
    this.addEventListener('breaking-bad-dm-success', (e) => {
      if (e.detail && Array.isArray(e.detail)) {
        this.shadowRoot.querySelector('breaking-bad-profile-list').cardsList = e.detail;
        this.shadowRoot.querySelector('bbva-spinner').hidden = true;
      }
    });
  }

  init() {
    this.shadowRoot.querySelector('breaking-bad-dm').generateRequest();
  }

  // Define a template
  render() {
    return html`
      <style>${this.constructor.shadyStyles}</style>
      <slot></slot>
      <bbva-spinner with-mask></bbva-spinner>
      <breaking-bad-profile-list></breaking-bad-profile-list>
      <breaking-bad-dm host="https://www.breakingbadapi.com" path="api/characters"></breaking-bad-dm>
    `;
  }
}

// Register the element with the browser
customElements.define(BreakingBadWidget.is, BreakingBadWidget);
