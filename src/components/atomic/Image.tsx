import React from 'react';
import { Image as ReactNativeImage } from 'react-native';

/**
 *
 */
export function Image({ source, ...optionals }) {
	return <ReactNativeImage source={source} {...optionals} />;
}

export default Image;
