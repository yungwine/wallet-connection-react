import { useTonhubConnect } from "react-ton-x";
import { useQuery } from "@tanstack/react-query";
import { Address, fromNano } from "ton";
import { Card } from "./Card";
import { tc } from "./Ton-Connector";
import {useTonWallet} from "../hooks/useTonWallet";
import {toUserFriendlyAddress} from "@tonconnect/sdk";
import {connector} from "../connector";

export function TonkeeperWalletDetails() {
    const wallet = useTonWallet();
    if (wallet?.account) {
        const address = toUserFriendlyAddress(wallet.account.address);
        const { isLoading, data } = useQuery(
            ["balance"],
            async () => {
                const b = await tc.getBalance(
                    // @ts-ignore
                    Address.parse(address)
                );

                return `${fromNano(b)} TON`;
            },
            // @ts-ignore
            { enabled: !!address }
        );

        return (
            <>
                <Card title="Tonkeeper Wallet">
                    <div style={{ marginBottom: 20 }}>
                        <div
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {/* @ts-ignore */}
                            Address: {address}
                        </div>
                        <div>Balance: {isLoading ? "Loading..." : data}</div>
                    </div>
                    {/* @ts-ignore */}
                    {address && (
                        <button
                            onClick={() => {
                                connector.disconnect();
                            }}
                        >
                            Disconnect
                        </button>
                    )}
                </Card>
            </>
        );
    }
    return (<div></div>)

}
