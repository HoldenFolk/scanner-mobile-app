import React from 'react';
import 'react-native-gesture-handler';
import Theme from './providers/Theme';
import MainAppNavigation from './navigation/MainAppNavigation';
import store from './providers/redux/store';
import { Provider } from 'react-redux';

function App() {
	return (
		<Theme>
			<Provider store={store}>
				<MainAppNavigation />
			</Provider>
		</Theme>
	);
}

export default App;
