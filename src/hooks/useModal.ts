import {useState} from 'react';

export const useModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const toggleOpen = () => setModalOpen((isOpenPrev) => !isOpenPrev);

  return {isModalOpen, closeModal, openModal, toggleOpen};
};
