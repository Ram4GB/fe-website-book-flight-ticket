import { createAction } from 'redux-actions'
import { MODULE_NAME as MODULE_USER } from './models'
export const login = createAction(`${MODULE_USER}_LOGIN`)
export const logout = createAction(`${MODULE_USER}_LOGOUT`)
export const getListUser = createAction(`${MODULE_USER}_GET_LIST_USER`)
