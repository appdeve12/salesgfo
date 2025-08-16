// src/firebase-notifications.js
import { messaging, getToken, onMessage } from "./firebase";

export const requestFirebaseNotificationPermission = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: "BNe29WjKUhoGd0GyU65hidrqDEoG9IUbaz4pySE0D3dlcr36JA2Fi6n9-UmmTOFLH0I8fPXNz5fb5gDl9_bdfoo",
    });
    if (token) {
      console.log("FCM Token:", token);
      return token;
    } else {
      console.log("No token available");
      return null;
    }
  } catch (err) {
    console.error("An error occurred while retrieving token. ", err);
    return null;
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
