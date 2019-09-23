import * as actions from './actions'
import Cookies from '../../../node_modules/js-cookie/src/js.cookie'
export default function (dispatch, props) {
  return {
    getProfileUser: () => {
      const user = Cookies.get('user')
      if (user) {
        const { token } = JSON.parse(user)
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
      }
    },
    login: (username, password) => {
      if (username === 'admin' && password === 'admin') {
        const result = {
          id: 1,
          username: 'admin',
          password: 'admin',
          role: 'admin',
          token: 'qwertyuiopqwertyuiop'
        }
        dispatch(actions.login(result))
        Cookies.set('user', result)
        return { success: 'Login success' }
      } else {
        return { error: { message: 'Username or password not match' } }
      }
    },
    logout: () => {
      dispatch(actions.logout())
      Cookies.remove('user', { path: '/' })
    },
    getData: () => {}
  }
}
