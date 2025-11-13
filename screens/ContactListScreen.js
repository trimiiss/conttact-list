import React, { useCallback, useMemo, useRef, useState } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import ContactItem, { ITEM_HEIGHT } from '../components/ContactItem';
import SearchBar from '../components/SearchBar';
import { normalize } from '../utils/text';

const HEADER_HEIGHT = 28;

export default function ContactListScreen({ contacts, onSelectContact }) {
  const [query, setQuery] = useState('');
  const listRef = useRef(null);

  // Search: tokenize query; every token must match name/email/phone digits
  const filtered = useMemo(() => {
    const q = normalize(query);
    if (!q) return contacts;
    const tokens = q.split(' ').filter(Boolean);
    return contacts.filter(c => tokens.every(t => c._search.includes(t)));
  }, [contacts, query]);

  // Build alphabetical sections by last-name initial (already precomputed)
  const sections = useMemo(() => {
    const map = new Map();
    for (const c of filtered) {
      const k = c._firstLetter;
      if (!map.has(k)) map.set(k, []);
      map.get(k).push(c);
    }
    return Array.from(map.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([title, data]) => ({ title, data: data.sort((a,b) => a.name.localeCompare(b.name)) }));
  }, [filtered]);

  const renderItem = useCallback(({ item }) => (
    <ContactItem item={item} onPress={onSelectContact} />
  ), [onSelectContact]);

  const keyExtractor = useCallback((item) => item.id, []);

  const ItemSeparator = useCallback(() => <View style={styles.sep} />, []);

  const renderSectionHeader = useCallback(({ section }) => (
    <View style={styles.header}><Text style={styles.headerText}>{section.title}</Text></View>
  ), []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacts</Text>
      <SearchBar value={query} onChangeText={setQuery} />
      <SectionList
        ref={listRef}
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={ItemSeparator}
        stickySectionHeadersEnabled
        initialNumToRender={24}
        maxToRenderPerBatch={24}
        updateCellsBatchingPeriod={16}
        windowSize={7}
        removeClippedSubviews
        getItemLayout={(data, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index + HEADER_HEIGHT, index })}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  title: { fontSize: 32, fontWeight: '700', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12, color: '#fff', backgroundColor: '#000' },
  listContent: { paddingBottom: 32 },
  header: { height: HEADER_HEIGHT, backgroundColor: '#1a1a1a', justifyContent: 'center', paddingHorizontal: 12 },
  headerText: { fontWeight: '600', color: '#888', fontSize: 13, letterSpacing: 1 },
  sep: { height: StyleSheet.hairlineWidth, backgroundColor: '#222', marginLeft: 68 },
});
