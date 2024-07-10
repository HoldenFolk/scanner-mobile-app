import React, { useState } from 'react';
import { Modal, View, FlatList, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { useController, Control, FieldValues, Path } from 'react-hook-form';

interface InputPickerWithModalProps<T extends FieldValues> {
	form: {
		control: Control<T>;
		setValue: (name: Path<T>, value: string) => void;
		options: string[];
		name: Path<T>;
		trigger: (name: Path<T>) => Promise<boolean>;
	};
}

const InputPickerWithModal = <T extends FieldValues>({
	form,
}: InputPickerWithModalProps<T>) => {
	const { control, setValue, options, name, trigger } = form;
	const { field } = useController({ control, name });
	const [modalVisible, setModalVisible] = useState(false);

	const handleSelect = (value: string) => {
		setValue(name, value);
		trigger(name);
		setModalVisible(false);
	};

	return (
		<View>
			<TextInput
				onFocus={() => setModalVisible(true)}
				onBlur={() => setModalVisible(false)}
				value={field.value as string}
				placeholder="Select an option"
				style={{
					borderWidth: 1,
					borderColor: '#ccc',
					padding: 10,
					borderRadius: 5,
				}}
			/>
			{/* {error && <ErrorText>{error.message}</ErrorText>} */}
			<Modal visible={modalVisible} animationType="slide" transparent={true}>
				<ModalContainer>
					<ModalContent>
						<FlatList
							data={options}
							keyExtractor={item => item}
							renderItem={({ item }) => (
								<OptionButton onPress={() => handleSelect(item)}>
									<OptionText>{item}</OptionText>
								</OptionButton>
							)}
						/>
					</ModalContent>
				</ModalContainer>
			</Modal>
		</View>
	);
};

// const ErrorText = styled.Text`
// 	color: red;
// 	margin-top: 5px;
// `;

const ModalContainer = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
	width: 80%;
	background-color: white;
	padding: 20px;
	border-radius: 10px;
`;

const OptionButton = styled.TouchableOpacity`
	padding: 15px;
	border-bottom-width: 1px;
	border-bottom-color: #ccc;
`;

const OptionText = styled.Text`
	font-size: 16px;
`;

export default InputPickerWithModal;
