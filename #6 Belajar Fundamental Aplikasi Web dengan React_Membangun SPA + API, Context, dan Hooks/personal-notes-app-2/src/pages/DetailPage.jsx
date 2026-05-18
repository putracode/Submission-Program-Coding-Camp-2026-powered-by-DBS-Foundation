import { RiInboxArchiveLine, RiInboxUnarchiveLine } from "react-icons/ri";
import { FiTrash2 } from "react-icons/fi";
import { useEffect, useState } from "react";
import { getNote, archiveNote, deleteNote, unarchiveNote } from "../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { showFormattedDate } from "../utils";
import NotFoundPage from "./NotFoundPage";
import ActionButton from "../components/ActionButton";
import parser from "html-react-parser";

const DetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);

    useEffect(() => {
        const fetchNote = async () => {
            const { data } = await getNote(id);
            setNote(data || false);
        };

        fetchNote();
    }, [id]);

    const onArchiveHandler = async () => {
        !note.archived ? await archiveNote(id) : await unarchiveNote(id);

        note.archived ? navigate("/archives") : navigate("/");
    };

    const onDeleteHandler = async () => {
        await deleteNote(id);

        note.archived ? navigate("/archives") : navigate("/");
    };

    if (note === false) {
        return <NotFoundPage />;
    }

    return (
        <section className="detail-page">
            {!note ? (
                <></>
            ) : (
                <>
                    <h3 className="detail-page__title">{note.title}</h3>
                    <p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
                    <div className="detail-page__body">{parser(note.body)}</div>
                    <div className="detail-page__action">
                        <ActionButton title={note.archived ? "Aktifkan" : "Arsipkan"} onClickHandler={onArchiveHandler}>
                            {note.archived ? <RiInboxUnarchiveLine /> : <RiInboxArchiveLine />}
                        </ActionButton>
                        <ActionButton title="Hapus" onClickHandler={onDeleteHandler}>
                            <FiTrash2 />
                        </ActionButton>
                    </div>
                </>
            )}
        </section>
    );
};

export default DetailPage;
