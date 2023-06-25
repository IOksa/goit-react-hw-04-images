import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const Modal=({children, onCloseModal})=>{

    const onBackdropClick=(event) =>{
        if (event.currentTarget === event.target) {
            onCloseModal();
        }
    }
    return createPortal(
        <div className={css.Overlay} onClick={onBackdropClick}>
            <div className={css.Modal}>{children}       
            </div>
        </div>,
        document.querySelector("#popup-root")
    );
};




export default Modal;


Modal.propTypes={
 
    onCloseModal: PropTypes.func.isRequired,

}; 

