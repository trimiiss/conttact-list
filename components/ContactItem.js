import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { formatPhone } from '../utils/text';

export default function ContactItem({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.row} onPress={() => onPress(item)}>
      {item.avatar ? (
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
      ) : (
        <View style={styles.avatarFallback}>
          <Text style={styles.avatarText}>{item.name.split(' ').map(p => p[0]).slice(0,2).join('')}</Text>
        </View>
      )}
      <View style={styles.rowText}>
        <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
        <Text numberOfLines={1} style={styles.meta}>{formatPhone(item.phone)} · {item.email}</Text>
      </View>
    </TouchableOpacity>
  );
}

export const ITEM_HEIGHT = 56;

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', height: ITEM_HEIGHT, paddingHorizontal: 12, backgroundColor: '#000' },
  avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
  avatarFallback: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#222', alignItems: 'center', justifyContent: 'center', marginRight: 12, borderWidth: 1, borderColor: '#333' },
  avatarText: { fontWeight: '700', color: '#fff', fontSize: 14 },
  rowText: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600', color: '#fff' },
  meta: { fontSize: 12, color: '#888', marginTop: 2 },
});
