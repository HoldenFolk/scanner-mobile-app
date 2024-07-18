import { ScannerConfig, ScannerStatus, DailyScannerData } from './scannerData';

// Type definitions for the API responses
interface Geolocation {
	speed: number;
	heading: number;
	accuracy: number;
	altitude: number;
	latitude: number;
	longitude: number;
	altitudeAccuracy: number;
}