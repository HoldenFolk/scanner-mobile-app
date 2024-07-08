import React from 'react';
import {
	Image as ReactNativeImage,
	ImageProps,
	ImageSourcePropType,
} from 'react-native';

/**
 *
 */
interface ImagePropsExtended extends ImageProps {
	source: ImageSourcePropType;
}

export function Image({ source, ...optionals }: ImagePropsExtended) {
	return <ReactNativeImage source={source} {...optionals} />;
}

export default Image;
