import {
  RemoteConnectPersistance,
  TonhubConnectProvider,
  useTonhubConnect,
} from "react-ton-x";
import {addReturnStrategy, connector} from "../connector";
import useLocalStorage from "use-local-storage";
import isMobile from "is-mobile";
import QRCode from "react-qr-code";

import { TonClient } from "ton";
import { TransferTon } from "./TransferTon";
import { Counter } from "./Counter";
import { useEffect } from "react";
import { Jetton } from "./Jettons";
import { TonWalletDetails } from "./TonWalletDetails";
import {openLink} from "../utils";

// TODO change to L3 client
export const tc = new TonClient({
  endpoint: "https://scalable-api.tonwhales.com/jsonRPC",
});

let wasPendingConnectionChecked = false;
let wasConnected = false;

export default function TonConnector() {
  const [connectionState, setConnectionState] =
      useLocalStorage<RemoteConnectPersistance>("connection", {
        type: "initing",
      });
  // fix for stale connections, can probably be improved
  useEffect(() => {
    if (!wasPendingConnectionChecked && connectionState?.type === "pending") {
      localStorage.removeItem("connection");
      // window.location.reload();
    }
    console.log('STATE', connectionState);
    wasPendingConnectionChecked = true;

  }, [connectionState]);


  return (
    <TonhubConnectProvider
      network="mainnet"
      url="https://ton-wallet-connection.vercel.app/"
      name="Wallet Connection"
      debug={false}
      connectionState={connectionState}
      setConnectionState={(s) => {
        setConnectionState(s as RemoteConnectPersistance);
      }}
    >
      <_TonConnecterInternal />
    </TonhubConnectProvider>
  );
}

function _TonConnecterInternal() {
  let connect = useTonhubConnect();
  let isConnected = connect.state.type === "online";
  console.log(isConnected, wasConnected, isConnected && !wasConnected);


  return (
    <>
      {!isConnected && <TonConnect />}
      {isConnected && (
        <div style={{ textAlign: "left", marginBottom: 20 }}>
          <TonWalletDetails />

        </div>
      )}
    </>
  );
}

function TonConnect() {
  const connect = useTonhubConnect();

  if (connect.state.type === "initing") {
    return <span>Waiting for session</span>;
  }
  if (connect.state.type === "pending") {
    return (
      <div>
        {isMobile() && (
          <button
            onClick={() => {
              // @ts-ignore
              openLink(addReturnStrategy(connect.state.link.replace(
                  "ton://",
                  "https://tonhub.com/"
              ), 'back'), '_blank');
              // window.location.href = connect.state.link.replace(
              //   "ton://",
              //   "https://tonhub.com/"
              // );
            }}

          >
            Connect Tonhub{" "}
          </button>
        )}
        {!isMobile() && (
            <div>
              Scan with your mobile tonhub wallet:
              <br />
              <br />
              <QRCode value={connect.state.link} />
            </div>
        )}

      </div>
    );
  }
  return <></>;
}
