import * as io from "socket.io-client";
import Cookie from "js-cookie";
import { DEFAULT_URL } from "../url";

const getRole = user => {
  if (user.Admin) return "admin";
  if (user.Staff) return "staff";
  if (user.Customer) return "customer";
  return null;
};

/**
 * @example
 * // return object that will have key common and admin
 * import io from 'location this file'
 * io[roleType].instance it will return a [IO socket]
 */
export const socketService = {
  common: {
    _instance: null,
    get instance() {
      if (!this._instance) {
        this._instance = io(`${DEFAULT_URL}`);
      }
      return this._instance;
    }
  },
  admin: {
    _instance: null,
    get instance() {
      if (!this._instance) {
        this._instance = io(`${DEFAULT_URL}/admin`, {
          query: {
            token: `Bearer ${Cookie.get("token")}`
          }
        });
      }
      return this._instance;
    }
  }
};

/**
 *
 * @param {String} eventName Name event
 * @param {String} type call [on or emit]
 * @example onEventSocket(EVENT.GET_DATA,'on')
 *
 */
export const onEventSocket = (eventName, type) => {
  let user = Cookie.get("user");
  if (user) {
    user = JSON.parse(user);
    let role = getRole(user);
    if (role && socketService[role].instance) {
      switch (type) {
        case "on":
          return socketService[role].instance.on(eventName, data => {
            return data;
          });
        case "emit":
          return socketService[role].instance.emit(eventName, data => {
            return data;
          });
        default:
          console.error("Event not found");
      }
    }
  }
};
