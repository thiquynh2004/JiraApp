import { quanLyStatusService } from "../../services/QuanLyStatusService"
import { GET_ALL_STATUS } from "./types/QuanLyStatusType";

export const getAllStatusAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyStatusService.getAllStatus();
            dispatch({
                type: GET_ALL_STATUS,
                arrStatus: result.data.content
            })
            console.log(result)
        } catch (error) {
            console.log("error", error.response?.data)
        }
    }
}