import React from 'react';
import styled from 'styled-components/native';
import { Linking } from 'react-native';
import { DocShieldIcon } from './DocShieldIcon';
import { VersionText } from '@/components/molecule/VersionText';
import Icon from '@/components/atomic/Icon';
import settings from '@/globalConstants';
import { BasicListItem } from '@/components/molecule/ListItem';
import { View } from '../../components/atomic/View';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useThemeToggle } from '@/hooks/useThemeToggle';
import Switch from '@/components/atomic/Switch';

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
	margin-bottom: 8px;
`;

const Content = styled(View)`
	background-color: transparent;
	flex: 1;
`;

/**
 * Main content in the drawer side bar
 */
export function DrawerItemGroup(_props: DrawerContentComponentProps) {
	const toggleTheme = useThemeToggle();

	const onToggle = () => {
		toggleTheme();
	};

	return (
		<Container>
			<Content>
				<BasicListItem
					title={'Privacy Policy'}
					onPress={handlePrivacyPolicy}
					leftComponent={<DocShieldIcon size={ICON_SIZE} />}
				/>
				<BasicListItem
					title={'Send feedback'}
					onPress={handleFeedback}
					leftComponent={
						<Icon name={'comment'} type="font-awesome" size={ICON_SIZE} />
					}
				/>
				<BasicListItem
					title={'Toggle Dark Mode'}
					rightComponent={<Switch onToggle={onToggle} />}
				/>
			</Content>
			<VersionText text={settings.version} />
		</Container>
	);
}
