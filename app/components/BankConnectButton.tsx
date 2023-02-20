import React from 'react';
import { Text } from 'react-native';
import LinkButton from './LinkButton'

type BankConnectButtonProps = {
  title: string;
  authService: AuthService;
  redirectUri: string | null;
};

enum AuthService {
  TrueLayer = 1,
  Tink,
}

const BankConnectButton = ({title, authService, redirectUri}: BankConnectButtonProps) => {
    if (redirectUri == null){
      console.error("Tink redirect URI is null");
      return <Text>Tink redirect URI is null</Text>;
    }
    // console.log(redirectUri);
    var connectUrl: string | null = null;
    var clientId: string;
    var encodedUri = encodeURIComponent(redirectUri);
    switch(authService){
      case AuthService.Tink:
        clientId = "e510fbadcd714f7ca5ef141d4923f6c1";
        connectUrl = "https://link.tink.com/1.0/transactions/connect-accounts/?client_id=" + clientId + "&redirect_uri=" + encodedUri + "&market=GB&locale=en_US";
        break;
      case AuthService.TrueLayer:
        clientId = "sandbox-knightlife-c74f1f";
        connectUrl = "https://auth.truelayer-sandbox.com/?response_type=code&client_id=" + clientId + "&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20offline_access&redirect_uri=" + encodedUri + "&providers=uk-cs-mock%20uk-ob-all%20uk-oauth-all"
        break;
      default:
        console.error("Auth service not implimented");
        return <Text>Bank connect auth service not implimented</Text>
    }
    
    console.log(connectUrl);
  return <LinkButton title={title} url={connectUrl} />;
};

export default BankConnectButton;
export { AuthService };