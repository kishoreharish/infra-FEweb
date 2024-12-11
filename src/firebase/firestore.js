import { firestore } from "./firebase-config";  // Import firestore from firebase-config.js
import { collection, getDocs } from "firebase/firestore";

// Example: Add a message to Firestore
export const addMessage = async (message) => {
  try {
    await firestore.collection("messages").add({
      content: message,
      timestamp: new Date(),
    });
    console.log("Message added successfully");
  } catch (error) {
    console.error("Error adding message: ", error);
  }
};

// Example: Listen for real-time changes
export const listenForMessages = (callback) => {
  firestore.collection("messages").orderBy("timestamp").onSnapshot(snapshot => {
    const messages = snapshot.docs.map(doc => doc.data());
    callback(messages);
  });
};

// Correct usage with Firestore v9+ modular SDK
const getMessages = async () => {
    const messagesCollection = collection(firestore, "messages"); // Specify the collection
    const messagesSnapshot = await getDocs(messagesCollection);  // Fetch documents from the collection
    const messagesList = messagesSnapshot.docs.map(doc => doc.data()); // Map docs to their data
    console.log(messagesList);
  };