import React from 'react';
import styled from 'styled-components/native';
import { WifiSelectionItem } from '../molecule/wifiConfig/WifiSelectionItem';
import ScannerImage from '@/assets/scanner-MKMini02.png';
import Button from '../atomic/Button';
import Image from '../atomic/Image';
import { scale } from 'react-native-size-matters';

interface WifiConfigurationFormAutoProps {
	onCancel: () => void;
	onSubmit: () => void;
	onWifiSelect: () => void;
}

export const WifiConfigFormAuto = ({
	onCancel,
	onSubmit,
	onWifiSelect,
}: WifiConfigurationFormAutoProps) => {
	return (
		<Container>
			<InnerContainer>
				<WifiSelectionItem onPress={onWifiSelect} />
				<StyledImage source={ScannerImage} resizeMode="contain" />
			</InnerContainer>
			<ButtonContainer>
				<StyledButton title="Save" onPress={onSubmit} />
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
	margin-top: ${scale(16)}px;
	align-items: center;
`;

const InnerContainer = styled.View`
	flex: 1;
	width: 100%;
`;

const StyledImage = styled(Image)`
	/* margin: ${scale(9)}px; */
	border-radius: ${scale(30)}px;
	width: 100%;
	height: ${scale(300)}px;
	overflow: hidden;
`;

const ButtonContainer = styled.View`
	height: ${scale(80)}px;
	align-items: center;
	width: 100%;
`;

const StyledButton = styled(Button)`
	margin-top: auto;
	margin-bottom: auto;
`;
