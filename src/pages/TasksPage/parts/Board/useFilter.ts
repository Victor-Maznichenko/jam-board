import {useUnit} from 'effector-react';

import {TaskStatus} from '@/api/constants';
import $profileState from '@/store/profile';
import {$tasksState, filterByUserFx} from '@/store/tasks';

interface UseFilterProps {
  status: TaskStatus;
}

const useFilter = ({status}: UseFilterProps) => {
  const {user} = useUnit($profileState);
  const {currentProject} = useUnit($tasksState);

  const filters = [
    {
      id: 0,
      title: 'Мои проекты',
      status: [TaskStatus.Progress, TaskStatus.Completed],
      handleClick: () => {
        return filterByUserFx({
          taskStatus: status,
          projectID: currentProject.id,
          userUID: user.uid,
        });
      },
    },
  ];

  const resultFilters = filters.filter((f) => f.status.includes(status));

  return resultFilters;
};

export default useFilter;
