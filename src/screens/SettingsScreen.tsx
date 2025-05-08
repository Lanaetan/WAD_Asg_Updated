import React, { useState } from 'react';
import { Linking } from 'react-native';
import { View, ScrollView, Switch } from 'react-native';
import { List, Divider, Text } from 'react-native-paper';

const SettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  // Duplicate declaration removed

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
  };
  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  // Lighter dark mode colors
  const backgroundColor = isDarkMode ? '#1e1e1e' : '#ffffff';
  const textColor = isDarkMode ? '#f0f0f0' : '#000000';
  const dividerColor = isDarkMode ? '#333333' : '#cccccc';

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor }}>
      {/* App Preferences */}
      <List.Section title="App Preferences">
        <List.Item
          title="Dark Mode"
          titleStyle={{ color: textColor }}
          right={() => <Switch value={isDarkMode} onValueChange={toggleDarkMode} />}
        />
        <Divider style={{ backgroundColor: dividerColor }} />
      </List.Section>

      {/* Support */}
      <List.Section title="Support">
        <List.Item
          title="Help & FAQ"
          titleStyle={{ color: textColor }}
          onPress={() => openLink('https://help.instagram.com/')}
        />
        <Divider style={{ backgroundColor: dividerColor }} />
        <List.Item
          title="Contact Support"
          titleStyle={{ color: textColor }}
          onPress={() => Linking.openURL('mailto:support@example.com')}
        />
        <Divider style={{ backgroundColor: dividerColor }} />
        <List.Item
          title="Terms of Service"
          titleStyle={{ color: textColor }}
          onPress={() => openLink('https://help.instagram.com/581066165581870/')}
        />
        <List.Item
          title="Privacy Policy"
          titleStyle={{ color: textColor }}
          onPress={() => openLink('https://help.instagram.com/155833707900388')}
        />
      </List.Section>

      {/* App Version */}
      <View style={{ marginTop: 40, alignItems: 'center' }}>
        <Text style={{ color: textColor }}>
          App Version 1.0.0
        </Text>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
