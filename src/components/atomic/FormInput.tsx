import React from 'react';
import { Input, InputProps } from 'react-native-elements';
import { IconNode } from 'react-native-elements/dist/icons/Icon';
import styled from 'styled-components';

export interface FormInputProps extends InputProps {
	label: string;
	errorMessage?: string;
	secureTextEntry: boolean;
	rightIcon?: IconNode;
}

const FormInput: React.FC<FormInputProps> = ({
	label,
	errorMessage,
	secureTextEntry,
	rightIcon,
	...props
}) => (
	<Input
		label={label}
		errorMessage={errorMessage}
		secureTextEntry={secureTextEntry}
		rightIcon={rightIcon}
		{...props}
	/>
);

const StyledFormInput = styled(FormInput).attrs(props => ({
	inputStyle: {
		color: props.theme.colors.tertiary,
	},
}))``;

export default StyledFormInput;
