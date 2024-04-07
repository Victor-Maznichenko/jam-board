import {forwardRef} from 'react';

import styles from './Button.module.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({className = '', children, type = 'button', ...props}, ref) => {
    return (
      <button
        id="button"
        className={`${className} ${styles.button}`}
        type={type}
        style={{}}
        {...props}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
