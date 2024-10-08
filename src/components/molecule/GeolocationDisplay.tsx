import React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import styled from 'styled-components/native';
import Button from '../atomic/Button';
import { View } from '../atomic/View';
import { Geolocation } from '@/types/api';
import * as Progress from 'react-native-progress';
import { useGeolocationDisplay } from '@/hooks/useGeolocationDisplay';
import BackgroundGroup from './BackgroundGroup';

interface SetLocationScreenProps {
	updateGlobalGeolocation: (geolocation: Geolocation) => void;
	navigateToSetup: () => void;
}

const SetLocationScreen: React.FC<SetLocationScreenProps> = ({
	navigateToSetup,
	updateGlobalGeolocation,
}) => {
	const {
		region,
		geolocationPermission,
		handleGetCurrentLocation,
		handleRegionChangeComplete,
	} = useGeolocationDisplay({ updateGlobalGeolocation });

	return (
		<Container>
			{region && geolocationPermission && (
				<>
					<CenteredContainer>
						<Button
							title="Refresh Current Location"
							onPress={handleGetCurrentLocation}
							type="outline"
						/>
					</CenteredContainer>
					<Map
						provider={PROVIDER_GOOGLE}
						region={region}
						onRegionChangeComplete={handleRegionChangeComplete}
						mapType="standard"
					>
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
			{!region && geolocationPermission && (
				<CenteredContainer>
					<Progress.Circle size={50} borderWidth={5} indeterminate />
				</CenteredContainer>
			)}
			{!geolocationPermission && (
				<CenteredContainer>
					<BackgroundGroup
						isShown={true}
						title={
							'Enable Geolocation Permissions to Configure Scanner Geolocation'
						}
					/>
				</CenteredContainer>
			)}
		</Container>
	);
};

export default SetLocationScreen;

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
