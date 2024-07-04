import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { STACK_SCREENS } from '@/navigation/routes';
import KaiduScannedItem from '@/components/KaiduScannedItem'; // Adjust the import path as necessary

// Define the type for the item parameter
interface Item {
	id: string; // Adjust the type as necessary
	category: string; // This is not used in the function but included for completeness
}

export const renderScannedItem = (
	{ item }: { item: Item },
	selectedCustomerID: string,
) => {
	const navigation = useNavigation();

	const handleNavigate = () => {
		navigation.navigate(STACK_SCREENS.WIFI.PARENT, {
			screen: STACK_SCREENS.CONFIG,
			params: { bleId: item.id },
		});
	};

	return (
		<KaiduScannedItem
			key={item.id}
			bleID={item.id}
			onNavigate={handleNavigate}
			selectedCustomerID={selectedCustomerID}
			accessibilityLabel={'Kaidu Scanner Item'}
			testID={'Kaidu Scanner Item'}
		/>
	);
};
