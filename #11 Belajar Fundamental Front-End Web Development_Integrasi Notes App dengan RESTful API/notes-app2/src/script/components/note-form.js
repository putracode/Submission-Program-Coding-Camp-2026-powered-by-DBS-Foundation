class NoteForm extends HTMLElement {
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
        margin-bottom: 32px;
      }

      .form-card {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 24px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      }

      .form-title {
        margin: 0 0 16px 0;
        font-size: 1.25rem;
        color: #1e293b;
      }

      .form-group {
        margin-bottom: 16px;
      }

      label {
        display: block;
        margin-bottom: 6px;
        font-weight: 600;
        font-size: 0.9rem;
        color: #334155;
      }

      input[type="text"],
      textarea {
        width: 100%;
        padding: 10px 12px;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        font-family: inherit;
        font-size: 0.95rem;
        box-sizing: border-box;
        transition: border-color 0.2s ease;
      }

      input[type="text"]:focus,
      textarea:focus {
        outline: none;
        border-color: #2563eb;
      }

      input.invalid,
      textarea.invalid {
        border-color: #dc2626;
      }

      textarea {
        min-height: 120px;
        resize: vertical;
      }

      .error-message {
        color: #dc2626;
        font-size: 0.8rem;
        margin-top: 4px;
        display: none;
      }

      .error-message.active {
        display: block;
      }

      .char-counter {
        text-align: right;
        font-size: 0.8rem;
        color: #64748b;
        margin-top: 4px;
      }

      button[type="submit"] {
        background-color: #2563eb;
        color: #ffffff;
        border: none;
        padding: 10px 20px;
        font-size: 0.95rem;
        font-weight: 600;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.2s ease;
        width: 100%;
      }

      button[type="submit"]:hover {
        background-color: #1d4ed8;
      }

      button[type="submit"]:disabled {
        background-color: #94a3b8;
        cursor: not-allowed;
      }
    `;
  }

  connectedCallback() {
    this.render();
    this._initFormListeners();
  }

  _initFormListeners() {
    const form = this._shadowRoot.querySelector('#addNoteForm');
    const titleInput = this._shadowRoot.querySelector('#title');
    const bodyInput = this._shadowRoot.querySelector('#body');
    const titleError = this._shadowRoot.querySelector('#titleError');
    const bodyError = this._shadowRoot.querySelector('#bodyError');
    const charCount = this._shadowRoot.querySelector('#charCount');

    const maxTitleLength = 50;

    const validateTitle = () => {
      const value = titleInput.value.trim();
      const currentLen = titleInput.value.length;
      charCount.textContent = `${currentLen}/${maxTitleLength}`;

      if (currentLen > maxTitleLength) {
        titleInput.value = titleInput.value.substring(0, maxTitleLength);
      }

      if (value.length === 0) {
        titleInput.classList.add('invalid');
        titleError.textContent = 'Judul catatan tidak boleh kosong!';
        titleError.classList.add('active');
        return false;
      } else {
        titleInput.classList.remove('invalid');
        titleError.classList.remove('active');
        return true;
      }
    };

    const validateBody = () => {
      const value = bodyInput.value.trim();
      if (value.length === 0) {
        bodyInput.classList.add('invalid');
        bodyError.textContent = 'Isi catatan tidak boleh kosong!';
        bodyError.classList.add('active');
        return false;
      } else {
        bodyInput.classList.remove('invalid');
        bodyError.classList.remove('active');
        return true;
      }
    };

    titleInput.addEventListener('input', validateTitle);
    bodyInput.addEventListener('input', validateBody);

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const isTitleValid = validateTitle();
      const isBodyValid = validateBody();

      if (isTitleValid && isBodyValid) {
        const title = titleInput.value.trim();
        const body = bodyInput.value.trim();

        this.dispatchEvent(
          new CustomEvent('add-note', {
            detail: { title, body },
            bubbles: true,
            composed: true,
          })
        );

        form.reset();
        charCount.textContent = `0/${maxTitleLength}`;
      }
    });
  }

  render() {
    this._shadowRoot.innerHTML = '';
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="form-card">
        <h2 class="form-title">Tambah Catatan Baru</h2>
        <form id="addNoteForm" novalidate>
          <div class="form-group">
            <label for="title">Judul Catatan</label>
            <input type="text" id="title" name="title" placeholder="Masukkan judul catatan..." maxlength="50" required />
            <div class="char-counter" id="charCount">0/50</div>
            <div class="error-message" id="titleError"></div>
          </div>

          <div class="form-group">
            <label for="body">Isi Catatan</label>
            <textarea id="body" name="body" placeholder="Tuliskan isi catatan Anda..." required></textarea>
            <div class="error-message" id="bodyError"></div>
          </div>

          <button type="submit">Buat Catatan</button>
        </form>
      </div>
    `;
  }
}

customElements.define('note-form', NoteForm);
