import Icon from '@/components/ui/Icon';

import styles from './CloseBtn.module.scss';
import {CloseBtnProps} from './types';

const CloseBtn = ({className = '', width = 20, height = 20, ...props}: CloseBtnProps) => {
  return (
    <button className={`${className} ${styles.closeBtn}`} type="button" {...props}>
      <Icon name="close" width={width} height={height} />
    </button>
  );
};

export default CloseBtn;
