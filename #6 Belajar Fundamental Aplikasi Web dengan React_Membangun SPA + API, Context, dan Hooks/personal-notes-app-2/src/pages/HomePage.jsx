import React, { useEffect, useState } from "react";
import { getActiveNotes } from "../utils/api";
import SearchBar from "../components/SearchBar";
import { FiPlus } from "react-icons/fi";
import { Link, useSearchParams } from "react-router-dom";
import NoteItem from "../components/NoteItem";
import { LocaleConsumer } from "../context/LocaleContext";
import ActionButton from "../components/ActionButton";

const HomePage = () => {
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
            const { data } = await getActiveNotes();
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
                        <h2>{locale === "id" ? "Active Note" : "Catatan Aktif"} </h2>
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

export default HomePage;
