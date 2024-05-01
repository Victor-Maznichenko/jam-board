import {TaskStatus} from '@/api/constants';

import {ModalTaskProps} from '../../types';
import ModalTaskCompleted from './parts/ModalTaskCompleted';
import ModalTaskPlanned from './parts/ModalTaskPlanned';
import ModalTaskProgress from './parts/ModalTaskProgress';

const ModalTask = (props: ModalTaskProps) => {
  const status = props.task.status;
  return (
    <>
      {status === TaskStatus.Planned && <ModalTaskPlanned {...props} />}
      {status === TaskStatus.Progress && <ModalTaskProgress {...props} />}
      {status === TaskStatus.Completed && <ModalTaskCompleted {...props} />}
    </>
  );
};

export default ModalTask;
