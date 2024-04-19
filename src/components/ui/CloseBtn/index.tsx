import Icon from '@/components/ui/Icon';

import styles from './CloseBtn.module.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CloseBtn = ({className = '', width = 20, height = 20, ...props}) => {
  return (
    <button className={`${className} ${styles.closeBtn}`} type="button" {...props}>
      <Icon name="close" width={width} height={height} />
    </button>
  );
};

export default CloseBtn;
