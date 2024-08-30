import { ThemeInput } from 'react-activity-calendar';

export const API_URL = 'https://github-contributions-api.jogruber.de/v4/';

// GitHub theme
export const DEFAULT_THEME = {
  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
} satisfies ThemeInput;
