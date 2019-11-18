import { createAction } from "redux-actions";
import { MODULE_NAME } from "./models";

export const getListOrders = createAction(`${MODULE_NAME}_GET_LIST_ORDER`);
