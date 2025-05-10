import React from 'react';
import { Linking, ScrollView, View } from 'react-native';
import { List, Divider, Text } from 'react-native-paper';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'The "EXNativeModulesProxy" native module is not exported through NativeModules',
]);

const SettingsScreen = () => {
  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: '#ffffff' }}>
      {/* Support */}
      <List.Section title="Support">
        <List.Item
          title="Help & FAQ"
          onPress={() => openLink('https://help.instagram.com/')}
        />
        <Divider style={{ backgroundColor: '#cccccc' }} />
        <List.Item
          title="Contact Support"
          onPress={() => Linking.openURL('mailto:support@example.com')}
        />
        <Divider style={{ backgroundColor: '#cccccc' }} />
        <List.Item
          title="Terms of Service"
          onPress={() => openLink('https://help.instagram.com/581066165581870/')}
        />
        <List.Item
          title="Privacy Policy"
          onPress={() => openLink('https://help.instagram.com/155833707900388')}
        />
      </List.Section>

      {/* About */}
      <List.Section title="About">
        <List.Item
          title="Developer Info"
          description="Snaplens team Msia"
        />
        <Divider style={{ backgroundColor: '#cccccc' }} />
        <List.Item
          title="Build Number"
          description="1.0.0 (100)"
        />
        <Divider style={{ backgroundColor: '#cccccc' }} />
        <List.Item
          title=" What’s New"
          onPress={() => openLink('https://example.com/changelog')}
          description="upcoming updates"
        />
      </List.Section>

      {/* App Version */}
      <View style={{ marginTop: 40, alignItems: 'center' }}>
        <Text>App Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
