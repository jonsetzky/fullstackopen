const TextInput = ({ id, label, value, setValue, type, labelClassName }) => {
  return (
    <div className="flex gap-2">
      <span className={labelClassName}>{label}</span>
      <input
        className="border-b outline-0"
        id={id}
        type={type || "text"}
        value={value}
        name={label}
        onChange={({ target }) => setValue(target.value)}
      />
    </div>
  );
};

export default TextInput;
