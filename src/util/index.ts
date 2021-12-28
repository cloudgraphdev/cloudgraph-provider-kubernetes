import cuid from 'cuid'

export const convertObjToArrayWithId = (labels: Record<string, string> = {}) => {
  return Object.keys(labels).map(key => ({
    id: cuid(),
    key,
    value: labels[key],
  }))
}