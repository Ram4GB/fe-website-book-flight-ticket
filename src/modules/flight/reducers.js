import { handleActions } from "redux-actions";
import * as actions from "./actions";

const initialState = {
  flights: [],
  airlines: [],
  airports: [],
  locations: []
};

const reducerMap = {
  [actions.getListAirline]: (state, action) => ({
    ...state,
    airlines: action.payload
  }),
  [actions.getListFlight]: (state, action) => ({
    ...state,
    flights: action.payload
  }),
  [actions.getListAirport]: (state, action) => ({
    ...state,
    airports: action.payload
  }),
  [actions.getListLocation]: (state, action) => ({
    ...state,
    locations: action.payload
  })
};

export default handleActions(reducerMap, initialState);
