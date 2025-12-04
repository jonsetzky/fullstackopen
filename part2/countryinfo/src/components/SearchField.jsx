const SearchField = ({ setSearchFilter, value }) => (
  <div>
    find countries{" "}
    <input
      value={value}
      onChange={(event) => setSearchFilter(event.target.value)}
    />
  </div>
);
export default SearchField;
