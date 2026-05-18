import { LocaleConsumer } from "../context/LocaleContext";
import PropTypes from "prop-types";

const SearchBar = ({ keyword, keywordChange }) => {
    return (
        <LocaleConsumer>
            {({ locale }) => {
                return <input type="text" placeholder={locale === "id" ? "Search by title ..." : "Cari berdasarkan judul ..."} value={keyword} onChange={(event) => keywordChange(event.target.value)} />;
            }}
        </LocaleConsumer>
    );
};

SearchBar.propTypes = {
    keyword: PropTypes.string.isRequired,
    keywordChange: PropTypes.func.isRequired,
};

export default SearchBar;
