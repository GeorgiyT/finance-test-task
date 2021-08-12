import { socket } from "../../components/socket/socket";
import { tickersGetSuccess } from "./tickersActions";

export const getTickersOperation = () => async (dispatch, getState) => {
  try {
    socket.emit('start');
    socket.on("ticker", (data) => {
      dispatch(tickersGetSuccess(data));
    })
  } catch (error) {
    alert(error.message)
  }
};