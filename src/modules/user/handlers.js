import * as actions from './actions'
export default function (dispatch, props) {
  return {
    getProfileUser: () => {
      const user = window.localStorage.getItem('user')
      const { token } = JSON.parse(user)
      let result = {}
      if (token) {
        // fetch user login again and dispatch to redux again
        result = {
          id: 1,
          username: 'leminhcuong298@yahoo.com.vn',
          password: '123456789',
          role: 'admin',
          token: 'qwertyuiop'
        }
        dispatch(actions.login(result))
      } else console.log('User must be login')

      dispatch(actions.login(result))
    },
    login: () => {
      const result = {
        id: 1,
        username: 'leminhcuong298@yahoo.com.vn',
        password: '123456789',
        role: 'admin',
        token: 'qwertyuiop'
      }
      dispatch(actions.login(result))
      window.localStorage.setItem('user', JSON.stringify(result))
    },
    logout: () => {
      dispatch(actions.logout())
      window.localStorage.removeItem('user')
    },
    getData: () => {

    }
  }
}
