'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Calendar, {
  Activity,
  Skeleton,
  type Props as CalendarProps,
} from 'react-activity-calendar';

import { API_URL, DEFAULT_THEME } from './constants';
import { ApiErrorResponse, ApiResponse, Year } from './types';
import { transformData } from './utils';

export interface Props extends Omit<CalendarProps, 'data'> {
  username: string;
  year?: Year;
  transformData?: (data: Array<Activity>) => Array<Activity>;
  transformTotalCount?: boolean;
}

async function fetchCalendarData(
  username: string,
  year: Year,
): Promise<ApiResponse> {
  const response = await fetch(`${API_URL}${username}?y=${year}`);
  const data: ApiResponse | ApiErrorResponse = await response.json();

  if (!response.ok) {
    throw Error(
      `Unable to fetch GitHub contribution data for ${username}: HTTP ${response.status}}`,
    );
  }

  return data as ApiResponse;
}
const GitHubCalendar = ({
  username,
  year = 'last',
  labels,
  transformData: transformDataCallback,
  transformTotalCount = true,
  ...props
}: Props) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchCalendarData(username, year)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [username, year]);

  useEffect(fetchData, [fetchData]);

  // React error boundaries can't handle asynchronous code, so rethrow.
  if (error) {
    throw error;
  }

  if (loading || !data) {
    return <Skeleton {...props} loading />;
  }

  const theme = props.theme ?? DEFAULT_THEME;

  const defaultLabels = {
    totalCount: `{{count}} contributions in ${
      year === 'last' ? 'the last year' : '{{year}}'
    }`,
  };

  const totalCount =
    year === 'last' ? data.total['lastYear'] : data.total[year];

  return (
    <Calendar
      data={transformData(data.contributions, transformDataCallback)}
      theme={theme}
      labels={Object.assign({}, defaultLabels, labels)}
      totalCount={
        transformDataCallback && transformTotalCount ? undefined : totalCount
      }
      {...props}
      maxLevel={4}
    />
  );
};

export default GitHubCalendar;
