import { ScannerData } from '@/types/scannerData';
import React from 'react';
import { FlatList, ListRenderItem, FlatListProps } from 'react-native';

interface ScannedItemListProps extends FlatListProps<ScannerData> {
	renderItem: ListRenderItem<ScannerData>;
}

export function ScannedItemList({
	renderItem,
	...optionals
}: ScannedItemListProps) {
	const ITEM_HEIGHT = 30;

	return (
		<>
			<FlatList
				// className="bg-transparent"
				nestedScrollEnabled={true}
				automaticallyAdjustContentInsets={true}
				keyboardShouldPersistTaps={'never'}
				renderItem={renderItem}
				updateCellsBatchingPeriod={40}
				disableScrollViewPanResponder={true}
				getItemLayout={(data, index) => ({
					length: ITEM_HEIGHT,
					offset: ITEM_HEIGHT * index,
					index,
				})}
				accessibilityLabel="Scanned Item List"
				{...optionals}
			/>
		</>
	);
}
