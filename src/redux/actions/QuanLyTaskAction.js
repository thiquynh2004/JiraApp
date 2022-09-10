import { quanLyTaskService } from "../../services/QuanLyTaskService"
import { GET_ALL_TASK } from "./types/QuanLyTaskType";

export const getAllTaskAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyTaskService.getAllTasks();
            dispatch({
                type: GET_ALL_TASK,
                taskList: result.data.content
            })
            console.log("taskList", result)
        } catch (error) {
            console.error("error", error.response?.data)
        }
    }
}