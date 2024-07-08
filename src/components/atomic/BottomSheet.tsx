import React from 'react';
import { useWindowDimensions } from 'react-native';
import { View } from '@kaidu/shared/components/atomic/View';
import { BottomSheet as ElementsBottomSheet } from 'react-native-elements';
import { tailwind } from '@kaidu/shared/lib/styles';
import { Spinner } from '@kaidu/shared/components/atomic/Spinner';
import ScrollView from '@kaidu/shared/components/atomic/ScrollView';
import { useTheme } from '@kaidu/shared/lib/styles';
import { BasicListItem } from '../molecule/scannerItem/ListItem';

export function generateBottomSheetList(
	data: { title: string; onPress: Function }[],
	showCancel: boolean,
	onCancel: Function,
) {
	const cancleItem = {
		title: 'Cancel',
		containerStyle: { backgroundColor: 'gray' },
		titleStyle: { color: 'white' },
		onPress: onCancel,
	};
}

const underlayBgColor = 'rgba(0.5, 0.25, 0, 0.3)';

export function BottomSheet({ isVisible, list, ...optionals }) {
	const { isLoading = false, showTopbar = true, ...rest } = optionals;

	// hooks
	const { height } = useWindowDimensions();
	const theme = useTheme();

	return (
		<View style={[tailwind('rounded-t-md'), { maxHeight: height * 0.8 }]}>
			<ElementsBottomSheet
				isVisible={isVisible}
				containerStyle={{ backgroundColor: underlayBgColor }}
			>
				<View style={tailwind('pt-3 rounded-t-xl items-center')}>
					{showTopbar ? (
						<View
							style={[
								tailwind('h-1 w-12 bg-red-200 mb-2 rounded'),
								{ backgroundColor: theme?.colors?.fourth },
							]}
						/>
					) : null}
					<ScrollView style={tailwind('w-full')}>
						{isLoading ? (
							<View style={tailwind('w-full items-center mb-4 p-2')}>
								<Spinner />
							</View>
						) : (
							list.map((listItem, i) => (
								<BasicListItem
									key={`bottom-sheet-list-item${i}`}
									title={listItem?.title}
									onPress={listItem?.onPress}
									containerStyle={listItem?.containerStyle}
									titleProps={{ style: listItem?.titleStyle }}
									subtitle={listItem?.subtitle}
								/>
							))
						)}
					</ScrollView>
				</View>
			</ElementsBottomSheet>
		</View>
	);
}
