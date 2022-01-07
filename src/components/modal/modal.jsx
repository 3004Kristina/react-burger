import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import modalStyles from './modal.module.css';
import ModalOverlay from './modal-overlay';

export default function Modal(props) {
  function handleEscClose(e) {
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
    document.getElementById('modal-root'),
  );
}

Modal.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node,
};
