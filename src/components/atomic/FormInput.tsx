import { styled } from '@kaidu/shared/lib/styles';
import Input from './Input';

export const FormInput = styled(Input).attrs(props => ({
	inputContainerStyle: {
		borderBottomWidth: props?.showBottomLine ? 1 : 0,
		backgroundColor: props?.theme?.colors?.primary,
	},
	inputStyle: {
		color: props?.theme?.colors?.tertiary,
	},
}))``;
