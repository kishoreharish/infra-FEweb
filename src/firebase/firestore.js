import { collection, addDoc, query, orderBy, onSnapshot, getDocs } from 'firebase/firestore';
import { firestore } from './firebase-config';

// Add a new message
export const addMessage = async (message) => {
  try {
    const messagesCollection = collection(firestore, "messages");
    await addDoc(messagesCollection, {
      content: message,
      timestamp: new Date(),
    });
    console.log("Message added successfully");
  } catch (error) {
    console.error("Error adding message:", error);
  }
};

// Real-time listener for messages
export const listenForMessages = (callback) => {
  const messagesCollection = collection(firestore, "messages");
  const messagesQuery = query(messagesCollection, orderBy("timestamp", "desc"));

  onSnapshot(messagesQuery, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(messages);
  });
};

// Fetch all messages
export const getMessages = async () => {
  const messagesCollection = collection(firestore, "messages");
  const messagesSnapshot = await getDocs(messagesCollection);
  const messages = messagesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return messages;
};
