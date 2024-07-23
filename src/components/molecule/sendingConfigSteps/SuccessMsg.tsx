import React from 'react';
import { View } from '@/components/atomic/View';
import { Button } from '@/components/atomic/Button';
import { Text } from '@/components/atomic/Text';
import { ModalTitle } from '@/components/atomic/Heading';
import { useTheme } from 'styled-components';
import { Icon } from '@/components/atomic/Icon';
import styled from 'styled-components/native';

const CenteredView = styled(View)`
	align-items: center;
`;

const StyledText = styled(Text)`
	color: ${({ theme }) => theme?.colors?.tertiary};
	line-height: 24px;
	text-align: center;
	margin-right: 16px;
	margin-left: 16px;
`;

interface SuccessViewProps {
	onConfirm: () => void;
	name?: string;
}

/**
 * Configuration success
 */
export function SuccessMsg({ onConfirm, name }: SuccessViewProps) {
	const theme = useTheme();
	return (
		<>
			<CenteredView>
				<Icon
					name="check-circle"
					type="font-awesome-5"
					size={64}
					color={theme.colors.secondary}
				/>
				<ModalTitle>Congratulations!</ModalTitle>
				<StyledText>{`The scanner ${
					name ?? ''
				} has been configured successfully! After reboot, if the connection is successful, the LED will illuminate green`}</StyledText>
			</CenteredView>
			<CenteredView>
				<Button title={'Finish'} onPress={onConfirm} type="solid" />
			</CenteredView>
		</>
	);
}
