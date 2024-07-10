import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import InputPickerWithModal from '../molecule/wifiConfig/InputPickerWithModal';
import Button from '@/components/atomic/Button';
import { WifiRequirementInfo } from '../molecule/wifiConfig/WifiRequirementInfo';
import { useWifiConfigFormManual } from '@/hooks/useWifiConfigFormManual';

interface WifiConfigurationFormTypeFirstProps {
	onCancel: () => void;
	onSubmit: () => void;
	defaultValues?: object;
}

// Wifi Configuration Form for manual input when no wifi is found by the scanner
// TODO: Add history options
export function WifiConfigFormManual({
	onCancel,
	onSubmit,
	defaultValues,
}: WifiConfigurationFormTypeFirstProps) {
	const { handleSubmit, ssidForm, passwordForm } = useWifiConfigFormManual({
		defaultValues,
		onSubmit,
	});

	return (
		<Container>
			<ContentContainer>
				<InfoContainer>
					<WifiRequirementInfo />
				</InfoContainer>
				<InputPickerWithModal form={ssidForm} label={'Wifi SSID'} />
				<InputPickerWithModal form={passwordForm} label={'Wifi Password'} />
			</ContentContainer>
			<ButtonContainer>
				<Button title="Save" onPress={handleSubmit} />
				<Button
					title="Cancel"
					onPress={onCancel}
					type={'outline'}
					accessibilityLabel="Cancel Button"
					testID={'Cancel Button'}
				/>
			</ButtonContainer>
		</Container>
	);
}

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
