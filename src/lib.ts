import type { Activity } from './types'

export const transformData = (
  data: Array<Activity>,
  transformFn?: (data: Array<Activity>) => Array<unknown>,
): Array<Activity> => {
  if (typeof transformFn !== 'function') {
    return data
  }

  const transformedData = transformFn(data)

  if (!Array.isArray(transformedData)) {
    throw Error(`transformData() function must return a list of Activity objects.`)
  }

  for (const d of transformedData) {
    if (!isRecord(d)) {
      throw Error(`transformData() must return a list of valid Activity objects.`)
    }

    if (typeof d.count !== 'number' || d.count < 0) {
      throw Error(`Required property "count: number" missing or invalid. Got: ${d.count}`)
    }

    if (typeof d.date !== 'string' || !/\d{4}-\d{2}-\d{2}/.test(d.date)) {
      throw Error(`Required property "date: YYYY-MM-DD" missing or invalid. Got: ${d.date}`)
    }

    if (typeof d.level !== 'number' || d.level < 0 || d.level > 4) {
      throw Error(
        `Required property "level: 0 | 1 | 2 | 3 | 4" missing or invalid: Got: ${d.level}.`,
      )
    }
  }

  return transformedData as Array<Activity>
}

const isRecord = (o: unknown): o is Record<string, unknown> =>
  Object.prototype.toString.call(o) === '[object Object]'
