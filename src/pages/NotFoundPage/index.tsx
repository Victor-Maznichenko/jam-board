import {useNavigate} from 'react-router-dom';

import Button from '@/components/ui/Button';

import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleBackward = () => navigate(-1);

  return (
    <main className={styles.notFound}>
      <div>
        <img className={styles.img} src="/images/not-found.webp" alt="Страница не найдена =(" />
        <Button className={styles.button} onClick={handleBackward}>
          Вернуться назад
        </Button>
      </div>
    </main>
  );
};

export default NotFoundPage;
