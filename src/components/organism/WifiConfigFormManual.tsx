import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import InputPickerWithModal from '../molecule/wifiConfig/InputPickerWithModal';
import Button from '@/components/atomic/Button';
import { WifiRequirementInfo } from '../molecule/wifiConfig/WifiRequirementInfo';
import { WifiFormReturn } from '@/types/form';

interface WifiConfigurationFormManualProps {
	onCancel?: () => void;
	form: WifiFormReturn;
}

// Wifi Configuration Form for manual input when no wifi is found by the scanner
export function WifiConfigFormManual({
	onCancel,
	form,
}: WifiConfigurationFormManualProps) {
	const { handleSubmit, ssidForm, passwordForm } = form;

	return (
		<Container>
			<ContentContainer>
				<InfoContainer>
					<WifiRequirementInfo />
				</InfoContainer>
				<InputPickerWithModal form={ssidForm} label={'Wifi SSID'} />
				<InputPickerWithModal form={passwordForm} label={'Wi-Fi Password'} />
			</ContentContainer>
			<ButtonContainer>
				<StyledButton title="Save" onPress={handleSubmit} />
				{onCancel && (
					<Button
						title="Cancel"
						onPress={onCancel}
						type={'outline'}
						accessibilityLabel="Cancel Button"
						testID={'Cancel Button'}
					/>
				)}
			</ButtonContainer>
		</Container>
	);
}

const StyledButton = styled(Button)`
	margin-bottom: 16px;
`;

const Container = styled(View)`
	width: 100%;
	margin-top: 16px;
`;

const ContentContainer = styled(View)`
	margin-bottom: 16px;
`;

const InfoContainer = styled(View)`
	margin-bottom: 16px;
`;

const ButtonContainer = styled(View)`
	height: 160px;
	padding: 0 32px;
	align-items: center;
	width: 100%;
	margin-bottom: 16px;
`;
