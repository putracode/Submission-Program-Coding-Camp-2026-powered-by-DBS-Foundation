import React from "react";
import NoteItem from "./NoteItem";

function NotesList({ notes, onDelete, onArchive, dataTestId = "notes-list" , searchKeyword}) {
    const hasNotes = notes.length > 0;

    if (!hasNotes) {
        return (
            <div className="notes-list" data-testid={dataTestId}>
                <p className="notes-list__empty-message" data-testid={`${dataTestId}-empty`}>
                    Tidak ada catatan
                </p>
            </div>
        );
    }

    const getMonthYearLabel = (dateString) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            month: "long",
            year: "numeric",
        });
    };

    const groups = {};
    notes.forEach((note) => {
        const label = getMonthYearLabel(note.createdAt);
        if (!groups[label]) {
            groups[label] = [];
        }
        groups[label].push(note);
    });

    const groupLabels = Object.keys(groups);

    return (
        <div className={`notes-list notes-list--grouped`} data-testid={dataTestId}>
            {groupLabels.map((label) => (
                <section key={label} className="notes-group" data-testid={`${dataTestId}-group`}>

                    <header className="notes-group__header">
                        <h3 className="notes-group__title">{label}</h3>
                        <span className="notes-group__count" data-testid={`${dataTestId}-group-count`}>
                            {groups[label].length} catatan
                        </span>
                    </header>

                    <div className="notes-group__items">
                        {groups[label].map((note) => (
                            <NoteItem key={note.id} note={note} onDelete={onDelete} onArchive={onArchive} searchKeyword={searchKeyword}/>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}

export default NotesList;
