import AsyncStorage from '@react-native-async-storage/async-storage';

const PASSWORD_HISTORY_KEY = 'password_history';

// Function to add a password to the history list
export const addPasswordToHistory = async (password: string): Promise<void> => {
	try {
		// Retrieve the current password history
		if (!password) return;
		const historyJSON = await AsyncStorage.getItem(PASSWORD_HISTORY_KEY);
		let history: string[] = historyJSON ? JSON.parse(historyJSON) : [];

		// Add the new password if it doesn't exist in the history
		if (!history.includes(password)) {
			history.unshift(password); // Add to the start of the array
			if (history.length > 10) {
				history = history.slice(0, 10); // Keep only the last 15 passwords
			}
		}

		// Save the updated history back to AsyncStorage
		await AsyncStorage.setItem(PASSWORD_HISTORY_KEY, JSON.stringify(history));
	} catch (error) {
		console.error('Error adding password to history:', error);
	}
};

// Function to retrieve the password history list
export const getPasswordHistory = async (): Promise<string[]> => {
	try {
		const historyJSON = await AsyncStorage.getItem(PASSWORD_HISTORY_KEY);
		return historyJSON ? JSON.parse(historyJSON) : [];
	} catch (error) {
		console.error('Error retrieving password history:', error);
		return [];
	}
};
