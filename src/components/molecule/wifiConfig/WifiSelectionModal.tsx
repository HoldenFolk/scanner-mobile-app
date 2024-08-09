import React from 'react';
import styled from 'styled-components/native';
import { BasicTemplate } from '../../../components/template/BasicTemplate';
import { View as AtomicView } from '@/components/atomic/View';
import { BasicListItem } from '../ListItem';
import { RSSIStrengthIcon } from '../scannerItem/RSSIStrengthIcon';
import { isFilledArray } from '@/utils/array';
import { Wifi } from '@/types/scannerData';
import BaseScrollView from '@/components/atomic/ScrollView';
import { SelectedCheckIcon } from '@/components/atomic/SelectedCheckIcon';
import Icon from '@/components/atomic/Icon';
import { Heading, H2 } from '@/components/atomic/Heading';
import { Text } from '@/components/atomic/Text';

interface WifiSelectionModalProps {
	wifiOptions: Wifi[];
	onPasswordChangeNavigation: (ssid: Wifi) => void;
	handlePressOther: () => void;
	currentSsid?: string;
}

// TODO: Modularize this component
const WifiSelectionModal: React.FC<WifiSelectionModalProps> = ({
	wifiOptions,
	onPasswordChangeNavigation,
	handlePressOther,
	currentSsid,
}) => {
	return (
		<BasicTemplate>
			<StyledView>
				{isFilledArray(wifiOptions) && (
					<AtomicView>
						{wifiOptions && (
							<>
								<Heading>No Wi-Fi networks found by scanner</Heading>
								<StyledText>
									*Refresh Wi-Fi network or enter SSID manually to continue
								</StyledText>
							</>
						)}
						<StyledScrollView keyboardShouldPersistTaps="handled">
							{wifiOptions.map((item, index) => (
								<BasicListItem
									key={index}
									title={item.ssid}
									onPress={() => onPasswordChangeNavigation(item)}
									leftComponent={
										item.ssid === currentSsid && <SelectedCheckIcon />
									}
									rightComponent={
										item.rssi && <RSSIStrengthIcon value={Number(item.rssi)} />
									}
									bottomDivider
								/>
							))}
							<BasicListItem
								title="Other..."
								onPress={handlePressOther}
								leftComponent={
									<LeftComponentView>
										{!currentSsid && (
											<Icon
												name="check-circle"
												type="font-awesome-5"
												size={26}
											/>
										)}
									</LeftComponentView>
								}
							/>
						</StyledScrollView>
					</AtomicView>
				)}
			</StyledView>
		</BasicTemplate>
	);
};

const StyledView = styled(AtomicView)`
	width: 100%;
	flex-grow: 1;
	padding: 16px;
`;

const StyledScrollView = styled(BaseScrollView)`
	padding-left: 8px;
	padding-right: 8px;
`;

const LeftComponentView = styled(AtomicView)`
	width: 28px;
	background-color: transparent;
`;

const StyledText = styled(Text)`
	font-size: 15px;
	min-width: 60px;
	text-align: center;
	color: ${({ theme }) => theme.colors.fourth};
`;

export default WifiSelectionModal;
