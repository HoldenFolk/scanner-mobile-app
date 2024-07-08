import React, { useMemo } from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
import plugPng from '@/assets/plug.png';
import plugWhitePng from '@/assets/plug-white.png';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';
import Icon from '../atomic/Icon';
import { Image } from '../atomic/Image';
import View from '../atomic/View';

interface DeviceIconProps {
	type: string;
	configurationStatus?: 'other' | 'configured' | 'unconfigured';
}

export function DeviceIcon({ type, configurationStatus }: DeviceIconProps) {
	const theme = useTheme();
	const iconColor = theme.colors.tertiary;
	const isLocked = configurationStatus === 'other';

	return (
		<Container>
			{type === 'lte' ? (
				<CenterView>
					<Icon
						name="cellphone-wireless"
						type="material-community"
						color={iconColor}
					/>
				</CenterView>
			) : isLocked ? (
				<LockAlert color={iconColor} />
			) : (
				<NormalDevice />
			)}
		</Container>
	);
}

interface LockAlertProps extends SvgProps {
	size?: number;
	color?: string;
}

function LockAlert({
	size = 48,
	color = 'currentColor',
	...rest
}: LockAlertProps) {
	return (
		<Svg
			height={48}
			width={48}
			viewBox={`0 0 ${size / 2} ${size / 2}`}
			{...rest}
		>
			<Path fill="none" d="M0 0h24v24H0z" />
			<Path
				fill={color}
				d="M10 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m6-9c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V10c0-1.1.9-2 2-2h1V6c0-2.8 2.2-5 5-5s5 2.2 5 5v2h1m-6-5C8.3 3 7 4.3 7 6v2h6V6c0-1.7-1.3-3-3-3m12 10h-2V7h2v6m0 4h-2v-2h2v2Z"
			/>
		</Svg>
	);
}

function NormalDevice() {
	const theme = useTheme();
	const isDarkMode = theme?.name === 'dark';
	const imageSrc = useMemo(
		() => (isDarkMode ? plugWhitePng : plugPng),
		[isDarkMode],
	);

	return <StyledImage source={imageSrc} resizeMode="contain" />;
}

const Container = styled(View)`
	width: 56px;
	height: 56px;
	padding: 8px;
	margin: 4px;
	margin-right: 12px;
	border-radius: 8px;
	background-color: transparent;
`;

const CenterView = styled(View)`
	background-color: transparent;
	flex: 1;
	justify-content: center;
	align-items: center;
`;

const StyledImage = styled(Image)`
	flex: 1;
	width: null;
`;
