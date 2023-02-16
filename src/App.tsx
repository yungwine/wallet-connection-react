import "./App.css";

import {useTonWallet} from "./hooks/useTonWallet";
import React, { useEffect } from 'react';
import {AuthButton} from "./components/AuthButton/AuthButton";
import TonConnector from "./components/Ton-Connector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { connector } from './connector';
import {useTonhubWallet} from "./hooks/useTonhubWallet";
import {RemoteConnectPersistance, useTonhubConnect} from "react-ton-x";
import {TonWalletDetails} from "./components/TonWalletDetails";
import {TonhubWalletAddress} from "./components/TonhubWalletAddress";
import {Button, Dropdown, Space} from "antd";
import {DownOutlined} from "@ant-design/icons";
import useLocalStorage from "use-local-storage";
import {TonhubConnector} from "ton-x";
// import './app.scss';

const queryClient = new QueryClient();
// let hasSended = false;
// console.log('BEGIN');

function App() {
    useEffect(() => {
        connector.restoreConnection();
    }, []);

    let search = window.location.search;
    console.log(search.split('?')[1]); //считываем код

    let tonkeeperWallet = useTonWallet();
    console.log('tonc', tonkeeperWallet);

    let tonhubWallet = useTonhubWallet();
    console.log('tonh', tonhubWallet);

    // if (! hasSended && (tonkeeperWallet || tonhubWallet)) {
    //     console.log('YES', tonkeeperWallet, tonhubWallet);
    //     hasSended = true;
    // }
    // else {
    //     console.log('NOTHING')
    // }

    if (tonkeeperWallet) {
        return (
            <QueryClientProvider client={queryClient}>
                <div className="App">
                    <h1>Wallet Connection</h1>
                    <AuthButton />

                </div>
            </QueryClientProvider>
        );
        // @ts-ignore
    } else if (tonhubWallet?.type === 'online') {
        return (
            <QueryClientProvider client={queryClient}>
                <div className="App">
                    <h1>Wallet Connection</h1>
                    <TonConnector/>
                </div>
            </QueryClientProvider>
        );
    } else {

        return (
        <QueryClientProvider client={queryClient}>
                <div className="App">
                   <h1>Wallet Connection</h1>
               <AuthButton/>
              <TonConnector/>

           </div>
          </QueryClientProvider>
        );
    }
}

export default App;
