import React, { useState } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { PasswordIcon } from './PasswordIcon';
import AutoCompleteInput from '../AutoCompleteInput';
import { FormInputProps } from '@/components/atomic/FormInput';

interface InputPickerWithModalProps<T extends FieldValues>
	extends FormInputProps {
	form: {
		control: Control<T>;
		setValue: (name: Path<T>, value: string) => void;
		options: string[];
		name: Path<T>;
		trigger: (name: Path<T>) => Promise<boolean>;
	};
	label: string;
}

const InputPickerWithModal = <T extends FieldValues>({
	form,
	label,
	...props
}: InputPickerWithModalProps<T>) => {
	const { control, options, name } = form;

	const [isSecured, setIsSecured] = useState(false);

	return (
		<AutoCompleteInput
			control={control}
			inputProps={{
				...props,
				label: label,
				autoCapitalize: 'none',
				spellCheck: false,
				secureTextEntry: isSecured,
				rightIcon: (
					<PasswordIcon
						pressableProps={{ type: 'opacity' }}
						onPress={() => setIsSecured(!isSecured)}
						isHidden={isSecured}
					/>
				),
			}}
			options={options}
			name={name}
			required={false}
		/>
	);
};

export default InputPickerWithModal;
