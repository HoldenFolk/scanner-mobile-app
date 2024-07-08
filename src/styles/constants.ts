import { DefaultTheme } from 'styled-components';
import { palette } from './palette';
import { fonts } from './fonts';
import { sizes } from './sizes';
import { breakpoints, device } from './breakpoints';

export const theme: DefaultTheme = {
	palette,
	colors: palette,
	name: 'dark',
	fonts,
	sizes,
	breakpoints,
	device,
};

export const headingFontFamily = `
  --font-family-sans-serif: -apple-system, BlinkMacSystemFont, 'Segoe UI',
  Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif,
  'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas,
  'Liberation Mono', 'Courier New', monospace;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
  'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif,
  'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
`;
