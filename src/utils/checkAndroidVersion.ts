import { compareVersions } from 'compare-versions';
import { Platform } from 'react-native';

export function isAndroid12AndAbove(): boolean {
	if (Platform.OS === 'android') {
		if (typeof Platform.Version === 'string') {
			return compareVersions(Platform.Version, '12') >= 0;
		} else {
			return Platform.Version >= 31;
		}
	}
	return false;
}
