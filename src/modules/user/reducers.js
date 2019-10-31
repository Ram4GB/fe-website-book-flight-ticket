import { handleActions } from "redux-actions";
import * as actions from "./actions";
const initialState = {
  users: [],
  staffs: [],
  user: {},
  login: false
};

const reducerMap = {
  [actions.login]: (state, action) => {
    return {
      ...state,
      user: action.payload
    };
  },
  [actions.logout]: (state, action) => {
    return {
      ...state,
      user: {}
    };
  },
  [actions.getListUser]: (state, action) => ({
    ...state,
    users: action.payload
  }),
  [actions.getListStaff]: (state, action) => ({
    ...state,
    staffs: action.payload
  }),
  [actions.getMe]: (state, action) => {
    return {
      ...state,
      user: action.payload
    };
  }
};

export default handleActions(reducerMap, initialState);
