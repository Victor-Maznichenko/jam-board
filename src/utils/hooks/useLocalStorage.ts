import {useCallback, useEffect, useState} from 'react';

type UseLocalStorageReturn = [
  itemValue: string | null,
  setItemValue: (value: string) => void,
  removeItemValue: () => void,
];

interface UseLocalStorageParams {
  key: string;
  value?: string;
}

const useLocalStorage = ({key, value}: UseLocalStorageParams): UseLocalStorageReturn => {
  const [itemValue, setItemValue] = useState(value ?? localStorage.getItem(key) ?? null);

  const setLocalStorageItem = useCallback(
    (value: string) => {
      setItemValue(value);
      localStorage.setItem(key, value ?? '');
    },
    [key],
  );

  const removeLocalStorageItem = useCallback(() => {
    localStorage.removeItem(key);
    setItemValue(null);
  }, [key]);

  useEffect(() => {
    const updateState = (event: StorageEvent) => {
      if (key === event.key) setItemValue(event.newValue);
    };

    window.addEventListener('storage', updateState);
    return () => window.removeEventListener('storage', updateState);
  }, [key]);

  return [itemValue, setLocalStorageItem, removeLocalStorageItem];
};

export default useLocalStorage;
