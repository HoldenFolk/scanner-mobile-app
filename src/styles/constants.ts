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
