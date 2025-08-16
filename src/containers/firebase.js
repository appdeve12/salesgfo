// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDGOXQn9sF9fZsdjiZpYG7zCNO-gniZkeo",
//   authDomain: "livesendnotification.firebaseapp.com",
//   projectId: "livesendnotification",
//   storageBucket: "livesendnotification.firebasestorage.app",
//   messagingSenderId: "715735212676",
//   appId: "1:715735212676:web:b26d7dd1acc757b8f498d1",
//   measurementId: "G-HH0S6W9BN7"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// npm install -g firebase-tools

// firebase.js
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDGOXQn9sF9fZsdjiZpYG7zCNO-gniZkeo",
  authDomain: "livesendnotification.firebaseapp.com",
  projectId: "livesendnotification",
  storageBucket: "livesendnotification.firebasestorage.app",
  messagingSenderId: "715735212676",
  appId: "1:715735212676:web:b26d7dd1acc757b8f498d1",
  measurementId: "G-HH0S6W9BN7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };

