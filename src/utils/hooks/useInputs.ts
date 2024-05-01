import {ChangeEvent, useState} from 'react';

// react-hook-form делает почти тоже самое прикольно почитать
export const useInputs = <T = Record<string, string>>(initialValues: T) => {
  const [values, setValues] = useState(initialValues);

  const resetValues = () => {
    setValues(initialValues);
  };

  const handleChange = ({target: {value, name}}: ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues) => ({...prevValues, [name]: value}));
  };

  return {values, handleChange, resetValues};
};

// ssr routing next почтитать
