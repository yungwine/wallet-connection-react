import { SendTransactionRequest, TonConnect, UserRejectsError, WalletInfo, WalletInfoInjected } from '@tonconnect/sdk';
import { notification } from 'antd';
import { isMobile, openLink } from './utils';

const dappMetadata = {
	manifestUrl:
		'https://gist.githubusercontent.com/yungwine/4fbe2f1369a130dd1cc9716629c65603/raw/c9c7eb443d0cd7e77a542d1f8d159bf9bc8fd6e3/txt',
};

export const connector = new TonConnect(dappMetadata);

export function addReturnStrategy(url: string, returnStrategy: 'back' | 'none'): string {
	const link = new URL(url);
	link.searchParams.append('ret', returnStrategy);
	return link.toString();
}
