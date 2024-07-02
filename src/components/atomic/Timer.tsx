import React, { useEffect } from 'react';
import { Text } from '@kaidu/shared/components/atomic/Text';
import { View } from '@kaidu/shared/components/atomic/View';
import { useStopwatch } from 'react-timer-hook';
import { tailwind } from '@kaidu/shared/lib/styles';
import { styled } from '@kaidu/shared/lib/styles';

const TimeText = styled(Text)`
	font-size: 32px;
	color: #00a4d7;
`;

const SmallerTimerText = styled(TimeText)`
	font-size: 16px;
`;

/**
 *
 */
export function Timer({ shouldReset, ...optionals }) {
	const { seconds, minutes, isRunning, start, pause, reset } = useStopwatch({
		autoStart: false,
	});

	useEffect(() => {
		console.debug('Timer is mounted');
		start();
	}, []);

	useEffect(() => {
		shouldReset && reset();
	}, [shouldReset]);

	return (
		<View style={tailwind('flex-row w-full justify-center items-center')}>
			<TimeText>
				{String(minutes).padStart(2, '0')}
				<SmallerTimerText>m</SmallerTimerText>:
			</TimeText>
			<TimeText>
				{String(seconds).padStart(2, '0')}
				<SmallerTimerText>s</SmallerTimerText>
			</TimeText>
		</View>
	);
}
