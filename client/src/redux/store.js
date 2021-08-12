import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./settings/settingsReducer";
import tickersReducers from "./tickers/tickersReducer";


const store = configureStore({
    reducer: {
        tickers: tickersReducers,
        settings: settingsReducer
    },
});

export { store };