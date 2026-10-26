import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { ambilTugas, buatTugas } from '../../services/tugasService';

export default function TugasScreen() {
  const { token } = useAuth();
  const [daftarTugas, setDaftarTugas] = useState([]);
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');

  async function loadTugas() {
    try {
      const data = await ambilTugas(token);
      setDaftarTugas(data);
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  }

  useEffect(() => {
    loadTugas();
  }, []);

  async function handleTambah() {
    try {
      await buatTugas(token, judul, deskripsi);
      Alert.alert('Sukses', 'Tugas berhasil ditambahkan');
      setJudul('');
      setDeskripsi('');
      loadTugas();
    } catch (e) {
      Alert.alert('Gagal', e.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Tugas Kuliah</Text>
      
      <TextInput
        style={[styles.input, { color: '#000' }]}
        placeholder="Judul Tugas"
        placeholderTextColor="#888"
        value={judul}
        onChangeText={setJudul}
      />
      <TextInput
        style={[styles.input, { color: '#000' }]}
        placeholder="Deskripsi Tugas"
        placeholderTextColor="#888"
        value={deskripsi}
        onChangeText={setDeskripsi}
      />
      <Button title="Tambah Tugas" onPress={handleTambah} />

      <FlatList
        data={daftarTugas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.judul}</Text>
            <Text>{item.deskripsi}</Text>
            <Text style={styles.status}>Status: {item.status}</Text>
          </View>
        )}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 10 },
  card: { padding: 12, borderWidth: 1, borderColor: '#eee', borderRadius: 8, marginBottom: 10, backgroundColor: '#f9f9f9' },
  cardTitle: { fontWeight: 'bold', fontSize: 16 },
  status: { fontSize: 12, color: '#666', marginTop: 4 },
});