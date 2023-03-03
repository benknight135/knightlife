import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Linking, ActivityIndicator } from 'react-native';
import { env } from './utils/env';
import BankView from './components/BankView';
import { OpenBankingApiConfig, OpenBankingApiHelper } from './components/Banking';

type APIVersion = {
  version: string;
};

const useAppStartURL = () => {
  const [startUrl, setStartUrl] = useState<URL | null>(null);
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl: string | null = await Linking.getInitialURL();
      if (initialUrl != null) {
        setStartUrl(new URL(initialUrl));
      }
      setProcessing(false);
    };

    getUrlAsync();
  }, []);

  return { startUrl, processing };
};

function getOpenBankingApiAuthCodeFromURL(url: URL | null): string | null {
  if (url == null){
      return null;
  }
  // only process code if correct callback is in url e.g. https://X.X.X/callback
  // if (url.pathname != "/callback"){
  //     return null;
  // }
  const urlParams: URLSearchParams = new URLSearchParams(url.search);
  const code: string | null = urlParams.get("code");
  return code;
}

const useAPIVersion = () => {
  const [isLoadingAPIVersion, setLoadingAPIVersion] = useState<boolean>(true);
  const [apiVersion, setAPIVersion] = useState<APIVersion>({ version: "0.0.0.0" });

  const apiEndpoint: string = env.API_BASE_URL + "/Version";
  const apiCode: string = env.API_ACCESS_KEY;

  useEffect(() => {
    const getAPIVersionAsync = async () => {
      try {
        const requestData = {
          method: 'POST',
          headers: {
            'x-functions-key': apiCode,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({})
        };
        const response = await fetch(apiEndpoint, requestData);
        try {
          const json = await response.json();
          setAPIVersion({ version: json.version });
        } catch (error) {
          console.error(error);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingAPIVersion(false);
      }
    };

    getAPIVersionAsync();
  }, []);

  return { apiVersion, isLoadingAPIVersion };
};

export default function App() {
  var openBankingApiConfig: OpenBankingApiConfig = OpenBankingApiHelper.getOpenBankingConfig();

  const { startUrl: appStartUrl, processing: isLoadingAppStartURL } = useAppStartURL();
  const { apiVersion, isLoadingAPIVersion } = useAPIVersion();

  var openBankingApiAuthCode: string | null = getOpenBankingApiAuthCodeFromURL(appStartUrl);
  var redirectUri: string | null = null;
  if (appStartUrl != null){
    redirectUri = new URL("/callback", appStartUrl.origin).toString();
  }

  console.log(redirectUri);

  return (
    <View style={styles.container}>
      <Text>Knight Life</Text>
      {isLoadingAPIVersion ? (
        <ActivityIndicator />
      ) : (
        <Text>{apiVersion.version}</Text>
      )}
      {isLoadingAppStartURL ? (
        <ActivityIndicator />
      ) : (
        <BankView
          openBankingApiAuthCode={openBankingApiAuthCode}
          redirectUri={redirectUri}
          openBankingApiConfig={openBankingApiConfig}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  }
});