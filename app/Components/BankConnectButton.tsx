import React from 'react';
import { ActivityIndicator } from 'react-native';
import LinkButton from './LinkButton'
import { OpenBankingApiConfig, OpenBankingApiHelper } from './KnightLifeApi';

interface BankConnectButtonProps {
  title: string;
  openBankingApiConfig: OpenBankingApiConfig;
  redirectUri: string;
};

const BankConnectButton: React.FC<BankConnectButtonProps> = ({title, openBankingApiConfig, redirectUri}) => {
  try{
    var url: string = OpenBankingApiHelper.getCodeUrl(openBankingApiConfig, redirectUri);
  } catch {
    console.error("Failed to generate bank code url")
    return <ActivityIndicator/>
  }
  return <LinkButton title={title} url={url} />;
};

export default BankConnectButton;