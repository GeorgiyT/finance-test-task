import React from "react";
import PropTypes from "prop-types";
import ModalCloseButton from "./ModalCloseButton/ModalCloseButton";
import SettingsForm from "./SettingsForm/SettingsForm";
import ThemeSwitch from "./ThemeSwitch/ThemeSwitch";
import styles from "./Modal.module.css"
import { useSelector } from "react-redux";
import { getTheme } from "../../redux/settings/settingsSelector";

const Modal = ({ closeModal }) => {
  const theme = useSelector(getTheme)

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal + " " + styles[theme]}>
        <ThemeSwitch />
        <ModalCloseButton closeModal={closeModal} />
        <SettingsForm closeModal={closeModal} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired
};

export default Modal;
