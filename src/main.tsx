 import { createRoot } from 'react-dom/client';
 import App from './App.tsx';
 import { AuthProvider } from './contexts/AuthContext';
 import './index.css';
 
-createRoot(document.getElementById('root')!).render(
-  <StrictMode>
-    <AuthProvider>
-      <App />
-    </AuthProvider>
-  </StrictMode>
-);
+const rootElement = document.getElementById('root');
+if (rootElement) {
+  createRoot(rootElement).render(
+    <StrictMode>
+      <AuthProvider>
+        <App />
+      </AuthProvider>
+    </StrictMode>
+  );
+} else {
+  console.error('Root element not found');
+}