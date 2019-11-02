/**
 *
 * @param {Any} sorter
 * @param {Component} componentThis
 * @example tableSortUtil(sorter,this)
 * @returns setState params sort
 */
export const tableSortUtil = async (sorter, componentThis) => {
  try {
    let key = sorter.columnKey;
    let value = sorter.order;
    await componentThis.setState({
      ...componentThis.state,
      params: {
        ...componentThis.state.params,
        sort: key,
        direction: value === "ascend" ? "asc" : "desc"
      }
    });
  } catch (error) {
    console.error(error);
  }
};
