import { FunctionComponent } from 'react';
import {
  CalendarData,
  createCalendarTheme,
  Props as ActivityCalendarProps,
  Theme,
} from 'react-activity-calendar';

export interface Props extends Omit<ActivityCalendarProps, 'data'> {
  username: string;
  year?: number | 'last';
  transformData?: (data: CalendarData) => CalendarData;
  /*
    Use a separate url for calendar data
  */
  customProvider?: string;
}

declare const GitHubCalendar: FunctionComponent<Props>;

export { createCalendarTheme, Theme };
export default GitHubCalendar;
