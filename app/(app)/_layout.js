import { useEffect } from 'react';
import { Stack, router } from 'expo-router';
import * as Notifications from 'expo-notifications';

export default function AppLayout() {
  useEffect(() => {
    // Listener saat notifikasi diterima saat aplikasi aktif
    const received = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('Notifikasi diterima:', notification.request.content);
      }
    );

    // Listener ketika notifikasi diketuk oleh pengguna
    const response = Notifications.addNotificationResponseReceivedListener(
      (event) => {
        const screen = event.notification.request.content.data?.screen;
        if (screen === 'profile') {
          router.push('/profile');
        } else if (screen === 'tugas') {
          router.push('/tugas'); // Mengarahkan ke halaman tugas
        }
      }
    );

    // Membersihkan listener saat komponen dilepas (cleanup)
    return () => {
      received.remove();
      response.remove();
    };
  }, []);

  return <Stack />;
}