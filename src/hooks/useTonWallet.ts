import { toUserFriendlyAddress, Wallet } from '@tonconnect/sdk';
import { useEffect, useState } from 'react';
import { connector } from '../connector';

export function useTonWallet() {
	const [wallet, setWallet] = useState<Wallet | null>(connector.wallet);

	useEffect(() => connector.onStatusChange(setWallet, console.error), []);
	const rawAddress = connector.wallet?.account.address;
	if (rawAddress) {
		const bouncableUserFriendlyAddress = toUserFriendlyAddress(rawAddress);
		console.log(bouncableUserFriendlyAddress);
		// тут мы должны его отправить в бд
	}

	return wallet;
}
