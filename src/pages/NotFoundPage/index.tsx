import {useNavigate} from 'react-router-dom';

import {ROUTES} from '@/utils/constants';

import Button from '@/components/ui/Button';

import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleBackward = () => navigate(-1);
  const handleHome = () => navigate(ROUTES.Projects);

  return (
    <main className={styles.notFound}>
      <div>
        <img className={styles.img} src="/images/not-found.webp" alt="Страница не найдена =(" />
        <Button className={styles.button} onClick={handleHome}>
          На главную
        </Button>
        <Button className={styles.button} onClick={handleBackward}>
          Вернуться назад
        </Button>
      </div>
    </main>
  );
};

export default NotFoundPage;
