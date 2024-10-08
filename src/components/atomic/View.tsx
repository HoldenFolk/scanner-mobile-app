import React from 'react';
import { ViewProps } from 'react-native';
import styled from 'styled-components/native';

const BaseView = styled.View`
	background-color: ${props => props?.theme?.colors?.primary};
`;

export function View(props: ViewProps) {
	return <BaseView {...props} />;
}

export default View;
