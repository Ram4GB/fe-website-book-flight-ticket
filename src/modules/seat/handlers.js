import { fetchAuthLoading } from "../../common/effects";
import { DEFAULT_URL } from "../../common/url";
import * as actions from "./actions";

export default function(dispatch) {
  return {
    getListSeatClass: async (page = 1, params = {}) => {
      let result = await fetchAuthLoading({
        url: `${DEFAULT_URL}/seatclass`,
        method: "GET",
        params: {
          ...params,
          page
        }
      });
      console.log(result);
      if (result && result.data) {
        dispatch(actions.getListClassSeat(result.data.data));
        return result.data;
      }
      return {
        success: false,
        error: "Seat Class is not published"
      };
    },
    createSeatClass: async data => {
      let result = await fetchAuthLoading({
        url: `${DEFAULT_URL}/seatclass`,
        method: "POST",
        data
      });
      if (result && result.data) {
        return result.data;
      } else
        return {
          success: false,
          error: "Server error"
        };
    },
    updateSeatClass: async (id, data) => {
      let result = await fetchAuthLoading({
        url: `${DEFAULT_URL}/seatclass/${id}`,
        method: "PUT",
        data
      });
      if (result && result.data) {
        return result.data;
      } else
        return {
          success: false,
          error: "Server error"
        };
    }
  };
}
