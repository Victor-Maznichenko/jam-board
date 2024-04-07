import {clearAuthError} from '@/store/user';

import Login from '@/components/Login';
import Register from '@/components/Register';
import Tabs from '@/components/ui/Tabs';

import styles from './AuthPage.module.scss';

// import { useNavigate } from "react-router-dom";

const tabsData = [
  {
    title: 'Вход',
    content: <Login />,
  },
  {
    title: 'Регистрация',
    content: <Register />,
  },
];

const AuthPage = () => (
  <main className={styles.auth}>
    <div className={styles.inner}>
      <Tabs className={styles.tabs} onTabChange={clearAuthError} tabsData={tabsData} />
    </div>
  </main>
);

export default AuthPage;
