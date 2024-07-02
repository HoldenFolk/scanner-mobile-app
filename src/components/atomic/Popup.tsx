import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@kaidu/shared/lib/styles';
import { scale, verticalScale } from '@kaidu/shared/lib/styles';
import { View } from './View';
import { Text } from './Text';
import { RowFlex } from './Layouts';
import { Overlay } from './Overlay';
// import { tailwind } from '@kaidu/shared/lib/styles';
import { Button } from './Button';

const StyledOverlay = styled(Overlay).attrs(props => ({
	overlayStyle: {
		width: '90%',
		backgroundColor: props.theme.colors.primary,
	},
}))`
	background-color: ${props => props.theme.colors.primary};
`;

const PopupRowFlex = styled(RowFlex)`
	margin-top: 16px;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	padding: 8px;
	width: 100%;
`;

function Popup({ visible, onConfirm, text, ...optionals }) {
	const {
		confirmText = 'Confirm',
		showCancel = false,
		showConfirm = true,
		showButtons = true,
		children,
		confirmAccessibilityLabel,
		onCancel,
		cancelText = 'Cancel',
		...rest
	} = optionals;

	return (
		<StyledOverlay
			isVisible={visible}
			onBackdropPress={onCancel ?? onConfirm}
			{...rest}
		>
			{text ? (
				<Text style={{ marginBottom: verticalScale(8) }}>{text}</Text>
			) : null}
			{children || null}
			{showButtons ? (
				<PopupRowFlex>
					{showConfirm ? (
						<View style={{ alignSelf: 'flex-start' }}>
							<Button
								title={confirmText}
								onPress={onConfirm}
								accessibilityLabel={confirmAccessibilityLabel}
							/>
						</View>
					) : null}
					{showCancel ? (
						<View style={{ width: scale(100), marginLeft: scale(10) }}>
							<Button title={cancelText} onPress={onCancel} type="outline" />
						</View>
					) : null}
				</PopupRowFlex>
			) : null}
		</StyledOverlay>
	);
}

Popup.propTypes = {
	onCancel: PropTypes.func,
	onConfirm: PropTypes.func.isRequired,
	// if it is nullish, it will be replaced by onConfirm
	showCancel: PropTypes.bool,
	text: PropTypes.string,
	visible: PropTypes.bool.isRequired,
};

export default Popup;
