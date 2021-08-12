import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux'
import { deleteTickerToShow, setTickerToShow } from '../../../../redux/settings/settingsAction';
import { getTickersListToShow } from '../../../../redux/settings/settingsSelector';
import styles from "./SettingsFormList.module.css"

const SettingsFormList = ({ tickerName }) => {
    const [update, setUpdate] = useState(true)
    const dispatch = useDispatch();
    const listToShow = useSelector(getTickersListToShow)

    useEffect(() => {
        listToShow.includes(tickerName) ? setUpdate(true) : setUpdate(false)
    }, [listToShow, tickerName])

    const checkboxClick = (e) => {
        setUpdate(state => !state)
        if (!update) {
            dispatch(setTickerToShow(tickerName))
        }
        else {
            dispatch(deleteTickerToShow(tickerName))
        }
    }

    return (
        <>
            <li className={styles.settingsFormList}><span>{tickerName}</span><input type="checkbox" checked={update} onChange={checkboxClick} /></li>
        </>
    )
}

SettingsFormList.propTypes = {
    tickerName: PropTypes.string.isRequired
};

export default SettingsFormList;