import styles from './Modal.module.css';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import {ReactComponent as CloseIcon} from '../icons/x-circle.svg';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ onClickClose, largeImg, tags }) {

    useEffect(() => {
        const onEscClick = evt => {
            if (evt.code === "Escape") {
                onClickClose();
            }
        }

        window.addEventListener("keydown", onEscClick);
        return () => {
            window.removeEventListener("keydown", onEscClick);
        }
    }, [onClickClose]);
    
    const onBackdropClick = evt => {
        if (evt.currentTarget === evt.target) {
            onClickClose();
        }
    }

        return createPortal(
            <div className={styles.overlay} onClick={onBackdropClick}>
                <div className={styles.modal}>
                    <button type="button" className={styles.modalBtn} onClick={() => { onClickClose() }} area-label="Close">
                        <CloseIcon width="30" height="30" fill="black" />
                    </button>
                    <img src={largeImg} alt={tags} className={styles.modalImg} />
                </div>
            </div>,
            modalRoot
        );
};

Modal.propTypes = {
    largeImg: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClickClose: PropTypes.func.isRequired,
}