import React from 'react';
import * as Progress from 'react-native-progress';

/**
 * a small spinner
 */
export function Spinner({ size = 32, ...optionals }) {
	return (
		<Progress.Circle size={size} borderWidth={5} indeterminate {...optionals} />
	);
}
