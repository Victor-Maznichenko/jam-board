import Logo from '@/components/ui/Logo';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';

import styles from './Header.module.scss';
import UserLink from './UserLink';

const Header = () => (
  <header className={styles.header}>
    <div className="container">
      <div className={styles.inner}>
        <Logo />
        <div className={styles.actions}>
          <ThemeSwitcher className={styles.themeSwither} />
          <UserLink />
        </div>
      </div>
    </div>
  </header>
);

export default Header;
