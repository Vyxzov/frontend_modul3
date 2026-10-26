const API_URL = process.env.EXPO_PUBLIC_API_URL; // Sesuaikan IP backend Anda jika menggunakan HP fisik

export async function ambilTugas(token) {
  const response = await fetch(`${API_URL}/tugas`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.pesan || 'Gagal memuat tugas');
  return data.data;
}

export async function buatTugas(token, judul, deskripsi) {
  const response = await fetch(`${API_URL}/tugas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ judul, deskripsi }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.pesan || 'Gagal membuat tugas');
  return data;
}