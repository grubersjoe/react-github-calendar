import color from 'color';

import { DEFAULT_THEME } from './components/GitHubCalendar';

/**
 * Create a calendar color theme based on one color
 * @param {string} baseColor - The base color all lighter hues are calculated from
 * @param {string} textColor - Text color
 * @param {string} background - Calendar background color. `transparent` by default
 * @throws {Error} - Throws an error if the color could not be parsed
 * @return {object} - The color theme object
 */
export function createCalendarTheme(baseColor, textColor = 'inherit', background = 'transparent') {

  try {
    const base = color(baseColor);

    return {
      background: String(background),
      text: String(textColor),
      grade4: String(base.fade(0.08)),
      grade3: String(base.fade(0.24)),
      grade2: String(base.fade(0.40)),
      grade1: String(base.fade(0.56)),
      grade0: String(color('#fff').darken(0.1)),
    };
  } catch (error) {
    return DEFAULT_THEME;
  }
}
