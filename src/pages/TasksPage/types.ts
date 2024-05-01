export interface TaskFilter {
  id: number;
  title: string;
  handleClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface ModalTaskProps {
  closeModal: React.Dispatch<React.SetStateAction<void>>;
  isModalOpen: boolean;
  task: Api.Task;
}
