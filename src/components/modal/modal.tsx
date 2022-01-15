import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import ModalOverlay from './modal-overlay';

export interface IModalProps {
  onClose: () => void;
  name?: string;
}

const Modal: FC<IModalProps> = (props) => {
  const modalRoot = document.getElementById('modal-root') as HTMLElement;
  function handleEscClose(e: KeyboardEvent) {
    if (e.key !== 'Escape') {
      return;
    }

    props.onClose();
  }

  React.useEffect(() => {
    document.addEventListener('keyup', handleEscClose);

    return () => {
      document.removeEventListener('keyup', handleEscClose);
    };
  }, []);

  return ReactDOM.createPortal(
    <div>
      <ModalOverlay onClick={props.onClose} />
      <div className={modalStyles.modal}>
        <button type="button" className={modalStyles.modal_close} onClick={props.onClose} />

        <div className={`text text_type_main-large ${modalStyles.modal_title}`}>
          {props.name}
        </div>

        <div className={modalStyles.modal_content}>
          {props.children}
        </div>
      </div>
    </div>,
    modalRoot,
  );
}

export default Modal;
