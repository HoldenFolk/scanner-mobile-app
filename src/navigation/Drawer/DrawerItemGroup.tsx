import React from 'react';
import styled from 'styled-components/native';
import { Linking } from 'react-native';
import { DocShieldIcon } from './DocShieldIcon';
import { VersionText } from '@/components/molecule/VersionText';
import Icon from '@/components/atomic/Icon';
import settings from '@/globalConstants';
import { BasicListItem } from '@/components/molecule/ListItem';
import { View } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

const ICON_SIZE = 38;

const handlePrivacyPolicy = () => {
	Linking.openURL('https://www.kaidu.ai/privacypolicy');
};

const handleFeedback = () => {
	Linking.openURL('https://www.kaidu.ai/contact');
};

const Container = styled(View)`
	background-color: transparent;
	flex: 1;
	padding: 8px 4px;
`;

const Content = styled(View)`
	background-color: transparent;
	flex: 1;
`;

const StyledBasicListItem = styled(BasicListItem)`
	padding-horizontal: 0;
`;

/**
 * Main content in the drawer side bar
 */
export function DrawerItemGroup(_props: DrawerContentComponentProps) {
	return (
		<Container>
			<Content>
				<StyledBasicListItem
					title={'Privacy Policy'}
					onPress={handlePrivacyPolicy}
					leftComponent={<DocShieldIcon size={ICON_SIZE} />}
				/>
				<StyledBasicListItem
					title={'Send feedback'}
					onPress={handleFeedback}
					leftComponent={
						<Icon name={'comment'} type="font-awesome" size={ICON_SIZE} />
					}
				/>
			</Content>
			<VersionText text={settings.version} />
		</Container>
	);
}
