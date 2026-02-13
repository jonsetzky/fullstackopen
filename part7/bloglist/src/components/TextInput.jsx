const TextInput = ({
  id,
  label,
  value,
  setValue,
  type,
  labelClassName,
  placeholder,
}) => {
  return (
    <div className="flex gap-2">
      <span className={labelClassName}>{label}</span>
      <input
        id={id}
        type={type || "text"}
        value={value}
        name={label}
        placeholder={placeholder}
        onChange={({ target }) => setValue(target.value)}
      />
    </div>
  );
};

export default TextInput;
