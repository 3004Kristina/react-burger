import React from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import ModalOverlay from './modal-overlay';
import PropTypes from 'prop-types';

Modal.propTypes = {
    name: PropTypes.string,
    children: PropTypes.node,
    opened: PropTypes.bool
}

export default function Modal(props) {
    React.useEffect(() => {
        document.addEventListener('keyup', handleEscClose);

        return () => {
            document.removeEventListener('keyup',handleEscClose);
        }
    }, [])

    function handleEscClose(e) {
        if (e.key !== 'Escape') {
            return;
        }

        close();
    }

    function close() {
        props.close();

    }

    return ReactDOM.createPortal(
        <div>
            <ModalOverlay onClick={close}/>
            <div className={modalStyles.modal} onClick={(e) => {
                e.stopPropagation();
            }}>
                <button className={modalStyles.modal_close} onClick={close}/>

                <div className={`text text_type_main-large ${modalStyles.modal_title}`}>
                    {props.name}
                </div>

                <div className={modalStyles.modal_content}>
                    {props.children}
                </div>
            </div>
        </div>,
        document.getElementById('modal-root')
    );
}