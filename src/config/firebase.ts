@@ .. @@
 const firebaseConfig = {
   apiKey: "AIzaSyApoEIo4LLJ0HjWpMSaDNjO5qQzrnyKA4Q",
   authDomain: "instaadgen-3e55d.firebaseapp.com",
   projectId: "instaadgen-3e55d",
   storageBucket: "instaadgen-3e55d.appspot.com",
   messagingSenderId: "697559770190",
   appId: "1:697559770190:web:694abd200080c61743cf1f",
   measurementId: "G-FH8HNWQG9J"
 };
 
-// ✅ Safely initialize Firebase only once
-const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
+// Initialize Firebase
+let app;
+try {
+  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
+} catch (error) {
+  console.error('Firebase initialization error:', error);
+  app = initializeApp(firebaseConfig);
+}
 
-// ✅ Safely initialize Firestore only once
+// Initialize Firestore
 let db;
 try {
-  // Try to get existing Firestore instance first
   db = getFirestore(app);
 } catch (error) {
-  // If no instance exists, initialize with custom settings
-  db = initializeFirestore(app, {
-    experimentalForceLongPolling: true,
-  });
+  console.error('Firestore initialization error:', error);
+  try {
+    db = initializeFirestore(app, {
+      experimentalForceLongPolling: true,
+    });
+  } catch (initError) {
+    console.error('Firestore init error:', initError);
+    db = getFirestore(app);
+  }
 }
 
-// ✅ Export Firebase services
+// Export Firebase services
 export const auth = getAuth(app);
 export { db };
 export const storage = getStorage(app);
 
 export default app;