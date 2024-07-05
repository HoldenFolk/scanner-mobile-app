import { Platform } from 'react-native';

export function isAndroid12AndAbove(): boolean {
	if (Platform.OS === 'android') {
		if (typeof Platform.Version === 'number') {
			return Platform.Version >= 31;
		} else if (typeof Platform.Version === 'string') {
			// In case Platform.Version is returned as a string, convert it to a number
			return Number(Platform.Version) >= 31;
		}
	}
	return false;
}
