import { handleActions } from 'redux-actions'
const initialState = {
  users: [],
  user: { role: 'admin', token: '123' }
}

const reducerMap = {}

export default handleActions(reducerMap, initialState)
