import React from 'react';
import { Timer } from '../atomic/Timer';
import View from '../atomic/View';
import { ProgressPie } from '../atomic/ProgressPie';
import styled from 'styled-components/native';

const CenteredView = styled(View)`
	width: 100%;
	align-items: center;
`;

const TimerContainer = styled(View)`
	margin-top: 20px; /* Adjusted from tailwind's mt-5 */
	width: 100%;
`;

/**
 *
 */
export function ProgressTimer({ shouldReset }: { shouldReset: boolean }) {
	return (
		<CenteredView>
			<ProgressPie />
			<TimerContainer>
				<Timer shouldReset={shouldReset} />
			</TimerContainer>
		</CenteredView>
	);
}
