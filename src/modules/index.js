import { combineReducers } from 'redux'
import userReducer from './user/reducers'
import foodReducer from './food/reducers'

import { MODULE_NAME as MODULE_USER } from './user/models'
import { MODULE_NAME as MODULE_FOOD } from './food/models'

const rootReducer = combineReducers({
  [MODULE_USER]: userReducer,
  [MODULE_FOOD]: foodReducer
})

export default rootReducer
