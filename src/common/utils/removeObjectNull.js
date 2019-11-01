const removeNullObject = object => {
  for (const key in object) {
    if (Array.isArray(object[key])) {
      if (object[key].length === 0) delete object[key];
    } else {
      if (object[key] === "") delete object[key];
    }
  }
  return object;
};

export default removeNullObject;
