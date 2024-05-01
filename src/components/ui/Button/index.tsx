import {forwardRef} from 'react';

import styles from './Button.module.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({className = '', children, type = 'button', ...props}, ref) => {
    return (
      <button
        className={`${className} ${styles.button}`}
        type={type}
        // style={{}}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
