import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import sprite from "../../../images/symbol-defs.svg";
import { setTheme } from '../../../redux/settings/settingsAction';
import { getTheme } from '../../../redux/settings/settingsSelector';
import "./ThemeSwitch.modal.css"


const ThemeSwitch = () => {
    const [update, setUpdate] = useState(false)
    const dispatch = useDispatch();
    const theme = useSelector(getTheme)

    useEffect(() => {
        theme === "white" ? setUpdate(false) : setUpdate(true)
    }, [theme])

    const checkboxClick = (e) => {
        setUpdate(state => !state)
        if (!update) {
            dispatch(setTheme('dark'))
        }
        else {
            dispatch(setTheme('white'))
        }
    }
    return (
        <div className="themeSwitch">
            <svg className="themeSwitchIcon">
                <use href={sprite + "#sun"}></use>
            </svg>

            <div className="themeSwitchControl">
                <input className="themeSwitchToggle" type="checkbox" checked={update} onChange={checkboxClick} id="themeSwitchToggle" />
                <label className="themeSwitchTrack" htmlFor="themeSwitchToggle">
                </label>
                <div className="themeSwitchMarker"></div>
            </div>

            <svg className="themeSwitchIcon">
                <use href={sprite + "#moon"}></use>
            </svg>
        </div>
    )
}
export default ThemeSwitch;