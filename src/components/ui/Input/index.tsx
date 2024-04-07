import {InputHTMLAttributes} from 'react';

import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
}

const Input = ({
  className = '',
  error = '',
  placeholder = 'Введите текст...',
  ...attrs
}: InputProps) => (
  <div className={`${className} input-wrapper`}>
    <input
      className={`${styles.input} ${className} ${error && 'error'}`}
      placeholder={placeholder}
      {...attrs}
    />
    <span className={styles.error}>{error}</span>
  </div>
);

export default Input;
