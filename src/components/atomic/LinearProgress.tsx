import React from 'react';
import { LinearProgress as RNElementLinearProgress } from 'react-native-elements';
// import { styled } from '@kaidu/shared/lib/styles';

export function LinearProgress(props) {
	return <RNElementLinearProgress {...props} color="primary" />;
}

export default LinearProgress;
