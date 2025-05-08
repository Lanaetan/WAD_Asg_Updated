import React from 'react';
import { ScrollView, Linking, View } from 'react-native';
import { List, Divider, Text } from 'react-native-paper';

const SettingsScreen = () => {
  const openLink = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      {/* Support */}
      <List.Section title="Support">
        <List.Item
          title="Help & FAQ"
          onPress={() => openLink('https://help.instagram.com/')}
        />
        <Divider />
        <List.Item
          title="Contact Support"
          onPress={() => Linking.openURL('mailto:support@example.com')}
        />
        <Divider />
        <List.Item
          title="Terms of Service"
          onPress={() => openLink('https://help.instagram.com/581066165581870/')}
        />
        <List.Item
          title="Privacy Policy"
          onPress={() => openLink('https://help.instagram.com/155833707900388')}
        />
      </List.Section>

      {/* App Version */}
      <View style={{ marginTop: 40, alignItems: 'center' }}>
        <Text variant="labelLarge" style={{ color: 'gray' }}>
          App Version 1.0.0
        </Text>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
