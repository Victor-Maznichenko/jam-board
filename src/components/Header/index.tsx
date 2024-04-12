import Logo from '@/components/ui/Logo';
import UserLink from '@/components/ui/UserLink';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          <Logo />
          <UserLink />
        </div>
      </div>
    </header>
  );
};

export default Header;
