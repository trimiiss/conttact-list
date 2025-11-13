import React, { useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import ContactListScreen from './screens/ContactListScreen';
import ContactDetailScreen from './screens/ContactDetailScreen';
import { makeContacts } from './data/generateContacts';

export default function App() {
  const [selected, setSelected] = useState(null);
  const allContacts = useMemo(() => makeContacts(), []);

  if (selected) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <ContactDetailScreen contact={selected} onBack={() => setSelected(null)} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ContactListScreen contacts={allContacts} onSelectContact={setSelected} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
});
