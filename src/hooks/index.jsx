import { useState } from "react";

export const useField = (type) => {
  const intialValue = "";
  const [value, setValue] = useState(intialValue);

  const handleChange = (e) => setValue(e.target.value);

  return { value, type, onChange: handleChange };
};
