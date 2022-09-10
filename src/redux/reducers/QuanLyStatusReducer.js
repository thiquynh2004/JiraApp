import { GET_ALL_STATUS } from "../actions/types/QuanLyStatusType"

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    arrStatus: [],
}

export const QuanLyStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_STATUS:{
        state.arrStatus = action.arrStatus
        return { ...state}
    }
  default:
    return state
  }
}
