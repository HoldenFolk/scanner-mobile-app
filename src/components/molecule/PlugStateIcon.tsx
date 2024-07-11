import React from 'react';
import { useTheme } from 'styled-components/native';
import Svg, { Path, SvgProps } from 'react-native-svg';
import Icon from '../atomic/Icon';
import { DefaultTheme } from 'styled-components';
import { PlugState } from '@/types/scannerData';
import { scale } from 'react-native-size-matters';

function getIconNameAndColor(type: PlugState, theme: DefaultTheme) {
	let name;
	let color: string;
	// let iconType = 'font-awesome';
	switch (type) {
		case PlugState.CONFIGURED: // not connected
			name = 'unlink';
			color = theme?.colors?.danger;
			break;
		case PlugState.WIFI_DISCONNECTED: // not connected
			name = 'unlink';
			color = theme?.colors?.danger;
			break;
		case PlugState.MQTT_DISCONNECTED: // not connected
			name = 'unlink';
			color = theme?.colors?.danger;
			break;
		case PlugState.CONNECTED: // connected
			name = 'check-circle';
			color = theme?.colors?.success;
			break;
		case PlugState.UNCONFIGURED: // unconfigured
			name = 'exclamation-circle';
			color = theme?.colors?.warn;
			break;
		case PlugState.WIFI_SSID_NOT_FOUND: //
			name = 'wifi-alert';
			color = theme?.colors?.danger;
			break;
		default:
			name = 'exclamation-circle'; // default: unconfigured
			color = theme?.colors?.warn;
	}

	return { name, color };
}

/**
 *
 */

export function PlugStateIcon({ type, ...optionals }: { type: PlugState }) {
	const theme = useTheme();

	const iconType = 'fontawesome';
	const { name, color } = getIconNameAndColor(type, theme);

	if (!name) {
		return null;
	}

	if (name === 'exclamation-circle') {
		return <UnconfiguredIcon color={color} />;
	} else if (name === 'unlink') {
		return <UnconnectedIcon color={color} />;
	} else if (name === 'check-circle') {
		return <ConnectedIcon color={color} />;
	} else if (name === 'wifi-alert') {
		return <WifiNotFoundIcon color={color} />;
	}
	const size = scale(38);

	return (
		<>
			<Icon
				type={iconType}
				name={name}
				// TODO: May need to scale this
				size={size}
				color={color}
				{...optionals}
			/>
		</>
	);
}

interface StatusIconProps extends SvgProps {
	size?: number;
}

const UnconfiguredIcon = ({
	size = 48,
	color = 'currentColor',
	...rest
}: StatusIconProps) => (
	<Svg
		height={size}
		width={size}
		viewBox={`0 0 ${size / 2} ${size / 2}`}
		{...rest}
	>
		<Path fill="none" d="M0 0h24v24H0z" />
		<Path
			fill={color}
			d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"
		/>
	</Svg>
);

const UnconnectedIcon = ({
	size = 48,
	color = 'currentColor',
	...rest
}: StatusIconProps) => (
	<Svg width={size} viewBox="0 0 48 48" height={size} {...rest}>
		<Path fill="none" d="M0 0h48v48H0z" />
		<Path
			fill={color}
			d="M27 38.25a3 3 0 1 1 -3 -3 3 3 0 0 1 3 3Zm13.688 -23.25 2.91 -2.908a2.25 2.25 0 0 0 -3.188 -3.188L37.5 11.813l-2.908 -2.904a2.25 2.25 0 0 0 -3.188 3.188L34.313 15l-2.904 2.908a2.25 2.25 0 0 0 3.188 3.188L37.5 18.188l2.908 2.91a2.25 2.25 0 0 0 3.188 -3.188Zm-7.856 14.119a15 15 0 0 0 -17.649 0 2.25 2.25 0 1 0 2.649 3.637 10.5 10.5 0 0 1 12.351 0 2.25 2.25 0 0 0 2.649 -3.637ZM24.696 12.75h0.056a2.25 2.25 0 0 0 0.053 -4.5H24A33.051 33.051 0 0 0 3.073 15.733a2.25 2.25 0 1 0 2.856 3.478A28.545 28.545 0 0 1 24 12.75h0.696Zm-0.022 9a2.25 2.25 0 0 0 0.154 -4.5H24a23.749 23.749 0 0 0 -14.897 5.183 2.25 2.25 0 0 0 2.794 3.527A19.292 19.292 0 0 1 24 21.75c0.225 0 0.452 0 0.673 0.011Z"
		/>
	</Svg>
);

