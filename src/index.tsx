import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import Calendar, {
  CalendarData,
  createCalendarTheme,
  Props as CalendarProps,
  Skeleton,
} from 'react-activity-calendar';

import { API_URL, DEFAULT_THEME } from './constants';
import { ApiErrorResponse, ApiResponse, Year } from './types';
import { transformData } from './utils';

export interface Props extends Omit<CalendarProps, 'data'> {
  username: string;
  year?: Year;
  transformData?: (data: CalendarData) => CalendarData;
  customProvider?: string;
}

async function fetchCalendarData(username: string, year: Year, customProvider?: string): Promise<ApiResponse> {
  const URL = customProvider ? customProvider : `${API_URL}${username}?y=${year}`;
  const response = await fetch(URL);
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
  customProvider,
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
    fetchCalendarData(username, year, customProvider)
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
    return <Skeleton {...props} loading />;
  }

  const theme = props.color ? undefined : props.theme ?? DEFAULT_THEME;

  const labels = {
    totalCount: `{{count}} contributions in ${year === 'last' ? 'the last year' : '{{year}}'}`,
  };

  return <Calendar data={data} theme={theme} labels={labels} {...props} />;
};

export { createCalendarTheme };
export default GitHubCalendar;
