import React from 'react';
import { View } from '@kaidu/shared/components/atomic/View';
import * as Progress from 'react-native-progress';

export function ProgressPie({
	size = 180,
	indeterminate = true,
	fill = '#222',
	endAngle = 0.75,
	thickness = 10,
	...rest
}) {
	return (
		<View>
			<Progress.CircleSnail
				size={size}
				indeterminate={indeterminate}
				fill={fill}
				endAngle={endAngle}
				thickness={thickness}
			/>
		</View>
	);
}
