import {useState} from 'react';

import Icon from '@/components/ui/Icon';

import {TaskFilter} from '../../types';
import styles from './ButtonFilter.module.scss';

interface ButtonFilterProps {
  filter: TaskFilter;
}

const ButtonFilter = ({filter}: ButtonFilterProps) => {
  const [isFilterActive, setIsFilterActive] = useState(false);

  const handleClick = () => {
    if (isFilterActive) filter.handleClick();
    setIsFilterActive(!isFilterActive);
  };

  return (
    <button className={styles.button} onClick={handleClick} type="button" key={filter.id}>
      <Icon width={18} height={18} name="filter" />
      {filter.title}
    </button>
  );
};

export default ButtonFilter;