const ConnectedIcon = ({
	size = 48,
	color = 'currentColor',
	...rest
}: StatusIconProps) => (
	<Svg width={size} height={size} viewBox="0 0 48 48" {...rest}>
		<Path fill="none" d="M0 0h48v48H0z" />
		<Path
			fill={color}
			d="M4.12 20.12c1.02 1.02 2.64 1.12 3.74 0.2 9.34 -7.68 22.9 -7.68 32.26 -0.02 1.12 0.92 2.76 0.84 3.78 -0.18 1.18 -1.18 1.1 -3.14 -0.2 -4.2 -11.42 -9.34 -27.94 -9.34 -39.38 0 -1.3 1.04 -1.4 3 -0.2 4.2zm15.52 15.52 2.94 2.94c0.78 0.78 2.04 0.78 2.82 0l2.94 -2.94c0.94 -0.94 0.74 -2.56 -0.46 -3.18a8.56 8.56 0 0 0 -7.82 0c-1.14 0.62 -1.36 2.24 -0.42 3.18zm-7.46 -7.46c0.98 0.98 2.52 1.08 3.66 0.26a14.128 14.128 0 0 1 16.32 0c1.14 0.8 2.68 0.72 3.66 -0.26l0.02 -0.02c1.2 -1.2 1.12 -3.24 -0.26 -4.22 -6.88 -4.98 -16.26 -4.98 -23.16 0 -1.38 1 -1.46 3.02 -0.24 4.24z"
		/>
	</Svg>
);

const WifiNotFoundIcon = ({
	size = 48,
	color = 'currentColor',
	...rest
}: StatusIconProps) => (
	<Svg width={size} height={size} viewBox="0 0 48 48" {...rest}>
		<Path fill="none" d="M0 0h48v48H0z" />
		<Path
			fill={color}
			d="M35.568 21.416c0.238 0.238 0.47 0.486 0.694 0.74a5.034 5.034 0 0 0 -4.612 1.12 12.258 12.258 0 0 0 -18.51 4.094 2 2 0 0 1 -3.568 -1.806 16.256 16.256 0 0 1 25.996 -4.148Zm-11.658 16.59 2.436 -4.874a3.002 3.002 0 1 0 -2.436 4.874Zm4.146 -8.298 1.81 -3.624a10.468 10.468 0 0 0 -13.196 1.316 10.5 10.5 0 0 0 -2.18 3.226 2 2 0 1 0 3.664 1.602c0.334 -0.762 0.788 -1.444 1.344 -2a6.466 6.466 0 0 1 8.56 -0.52ZM40.84 16.6c1.016 1.016 1.974 2.174 2.808 3.382a2 2 0 0 1 -3.292 2.272c-0.7 -1.012 -1.504 -1.986 -2.344 -2.826 -7.744 -7.744 -20.3 -7.744 -28.046 0 -0.798 0.798 -1.594 1.772 -2.32 2.82a2 2 0 0 1 -3.288 -2.28c0.856 -1.236 1.802 -2.39 2.78 -3.368 9.306 -9.308 24.396 -9.308 33.702 0Zm-8.524 9.062 -7.994 15.996A3 3 0 0 0 27.006 46h15.988a3 3 0 0 0 2.686 -4.344l-7.994 -15.996c-1.106 -2.214 -4.266 -2.214 -5.372 0ZM36 30.992v6.002a1 1 0 0 1 -2 0v-6.002a1 1 0 0 1 2 0Zm-1 11.006a1 1 0 1 1 0 -2.002 1 1 0 0 1 0 2Z"
		/>
	</Svg>
);
