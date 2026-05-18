import React from "react";
import { editNote } from "../utils/local-data";
import { useNavigate, useParams } from "react-router-dom";
import ActionButton from "../components/ActionButton";
import { getNote } from "../utils/local-data";
import NotFoundPage from "./NotFoundPage";

function EditPageWrapper() {
    const navigate = useNavigate();
    const { id } = useParams();

    function onEditNoteHandler(note) {
        editNote(note);
        navigate(`/notes/${note.id}`);
    }

    return <EditPage id={id} onEditNote={onEditNoteHandler} />;
}

class EditPage extends React.Component {
    constructor(props) {
        super(props);

        const note = getNote(props.id);

        this.state = {
            id: note ? note.id : null,
            title: note?.title || "",
            body: note?.body || "",
        };

        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
        this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }

    onTitleChangeEventHandler(event) {
        this.setState(() => {
            return {
                title: event.target.value,
            };
        });
    }

    onBodyChangeEventHandler(event) {
        this.setState(() => {
            return {
                body: event.target.innerHTML,
            };
        });
    }

    onSubmitEventHandler() {
        this.props.onEditNote(this.state);
    }

    render() {
        if (this.state.id === null) {
            return <NotFoundPage />;
        }
        return (
            <section className="add-new-page">
                <h2>Edit Catatan</h2>
                <div className="add-new-page__input">
                    <input className="add-new-page__input__title" placeholder="Catatan rahasia" value={this.state.title} onChange={this.onTitleChangeEventHandler} />
                    <div className="add-new-page__input__body" data-placeholder="Sebenarnya saya adalah ...." contentEditable dangerouslySetInnerHTML={{ __html: this.state.body }} onInput={this.onBodyChangeEventHandler} />
                </div>
                <div className="add-new-page__action">
                    <div className="add-new-page__action">
                        <ActionButton
                            title="Simpan"
                            onClick={() => this.props.onEditNote(this.state)}
                            icon={
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
                                </svg>
                            }
                        />
                    </div>
                </div>
            </section>
        );
    }
}

export default EditPageWrapper;
