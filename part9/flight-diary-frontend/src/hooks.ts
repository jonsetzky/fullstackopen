import React, { useState } from "react";

export const useField = (type: React.HTMLInputTypeAttribute) => {
  const [value, setValue] = useState("");

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setValue(event.target.value);
  };

  const reset = () => setValue("");

  return {
    type,
    value,
    onChange,
    reset,
  };
};
