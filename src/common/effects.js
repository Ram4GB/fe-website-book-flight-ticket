import Axios from 'axios'
import Cookies from 'js-cookie/src/js.cookie'
import nprogress from 'nprogress'
import Qs from 'qs'
import 'nprogress/nprogress.css'
import PageLoading from './components/widgets/PageLoading'

// Format nested params correctly
Axios.interceptors.request.use(config => {
  config.paramsSerializer = params => {
    return Qs.stringify(params, {
      arrayFormat: 'brackets',
      encode: false,
    })
  }

  return config
})

export async function loading(fetchingProcess, done = undefined) {
  nprogress.start()
  PageLoading.show()
  try {
    const ret = await fetchingProcess()
    if (done) {
      await done()
    }
    PageLoading.hide()
    nprogress.done()
    return ret
  } catch (error) {
    PageLoading.hide()
    nprogress.done()
    console.error('ERROR', error)
    throw error
  }
}

export const fetchLoading = async ({ params, method, data, url }) => {
  return await Axios({
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    url,
    params,
    method,
    data,
  })
    .then(response => response)
    .catch(errors => errors.response)
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
      nprogress.start()
      return await Axios({
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...headers,
        },
        url,
        params,
        method,
        data,
        res,
      })
        .then(response => response)
        .catch(errors => errors.response)
        .finally(() => {
          nprogress.done()
        })
    }
  }
}
