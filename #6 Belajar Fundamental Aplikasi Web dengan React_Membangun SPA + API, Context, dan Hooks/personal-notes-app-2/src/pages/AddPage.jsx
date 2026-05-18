import useInput from "../hooks/useInput";
import { addNote } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import ActionButton from "../components/ActionButton";
import { useState } from "react";

const AddPage = () => {
    const [title, onTitleChange] = useInput("");
    const [body, setBody] = useState('');

    const onBodyHandler = (event) => {
        setBody(event.target.innerHTML);
    }

    const navigate = useNavigate();

    const onSubmitHandler = async () => {
        const { error } = await addNote({ title, body });

        if (!error) {
            navigate("/");
        }
    };

    return (
        <section class="add-new-page">
            <div class="add-new-page__input">
                <input class="add-new-page__input__title" placeholder="Catatan rahasia" value={title} onChange={onTitleChange} />
                <div class="add-new-page__input__body" contenteditable="true" data-placeholder="Sebenarnya saya adalah ...." onInput={onBodyHandler}></div>
            </div>
            <div class="add-new-page__action">
                <ActionButton title="Simpan" onClickHandler={onSubmitHandler}>
                    <FiCheck />
                </ActionButton>
            </div>
        </section>
    );
};

export default AddPage;
