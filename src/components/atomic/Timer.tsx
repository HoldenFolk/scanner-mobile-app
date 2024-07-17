import React, { useEffect } from 'react';
import { Text } from './Text';
import { View } from './View';
import { useStopwatch } from 'react-timer-hook';
import styled from 'styled-components/native';

const TimeText = styled(Text)`
	font-size: 32px;
	color: #00a4d7;
`;

const SmallerTimerText = styled(TimeText)`
	font-size: 16px;
`;

const TimerView = styled(View)`
	flex-direction: row;
	width: 100%;
	justify-content: center;
	align-items: center;
`;

// TODO: Fix missing dependencies
export function Timer({ shouldReset }: { shouldReset: boolean }) {
	const { seconds, minutes, start, reset } = useStopwatch({
		autoStart: false,
	});

	useEffect(() => {
		console.debug('Timer is mounted');
		start();
	}, []);

	useEffect(() => {
		if (shouldReset) {
			reset();
		}
	}, [shouldReset]);

	return (
		<TimerView>
			<TimeText>
				{String(minutes).padStart(2, '0')}
				<SmallerTimerText>m</SmallerTimerText>:
			</TimeText>
			<TimeText>
				{String(seconds).padStart(2, '0')}
				<SmallerTimerText>s</SmallerTimerText>
			</TimeText>
		</TimerView>
	);
}
