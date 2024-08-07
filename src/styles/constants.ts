import { DefaultTheme } from 'styled-components';
import { darkPalette, lightPalette } from './palette';
import { fonts } from './fonts';
import { sizes } from './sizes';
import { breakpoints, device } from './breakpoints';

export const darkTheme: DefaultTheme = {
	darkPalette,
	colors: darkPalette,
	name: 'dark',
	fonts,
	sizes,
	breakpoints,
	device,
};

export const lightTheme: DefaultTheme = {
	lightPalette,
	colors: lightPalette,
	name: 'light',
	fonts,
	sizes,
	breakpoints,
	device,
};
