import Notes from '../data/local/notes.js';
import Utils from '../utils.js';

const home = () => {
  const activeNoteListElement = document.querySelector('#activeNoteList');
  const archivedNoteListElement = document.querySelector('#archivedNoteList');
  const activeEmptyElement = document.querySelector('#activeEmptyState');
  const archivedEmptyElement = document.querySelector('#archivedEmptyState');
  const renderNotes = () => {
    const allNotes = Notes.getAll();

    const activeNotes = allNotes.filter((note) => !note.archived);
    const archivedNotes = allNotes.filter((note) => note.archived);

    Utils.emptyElement(activeNoteListElement);
    if (activeNotes.length === 0) {
      Utils.showElement(activeEmptyElement);
    } else {
      Utils.hideElement(activeEmptyElement);
      activeNotes.forEach((note) => {
        const noteItem = document.createElement('note-item');
        noteItem.setAttribute('note-id', note.id);
        noteItem.setAttribute('title', note.title);
        noteItem.setAttribute('body', note.body);
        noteItem.setAttribute('created-at', note.createdAt);
        noteItem.setAttribute('archived', note.archived ? 'true' : 'false');
        activeNoteListElement.appendChild(noteItem);
      });
    }

    Utils.emptyElement(archivedNoteListElement);
    if (archivedNotes.length === 0) {
      Utils.showElement(archivedEmptyElement);
    } else {
      Utils.hideElement(archivedEmptyElement);
      archivedNotes.forEach((note) => {
        const noteItem = document.createElement('note-item');
        noteItem.setAttribute('note-id', note.id);
        noteItem.setAttribute('title', note.title);
        noteItem.setAttribute('body', note.body);
        noteItem.setAttribute('created-at', note.createdAt);
        noteItem.setAttribute('archived', note.archived ? 'true' : 'false');
        archivedNoteListElement.appendChild(noteItem);
      });
    }
  };

  document.addEventListener('add-note', (event) => {
    const { title, body } = event.detail;
    Notes.addNote({ title, body });
    renderNotes();
  });

  document.addEventListener('delete-note', (event) => {
    const { id } = event.detail;
    if (confirm('Apakah Anda yakin ingin menghapus catatan ini?')) {
      Notes.deleteNote(id);
      renderNotes();
    }
  });

  document.addEventListener('toggle-archive-note', (event) => {
    const { id } = event.detail;
    Notes.toggleArchiveNote(id);
    renderNotes();
  });

  renderNotes();
};

export default home;
