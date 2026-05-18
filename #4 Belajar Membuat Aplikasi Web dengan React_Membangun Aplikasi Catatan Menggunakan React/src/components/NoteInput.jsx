import React from "react";

class NoteInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            body: "",
            errorMessage: "",
        };

        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
        this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }

    onTitleChangeEventHandler(event) {
        this.setState(() => {
            return {
                title: event.target.value.slice(0, 50),
                errorMessage: "",
            };
        });

        console.warn("[TODO] Handle title change", event.target.value);
    }

    onBodyChangeEventHandler(event) {
        this.setState(() => {
            return {
                body: event.target.value,
                errorMessage: "",
            };
        });

        console.warn("[TODO] Handle body change", event.target.value);
    }

    onSubmitEventHandler(event) {
        event.preventDefault();

        if (this.state.body.length > 10) {
            this.props.addNote(this.state);

            this.setState(() => {
                return {
                    title: "",
                    body: "",
                    errorMessage: "",
                };
            });
        } else {
            this.setState(() => {
                return {
                    errorMessage: "Isi catatan minimal harus 10 karakter.",
                };
            });
        }

        console.warn("[TODO] Submit note", this.state);
    }

    render() {
        const limit = 50;
        const remainingChars = limit - this.state.title.length;

        const limitWarning = remainingChars <= 10 ? "note-input__title__char-limit--warn" : "";
        return (
            <div className="note-input" data-testid="note-input">
                <h2>Buat catatan</h2>

                <p className="note-input__feedback--error">{this.state.errorMessage}</p>
                <form onSubmit={this.onSubmitEventHandler} data-testid="note-input-form">
                    <p className={`note-input__title__char-limit ${limitWarning}`} data-testid="note-input-title-remaining">
                        Sisa karakter: {remainingChars}
                    </p>
                    <input className="note-input__title" type="text" placeholder="Ini adalah judul ..." value={this.state.title} onChange={this.onTitleChangeEventHandler} required data-testid="note-input-title-field" />
                    <textarea className="note-input__body" placeholder="Tuliskan catatanmu di sini ..." value={this.state.body} onChange={this.onBodyChangeEventHandler} required data-testid="note-input-body-field" />
                    <button type="submit" data-testid="note-input-submit-button">
                        Buat
                    </button>
                </form>
            </div>
        );
    }
}

export default NoteInput;
