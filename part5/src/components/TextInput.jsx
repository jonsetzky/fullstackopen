const TextInput = ({ label, value, setValue }) => {
  return (
    <div>
      {label}
      <input
        type="text"
        value={value}
        name={label}
        onChange={({ target }) => setValue(target.value)}
      />
    </div>
  );
};

export default TextInput;
