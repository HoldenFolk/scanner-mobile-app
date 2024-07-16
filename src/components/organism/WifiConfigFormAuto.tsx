import React from 'react';
import styled from 'styled-components/native';
import { WifiListItem } from '../molecule/wifiConfig/WifiListItem';
import ScannerImage from '@/assets/scanner-MKMini02.png';
import Button from '../atomic/Button';
import { useSelector } from 'react-redux';
import { getConnectedDeviceId } from '@/providers/redux/slices';
import { useScannerConfigure } from '@/hooks/useScannerConfigure';

interface WifiConfigurationFormAutoProps {
	onCancel: () => void;
	onWifiSelect: () => void;
}

export const WifiConfigFormAuto = ({
	onCancel,
	onWifiSelect,
}: WifiConfigurationFormAutoProps) => {
	const connectedId = useSelector(getConnectedDeviceId);
	const { configureDeviceWifi } = useScannerConfigure();
	const handleSubmit = () => {
		console.log('configuring device wifi');
		configureDeviceWifi(connectedId);
	};

	return (
		<Container>
			<InnerContainer>
				<WifiListItem onPress={onWifiSelect} />
				<StyledImage source={ScannerImage} resizeMode="contain" />
			</InnerContainer>
			<ButtonContainer>
				<StyledButton title="Save" onPress={handleSubmit} />
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
};

const Container = styled.View`
	width: 100%;
	margin-top: 16px;
	align-items: center;
`;

const InnerContainer = styled.View`
	flex: 1;
`;

const StyledImage = styled.Image`
	flex: 1;
	margin: 10px;
	border-radius: 10px;
	overflow: hidden;
`;

const ButtonContainer = styled.View`
	height: 160px;
	align-items: center;
	width: 100%;
`;

const StyledButton = styled(Button)`
	margin-top: auto;
	margin-bottom: auto;
`;
