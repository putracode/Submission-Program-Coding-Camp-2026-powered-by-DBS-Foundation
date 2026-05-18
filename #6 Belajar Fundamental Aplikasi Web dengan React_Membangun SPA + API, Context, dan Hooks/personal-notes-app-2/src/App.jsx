import React, { useEffect, useMemo } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import LoginPage from "./pages/LoginPage";
import { getUserLogged, putAccessToken } from "./utils/api";
import { LocaleProvider } from "./context/LocaleContext";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import DetailPage from "./pages/DetailPage";
import AddPage from "./pages/AddPage";
import ArchivePage from "./pages/ArchivePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
    const [authedUser, setAuthedUser] = React.useState(null);
    const [initializing, setInitializing] = React.useState(true);
    const [locale, setLocale] = React.useState(localStorage.getItem("locale") || "id");

    const [theme, setTheme] = React.useState(localStorage.getItem("theme") || "dark");

    const toggleLocale = () => {
        setLocale((prevLocale) => {
            const newLocale = prevLocale === "id" ? "en" : "id";
            localStorage.setItem("locale", newLocale);
            return newLocale;
        });
    };

    const toggleTheme = () => {
        setTheme((prevState) => {
            const newTheme = prevState === "dark" ? "light" : "dark";
            localStorage.setItem("theme", newTheme);
            return newTheme;
        });
    };

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const onLoginSuccess = async ({ accessToken }) => {
        putAccessToken(accessToken);
        const { data } = await getUserLogged();
        setAuthedUser(data);
    };

    const navigate = useNavigate();
    const onLogout = () => {
        navigate("/");
        setAuthedUser(null);
        putAccessToken("");
    };

    const localeContextValue = useMemo(() => {
        return {
            locale,
            toggleLocale,
            theme,
            toggleTheme,
        };
    }, [locale, theme]);

    useEffect(() => {
        async function fetchUser() {
            const { data } = await getUserLogged();
            setAuthedUser(data);
            setInitializing(false);
        }

        fetchUser();
    }, []);

    if (initializing) {
        return null;
    }

    return (
        <LocaleProvider value={localeContextValue}>
            <div className="app-container">
                <header>
                    <Navigation logout={onLogout} authedUser={authedUser} />
                </header>
                <main>
                    {authedUser === null ? (
                        <Routes>
                            <Route path="/*" element={<LoginPage loginSuccess={onLoginSuccess} />} />
                            <Route path="/register" element={<RegisterPage />} />
                        </Routes>
                    ) : (
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/notes/new" element={<AddPage />} />
                            <Route path="/notes/:id" element={<DetailPage />} />
                            <Route path="/archives" element={<ArchivePage />} />
                            <Route path="/*" element={<NotFoundPage />} />
                        </Routes>
                    )}
                </main>
            </div>
        </LocaleProvider>
    );
}

export default App;
