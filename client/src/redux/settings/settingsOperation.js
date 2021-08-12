import { socket } from "../../components/socket/socket";
import { settingsGetSuccess } from "./settingsAction";


export const getSettingsOperation = () => async dispatch => {
    try {
        socket.on("settings", (data) => {
            dispatch(settingsGetSuccess(data))
        })
    } catch (error) {
        alert(error.message);
    }
};