import { Float } from "react-native/Libraries/Types/CodegenTypes"

enum OpenBankingApiProivder {
  TrueLayer = 1,
  Tink,
}

type OpenBankingApiConfig = {
  provider: OpenBankingApiProivder,
  useSandbox: boolean
}

type TokenRequestBody = {
  grant_type: string,
  client_id: string,
  client_secret: string,
  redirect_uri?: string,
  code: string
}

type BankTokenResponse = {
  access_token?: string,
  expires_in?: string,
  token_type?: string,
  refresh_token?: string,
  scope?: string,
  errorMessage?: string,
  errorCode?: string,
  error?: string,
  error_description?: string,
  error_details?: {
    reason: string,
    details: string
  }
}

type TrueLayerAccountNumber = {
  iban: string;
  swift_bic: string;
  number: string;
  sort_code: string;
}

type TrueLayerAccountProvider = {
  display_name: string;
  provider_id: string;
  logo_uri: string;
}

type TrueLayerAccount = {
  update_timestamp: string;
  account_id: string;
  account_type: string;
  display_name: string;
  currency: string;
  account_number: TrueLayerAccountNumber
  provider: TrueLayerAccountProvider;
};

type TrueLayerAccountsResults = Array<TrueLayerAccount>

type TrueLayerAccountsResponse = {
  results?: TrueLayerAccountsResults,
  errorMessage?: string,
  errorCode?: string,
}

type TinkAccountBalance = {
  amount: {
    value: {
      unscaledValue: string,
      scale: string
    }
    currencyCode: string
  }
}

type TinkAccount = {
  id: string;
  name: string;
  type: string;
  balances: {
    booked: TinkAccountBalance
    available: TinkAccountBalance
  },
  identifiers: {
    iban: {
      iban: string,
      bban: string
    },
    sortCode: {
      code: string,
      accountNumber: string
    },
    financialInstitution: {
      accountNumber: string,
      referenceNumbers: {}
    }
  },
  dates: {
    lastRefreshed: string
  },
  financialInstitutionId: string,
  customerSegment: string,
};

type TinkAccounts = Array<TinkAccount>

type TinkAccountsResponse = {
  accounts?: TinkAccounts,
  error?: string,
  error_description?: string,
  error_details?: {
    reason: string,
    details: string
  }
}

type SortCode = {
  code: string,
  number: string
}

type Account = {
  id: string,
  name: string,
  type: string,
  sort_code: SortCode
}

type Accounts = Array<Account>

type AccountsResponse = {
  accounts?: Accounts,
  error?: string
}

type TrueLayerTransaction = {
  timestamp: string,
  description: string,
  transaction_type: string,
  transaction_category: string,
  transaction_classification: [],
  amount: Float,
  currency: string,
  transaction_id: string,
  provider_transaction_id: string,
  normalised_provider_transaction_id: string,
  running_balance: {
    currency: string,
    amount: Float
  }
  meta: {
    provider_transaction_category: string
  }
}

type TrueLayerTransactionsResults = Array<TrueLayerTransaction>

type TrueLayerTransactionsResponse = {
  results?: TrueLayerTransactionsResults,
  status?: string
  errorMessage?: string,
  errorCode?: string,
}

type TinkTransaction = {
  id: string,
  accountId: string,
  amount: {
    value: {
      unscaledValue: string,
      scale: string
    }
    currencyCode: string
  },
  descriptions: {
    original: string,
    display: string
  },
  dates: {
    booked: string
  },
  identifiers: {
    providerTransactionId: string
  },
  types: {
    type: string
  },
  status: string,
  providerMutability: string
}

type TinkTransactions = Array<TinkTransaction>

type TinkTransactionsResponse = {
  transactions?: TinkTransactions,
  nextPageToken?: string,
  error?: string,
  error_description?: string,
  error_details?: {
    reason: string,
    details: string
  }
}

type Transaction = {
  timestamp: string,
  description: string,
  transaction_type: string,
  amount: Float,
  currency: string
}

type Transactions = Array<Transaction>

type TransactionsResponse = {
  transactions?: Transactions,
  error?: string
}

type SpendingInfo = {
  debit: string,
  credit: string
}

type SpendingInfoResponse = {
  spendingInfo?: SpendingInfo,
  error?: string
}

class OpenBankingApiHelper {

