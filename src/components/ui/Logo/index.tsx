import {Link} from 'react-router-dom';

import {ROUTES} from '@/utils/constants';

import styles from './Logo.module.scss';

const Logo = () => (
  <Link className={styles.logo} to={ROUTES.DASHBOARDS}>
    <span className={styles.emoji}>🎯</span>
    <span className={styles.text}>JamBoard</span>
  </Link>
);

export default Logo;
