'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Calendar, {
  Activity,
  type Props as CalendarProps,
  Skeleton,
} from 'react-activity-calendar';

import { API_URL, DEFAULT_THEME } from './constants';
import { ApiErrorResponse, ApiResponse, Year } from './types';
import { transformData } from './utils';

export interface Props extends Omit<CalendarProps, 'data'> {
  username: string;
  year?: Year;
  transformData?: (data: Array<Activity>) => Array<Activity>;
  transformTotalCount?: boolean;
  throwOnError?: boolean;
  errorMessage?: string;
}

async function fetchCalendarData(
  username: string,
  year: Year,
): Promise<ApiResponse> {
  const response = await fetch(`${API_URL}${username}?y=${year}`);
  const data: ApiResponse | ApiErrorResponse = await response.json();

  if (!response.ok) {
    throw Error(
      `Fetching GitHub contribution data for "${username}" failed: ${(data as ApiErrorResponse).error}`,
    );
  }

  return data as ApiResponse;
}
const GitHubCalendar = ({
  username,
  year = 'last',
  labels,
  transformData: transformFn,
  transformTotalCount = true,
  throwOnError = false,
  errorMessage = `Error – Fetching GitHub contribution data for "${username}" failed.`,
  ...props
}: Props) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<Error | null>(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    setFetchError(null);
    fetchCalendarData(username, year)
      .then(setData)
      .catch(setFetchError)
      .finally(() => setLoading(false));
  }, [username, year]);

  useEffect(fetchData, [fetchData]);

  // React error boundaries can't handle asynchronous code, so rethrow.
  if (fetchError) {
    if (throwOnError) {
      throw fetchError;
    } else {
      return <div>{errorMessage}</div>;
    }
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
      data={transformData(data.contributions, transformFn)}
      theme={theme}
      labels={Object.assign({}, defaultLabels, labels)}
      totalCount={transformFn && transformTotalCount ? undefined : totalCount}
      {...props}
      maxLevel={4}
    />
  );
};

export default GitHubCalendar;
