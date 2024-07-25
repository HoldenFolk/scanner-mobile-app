import { requestPreciseLocationPermission } from '@/utils/permissions';
import { useEffect, useState } from 'react';
import Geo from 'react-native-geolocation-service';
import { Geolocation } from '@/types/api';

interface Region {
	latitude: number;
	longitude: number;
	longitudeDelta: number;
	latitudeDelta: number;
}

interface useGeolocationDisplayProps {
	updateGlobalGeolocation: (geolocation: Geolocation) => void;
}

export const useGeolocationDisplay = ({
	updateGlobalGeolocation,
}: useGeolocationDisplayProps) => {
	const [region, setRegion] = useState<Region>();

	// Function to check if two regions are approximately equal. Prevents rounding differences causing infinite loops.
	const regionsAreEqual = (
		region1: Region,
		region2: Region,
		tolerance = 0.00001,
	) => {
		return (
			Math.abs(region1.latitude - region2.latitude) < tolerance &&
			Math.abs(region1.longitude - region2.longitude) < tolerance &&
			Math.abs(region1.latitudeDelta - region2.latitudeDelta) < tolerance &&
			Math.abs(region1.longitudeDelta - region2.longitudeDelta) < tolerance
		);
	};

	const handleGetCurrentLocation = async () => {
		setRegion(undefined); // First set undefined to render loading spinner

		const result = await requestPreciseLocationPermission();
		const enabled = result === 'granted';
		if (!enabled) {
			return;
		}
		Geo.getCurrentPosition(
			position => {
				const newRegion = {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				};
				setRegion(newRegion);
				updateGlobalGeolocation({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				});
			},
			error => {
				console.log(error.code, error.message);
			},
			{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
		);
	};

	useEffect(() => {
		const updateLocationPermission = async () => {
			const result = await requestPreciseLocationPermission();
			const enabled = result === 'granted';
			if (enabled) {
				await handleGetCurrentLocation();
			}
		};
		updateLocationPermission();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleRegionChangeComplete = (newRegion: Region) => {
		if (region && !regionsAreEqual(newRegion, region, 0.00001)) {
			setRegion(newRegion);
			updateGlobalGeolocation({
				latitude: newRegion.latitude,
				longitude: newRegion.longitude,
			});
		}
	};

	return { region, handleRegionChangeComplete, handleGetCurrentLocation };
};
