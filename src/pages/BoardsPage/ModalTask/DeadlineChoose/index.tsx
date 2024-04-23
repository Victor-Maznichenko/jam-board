import {Dispatch, SetStateAction} from 'react';

import {TaskStatus} from '@/api/types';

import Datepicker from '@/components/ui/Datepicker';

import styles from './DeadlineChoose.module.scss';

interface DeadlineChooseProps {
  className?: string;
  taskStatus: TaskStatus;
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}

const DeadlineChoose = ({className = '', taskStatus, date, setDate}: DeadlineChooseProps) => {
  if (taskStatus !== TaskStatus.Planned) return <></>;

  return (
    <div className={`${className} ${styles.deadline}`}>
      <p className={styles.text}>Выбрать срок:</p>
      <Datepicker date={date} setDate={setDate} minDate={new Date()} />
    </div>
  );
};

export default DeadlineChoose;
