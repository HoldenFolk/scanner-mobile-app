import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/constants';

interface ThemeProps {
	children: ReactNode;
}

// Global theme provider for the application
function Theme({ children }: ThemeProps) {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Theme;
