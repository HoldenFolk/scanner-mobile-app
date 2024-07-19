import { requestPreciseLocationPermission } from '@/utils/permissions';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geo from 'react-native-geolocation-service';
import styled from 'styled-components/native';
import Button from '../atomic/Button';
import { View } from '../atomic/View';
import { Geolocation } from '@/types/api';
import * as Progress from 'react-native-progress';

const Container = styled(View)`
	flex: 1;
	padding: 20px;
	justify-content: center;
	background-color: ${({ theme }) => theme.colors.primary};
`;

const Map = styled(MapView)`
	flex: 1;
	margin-top: 20px;
	border-radius: 20px;
	overflow: hidden;
	margin-bottom: 20px;
`;

const CenteredContainer = styled(View)`
	flex-direction: row;
	justify-content: center;
`;

interface Region {
	latitude: number;
	longitude: number;
	longitudeDelta: number;
	latitudeDelta: number;
}

interface SetLocationScreenProps {
	updateGlobalGeolocation: (geolocation: Geolocation) => void;
	navigateToSetup: () => void;
}

// TODO: Modularize the logic
const SetLocationScreen: React.FC<SetLocationScreenProps> = ({
	navigateToSetup,
	updateGlobalGeolocation,
}) => {
	const [region, setRegion] = useState<Region>();

	const handleGetCurrentLocation = async () => {
		const result = await requestPreciseLocationPermission();
		const enabled = result === 'granted';
		if (!enabled) {
			Alert.alert(
				'Permission Denied',
				'Location permission is required to set geolocation data.',
			);
			return;
		}
		Geo.getCurrentPosition(
			position => {
				setRegion({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				});
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
			if (!enabled) {
				Alert.alert(
					'Permission Denied',
					'Location permission is required to set geolocation data.',
				);
				return;
			}
			await handleGetCurrentLocation();
		};
		updateLocationPermission();
	}, []);

	return (
		<Container>
			{region && (
				<>
					<CenteredContainer>
						<Button
							title="Refresh Current Location"
							onPress={handleGetCurrentLocation}
							type="outline"
						/>
					</CenteredContainer>
					<Map provider={PROVIDER_GOOGLE} region={region} mapType="standard">
						<Marker
							coordinate={{
								latitude: region.latitude,
								longitude: region.longitude,
							}}
						/>
					</Map>
					<CenteredContainer>
						<Button onPress={navigateToSetup} title={'Submit'} />
					</CenteredContainer>
				</>
			)}
			{!region && (
				<CenteredContainer>
					<Progress.Circle size={50} borderWidth={5} indeterminate />
				</CenteredContainer>
			)}
		</Container>
	);
};

export default SetLocationScreen;
