import React from 'react';
import PropTypes from 'prop-types';

export default function ErrorModal({ errorMsg }) {
  return (
    <>
      <span className="text text_type_main-medium mb-15">Ошибка!</span>
      <span className="text text_type_main-medium mb-15">{errorMsg}</span>
    </>
  );
}

ErrorModal.propTypes = {
  errorMsg: PropTypes.string,
};

ErrorModal.defaultProps = {
  errorMsg: 'Что-то пошло не так...',
};
