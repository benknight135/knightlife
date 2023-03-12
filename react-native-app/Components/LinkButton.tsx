import React, {useCallback} from 'react';
import {Alert, Button, Linking, Platform} from 'react-native';

interface LinkButtonProps {
  title: string;
  url: string;
};

const LinkButton: React.FC<LinkButtonProps> = ({title, url}) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      if (Platform.OS === 'web') {
        window.open(url, "_self");
      } else {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      }
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={title} onPress={handlePress} />;
};

export default LinkButton;