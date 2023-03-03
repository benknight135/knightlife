import React from 'react';
import { ActivityIndicator } from 'react-native';
import LinkButton from './LinkButton'
import { OpenBankingApiConfig, OpenBankingApiHelper } from '../Shared/Banking';

type BankConnectButtonProps = {
  title: string;
  openBankingApiConfig: OpenBankingApiConfig;
  redirectUri: string;
};

const BankConnectButton = ({title, openBankingApiConfig, redirectUri}: BankConnectButtonProps) => {
  try{
    var url: string = OpenBankingApiHelper.getCodeUrl(openBankingApiConfig, redirectUri);
    console.log(url);
  } catch {
    console.error("Failed to generate bank code url")
    return <ActivityIndicator/>
  }
  return <LinkButton title={title} url={url} />;
};

export default BankConnectButton;