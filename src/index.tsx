import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import Calendar, {
  CalendarData,
  createCalendarTheme,
  Props as CalendarProps,
  Skeleton,
} from 'react-activity-calendar';

import { API_URL, DEFAULT_THEME } from './constants';
import { ApiErrorResponse, ApiResponse, Year } from './types';

interface Props extends Omit<CalendarProps, 'data'> {
  username: string;
  year?: Year;
  transformData?: (data: CalendarData) => CalendarData;
}

async function fetchCalendarData(username: string, year: Year): Promise<ApiResponse> {
  const response = await fetch(`${API_URL}${username}?y=${year}`);
  const data: ApiResponse | ApiErrorResponse = await response.json();

  if (!response.ok) {
    throw new Error((data as ApiErrorResponse).error);
  }

  return data as ApiResponse;
}

const GitHubCalendar: FunctionComponent<Props> = ({
  username,
  year = 'last',
  transformData: transformDataProp,
  ...props
}) => {
  const [data, setData] = useState<CalendarData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const transformDataCallback = useCallback(
    (contributions: CalendarData) => transformData(contributions, transformDataProp),
    [transformDataProp],
  );

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchCalendarData(username, year)
      .then(({ contributions }) => setData(transformDataCallback(contributions)))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [username, year, transformDataCallback]);

  useEffect(fetchData, [fetchData]);

  if (error) {
    return (
      <div>
        <i>Unable to fetch contribution data. See console.</i>
      </div>
    );
  }

  if (loading || !data) {
    return <Skeleton loading />;
  }

  const theme = props.color ? undefined : props.theme ?? DEFAULT_THEME;

  const labels = {
    totalCount: `{{count}} contributions in ${year === 'last' ? 'the last year' : '{{year}}'}`,
  };

  return <Calendar data={data} theme={theme} labels={labels} {...props} />;
};

const transformData = (data: CalendarData, transformFn?: Props['transformData']): CalendarData => {
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

export { createCalendarTheme };
export default GitHubCalendar;
