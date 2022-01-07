import React from 'react';
import PropTypes from 'prop-types';
import modalStyles from './modal.module.css';

export default function ModalOverlay({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      onKeyDown={() => {
      }}
      className={modalStyles.modal_overlay}
    />
  );
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};
