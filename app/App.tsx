import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Linking, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { OpenBankingApiConfig, OpenBankingApiProivder } from './components/Banking';
import BankView from './components/BankView';
import { Provider as PaperProvider } from "react-native-paper";

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


const useAPIVerrsion = (apiVersionEndpoint: string) => {
  const [isLoadingAPIVersion, setLoadingAPIVersion] = useState<boolean>(true);
  const [apiVersion, setAPIVersion] = useState<APIVersion>({ version: "0.0.0.0" });

  useEffect(() => {
    const getAPIVersionAsync = async () => {
      try {
        const requestData = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({})
        };
        const response = await fetch(apiVersionEndpoint, requestData);
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
  const apiBaseURl: string = "/api";
  const apiVersionEndpoint: string = apiBaseURl + "/Version";
  const openBankingApiConfig: OpenBankingApiConfig = {
    provider: OpenBankingApiProivder.TrueLayer,
    useSandbox: true
  };

  const { startUrl: appStartUrl, processing: isLoadingAppStartURL } = useAppStartURL();
  const { apiVersion, isLoadingAPIVersion } = useAPIVerrsion(apiVersionEndpoint);

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
          appStartUrl={appStartUrl}
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