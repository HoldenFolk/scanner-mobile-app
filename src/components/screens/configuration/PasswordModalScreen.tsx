import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import Button from '@/components/atomic/Button';
import InputPickerWithModal from '@/components/molecule/wifiConfig/InputPickerWithModal';
import { useForm } from 'react-hook-form';
import { FormPropsAuto, GetWifiFormInputsAuto } from '@/types/form';
import { useDispatch } from 'react-redux';
import { setConnectedDeviceWifiPSWD } from '@/providers/redux/slices';
import { BasicTemplate } from '@/components/template/BasicTemplate';
import useAppNavigation from '@/hooks/useAppNavigation';

const PasswordModalScreen = () => {
	const dispatch = useDispatch();
	const { ConfigurationSetting } = useAppNavigation();

	// Save wifi password in global state and navigate back to WifiConfiguration screen
	const onPress = (data: GetWifiFormInputsAuto) => {
		dispatch(setConnectedDeviceWifiPSWD(data.wifi_password));
		ConfigurationSetting();
	};

	const {
		control,
		handleSubmit,
		setValue,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		formState: { errors },
		trigger,
	} = useForm<GetWifiFormInputsAuto>({});

	const passwordForm: FormPropsAuto = {
		control,
		setValue,
		options: ['option1', 'option2'], // replace with actual options
		name: 'wifi_password',
		trigger,
	};
	return (
		<BasicTemplate>
			<Container>
				<ContentContainer>
					<InputPickerWithModal form={passwordForm} label={'Wi-Fi Password'} />
				</ContentContainer>
				<ButtonContainer>
					<StyledButton title="Save" onPress={handleSubmit(onPress)} />
				</ButtonContainer>
			</Container>
		</BasicTemplate>
	);
};

export default PasswordModalScreen;

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

const ButtonContainer = styled(View)`
	height: 160px;
	padding: 0 32px;
	align-items: center;
	width: 100%;
	margin-bottom: 16px;
`;
