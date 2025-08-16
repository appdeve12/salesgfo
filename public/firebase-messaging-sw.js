// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDGOXQn9sF9fZsdjiZpYG7zCNO-gniZkeo",
  authDomain: "livesendnotification.firebaseapp.com",
  projectId: "livesendnotification",
  storageBucket: "livesendnotification.firebasestorage.app",
  messagingSenderId: "715735212676",
  appId: "1:715735212676:web:b26d7dd1acc757b8f498d1",
  measurementId: "G-HH0S6W9BN7"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
