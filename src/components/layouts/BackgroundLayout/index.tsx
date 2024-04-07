import {Outlet} from 'react-router-dom';

import styles from './BackgroundLayout.module.scss';

const BackgroundLayout = ({url = '/images/main_background.gif'}) => {
  return (
    <div className={styles.backgroundLayout}>
      <img className={styles.img} loading="lazy" src={url} alt="" />
      <Outlet />
    </div>
  );
};

export default BackgroundLayout;
