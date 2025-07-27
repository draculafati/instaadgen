import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyApoEIo4LLJ0HjWpMSaDNjO5qQzrnyKA4Q",
  authDomain: "instaadgen-3e55d.firebaseapp.com",
  projectId: "instaadgen-3e55d",
  storageBucket: "instaadgen-3e55d.appspot.com",
  messagingSenderId: "697559770190",
  appId: "1:697559770190:web:694abd200080c61743cf1f",
  measurementId: "G-FH8HNWQG9J"
};

// Initialize Firebase
let app;
try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
} catch (error) {
  console.error('Firebase initialization error:', error);
  app = initializeApp(firebaseConfig);
}

// Initialize Firestore
let db;
try {
  db = getFirestore(app);
} catch (error) {
  console.error('Firestore initialization error:', error);
  try {
    db = initializeFirestore(app, {
      experimentalForceLongPolling: true,
    });
  } catch (initError) {
    console.error('Firestore init error:', initError);
    db = getFirestore(app);
  }
}

// Export Firebase services
export const auth = getAuth(app);
export { db };
export const storage = getStorage(app);

export default app;