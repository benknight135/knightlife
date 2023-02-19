import React from 'react';
import LinkButton from './LinkButton'

type BankConnectButtonProps = {
  title: string;
  tinkClientId: string;
  tinkRedirectUri: string;
};

const BankConnectButton = ({title, tinkClientId, tinkRedirectUri}: BankConnectButtonProps) => {
    const url = "https://link.tink.com/1.0/transactions/connect-accounts/?client_id=" + tinkClientId + "&redirect_uri=" + tinkRedirectUri + "&market=GB&locale=en_US"

  return <LinkButton title={title} url={url} />;
};

export default BankConnectButton;