import React from 'react';
import { View, FlatList } from 'react-native';
import ContactListItem from '../components/ContactListItem';
import chats from '../data/chats.json'

const ContactsScreen = () => {
    return (
      <View>
        <FlatList 
          data={chats}
          renderItem={({ item }) => 
            <ContactListItem user={item.user} />
          }
        />
      </View>
    );
}

export default ContactsScreen;