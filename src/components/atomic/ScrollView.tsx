import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { styled } from '@kaidu/shared/lib/styles';

const StyledScrollView = styled(ScrollView).attrs(props => ({
	contentContainerStyle: {
		justifyContent: 'center',
		paddingBottom: 32,
		backgroundColor: props?.theme?.colors?.primary,
	},
}))`
	background-color: ${props => props?.theme?.colors?.primary};
	width: 100%;
`;

export function BaseScrollView(props) {
	// constraint the ScrollView in the screen
	let maxH;
	const headerHeight = 0;
	if (headerHeight) {
		maxH = useWindowDimensions()?.height - headerHeight;
	} else {
		maxH = useWindowDimensions()?.height;
	}

	const styles = StyleSheet.create({
		container: {
			paddingVertical: 16,
			marginBottom: 20,
			alignSelf: 'center',
			// width: '100%',
			maxHeight: maxH,
		},
	});

	return <StyledScrollView style={styles.container} {...props} />;
}

export default BaseScrollView;
