import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import Calendar, { Activity, type Props as CalendarProps, Skeleton } from 'react-activity-calendar';

import { API_URL, DEFAULT_THEME } from './constants';
import { ApiErrorResponse, ApiResponse, Year } from './types';
import { transformData } from './utils';

export interface Props extends Omit<CalendarProps, 'data'> {
  username: string;
  year?: Year;
  transformData?: (data: Array<Activity>) => Array<Activity>;
  transformTotalCount?: boolean;
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
  labels,
  transformData: transformDataProp,
  transformTotalCount = true,
  ...props
}) => {
  const [data, setData] = useState<Array<Activity> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchCalendarData(username, year)
      .then(({ contributions }) => setData(contributions))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [username, year]);

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

  const theme = props.theme ?? DEFAULT_THEME;

  const defaultLabels = {
    totalCount: `{{count}} contributions in ${year === 'last' ? 'the last year' : '{{year}}'}`,
  };

  const totalCount = transformTotalCount
    ? undefined
    : data.reduce((sum, activity) => sum + activity.count, 0);

  return (
    <Calendar
      data={transformData(data, transformDataProp)}
      theme={theme}
      labels={Object.assign({}, defaultLabels, labels)}
      totalCount={totalCount}
      {...props}
    />
  );
};

export default GitHubCalendar;
