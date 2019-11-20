import { fetchAuthLoading, fetchLoading } from "../../common/effects";
import { DEFAULT_URL } from "../../common/url";
import * as actions from "./actions";
import removeNullObject from "../../common/utils/removeObjectNull";
import { upLoadFile } from "../../common/utils/uploadFile";

export const addAirplane = async data => {
  let result = await fetchAuthLoading({
    url: `${DEFAULT_URL}/airline`,
    method: "POST",
    data: upLoadFile(data)
  });
  if (result && result.data) return result.data;
  else return { success: false, error: "Server error" };
};

export const updateAirpplane = async (id, data) => {
  delete data.logo;
  delete data.phone;
  let result = await fetchAuthLoading({
    url: `${DEFAULT_URL}/airline/${id}`,
    data: upLoadFile(data),
    method: "PUT"
  });
  if (result && result.data) return result.data;
  else return { success: false, error: "Server error" };
};

export const getAirplaneByID = async id => {
  let result = await fetchAuthLoading({
    url: `${DEFAULT_URL}/airline/${id}`,
    method: "GET"
  });
  if (result && result.data) return result.data;
  else return { success: false, error: "Server error" };
};

export const addAirport = async data => {
  let result = await fetchAuthLoading({
    url: `${DEFAULT_URL}/airport`,
    method: "POST",
    data
  });
  if (result && result.data) return result.data;
  return { success: false, error: "Server error" };
};

export const updateAirport = async (id, data) => {
  let result = await fetchAuthLoading({
    url: `${DEFAULT_URL}/airport/` + id,
    method: "PUT",
    data
  });
  if (result && result.data) return result.data;
  return { success: false, error: "Server error" };
};

export default function(dispatch, props) {
  return {
    getListAirPlane: async (page, params) => {
      params = removeNullObject(params);
      let result = await fetchLoading({
        url: `${DEFAULT_URL}/airline`,
        method: "GET",
        params: {
          page,
          ...params
        }
      });
      if (result && result.data) {
        dispatch(actions.getListAirPlane(result.data.data));
        return result.data;
      } else return { success: false, error: "Server error" };
    },
    getListFlight: async (page, params) => {
      let result = await fetchLoading({
        url: `${DEFAULT_URL}/flight`,
        method: "GET",
        params: {
          page,
          ...params
        }
      });
      if (result && result.data) {
        dispatch(actions.getListFlight(result.data.data));
        return result.data;
      } else return { success: false, error: "Server error" };
    },
    getListLocation: async (page, params) => {
      let result = await fetchLoading({
        url: `${DEFAULT_URL}/location`,
        method: "GET",
        params: {
          page,
          ...params
        }
      });
      if (result && result.data) {
        dispatch(actions.getListLocation(result.data.data));
        return result.data;
      } else return { success: false, error: "Server error" };
    },
    addLocation: async data => {
      let result = await fetchAuthLoading({
        url: `${DEFAULT_URL}/location`,
        method: "POST",
        data
      });
      if (result && result.data) return result.data;
      return { success: false, error: "Server error" };
    },
    updateLocation: async (id, data) => {
      let result = await fetchAuthLoading({
        url: `${DEFAULT_URL}/location/` + id,
        method: "PUT",
        data
      });
      if (result && result.data) return result.data;
      return { success: false, error: "Server error" };
    },
    getListAirport: async (page, params) => {
      params = removeNullObject(params);
      let result = await fetchAuthLoading({
        url: `${DEFAULT_URL}/airport`,
        method: "GET",
        params: {
          page,
          ...params
        }
      });
      if (result && result.data) {
        dispatch(actions.getListAirport(result.data.data));
        return result.data;
      } else return { success: false, error: "Server error" };
    },
    addFlight: async data => {
      delete data.airline_id;
      let result = await fetchAuthLoading({
        url: `${DEFAULT_URL}/flight`,
        method: "POST",
        data: data
      });
      if (result && result.data) return result.data;
      else return { success: false, error: "Server error" };
    }
  };
}
