import React from "react";
import { getAllNotes } from "../utils/local-data";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import { Link, useSearchParams } from "react-router-dom";
import NotesListEmpty from "../components/NoteListEmpty";

function ArchivePageWrapper() {
    const [searchParams, setSearchParams] = useSearchParams();

    const keyword = searchParams.get("keyword") || "";
    function changeSearchParams(keyword) {
        setSearchParams({ keyword });
    }

    return <ArchivePage defaultKeyword={keyword} keywordChange={changeSearchParams} />;
}

class ArchivePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: getAllNotes(),
            keyword: this.props.defaultKeyword || "",
        };

        this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
    }

    onKeywordChangeHandler(keyword) {
        this.setState(() => {
            return {
                keyword,
            };
        });

        this.props.keywordChange(keyword);
    }

    render() {
        const filteredNotes = this.state.notes.filter((note) => {
            return note.title.toLowerCase().includes(this.state.keyword.toLowerCase());
        });

        const archiveNotes = filteredNotes.filter((note) => note.archived);

        return (
            <>
                <h2>Catatan Arsip</h2>
                <div className="search-bar">
                    <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
                </div>

                {archiveNotes.length > 0 ? (
                    <div className="notes-list">
                        {archiveNotes.map((note) => {
                            return <NoteList key={note.id} note={note} />;
                        })}
                    </div>
                ) : (
                    <NotesListEmpty message="Tidak ada catatan arsip" />
                )}
            </>
        );
    }
}

export default ArchivePageWrapper;
