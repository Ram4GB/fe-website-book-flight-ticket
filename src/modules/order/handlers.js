import { fetchAuthLoading } from "../../common/effects";
import { DEFAULT_URL } from "../../common/url";
import * as actions from "./actions";
export default function(dispatch, props) {
  return {
    orderTicket: async data => {
      let dataSend = {};
      let flight_id = data.flight_id;
      dataSend.seat_class_id = data.seat_class_id;
      dataSend.passengers = data.passengers;
      let result = await fetchAuthLoading({
        url: `${DEFAULT_URL}/flight/${flight_id}/order`,
        data: dataSend,
        method: "POST"
      });
      if (result && result.data) return result.data;
      else return { success: false, error: "Server error" };
    },
    getListOrder: async (page, params) => {
      let result = await fetchAuthLoading({
        url: `${DEFAULT_URL}/order`,
        method: "GET",
        params: {
          ...params,
          page
        }
      });
      if (result && result.data) {
        dispatch(actions.getListOrders(result.data.data));
        return result.data;
      } else return { error: "Server error", success: false };
    },
    approveOrder: async id => {
      let result = await fetchAuthLoading({
        url: `${DEFAULT_URL}/order/${id}/approve`,
        method: "PUT"
      });
      if (result && result.data) return result.data;
      else return { success: false, error: "Server error" };
    },
    rejectOrder: async (id, reason_reject) => {
      let result = await fetchAuthLoading({
        url: `${DEFAULT_URL}/order/${id}/reject`,
        method: "PUT",
        data: reason_reject
      });
      if (result && result.data) return result.data;
      else return { success: false, error: "Server error" };
    }
  };
}
