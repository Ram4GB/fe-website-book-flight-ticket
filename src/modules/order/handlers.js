import { fetchAuthLoading } from "../../common/effects";
import { DEFAULT_URL } from "../../common/url";
import * as actions from "./actions";
import { upLoadFile } from "../../common/utils/uploadFile";
export default function(dispatch, props) {
  return {
    orderTicket: async (data, type = 1) => {
      let result = await fetchAuthLoading({
        url: `${DEFAULT_URL}/order/${type === 1 ? "oneway" : "return"}`,
        data,
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
    },
    updateTransferContent: async (id, data) => {
      let result = await fetchAuthLoading({
        url: `${DEFAULT_URL}/order/${id}/transfer_content`,
        method: "PUT",
        data: upLoadFile(data, "transfer_content")
      });
      if (result && result.data) return result.data;
      return { success: false, error: "Server error" };
    },
    getOrderByID: async id => {
      let result = await fetchAuthLoading({
        url: `${DEFAULT_URL}/order/${id}/ticket`,
        method: "GET"
      });
      if (result && result.data) return result.data;
      else return { error: "Server error", success: false };
    }
  };
}
