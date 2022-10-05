import { TOKEN, USER_LOGIN } from "../../util/config";
import { DANG_NHAP_ACTION, SET_GET_LIST_USERS, SET_GET_USER_BY_PROJECT, SET_GET_USER_DETAIL } from "../actions/types/QuanLyNguoiDungType";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user= JSON.parse(localStorage.getItem(USER_LOGIN));
}
const initialState = {
  userLogin: user,
  arrUsers:[],
  arrUserByProjects:[],
  userDetail: {},
  facebookToken: {}

  
};

export const QuanLyNguoiDungReducer = (state = initialState, action) => {
  switch (action.type) {
    case DANG_NHAP_ACTION:{
      const{thongTinDangNhap} = action;
      localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
      localStorage.setItem(TOKEN, thongTinDangNhap.accessToken);
      return{ ...state, userLogin:thongTinDangNhap}
    }
    // case LOGIN_WITH_FACEBOOK:{
    //   const {facebookToken} = action.
    // }
    case SET_GET_LIST_USERS:{
     state.arrUsers = action.arrUsers;
     state.userDetail = state.arrUsers;
     return{ ...state}
     }
     case SET_GET_USER_BY_PROJECT: {
      state.arrUserByProjects = action.arrUserByProjects;
 
      return{ ...state }
     }
     case SET_GET_USER_DETAIL: {
      state.userDetail = action.userDetail;
      return { ...state }
     }
    default:
      return { ...state };
  }
};
