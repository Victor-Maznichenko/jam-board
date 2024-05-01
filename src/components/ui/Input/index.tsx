import styles from './Input.module.scss';
import {InputProps} from './types';

const Input = ({
  className = '',
  error = '',
  placeholder = 'Введите текст...',
  ...attrs
}: InputProps) => (
  <div className={`${className} input-wrapper`}>
    <input className={`${styles.input} ${error && 'error'}`} placeholder={placeholder} {...attrs} />
    <span className={styles.error}>{error}</span>
  </div>
);

export default Input;
