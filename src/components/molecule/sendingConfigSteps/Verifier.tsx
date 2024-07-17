import React, { useEffect, useMemo, useState } from 'react';
import { PlugState } from '@/types/scannerData';
import { retreiveServices } from '@/utils/bleManager';
import { decodeManufacturerData } from '@/utils/manufacturerData';
import { checkIsConnectionError, getValidPlugState } from '@/utils/plugState';
import View from '@/components/atomic/View';
import { Icon } from '@/components/atomic/Icon';
import { Heading } from '@/components/atomic/Heading';
import { useTheme } from 'styled-components/native';
import { Text } from '@/components/atomic/Text';
import styled from 'styled-components/native';
import { useBluetoothConnect } from '@/hooks/useBluetoothConnect';

const ICON_SIZE = 16;

const Row = styled(View)`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-top: 8px;
	margin-bottom: 8px;
`;

const IconStyled = styled(Icon)`
	margin-left: 8px;
	margin-right: 8px;
`;

interface VerifierProps {
	bleId: string;
	onFulfilled: () => void;
	onRejected: (err: Error) => Promise<void>;
	startPolling: boolean;
}

export const Verifier = ({
	bleId,
	onFulfilled,
	onRejected,
	startPolling,
}: VerifierProps) => {
	const theme = useTheme();
	const { disconnectFromScanner } = useBluetoothConnect();
	const [scannerState, setScannerState] = useState('f0' as PlugState);

	const textInfo = useMemo(() => {
		let result = '';

		if (scannerState === 'f0') {
			result = 'The scanner is booting.';
		} else if (scannerState === 'f1') {
			result = 'The scanner is trying to connect.';
		} else if (scannerState === 'e1') {
			result = 'The scanner failed to connect to WiFi.';
		} else if (scannerState === 'e2') {
			result = 'The scanner failed to connect to the Internet.';
		} else if (scannerState === 'f2') {
			result = 'The scanner is connected.';
			//setButtonState(true);
		} else {
			result =
				'Verifying the scanner. This can take up to 1 minute. Please be patient.';
		}

		return result;
	}, [scannerState]);

	// const startPollingForScannerState = async () => {
	// 	const delay = (ms: number) =>
	// 		new Promise(resolve => setTimeout(resolve, ms));

	// 	while (scannerState === 'f0' || scannerState === 'f1') {
	// 		console.log('Scanner State: ', scannerState);
	// 		const services = await retreiveServices(bleId);
	// 		const manufacturerData = decodeManufacturerData(
	// 			services?.advertising.manufacturerData?.ffff.bytes || [],
	// 		);
	// 		setScannerState(getValidPlugState(manufacturerData.plugState));
	// 		checkIsConnectionError(scannerState)
	// 			? onRejected(new Error(textInfo))
	// 			: onFulfilled();
	// 		await delay(1000);
	// 	}
	// };

	const startVerify = async () => {
		const isDisconnected = await disconnectFromScanner(bleId);
		if (startPolling && isDisconnected) onFulfilled();
		else onRejected(new Error(textInfo));
	};

	useEffect(() => {
		startVerify();
	}, []);
	return (
		<View>
			<Heading>Verifying</Heading>
			{scannerState === 'f0' && (
				<Row>
					<IconStyled
						name="check-circle"
						type="font-awesome-5"
						size={ICON_SIZE}
						color={theme?.colors?.secondary}
					/>
					{Array.from({ length: 5 }).map((_, index) => (
						<IconStyled
							key={index}
							name="circle"
							type="font-awesome-5"
							size={ICON_SIZE}
						/>
					))}
				</Row>
			)}
			{scannerState === 'f1' && (
				<Row>
					{Array.from({ length: 2 }).map((_, index) => (
						<IconStyled
							key={index}
							name="check-circle"
							type="font-awesome-5"
							size={ICON_SIZE}
							color={theme?.colors?.secondary}
						/>
					))}
					{Array.from({ length: 4 }).map((_, index) => (
						<IconStyled
							key={index}
							name="circle"
							type="font-awesome-5"
							size={ICON_SIZE}
						/>
					))}
				</Row>
			)}
			{scannerState === 'e1' && (
				<Row>
					{Array.from({ length: 2 }).map((_, index) => (
						<IconStyled
							key={index}
							name="check-circle"
							type="font-awesome-5"
							size={ICON_SIZE}
							color={theme?.colors?.secondary}
						/>
					))}
					<IconStyled
						name="times-circle"
						type="font-awesome-5"
						size={ICON_SIZE}
					/>
					{Array.from({ length: 3 }).map((_, index) => (
						<IconStyled
							key={index}
							name="circle"
							type="font-awesome-5"
							size={ICON_SIZE}
						/>
					))}
				</Row>
			)}
			{scannerState === 'e2' && (
				<Row>
					{Array.from({ length: 2 }).map((_, index) => (
						<IconStyled
							key={index}
							name="check-circle"
							type="font-awesome-5"
							size={ICON_SIZE}
							color={theme?.colors?.secondary}
						/>
					))}
					{Array.from({ length: 2 }).map((_, index) => (
						<IconStyled
							key={index}
							name="times-circle"
							type="font-awesome-5"
							size={ICON_SIZE}
						/>
					))}
					{Array.from({ length: 2 }).map((_, index) => (
						<IconStyled
							key={index}
							name="circle"
							type="font-awesome-5"
							size={ICON_SIZE}
						/>
					))}
				</Row>
			)}
			{scannerState === 'f2' && (
				<Row>
					{Array.from({ length: 6 }).map((_, index) => (
						<IconStyled
							key={index}
							name="check-circle"
							type="font-awesome-5"
							size={ICON_SIZE}
							color={theme?.colors?.secondary}
						/>
					))}
				</Row>
			)}
			{textInfo && <Text>{textInfo}</Text>}
		</View>
	);
};
