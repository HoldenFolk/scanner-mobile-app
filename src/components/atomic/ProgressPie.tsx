import React from 'react';
import * as Progress from 'react-native-progress';
import { View } from './View';

interface ProgressPieProps {
	size?: number;
	indeterminate?: boolean;
	fill?: string;
	endAngle?: number;
	thickness?: number;
}

export function ProgressPie({
	size = 180,
	indeterminate = true,
	thickness = 10,
}: ProgressPieProps) {
	return (
		<View>
			<Progress.CircleSnail
				size={size}
				indeterminate={indeterminate}
				thickness={thickness}
			/>
		</View>
	);
}
