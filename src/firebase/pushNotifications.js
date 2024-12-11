// pushNotifications.js
import { messaging, firestore } from './firebase-config';
import { getToken, onMessage } from 'firebase/messaging';

const setupPushNotifications = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.error('Notification permission denied');
      return;
    }

    const token = await getToken(messaging, {
      vapidKey: 'your-vapid-key-here', // Replace with your VAPID key
    });

    if (token) {
      console.log('Push notification token:', token);

      // Save the token to Firestore
      await firestore.collection('users').doc('your-user-id').set({
        pushToken: token,
      }, { merge: true });
    } else {
      console.log('No push token available');
    }
  } catch (error) {
    console.error('Error during push notification setup', error);
  }
};

const onMessageListener = () => {
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      resolve(payload);
    });
  });
};

export { setupPushNotifications, onMessageListener };
