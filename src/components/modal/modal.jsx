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
    const [opened, setOpened] = React.useState(false);

    React.useEffect(() => {
        if(props.opened){
            setOpened( true);
        }else{
            setOpened( false);
        }
        document.addEventListener('keyup', handleEscClose);

        return () => {
            document.removeEventListener('keyup',handleEscClose);
        }
    }, [props.opened, opened])

    function handleEscClose(e) {
        if (!opened) {
            return;
        }

        if (e.key !== 'Escape') {
            return;
        }

        close();
    }

    function close() {
        props.close();
        setOpened(false);
    }

    if (!opened) {
        return null;
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