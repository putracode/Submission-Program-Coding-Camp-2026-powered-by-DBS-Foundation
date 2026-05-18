const SearchBar = ({ keyword, keywordChange }) => {
    return <input type="text" placeholder="Cari berdasarkan judul ..." value={keyword} onChange={(event) => keywordChange(event.target.value)} />;
};

export default SearchBar;
