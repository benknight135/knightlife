enum OpenBankingApiProivder {
  TrueLayer = 1,
  Tink,
}

type OpenBankingApiConfig = {
  provider: OpenBankingApiProivder,
  useSandbox: boolean
}

type BankTokenJSONRequest = {
  openBankingApiConfig?: OpenBankingApiConfig,
  code?: string,
  errors?: Array<{message: string}>
}

type TokenRequestBody = {
  grant_type: string,
  client_id: string,
  client_secret: string,
  redirect_uri?: string,
  code: string
}

type TokenRequestData = {
  method: string,
  headers: Headers,
  body: string
}

type BankTokenJSONResponse = {
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

type AccountsRequestData = {
  headers: Headers
}

type AccountNumber = {
  iban: string;
  swift_bic: string;
  number: string;
  sort_code: string;
}

type AccountProvider = {
  display_name: string;
  provider_id: string;
  logo_uri: string;
}

type Account = {
  update_timestamp: string;
  account_id: string;
  account_type: string;
  display_name: string;
  currency: string;
  account_number: AccountNumber
  provider: AccountProvider;
};

type AccountsResults = Array<Account>

type AccountsJSONResponse = {
  results?: AccountsResults,
  errors?: Array<{message: string}>
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
  
  public static generateCodeUrl(apiConfig: OpenBankingApiConfig, redirectUri: string): string {
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

  public static generateTokenRequestData(apiConfig: OpenBankingApiConfig, redirectUri: string, code: string): any {
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
    // body.append('grant_type', 'authorization_code');
    // body.append('client_id', this.getClientId(apiConfig));
    // body.append('client_secret', this.getClientSecret(apiConfig));
    // body.append('code', 'password');
    // if (apiConfig.provider != OpenBankingApiProivder.Tink){
    //   body.append('redirect_uri', redirectUri);
    // }

    var requestData = {
      method: 'POST',
      headers: {'Content-Type': "application/x-www-form-urlencoded"},
      body: body
    };

    return requestData;
  }

  public static getAccountsUrl(apiConfig: OpenBankingApiConfig): string {
    var api: string = this.getApi(apiConfig);
    var endpoint: string = this.getAccountsEndpoint(apiConfig);
    var url: string = api + endpoint;
    return url;
  }

  public static generateAccountsRequestData(token: string): AccountsRequestData {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);

    var requestData = {
      headers: headers
    };

    return requestData;
  }

}

export { OpenBankingApiProivder, OpenBankingApiConfig, OpenBankingApiHelper };
export { BankTokenJSONRequest }
export { AccountsResults, AccountsJSONResponse }
export { BankTokenJSONResponse }