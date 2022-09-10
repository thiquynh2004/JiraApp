import { quanLyDuAnService } from "../../services/QuanLyDuAnService";
import { openNotificationWithIcon } from "../types/notificationJira";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";
import {
  SET_GET_ALL_PROJECTS,
  SET_GET_PROJECT_CATEGORY,
  SET_GET_PROJECT_DETAIL,
  SET_GET_TASK_DETAIL,
} from "./types/QuanLyDuAnType";
import { getUserByProjectAction } from "./types/QuanLyNguoiDungAction";
// import { SET_GET_USER_BY_PROJECT } from "./types/QuanLyNguoiDungType";

export const getProjectCategoryAction = (project) => {
  return async (dispatch) => {
    try {
      const result = await quanLyDuAnService.getProjectCategory();
      dispatch({
        type: SET_GET_PROJECT_CATEGORY,
        arrProjectCategory: result.data.content,
      });
      // console.log(result)
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };
};

export const createProjectAction = (formData) => {
  return async (dispatch) => {
    try {
      // dispatch(displayLoadingAction)
      const result = await quanLyDuAnService.createProject(formData);
      if (result.data.statusCode === 200) {

        openNotificationWithIcon("success", "Create project successfully");
        await dispatch(getAllProjectAction());
     
      } else {
    
        openNotificationWithIcon("error", "Create project failed");
      }
    
      console.log("result", result.data.content);
    } catch (error) {
     
      openNotificationWithIcon(
        "error",
        "Create project failed",
        error.response?.data
      );
      // dispatch(hideLoadingAction)
      console.log("error", error.response?.data);
    }
  };
};

export const getAllProjectAction = () => {
  return async (dispatch) => {
    try {
      // dispatch(displayLoadingAction);
      const result = await quanLyDuAnService.getAllProject();
      if (result.data.statusCode === 200) {
        await dispatch({
          type: SET_GET_ALL_PROJECTS,
          projectList: result.data.content,
        });
        const idProject = result.data.content.id;
        dispatch(getUserByProjectAction(idProject));
        // dispatch(hideLoadingAction);
      }
      // dispatch(hideLoadingAction);
      console.log("result", result);
    } catch (error) {
      // await dispatch(hideLoadingAction);
      console.log("error", error.response?.data);
    }
  };
};

export const getProjectDetailAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await quanLyDuAnService.getProductDetail(id);
      dispatch({
        type: SET_GET_PROJECT_DETAIL,
        projectDetail: result.data.content,
      });
      console.log("result", result);
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };
};

//Chưa update được đây neee
export const updateProjectAction = (projectId, formData) => {
  return async (dispatch) => {
    try {
      const result = await quanLyDuAnService.updateProject(projectId, formData);
      if(result.data.statusCode === 200) {
        openNotificationWithIcon("success", "Project is updated successfully");
        dispatch(getAllProjectAction());
      }else{
        openNotificationWithIcon("error", "Update project failed");
      }
      
      
      console.log("result", result.data.content);
    } catch (error) {
      openNotificationWithIcon("error", "Update project failed", error.response?.data.message);
      console.log("error", error.response?.data);
    }
  };
};

export const deleteProjectAction = (projectId) => {
  return async (dispatch) => {
    try {
      const result = await quanLyDuAnService.deleteProject(projectId);
      if (result.data.statusCode === 200) {
        openNotificationWithIcon("success", "Delete project successfully");
      } else {
        openNotificationWithIcon("error", "Delete project failed");
      }

      dispatch(getAllProjectAction());
      console.log("result", result);
    } catch (error) {
      openNotificationWithIcon("error", "Delete project failed");
      console.log("error", error.response?.data);
    }
  };
};

export const assignUserProjectAction = (userProject) => {
  return async (dispatch) => {
    try {
      const result = await quanLyDuAnService.assignUserProject(userProject);
      dispatch(getAllProjectAction());
      console.log("result", result);
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };
};

export const removeUserFromProjectAction = (userProject) => {
  return async (dispatch) => {
    try {
      const result = await quanLyDuAnService.removeUserFromProject(userProject);
      dispatch(getAllProjectAction());
      console.log("project after delete", result);
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };
};

export const createTaskAction = (formData) => {
  return async (dispatch) => {
    try {
      // dispatch(displayLoadingAction);
      const result = await quanLyDuAnService.createTask(formData);
      if (result.data.statusCode === 200) {
        // dispatch(hideLoadingAction);
        openNotificationWithIcon("success", "Create Task Successfully");
        dispatch(getProjectDetailAction(formData.projectId));
      } else {
        // dispatch(hideLoadingAction);
        openNotificationWithIcon("error", "Create task failed");
      }
      // dispatch(hideLoadingAction);
      console.log("result", result);
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Create task failed",
        error.response?.data.message
      );

      console.log("error", error.response?.data);
    }
  };
};

export const getTaskDetailAction = (taskId) => {
  return async (dispatch) => {
    try {
      const result = await quanLyDuAnService.getTaskDetail(taskId);
      dispatch({
        type: SET_GET_TASK_DETAIL,
        taskDetail: result.data.content,
      });
      console.log("result", result);
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };
};

export const updateStatusAction = (contentStatus) => {
  return async (dispatch) => {
    try {
      const result = await quanLyDuAnService.updateStatus(contentStatus);
      if (result.data.statusCode === 200) {
        openNotificationWithIcon("success", "Status is updated successfully");
      } else {
        openNotificationWithIcon("error", "Status is updated failed");
      }
      // console.log("hihi", result);
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Status is updated failed",
        error.response?.data.message
      );
      console.log("error", error.response?.data);
    }
  };
};

export const updatePriorityAction = (model) => {
  return async (dispatch) => {
    try {
      const result = await quanLyDuAnService.updatePriority(model);
      if (result.data.statusCode === 200) {
        openNotificationWithIcon("success", "Priority updated successfully");
      }
      console.log("priority", result);
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Priority is updated failed",
        error.response?.data.content
      );
    }
  };
};

//  export const update
