import { combineReducers, createReducer } from "@reduxjs/toolkit";
import { deleteFilterElement, deleteTickerToShow, setFilterElement, setInterval, setTheme, setTickerToShow, settingsGetSuccess } from "./settingsAction";

const filterReducer = createReducer([], {
    [setFilterElement]: (state, { payload }) => [...state, payload],
    [deleteFilterElement]: (state, { payload }) => [...state.filter(el => el !== payload)],
    [settingsGetSuccess]: (_, { payload }) => payload.filter,
})

const tickersListReducer = createReducer([], {
    [settingsGetSuccess]: (_, { payload }) => payload.tickersList
})

const tickersListToShowReducer = createReducer([], {
    [settingsGetSuccess]: (_, { payload }) => payload.tickersListToShow,
    [setTickerToShow]: (state, { payload }) => [...state, payload],
    [deleteTickerToShow]: (state, { payload }) => [...state.filter(el => el !== payload)]
})

const intervalReducer = createReducer(0, {
    [settingsGetSuccess]: (_, { payload }) => payload.interval,
    [setInterval]: (_, { payload }) => payload
})

const themeReducer = createReducer('', {
    [settingsGetSuccess]: (_, { payload }) => payload.theme,
    [setTheme]: (_, { payload }) => payload

})

const settingsReducer = combineReducers({
    filter: filterReducer,
    tickersList: tickersListReducer,
    tickersListToShow: tickersListToShowReducer,
    interval: intervalReducer,
    theme: themeReducer
})

export default settingsReducer;