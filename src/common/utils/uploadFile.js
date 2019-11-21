export const upLoadFile = (data, nameFileUpload) => {
  const form = new FormData();
  if (data.document && data.document[0] && data.document[0].originFileObj) {
    if (!nameFileUpload) form.append("logo", data.document[0].originFileObj);
    else form.append(nameFileUpload, data.document[0].originFileObj);
  }
  let fields = data;
  delete fields.document;
  Object.keys(fields).forEach(key => {
    fields[key] && form.append(key, fields[key]);
  });
  return form;
};
