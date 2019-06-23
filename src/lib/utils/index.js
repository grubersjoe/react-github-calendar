import color from 'tinycolor2';

import { DEFAULT_THEME } from './constants';

/**
 * Create a calendar color theme based on one color
 * @param {string} baseColor - The base color all lighter hues are calculated from
 * @param {string} textColor - Text color
 * @param {string} emptyCellColor
 * @param {string} background - Calendar background color. `transparent` by default
 * @throws {Error} - Throws an error if the color could not be parsed
 * @return {object} - The color theme object
 */
export function createCalendarTheme(
  baseColor,
  textColor = 'inherit',
  emptyCellColor = color('white')
    .darken(8)
    .toHslString(),
  background = 'transparent',
) {
  const base = color(baseColor);

  if (!base.isValid()) {
    return DEFAULT_THEME;
  }

  const text = color(textColor).isValid() ? color(textColor) : DEFAULT_THEME.text;

  return {
    background,
    text,
    grade4: base.setAlpha(0.92).toHslString(),
    grade3: base.setAlpha(0.76).toHslString(),
    grade2: base.setAlpha(0.6).toHslString(),
    grade1: base.setAlpha(0.44).toHslString(),
    grade0: emptyCellColor,
  };
}
