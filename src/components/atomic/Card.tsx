import { Card as ElementCard } from 'react-native-elements';
import React from 'react';
import { styled } from '@kaidu/shared/lib/styles';

const BaseCard = styled(ElementCard)`
	background-color: ${props => props?.theme?.colors?.primary};
`;

export function Card(props) {
	return <BaseCard {...props} />;
}
