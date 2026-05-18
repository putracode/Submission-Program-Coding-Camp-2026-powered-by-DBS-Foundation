import React from "react";
import { getAllNotes } from "../utils/local-data";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import { Link, useSearchParams } from "react-router-dom";
import ActionButton from "../components/ActionButton";
import NotesListEmpty from "../components/NoteListEmpty";

function HomePageWrapper() {
    const [searchParams, setSearchParams] = useSearchParams();

    const keyword = searchParams.get("keyword") || "";
    function changeSearchParams(keyword) {
        setSearchParams({ keyword });
    }

    return <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />;
}

class HomePage extends React.Component {
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

        const activeNotes = filteredNotes.filter((note) => !note.archived);

        return (
            <>
                <h2>Catatan Aktif</h2>
                <div className="search-bar">
                    <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
                </div>
                {activeNotes.length > 0 ? (
                    <div className="notes-list">
                        {activeNotes.map((note) => (
                            <NoteList key={note.id} note={note} />
                        ))}
                    </div>
                ) : (
                    <NotesListEmpty message="Tidak ada catatan aktif" />
                )}
                <div className="homepage__action">
                    <Link to="/notes/new">
                        <ActionButton
                            title="Tambah"
                            icon={
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                </svg>
                            }
                        />
                    </Link>
                </div>
            </>
        );
    }
}

export default HomePageWrapper;
