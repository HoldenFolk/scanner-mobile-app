import Config from 'react-native-config';

const settings = {
	version: Config.VERSION_NUMBER || '0.0.0',
	apiBaseUrl: Config.API_BASE_URL,
	serviceID: '8f7e1830-70b5-46b4-b09f-eda20e4b6a7b',
	characteristicIDReadWifi: '8f7e1836-70b5-46b4-b09f-eda20e4b6a7b',
	characteristicIDSSID: '8f7e1831-70b5-46b4-b09f-eda20e4b6a7b',
	characteristicIDPassword: '8f7e1832-70b5-46b4-b09f-eda20e4b6a7b',
};

export default settings;
