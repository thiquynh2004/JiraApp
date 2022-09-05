import {
  SET_GET_ALL_PROJECTS,
  SET_GET_PROJECT_CATEGORY,
  SET_GET_PROJECT_DETAIL,
} from "../actions/types/QuanLyDuAnType";

const initialState = {
  arrProjectCategory: [],
  projectList: [],
  projectDetail: {},
  
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
    default:
      return { ...state };
  }
};
