import { useState, useEffect } from 'react';

const useLocalStorage = (
  key: string,
  initialValue: string = '',
): [string, (value: string) => void] => {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) || initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
