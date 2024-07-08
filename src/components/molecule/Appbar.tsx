import React from 'react';
import styled from 'styled-components/native';
import { Text } from '../atomic/Text';
import { View, ViewProps } from 'react-native';
import { scale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { LinearProgress } from '../atomic/LinearProgress';
import { getIsScanning } from '@/providers/redux/slices';

interface AppbarProps extends ViewProps {
	title: string;
	version?: string;
	leftComponent?: React.ReactNode;
	rightComponent?: React.ReactNode;
	selectedCustomerName?: string;
}

const Appbar: React.FC<AppbarProps> = ({
	children,
	title,
	version,
	leftComponent,
	rightComponent,
	selectedCustomerName,
	...rest
}) => {
	const isScanning = useSelector(getIsScanning);

	return (
		<>
			<Container {...rest}>
				<SideContainer>{leftComponent}</SideContainer>
				<CenterContainer>
					<Title>{title}</Title>
					{version && <Version>v{version}</Version>}
				</CenterContainer>
				<SideContainer>{rightComponent}</SideContainer>
				{children}
			</Container>
			{isScanning && (
				<LinearProgress
					accessibilityLabel="Linear Progress Bar"
					testID="Linear Progress Bar"
				/>
			)}
			{selectedCustomerName && (
				<SecondaryContainer>
					<SelectedCustomerName>{selectedCustomerName}</SelectedCustomerName>
				</SecondaryContainer>
			)}
		</>
	);
};

export default Appbar;

// Styled components
const Container = styled(View)`
	padding: 8px;
	background-color: ${props => props.theme.colors.secondary};
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
`;

const SecondaryContainer = styled(View)`
	padding: 6px 0 0 0;
	align-items: center;
	justify-content: center;
	flex-direction: row;
`;

const Title = styled(Text)`
	color: ${props => props.theme.colors.primary};
	font-size: 24px;
	margin: auto;
`;

const Version = styled(Text)`
	color: ${props => props.theme.colors.primary};
	align-self: center;
	font-size: 11px;
`;

const SelectedCustomerName = styled(Text)`
	color: ${props => props.theme.colors.secondary};
	align-self: center;
	font-size: ${scale(16)}px;
`;

const SideContainer = styled(View)`
	background-color: transparent;
	margin-left: 8px;
`;

const CenterContainer = styled(View)`
	flex: 4;
	flex-direction: column;
	background-color: transparent;
	align-items: center;
`;
