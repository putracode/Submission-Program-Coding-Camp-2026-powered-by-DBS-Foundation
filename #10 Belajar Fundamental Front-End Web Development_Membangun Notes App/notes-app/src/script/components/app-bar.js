class AppBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
        width: 100%;
        background-color: #2b3a4a;
        color: #ffffff;
      }

      .app-bar-container {
        max-width: 1100px;
        margin: 0 auto;
        padding: 16px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .brand-title {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 700;
        letter-spacing: 0.5px;
      }

      .brand-tagline {
        font-size: 0.85rem;
        color: #cbd5e1;
        margin: 4px 0 0 0;
      }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="app-bar-container">
        <div>
          <h1 class="brand-title">CatatanKu</h1>
        </div>
      </div>
    `;
  }
}

customElements.define('app-bar', AppBar);
