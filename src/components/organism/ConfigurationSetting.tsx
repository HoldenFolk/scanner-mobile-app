import React from 'react';
import { View } from '../atomic/View';
import { Text } from '../atomic/Text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BasicTemplate } from '../template/BasicTemplate';
import styled from 'styled-components/native';
import { PlugState, Wifi } from '@/types/scannerData';
import { PlugStateInfo } from '@/components/molecule/wifiConfig/ConfigureStateInfo';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootParamList } from '@/types/navigation';
import { useBluetoothConnect } from '@/hooks/useBluetoothConnect';
import WifiConfigForm from '@/components/organism/WifiConfigForm';

interface ConfigurationSettingProps {
	onNavigation: () => void;
	id: string;
	plugState: PlugState;
	wifiList: Wifi[];
	children?: React.ReactNode;
}

export function ConfigurationSetting({
	onNavigation,
	wifiList,
	id,
	plugState,
	...optionals
}: ConfigurationSettingProps) {
	const { children } = optionals;
	const navigation = useNavigation<DrawerNavigationProp<RootParamList>>();
	const { disconnectFromScanner } = useBluetoothConnect();
	console.log('ConfigurationSetting ~ wifiList:', wifiList);

	const handleCancel = async () => {
		try {
			await disconnectFromScanner(id);
		} catch (err) {
			// do nothing
			console.warn('err', (err as Error)?.message);
		} finally {
			navigation.goBack();
		}
	};

	return (
		<BasicTemplate>
			<Container>
				<StyledKeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
					<CenteredView>
						<Row>
							<StyledText>{'MAC:'}</StyledText>
							<StyledText>{id}</StyledText>
						</Row>
						<PlugStateInfo plugState={plugState || PlugState.UNCONFIGURED} />
					</CenteredView>

					<WifiConfigForm onNavigation={onNavigation} onCancel={handleCancel} />

					{children}
				</StyledKeyboardAwareScrollView>
			</Container>
		</BasicTemplate>
	);
}

const Container = styled(View)`
	flex: 1;
	padding: 16px;
	justify-content: space-between;
`;

const StyledKeyboardAwareScrollView = styled(KeyboardAwareScrollView)`
	width: 100%;
	margin-top: 16px;
`;

const CenteredView = styled(View)`
	align-items: center;
`;

const Row = styled(View)`
	background-color: transparent;
	flex-direction: row;
`;

const StyledText = styled(Text)`
	font-size: 18px;
	min-width: 60px;
`;
