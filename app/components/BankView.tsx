import React from 'react';
import { Text } from 'react-native';
import BankConnectButton, { AuthService } from './BankConnectButton';

type BankViewProps = {
    appStartURL: URL | null
};

function bankCodeFromURL(url: URL | null): string | null {
    if (url == null){
        return null;
    }
    // only process code if correct callback is in url e.g. https://X.X.X/bankConnectCallback
    if (url.pathname != "/bankConnectCallback"){
        return null;
    }
    const urlParams: URLSearchParams = new URLSearchParams(url.search);
    const code: string | null = urlParams.get("code");
    return code;
}

const BankView = ({appStartURL}: BankViewProps) => {
    const authService: AuthService = AuthService.TrueLayer;
    var bankCode: string | null = bankCodeFromURL(appStartURL);
    console.log(appStartURL);
    if (bankCode != null){
        return <Text>{bankCode}</Text>;
    }
    
    return <BankConnectButton
        title='Connect Bank'
        authService={authService}
        redirectUri={appStartURL + "bankConnectCallback"}
    />
};

export default BankView;