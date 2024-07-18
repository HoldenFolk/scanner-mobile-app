import settings from '@/globalConstants';
import axios from 'axios';

const apiBaseUrl = settings.apiBaseUrl;

// Creates the base aixios client for the API
const apiClient = axios.create({
	baseURL: apiBaseUrl, // replace with API base URL
	headers: {
		'Content-Type': 'application/json',
	},
});

export default apiClient;
