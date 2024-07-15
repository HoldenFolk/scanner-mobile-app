import React, { useState } from 'react';
import { useController, Control, FieldValues, Path } from 'react-hook-form';
import { View } from '@/components/atomic/View';
import FormInput from '@/components/atomic/FormInput';
import { PasswordIcon } from './PasswordIcon';

interface InputPickerWithModalProps<T extends FieldValues> {
	form: {
		control: Control<T>;
		setValue: (name: Path<T>, value: string) => void;
		options: string[];
		name: Path<T>;
		trigger: (name: Path<T>) => Promise<boolean>;
	};
	label: string;
}

// TODO: Add modal history here or refine component to not need it.
const InputPickerWithModal = <T extends FieldValues>({
	form,
	label,
}: InputPickerWithModalProps<T>) => {
	const { control, setValue, options, name, trigger } = form;
	const { field } = useController({ control, name });

	const [isSecured, setIsSecured] = useState(false);

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
				secureTextEntry={isSecured}
				placeholder="Enter Value"
				rightIcon={
					<PasswordIcon
						pressableProps={{ type: 'opacity' }}
						onPress={() => setIsSecured(!isSecured)}
						isHidden={isSecured}
					/>
				}
			/>
		</View>
	);
};

export default InputPickerWithModal;
