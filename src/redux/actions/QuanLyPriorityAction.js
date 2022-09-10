import { quanLyPriorityService } from "../../services/QuanLyPriorityService"

export const getAllPriorityAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyPriorityService.getAllPriority()
            dispatch({
                type: "GET_ALL_PRIORITY",
                priorityList: result.data.content
            })
            console.log("priority" , result.data.content)
        } catch (error) {
            console.error("error", error.response?.data)
        }
       
    }
}