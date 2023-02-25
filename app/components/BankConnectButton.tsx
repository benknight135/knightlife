import React from 'react';
import { Text } from 'react-native';
import LinkButton from './LinkButton'
import { OpenBankingApiConfig, OpenBankingApiHelper } from './Banking';

type BankConnectButtonProps = {
  title: string;
  openBankingApiConfig: OpenBankingApiConfig;
  redirectUri: string | null;
};

const BankConnectButton = ({title, openBankingApiConfig, redirectUri}: BankConnectButtonProps) => {
  if (redirectUri == null){
    console.error("Tink redirect URI is null");
    return <Text>Tink redirect URI is null</Text>;
  }
  try{
    var url: string = OpenBankingApiHelper.generateConnectUrl(openBankingApiConfig, redirectUri);
  } catch {
    return <Text>Failed to generate bank connect url</Text>
  }
  return <LinkButton title={title} url={url} />;
};

export default BankConnectButton;