export const removeNullKeysOfObject = (obj = {}) => {
  const newObj = { ...obj }
  Object.keys(obj).forEach(key => {
    if (obj[key] === null || obj[key] === '' || obj[key] === 'undefined') {
      delete newObj[key]
    }
  })
  return newObj
}
