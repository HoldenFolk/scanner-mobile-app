import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import InputPickerWithModal from './InputPickerWithModal';
import Button from '@/components/atomic/Button';
import { WifiRequirementInfo } from './WifiRequirementInfo';
import { useForm } from 'react-hook-form';
import { GetWifiFormInputs } from '@/types/form';

type formType = 'wifi_ssid' | 'wifi_password';
export const SSID_NAME: formType = 'wifi_ssid';
export const PASSWORD_NAME: formType = 'wifi_password';

interface WifiConfigurationFormTypeFirstProps {
	onCancel: () => void;
	onSubmit: () => void;
	defaultValues?: object;
}

export function WifiConfigFormManual({
	onCancel,
	onSubmit,
	...optionals
}: WifiConfigurationFormTypeFirstProps) {
	const { defaultValues = {} } = optionals;

	const {
		control,
		handleSubmit,
		setValue,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		formState: { errors },
		trigger,
	} = useForm<GetWifiFormInputs>({ defaultValues });

	const handleConfirm = async (data: GetWifiFormInputs) => {
		onSubmit();
		console.log('Handle Confirm', data);
	};

	// TODO: Add WIfi history options
	const ssidForm = {
		control,
		setValue,
		options: ['option1', 'opttion2'], //_.sortedUniq(ssids),
		name: SSID_NAME,
		trigger,
	};

	const passwordForm = {
		control,
		setValue,
		options: ['option1', 'opttion2'], //_.sortedUniq(passwords),
		name: PASSWORD_NAME,
		trigger,
	};

	return (
		<Container>
			<ContentContainer>
				<InfoContainer>
					<WifiRequirementInfo />
				</InfoContainer>
				<InputPickerWithModal form={ssidForm} />
				<InputPickerWithModal form={passwordForm} />
			</ContentContainer>
			<ButtonContainer>
				<Button title="Save" onPress={handleSubmit(handleConfirm)} />
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
