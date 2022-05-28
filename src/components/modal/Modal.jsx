import styles from './Modal.module.css';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import {ReactComponent as CloseIcon} from '../icons/x-circle.svg';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {

    componentDidMount() {
        window.addEventListener("keydown", this.onEscClick)
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.onEscClick);
    }

    onEscClick = evt => {
            if (evt.code === "Escape") {
                this.props.onClickClose();
            }
    }
    
    onBackdropClick = evt => {
        if (evt.currentTarget === evt.target) {
            this.props.onClickClose();
        }
    }

    render() {
        return createPortal(
            <div className={styles.overlay} onClick={this.onBackdropClick}>
                <div className={styles.modal}>
                    <button type="button" className={styles.modalBtn} onClick={() => { this.props.onClickClose() }} area-label="Close">
                        <CloseIcon width="30" height="30" fill="black" />
                    </button>
                    <img src={this.props.largeImg} alt={this.props.tags} className={styles.modalImg} />
                </div>
            </div>,
            modalRoot
        );
    }
};

Modal.propTypes = {
    largeImg: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClickClose: PropTypes.func.isRequired,
}