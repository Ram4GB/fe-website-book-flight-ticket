import { notification } from "antd";

/**
 *
 * @param {*} componentThis
 * @param {Number} pagination
 * @param {Object} sorter
 * @return Sort table
 * @example sortTable(this,pagination,sorter)
 */
export const sortTable = async (componentThis, pagination, sorter) => {
  if (componentThis && componentThis.getData && sorter) {
    componentThis.setState({
      ...componentThis.state,
      params: {
        ...componentThis.state.params,
        sort: sorter.columnKey,
        direction: sorter.order === "ascend" ? "ASC" : "DESC"
      }
    });
    await componentThis.getData(pagination.current);
  } else
    notification.error({
      message: "Thiếu truyền this và tạo hàm getData"
    });
};
