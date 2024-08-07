import React, { useState, createContext, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/constants';

interface ThemeProps {
	children: ReactNode;
}

// Create a context for the theme
export const ThemeToggleContext = createContext(() => {});

// Global theme provider for the application
function Theme({ children }: ThemeProps) {
	const [theme, setTheme] = useState(lightTheme);

	const toggleTheme = () => {
		setTheme(prevTheme => (prevTheme === lightTheme ? darkTheme : lightTheme));
	};

	return (
		<ThemeToggleContext.Provider value={toggleTheme}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ThemeToggleContext.Provider>
	);
}

export default Theme;
