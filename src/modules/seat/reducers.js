import { handleActions } from "redux-actions";
import * as actions from "./actions";

const initialState = {
  seatClasses: []
};

const reducerMap = {
  [actions.getListClassSeat]: (state, action) => ({
    ...state,
    seatClasses: action.payload
  })
};

export default handleActions(reducerMap, initialState);
