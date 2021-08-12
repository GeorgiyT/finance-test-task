import React from 'react'
import PropTypes from "prop-types";
import styles from "./ModalCloseButton.module.css"
import sprite from "../../../images/symbol-defs.svg";

const ModalCloseButton = ({ closeModal }) => {
    return (
        <button type="button" onClick={closeModal} id='closeBtn' className={styles.closeBtn}>
            <span>
                <svg>
                    <use href={sprite + "#icon-close"} />
                </svg>
            </span>
        </button>
    )
}

ModalCloseButton.propTypes = {
    closeModal: PropTypes.func.isRequired
};

export default ModalCloseButton;