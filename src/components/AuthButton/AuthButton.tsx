import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, notification, Space, Modal } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { useRecoilValueLoadable } from 'recoil';
import { addReturnStrategy, connector } from '../../connector';
import { useForceUpdate } from '../../hooks/useForceUpdate';
import { useSlicedAddress } from '../../hooks/useSlicedAddress';
import { useTonWallet } from '../../hooks/useTonWallet';
import { useTonWalletConnectionError } from '../../hooks/useTonWalletConnectionError';
import { walletsListQuery } from '../../state/wallets-list';
import { isDesktop, isMobile, openLink } from '../../utils';
import './style.scss';
import {TonkeeperWalletDetails} from "../TonkeeperWalletDetails";
import {TonWalletDetails} from "../TonWalletDetails";

const menu = (
	<Menu
		onClick={() => connector.disconnect()}
		items={[
			{
				label: 'Disconnect',
				key: '1',
			},
		]}
	/>
);

export function AuthButton() {
	const [modalUniversalLink, setModalUniversalLink] = useState('');
	const forceUpdate = useForceUpdate();
	const wallet = useTonWallet();
	const onConnectErrorCallback = useCallback(() => {
		setModalUniversalLink('');
		notification.error({
			message: 'Connection was rejected',
			description: 'Please approve connection to the dApp in your wallet.',
		});
	}, []);
	useTonWalletConnectionError(onConnectErrorCallback);

	const walletsList = useRecoilValueLoadable(walletsListQuery);

	const address = useSlicedAddress(wallet?.account.address, wallet?.account.chain);

	useEffect(() => {
		if (modalUniversalLink && wallet) {
			setModalUniversalLink('');
		}
	}, [modalUniversalLink, wallet]);

	const handleButtonClick = useCallback(async () => {
		// Use loading screen/UI instead (while wallets list is loading)
		if (!(walletsList.state === 'hasValue')) {
			setTimeout(handleButtonClick, 200);
		}

		if (!isDesktop() && walletsList.contents.embeddedWallet) {
			connector.connect({ jsBridgeKey: walletsList.contents.embeddedWallet.jsBridgeKey });
			return;
		}

		const tonkeeperConnectionSource = {
			universalLink: walletsList.contents.walletsList[0].universalLink,
			bridgeUrl: walletsList.contents.walletsList[0].bridgeUrl,
		};

		const universalLink = connector.connect(tonkeeperConnectionSource);

		if (isMobile()) {
			openLink(addReturnStrategy(universalLink, 'back'), '_blank');
			// window.open(universalLink, '_blank');
			// window.location.href = addReturnStrategy(universalLink, 'none');
		} else {
			setModalUniversalLink(universalLink);
			// openLink(addReturnStrategy(universalLink, 'none'), '_blank');
			// window.location.href = addReturnStrategy(universalLink, 'none');
		}
	}, [walletsList]);
	console.log(modalUniversalLink);

	// // @ts-ignore
	// let [Connection, SetConnection] = useState<JSON>(JSON.parse(localStorage.getItem("connection")));
	//
	// useEffect(() => {
	// 	// @ts-ignore
	// 	SetConnection(JSON.parse(localStorage.getItem("connection")));
	// }, [])
	//
	// let connection = JSON.parse(localStorage.getItem("connection"));
	//
	// let isConnectedTonhub = connection?.type === "online";
	//
	// if (Connection?.type === "online") {
	// 	return <></>;
	// }

	if (wallet) {
		return (
			<div style={{ textAlign: "left", marginBottom: 20 }}>
				<TonkeeperWalletDetails />
			</div>);

	} else {
		if (modalUniversalLink && !isMobile()) {
			return (<div>
				Scan with your mobile Tonkeeper wallet:
				<br />
				<QRCode
					size={256}
					style={{ height: '260', maxWidth: '100%', width: '100%' }}
					value={modalUniversalLink}
					viewBox={`0 0 256 256`}
				/>
				{/*<QRCode value={connect.state.link} />*/}
			</div>);
		}
		return (
			<div>
				{isMobile() && (
					<Button shape="round" type="primary" onClick={handleButtonClick}>
						Connect Tonkeeper
					</Button>
				)}
				{!isMobile() && (
					<Button shape="round" type="primary" onClick={handleButtonClick}>
						Connect Tonkeeper
					</Button>
				)}
			</div>

			);

	}

	//
	// return (
	// 	<>
	// 		<div className="button">
	// 			{wallet ? (
	// 				<Dropdown overlay={menu}>
	// 					<Button shape="round" type="primary">
	// 						<Space>
	// 							{address}
	// 							<DownOutlined />
	// 						</Space>
	// 					</Button>
	// 				</Dropdown>
	// 			) : (
	// 				<Button shape="round" type="primary" onClick={handleButtonClick}>
	// 					Connect Tonkeeper
	// 				</Button>
	// 			)}
	// 		</div>
	// 		<Modal
	// 			title="Scan with Tonkeeper"
	// 			open={!!modalUniversalLink}
	// 			aria-labelledby="modal-modal-title"
	// 			aria-describedby="modal-modal-description"
	// 			onOk={() => window.location.reload()}
	// 			onCancel={() => window.location.reload()}
	// 		>
	// 			{/*<QRCode*/}
	// 			{/*	size={128}*/}
	// 			{/*	style={{ height: '128', maxWidth: '100%', width: '100%' }}*/}
	// 			{/*	value={modalUniversalLink}*/}
	// 			{/*	viewBox={`0 0 256 256`}*/}
	// 			{/*/>*/}
	// 		</Modal>
	// 	</>
	// );
}
