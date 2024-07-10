import React, { useState } from 'react';
import { Modal, FlatList, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { useController, Control, FieldValues, Path } from 'react-hook-form';
import { View } from '@/components/atomic/View';
import FormInput from '@/components/atomic/FormInput';

interface InputPickerWithModalProps<T extends FieldValues> {
	form: {
		control: Control<T>;
		setValue: (name: Path<T>, value: string) => void;
		options: string[];
		name: Path<T>;
		trigger: (name: Path<T>) => Promise<boolean>;
	};
	secureTextEntry?: boolean;
	label: string;
}

// TODO: Add modal history here or refine component to not need it.
const InputPickerWithModal = <T extends FieldValues>({
	form,
	secureTextEntry = false,
	label,
}: InputPickerWithModalProps<T>) => {
	const { control, setValue, options, name, trigger } = form;
	const { field } = useController({ control, name });

	const handleInputChange = (text: string) => {
		setValue(name, text);
		trigger(name);
	};

	return (
		<View>
			<FormInput
				label={label}
				value={field.value}
				onChangeText={handleInputChange}
				secureTextEntry={secureTextEntry}
				placeholder="Enter Value"
			/>
		</View>
	);
};

export default InputPickerWithModal;
