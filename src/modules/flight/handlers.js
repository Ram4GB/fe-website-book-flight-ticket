import { fetchAuthLoading } from "../../common/effects";
import { DEFAULT_URL } from "../../common/url";
import * as actions from "./actions";

export const addAirplane = async data => {
  let result = await fetchAuthLoading({
    url: `${DEFAULT_URL}/airline`,
    method: "POST",
    data
  });
  if (result && result.data) return result.data;
  else return { success: false, error: "Server error" };
};

export const updateAirpplane = async (id, data) => {
  delete data.logo;
  delete data.phone;
  let result = await fetchAuthLoading({
    url: `${DEFAULT_URL}/airline/${id}`,
    data,
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

export default function(dispatch, props) {
  return {
    getListAirPlane: async (page, params) => {
      let result = await fetchAuthLoading({
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
      let result = await fetchAuthLoading({
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
    }
  };
}
