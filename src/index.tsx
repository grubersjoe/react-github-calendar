import React, { useState, useEffect, useCallback, FunctionComponent } from 'react';
import Calendar, {
  Skeleton as CalendarSkeleton,
  Props as CalendarProps,
  CalendarData,
  Theme,
} from 'react-activity-calendar';

import { Year, ApiResponse } from './types';

interface Props extends Omit<CalendarProps, 'data'> {
  username: string;
  year?: Year;
}

async function fetchCalendarData(username: string, year: Year): Promise<ApiResponse> {
  return (await fetch(`${API_URL}${username}?y=${year}`)).json();
}

const GitHubCalendar: FunctionComponent<Props> = ({
  username,
  year = 'last',
  theme = DEFAULT_THEME,
  ...calendarProps
}) => {
  const [data, setData] = useState<CalendarData | null>(null);
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

  useEffect(fetchData, []); // on mount
  useEffect(fetchData, [username, year]);

  if (error) {
    return <p>Error :(</p>;
  }

  if (loading || !data) {
    return <CalendarSkeleton loading />;
  }

  const labels = {
    totalCount: `{{count}} contributions in ${year === 'last' ? 'the last year' : '{{year}}'}`,
  };

  return <Calendar data={data} theme={theme} labels={labels} {...calendarProps} />;
};

// GitHub theme
const DEFAULT_THEME: Theme = {
  level4: '#216e39',
  level3: '#30a14e',
  level2: '#40c463',
  level1: '#9be9a8',
  level0: '#ebedf0',
};

const API_URL = 'https://github-contributions-api.jogruber.de/v4/';

export default GitHubCalendar;
