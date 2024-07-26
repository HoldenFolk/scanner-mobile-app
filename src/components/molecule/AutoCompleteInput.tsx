import React, { useState } from 'react';
import {
	useController,
	Control,
	FieldValues,
	Path,
	PathValue,
} from 'react-hook-form';
import styled from 'styled-components/native';
import View from '../atomic/View';
import { BasicListItem } from './ListItem';
import Input, { FormInputProps } from '../atomic/FormInput';

const DropDownContainer = styled(View)`
	margin-top: -24px;
	border-width: 1px;
	border-radius: 8px;
	border-color: ${({ theme }) => theme.colors.grayscale[4]};
	overflow: hidden;
	elevation: 1;
`;

interface MyPickerProps {
	onPress: (value: string) => void;
	options: string[];
}

const MyPicker: React.FC<MyPickerProps> = ({ onPress, options }) => {
	if (!options || options.length === 0) {
		return null;
	}

	return (
		<DropDownContainer>
			{options.map(option => (
				<BasicListItem
					key={option}
					onPress={() => onPress(option)}
					title={option}
				/>
			))}
		</DropDownContainer>
	);
};

interface AutoCompleteInputProps<T extends FieldValues> {
	control: Control<T>;
	name: Path<T>;
	options?: string[];
	defaultValue?: PathValue<T, Path<T>>;
	required?: boolean;
	inputProps: FormInputProps;
}

export const AutoCompleteInput = <T extends FieldValues>({
	control,
	name,
	options = [],
	defaultValue = '' as PathValue<T, Path<T>>,
	required = true,
	inputProps,
}: AutoCompleteInputProps<T>) => {
	const {
		field: { onChange, value, ref },
		fieldState: { error },
	} = useController({
		name,
		control,
		rules: { required },
		defaultValue,
	});

	const [openDropDown, setOpenDropDown] = useState(false);
	const [queriedOptions, setQueriedOptions] = useState(options);

	const handleChangeText = (text: string) => {
		const queried = text
			? options.filter(option =>
					option?.toLowerCase().includes(text.toLowerCase()),
			  )
			: [];
		setQueriedOptions(queried);
		setOpenDropDown(queried.length > 0);
		onChange(text);
	};

	const handleChangeSelect = (inputValue: string) => {
		onChange(inputValue);
		setOpenDropDown(false);
	};

	return (
		<View>
			<Input
				{...inputProps}
				errorMessage={
					error
						? inputProps.errorMessage || 'This field is required'
						: undefined
				}
				onChangeText={handleChangeText}
				onBlur={() => setOpenDropDown(false)}
				onFocus={() => setOpenDropDown(true)}
				value={value}
				ref={ref}
			/>
			{openDropDown && (
				<MyPicker options={queriedOptions} onPress={handleChangeSelect} />
			)}
		</View>
	);
};

export default AutoCompleteInput;
