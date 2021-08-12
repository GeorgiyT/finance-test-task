import React, { useEffect } from "react";
import { useState } from "react";
import SettingsButton from "./components/SettingsButton/SettingsButton";
import Modal from "./components/Modal/Modal";
import TickersPage from "./pages/tickersPage/TickersPage";
import { useDispatch, useSelector } from "react-redux";
import { getSettingsOperation } from "./redux/settings/settingsOperation";
import styles from "./App.module.css"
import { getTheme } from "./redux/settings/settingsSelector";

function App() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector(getTheme)

  useEffect(() => {
    dispatch(getSettingsOperation())
  }, [dispatch])

  const openModal = () => {
    window.addEventListener("keydown", closeModal);
    setShowModal(true);
  };

  const closeModal = e => {
    if (e.target === e.currentTarget || e.keyCode === 27 || e.currentTarget.id === "closeBtn") {
      window.removeEventListener("keydown", closeModal);
      setShowModal(false);
    }
  }

  return (
    <div className={styles.app + " " + styles[theme]} >
      <SettingsButton clickFunction={openModal} />
      <TickersPage />
      {showModal && <Modal closeModal={closeModal} />}
    </ div >
  );
}

export default App;