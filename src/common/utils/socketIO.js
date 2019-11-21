import * as io from "socket.io-client";
import Cookie from "js-cookie";

const urlSocketIO = "http://35.198.236.176:3001";

export const getRole = user => {
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
  customer: {
    _instance: null,
    get instance() {
      if (!this._instance) {
        this._instance = io(`${urlSocketIO}/customer`, {
          query: {
            token: `Bearer ${Cookie.get("token")}`
          }
        });
      }
      return this._instance;
    }
  },
  admin: {
    _instance: null,
    get instance() {
      if (!this._instance) {
        this._instance = io(`${urlSocketIO}/admin`, {
          query: {
            token: `Bearer ${Cookie.get("token")}`
          }
        });
      }
      return this._instance;
    }
  }
};
