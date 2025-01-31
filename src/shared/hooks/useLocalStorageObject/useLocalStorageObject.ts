import useLocalStorage from '@shared/hooks/uselocalstorage';
import { LocalStorageObject } from './type';

const useLocalStorageObject = (
  keys: string[],
  initialValues: LocalStorageObject = {},
): LocalStorageObject => {
  const values: LocalStorageObject = {};

  keys.forEach((key: string) => {
    const [value] = useLocalStorage(key, initialValues[key] || '');
    values[key] = value;
  });

  localStorage.setItem('user', JSON.stringify(values));

  return values;
};

export default useLocalStorageObject;
