import React from 'react';
import View from '@/components/atomic/View';
import { Heading } from '@/components/atomic/Heading';
import { Text } from '@/components/atomic/Text';
import { useTheme } from 'styled-components/native';
import Button from '@/components/atomic/Button';
import styled from 'styled-components/native';

interface ErrorMsgProps {
	error: string;
	showButtons?: {
		retry: boolean;
		back: boolean;
		close: boolean;
	};
	onClose: () => void;
}

/**
 *
 */
export function ErrorMsg({ error, onClose, ...optionals }: ErrorMsgProps) {
	const { showButtons = { retry: false, back: false, close: true } } =
		optionals;
	const { close } = showButtons || {};

	// Hooks
	const theme = useTheme();
	const themeColor = theme.colorss.tertiary;

	return (
		<ContainerView>
			{/* <SadFaceIcon size={scale(96)} /> */}
			<View>
				<HeadingText themeColor={themeColor}>{error}</HeadingText>
				<CenteredText themeColor={themeColor}>
					Stopped waiting for scanner to connect.
				</CenteredText>
				<CenteredText themeColor={themeColor}>
					Please verify the scanner status by checking LED.
				</CenteredText>
			</View>
			<ButtonContainer>
				{close && <Button title="Close" onPress={onClose} type={'outline'} />}
			</ButtonContainer>
		</ContainerView>
	);
}

const ContainerView = styled(View)`
	justify-content: space-around;
	width: 100%;
	padding-top: 64px;
	padding-bottom: 32px;
	flex-grow: 1;
`;

const HeadingText = styled(Heading)<{ themeColor: string }>`
	margin-top: 8px;
	margin-bottom: 12px;
	color: ${({ themeColor }) => themeColor};
`;

const CenteredText = styled(Text)<{ themeColor: string }>`
	color: ${({ themeColor }) => themeColor};
	text-align: center;
	line-height: 24px;
`;

const ButtonContainer = styled(View)`
	margin-top: 32px;
	width: 100%;
	align-items: center;
`;
