// import { history } from "../../../App";
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import { openNotificationWithIcon } from "../types/notificationJira";
import {
  DANG_NHAP_ACTION,
  SET_GET_LIST_USERS,
  SET_GET_USER_BY_PROJECT,
} from "./types/QuanLyNguoiDungType";

export const dangNhapAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
      if (result.data.statusCode === 200) {
        dispatch({
          type: DANG_NHAP_ACTION,
          thongTinDangNhap: result.data.content,
        });
        openNotificationWithIcon("success", "Login successfully");
      } else {
        openNotificationWithIcon("error", "Login failed");
      }
      console.log(result);
    } catch (error) {
      console.log("error", error.response?.data);
      openNotificationWithIcon(
        "error",
        "Login failed",
        error.response?.data.message
      );
    }
  };
};
export const facebookLoginAction = (facebookToken) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.facebookLogin(facebookToken);
      console.log('result', result);
    } catch (error) {
      console.log(error);
    }
  }
}

export const signUpAction = (thongTinDangKy) => {
  return async (dispatch) => {
    try {
      let result = await quanLyNguoiDungService.signup(thongTinDangKy);
      if (result.data.statusCode === 200) {
        openNotificationWithIcon("success", "Register success!");
      } else {
        openNotificationWithIcon("error", "Register error!");
      }
      console.log(result);
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Register error!",
        error.response?.data.message
      );
      console.error("error", error.response?.data);
    }
  };
};

export const getUsersAction = (keyword = "") => {
  return async (dispatch) => {
    try {
      let result = await quanLyNguoiDungService.getUsers(keyword);
      dispatch({
        type: SET_GET_LIST_USERS,
        arrUsers: result.data.content,
      });
      console.log("result", result);
    } catch (error) {
      console.error("error", error.response?.data);
    }
  };
};

export const getUserByProjectAction = (idProject) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.getUserByProjectId(idProject);
      dispatch({
        type: SET_GET_USER_BY_PROJECT,
        arrUserByProjects: result.data.content,
      });
      console.log("arrUserByProjects", result);
    } catch (error) {
      console.error("error", error.response?.data);
    }
  };
};

export const editUserAction = (formData) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.editUser(formData);
      if (result.data.statusCode === 200) {
        openNotificationWithIcon("success", "User is updated successfully");
      } else {
        openNotificationWithIcon("error", "Update user is failed");
      }
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Update user is failed",
        error.response?.data.content
      );
      console.error("error", error.response?.data);
    }
  };
};

export const deleteUserAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.deleteUser(id);
      console.log(result);
      if (result.data.statusCode === 200) {
        openNotificationWithIcon("success", "Delete user is successfully");
        dispatch(getUsersAction());
      } else {
        openNotificationWithIcon("error", "Delete user is failed");
      }
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Delete user is failed",
        error.response?.data.content
      );
      console.log(error);
    }
  };
};
