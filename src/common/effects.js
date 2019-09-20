import Axios from 'axios'
import { DEFAULT_URL } from './url'

export const fetchLoading = async ({ params, method, data }) => {
  return Axios({
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    url: DEFAULT_URL,
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
  ...res
}) => {
  const token = window.localStorage.getItem('token')
  if (token) {
    return Axios({
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...headers
      },
      url: DEFAULT_URL,
      params,
      method,
      data,
      res
    })
      .then(response => response)
      .catch(errors => errors.response)
  }
}
