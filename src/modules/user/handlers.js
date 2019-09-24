import * as actions from './actions'
import Cookies from '../../../node_modules/js-cookie/src/js.cookie'
import { DEFAULT_URL } from '../../common/url'
import { fetchLoading } from '../../common/effects'
export default function (dispatch, props) {
  return {
    getProfileUser: () => {
      // const user = JSON.parse(Cookies.get('user'))
      const token = Cookies.get('token')
      // if (user) {
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
      // }
    },
    login: async (email, password) => {
      const result = await fetchLoading({
        url: `${DEFAULT_URL}/auth/login`,
        data: {
          email,
          password
        },
        method: 'POST'
      }).catch(errors => errors).then()
      if (result && result.response) { return result.response.data }
      console.log(result.data)
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
    getData: () => {}
  }
}
