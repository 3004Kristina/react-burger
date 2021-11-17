import React from 'react';
import modalStyles from './modal.module.css';

export default function ModalOverlay ({onClick}) {
    return (
        <div onClick={onClick} className={modalStyles.modal_overlay}/>
    );
}