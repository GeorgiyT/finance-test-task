import React from "react";
import styles from "./SettingsButton.module.css"
import PropTypes from "prop-types";

const SettingsButton = ({ clickFunction }) => {
  return (
    <button type="button" className={styles.button} onClick={clickFunction}>
      Settings
    </button>
  );
};

SettingsButton.propTypes = {
  clickFunction: PropTypes.func.isRequired
};

export default SettingsButton;
