import { useEffect, useState } from "react";

export const useField = (type) => {
  const intialValue = "";
  const [value, setValue] = useState(intialValue);

  const handleChange = (e) => setValue(e.target.value);

  return { value, type, onChange: handleChange };
};

export const useMediaQuery = (query) => {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    const matchQueryList = window.matchMedia(query);
    function handleChange(e) {
      setIsMatch(e.matches);
    }

    handleChange(matchQueryList);
    matchQueryList.addEventListener("change", handleChange);
    return () => {
      matchQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);
  return isMatch;
};
