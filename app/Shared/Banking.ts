
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

type TokenResponse = {
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

type TokenFetchResponse = {
  status: number,
  body: TokenResponse
}

type TrueLayerAccountNumber = {
  iban: string,
  swift_bic: string,
  number: string,
  sort_code: string
}

type TrueLayerAccountProvider = {
  display_name: string,
  provider_id: string,
  logo_uri: string
}

type TrueLayerAccount = {
  update_timestamp: string,
  account_id: string,
  account_type: string,
  display_name: string,
  currency: string,
  account_number: TrueLayerAccountNumber,
  provider: TrueLayerAccountProvider
};

type TrueLayerAccountsResults = Array<TrueLayerAccount>

type TrueLayerAccountsResponse = {
  results?: TrueLayerAccountsResults,
  errorMessage?: string,
  errorCode?: string,
}

type TinkAmount = {
  currencyCode: string,
  value: {
    scale: number,
    unscaledValue: number
  }
}

type TinkBalanceV1 = {
  currencyCode: string,
  scale: number,
  unscaledValue: number
}

type TinkBalanceV2 = {
  amount: TinkAmount
}

type TinkAccount = {
  id: string,
  name: string,
  type: string,
  balances: {
    booked: TinkBalanceV2,
    available: TinkBalanceV2
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
  customerSegment: string
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

type AccountsFetchResponse = {
  status: number,
  body: AccountsResponse
}

type TrueLayerBalance = {
  currency: string,
  available: number,
  current: number,
  overdraft: number,
  update_timestamp: string
}

type TrueLayerBalanceResults = Array<TrueLayerBalance>;

type TrueLayerBalanceResponse = {
  results?: TrueLayerBalanceResults,
  errorMessage?: string,
  errorCode?: string,
}

type TinkBalanceResponse = {
  accountId?: string
  balances?: {
    available: TinkBalanceV1,
    booked: TinkBalanceV1,
    creditLimit: TinkBalanceV1 | null
  },
  refreshed?: string,
  error?: string,
  error_description?: string,
  error_details?: {
    reason: string,
    details: string
  }
}

type Balance = {
  currency: string,
  available: number,
  current: number,
  overdraft: number
}

type BalanceResponse = {
  balance?: Balance,
  error?: string
}

type BalanceFetchResponse = {
  status: number,
  body: BalanceResponse
}

type TrueLayerTransaction = {
  timestamp: string,
  description: string,
  transaction_type: string,
  transaction_category: string,
  transaction_classification: [],
  amount: number,
  currency: string,
  transaction_id: string,
  provider_transaction_id: string,
  normalised_provider_transaction_id: string,
  running_balance: {
    currency: string,
    amount: number
  }
  meta: {
    provider_transaction_category: string
  }
}

type TrueLayerTransactionsResults = Array<TrueLayerTransaction>

type TrueLayerTransactionsResponse = {
  results?: TrueLayerTransactionsResults,
  status?: string,
  errorMessage?: string,
  errorCode?: string,
}

type TinkTransaction = {
  id: string,
  accountId: string,
  amount: TinkAmount,
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
  id: string
  timestamp: string,
  description: string,
  transaction_type: string,
  amount: number,
  currency: string
}

type Transactions = Array<Transaction>

type TransactionsResponse = {
  transactions?: Transactions,
  error?: string
}

type TransactionsFetchResponse = {
  status: number,
  body: TransactionsResponse
}

type SpendingAnalysis = {
  income: any,
  subscriptions: any,
  spending: any,
  startBalance: number,
  endBalance: number,
  debit: number,
  credit: number,
  net: number
}

type AccountInfo = {
  account: Account,
  balance: Balance,
  transactions: CategorisedTransactions,
  analysis: SpendingAnalysis
}

type AccountsInfo = Array<AccountInfo>;

enum SpendingInfoCategory {
  Income = "Income",
  Subscription = "Subscription",
  Spending = "Spending"
}

enum SpendingInfoIncomeCategory {
  Work = "Work",
  Family = "Family",
  Misc = "Misc"
}

enum SpendingInfoSubscriptionCategory {
  Rent = "Rent",
  Saving = "Saving",
  CouncilTax = "Council Tax",
  Internet = "Internet",
  Storage = "Storage",
  OnlineStorage = "Online Storage",
  Charity = "Charity",
  Mobile = "Mobile",
  Apps = "Apps",
  Music = "Music",
  Podcasts = "Podcasts",
  Streaming = "Streaming",
  Gaming = "Gaming",
  Misc = "Misc",
}

enum SpendingInfoSpendingCategory {
  Travel = "Travel",
  Food = "Food",
  Takeaway = "Takeaway",
  EatingOut = "Eating Out",
  Entertainment = "Entertainment",
  Misc = "Misc"
}

type SpendingInfoItem = {
  name: string,
  category: SpendingInfoSubCategory,
  amount: number
}

type SpendingInfo = {
  accountsInfo: AccountsInfo
}

type SpendingInfoResponse = {
  spendingInfo?: SpendingInfo,
  error?: string
}

type SpendingInfoSubCategory = SpendingInfoIncomeCategory | SpendingInfoSubscriptionCategory | SpendingInfoSpendingCategory;

type GetSpendingInfoCategoryProps = {
  spendingInfoCategory: SpendingInfoCategory,
  spendingInfoSubCategory: SpendingInfoSubCategory
}

type SpendingInfoMatch = {
  description: string,
  amount: number | undefined
}

type SpendingInfoCategoryMatches = {
  category: SpendingInfoSubCategory
  matches: Array<SpendingInfoMatch>
}

type SpendingInfoCategoryMatchesList = Array<SpendingInfoCategoryMatches>

type CategorisedTransaction = {
  transaction: Transaction,
  category: SpendingInfoCategory,
  subCategory: SpendingInfoSubCategory
}

type CategorisedTransactions = Array<CategorisedTransaction>

class OpenBankingApiHelper {

  private static findSpendingInfoCategory(transaction: Transaction, category: SpendingInfoCategory, itemList: SpendingInfoCategoryMatchesList): GetSpendingInfoCategoryProps | undefined {
    for (var i = 0; i < itemList.length; i++) {
      for (var j = 0; j < itemList[i].matches.length; j++) {
        if (itemList[i].matches[j].description == transaction.description){
          if (itemList[i].matches[j].amount === undefined){
            return {
              spendingInfoCategory: category,
              spendingInfoSubCategory: itemList[i].category
            }
          }
          if (itemList[i].matches[j].amount == transaction.amount){
            return {
              spendingInfoCategory: category,
              spendingInfoSubCategory: itemList[i].category
            }
          }
        }
      }
    }

    return undefined;
  }

  public static getSpendingInfoCategory(transaction: Transaction): GetSpendingInfoCategoryProps {
    var itemList: SpendingInfoCategoryMatchesList;
    if (transaction.amount > 0){
      itemList = [
        {
          category: SpendingInfoIncomeCategory.Work,
          matches: [
            {
              description: "PAXTON ACCESS LT",
              amount: undefined
            }
          ]
        },
        {
          category: SpendingInfoIncomeCategory.Family,
          matches: [
            {
              description: "R KNIGHT",
              amount: undefined
            }
          ]
        },
        {
          category: SpendingInfoIncomeCategory.Misc,
          matches: []
        }
      ];

      var result = OpenBankingApiHelper.findSpendingInfoCategory(
        transaction,
        SpendingInfoCategory.Income,
        itemList
      )
  
      if (result !== undefined){
        return result;
      }
    }

    if (transaction.amount < 0){

      itemList = [
        {
          category: SpendingInfoSubscriptionCategory.Rent,
          matches: [
            {
              description: "LINK UP LETTINGS",
              amount: undefined
            }
          ]
        },
        {
          category: SpendingInfoSubscriptionCategory.Saving,
          matches: [
            {
              description: "STANDARD SAVER",
              amount: undefined
            },
            {
              description: "SAVE THE CHANGE",
              amount: undefined
            }
          ]
        },
        {
          category: SpendingInfoSubscriptionCategory.Charity,
          matches: [
            {
              description: "CENTREPOINT SOHO F",
              amount: undefined
            },
            {
              description: "CANCER RESEARCH U",
              amount: undefined
            }
          ]
        },
        {
          category: SpendingInfoSubscriptionCategory.CouncilTax,
          matches: [
            {
              description: "B&H BC",
              amount: undefined
            }
          ]
        },
        {
          category: SpendingInfoSubscriptionCategory.Gaming,
          matches: [
            {
              description: "Nintendo CD9292003",
              amount: undefined
            }
          ]
        },
        {
          category: SpendingInfoSubscriptionCategory.Internet,
          matches: [
            {
              description: "VIRGIN MEDIA PYMTS",
              amount: undefined
            }
          ]
        },
        {
          category: SpendingInfoSubscriptionCategory.Mobile,
          matches: [
            {
              description: "GIFFGAFF",
              amount: undefined
            },
            {
              description: "giffgaff",
              amount: undefined
            },
            {
              description: "APPLE.COM/BILL", // AppleCare+
              amount: -9.49
            },
          ]
        },
        {
          category: SpendingInfoSubscriptionCategory.Music,
          matches: [
            {
              description: "SPOTIFY",
              amount: undefined
            },
            {
              description: "Spotify UK",
              amount: undefined
            },
            {
              description: "APPLE.COM/BILL", // Apple Music
              amount: -10.99
            }
          ]
        },
        {
          category: SpendingInfoSubscriptionCategory.OnlineStorage,
          matches: [
            {
              description: "GOOGLE Google Stor",
              amount: undefined
            },
            {
              description: "APPLE.COM/BILL",
              amount: -9.99
            }
          ]
        },
        {
          category: SpendingInfoSubscriptionCategory.Streaming,
          matches: [
            {
              description: "APPLE.COM/BILL", // Disney+
              amount: -7.99
            },
            {
              description: "NETFLIX.COM",
              amount: undefined
            }
          ]
        },
        {
          category: SpendingInfoSubscriptionCategory.Apps,
          matches: [
            {
              description: "APPLE.COM/BILL",
              amount: undefined
            }
          ]
        },
        {
          category: SpendingInfoSubscriptionCategory.Podcasts,
          matches: [
            {
              description: "RELAY FM",
              amount: undefined
            }
          ]
        },
        {
          category: SpendingInfoSubscriptionCategory.Storage,
          matches: [
            {
              description: "BIG YELLOW",
              amount: undefined
            },
            {
              description: "PAYMENTSHIELD LTD",
              amount: undefined
            }
          ]
        },
        {
          category: SpendingInfoSubscriptionCategory.Misc,
          matches: []
        },
      ];

      result = OpenBankingApiHelper.findSpendingInfoCategory(
        transaction,
        SpendingInfoCategory.Subscription,
        itemList
      )

      if (result !== undefined){
        return result;
      }

      itemList = [
        {
          category: SpendingInfoSpendingCategory.Travel,
          matches: [
            {
              description: "BRIGHTON AND HOVE",
              amount: undefined
            },
            {
              description: "TRAINLINE",
              amount: undefined
            },
            {
              description: "TFL",
              amount: undefined
            }
          ]
        },
        {
          category: SpendingInfoSpendingCategory.Food,
          matches: [
            {
              description: "WM MORRISONS STORE",
              amount: undefined
            },
            {
              description: "SAINSBURYS SPRMKT",
              amount: undefined
            },
            {
              description: "ALDI STORES LTD",
              amount: undefined
            },
            {
              description: "TESCO",
              amount: undefined
            },
            {
              description: "CO OP GROUP FOOD",
              amount: undefined
            }
          ]
        },
        {
          category: SpendingInfoSpendingCategory.EatingOut,
          matches: [
            {
              description: "SQ *THE ROUNDHILL",
              amount: undefined
            },
            {
              description: "SUMUP *LE BAOBAB",
              amount: undefined
            },
            {
              description: "MOSHIMO",
              amount: undefined
            },
            {
              description: "LOADING",
              amount: undefined
            },
            {
              description: "Tonkotsu Ltd.",
              amount: undefined
            },
            {
              description: "Fil Fil Falafel Co",
              amount: undefined
            },
            {
              description: "SUMUP *THE AVENUE",
              amount: undefined
            },
            {
              description: "Bonsai Plant Kitch",
              amount: undefined
            },
            {
              description: "HONEST BURGERS BRI",
              amount: undefined
            },
            {
              description: "KOGI KOREAN CUISIN",
              amount: undefined
            },
            {
              description: "GREGGS",
              amount: undefined
            }
          ]
        },
        {
          category: SpendingInfoSpendingCategory.Takeaway,
          matches: [
            {
              description: "DELIVEROO",
              amount: undefined
            }
          ]
        },
        {
          category: SpendingInfoSpendingCategory.Entertainment,
          matches: [
            {
              description: "WWW.KOMEDIA.CO.UK/",
              amount: undefined
            },
            {
              description: "KOMEDIA",
              amount: undefined
            },
            {
              description: "ODEON CINEMAS",
              amount: undefined
            },
            {
              description: "PICTUREHOUSE",
              amount: undefined
            }
          ]
        },
        {
          category: SpendingInfoSpendingCategory.Misc,
          matches: []
        }
      ];

      var result = OpenBankingApiHelper.findSpendingInfoCategory(
        transaction,
        SpendingInfoCategory.Spending,
        itemList
      )

      if (result !== undefined){
        return result;
      }
    }

    // transaction was not found in known categories to asign to misc based on amount
    if (transaction.amount > 0){
      return {
        spendingInfoCategory: SpendingInfoCategory.Income,
        spendingInfoSubCategory: SpendingInfoIncomeCategory.Misc
      }
    }
    if (transaction.amount <= 0){
      return {
        spendingInfoCategory: SpendingInfoCategory.Spending,
        spendingInfoSubCategory: SpendingInfoSpendingCategory.Misc
      }
    }

    throw new Error("Unaccounted for transaction");
  }

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
        apiOptions = '&scope=accounts%3Aread%2Ctransactions%3Areadbalances%3Aread&market=GB&locale=en_US';
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
        endpoint = '/1.0/transactions/connect-accounts';
        break;
      case OpenBankingApiProivder.TrueLayer:
        endpoint = '';
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

  public static getBalanceEndpoint(apiConfig: OpenBankingApiConfig, accountId: string): string {
    var endpoint: string;
    switch (apiConfig.provider) {
      case OpenBankingApiProivder.Tink:
        endpoint = '/api/v1/accounts/' + accountId + '/balances';
        break;
      case OpenBankingApiProivder.TrueLayer:
        endpoint = '/data/v1/accounts/' + accountId + '/balance';
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

  public static getTokenRequestData(apiConfig: OpenBankingApiConfig, code: string, redirectUri: string, ): any {
    var requestBody: TokenRequestBody = {
      grant_type: 'authorization_code',
      client_id: this.getClientId(apiConfig),
      client_secret: this.getClientSecret(apiConfig),
      redirect_uri: redirectUri,
      code: code
    }

    if (apiConfig.provider == OpenBankingApiProivder.Tink) {
      requestBody.redirect_uri = undefined;
    }

    const body = new URLSearchParams(
      requestBody
    );

    var requestData = {
      method: 'POST',
      headers: { 'Content-Type': "application/x-www-form-urlencoded" },
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

  public static getBalanceUrl(apiConfig: OpenBankingApiConfig, accountId: string): string {
    var api: string = this.getApi(apiConfig);
    var endpoint: string = this.getBalanceEndpoint(apiConfig, accountId);
    var url: string = api + endpoint;
    return url;
  }

  public static getTransactionsUrl(apiConfig: OpenBankingApiConfig, accountId: string): string {
    var api: string = this.getApi(apiConfig);
    var endpoint: string = this.getTransactionsEndpoint(apiConfig, accountId);
    var options: string = "";
    if (apiConfig.provider == OpenBankingApiProivder.Tink){
      options = "?accountIdIn=" + accountId;
    }
    var url: string = api + endpoint + options;
    return url;
  }

  public static processAccountsResponse(apiConfig: OpenBankingApiConfig, json: any): AccountsResponse {
    var accountsResponse: AccountsResponse = {
      accounts: undefined,
      error: undefined
    }
    switch (apiConfig.provider) {
      case OpenBankingApiProivder.Tink:
        const { accounts, error_details }: TinkAccountsResponse = Object.assign(json);
        if (accounts) {
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
            if (!accountsResponse.accounts) {
              throw "Accounts array has not been initalised";
            }
            accountsResponse.accounts.push(
              account
            )
          });
        }
        if (error_details) {
          accountsResponse.error = JSON.stringify(error_details);
        }
        break;
      case OpenBankingApiProivder.TrueLayer:
        const { results, errorMessage }: TrueLayerAccountsResponse = Object.assign(json);
        if (results) {
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
            if (!accountsResponse.accounts) {
              throw "Accounts array has not been initalised";
            }
            accountsResponse.accounts.push(
              account
            )
          });
        }
        if (errorMessage) {
          accountsResponse.error = errorMessage;
        }
        break;
      default:
        var error = 'Open Banking API ' + OpenBankingApiProivder[apiConfig.provider] + ' not implimented';
        throw error;
    }
    return accountsResponse;
  }

  public static processBalanceResponse(apiConfig: OpenBankingApiConfig, json: any): BalanceResponse {
    var balanceResponse: BalanceResponse = {
      balance: undefined,
      error: undefined
    }
    switch (apiConfig.provider) {
      case OpenBankingApiProivder.Tink:
        const { balances, error_details }: TinkBalanceResponse = Object.assign(json);
        if (balances) {
          var creditLimit = balances.creditLimit
          if (creditLimit == null){
            creditLimit = {
              currencyCode: balances.available.currencyCode,
              scale: balances.available.scale,
              unscaledValue: 0
            }
          }
          balanceResponse.balance = {
            currency: balances.available.currencyCode,
            available: balances.available.unscaledValue,
            current: balances.booked.unscaledValue,
            overdraft: creditLimit.unscaledValue
          };
        }
        if (error_details) {
          balanceResponse.error = JSON.stringify(error_details);
        }
        break;
      case OpenBankingApiProivder.TrueLayer:
        const { results, errorMessage }: TrueLayerBalanceResponse = Object.assign(json);
        if (results) {
          // as we always specify a single account id
          // pick the first result (there should be only one)
          balanceResponse.balance = {
            currency: results[0].currency,
            available: results[0].available,
            current: results[0].current,
            overdraft: results[0].overdraft
          };
        }
        if (errorMessage) {
          balanceResponse.error = errorMessage;
        }
        break;
      default:
        var error = 'Open Banking API ' + OpenBankingApiProivder[apiConfig.provider] + ' not implimented';
        throw error;
    }
    return balanceResponse;
  }

  public static processTransactionsResponse(apiConfig: OpenBankingApiConfig, json: any): TransactionsResponse {
    var transactionsResponse: TransactionsResponse = {
      transactions: undefined,
      error: undefined
    }
    switch (apiConfig.provider) {
      case OpenBankingApiProivder.Tink:
        const { transactions, error_details }: TinkTransactionsResponse = Object.assign(json);
        if (transactions) {
          transactionsResponse.transactions = new Array;
          transactions.forEach(tinkTransaction => {
            var transaction: Transaction = {
              id: tinkTransaction.identifiers.providerTransactionId,
              timestamp: tinkTransaction.dates.booked,
              description: tinkTransaction.descriptions.original,
              transaction_type: tinkTransaction.types.type,
              amount: tinkTransaction.amount.value.unscaledValue,
              currency: tinkTransaction.amount.currencyCode
            }
            if (!transactionsResponse.transactions) {
              throw "Transactions array has not been initalised";
            }
            transactionsResponse.transactions.push(
              transaction
            )
          });
        }
        if (error_details) {
          transactionsResponse.error = JSON.stringify(error_details);
        }
        break;
      case OpenBankingApiProivder.TrueLayer:
        const { results, errorMessage }: TrueLayerTransactionsResponse = Object.assign(json);
        if (results) {
          transactionsResponse.transactions = new Array;
          results.forEach(result => {
            var transaction: Transaction = {
              id: result.provider_transaction_id,
              timestamp: result.timestamp,
              description: result.description,
              transaction_type: result.transaction_type,
              amount: result.amount,
              currency: result.currency
            }
            if (!transactionsResponse.transactions) {
              throw "Transactions array has not been initalised";
            }
            transactionsResponse.transactions.push(
              transaction
            )
          });
        }
        if (errorMessage) {
          transactionsResponse.error = errorMessage;
        }
        break;
      default:
        var error = 'Open Banking API ' + OpenBankingApiProivder[apiConfig.provider] + ' not implimented';
        throw error;
    }
    return transactionsResponse;
  }

  public static async fetchToken(apiConfig: OpenBankingApiConfig, code: string, redirectUri: string): Promise<TokenFetchResponse> {
    var tokenUrl = OpenBankingApiHelper.getTokenUrl(apiConfig);
    var requestData = OpenBankingApiHelper.getTokenRequestData(apiConfig, code, redirectUri)
    var tokenFetchResponse: TokenFetchResponse = {
      status: 400,
      body: {
        access_token: undefined,
        error: undefined
      }
    }

    try {
      const response = await fetch(tokenUrl, requestData);
      try {
        const resText = await response.text();
        try {
          const resJson = JSON.parse(resText);
          try {
            const { access_token, errorMessage, error_details }: TokenResponse = Object.assign(resJson);
            if (response.ok) {
              if (access_token) {
                tokenFetchResponse.body.access_token = access_token;
                tokenFetchResponse.status = 200;
                return tokenFetchResponse;
              } else {
                var errorMsg = "Did not find 'accounts' in response data";
                tokenFetchResponse.body.error = errorMsg;
                return tokenFetchResponse;
              }
            } else {
              var error: string = "Response not ok: ";
              if (error_details){
                  error += JSON.stringify(error_details);
              }
              if (errorMessage){
                  error += errorMessage;
              }
              tokenFetchResponse.body.error = error;
              return tokenFetchResponse;
            }
          } catch (error) {
            var errorMsg: string = "Failed to process json response: " + (error);
            errorMsg += ": " + JSON.stringify(resJson);
            tokenFetchResponse.body.error = errorMsg;
            return tokenFetchResponse;
          }
        } catch (error) {
          var errorMsg: string = "Failed to parse json response: " + (error);
          errorMsg += ": " + resText;
          tokenFetchResponse.body.error = errorMsg;
          return tokenFetchResponse;
        }
      } catch (error) {
        var errorMsg: string = "Failed to read response text: " + (error);
        tokenFetchResponse.body.error = errorMsg;
        return tokenFetchResponse;
      }
    } catch (error) {
      var errorMsg: string = "Failed to fetch response: " + (error);
      tokenFetchResponse.body.error = errorMsg;
      return tokenFetchResponse;
    }
  }

  public static async fetchAccounts(apiConfig: OpenBankingApiConfig, token: string): Promise<AccountsFetchResponse> {
    var accountsUrl = OpenBankingApiHelper.getAccountsUrl(apiConfig);
    var requestData = OpenBankingApiHelper.getAuthorisedRequestData(token);
    var accountsFetchResponse: AccountsFetchResponse = {
      status: 400,
      body: {
        accounts: undefined,
        error: undefined
      }
    }

    try {
      const response = await fetch(accountsUrl, requestData);
      try {
        const resText = await response.text();
        try {
          const resJson = JSON.parse(resText);
          try {
            const { accounts, error }: AccountsResponse = OpenBankingApiHelper.processAccountsResponse(
              apiConfig, resJson);
            if (response.ok) {
              if (accounts) {
                accountsFetchResponse.body.accounts = accounts;
                accountsFetchResponse.status = 200;
                return accountsFetchResponse;
              } else {
                var errorMsg = "Did not find 'accounts' in response data";
                accountsFetchResponse.body.error = errorMsg;
                return accountsFetchResponse;
              }
            } else {
              var errorMsg: string = "Response not ok: " + error;
              accountsFetchResponse.body.error = errorMsg;
              return accountsFetchResponse;
            }
          } catch (error) {
            var errorMsg: string = "Failed to process json response: " + (error);
            errorMsg += ": " + JSON.stringify(resJson);
            accountsFetchResponse.body.error = errorMsg;
            return accountsFetchResponse;
          }
        } catch (error) {
          var errorMsg: string = "Failed to parse json response: " + (error);
          errorMsg += ": " + resText;
          accountsFetchResponse.body.error = errorMsg;
          return accountsFetchResponse;
        }
      } catch (error) {
        var errorMsg: string = "Failed to read response text: " + (error);
        accountsFetchResponse.body.error = errorMsg;
        return accountsFetchResponse;
      }
    } catch (error) {
      var errorMsg: string = "Failed to fetch response: " + (error);
      accountsFetchResponse.body.error = errorMsg;
      return accountsFetchResponse;
    }
  }

  public static async fetchBalance(apiConfig: OpenBankingApiConfig, token: string, accountId: string): Promise<BalanceFetchResponse> {
    var balanceUrl = OpenBankingApiHelper.getBalanceUrl(apiConfig, accountId);
    var requestData = OpenBankingApiHelper.getAuthorisedRequestData(token);
    var balanceFetchResponse: BalanceFetchResponse = {
      status: 400,
      body: {
        balance: undefined,
        error: undefined
      }
    }

    try {
      const response = await fetch(balanceUrl, requestData);
      try {
        const resText = await response.text();
        try {
          const resJson = JSON.parse(resText);
          try {
            const { balance, error }: BalanceResponse = OpenBankingApiHelper.processBalanceResponse(
              apiConfig, resJson);
            if (response.ok) {
              if (balance) {
                balanceFetchResponse.body.balance = balance;
                balanceFetchResponse.status = 200;
                return balanceFetchResponse;
              } else {
                var errorMsg = "Did not find 'balance' in response data";
                balanceFetchResponse.body.error = errorMsg;
                return balanceFetchResponse;
              }
            } else {
              var errorMsg: string = "Response not ok: " + error;
              balanceFetchResponse.body.error = errorMsg;
              return balanceFetchResponse;
            }
          } catch (error) {
            var errorMsg: string = "Failed to process json response: " + (error);
            errorMsg += ": " + JSON.stringify(resJson);
            balanceFetchResponse.body.error = errorMsg;
            return balanceFetchResponse;
          }
        } catch (error) {
          var errorMsg: string = "Failed to parse json response: " + (error);
          errorMsg += ": " + resText;
          balanceFetchResponse.body.error = errorMsg;
          return balanceFetchResponse;
        }
      } catch (error) {
        var errorMsg: string = "Failed to read response text: " + (error);
        balanceFetchResponse.body.error = errorMsg;
        return balanceFetchResponse;
      }
    } catch (error) {
      var errorMsg: string = "Failed to fetch response: " + (error);
      balanceFetchResponse.body.error = errorMsg;
      return balanceFetchResponse;
    }
  }

  public static async fetchTransactions(apiConfig: OpenBankingApiConfig, token: string, accountId: string): Promise<TransactionsFetchResponse> {
    var transactionsUrl = OpenBankingApiHelper.getTransactionsUrl(apiConfig, accountId);
    var requestData = OpenBankingApiHelper.getAuthorisedRequestData(token);
    var transactionsFetchResponse: TransactionsFetchResponse = {
      status: 400,
      body: {
        transactions: undefined,
        error: undefined
      }
    }

    try {
      const response = await fetch(transactionsUrl, requestData);
      try {
        const resText = await response.text();
        try {
          const resJson = JSON.parse(resText);
          try {
            const { transactions, error }: TransactionsResponse = OpenBankingApiHelper.processTransactionsResponse(
              apiConfig, resJson);
            if (response.ok) {
              if (transactions) {
                transactionsFetchResponse.body.transactions = transactions;
                transactionsFetchResponse.status = 200;
                return transactionsFetchResponse;
              } else {
                var errorMsg = "Did not find 'transactions' in response data";
                transactionsFetchResponse.body.error = errorMsg;
                return transactionsFetchResponse;
              }
            } else {
              var errorMsg: string = "Response not ok: " + error;
              transactionsFetchResponse.body.error = errorMsg;
              return transactionsFetchResponse;
            }
          } catch (error) {
            var errorMsg: string = "Failed to process json response: " + (error);
            errorMsg += ": " + JSON.stringify(resJson);
            transactionsFetchResponse.body.error = errorMsg;
            return transactionsFetchResponse;
          }
        } catch (error) {
          var errorMsg: string = "Failed to parse json response: " + (error);
          errorMsg += ": " + resText;
          transactionsFetchResponse.body.error = errorMsg;
          return transactionsFetchResponse;
        }
      } catch (error) {
        var errorMsg: string = "Failed to read response text: " + (error);
        transactionsFetchResponse.body.error = errorMsg;
        return transactionsFetchResponse;
      }
    } catch (error) {
      var errorMsg: string = "Failed to fetch response: " + (error);
      transactionsFetchResponse.body.error = errorMsg;
      return transactionsFetchResponse;
    }
  }
}

export { OpenBankingApiProivder, OpenBankingApiConfig, OpenBankingApiHelper };
export { Accounts, AccountsResponse };
export { AccountsFetchResponse, TransactionsFetchResponse, BalanceFetchResponse };
export { TokenResponse };
export { SpendingInfoItem };
export { SpendingInfoCategory, SpendingInfoSubCategory };
export { SpendingInfoIncomeCategory, SpendingInfoSubscriptionCategory} ;
export { SpendingInfoSpendingCategory };
export { SpendingInfo, SpendingInfoResponse, SpendingAnalysis };
export { Account, AccountsInfo, AccountInfo };
export { Transaction };