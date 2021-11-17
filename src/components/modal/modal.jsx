import React from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import ModalOverlay from './modal-overlay';


export default class Modal extends React.Component {
    constructor(props) {
        super(props);

       this.state = {
           opened: false
       }

        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.handleEscClose = this.handleEscClose.bind(this);
    }

   componentDidMount() {
        document.addEventListener('keyup', this.handleEscClose);
   }

   componentWillUnmount() {
       document.removeEventListener('keyup', this.handleEscClose);
   }

    handleEscClose(e) {
        if(!this.state.opened){
            return;
        }

        if(e.key !== 'Escape'){
            return
        }

        this.close();
    }

    open () {
        this.setState({opened: true})
    }

    close () {
        this.setState({opened: false})
    }


    render() {
        if(!this.state.opened){
            return null;
        }

        return ReactDOM.createPortal(
            <div>
                <ModalOverlay onClick={this.close}/>
                <div className={modalStyles.modal} onClick={(e) => {
                    e.stopPropagation();
                }}>
                    <button className={modalStyles.modal_close} onClick={this.close}/>

                    <div className={`text text_type_main-large ${modalStyles.modal_title}`}>
                        {this.props.name}
                    </div>

                    <div className={modalStyles.modal_content}>
                        {this.props.children}
                    </div>
                </div>
            </div>,
            document.getElementById('modal-root')
        );
    }
}