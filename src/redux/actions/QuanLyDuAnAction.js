import { quanLyDuAnService } from "../../services/QuanLyDuAnService"
import { SET_GET_ALL_PROJECTS, SET_GET_PROJECT_CATEGORY, SET_GET_PROJECT_DETAIL } from "./types/QuanLyDuAnType";

export const getProjectCategoryAction = (project) =>{
    return async (dispatch) => {
        try {
            const result = await quanLyDuAnService.getProjectCategory();
            dispatch({
                type: SET_GET_PROJECT_CATEGORY,
                arrProjectCategory: result.data.content
            })
            // console.log(result)
        } catch (error) {
            console.log("error", error.response?.data)
        }
    }
}

export const createProjectAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyDuAnService.createProject(formData)
            console.log("result", result.data.content)
        } catch (error) {
            console.log("error", error.response?.data)
        }
    }
}

export const getAllProjectAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyDuAnService.getAllProject();
            dispatch({
                type: SET_GET_ALL_PROJECTS,
                projectList: result.data.content,
            })
            console.log("result", result);
        } catch (error) {
            console.log("error", error.response?.data)
        }
    }
}


export const getProjectDetailAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await quanLyDuAnService.getProductDetail(id);
            dispatch({
                type:SET_GET_PROJECT_DETAIL,
                projectDetail: result.data.content,
            })
            console.log("result", result)
        } catch (error) {
            console.log("error", error.response?.data)
        }
       
    }
}


export const updateProjectAction = (projetcId, formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyDuAnService.updateProject(formData);
            console.log("result", result.data.content)
        } catch (error) {
            console.log("error", error.response?.data)
        }
    }
}