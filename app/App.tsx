import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import BankConnectButton from './components/BankConnectButton'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Knight Life</Text>
      <BankConnectButton title="Connect Bank"/>
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
