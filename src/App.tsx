import 'react-native-gesture-handler';
import Theme from './providers/Theme';
import { BasicTemplate } from './components/template/BasicTemplate/BasicTemplate';

function App() {
	return (
		<Theme>
			<BasicTemplate>
				<div />
			</BasicTemplate>
		</Theme>
	);
}

export default App;
