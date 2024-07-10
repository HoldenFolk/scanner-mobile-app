import React from 'react';
import { View } from '../../../components/atomic/View';
import { Text } from '../../../components/atomic/Text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BasicTemplate } from '../../../components/template/BasicTemplate';
import styled from 'styled-components/native';
import { PlugState, ScannerData } from '@/types/scannerData';
import { WifiConfigFormManual } from '@/components/organism/WifiConfigFormManual';
import { PlugStateInfo } from '@/components/molecule/wifiConfig/ConfigureStateInfo';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootParamList } from '@/types/navigation';
import { useBluetoothConnect } from '@/hooks/useBluetoothConnect';

interface ConfigurationSettingProps {
	onNavigation: () => void;
	device: ScannerData;
	wifiList: string[];
	onWifiChangeNavigation?: () => void;
	children?: React.ReactNode;
}

export function ConfigurationSetting({
	onNavigation,
	wifiList,
	...optionals
}: ConfigurationSettingProps) {
	const { device, children } = optionals;
	const { id: macAddress, plugState } = device || {};
	const navigation = useNavigation<DrawerNavigationProp<RootParamList>>();
	const { disconnectFromScanner } = useBluetoothConnect();
	console.log('ConfigurationSetting ~ wifiList:', wifiList);

	const handleCancel = async () => {
		try {
			await disconnectFromScanner(macAddress);
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
							<StyledText>{macAddress}</StyledText>
						</Row>
						<PlugStateInfo plugState={plugState || PlugState.UNCONFIGURED} />
					</CenteredView>

					{/*Add wifi modal for selecting wifi from the scanned network list*/}
					<WifiConfigFormManual
						onSubmit={onNavigation}
						onCancel={handleCancel}
					/>

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
