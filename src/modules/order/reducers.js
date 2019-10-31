import { handleActions } from "redux-actions";

const initialState = {
  orders: []
};

const reducerMap = {};

export default handleActions(reducerMap, initialState);
