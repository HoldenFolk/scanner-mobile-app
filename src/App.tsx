import React from 'react';
import 'react-native-gesture-handler';
import Theme from './providers/Theme';
import MainAppNavigation from './navigation/MainAppNavigation';
import store from './providers/redux/store';
import { Provider } from 'react-redux';
import { usePermissions } from './hooks/usePermissions';

function App() {
	// Request permissions if not granted
	usePermissions();

	return (
		<Theme>
			<Provider store={store}>
				<MainAppNavigation />
			</Provider>
		</Theme>
	);
}

export default App;
