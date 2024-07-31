import React, { forwardRef } from 'react';
import { Input, InputProps } from 'react-native-elements';
import { IconNode } from 'react-native-elements/dist/icons/Icon';
import styled from 'styled-components';

// TODO: Remove explicit any
export interface FormInputProps extends InputProps {
	label: string;
	errorMessage?: string;
	secureTextEntry: boolean;
	rightIcon?: IconNode;
}

// Use forwardRef to pass the ref to the Input component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormInput = forwardRef<any, FormInputProps>(
	({ label, errorMessage, secureTextEntry, rightIcon, ...props }, ref) => (
		<Input
			label={label}
			errorMessage={errorMessage}
			secureTextEntry={secureTextEntry}
			rightIcon={rightIcon}
			ref={ref}
			{...props}
		/>
	),
);

FormInput.displayName = 'FormInput';

const StyledFormInput = styled(FormInput).attrs(props => ({
	inputStyle: {
		color: props.theme.colors.tertiary,
	},
}))``;

export default StyledFormInput;
