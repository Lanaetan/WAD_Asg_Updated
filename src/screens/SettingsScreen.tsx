import React, { useState } from 'react';
import { View, Linking, ScrollView } from 'react-native';
import { List, Switch, Divider, Text, Button } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const scheme = useColorScheme();
  const navigation = useNavigation();

  const [isDarkMode, setIsDarkMode] = useState(scheme === 'dark');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      {/* App Preferences */}
      <List.Section title="App Preferences">
        <List.Item
          title="Dark Mode"
          right={() => (
            <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
          )}
        />
        <Divider />
        <List.Accordion
          title="Language"
          description={selectedLanguage}
        >
          {['English', 'Bahasa Melayu', '中文'].map((lang) => (
            <List.Item
              key={lang}
              title={lang}
              onPress={() => setSelectedLanguage(lang)}
            />
          ))}
        </List.Accordion>
      </List.Section>

      {/* Support */}
      <List.Section title="Support">
        <List.Item
          title="Help & FAQ"
          onPress={() => openLink('https://help.instagram.com/')}
        />
        <Divider />
        <List.Item
          title="Contact Support"
          onPress={() => Linking.openURL('mailto:support@instagram.com')}
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
