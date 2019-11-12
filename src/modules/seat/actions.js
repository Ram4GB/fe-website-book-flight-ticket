import { createAction } from "redux-actions";
import { MODULE_NAME } from "./models";

export const getListClassSeat = createAction(
  `${MODULE_NAME}_GET_LIST_CLASS_SEAT`
);
