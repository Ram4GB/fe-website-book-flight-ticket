import { handleActions } from "redux-actions";
import * as actions from "./actions";

const initialState = {
  paramsRegisterFly: {
    count:4
  }
};

const reducerMap = {
  [actions.setParamsRegisterFly]: (state, action) => ({
    ...state,
    paramsRegisterFly: {
      ...state.paramsRegisterFly,
      ...action.payload
    }
  })
};

export default handleActions(reducerMap, initialState);
