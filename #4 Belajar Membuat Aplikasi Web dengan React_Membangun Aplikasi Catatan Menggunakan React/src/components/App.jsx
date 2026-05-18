import React from "react";
import { getInitialData } from "../utils";
import NoteInput from "./NoteInput";
import NotesList from "./NotesList";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: getInitialData(),

            searchKeyword: "",
        };

        this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onArchiveHandler = this.onArchiveHandler.bind(this);
        this.onSearchHandler = this.onSearchHandler.bind(this);
    }

    onAddNoteHandler({ title, body }) {
        this.setState((prevState) => {
            return {
                notes: [
                    ...prevState.notes,
                    {
                        id: +new Date(),
                        title,
                        body,
                        archived: false,
                        createdAt: new Date().toISOString(),
                    },
                ],
            };
        });

        console.warn("[TODO] Implement onAddNoteHandler", { title, body });
    }

    onDeleteHandler(id) {
        const notes = this.state.notes.filter((note) => note.id !== id);

        this.setState({ notes });
        console.warn("[TODO] Implement onDeleteHandler", { id });
    }

    onArchiveHandler(id) {
        const notes = this.state.notes.map((note) => {
            if (note.id === id) {
                return { ...note, archived: !note.archived };
            }

            return note;
        });

        this.setState({ notes });
        console.warn("[TODO] Implement onArchiveHandler", { id });
    }

    onSearchHandler(event) {
        const keyword = event.target.value;
        this.setState({ searchKeyword: keyword });
        console.warn("[TODO] Implement onSearchHandler", { keyword });
    }

    render() {
        const { notes, searchKeyword } = this.state;

        const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(searchKeyword.toLowerCase()));

        const activeNotes = filteredNotes.filter((note) => !note.archived).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const archivedNotes = filteredNotes.filter((note) => note.archived).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return (
            <div className="note-app" data-testid="note-app">
                <div className="note-app__header" data-testid="note-app-header">
                    <h1>Notes</h1>
                    <div class="note-search" data-testid="note-search">
                        <input placeholder="Cari berdasarkan judul ..." aria-label="Cari catatan berdasarkan judul" data-testid="note-search-input" type="text" value={this.state.searchKeyword} onChange={this.onSearchHandler} />
                    </div>
                </div>
                <div className="note-app__body" data-testid="note-app-body">
                    <NoteInput addNote={this.onAddNoteHandler} />
                    <section aria-labelledby="active-notes-title" data-testid="active-notes-section">
                        <h2 id="active-notes-title">Catatan Aktif ({activeNotes.length})</h2>
                        <NotesList notes={activeNotes} onDelete={this.onDeleteHandler} onArchive={this.onArchiveHandler} dataTestId="active-notes-list" searchKeyword={searchKeyword}/>
                    </section>
                    <section aria-labelledby="archived-notes-title" data-testid="archived-notes-section">
                        <h2 id="archived-notes-title">Arsip ({archivedNotes.length})</h2>
                        <NotesList notes={archivedNotes} onDelete={this.onDeleteHandler} onArchive={this.onArchiveHandler} dataTestId="archived-notes-list" searchKeyword={searchKeyword}/>
                    </section>
                </div>
            </div>
        );
    }
}

export default App;
