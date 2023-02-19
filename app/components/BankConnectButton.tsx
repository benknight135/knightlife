import React from 'react';
import LinkButton from './LinkButton'

type BankConnectButtonProps = {
  title: string;
};

const BankConnectButton = ({title}: BankConnectButtonProps) => {
    const tink_client_id = "e510fbadcd714f7ca5ef141d4923f6c1"
    const tink_redirect_uri = "https%3A%2F%2Fconsole.tink.com%2Fcallback"
    const url = "https://link.tink.com/1.0/transactions/connect-accounts/?client_id=" + tink_client_id + "&redirect_uri=" + tink_redirect_uri + "&market=GB&locale=en_US"

  return <LinkButton title={title} url={url} />;
};

export default BankConnectButton;