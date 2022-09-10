import {
  CHANGE_VALUE_MODAL,
  SET_GET_ALL_PROJECTS,
  SET_GET_PROJECT_CATEGORY,
  SET_GET_PROJECT_DETAIL,
  SET_GET_TASK_DETAIL,
} from "../actions/types/QuanLyDuAnType";

const initialState = {
  arrProjectCategory: [],
  projectList: [],
  projectDetail: {},
  taskDetail: {},
  
};

export const QuanLyDuAnReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GET_PROJECT_CATEGORY: {
      state.arrProjectCategory = action.arrProjectCategory;

      return { ...state };
    }
    case SET_GET_ALL_PROJECTS: {
      state.projectList = action.projectList;
      return { ...state };
    }
    case SET_GET_PROJECT_DETAIL : {
      state.projectDetail = action.projectDetail;
      return { ...state};
    }
    case SET_GET_TASK_DETAIL: {
      state.taskDetail = action.taskDetail;
      return { ...state };
    }
    case CHANGE_VALUE_MODAL: {
      const {name, value} = action;
      console.log("changeModal", state.taskDetail)
      return {...state, taskDetail:{...state.taskDetail, [name]: value}, ...state.projectDetail}
    }
    default:
      return { ...state };
  }
};
