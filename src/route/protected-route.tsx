import React from 'react';
import { Navigate } from 'react-router-dom';

// Mocked authentication function, replace with your actual authentication logic
const isAuthenticated = (): boolean => {
  // For example, check if a token exists in localStorage
  return localStorage.getItem('authToken') !== null;
};

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
