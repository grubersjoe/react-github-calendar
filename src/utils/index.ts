import color, { ColorInput } from 'tinycolor2';

import { DEFAULT_THEME, NAMESPACE, Theme } from './constants';

export function createCalendarTheme(
  baseColor: ColorInput,
  textColor = 'inherit',
  emptyCellColor = color('white').darken(8).toHslString(),
  background = 'transparent',
): Theme {
  const base = color(baseColor);

  if (!base.isValid()) {
    return DEFAULT_THEME;
  }

  const text = color(textColor).isValid() ? String(color(textColor)) : DEFAULT_THEME.text;

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

export function getClassName(name: string, extra?: string): string {
  if (extra) {
    return `${NAMESPACE}__${name} ${extra}`;
  }

  return `${NAMESPACE}__${name}`;
}
