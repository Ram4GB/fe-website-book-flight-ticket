import { notification } from "antd";
/**
 *
 * @param {*} notification Pass Notification antd
 * @param {*} data put object is array is object. Example: result.error
 */
export const catchErrorAndNotification = (data, componentThis) => {
  if (componentThis) {
    if (data) {
      if (Array.isArray(data)) {
        data.forEach(error => {
          componentThis.props.form.setFields({
            [error.field]: {
              value: error.value,
              errors: [new Error(error.message)]
            }
          });
        });
      } else {
        componentThis.props.form.setFields({
          [data.field]: {
            value: data.value,
            errors: [new Error(data.message)]
          }
        });
      }
    } else
      notification.error({
        message: "Server error"
      });
  } else {
    if (data) {
      if (Array.isArray(data)) {
        data.forEach(error => {
          notification.error({
            message: error.message
          });
        });
      } else {
        notification.error({
          message: data
        });
      }
    } else
      notification.error({
        message: "Server error"
      });
  }
};
