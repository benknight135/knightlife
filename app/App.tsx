import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Linking, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import BankView from './components/BankView';

type APIVersion = {
  version: string;
};

const useAppStartURL = () => {
  const [url, setUrl] = useState<URL | null>(null);
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl: string | null = await Linking.getInitialURL();
      console.log(initialUrl);
      if (initialUrl == null){
        setUrl(null);
      } else {
        setUrl(new URL(initialUrl));
      }
      setProcessing(false);
    };

    getUrlAsync();
  }, []);

  return { url, processing };
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

  const { url: appStartURL, processing: isLoadingAppStartURL } = useAppStartURL();
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
          appStartURL={appStartURL}
        />
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});