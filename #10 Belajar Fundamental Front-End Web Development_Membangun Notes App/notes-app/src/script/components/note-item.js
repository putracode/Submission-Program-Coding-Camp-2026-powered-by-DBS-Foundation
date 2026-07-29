import Utils from '../utils.js';

class NoteItem extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  static get observedAttributes() {
    return ['note-id', 'title', 'body', 'created-at', 'archived'];
  }

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
        height: 100%;
      }

      .note-card {
        background-color: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 16px 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        box-sizing: border-box;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
        transition: box-shadow 0.2s ease, border-color 0.2s ease;
      }

      .note-card:hover {
        border-color: #cbd5e1;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
      }

      .note-title {
        margin: 0 0 8px 0;
        font-size: 1.1rem;
        color: #0f172a;
        word-break: break-word;
      }

      .note-date {
        font-size: 0.75rem;
        color: #64748b;
        margin-bottom: 12px;
      }

      .note-body {
        font-size: 0.9rem;
        color: #334155;
        line-height: 1.5;
        white-space: pre-wrap;
        word-break: break-word;
        flex-grow: 1;
        margin-bottom: 16px;
      }

      .note-actions {
        display: flex;
        gap: 8px;
        border-top: 1px solid #f1f5f9;
        padding-top: 12px;
      }

      .btn {
        flex: 1;
        padding: 6px 12px;
        border: 1px solid transparent;
        border-radius: 4px;
        font-size: 0.8rem;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s ease;
      }

      .btn-archive {
        background-color: #f1f5f9;
        color: #334155;
        border-color: #cbd5e1;
      }

      .btn-archive:hover {
        background-color: #e2e8f0;
      }

      .btn-delete {
        background-color: #fef2f2;
        color: #dc2626;
        border-color: #fecaca;
      }

      .btn-delete:hover {
        background-color: #fee2e2;
      }
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  _initListeners() {
    const deleteBtn = this._shadowRoot.querySelector('.btn-delete');
    const archiveBtn = this._shadowRoot.querySelector('.btn-archive');
    const noteId = this.getAttribute('note-id');

    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => {
        this.dispatchEvent(
          new CustomEvent('delete-note', {
            detail: { id: noteId },
            bubbles: true,
            composed: true,
          })
        );
      });
    }

    if (archiveBtn) {
      archiveBtn.addEventListener('click', () => {
        this.dispatchEvent(
          new CustomEvent('toggle-archive-note', {
            detail: { id: noteId },
            bubbles: true,
            composed: true,
          })
        );
      });
    }
  }

  render() {
    const title = this.getAttribute('title') || '';
    const body = this.getAttribute('body') || '';
    const createdAt = this.getAttribute('created-at') || '';
    const isArchived = this.getAttribute('archived') === 'true';

    const formattedDate = createdAt ? Utils.formatDate(createdAt) : '';

    this._shadowRoot.innerHTML = '';
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="note-card">
        <div>
          <h3 class="note-title">${title}</h3>
          <div class="note-date">${formattedDate}</div>
          <div class="note-body">${body}</div>
        </div>
        <div class="note-actions">
          <button type="button" class="btn btn-archive">${isArchived ? 'Pindahkan' : 'Arsipkan'}</button>
          <button type="button" class="btn btn-delete">Hapus</button>
        </div>
      </div>
    `;

    this._initListeners();
  }
}

customElements.define('note-item', NoteItem);
