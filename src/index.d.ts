import { FunctionComponent } from 'react';
import {
  Props as ActivityCalendarProps,
  Theme,
  createCalendarTheme,
} from 'react-activity-calendar';

import { Year } from './types';

export interface Props extends Omit<ActivityCalendarProps, 'data'> {
  username: string;
  year?: Year;
}

declare const GitHubCalendar: FunctionComponent<Props>;

export { createCalendarTheme, Theme };
export default GitHubCalendar;
