import * as actions from './actions'
import Cookies from '../../../node_modules/js-cookie/src/js.cookie'
import { DEFAULT_URL } from '../../common/url'
import { fetchLoading, fetchAuthLoading } from '../../common/effects'
export const getListCashierAsync = async (page, params) => {
  const result = await fetchAuthLoading({
    url: `${DEFAULT_URL}/cashier`,
    method: 'GET',
    params: {
      ...params
    }
  })
  return result
}
export const addCashierAsync = async user => {
  const result = await fetchAuthLoading({
    url: `${DEFAULT_URL}/cashier`,
    method: 'POST',
    data: user
  })
  return result
}
export default function (dispatch, props) {
  return {
    getProfileUser: () => {
      const token = Cookies.get('token')
      if (token) {
        // fetch user login again and dispatch to redux again
        const result = {
          id: 1,
          username: 'admin',
          password: 'admin',
          role: 'admin',
          token: 'qwertyuiopqwertyuiop'
        }
        dispatch(actions.login(result))
      } else console.log('User must be login')
    },
    login: async (email, password) => {
      const result = await fetchLoading({
        url: `${DEFAULT_URL}/auth/login`,
        data: {
          email,
          password
        },
        method: 'POST'
      })
      if (result && result.response) {
        return result.response.data
      }
      const { account, exp, token } = result.data
      dispatch(actions.login(account))
      Cookies.set('user', account)
      Cookies.set('token', token)
      Cookies.set('exp', exp)
      return result.data
    },
    logout: () => {
      dispatch(actions.logout())
      Cookies.remove('user', { path: '/' })
      Cookies.remove('token', { path: '/' })
      Cookies.remove('exp', { path: '/' })
    },
    getListCashier: async (page, params) => {
      const result = await getListCashierAsync(page, params)
      console.log(result)
      if (result && result.data) {
        dispatch(actions.getListUser(result.data.data)) // dispatch list user
      }
      return result.data
    },
    addCashier: async user => {
      const result = await addCashierAsync(user)
      if (result && result.data) { return result.data }
    }
  }
}
