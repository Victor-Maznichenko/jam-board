import {useUnit} from 'effector-react';
import {ChangeEvent, FormEvent, useState} from 'react';
import {useParams} from 'react-router-dom';

import $userState from '@/store/profile';
import {createTaskFx} from '@/store/tasks';

import Modal from '@/components/Modal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';

import styles from './ModalAddTask.module.scss';

interface ModalAddTaskProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

const ModalAddTask = ({isModalOpen, closeModal}: ModalAddTaskProps) => {
  const {user} = useUnit($userState);
  const projectID = useParams().projectID ?? '';
  const [values, setValues] = useState({
    title: '',
    description: '',
  });

  const handleChange = ({
    target: {value, name},
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({...values, [name]: value});
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // if() premited role
    createTaskFx({
      projectID,
      authorName: user.displayName,
      ...values,
    });
    closeModal();
  };

  return (
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
    </Modal>
  );
};

export default ModalAddTask;
