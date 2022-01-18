import React from 'react';
import modalStyles from './modal.module.css';

export interface IModalOverlayProps {
  onClick: () => void;
}

export default function ModalOverlay({ onClick }: IModalOverlayProps) {
  return (
    <div
      role="group"
      onKeyDown={() => {}}
      onClick={onClick}
      className={modalStyles.modal_overlay}
    />
  );
}
