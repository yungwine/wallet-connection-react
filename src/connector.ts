import { SendTransactionRequest, TonConnect, UserRejectsError, WalletInfo, WalletInfoInjected } from '@tonconnect/sdk';
import { notification } from 'antd';
import { isMobile, openLink } from './utils';

const dappMetadata = {
	manifestUrl:
		'https://gist.githubusercontent.com/yungwine/4fbe2f1369a130dd1cc9716629c65603/raw/1a4b574b4b326e3f32f110d89b4890b1b28f59da/txt',
};

export const connector = new TonConnect(dappMetadata);

export function addReturnStrategy(url: string, returnStrategy: 'back' | 'none'): string {
	const link = new URL(url);
	link.searchParams.append('ret', returnStrategy);
	return link.toString();
}
