@@ .. @@
 import React from 'react';
 import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
 import { useAuth } from './contexts/AuthContext';
 import LoginPage from './pages/LoginPage';
 import Dashboard from './pages/Dashboard';
 import AIGenerator from './pages/AIGenerator';
 import CredentialsInput from './pages/CredentialsInput';
 import AdHistory from './pages/AdHistory';
 
 const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const { isAuthenticated } = useAuth();
   return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
 };
 
 const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const { isAuthenticated } = useAuth();
   return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" replace />;
 };
 
 function App() {
+  const { isLoading } = useAuth();
+
+  if (isLoading) {
+    return (
+      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
+        <div className="text-center">
+          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
+            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
+          </div>
+          <p className="text-gray-600">Loading...</p>
+        </div>
+      </div>
+    );
+  }
+
   return (
     <Router>
       <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
         <Routes>
           <Route 
             path="/login" 
             element={
               <PublicRoute>
                 <LoginPage />
               </PublicRoute>
             } 
           />
           <Route 
             path="/dashboard" 
             element={
               <ProtectedRoute>
                 <Dashboard />
               </ProtectedRoute>
             } 
           />
           <Route 
             path="/ai-generator" 
             element={
               <ProtectedRoute>
                 <AIGenerator />
               </ProtectedRoute>
             } 
           />
           <Route 
             path="/credentials" 
             element={
               <ProtectedRoute>
                 <CredentialsInput />
               </ProtectedRoute>
             } 
           />
           <Route 
             path="/history" 
             element={
               <ProtectedRoute>
                 <AdHistory />
               </ProtectedRoute>
             } 
           />
           <Route path="/" element={<Navigate to="/login" replace />} />
         </Routes>
       </div>
     </Router>
   );
 }

export default App