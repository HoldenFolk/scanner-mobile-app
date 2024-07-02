import RNReanimatedCarousel from 'react-native-reanimated-carousel'; // https://github.com/dohooo/react-native-reanimated-carousel
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { View } from './View';

/**
 *
 */
export function Carousel({ width, renderItem, ...rest }) {
	return (
		<RNReanimatedCarousel<{ color: string }>
			width={width}
			data={[{ color: 'red' }, { color: 'purple' }]}
			renderItem={renderItem}
			{...rest}
		/>
	);
}

// renderItem={({ color }) => {
//   // return <View style={{ backgroundColor: color, flex: 1 }} />;

// }}
