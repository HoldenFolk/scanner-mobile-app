import React from 'react';
import { selectSortedScannedDevices } from '@kaidu/shared/providers/ble-devices';
import { FlatList, FlatListProps, ListRenderItem } from 'react-native';
import { useSelector } from 'react-redux';

interface ScannedItemListProps<ItemT> extends FlatListProps<ItemT> {
	renderItem: ListRenderItem<ItemT>;
}

export function ScannedItemList<ItemT>({
	renderItem,
	...optionals
}: ScannedItemListProps<ItemT>) {
	//Hooks
	const ITEM_HEIGHT = 30;

	//Global state
	const sortedScannedDevices = useSelector(selectSortedScannedDevices);

	return (
		<>
			<FlatList
				// className="bg-transparent"
				nestedScrollEnabled={true}
				automaticallyAdjustContentInsets={true}
				keyboardShouldPersistTaps={'never'}
				data={sortedScannedDevices}
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
