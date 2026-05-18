import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { archiveNote, getNote, unarchiveNote } from "../utils/local-data";
import { showFormattedDate } from "../utils";
import { deleteNote } from "../utils/local-data";
import ActionButton from "../components/ActionButton";
import NotFoundPage from "./NotFoundPage";

const DetailPageWrapper = () => {
    const navigate = useNavigate();

    function onArchiveHandler(id) {
        const note = getNote(id);

        !note.archived ? archiveNote(id) : unarchiveNote(id);
        navigate("/");
    }

    function onDeleteHandler(id) {
        deleteNote(id);
        navigate("/");
    }

    const { id } = useParams();

    return <DetailPage id={id} onDelete={onDeleteHandler} onArchive={onArchiveHandler} />;
};

class DetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            note: getNote(props.id),
        };
    }

    render() {
        if (!this.state.note) {
            return <NotFoundPage />;
        }

        const { id, title, createdAt, body, archived } = this.state.note;

        return (
            <section className="detail-page">
                <h3 className="detail-page__title">{title}</h3>
                <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
                <div className="detail-page__body">{body}</div>
                <div className="detail-page__action">
                    <ActionButton
                        title={archived ? "Aktifkan" : "Arsipkan"}
                        onClick={() => this.props.onArchive(id)}
                        icon={
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.81.97H5.44l.8-.97zM5 19V8h14v11H5zm8.45-9h-2.9v3H8l4 4 4-4h-2.55z"></path>
                            </svg>
                        }
                    />
                    <Link to={`/notes/${id}/edit`}>
                        <ActionButton
                            title="Edit"
                            icon={
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                                </svg>
                            }
                        />
                    </Link>
                    <ActionButton
                        title="Hapus"
                        onClick={() => this.props.onDelete(id)}
                        icon={
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"></path>
                            </svg>
                        }
                    />
                </div>
            </section>
        );
    }
}

export default DetailPageWrapper;
