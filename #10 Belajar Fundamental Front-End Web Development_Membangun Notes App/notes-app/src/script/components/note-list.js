class NoteList extends HTMLElement {
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
      }

      .note-list-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
        align-items: stretch;
      }

      @media (max-width: 1024px) {
        .note-list-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      @media (max-width: 768px) {
        .note-list-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 480px) {
        .note-list-grid {
          grid-template-columns: 1fr;
        }
      }

      .empty-state {
        text-align: center;
        padding: 32px 16px;
        color: #64748b;
        background-color: #f8fafc;
        border: 1px dashed #cbd5e1;
        border-radius: 8px;
        font-size: 0.95rem;
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

    const slot = document.createElement('slot');
    const container = document.createElement('div');
    container.classList.add('note-list-grid');
    container.appendChild(slot);

    this._shadowRoot.appendChild(container);
  }
}

customElements.define('note-list', NoteList);
