import React from 'react';
import { Text } from 'react-native';
import LinkButton from './LinkButton'

enum OpenBankingApi {
  TrueLayer = 1,
  Tink,
}

type BankConnectButtonProps = {
  title: string;
  openBankingApi: OpenBankingApi;
  redirectUri: string | null;
};

const BankConnectButton = ({title, openBankingApi, redirectUri}: BankConnectButtonProps) => {
    if (redirectUri == null){
      console.error("Tink redirect URI is null");
      return <Text>Tink redirect URI is null</Text>;
    }
    var connectUrl: string | null = null;
    var clientId: string;
    var encodedUri = encodeURIComponent(redirectUri);
    switch(openBankingApi){
      case OpenBankingApi.Tink:
        clientId = "e510fbadcd714f7ca5ef141d4923f6c1";
        connectUrl = "https://link.tink.com/1.0/transactions/connect-accounts/?client_id=" + clientId + "&redirect_uri=" + encodedUri + "&market=GB&locale=en_US";
        break;
      case OpenBankingApi.TrueLayer:
        clientId = "sandbox-knightlife-c74f1f";
        connectUrl = "https://auth.truelayer-sandbox.com/?response_type=code&client_id=" + clientId + "&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20offline_access&redirect_uri=" + redirectUri + "&providers=uk-cs-mock%20uk-ob-all%20uk-oauth-all"
        break;
      default:
        var error = "Open Bankking API " + openBankingApi + " not implimented";
        console.error(error);
        return <Text>{error}</Text>
    }
    
  return <LinkButton title={title} url={connectUrl} />;
};

export default BankConnectButton;
export { OpenBankingApi };