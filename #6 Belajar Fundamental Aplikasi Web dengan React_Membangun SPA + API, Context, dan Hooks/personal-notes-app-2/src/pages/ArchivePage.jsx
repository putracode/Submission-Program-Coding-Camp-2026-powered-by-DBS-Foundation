import React, { useEffect, useState } from "react";
import { getArchivedNotes } from "../utils/api";
import SearchBar from "../components/SearchBar";
import { FiPlus } from "react-icons/fi";
import ActionButton from "../components/ActionButton";
import { Link, useSearchParams } from "react-router-dom";
import NoteItem from "../components/NoteItem";
import { LocaleConsumer } from "../context/LocaleContext";

const ArchivePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [keyword, setKeyword] = useState(() => {
        return searchParams.get("keyword") || "";
    });

    const onKeywordChangeHandler = (keyword) => {
        setKeyword(keyword);

        setSearchParams({ keyword });
    };

    const [notes, setNotes] = useState(null);

    useEffect(() => {
        const fetchNotes = async () => {
            const { data } = await getArchivedNotes();
            setNotes(data);
        };
        fetchNotes();
    }, []);

    const filteredNotes = notes ? notes.filter((note) => note.title.toLowerCase().includes(keyword.toLowerCase())) : [];

    return (
        <LocaleConsumer>
            {({ locale }) => {
                return (
                    <section className="homepage">
                        <h2> {locale === "id" ? "Archived Note" : "Catatan Arsip"}</h2>
                        <section className="search-bar">
                            <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
                        </section>

                        {notes === null ? (
                            <p>{locale === "id" ? "Loading notes ..." : "Memuat catatan..."} </p>
                        ) : filteredNotes.length > 0 ? (
                            <section className="notes-list">
                                {filteredNotes.map((note) => (
                                    <NoteItem key={note.id} note={note} />
                                ))}
                            </section>
                        ) : (
                            <div className="notes-list-empty">
                                <p>{locale === "id" ? "No notes found. " : "Tidak ada catatan."}</p>
                            </div>
                        )}

                        <div className="homepage__action">
                            <Link to="/notes/new">
                                <ActionButton title="Tambah">
                                    <FiPlus />
                                </ActionButton>
                            </Link>
                        </div>
                    </section>
                );
            }}
        </LocaleConsumer>
    );
};

export default ArchivePage;
