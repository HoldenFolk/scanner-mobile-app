import React from 'react';
import View from '../atomic/View';
import { ProgressTimer } from './ProgressTimer';
import Button from '../atomic/Button';
import styled from 'styled-components/native';

interface ProgressGroupedProps {
	shouldShow: boolean;
	onCancel: () => void;
}

const StyledView = styled(View)<{ shouldShow: boolean }>`
	margin-top: 64px; /* Adjusted from tailwind's mt-16 */
	margin-bottom: 40px; /* Adjusted from tailwind's mb-10 */
	width: 100%;
	justify-content: space-between;
	flex-grow: 1;
	align-items: center;
	display: ${({ shouldShow }) => (shouldShow ? 'flex' : 'none')};
`;

/**
 * Progress timer and a cancel button
 */
export function ProgressGrouped({
	shouldShow,
	onCancel,
}: ProgressGroupedProps) {
	return (
		<StyledView shouldShow={shouldShow}>
			<ProgressTimer shouldReset={shouldShow} />
			<Button title="Cancel" onPress={onCancel} type={'outline'} />
		</StyledView>
	);
}
