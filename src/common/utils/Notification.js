import { notification } from 'antd'
/**
 *
 * @param {*} notification Pass Notification antd
 * @param {*} data put object is array is object. Example: result.error
 */
export const catchErrorAndNotification = (data) => {
  if (Array.isArray(data)) {
    data.forEach(error => {
      notification.error({
        message: error.message
      })
    })
  } else {
    notification.error({
      message: data
    })
  }
}
