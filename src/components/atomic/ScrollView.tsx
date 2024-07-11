import React, { FC } from 'react';
import {
	ScrollView,
	ScrollViewProps,
	StyleSheet,
	useWindowDimensions,
} from 'react-native';
import styled from 'styled-components/native';

interface BaseScrollViewProps extends ScrollViewProps {
	headerHeight?: number;
}

const StyledScrollView = styled(ScrollView).attrs<BaseScrollViewProps>(
	props => ({
		contentContainerStyle: {
			justifyContent: 'center',
			paddingBottom: 32,
			backgroundColor: props.theme.colors.primary,
		},
	}),
)`
	background-color: ${props => props.theme.colors.primary};
	width: 100%;
`;

const BaseScrollView: FC<BaseScrollViewProps> = ({
	headerHeight = 0,
	...props
}) => {
	const { height: windowHeight } = useWindowDimensions();
	const maxHeight = headerHeight ? windowHeight - headerHeight : windowHeight;

	const styles = StyleSheet.create({
		container: {
			paddingVertical: 16,
			marginBottom: 20,
			alignSelf: 'center',
			maxHeight,
		},
	});

	return <StyledScrollView style={styles.container} {...props} />;
};

export default BaseScrollView;