  public static getCodeApi(apiConfig: OpenBankingApiConfig): string {
    var api: string;
    switch (apiConfig.provider) {
      case OpenBankingApiProivder.Tink:
        api = 'https://link.tink.com';
        if (apiConfig.useSandbox) {
          api = 'https://link.tink.com';
        }
        break;
      case OpenBankingApiProivder.TrueLayer:
        api = 'https://auth.truelayer.com';
        if (apiConfig.useSandbox) {
          api = 'https://auth.truelayer-sandbox.com';
        }
        break;
      default:
        var error = 'Open Banking API ' + OpenBankingApiProivder[apiConfig.provider] + ' not implimented';
        throw error;
    }
    return api;
  }

  public static getTokenApi(apiConfig: OpenBankingApiConfig): string {
    var api: string;
    switch (apiConfig.provider) {
      case OpenBankingApiProivder.Tink:
        api = 'https://api.tink.com';
        if (apiConfig.useSandbox) {
          api = 'https://api.tink.com';
        }
        break;
      case OpenBankingApiProivder.TrueLayer:
        api = 'https://auth.truelayer.com';
        if (apiConfig.useSandbox) {
          api = 'https://auth.truelayer-sandbox.com';
        }
        break;
      default:
        var error = 'Open Banking API ' + OpenBankingApiProivder[apiConfig.provider] + ' not implimented';
        throw error;
    }
    return api;
  }

  public static getApi(apiConfig: OpenBankingApiConfig): string {
    var api: string;
    switch (apiConfig.provider) {
      case OpenBankingApiProivder.Tink:
        api = 'https://api.tink.com';
        if (apiConfig.useSandbox) {
          api = 'https://api.tink.com';
        }
        break;
      case OpenBankingApiProivder.TrueLayer:
        api = 'https://api.truelayer.com';
        if (apiConfig.useSandbox) {
          api = 'https://api.truelayer-sandbox.com';
        }
        break;
      default:
        var error = 'Open Banking API ' + OpenBankingApiProivder[apiConfig.provider] + ' not implimented';
        throw error;
    }
    return api;
  }
  
  public static getApiConnectOptions(apiConfig: OpenBankingApiConfig): string {
    var apiOptions: string;
    switch (apiConfig.provider) {
      case OpenBankingApiProivder.Tink:
        apiOptions = '&market=GB&locale=en_US';
        break;
      case OpenBankingApiProivder.TrueLayer:
        apiOptions = '&response_type=code&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20offline_access&providers=uk-cs-mock%20uk-ob-all%20uk-oauth-all';
        break;
      default:
        var error = 'Open Banking API ' + OpenBankingApiProivder[apiConfig.provider] + ' not implimented';
        throw error;
    }
    return apiOptions;
  }
  
  public static formatRedirectUri(apiConfig: OpenBankingApiConfig, redirectUri: string): string {
    var formattedRedirectUri: string;
    var encodedUri: string = encodeURIComponent(redirectUri);
    switch (apiConfig.provider) {
      case OpenBankingApiProivder.Tink:
        formattedRedirectUri = encodedUri;
        break;
      case OpenBankingApiProivder.TrueLayer:
        formattedRedirectUri = redirectUri;
        break;
      default:
        var error = 'Open Banking API ' + OpenBankingApiProivder[apiConfig.provider] + ' not implimented';
        throw error;
    }
    return formattedRedirectUri;
  }
  
  public static getClientId(apiConfig: OpenBankingApiConfig): string {
    var clientId: string;
    switch (apiConfig.provider) {
      case OpenBankingApiProivder.Tink:
        clientId = '9dc635fa50fc4efb85ff831759df293e';
        if (apiConfig.useSandbox) {
          clientId = 'e510fbadcd714f7ca5ef141d4923f6c1';
        }
        break;
      case OpenBankingApiProivder.TrueLayer:
        clientId = 'knightlife-c74f1f';
        if (apiConfig.useSandbox) {
          clientId = 'sandbox-knightlife-c74f1f';
        }
        break;
      default:
        var error = 'Open Banking API ' + OpenBankingApiProivder[apiConfig.provider] + ' not implimented';
        throw error;
    }
    return clientId;
  }
  
