import { Link } from "react-router-dom";
import { LocaleConsumer } from "../context/LocaleContext";
import { FiLogOut, FiMoon, FiSun } from "react-icons/fi";
import { MdGTranslate } from "react-icons/md";
import { getUserLogged } from "../utils/api";

const Navigation = ({ logout, authedUser }) => {
    return (
        <LocaleConsumer>
            {({ locale, toggleLocale, theme, toggleTheme }) => {
                return (
                    <>
                        <h1>
                            <Link to="/">{locale === "id" ? "My Notes" : "Catatan Ku"}</Link>
                        </h1>

                        {authedUser && (
                            <nav className="navigation">
                                <ul>
                                    <li>
                                        <Link to="/archives">{locale === "id" ? "Archived" : "Terarsip"}</Link>
                                    </li>
                                </ul>
                            </nav>
                        )}

                        <button className="toggle-locale" type="button" onClick={toggleLocale}>
                            <MdGTranslate />
                        </button>

                        <button className="toggle-theme" type="button" onClick={toggleTheme}>
                            {theme === "dark" ? <FiSun size={"32px"} /> : <FiMoon size={"32px"} />}
                        </button>

                        {authedUser && (
                            <button className="button-logout" type="button" onClick={logout}>
                                <FiLogOut />
                                {authedUser.name}
                            </button>
                        )}
                    </>
                );
            }}
        </LocaleConsumer>
    );
};

export default Navigation;
