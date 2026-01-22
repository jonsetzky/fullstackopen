const TextInput = ({ id, label, value, setValue }) => {
  return (
    <div>
      {label}
      <input
        id={id}
        type="text"
        value={value}
        name={label}
        onChange={({ target }) => setValue(target.value)}
      />
    </div>
  );
};

export default TextInput;
