import { handleActions } from "redux-actions";

const initialState = {
  flights: []
};

const reducerMap = {};

export default handleActions(reducerMap, initialState);
