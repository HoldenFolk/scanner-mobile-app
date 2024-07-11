import React from 'react';
import styled from 'styled-components/native';
import { Icon } from '../../../components/atomic/Icon';
import { BasicTemplate } from '../../../components/template/BasicTemplate';
import { View as AtomicView } from '@/components/atomic/View';
import { BasicListItem } from '../ListItem';
import { RSSIStrengthIcon } from '../scannerItem/RSSIStrengthIcon';
import { isFilledArray } from '@/utils/array';
import { Wifi } from '@/types/scannerData';
import BaseScrollView from '@/components/atomic/ScrollView';

interface WifiSelectionModalProps {
	wifiOptions: Wifi[];
	onPasswordChangeNavigation: (ssid: Wifi) => void;
	onOtherWifiNavigation: () => void;
	currentSsid?: string;
}

// TODO: Modularize/simplify this component
const WifiSelectionModal: React.FC<WifiSelectionModalProps> = ({
	wifiOptions,
	onPasswordChangeNavigation,
	onOtherWifiNavigation,
	currentSsid,
}) => {
	const handlePressWifiOptionItem = (option: Wifi) => {
		console.log('Go to set password for SSID:', option);
		onPasswordChangeNavigation(option);
	};

	const handlePressOther = () => {
		console.log('Go to set password for SSID: Other');
		onOtherWifiNavigation();
	};

	return (
		<BasicTemplate>
			<StyledView>
				{isFilledArray(wifiOptions) && (
					<AtomicView>
						<StyledScrollView keyboardShouldPersistTaps="handled">
							{wifiOptions.map((item, index) => (
								<BasicListItem
									key={index}
									title={item.ssid}
									onPress={() => handlePressWifiOptionItem(item)}
									leftComponent={
										<LeftComponentView>
											{item.rssi === currentSsid && (
												<Icon
													name="check-circle"
													type="font-awesome-5"
													size={26}
												/>
											)}
										</LeftComponentView>
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

export default WifiSelectionModal;
