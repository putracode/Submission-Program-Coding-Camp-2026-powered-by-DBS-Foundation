class FooterBar extends HTMLElement {
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
        background-color: #1e293b;
        color: #94a3b8;
        text-align: center;
        margin-top: 40px;
      }

      .footer-container {
        padding: 20px;
        font-size: 0.875rem;
      }

      p {
        margin: 0;
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = '';
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="footer-container">
        <p>Saputra &copy; 2026 - CatatanKu</p>
      </div>
    `;
  }
}

customElements.define('footer-bar', FooterBar);
