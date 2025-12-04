const SearchField = ({ setSearchFilter }) => (
  <div>
    filter shown with{" "}
    <input onChange={(event) => setSearchFilter(event.target.value)} />
  </div>
);
export default SearchField;
