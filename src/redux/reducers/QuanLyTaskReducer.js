import { GET_ALL_TASK } from "../actions/types/QuanLyTaskType";

const initialState = {
  taskList: [],
};
export const QuanLyTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TASK: {
      state.taskList = action.taskList;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
