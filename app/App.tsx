import { StyleSheet, Text, View } from 'react-native';
import React, {useEffect, useState} from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import BankConnectButton from './components/BankConnectButton';

type APIVersion = {
  version: string;
};

export default function App() {
  const [isLoadingAPIVersion, setLoadingAPIVersion] = useState(true);
  const [apiVersion, setAPIVersion] = useState<APIVersion>({version: "0.0.0.0"});

  const tinkClientId: string = "e510fbadcd714f7ca5ef141d4923f6c1"
  var tinkRedirectURI: string = "";
  if (Platform.OS === 'ios') {
    // TODO use mobile app uri callback
    // https://stackoverflow.com/questions/17427707/whats-the-right-oauth-2-0-flow-for-a-mobile-app
    tinkRedirectURI = "";
  } else if (Platform.OS === 'android') {
    // TODO use mobile app uri callback
    // https://stackoverflow.com/questions/17427707/whats-the-right-oauth-2-0-flow-for-a-mobile-app
    tinkRedirectURI = "";
  } else if (Platform.OS === 'web') {
    tinkRedirectURI = "https%3A%2F%2Fconsole.tink.com%2Fcallback";
  }

  const apiBaseURl = "/api"
  const apiVersionEndpoint = apiBaseURl + "/Version"

  const getAPIVersion = async () => {
    try {
      const requestData = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ })
      };
      const response = await fetch(apiVersionEndpoint, requestData);
      try {
        const json = await response.json();
        console.log(json);
        setAPIVersion({version: json.version});
      } catch (error) {
        console.log(response);
        console.error(error);
      }
    } catch (error) {
      console.error("failed to fetch");
      console.error(error);
    } finally {
      setLoadingAPIVersion(false);
    }
  };

  useEffect(() => {
    getAPIVersion();
  }, []);
  
  return (
    <View style={styles.container}>
      <Text>Knight Life</Text>
      <BankConnectButton
        title='Connect Bank'
        tinkClientId={tinkClientId}
        tinkRedirectUri={tinkRedirectURI}
      />
      {isLoadingAPIVersion ? (
        <ActivityIndicator />
      ) : (
        <Text>{apiVersion.version}</Text>
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