import React from 'react';
import { Input, InputProps } from 'react-native-elements';
import { IconNode } from 'react-native-elements/dist/icons/Icon';

interface FormInputProps extends InputProps {
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

export default FormInput;
