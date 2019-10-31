import userReducer from "./user/reducers";
import frontpageReducer from "./frontpage/reducers";
import orderReducer from "./order/reducers";

import { MODULE_NAME as MODULE_USER } from "./user/models";
import { MODULE_NAME as MODULE_ORDER } from "./user/models";
import { MODULE_NAME as MODULE_FRONT_PAGE } from "./frontpage/models";

const rootReducer = {
  [MODULE_USER]: userReducer,
  [MODULE_ORDER]: orderReducer,
  [MODULE_FRONT_PAGE]: frontpageReducer
};

export default rootReducer;
