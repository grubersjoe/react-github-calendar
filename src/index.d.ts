import React, { CSSProperties } from 'react';
import { ColorInput } from 'tinycolor2';

export type Props = {
  username: string;
  blockMargin?: number;
  blockSize?: number;
  color?: ColorInput;
  dateFormat?: string;
  fontSize?: number;
  fullYear?: boolean;
  showTotalCount?: boolean;
  style?: CSSProperties;
  theme?: Theme;
  years?: number[];
};

export type Theme = {
  background: string;
  text: string;
  grade4: string;
  grade3: string;
  grade2: string;
  grade1: string;
  grade0: string;
};

declare function createCalendarTheme(
  baseColor: ColorInput,
  textColor?: string,
  emptyCellColor?: string,
  background?: string,
): Theme;

declare const GitHubCalendar: React.FC<Props>;

export { createCalendarTheme };
export default GitHubCalendar;
