import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux'
import { deleteFilterElement, setFilterElement } from '../../redux/settings/settingsAction'
import { getFilter } from '../../redux/settings/settingsSelector'
import styles from "./Ticker.module.css"

const Ticker = ({ data }) => {
    const [update, setUpdate] = useState(true)
    const dispatch = useDispatch();
    const listToUpdate = useSelector(getFilter)

    useEffect(() => {
        listToUpdate.includes(data.ticker) ? setUpdate(false) : setUpdate(true)
    }, [listToUpdate, data.ticker])


    const checkboxClick = (e) => {
        setUpdate(state => !state)
        if (update) {
            dispatch(setFilterElement(data.ticker))
        }
        else {
            dispatch(deleteFilterElement(data.ticker))
        }
    }

    return (
        <tr className={styles.table__row + " " + (data.modifier ? styles.table__green : styles.table__red)}>
            <td className={styles.table__ticker}>{data.ticker}</td>
            <td className={styles.table__exchange}>{data.exchange}</td>
            <td className={data.modifier ? styles.table__green : styles.table__red}>{data.price}</td>
            <td className={styles.table__change}>{data.change}</td>
            <td className={styles.table__change_percent}>{data.change_percent}</td>
            <td className={styles.table__dividend}>{data.dividend}</td>
            <td className={styles.table__yield}>{data.yield}</td>
            <td className={styles.table__last_trade_time}>{data.last_trade_time}</td>
            <td><input type="checkbox" checked={update} onChange={checkboxClick} /></td>
        </tr>
    )
}

Ticker.propTypes = {
    data: PropTypes.shape({
        ticker: PropTypes.string.isRequired,
        exchange: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        change: PropTypes.string.isRequired,
        change_percent: PropTypes.string.isRequired,
        dividend: PropTypes.string.isRequired,
        yield: PropTypes.string.isRequired,
        last_trade_time: PropTypes.string.isRequired,
        modifier: PropTypes.bool.isRequired,
    }).isRequired
};

export default React.memo(Ticker, ({ data }, { stopList }) => {
    if (stopList.includes(data.ticker)) {
        return true
    }
})