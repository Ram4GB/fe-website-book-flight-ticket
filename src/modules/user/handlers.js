import * as actions from "./actions";
import Cookies from "../../../node_modules/js-cookie/src/js.cookie";
import { DEFAULT_URL } from "../../common/url";
import { fetchLoading, fetchAuthLoading } from "../../common/effects";
export const getListStaffAsync = async (page, params) => {
  const result = await fetchAuthLoading({
    url: `${DEFAULT_URL}/staff`,
    method: "GET",
    params: {
      ...params,
      page
    }
  });
  return result;
};
export const getListCustomerAsync = async (page, params) => {
  const result = await fetchAuthLoading({
    url: `${DEFAULT_URL}/customer`,
    method: "GET",
    params: {
      ...params,
      page
    }
  });
  return result;
};
export const getCustomerByID = async id => {
  let result = await fetchAuthLoading({
    url: `${DEFAULT_URL}/customer/${id}`,
    method: "GET"
  });
  return result.data;
};
export const updateCustomerByID = async (data, id) => {
  let result = await fetchAuthLoading({
    url: `${DEFAULT_URL}/customer/${id}`,
    method: "PUT",
    data
  });
  return result.data;
};
export const getStaffByID = async id => {
  let result = await fetchAuthLoading({
    url: `${DEFAULT_URL}/staff/${id}`,
    method: "GET"
  });
  return result.data;
};
export const updateStaffByID = async (data, id) => {
  let result = await fetchAuthLoading({
    url: `${DEFAULT_URL}/staff/${id}`,
    method: "PUT",
    data
  });
  return result.data;
};
export const addStaffAsync = async data => {
  let result = await fetchAuthLoading({
    url: `${DEFAULT_URL}/staff`,
    data,
    method: "POST"
  });
  return result;
};
export const addCustomerAsync = async data => {
  let result = await fetchAuthLoading({
    url: `${DEFAULT_URL}/customer`,
    data,
    method: "POST"
  });
  return result;
};
export default function(dispatch, props) {
  return {
    getProfileUser: async () => {
      const token = Cookies.get("token");
      if (token) {
        // fetch user login again and dispatch to redux again
        let result = await fetchAuthLoading({
          url: `${DEFAULT_URL}/auth/me`,
          method: "GET"
        });
        // console.log(result);
        if (result && result.data && result.data.success === true) {
          dispatch(actions.getMe(result.data.data));
        }
      } else dispatch(actions.getMe({}));
    },
    login: async (email, password) => {
      const result = await fetchLoading({
        url: `${DEFAULT_URL}/auth/login`,
        data: {
          email,
          password
        },
        method: "POST"
      });
      if (result && result.data && result.data.success) {
        const { data, exp, token } = result.data;
        if (data) {
          dispatch(actions.login(data));
          Cookies.set("user", data);
          Cookies.set("token", token);
          Cookies.set("exp", exp);
          return result.data;
        }
      }
      return { success: false, error: "Server error" };
    },
    logout: () => {
      dispatch(actions.logout());
      Cookies.remove("user", { path: "/" });
      Cookies.remove("token", { path: "/" });
      Cookies.remove("exp", { path: "/" });
      localStorage.clear();
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    },
    getListStaff: async (page, params) => {
      const result = await getListStaffAsync(page, params);
      if (result && result.data) {
        dispatch(actions.getListStaff(result.data.data)); // dispatch list user
        return result.data;
      }
    },
    getListCustomer: async (page, params) => {
      const result = await getListCustomerAsync(page, params);
      // console.log(result);
      if (result && result.data) {
        dispatch(actions.getListUser(result.data.data)); // dispatch list user
        return result.data;
      }
    },
    addStaff: async data => {
      let result = await addStaffAsync(data);
      if (result && result.data) {
        return result.data;
      } else return { success: false, error: "Server error" };
    },
    addCustomer: async data => {
      let result = await addCustomerAsync(data);
      if (result && result.data) {
        return result.data;
      } else return { success: false, error: "Server error" };
    }
  };
}
