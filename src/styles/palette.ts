const base = {
	grayscale: [
		'#212121',
		'#414141',
		'#616161',
		'#9e9e9e',
		'#bdbdbd',
		'#e0e0e0',
		'#eeeeee',
		'#ffffff',
	],
	error: '#FF808B',
	blue: '#2f64d7',
	purple: '#9698D6',
	white: '#FFFFFF',
};

export const darkPalette = {
	primary: '#0D0D0D',
	secondary: '#5E81F4',
	tertiary: '#F6F6F6',
	fourth: '#8181A5',
	fifth: '#F5F5FA',
	backgroundLight: '#F5F5FA',
	buttonHover: '#475EAA',
	success: '#11C063',
	danger: '#E9505C',
	warn: '#F6C776',
	...base,
};

export const lightPalette = {
	primary: '#FFF',
	secondary: '#5E81F4',
	tertiary: '#1C1D21',
	fourth: '#8181A5',
	fifth: '#2481cc',
	success: '#0FA958',
	danger: '#E63946',
	warn: '#F4BE5E',
	...base,
};
