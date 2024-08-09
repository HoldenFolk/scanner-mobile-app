import React from 'react';
import { View } from '../atomic/View';
import { Text } from '../atomic/Text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BasicTemplate } from '../template/BasicTemplate';
import styled from 'styled-components/native';
import { PlugState } from '@/types/scannerData';
import { PlugStateInfo } from '@/components/molecule/wifiConfig/ConfigureStateInfo';
import { useBluetoothConnect } from '@/hooks/useBluetoothConnect';
import useAppNavigation from '@/hooks/useAppNavigation';
import { WifiConfigFormAuto } from './WifiConfigFormAuto';

interface ConfigurationSettingProps {
	onNavigation: () => void;
	onWifiSelect: () => void;
	id: string;
	macAddress: string;
	plugState: PlugState;
	children?: React.ReactNode;
}

export function ConfigurationSetting({
	onNavigation,
	onWifiSelect,
	id,
	macAddress,
	plugState,
	...optionals
}: ConfigurationSettingProps) {
	const { children } = optionals;
	const { Home } = useAppNavigation();
	const { disconnectFromScanner } = useBluetoothConnect();

	const handleCancel = async () => {
		try {
			await disconnectFromScanner(id);
		} catch (err) {
			// do nothing
			console.warn('err', (err as Error)?.message);
		} finally {
			Home();
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

					<WifiConfigFormAuto
						onCancel={handleCancel}
						onWifiSelect={onWifiSelect}
						onSubmit={onNavigation}
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
