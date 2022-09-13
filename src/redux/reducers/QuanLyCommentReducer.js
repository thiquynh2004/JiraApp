import { GET_ALL_COMMENT } from "../actions/types/QuanLyCommentType";

const initialState = {
  listComment: [],
};
export const QuanLyCommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COMMENT: {
      state.listComment = action.listComment;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
