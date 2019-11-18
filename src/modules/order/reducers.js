import { handleActions } from "redux-actions";
import * as actions from "./actions";

const initialState = {
  orders: []
};

const reducerMap = {
  [actions.getListOrders]: (state, action) => ({
    ...state,
    orders: action.payload
  })
};

export default handleActions(reducerMap, initialState);
