export default function multiSet(object, keys, values, withoutStop) {
  for (let i in keys) {
    if (withoutStop) {
      Object.defineProperty(object,keys[i], {
        value: values[i]
      })
    }
    object[keys[i]] = values[i]
  }
}
multiSet.withObject = function multiSetWithObject(object, keys, setObject, withoutStop) {
  multiSet(object,keys,multiGet(setObject,keys,withoutStop),withoutStop)
}
export default function multiGet(object, keys, withoutStop) {
  let values = []
  for (let i in keys) {
    if (withoutStop) {
      values.push(Object.getPropertyDescriptor(object,keys[i]).value)
    }
    values.push(object[keys[i]])
  }
  return values
}
multiGet.withObject = function multiGetWithObject(object, keys, withoutStop) {
  let values = {}
  for (let i in keys) {
    if (withoutStop) {
      Object.defineProperty(values, keys[i], {
        value: Object.getOwnPropertyDescriptor(object, keys[i]).value
      })
    } else {
      values[keys[i]] = object[keys[i]]
    }
  }
  return values
}
