import { CLOSE_DRAWER, OPEN_DRAWER } from "../actions/types/DrawerType";

const initialState = {
  visible: false,
  componentContent: <p>hihi</p> ,
};
export const DrawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DRAWER: {
      return { ...state, visible: true, componentContent: action.Component};
    }

    case CLOSE_DRAWER: {
      return { ...state, visible: false };
    }
    default:
      return { ...state };
  }
};
