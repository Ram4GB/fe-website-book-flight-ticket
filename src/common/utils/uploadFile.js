export const upLoadFile = data => {
  const form = new FormData();
  if (data.document && data.document[0] && data.document[0].originFileObj) {
    form.append("logo", data.document[0].originFileObj);
  }
  let fields = data;
  delete fields.document;
  Object.keys(fields).forEach(key => {
    fields[key] && form.append(key, fields[key]);
  });
  return form;
};
