import Axios from 'axios'
import Cookies from 'js-cookie/src/js.cookie'

export const fetchLoading = async ({ params, method, data, url }) => {
  console.log(url)
  return Axios({
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    url,
    params,
    method,
    data
  })
    .then(response => response)
    .catch(errors => errors)
}

export const fetchAuthLoading = async ({
  headers,
  params,
  method,
  data,
  url,
  ...res
}) => {
  const user = Cookies.get('user')
  if (user) {
    const token = Cookies.get('token')
    if (token) {
      return Axios({
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...headers
        },
        url,
        params,
        method,
        data,
        res
      })
        .then(response => response)
        .catch(errors => errors.response)
    }
  }
}
