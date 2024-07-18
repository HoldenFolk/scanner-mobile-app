import {
	TransitionSpecs,
	CardStyleInterpolators,
} from '@react-navigation/stack';
import { GestureDirection } from '@react-navigation/stack/lib/typescript/src/types';

export const SlideFromRightTransition = {
	gestureDirection: 'horizontal' as GestureDirection,
	transitionSpec: {
		open: TransitionSpecs.TransitionIOSSpec,
		close: TransitionSpecs.TransitionIOSSpec,
	},
	cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};
