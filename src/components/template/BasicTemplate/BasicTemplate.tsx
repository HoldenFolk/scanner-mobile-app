import React, { ReactNode } from 'react';
import { StatusBar, useColorScheme, ViewProps } from 'react-native';
import styled from 'styled-components/native';

interface BasicTemplateProps extends ViewProps {
	children: ReactNode;
}

const StyledSafeAreaView = styled.SafeAreaView<{ isDarkMode: boolean }>`
	flex: 1;
	background-color: ${props =>
		props.isDarkMode ? props.theme.colors.primary : props.theme.colors.white};
`;

export function BasicTemplate({ children, ...rest }: BasicTemplateProps) {
	const isDarkMode = useColorScheme() === 'dark';

	return (
		<StyledSafeAreaView isDarkMode={isDarkMode} {...rest}>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
			{children}
		</StyledSafeAreaView>
	);
}
