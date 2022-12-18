export const cleanPlainObjectFromEmptyKeys = (obj: any) =>
  Object.keys(obj).forEach(
    (k) => !obj[k] && obj[k] !== undefined && delete obj[k]
  )
