import Swal from 'sweetalert2';
import NotesApi from '../data/api/notes-api.js';
import Utils from '../utils.js';

const home = () => {
  const activeNoteListElement = document.querySelector('#activeNoteList');
  const archivedNoteListElement = document.querySelector('#archivedNoteList');
  const activeEmptyElement = document.querySelector('#activeEmptyState');
  const archivedEmptyElement = document.querySelector('#archivedEmptyState');
  const loadingIndicator = document.querySelector('loading-indicator');

  const showLoading = () => {
    if (loadingIndicator) {
      loadingIndicator.setAttribute('loading', 'true');
    }
  };

  const hideLoading = () => {
    if (loadingIndicator) {
      loadingIndicator.setAttribute('loading', 'false');
    }
  };

  const loadNotes = async () => {
    showLoading();
    try {
      const [activeNotes, archivedNotes] = await Promise.all([
        NotesApi.getNotes(),
        NotesApi.getArchivedNotes(),
      ]);

      renderActiveNotes(activeNotes);
      renderArchivedNotes(archivedNotes);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Memuat Catatan',
        text: error.message || 'Terjadi kesalahan saat menghubungi server.',
      });
    } finally {
      hideLoading();
    }
  };

  const renderActiveNotes = (notes) => {
    Utils.emptyElement(activeNoteListElement);

    if (!notes || notes.length === 0) {
      Utils.showElement(activeEmptyElement);
    } else {
      Utils.hideElement(activeEmptyElement);
      notes.forEach((note) => {
        const noteItem = document.createElement('note-item');
        noteItem.setAttribute('note-id', note.id);
        noteItem.setAttribute('title', note.title);
        noteItem.setAttribute('body', note.body);
        noteItem.setAttribute('created-at', note.createdAt);
        noteItem.setAttribute('archived', 'false');
        activeNoteListElement.appendChild(noteItem);
      });
    }
  };

  const renderArchivedNotes = (notes) => {
    Utils.emptyElement(archivedNoteListElement);

    if (!notes || notes.length === 0) {
      Utils.showElement(archivedEmptyElement);
    } else {
      Utils.hideElement(archivedEmptyElement);
      notes.forEach((note) => {
        const noteItem = document.createElement('note-item');
        noteItem.setAttribute('note-id', note.id);
        noteItem.setAttribute('title', note.title);
        noteItem.setAttribute('body', note.body);
        noteItem.setAttribute('created-at', note.createdAt);
        noteItem.setAttribute('archived', 'true');

        archivedNoteListElement.appendChild(noteItem);
      });
    }
  };

  document.addEventListener('add-note', async (event) => {
    const { title, body } = event.detail;
    showLoading();

    try {
      await NotesApi.createNote({ title, body });
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Catatan baru berhasil ditambahkan.',
        timer: 1500,
        showConfirmButton: false,
      });
      await loadNotes();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Menambah Catatan',
        text: error.message || 'Terjadi kesalahan saat menyimpan catatan.',
      });
    } finally {
      hideLoading();
    }
  });

  document.addEventListener('delete-note', async (event) => {
    const { id } = event.detail;

    const result = await Swal.fire({
      title: 'Hapus Catatan?',
      text: 'Catatan yang dihapus tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      showLoading();
      try {
        await NotesApi.deleteNote(id);
        Swal.fire({
          icon: 'success',
          title: 'Terhapus!',
          text: 'Catatan berhasil dihapus.',
          timer: 1500,
          showConfirmButton: false,
        });
        await loadNotes();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal Menghapus',
          text: error.message || 'Terjadi kesalahan saat menghapus catatan.',
        });
      } finally {
        hideLoading();
      }
    }
  });

  document.addEventListener('toggle-archive-note', async (event) => {
    const { id } = event.detail;
    const allNotes = [...activeNoteListElement.children, ...archivedNoteListElement.children];
    const targetElement = Array.from(allNotes).find((el) => el.getAttribute('note-id') === id);

    const isArchived = targetElement ? targetElement.getAttribute('archived') === 'true' : false;

    showLoading();
    try {
      if (isArchived) {
        await NotesApi.unarchiveNote(id);
        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Catatan dipindahkan dari arsip ke aktif.',
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await NotesApi.archiveNote(id);
        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Catatan berhasil diarsipkan.',
          timer: 1500,
          showConfirmButton: false,
        });
      }
      await loadNotes();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Mengubah Status Arsip',
        text: error.message || 'Terjadi kesalahan pada server.',
      });
    } finally {
      hideLoading();
    }
  });

  loadNotes();
};

export default home;
