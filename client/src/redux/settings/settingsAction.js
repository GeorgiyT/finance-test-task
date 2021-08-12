import { createAction } from "@reduxjs/toolkit";

export const setFilterElement = createAction("filter/setFilterElement")
export const deleteFilterElement = createAction("filter/deleteFilterElement")

export const settingsGetSuccess = createAction("settings/settingsGetSuccess")

export const setTickerToShow = createAction("tickerToShow/setTickerToShow")
export const deleteTickerToShow = createAction("tickerToShow/deleteTickerToShow")
export const setInterval = createAction("interval/setInterval")

export const setTheme = createAction("theme/setTheme")