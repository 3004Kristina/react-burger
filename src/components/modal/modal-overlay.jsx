import React from 'react';
import modalStyles from './modal.module.css';
import PropTypes from 'prop-types';

ModalOverlay.propTypes = {
    onClick: PropTypes.func
}

export default function ModalOverlay ({onClick}) {
    return (
        <div onClick={onClick} className={modalStyles.modal_overlay}/>
    );
}