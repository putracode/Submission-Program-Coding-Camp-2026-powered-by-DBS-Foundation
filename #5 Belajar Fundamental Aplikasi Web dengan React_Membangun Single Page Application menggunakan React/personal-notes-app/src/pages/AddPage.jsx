import React from "react";
import { addNote } from "../utils/local-data";
import { useNavigate } from "react-router-dom";
import ActionButton from "../components/ActionButton";

function AddPageWrapper() {
    const navigate = useNavigate();

    function onAddNoteHandler(note) {
        addNote(note);
        navigate("/");
    }

    return <AddPage onAddNote={onAddNoteHandler} />;
}

class AddPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            body: "",
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
        this.props.onAddNote(this.state);
    }

    render() {
        return (
            <section className="add-new-page">
                <h2>Tambah Catatan</h2>
                <div className="add-new-page__input">
                    <input className="add-new-page__input__title" placeholder="Catatan rahasia" value={this.state.title} onChange={this.onTitleChangeEventHandler} />
                    <div className="add-new-page__input__body" data-placeholder="Sebenarnya saya adalah ...." contentEditable value={this.state.body} onInput={this.onBodyChangeEventHandler} />
                </div>
                <div className="add-new-page__action">
                    <div className="add-new-page__action">
                        <ActionButton
                            title="Simpan"
                            onClick={() => this.props.onAddNote(this.state)}
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

export default AddPageWrapper;
