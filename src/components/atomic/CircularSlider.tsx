import React from 'react';
// import { styled } from '@kaidu/shared/lib/styles';
import { AnimatedCircularProgress } from 'react-native-circular-progress'; // https://www.npmjs.com/package/react-native-circular-progress

export default function CircularSlider({ ...rest }) {
	return <AnimatedCircularProgress {...rest} />;
}
