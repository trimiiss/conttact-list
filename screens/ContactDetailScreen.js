import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { formatPhone } from '../utils/text';

export default function ContactDetailScreen({ contact, onBack }) {
  return (
    <View style={styles.detailContainer}>
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backTxt}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.detailTitle}>Contact</Text>
        <View style={{ width: 64 }} />
      </View>
      <View style={styles.detailBody}>
        {contact.avatar ? (
          <Image source={{ uri: contact.avatar }} style={styles.detailAvatar} />
        ) : (
          <View style={styles.detailAvatarFallback}>
            <Text style={styles.detailAvatarText}>{contact.name.split(' ').map(p => p[0]).slice(0,2).join('')}</Text>
          </View>
        )}
        <Text style={styles.detailName}>{contact.name}</Text>
        <Text style={styles.detailMeta}>{formatPhone(contact.phone)}</Text>
        <Text style={styles.detailMeta}>{contact.email}</Text>
        {contact.address && <Text style={styles.detailAddress}>{contact.address}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailContainer: { flex: 1, backgroundColor: '#000' },
  detailHeader: { height: 56, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#222', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 8 },
  backBtn: { padding: 8, paddingHorizontal: 12, minWidth: 64 },
  backTxt: { color: '#fff', fontWeight: '600', fontSize: 16 },
  detailTitle: { fontSize: 18, fontWeight: '700', color: '#fff' },
  detailBody: { alignItems: 'center', paddingTop: 48 },
  detailAvatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: '#333' },
  detailAvatarFallback: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#222', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#333' },
  detailAvatarText: { fontSize: 36, fontWeight: '800', color: '#fff' },
  detailName: { fontSize: 28, fontWeight: '700', marginTop: 20, color: '#fff' },
  detailMeta: { fontSize: 15, color: '#aaa', marginTop: 8 },
  detailAddress: { fontSize: 14, color: '#666', marginTop: 16, textAlign: 'center', paddingHorizontal: 32, lineHeight: 20 },
});
