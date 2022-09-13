import { quanLyCommentService } from "../../services/QuanLyCommentService";
import { openNotificationWithIcon } from "../types/notificationJira";
import { getTaskDetailAction } from "./QuanLyDuAnAction";
import { GET_ALL_COMMENT } from "./types/QuanLyCommentType";

export const getAllCommentAction = (taskId) =>{
    return async (dispatch) => {
        try {
            const result = await quanLyCommentService.getAllComment(taskId);
            dispatch({
                type: GET_ALL_COMMENT,
                listComment: result.data.content
            })
            console.log('comment', result)
        } catch (error) {
            console.error("error", error.response?.data)
        }
    }
}

export const insertCommentAction = (model) => {
    return async (dispatch) => {
        try {
            const result = await quanLyCommentService.insertComment(model);
            if (result.data.statusCode === 200){
                dispatch(getTaskDetailAction(model.taskId))
                dispatch(getAllCommentAction(model.taskId))
            }
            console.log('insert Comment', result)
        } catch (error) {
            console.error("error", error.response?.data)
        }
    }
}

export const deleteCommentAction = (idComment) => {
    return async (dispatch) => {
        try {
            const result = await quanLyCommentService.deleteComment(idComment);
            // dispatch(getTaskDetailAction())
            console.log("lstComment", result)
        } catch (error) {
            openNotificationWithIcon("error", "User is not allowed to delete", error.response?.data.message)
            console.error("error", error.response?.data)
        }
    }
}

export const updateCommentAction = (id, contentComment) => {
    return async (dispatch) => {
        try {
            const result = await quanLyCommentService.updateComment(id, contentComment);
            if (result.data.statusCode === 200) {
                openNotificationWithIcon("success", "Update comment successfully")
            }
            else{
                openNotificationWithIcon("error", "Update comment failed")
            }
            console.log('Comment update', result);
        } catch (error) {
            openNotificationWithIcon("error", "Update comment failed", error.response?.data.message)
            console.error("error", error.response?.data)
        }
    }
}