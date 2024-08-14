import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import Button from '@/components/atomic/Button';
import InputPickerWithModal from '@/components/molecule/wifiConfig/InputPickerWithModal';
import { useForm } from 'react-hook-form';
import { FormPropsAuto, GetWifiFormInputsAuto } from '@/types/form';
import { useDispatch, useSelector } from 'react-redux';
import {
	getConnectedDeviceWifiPSWD,
	setConnectedDeviceWifiPSWD,
} from '@/providers/redux/slices';
import { BasicTemplate } from '@/components/template/BasicTemplate';
import useAppNavigation from '@/hooks/useAppNavigation';
import {
	addPasswordToHistory,
	getPasswordHistory,
} from '@/utils/passwordHistory';

const PasswordModalScreen = () => {
	const dispatch = useDispatch();
	const { ConfigurationSetting } = useAppNavigation();
	const currentPassword = useSelector(getConnectedDeviceWifiPSWD);
	const [history, setHistory] = useState<string[]>([]);

	// Save wifi password in global state and navigate back to WifiConfiguration screen
	const onPress = async (data: GetWifiFormInputsAuto) => {
		dispatch(setConnectedDeviceWifiPSWD(data.wifi_password));
		await addPasswordToHistory(data.wifi_password);
		const updatedHistory = await getPasswordHistory();
		setHistory(updatedHistory);
		ConfigurationSetting();
	};

	useEffect(() => {
		const fetchHistory = async () => {
			const savedHistory = await getPasswordHistory();
			setHistory(savedHistory);
		};
		fetchHistory();
	}, []);

	const {
		control,
		handleSubmit,
		setValue,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		formState: { errors },
		trigger,
	} = useForm<GetWifiFormInputsAuto>({
		defaultValues: {
			wifi_password: currentPassword,
		},
	});

	const passwordForm: FormPropsAuto = {
		control,
		setValue,
		options: history,
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
