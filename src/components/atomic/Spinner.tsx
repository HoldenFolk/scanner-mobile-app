import React from 'react';
import * as Progress from 'react-native-progress';

interface SpinnerProps extends Progress.CirclePropTypes {
	size?: number;
}

/**
 * a small spinner
 */
export function Spinner({ size = 32, ...optionals }: SpinnerProps) {
	return (
		<Progress.Circle
			size={size}
			borderWidth={5}
			indeterminate={true}
			{...optionals}
		/>
	);
}
