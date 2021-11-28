import { CalendarData } from 'react-activity-calendar';

import { Props } from './index';

export const transformData = (
  data: CalendarData,
  transformFn?: Props['transformData'],
): CalendarData => {
  if (typeof transformFn !== 'function') {
    return data;
  }

  const transformedData = transformFn(data);

  if (!Array.isArray(transformedData)) {
    throw new Error(`Passed function transformData must return a list of Day objects.`);
  }

  if (transformedData.length > 0) {
    const testObj = transformedData[0];

    if (typeof testObj.count !== 'number' || testObj.count < 0) {
      throw new Error(
        `Required property "count: number" missing or invalid. Got: ${testObj.count}`,
      );
    }

    if (typeof testObj.date !== 'string' || !/(\d{4})-(\d{2})-(\d{2})/.test(testObj.date)) {
      throw new Error(
        `Required property "date: YYYY-MM-DD" missing or invalid. Got: ${testObj.date}`,
      );
    }

    if (typeof testObj.level !== 'number' || testObj.level < 0 || testObj.level > 4) {
      throw new Error(
        `Required property "level: 0 | 1 | 2 | 3 | 4" missing or invalid: Got: ${testObj.level}.`,
      );
    }
  }

  return transformedData;
};
