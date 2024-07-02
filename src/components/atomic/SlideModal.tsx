import React from 'react';
import { Modal } from 'react-native';

export function SlideModal({ isModalVisible, children, ...optionals }) {
	return (
		<Modal
			animationType="slide"
			transparent={false}
			visible={isModalVisible}
			presentationStyle="overFullScreen"
		>
			{children || null}
		</Modal>
	);
}
