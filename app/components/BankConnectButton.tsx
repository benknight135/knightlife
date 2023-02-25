import React from 'react';
import { Text } from 'react-native';
import LinkButton from './LinkButton'
import { OpenBankingApiConfig, OpenBankingApiHelper } from './Banking';

type BankConnectButtonProps = {
  title: string;
  openBankingApiConfig: OpenBankingApiConfig;
  redirectUri: string;
};

const BankConnectButton = ({title, openBankingApiConfig, redirectUri}: BankConnectButtonProps) => {
  try{
    var url: string = OpenBankingApiHelper.generateConnectUrl(openBankingApiConfig, redirectUri);
    console.log(url);
  } catch {
    return <Text>Failed to generate bank connect url</Text>
  }
  return <LinkButton title={title} url={url} />;
};

export default BankConnectButton;