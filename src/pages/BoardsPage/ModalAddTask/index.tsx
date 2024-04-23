import {useUnit} from 'effector-react';
import {ChangeEvent, FormEvent, useState} from 'react';
import ReactDOM from 'react-dom';
import {useParams} from 'react-router-dom';

import {createTaskFx} from '@/store/boards';
import $userState from '@/store/user';

import Modal from '@/components/Modal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';

import styles from './ModalAddTask.module.scss';

interface ModalAddTaskProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

const portal = document.getElementById('modal');

const ModalAddTask = ({isModalOpen, closeModal}: ModalAddTaskProps) => {
  const {projectID} = useParams();
  const {user} = useUnit($userState);
  const [values, setValues] = useState({
    title: '',
    description: '',
  });

  if (!portal || !user || !projectID) return <></>;

  const handleChange = ({target: {value, name}}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({...values, [name]: value});
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    createTaskFx({
      projectID,
      task: {
        authorName: user.displayName,
        ...values,
      },
    });
    closeModal();
  };

  return ReactDOM.createPortal(
    <Modal isModalOpen={isModalOpen} closeModal={closeModal}>
      <h2 className={styles.title}>Создать задачу</h2>
      <form onSubmit={handleSubmit}>
        <Input
          className={styles.input}
          onChange={handleChange}
          placeholder="Название задачи"
          name="title"
          required
        />
        <TextArea
          className={styles.textarea}
          onChange={handleChange}
          placeholder="Описание задачи"
          name="description"
        />
        <Button className={styles.button} type="submit">
          Создать задачу
        </Button>
      </form>
    </Modal>,
    portal,
  );
};

export default ModalAddTask;
