const SearchField = ({ setSearchFilter }) => (
  <div>
    find countries{" "}
    <input onChange={(event) => setSearchFilter(event.target.value)} />
  </div>
);
export default SearchField;
