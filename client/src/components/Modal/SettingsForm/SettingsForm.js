import React, { useState } from 'react'
import PropTypes from "prop-types";
import styles from "./SettingsForm.module.css"
import { socket } from '../../socket/socket'
import { useDispatch, useSelector } from 'react-redux'
import { getInterval, getSettings, getTheme, getTickersList } from '../../../redux/settings/settingsSelector'
import SettingsFormList from './SettingsFormList/SettingsFormList'
import { setInterval } from '../../../redux/settings/settingsAction'


const SettingsForm = ({ closeModal }) => {
    const intervalInMs = useSelector(getInterval)
    const tickersList = useSelector(getTickersList)
    const settings = useSelector(getSettings)
    const theme = useSelector(getTheme)
    const dispatch = useDispatch();

    const [interval, setInt] = useState(intervalInMs / 1000)

    const submitClick = (e) => {
        e.preventDefault();
        socket.emit("settings", settings);
        socket.disconnect();
        socket.connect();
        socket.emit("start");
        closeModal(e);
    }

    const intervalChange = (e) => {
        setInt(e.target.value)
        dispatch(setInterval(e.target.value * 1000))
    }

    const tickersListForRender = tickersList?.map(ticker => <SettingsFormList tickerName={ticker} key={ticker} />);

    return (
        <>
            <form autoComplete="on" noValidate onSubmit={submitClick} className={styles.settingsForm}>

                <label className={styles[theme]} htmlFor="tickersList">Tickers to show:</label>
                <ul id="tickersList">
                    {tickersListForRender}
                </ul>

                <label className={styles[theme]} htmlFor="refreshInput">Refresh time:</label>
                <input id="refreshInput" className={styles.settingsInput} type="number" value={interval} min='1' onChange={intervalChange} />

                <button type="submit">Save</button>
            </form>
        </>
    )
}

SettingsForm.propTypes = {
    closeModal: PropTypes.func.isRequired
};

export default SettingsForm;