  public static getClientSecret(apiConfig: OpenBankingApiConfig): string {
    var clientSecret: string;
    switch (apiConfig.provider) {
      case OpenBankingApiProivder.Tink:
        clientSecret = '22c13d3a5f98434bb3becc202642144d';
        if (apiConfig.useSandbox) {
          clientSecret = '7a41cdd60b0a48c0831a3ccb02c8c112';
        }
        break;
      case OpenBankingApiProivder.TrueLayer:
        clientSecret = '4b8a24f2-1e9d-4d1f-80fb-da4dc0697923';
        if (apiConfig.useSandbox) {
          clientSecret = '42485d39-d77e-4d7e-a24e-fded84cdd7f7';
        }
        break;
      default:
        var error = 'Open Banking API ' + OpenBankingApiProivder[apiConfig.provider] + ' not implimented';
        throw error;
    }
    return clientSecret;
  }
  
  public static getConnectEndpoint(apiConfig: OpenBankingApiConfig): string {
    var endpoint: string;
    switch (apiConfig.provider) {
      case OpenBankingApiProivder.Tink:
        endpoint = '/1.0/transactions/connect-accounts/';
        break;
      case OpenBankingApiProivder.TrueLayer:
        endpoint = '/';
        break;
      default:
        var error = 'Open Banking API ' + OpenBankingApiProivder[apiConfig.provider] + ' not implimented';
        throw error;
    }
    return endpoint;
  }
  
  public static getTokenEndpoint(apiConfig: OpenBankingApiConfig): string {
    var endpoint: string;
    switch (apiConfig.provider) {
      case OpenBankingApiProivder.Tink:
        endpoint = '/api/v1/oauth/token';
        break;
      case OpenBankingApiProivder.TrueLayer:
        endpoint = '/connect/token';
        break;
      default:
        var error = 'Open Banking API ' + OpenBankingApiProivder[apiConfig.provider] + ' not implimented';
        throw error;
    }
    return endpoint;
  }

  public static getAccountsEndpoint(apiConfig: OpenBankingApiConfig): string {
    var endpoint: string;
    switch (apiConfig.provider) {
      case OpenBankingApiProivder.Tink:
        endpoint = '/data/v2/accounts';
        break;
      case OpenBankingApiProivder.TrueLayer:
        endpoint = '/data/v1/accounts';
        break;
      default:
        var error = 'Open Banking API ' + OpenBankingApiProivder[apiConfig.provider] + ' not implimented';
        throw error;
    }
    return endpoint;
  }

  public static getTransactionsEndpoint(apiConfig: OpenBankingApiConfig, accountId: string): string {
    var endpoint: string;
    switch (apiConfig.provider) {
      case OpenBankingApiProivder.Tink:
        endpoint = '/data/v2/transactions';
        break;
      case OpenBankingApiProivder.TrueLayer:
        endpoint = '/data/v1/accounts/' + accountId + '/transactions';
        break;
      default:
        var error = 'Open Banking API ' + OpenBankingApiProivder[apiConfig.provider] + ' not implimented';
        throw error;
    }
    return endpoint;
  }
  
  public static getCodeUrl(apiConfig: OpenBankingApiConfig, redirectUri: string): string {
    var api: string = this.getCodeApi(apiConfig);
    var endpoint: string = this.getConnectEndpoint(apiConfig);
    var clientId: string = this.getClientId(apiConfig);
    var apiOptions: string = this.getApiConnectOptions(apiConfig);
    var redirectUri: string = this.formatRedirectUri(apiConfig, redirectUri);
    var url: string = api + endpoint + '?client_id=' + clientId + '&redirect_uri=' + redirectUri + apiOptions;
    return url;
  }
  
  public static getTokenUrl(apiConfig: OpenBankingApiConfig): string {
    var api: string = this.getTokenApi(apiConfig);
    var endpoint: string = this.getTokenEndpoint(apiConfig);
    var url: string = api + endpoint;
    return url;
  }

  public static getTokenRequestData(apiConfig: OpenBankingApiConfig, redirectUri: string, code: string): any {
    var requestBody: TokenRequestBody = {
      grant_type: 'authorization_code',
      client_id: this.getClientId(apiConfig),
      client_secret: this.getClientSecret(apiConfig),
      redirect_uri: redirectUri,
      code: code
    }

    if (apiConfig.provider == OpenBankingApiProivder.Tink){
      requestBody.redirect_uri = undefined;
    }

    const body = new URLSearchParams(
      requestBody
    );

    var requestData = {
      method: 'POST',
      headers: {'Content-Type': "application/x-www-form-urlencoded"},
      body: body
    };

    return requestData;
  }

