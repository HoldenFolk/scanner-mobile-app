import React, { forwardRef } from 'react';
import { Input } from 'react-native-elements'; // https://reactnativeelements.com/docs/input
import { styled } from '@kaidu/shared/lib/styles';

const StyledInput = styled(Input).attrs(props => ({
	inputContainerStyle: {
		maxWidth: '100%',
		flexWrap: 'wrap',
		...props.inputContainerStyle,
	},
	inputStyle: {
		color: props?.theme?.colors?.tertiary,
		...props.inputStyle,
	},
	containerStyle: {
		paddingHorizontal: 0,
		maxWidth: '100%',
		flexWrap: 'wrap',
		...props.containerStyle,
	},
}))``;

function BaseInput({ ...optionals }, ref) {
	const { placeholder = 'Start typing...', ...rest } = optionals;

	return <StyledInput ref={ref} placeholder={placeholder} {...rest} />;
}

export default forwardRef(BaseInput);
