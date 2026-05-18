import React from "react";
import { LocaleConsumer } from "../context/LocaleContext";
import { login } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";

const LoginPage = ({ loginSuccess }) => {
    const [email, onChangeEmail] = useInput("");
    const [password, onChangePassword] = useInput("");

    const navigation = useNavigate();

    const onSubmitHandler = async () => {
        const { error, data } = await login({ email, password });

        if (!error) {
            loginSuccess(data);
            navigation("/");
        }
    };

    return (
        <LocaleConsumer>
            {({ locale }) => {
                return (
                    <section className="login-page">
                        <h2>{locale === "id" ? "Login to use app, please." : "Yuk, login untuk menggunakan aplikasi."}</h2>
                        <div className="input-login">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" value={email} onChange={onChangeEmail} />
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" value={password} onChange={onChangePassword} />
                            <button type="button" onClick={onSubmitHandler}>
                                Login
                            </button>
                        </div>
                        {locale === "id" ? (
                            <p>
                                Don't have an account? <Link to={"/register"}>Register here</Link>
                            </p>
                        ) : (
                            <p>
                                Belum punya akun? <Link to={"/register"}>Daftar di sini</Link>
                            </p>
                        )}
                    </section>
                );
            }}
        </LocaleConsumer>
    );
};

export default LoginPage;
