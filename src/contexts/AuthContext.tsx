@@ .. @@
   useEffect(() => {
     // Listen to Firebase auth state changes
-    const unsubscribe = firebaseService.onAuthStateChanged(async (firebaseUser: FirebaseUser | null) => {
-      if (firebaseUser) {
-        try {
-          // Get user profile from Firestore
-          const userProfile = await firebaseService.getUserProfile(firebaseUser.uid);
-          if (userProfile) {
-            setUser({
-              id: userProfile.uid,
-              email: userProfile.email,
-              username: userProfile.username,
-              displayName: userProfile.displayName
-            });
-          } else {
-            // If profile doesn't exist, create a basic one from Firebase user
-            const basicProfile = {
-              uid: firebaseUser.uid,
-              email: firebaseUser.email || '',
-              username: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'user',
-              displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
-              createdAt: new Date()
-            };
-            
-            await firebaseService.createUserProfile(basicProfile);
-            setUser({
-              id: basicProfile.uid,
-              email: basicProfile.email,
-              username: basicProfile.username,
-              displayName: basicProfile.displayName
-            });
-          }
-        } catch (error) {
-          console.error('Error handling user profile:', error);
-          // Fallback to basic user info from Firebase Auth
-          setUser({
-            id: firebaseUser.uid,
-            email: firebaseUser.email || '',
-            username: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'user',
-            displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User'
-          });
-        }
-      } else {
-        setUser(null);
-      }
-      setIsLoading(false);
-    });
+    let unsubscribe: (() => void) | null = null;
+    
+    try {
+      unsubscribe = firebaseService.onAuthStateChanged(async (firebaseUser: FirebaseUser | null) => {
+        if (firebaseUser) {
+          try {
+            // Get user profile from Firestore
+            const userProfile = await firebaseService.getUserProfile(firebaseUser.uid);
+            if (userProfile) {
+              setUser({
+                id: userProfile.uid,
+                email: userProfile.email,
+                username: userProfile.username,
+                displayName: userProfile.displayName
+              });
+            } else {
+              // If profile doesn't exist, create a basic one from Firebase user
+              const basicProfile = {
+                uid: firebaseUser.uid,
+                email: firebaseUser.email || '',
+                username: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'user',
+                displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
+                createdAt: new Date()
+              };
+              
+              await firebaseService.createUserProfile(basicProfile);
+              setUser({
+                id: basicProfile.uid,
+                email: basicProfile.email,
+                username: basicProfile.username,
+                displayName: basicProfile.displayName
+              });
+            }
+          } catch (error) {
+            console.error('Error handling user profile:', error);
+            // Fallback to basic user info from Firebase Auth
+            setUser({
+              id: firebaseUser.uid,
+              email: firebaseUser.email || '',
+              username: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'user',
+              displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User'
+            });
+          }
+        } else {
+          setUser(null);
+        }
+        setIsLoading(false);
+      });
+    } catch (error) {
+      console.error('Error setting up auth listener:', error);
+      setIsLoading(false);
+    }
 
-    return () => unsubscribe();
+    return () => {
+      if (unsubscribe) {
+        unsubscribe();
+      }
+    };
   }, []);