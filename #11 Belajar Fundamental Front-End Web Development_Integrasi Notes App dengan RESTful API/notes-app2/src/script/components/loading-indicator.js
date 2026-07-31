class LoadingIndicator extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  static get observedAttributes() {
    return ['loading'];
  }

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(15, 23, 42, 0.4);
        backdrop-filter: blur(3px);
        z-index: 9999;
        align-items: center;
        justify-content: center;
      }

      :host([loading="true"]) {
        display: flex;
      }

      .spinner-container {
        background-color: #ffffff;
        padding: 24px 32px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
      }

      .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #e2e8f0;
        border-top: 4px solid #2563eb;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }

      .loading-text {
        font-size: 0.9rem;
        font-weight: 600;
        color: #334155;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'loading') {
      if (newValue === 'true') {
        this.style.display = 'flex';
      } else {
        this.style.display = 'none';
      }
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = '';
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="spinner-container">
        <div class="spinner"></div>
        <div class="loading-text">Memuat data...</div>
      </div>
    `;
  }
}

customElements.define('loading-indicator', LoadingIndicator);
