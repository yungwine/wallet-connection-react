import { useTonhubConnect } from "react-ton-x";
import { useQuery } from "@tanstack/react-query";
import { Address, fromNano } from "ton";
import { Card } from "./Card";
import { tc } from "./Ton-Connector";

export function TonhubWalletAddress() {
  const connect = useTonhubConnect();
    console.log('state2', connect.state);

  // @ts-ignore
  const { isLoading, data } = useQuery(
    ["balance"],
    async () => {
      const b = await tc.getBalance(
        // @ts-ignore
        Address.parse(connect.state?.walletConfig?.address)
      );

      return `${fromNano(b)} TON`;
    },
    // @ts-ignore
    { enabled: !!connect.state?.walletConfig?.address }
  );
    // @ts-ignore
  return (connect.state.walletConfig.address
  );
}
