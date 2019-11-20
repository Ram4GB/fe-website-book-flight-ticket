/**
 * used: onSearch={searchTable(this, "Field Name", "Operator")}
 */
export const searchTable = (component, fieldName, op) => value => {
  const { params } = component.state
  component.setState(
    {
      params: {
        ...params,
        search: {
          ...params.search,
          [fieldName]: value,
        },
        searchFields: {
          ...params.searchFields,
          [fieldName]: op,
        },
      },
    },
    () => component.getData(),
  )
}
