import React from "react";
import { showFormattedDate } from "../utils";
import NoteActionButton from "./NoteActionButton";

function NoteItem({ note, onDelete, onArchive, searchKeyword }) {

    const highlightedText = (text, highlight) => {
        if (!highlight.trim()) return text;

        const regex = new RegExp(`(${highlight})`, "gi");
        const parts = text.split(regex);

        return parts.map((part, index) =>
            part.toLowerCase() === highlight.toLowerCase() ? (
                <mark key={index} data-testid="highlighted-text">
                    {part}
                </mark>
            ) : (
                part
            ),
        );
    };

    return (
        <div className="note-item" data-testid="note-item" data-note-id={note?.id}>
            <div className="note-item__content" data-testid="note-item-content">
                <h3 className="note-item__title" data-testid="note-item-title">
                    {highlightedText(note.title, searchKeyword)}
                </h3>
                <p className="note-item__date" data-testid="note-item-date">
                    {showFormattedDate(note.createdAt)}
                </p>
                <p className="note-item__body" data-testid="note-item-body">
                    {highlightedText(note.body, searchKeyword)}
                </p>
            </div>
            <div className="note-item__action" data-testid="note-item-action">
                <NoteActionButton variant="delete" onClick={() => onDelete(note.id)}>
                    Delete
                </NoteActionButton>

                <NoteActionButton variant="archive" onClick={() => onArchive(note.id)}>
                    {note.archive ? "Pindahkan" : "Arsipkan"}
                </NoteActionButton>
            </div>
        </div>
    );
}

export default NoteItem;
