import { handleActions } from 'redux-actions'
import * as actions from './actions'
const initialState = {
  users: [],
  user: { }
}

const reducerMap = {
  [actions.login]: (state, action) => {
    return {
      ...state,
      user: action.payload
    }
  },
  [actions.logout]: (state, action) => {
    return {
      ...state,
      user: {}
    }
  },
  [actions.getListUser]: (state, action) => ({
    ...state,
    users: action.payload
  })
}

export default handleActions(reducerMap, initialState)
