import {Outlet} from 'react-router-dom';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

import styles from './MainLayout.module.scss';

const MainLayout = () => (
  <div className={styles.wrapper}>
    <Header />
    <div className={styles.grow}>
      <Outlet />
    </div>
    <Footer />
  </div>
);

export default MainLayout;
