import React from 'react';
import {
	LinearProgress as RNElementLinearProgress,
	LinearProgressProps,
} from 'react-native-elements';

export function LinearProgress(props: LinearProgressProps) {
	return <RNElementLinearProgress {...props} color="primary" />;
}

export default LinearProgress;