  public static getAuthorisedRequestData(token: string) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);

    var requestData = {
      headers: headers
    };

    return requestData;
  }

  public static getAccountsUrl(apiConfig: OpenBankingApiConfig): string {
    var api: string = this.getApi(apiConfig);
    var endpoint: string = this.getAccountsEndpoint(apiConfig);
    var url: string = api + endpoint;
    return url;
  }

  public static getTransactionsUrl(apiConfig: OpenBankingApiConfig, accountId: string): string {
    var api: string = this.getApi(apiConfig);
    var endpoint: string = this.getTransactionsEndpoint(apiConfig, accountId);
    var url: string = api + endpoint;
    return url;
  }

  public static processAccountsResponse(apiConfig: OpenBankingApiConfig, json: any): AccountsResponse {
    var accountsResponse: AccountsResponse = {
      accounts: undefined,
      error: undefined
    }
    switch(apiConfig.provider){
      case OpenBankingApiProivder.Tink:
        const { accounts, error_details }: TinkAccountsResponse = Object.assign(json);
        if (accounts){
          accountsResponse.accounts = new Array;
          accounts.forEach(tinkAccount => {
            var account: Account = {
              id: tinkAccount.id,
              name: tinkAccount.name,
              type: tinkAccount.type,
              sort_code: {
                number: tinkAccount.identifiers.sortCode.accountNumber,
                code: tinkAccount.identifiers.sortCode.code
              }
            }
            if (!accountsResponse.accounts){
              throw "Accounts array has not been initalised";
            }
            accountsResponse.accounts.push(
              account
            )
          });
        }
        if (error_details){
          accountsResponse.error = JSON.stringify(error_details);
        }
        break;
      case OpenBankingApiProivder.TrueLayer:
        const { results, errorMessage }: TrueLayerAccountsResponse = Object.assign(json);
        if (results){
          accountsResponse.accounts = new Array;
          results.forEach(result => {
            var account: Account = {
              id: result.account_id,
              name: result.display_name,
              type: result.account_type,
              sort_code: {
                number: result.account_number.number,
                code: result.account_number.sort_code
              }
            }
            if (!accountsResponse.accounts){
              throw "Accounts array has not been initalised";
            }
            accountsResponse.accounts.push(
              account
            )
          });
        }
        if (errorMessage){
          accountsResponse.error = errorMessage;
        }
        break;
      default:
        var error = 'Open Banking API ' + OpenBankingApiProivder[apiConfig.provider] + ' not implimented';
        throw error;
    }
    return accountsResponse;
  }

  public static processTransactionsResponse(apiConfig: OpenBankingApiConfig, json: any): TransactionsResponse {
    var transactionsResponse: TransactionsResponse = {
      transactions: undefined,
      error: undefined
    }
    switch(apiConfig.provider){
      case OpenBankingApiProivder.Tink:
        const { transactions, error_details }: TinkTransactionsResponse = Object.assign(json);
        if (transactions){
          transactionsResponse.transactions = new Array;
          transactions.forEach(tinkTransaction => {
            var transaction: Transaction = {
              timestamp: tinkTransaction.dates.booked,
              description: tinkTransaction.descriptions.original,
              transaction_type: tinkTransaction.types.type,
              amount: Number(tinkTransaction.amount.value),
              currency: tinkTransaction.amount.currencyCode
            }
            if (!transactionsResponse.transactions){
              throw "Transactions array has not been initalised";
            }
            transactionsResponse.transactions.push(
              transaction
            )
          });
        }
        if (error_details){
          transactionsResponse.error = JSON.stringify(error_details);
        }
        break;
      case OpenBankingApiProivder.TrueLayer:
        const { results, errorMessage }: TrueLayerTransactionsResponse = Object.assign(json);
        if (results){
          transactionsResponse.transactions = new Array;
          results.forEach(result => {
            var transaction: Transaction = {
              timestamp: result.timestamp,
              description: result.description,
              transaction_type: result.transaction_type,
              amount: result.amount,
              currency: result.currency
            }
            if (!transactionsResponse.transactions){
              throw "Transactions array has not been initalised";
            }
            transactionsResponse.transactions.push(
              transaction
            )
          });
        }
        if (errorMessage){
          transactionsResponse.error = errorMessage;
        }
        break;
      default:
        var error = 'Open Banking API ' + OpenBankingApiProivder[apiConfig.provider] + ' not implimented';
        throw error;
    }
    return transactionsResponse;
  }

}

export { OpenBankingApiProivder, OpenBankingApiConfig, OpenBankingApiHelper };
export { Accounts, AccountsResponse };
export { BankTokenResponse };
export { SpendingInfo, SpendingInfoResponse };