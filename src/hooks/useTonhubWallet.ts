import { toUserFriendlyAddress, Wallet } from '@tonconnect/sdk';
import { useEffect, useState } from 'react';
import {connector} from "../connector";
import {
	RemoteConnectPersistance,
	TonhubConnectProvider,
	useTonhubConnect,
} from "react-ton-x";
import useLocalStorage from "use-local-storage";

export function useTonhubWallet() {
	// @ts-ignore
	let [Connection, SetConnection] = useState<JSON>(JSON.parse(localStorage.getItem("connection")));


	useEffect(() => {
		// @ts-ignore
		let timer1 = setTimeout(() => SetConnection(JSON.parse(localStorage.getItem("connection"))), 2000);

		console.log('vnutri effecta', Connection);
		return () => {
			clearTimeout(timer1);
		}
		// @ts-ignore

	}, )

	return Connection;

}