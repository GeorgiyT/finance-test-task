import { combineReducers, createReducer } from "@reduxjs/toolkit";

import { tickersGetSuccess } from "./tickersActions";

const tickersGetSuccessReducer = createReducer([], {
  [tickersGetSuccess]: (state, { payload }) => {
    return [...payload.map((el, ind) => { return { ...el, modifier: el.price > state[ind]?.price ? true : false } })]
  }
})

const tickersReducers = combineReducers({
  data: tickersGetSuccessReducer,
});

export default tickersReducers;
