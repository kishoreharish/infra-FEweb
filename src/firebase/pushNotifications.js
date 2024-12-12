// src/firebase/pushNotifications.js
import { getMessaging, onMessage } from 'firebase/messaging';
import { messaging } from './firebase-config'; // Ensure this is correctly imported

export const setupPushNotifications = () => {
  console.log('Push notifications setup');
  // Additional setup code here if necessary
};

export const onMessageListener = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      resolve(payload);
    });

    // In case of failure
    reject('Failed to listen for messages');
  });
};
