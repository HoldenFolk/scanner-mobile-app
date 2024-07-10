import React, { ReactNode } from 'react';
import { Modal, ModalProps } from 'react-native';

interface SlideModalProps extends ModalProps {
	isModalVisible: boolean;
	children?: ReactNode;
}

/**
 * Slide modal component
 */
export function SlideModal({
	isModalVisible,
	children,
	...optionals
}: SlideModalProps) {
	return (
		<Modal
			animationType="slide"
			transparent={false}
			visible={isModalVisible}
			presentationStyle="overFullScreen"
			{...optionals}
		>
			{children || null}
		</Modal>
	);
}
