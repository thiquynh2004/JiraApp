import { GET_ALL_PRIORITY } from "../actions/types/QuanLyPriorityType";

const initialState = {
  priorityList: [],
};

export const QuanLyPriorityReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRIORITY: {
        state.priorityList = action.priorityList
        return { ...state}
     }
    default:
      return { ...state };
  }
};
