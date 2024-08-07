import React, { useState } from 'react';
import { View } from './View';
import { Switch as SwitchNative } from 'react-native';
import { useTheme } from 'styled-components/native';

interface SwitchProps {
	onToggle: () => void;
}

const Switch = ({ onToggle }: SwitchProps) => {
	const theme = useTheme();

	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => {
		setIsEnabled(previousState => !previousState);
		onToggle();
	};
	return (
		<View>
			<SwitchNative
				trackColor={{ false: '#767577', true: '#81b0ff' }}
				thumbColor={theme.colors.secondary}
				ios_backgroundColor="#3e3e3e"
				onValueChange={toggleSwitch}
				value={isEnabled}
			/>
		</View>
	);
};

export default Switch;
