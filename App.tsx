
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import PublicPaymentsPage from './pages/PublicPaymentsPage';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-200">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/payments/public" element={<PublicPaymentsPage />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<PublicPaymentsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
