export const isPrimitive = (value) => {
  return typeof (value) === 'string'
    || typeof (value) === 'number'
    || typeof (value) === 'boolean'
}

export const isArray = (value) => Array.isArray(value)