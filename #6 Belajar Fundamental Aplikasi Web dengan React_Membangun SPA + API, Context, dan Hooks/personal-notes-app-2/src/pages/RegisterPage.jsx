import { Link, useNavigate } from "react-router-dom";
import { LocaleConsumer } from "../context/LocaleContext";
import useInput from "../hooks/useInput";
import { useState } from "react";
import { register } from "../utils/api";

const RegisterPage = () => {
    const [name, onNameChange] = useInput("");
    const [email, onEmailChange] = useInput("");
    const [password, onPasswordChange] = useInput("");
    const [confirmPassword, onConfirmPasswordChange] = useInput("");

    const navigate = useNavigate();

    const onSubmitHandler = async () => {
        if (password !== confirmPassword) {
            alert("Password and password confirm must be same.");
            return;
        }

        const { error } = await register({ name, email, password });
        if (!error) {
            navigate("/");
        }
    };

    return (
        <LocaleConsumer>
            {({ locale }) => {
                return (
                    <section className="register-page">
                        <h2>{locale === "id" ? "Fill the form to register account." : "Isi form untuk mendaftar akun."}</h2>
                        <div className="input-register">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" value={name} onChange={onNameChange} />
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" value={email} onChange={onEmailChange} />
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" value={password} onChange={onPasswordChange} />
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" id="confirmPassword" value={confirmPassword} onChange={onConfirmPasswordChange} />
                            <button type="button" onClick={onSubmitHandler}>
                                Register
                            </button>
                        </div>

                        {locale === "id" ? (
                            <p>
                                Already have an account? <Link to="/">Login here</Link>
                            </p>
                        ) : (
                            <p>
                                Sudah punya akun? <Link to="/">Login di sini</Link>
                            </p>
                        )}
                    </section>
                );
            }}
        </LocaleConsumer>
    );
};

export default RegisterPage;
