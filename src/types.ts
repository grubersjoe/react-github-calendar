export interface Activity {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export type Year = number | 'last';

export interface ApiResponse {
  total: {
    [year: number]: number;
    [year: string]: number; // 'lastYear;
  };
  contributions: Array<Activity>;
}

export interface ApiErrorResponse {
  error: string;
}

type Color = string;
type ColorScale = [Color, Color, Color, Color, Color];

export type ThemeInput =
  | {
      light: ColorScale | [from: Color, to: Color];
      dark?: ColorScale | [from: Color, to: Color];
    }
  | {
      light?: ColorScale | [from: Color, to: Color];
      dark: ColorScale | [from: Color, to: Color];
    };
