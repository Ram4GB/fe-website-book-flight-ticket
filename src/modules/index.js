import userReducer from "./user/reducers";
import frontpageReducer from "./frontpage/reducers";
import orderReducer from "./order/reducers";
import flightReducer from "./flight/reducers";
import seatReducer from "./seat/reducers";

import { MODULE_NAME as MODULE_USER } from "./user/models";
import { MODULE_NAME as MODULE_ORDER } from "./order/models";
import { MODULE_NAME as MODULE_FLIGHT } from "./flight/models";
import { MODULE_NAME as MODULE_FRONT_PAGE } from "./frontpage/models";
import { MODULE_NAME as MODULE_SEAT } from "./seat/models";

const rootReducer = {
  [MODULE_USER]: userReducer,
  [MODULE_ORDER]: orderReducer,
  [MODULE_FRONT_PAGE]: frontpageReducer,
  [MODULE_FLIGHT]: flightReducer,
  [MODULE_SEAT]: seatReducer
};

export default rootReducer;
