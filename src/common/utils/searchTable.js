/**
 * used: onSearch={searchTable(this, "Field Name", "Operator")}
 */
export const searchTable = (component, fieldName, op) => value => {
  const { params } = component.state;
  if (value)
    component.setState(
      {
        params: {
          ...params,
          search: {
            ...params.search,
            [fieldName]: value
          },
          searchFields: {
            ...params.searchFields,
            [fieldName]: op
          }
        }
      },
      () => component.getData()
    );
  else {
    let paramsTemp = {
      ...component.state.params
    };
    console.log(paramsTemp);
    delete paramsTemp.search[fieldName];
    delete paramsTemp.searchFields[fieldName];
    component.setState(
      {
        ...component.state,
        params: {
          ...component.params,
          ...paramsTemp
        }
      },
      () => {
        component.getData();
      }
    );
  }
};
