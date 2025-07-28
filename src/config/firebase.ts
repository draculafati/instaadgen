import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB-v341GDnqlR86rCWxhVOu_DJ0qtQqYDc",
  authDomain: "instaadgen20.firebaseapp.com",
  projectId: "instaadgen20",
  storageBucket: "instaadgen20.firebasestorage.app",
  messagingSenderId: "666194610158",
  appId: "1:666194610158:web:5cc03722cdb2b4174170ff",
  measurementId: "G-13JHV8SPNZ"
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