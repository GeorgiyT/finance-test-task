import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Ticker from '../../components/Ticker/Ticker';
import { getFilter, getTheme, getTickersListToShow } from "../../redux/settings/settingsSelector";
import { getTickersOperation } from '../../redux/tickers/tickersOperation';
import { getTickersData } from '../../redux/tickers/tickersSelector';
import styles from "./TickersPage.module.css"

const TickersPage = () => {
    const dispatch = useDispatch();
    const tickers = useSelector(getTickersData)
    const stopUpdateList = useSelector(getFilter)
    const tickersListToShow = useSelector(getTickersListToShow)
    const theme = useSelector(getTheme)
    const filteredTickers = tickers.filter(ticker => tickersListToShow.includes(ticker.ticker))

    useEffect(() => {
        dispatch(getTickersOperation())
    }, [dispatch])

    const filteredTickersForRender = filteredTickers.map((ticker, index) => <Ticker key={index} data={ticker} stopList={stopUpdateList} />);

    return (
        <>
            <table className={styles.table + " " + styles[theme]}>
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Exchange</th>
                        <th>Price</th>
                        <th>Change</th>
                        <th>Change percent</th>
                        <th>Dividend</th>
                        <th>Yield</th>
                        <th>Last trade time</th>
                        <th>Watch</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredTickersForRender}
                </tbody>
            </table>
        </>
    )
}

export default TickersPage;